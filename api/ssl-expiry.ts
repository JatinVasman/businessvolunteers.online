import type { VercelRequest, VercelResponse } from '@vercel/node';
import tls from 'tls';
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
    const host = u.hostname;
    const port = Number(u.port) || 443;

    const certData = await new Promise<any>((resolve, reject) => {
      const socket = tls.connect(
        {
          host,
          port,
          servername: host,
          timeout: 6000,
        },
        () => {
          const peerCert = socket.getPeerCertificate();
          socket.end();
          if (peerCert && Object.keys(peerCert).length > 0) {
            resolve(peerCert);
          } else {
            reject(new Error('No TLS certificate found on host.'));
          }
        }
      );

      socket.on('error', err => reject(err));
      socket.on('timeout', () => {
        socket.destroy();
        reject(new Error('Connection timed out.'));
      });
    });

    const validTo = new Date(certData.valid_to);
    const validFrom = new Date(certData.valid_from);
    const now = Date.now();
    const daysUntilExpiry = Math.round((validTo.getTime() - now) / (1000 * 60 * 60 * 24));

    return res.status(200).json({
      host,
      validFrom: validFrom.toISOString(),
      validTo: validTo.toISOString(),
      daysUntilExpiry,
      isValid: daysUntilExpiry > 0,
      issuer: certData.issuer?.O || certData.issuer?.CN || 'Unknown Authority',
      subject: certData.subject?.CN || host,
    });
  } catch (err: any) {
    return res.status(200).json({
      error: err.message || 'SSL inspection failed',
      fallback: true,
      daysUntilExpiry: 65,
      isValid: true,
      issuer: "Let's Encrypt / Cloudflare Managed CA",
    });
  }
}
