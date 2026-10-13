import type { VercelRequest, VercelResponse } from '@vercel/node';
import { safeUrl } from '../lib/safe-url';

function parseLinks(html: string, base: string): string[] {
  const found = new Set<string>();
  const re = /(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const raw = (m[1] || m[2] || m[3] || '').trim();
    if (!raw || raw.startsWith('#') || /^(mailto:|tel:|javascript:|data:)/i.test(raw)) continue;
    try {
      const u = new URL(raw, base);
      if (['http:', 'https:'].includes(u.protocol)) found.add(u.href);
    } catch {}
  }
  return [...found];
}

async function safeFetch(start: string, options: RequestInit = {}, maxRedirects = 5) {
  let current = start;
  for (let hop = 0; hop <= maxRedirects; hop++) {
    const u = await safeUrl(current);
    const response = await fetch(u.href, { ...options, redirect: 'manual' });
    if ([301, 302, 303, 307, 308].includes(response.status) && response.headers.get('location')) {
      const next = new URL(response.headers.get('location')!, u.href).href;
      response.body?.cancel().catch(() => {});
      if (hop === maxRedirects) throw new Error('Stopped after too many redirects.');
      current = next;
      continue;
    }
    return { response, url: u.href };
  }
  throw new Error('Stopped after too many redirects.');
}

async function check(url: string) {
  try {
    let { response, url: finalUrl } = await safeFetch(url, { method: 'HEAD', signal: AbortSignal.timeout(7000), headers: { 'user-agent': 'BusinessVolunteersLinkCheck/1.0' } }, 5);
    if (response.status === 405 || response.status === 501) {
      response.body?.cancel().catch(() => {});
      ({ response, url: finalUrl } = await safeFetch(url, { method: 'GET', signal: AbortSignal.timeout(7000), headers: { range: 'bytes=0-0', 'user-agent': 'BusinessVolunteersLinkCheck/1.0' } }, 5));
      response.body?.cancel().catch(() => {});
    }
    const ok = response.status >= 200 && response.status < 400;
    return { url, status: response.status, ok, message: ok ? (finalUrl !== url ? `Reachable after redirect to ${finalUrl}` : 'Reachable') : `HTTP ${response.status}` };
  } catch (e: any) {
    return { url, status: null, ok: false, message: e.message || 'Request failed' };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST.' });
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const url = String(body.url || '');
    const { response: pageResponse, url: finalUrl } = await safeFetch(url, { method: 'GET', signal: AbortSignal.timeout(9000), headers: { 'user-agent': 'BusinessVolunteersLinkCheck/1.0', accept: 'text/html' } }, 5);
    if (!pageResponse.ok) throw new Error(`Page returned HTTP ${pageResponse.status}.`);
    const type = pageResponse.headers.get('content-type') || '';
    if (!type.includes('text/html')) throw new Error('The target URL did not return HTML.');
    const html = await pageResponse.text();
    if (html.length > 1200000) throw new Error('Page is larger than the 1.2 MB scan limit.');
    const all = parseLinks(html, finalUrl);
    const links = body.mode === 'all' ? all : all.filter(x => new URL(x).origin === new URL(finalUrl).origin);
    const limit = Math.max(1, Math.min(50, Number(body.limit) || 30));
    const results: any[] = [];
    for (let i = 0; i < Math.min(links.length, limit); i += 5) {
      results.push(...await Promise.all(links.slice(i, i + 5).map(check)));
    }
    return res.status(200).json({ pageUrl: finalUrl, total: results.length, truncated: all.length > limit, results });
  } catch (e: any) {
    return res.status(400).json({ error: e.message || 'Scan could not complete.' });
  }
}
