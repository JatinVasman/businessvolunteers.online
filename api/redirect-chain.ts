import type { VercelRequest, VercelResponse } from '@vercel/node';
import { safeUrl } from '../lib/safe-url';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Use GET.' });
  try {
    let current = String(req.query.url || '');
    const max = Math.max(1, Math.min(15, Number(req.query.max) || 10));
    const hops: any[] = [];
    for (let i = 0; i <= max; i++) {
      const u = await safeUrl(current);
      let response: Response;
      try {
        response = await fetch(u.href, {
          method: 'HEAD',
          redirect: 'manual',
          signal: AbortSignal.timeout(8000),
          headers: { 'user-agent': 'BusinessVolunteersLinkCheck/1.0' }
        });
        if (response.status === 405 || response.status === 501) {
          response = await fetch(u.href, {
            method: 'GET',
            redirect: 'manual',
            signal: AbortSignal.timeout(8000),
            headers: { range: 'bytes=0-0', 'user-agent': 'BusinessVolunteersLinkCheck/1.0' }
          });
          response.body?.cancel().catch(() => {});
        }
      } catch (e: any) {
        hops.push({ url: u.href, status: null, location: '', error: e.message });
        return res.status(200).json({ hops, finalStatus: null, error: 'A host may refuse automated requests or the request timed out.' });
      }
      const loc = response.headers.get('location');
      hops.push({ url: u.href, status: response.status, location: loc ? new URL(loc, u.href).href : '' });
      if (![301, 302, 303, 307, 308].includes(response.status) || !loc) {
        response.body?.cancel().catch(() => {});
        return res.status(200).json({ hops, finalStatus: response.status, finalUrl: u.href });
      }
      response.body?.cancel().catch(() => {});
      current = new URL(loc, u.href).href;
      if (i === max) return res.status(200).json({ hops, finalStatus: response.status, error: `Stopped after ${max} redirect hops.` });
    }
    return res.status(200).json({ hops });
  } catch (e: any) {
    return res.status(400).json({ error: e.message || 'Invalid request.' });
  }
}
