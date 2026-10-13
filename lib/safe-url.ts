import { promises as dns } from 'node:dns';
import net from 'node:net';

function privateIP(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const p = ip.split('.').map(Number);
    return (
      p[0] === 10 ||
      p[0] === 127 ||
      p[0] === 0 ||
      (p[0] === 169 && p[1] === 254) ||
      (p[0] === 172 && p[1] >= 16 && p[1] <= 31) ||
      (p[0] === 192 && p[1] === 168) ||
      p[0] >= 224 ||
      (p[0] === 100 && p[1] >= 64 && p[1] <= 127) ||
      (p[0] === 198 && (p[1] === 18 || p[1] === 19))
    );
  }
  const s = ip.toLowerCase();
  if (s === '::1' || s === '::' || s.startsWith('fc') || s.startsWith('fd') || s.startsWith('fe80:') || s.startsWith('ff')) return true;
  if (s.startsWith('::ffff:')) return privateIP(s.slice(7));
  return false;
}

export async function safeUrl(input: string): Promise<URL> {
  let u: URL;
  try {
    u = new URL(input);
  } catch {
    throw new Error('Invalid URL. Enter a full public http(s) URL.');
  }
  if (!['http:', 'https:'].includes(u.protocol) || u.username || u.password) {
    throw new Error('Only credential-free HTTP(S) URLs are allowed.');
  }
  const host = u.hostname.toLowerCase();
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || host.endsWith('.internal')) {
    throw new Error('Private/local hosts are blocked.');
  }
  if (net.isIP(host)) {
    if (privateIP(host)) throw new Error('Private IP addresses are blocked.');
  } else {
    let addrs: dns.LookupAddress[];
    try {
      addrs = await dns.lookup(host, { all: true, verbatim: true });
    } catch {
      throw new Error(`Could not resolve host: ${host}`);
    }
    if (!addrs.length || addrs.some(a => privateIP(a.address))) {
      throw new Error('Private, local or mixed public/private DNS results are blocked.');
    }
  }
  return u;
}
