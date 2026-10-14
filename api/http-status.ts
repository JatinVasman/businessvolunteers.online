import type { VercelRequest, VercelResponse } from '@vercel/node';
import { safeUrl } from '../lib/safe-url';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Use GET.' });
  }

  try {
    const rawUrl = String(req.query.url || '');
    if (!rawUrl) return res.status(400).json({ error: 'Missing ?url= parameter.' });

    const u = await safeUrl(rawUrl);
    const start = Date.now();

    let response = await fetch(u.href, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(8000),
      headers: { 'user-agent': 'BusinessVolunteersLinkCheck/1.0' },
    });

    if (response.status === 405 || response.status === 501) {
      response = await fetch(u.href, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(8000),
        headers: { range: 'bytes=0-0', 'user-agent': 'BusinessVolunteersLinkCheck/1.0' },
      });
      response.body?.cancel().catch(() => {});
    }

    const duration = Date.now() - start;
    const headersObj: Record<string, string> = {};
    ['content-type', 'server', 'cache-control', 'strict-transport-security', 'location'].forEach(h => {
      const v = response.headers.get(h);
      if (v) headersObj[h] = v;
    });

    return res.status(200).json({
      url: u.href,
      status: response.status,
      statusText: response.statusText,
      responseTimeMs: duration,
      headers: headersObj,
      isHttps: u.protocol === 'https:',
    });
  } catch (err: any) {
    return res.status(400).json({ error: err.message || 'Inspection failed.' });
  }
}
