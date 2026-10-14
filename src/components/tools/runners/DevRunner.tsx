import React, { useState, useMemo, useEffect } from 'react';
import type { ToolMeta } from '../../../data/toolsData';
import { copyToClipboard, downloadText } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

export const DevRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --------------------------------------------------------------------------
  // 1: JSON FORMATTER
  // --------------------------------------------------------------------------
  const [jsonInput, setJsonInput] = useState('{"service":"Business Volunteers","toolsCount":106,"privacy":"client-side","features":["fast","secure","free"],"metrics":{"rating":4.9,"activeUsers":25000}}');
  const [jsonIndent, setJsonIndent] = useState<number>(2);

  const jsonResult = useMemo(() => {
    if (!jsonInput.trim()) return { formatted: '', error: null };
    try {
      const parsed = JSON.parse(jsonInput);
      const formatted = jsonIndent === 0 ? JSON.stringify(parsed) : JSON.stringify(parsed, null, jsonIndent);
      return { formatted, error: null };
    } catch (err: any) {
      return { formatted: '', error: err.message || 'Invalid JSON syntax' };
    }
  }, [jsonInput, jsonIndent]);

  // --------------------------------------------------------------------------
  // 2: BASE64 ENCODER / DECODER
  // --------------------------------------------------------------------------
  const [b64Mode, setB64Mode] = useState<'encode' | 'decode'>('encode');
  const [b64Input, setB64Input] = useState('Welcome to Business Volunteers Tools Directory');
  const [b64UrlSafe, setB64UrlSafe] = useState(false);

  const b64Result = useMemo(() => {
    try {
      if (b64Mode === 'encode') {
        let res = btoa(unescape(encodeURIComponent(b64Input)));
        if (b64UrlSafe) {
          res = res.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        }
        return { text: res, error: null };
      } else {
        let sanitized = b64Input.trim();
        if (b64UrlSafe) {
          sanitized = sanitized.replace(/-/g, '+').replace(/_/g, '/');
          while (sanitized.length % 4) sanitized += '=';
        }
        const decoded = decodeURIComponent(escape(atob(sanitized)));
        return { text: decoded, error: null };
      }
    } catch (err: any) {
      return { text: '', error: 'Failed to process Base64. Ensure input format is valid.' };
    }
  }, [b64Mode, b64Input, b64UrlSafe]);

  // --------------------------------------------------------------------------
  // 3: URL ENCODER / DECODER
  // --------------------------------------------------------------------------
  const [urlMode, setUrlMode] = useState<'encode' | 'decode'>('encode');
  const [urlInput, setUrlInput] = useState('https://businessvolunteers.online/tools?category=ecommerce&sort=popular#reviews');
  const [urlEncodeType, setUrlEncodeType] = useState<'component' | 'full'>('component');

  const urlResult = useMemo(() => {
    try {
      if (urlMode === 'encode') {
        const out = urlEncodeType === 'component' ? encodeURIComponent(urlInput) : encodeURI(urlInput);
        return { text: out, error: null };
      } else {
        const out = decodeURIComponent(urlInput);
        return { text: out, error: null };
      }
    } catch (err: any) {
      return { text: '', error: 'URL decoding error. Check encoded characters.' };
    }
  }, [urlMode, urlInput, urlEncodeType]);

  // Parsed URL query params breakdown
  const parsedParams = useMemo(() => {
    try {
      const u = new URL(urlInput);
      const params: { key: string; val: string }[] = [];
      u.searchParams.forEach((v, k) => params.push({ key: k, val: v }));
      return { host: u.hostname, path: u.pathname, params };
    } catch {
      return null;
    }
  }, [urlInput]);

  // --------------------------------------------------------------------------
  // 4: UUID GENERATOR
  // --------------------------------------------------------------------------
  const [uuidVersion, setUuidVersion] = useState<'v4' | 'v7'>('v4');
  const [uuidCount, setUuidCount] = useState<number>(5);
  const [uuidCase, setUuidCase] = useState<'lower' | 'upper'>('lower');
  const [uuidHyphens, setUuidHyphens] = useState(true);
  const [uuidsList, setUuidsList] = useState<string[]>([]);

  const generateUuidV4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (window.crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateUuidV7 = () => {
    const timestamp = Date.now();
    const tsHex = timestamp.toString(16).padStart(12, '0');
    const randVals = new Uint8Array(10);
    window.crypto.getRandomValues(randVals);
    const randHex = Array.from(randVals, b => b.toString(16).padStart(2, '0')).join('');
    // 8-4-4-4-12
    const part1 = tsHex.slice(0, 8);
    const part2 = tsHex.slice(8, 12);
    const part3 = '7' + randHex.slice(0, 3);
    const part4 = ((parseInt(randHex.slice(3, 4), 16) & 0x3) | 0x8).toString(16) + randHex.slice(4, 7);
    const part5 = randHex.slice(7, 19);
    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
  };

  const regenerateUuids = () => {
    const list: string[] = [];
    for (let i = 0; i < uuidCount; i++) {
      let id = uuidVersion === 'v4' ? generateUuidV4() : generateUuidV7();
      if (!uuidHyphens) id = id.replace(/-/g, '');
      if (uuidCase === 'upper') id = id.toUpperCase();
      list.push(id);
    }
    setUuidsList(list);
  };

  useEffect(() => {
    if (tool.id === 'uuid-generator') {
      regenerateUuids();
    }
  }, [tool.id, uuidVersion, uuidCount, uuidCase, uuidHyphens]);

  // --------------------------------------------------------------------------
  // 5: REGEX TESTER
  // --------------------------------------------------------------------------
  const [regexPattern, setRegexPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexTestText, setRegexTestText] = useState(
    "Contact our leadership at team@businessvolunteers.online or partner@venture.co for consultations. Call support or email info@domain.org for inquiries."
  );

  const regexMatches = useMemo(() => {
    if (!regexPattern) return { list: [], error: null };
    try {
      const rx = new RegExp(regexPattern, regexFlags.includes('g') ? regexFlags : regexFlags + 'g');
      const matches: { index: number; match: string; groups: string[] }[] = [];
      let m: RegExpExecArray | null;
      while ((m = rx.exec(regexTestText)) !== null) {
        matches.push({
          index: m.index,
          match: m[0],
          groups: m.slice(1),
        });
        if (m.index === rx.lastIndex) rx.lastIndex++;
      }
      return { list: matches, error: null };
    } catch (err: any) {
      return { list: [], error: err.message || 'Invalid regular expression' };
    }
  }, [regexPattern, regexFlags, regexTestText]);

  // --------------------------------------------------------------------------
  // 6: TIMESTAMP CONVERTER
  // --------------------------------------------------------------------------
  const [epochInput, setEpochInput] = useState<string>(Math.floor(Date.now() / 1000).toString());

  const parsedDate = useMemo(() => {
    const val = Number(epochInput.trim());
    if (!Number.isFinite(val) || val <= 0) return null;
    const ms = epochInput.trim().length > 11 ? val : val * 1000;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;

    const utc = d.toUTCString();
    const iso = d.toISOString();
    const ist = d.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'long' });
    const local = d.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'long' });
    const diffSec = Math.round((Date.now() - d.getTime()) / 1000);
    const relative =
      diffSec === 0 ? 'just now' : diffSec > 0 ? `${Math.abs(diffSec)} seconds ago` : `in ${Math.abs(diffSec)} seconds`;

    return { utc, iso, ist, local, relative, ms };
  }, [epochInput]);

  // --------------------------------------------------------------------------
  // 7: COLOR CONVERTER
  // --------------------------------------------------------------------------
  const [hexColor, setHexColor] = useState('#FF4E27');

  const colorCalculations = useMemo(() => {
    let cleanHex = hexColor.trim();
    if (!cleanHex.startsWith('#')) cleanHex = '#' + cleanHex;

    const isValid = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/.test(cleanHex);
    if (!isValid) return { isValid: false };

    let r = 0, g = 0, b = 0;
    if (cleanHex.length === 4) {
      r = parseInt(cleanHex[1] + cleanHex[1], 16);
      g = parseInt(cleanHex[2] + cleanHex[2], 16);
      b = parseInt(cleanHex[3] + cleanHex[3], 16);
    } else {
      r = parseInt(cleanHex.slice(1, 3), 16);
      g = parseInt(cleanHex.slice(3, 5), 16);
      b = parseInt(cleanHex.slice(5, 7), 16);
    }

    // RGB to HSL
    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }

    // RGB to CMYK
    const k = 1 - Math.max(rNorm, gNorm, bNorm);
    const c = k === 1 ? 0 : (1 - rNorm - k) / (1 - k);
    const m = k === 1 ? 0 : (1 - gNorm - k) / (1 - k);
    const y = k === 1 ? 0 : (1 - bNorm - k) / (1 - k);

    // WCAG Contrast calculation
    const getLuminance = (r8: number, g8: number, b8: number) => {
      const a = [r8, g8, b8].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    const lum = getLuminance(r, g, b);
    const contrastWhite = (1 + 0.05) / (lum + 0.05);
    const contrastBlack = (lum + 0.05) / (0 + 0.05);

    return {
      isValid: true,
      hex: cleanHex.toUpperCase(),
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      cmyk: `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`,
      contrastWhite: contrastWhite.toFixed(2),
      contrastBlack: contrastBlack.toFixed(2),
      passWhiteAA: contrastWhite >= 4.5,
      passBlackAA: contrastBlack >= 4.5,
    };
  }, [hexColor]);

  // --------------------------------------------------------------------------
  // 8: HTML / CSS / JS MINIFIER
  // --------------------------------------------------------------------------
  const [minifyLang, setMinifyLang] = useState<'html' | 'css' | 'js'>('css');
  const [rawCode, setRawCode] = useState(`/* Business Volunteers Primary Button */
.btn-primary {
  background-color: #FF4E27;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 999px;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 78, 39, 0.4);
}`);

  const minifiedResult = useMemo(() => {
    let code = rawCode;
    if (minifyLang === 'css') {
      code = code.replace(/\/\*[\s\S]*?\*\//g, ''); // comments
      code = code.replace(/\s*([{:;,])\s*/g, '$1');
      code = code.replace(/;\}/g, '}');
      code = code.replace(/\s+/g, ' ').trim();
    } else if (minifyLang === 'html') {
      code = code.replace(/<!--[\s\S]*?-->/g, ''); // comments
      code = code.replace(/>\s+</g, '><');
      code = code.replace(/\s{2,}/g, ' ').trim();
    } else {
      code = code.replace(/\/\*[\s\S]*?\*\//g, '');
      code = code.replace(/(^|[^\\])\/\/.*$/gm, '');
      code = code.replace(/\s*([=+\-*/%&|<>!?:;,{}()[\]])\s*/g, '$1');
      code = code.replace(/\s+/g, ' ').trim();
    }
    const origBytes = new Blob([rawCode]).size;
    const miniBytes = new Blob([code]).size;
    const savedBytes = Math.max(0, origBytes - miniBytes);
    const savingsPct = origBytes > 0 ? ((savedBytes / origBytes) * 100).toFixed(1) : '0';
    return { code, origBytes, miniBytes, savedBytes, savingsPct };
  }, [rawCode, minifyLang]);

  // --------------------------------------------------------------------------
  // RENDER BASED ON TOOL ID
  // --------------------------------------------------------------------------

  // 1: JSON FORMATTER
  if (tool.id === 'json-formatter') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">SYNTAX & TREE</span>
            <h2 className="bv-panel-title">JSON Formatter & Validator</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Raw JSON Input</span>
            <textarea
              className="bv-input bv-textarea"
              rows={10}
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              placeholder="Paste raw JSON here..."
              style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
          </label>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <button type="button" className={jsonIndent === 2 ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }} onClick={() => setJsonIndent(2)}>
              2 Spaces
            </button>
            <button type="button" className={jsonIndent === 4 ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }} onClick={() => setJsonIndent(4)}>
              4 Spaces
            </button>
            <button type="button" className={jsonIndent === 0 ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }} onClick={() => setJsonIndent(0)}>
              Minify
            </button>
          </div>
        </div>

        {/* JSON OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: jsonResult.error ? '#FEF2F2' : '#ECFDF5', color: jsonResult.error ? '#DC2626' : '#059669' }}>
              {jsonResult.error ? 'INVALID SYNTAX' : 'VALID JSON'}
            </span>
            <h2 className="bv-panel-title">Formatted Output</h2>
          </div>

          {jsonResult.error ? (
            <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '12px', color: '#DC2626', fontSize: '0.85rem' }}>
              <strong>Error:</strong> {jsonResult.error}
            </div>
          ) : (
            <>
              <textarea
                className="bv-input bv-textarea"
                rows={11}
                readOnly
                value={jsonResult.formatted}
                style={{ fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: '#F8FAFC', marginBottom: '1rem' }}
              />
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(jsonResult.formatted)}>
                  {copied ? '✓ Copied!' : 'Copy Formatted JSON'}
                </button>
                <button type="button" className="btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => downloadText(jsonResult.formatted, 'formatted.json', 'application/json')}>
                  Download (.json)
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // 2: BASE64
  if (tool.id === 'base64-encoder-decoder') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">RFC 4648</span>
            <h2 className="bv-panel-title">Base64 Converter</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            <button type="button" className={b64Mode === 'encode' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.6rem' }} onClick={() => setB64Mode('encode')}>
              Encode to Base64
            </button>
            <button type="button" className={b64Mode === 'decode' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.6rem' }} onClick={() => setB64Mode('decode')}>
              Decode Base64
            </button>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">{b64Mode === 'encode' ? 'Plain Text to Encode' : 'Base64 String to Decode'}</span>
            <textarea
              className="bv-input bv-textarea"
              rows={8}
              value={b64Input}
              onChange={e => setB64Input(e.target.value)}
              placeholder="Enter text or string..."
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginTop: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={b64UrlSafe} onChange={e => setB64UrlSafe(e.target.checked)} />
            URL-Safe Base64 (RFC 4648 §5: replace +/ with -_ and strip =)
          </label>
        </div>

        {/* BASE64 OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>RESULT</span>
            <h2 className="bv-panel-title">{b64Mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</h2>
          </div>

          {b64Result.error ? (
            <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '12px', color: '#DC2626', fontSize: '0.85rem' }}>
              {b64Result.error}
            </div>
          ) : (
            <>
              <textarea
                className="bv-input bv-textarea"
                rows={9}
                readOnly
                value={b64Result.text}
                style={{ fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: '#F8FAFC', marginBottom: '1rem' }}
              />
              <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(b64Result.text)}>
                {copied ? '✓ Copied!' : 'Copy Result'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // 3: URL ENCODER / DECODER
  if (tool.id === 'url-encoder-decoder') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">RFC 3986</span>
            <h2 className="bv-panel-title">URL Encoder / Decoder</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            <button type="button" className={urlMode === 'encode' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.6rem' }} onClick={() => setUrlMode('encode')}>
              Encode URL
            </button>
            <button type="button" className={urlMode === 'decode' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.6rem' }} onClick={() => setUrlMode('decode')}>
              Decode URL
            </button>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">URL or Parameter String</span>
            <textarea
              className="bv-input bv-textarea"
              rows={7}
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
            />
          </label>

          {urlMode === 'encode' && (
            <label className="bv-field" style={{ marginTop: '0.75rem' }}>
              <span className="bv-field-label">Encoding Scope</span>
              <select className="bv-input bv-select" value={urlEncodeType} onChange={e => setUrlEncodeType(e.target.value as any)}>
                <option value="component">encodeURIComponent (Safe for query parameter values)</option>
                <option value="full">encodeURI (Preserves http://, slashes, &amp; query separators)</option>
              </select>
            </label>
          )}
        </div>

        {/* URL OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>PROCESSED URL</span>
            <h2 className="bv-panel-title">Output Result</h2>
          </div>

          <textarea
            className="bv-input bv-textarea"
            rows={6}
            readOnly
            value={urlResult.text}
            style={{ fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: '#F8FAFC', marginBottom: '1rem' }}
          />

          {parsedParams && parsedParams.params.length > 0 && (
            <div style={{ marginBottom: '1.25rem', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ padding: '0.5rem 0.75rem', background: '#F8FAFC', fontWeight: 800, fontSize: '0.8rem', borderBottom: '1px solid #E2E8F0' }}>
                Detected Query Parameters ({parsedParams.params.length})
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <tbody>
                  {parsedParams.params.map((p, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.4rem 0.75rem', fontWeight: 700, color: '#FF4E27' }}>{p.key}</td>
                      <td style={{ padding: '0.4rem 0.75rem', color: '#334155' }}>{p.val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(urlResult.text)}>
            {copied ? '✓ Copied!' : 'Copy Result'}
          </button>
        </div>
      </div>
    );
  }

  // 4: UUID GENERATOR
  if (tool.id === 'uuid-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">RFC 4122 / DRAFT-04</span>
            <h2 className="bv-panel-title">UUID / GUID Generator</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            <button type="button" className={uuidVersion === 'v4' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.6rem' }} onClick={() => setUuidVersion('v4')}>
              UUID v4 (Random)
            </button>
            <button type="button" className={uuidVersion === 'v7' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.6rem' }} onClick={() => setUuidVersion('v7')}>
              UUID v7 (Time-Ordered)
            </button>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Quantity: {uuidCount} UUIDs</span>
            <input
              type="range"
              min={1}
              max={50}
              value={uuidCount}
              onChange={e => setUuidCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FF4E27' }}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Letter Casing</span>
              <select className="bv-input bv-select" value={uuidCase} onChange={e => setUuidCase(e.target.value as any)}>
                <option value="lower">lowercase</option>
                <option value="upper">UPPERCASE</option>
              </select>
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Hyphens</span>
              <select className="bv-input bv-select" value={uuidHyphens ? 'yes' : 'no'} onChange={e => setUuidHyphens(e.target.value === 'yes')}>
                <option value="yes">With Hyphens</option>
                <option value="no">Compact (No Hyphens)</option>
              </select>
            </label>
          </div>

          <button type="button" className="btn-primary" style={{ padding: '0.75rem 1.5rem', marginTop: '1.25rem' }} onClick={regenerateUuids}>
            🔄 Regenerate UUIDs
          </button>
        </div>

        {/* UUID OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>UNIQUE IDENTIFIERS</span>
            <h2 className="bv-panel-title">Generated List</h2>
          </div>

          <textarea
            className="bv-input bv-textarea"
            rows={9}
            readOnly
            value={uuidsList.join('\n')}
            style={{ fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: '#F8FAFC', marginBottom: '1rem' }}
          />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(uuidsList.join('\n'))}>
              {copied ? '✓ Copied All!' : 'Copy All UUIDs'}
            </button>
            <button type="button" className="btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => downloadText(uuidsList.join('\n'), 'uuids.txt')}>
              Download (.txt)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5: REGEX TESTER
  if (tool.id === 'regex-tester') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">PATTERN TEST</span>
            <h2 className="bv-panel-title">Regular Expression Tester</h2>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <span className="bv-field-label">Regular Expression Pattern</span>
              <input
                type="text"
                className="bv-input"
                style={{ fontFamily: 'monospace' }}
                value={regexPattern}
                onChange={e => setRegexPattern(e.target.value)}
              />
            </div>
            <div style={{ width: '80px' }}>
              <span className="bv-field-label">Flags</span>
              <input
                type="text"
                className="bv-input"
                style={{ fontFamily: 'monospace' }}
                value={regexFlags}
                onChange={e => setRegexFlags(e.target.value)}
              />
            </div>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Test String / Corpus</span>
            <textarea
              className="bv-input bv-textarea"
              rows={8}
              value={regexTestText}
              onChange={e => setRegexTestText(e.target.value)}
            />
          </label>
        </div>

        {/* REGEX OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: regexMatches.error ? '#FEF2F2' : '#ECFDF5', color: regexMatches.error ? '#DC2626' : '#059669' }}>
              {regexMatches.error ? 'REGEX ERROR' : `${regexMatches.list.length} MATCHES`}
            </span>
            <h2 className="bv-panel-title">Match Results</h2>
          </div>

          {regexMatches.error ? (
            <div style={{ padding: '1rem', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: '12px', color: '#DC2626', fontSize: '0.85rem' }}>
              {regexMatches.error}
            </div>
          ) : (
            <div style={{ maxHeight: '280px', overflowY: 'auto', border: '1px solid #E2E8F0', borderRadius: '10px', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', position: 'sticky', top: 0 }}>
                  <tr>
                    <th style={{ padding: '0.5rem', textAlign: 'left' }}>#</th>
                    <th style={{ padding: '0.5rem', textAlign: 'left' }}>Match</th>
                    <th style={{ padding: '0.5rem', textAlign: 'right' }}>Index</th>
                  </tr>
                </thead>
                <tbody>
                  {regexMatches.list.map((m, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.5rem', color: '#94A3B8' }}>{i + 1}</td>
                      <td style={{ padding: '0.5rem', fontWeight: 700, color: '#FF4E27' }}>
                        <code>{m.match}</code>
                      </td>
                      <td style={{ padding: '0.5rem', textAlign: 'right', color: '#64748B' }}>pos {m.index}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 6: TIMESTAMP CONVERTER
  if (tool.id === 'timestamp-converter') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">EPOCH & TIME</span>
            <h2 className="bv-panel-title">Timestamp Converter</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Unix Timestamp (Seconds or Milliseconds)</span>
            <input
              type="text"
              className="bv-input"
              value={epochInput}
              onChange={e => setEpochInput(e.target.value)}
            />
          </label>

          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', marginTop: '0.75rem' }}
            onClick={() => setEpochInput(Math.floor(Date.now() / 1000).toString())}
          >
            ⚡ Use Current Time ({Math.floor(Date.now() / 1000)})
          </button>
        </div>

        {/* TIMESTAMP OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>HUMAN DATE</span>
            <h2 className="bv-panel-title">Timezone Conversions</h2>
          </div>

          {parsedDate ? (
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.25rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.65rem 1rem', color: '#64748B', fontWeight: 600 }}>IST (India Standard)</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'right', fontWeight: 800, color: '#FF4E27' }}>{parsedDate.ist}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.65rem 1rem', color: '#64748B', fontWeight: 600 }}>UTC / GMT</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'right', fontWeight: 700 }}>{parsedDate.utc}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.65rem 1rem', color: '#64748B', fontWeight: 600 }}>ISO 8601</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'right', fontFamily: 'monospace' }}>{parsedDate.iso}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.65rem 1rem', color: '#64748B', fontWeight: 600 }}>Relative Time</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'right', color: '#059669', fontWeight: 700 }}>{parsedDate.relative}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ color: '#DC2626', fontSize: '0.85rem' }}>Invalid timestamp provided.</div>
          )}

          {parsedDate && (
            <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(parsedDate.iso)}>
              {copied ? '✓ Copied ISO!' : 'Copy ISO 8601'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 7: COLOR CONVERTER
  if (tool.id === 'color-converter') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">PALETTE & CONTRAST</span>
            <h2 className="bv-panel-title">Color Converter & Contrast</h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            <input
              type="color"
              value={colorCalculations.isValid ? colorCalculations.hex : '#FF4E27'}
              onChange={e => setHexColor(e.target.value)}
              style={{ width: '60px', height: '60px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
            />
            <div style={{ flex: 1 }}>
              <span className="bv-field-label">HEX Color Code</span>
              <input
                type="text"
                className="bv-input"
                value={hexColor}
                onChange={e => setHexColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* COLOR OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>FORMATS & WCAG</span>
            <h2 className="bv-panel-title">Color Codes</h2>
          </div>

          {colorCalculations.isValid && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>HEX</div>
                  <div style={{ fontWeight: 800, marginTop: '0.2rem' }}>{colorCalculations.hex}</div>
                </div>
                <div style={{ padding: '0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>RGB</div>
                  <div style={{ fontWeight: 800, marginTop: '0.2rem', fontSize: '0.85rem' }}>{colorCalculations.rgb}</div>
                </div>
                <div style={{ padding: '0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>HSL</div>
                  <div style={{ fontWeight: 800, marginTop: '0.2rem', fontSize: '0.85rem' }}>{colorCalculations.hsl}</div>
                </div>
                <div style={{ padding: '0.75rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700 }}>CMYK</div>
                  <div style={{ fontWeight: 800, marginTop: '0.2rem', fontSize: '0.85rem' }}>{colorCalculations.cmyk}</div>
                </div>
              </div>

              <div style={{ padding: '1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0B132A', marginBottom: '0.5rem' }}>WCAG 2.1 Contrast Ratios</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                  <span>Against White (#FFF): <strong>{colorCalculations.contrastWhite}:1</strong></span>
                  <span style={{ color: colorCalculations.passWhiteAA ? '#16A34A' : '#DC2626', fontWeight: 800 }}>
                    {colorCalculations.passWhiteAA ? '✓ AA PASS' : '✕ AA FAIL'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>Against Black (#000): <strong>{colorCalculations.contrastBlack}:1</strong></span>
                  <span style={{ color: colorCalculations.passBlackAA ? '#16A34A' : '#DC2626', fontWeight: 800 }}>
                    {colorCalculations.passBlackAA ? '✓ AA PASS' : '✕ AA FAIL'}
                  </span>
                </div>
              </div>

              <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(colorCalculations.hex || '')}>
                {copied ? '✓ Copied!' : 'Copy HEX'}
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // 8: HTML / CSS / JS MINIFIER
  if (tool.id === 'html-css-js-minifier') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">COMPRESSION</span>
            <h2 className="bv-panel-title">HTML, CSS &amp; JS Minifier</h2>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <button type="button" className={minifyLang === 'css' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => setMinifyLang('css')}>
              CSS
            </button>
            <button type="button" className={minifyLang === 'html' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => setMinifyLang('html')}>
              HTML
            </button>
            <button type="button" className={minifyLang === 'js' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => setMinifyLang('js')}>
              JavaScript
            </button>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Original Code</span>
            <textarea
              className="bv-input bv-textarea"
              rows={9}
              value={rawCode}
              onChange={e => setRawCode(e.target.value)}
              style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
          </label>
        </div>

        {/* MINIFIER OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>
              SAVED {minifiedResult.savingsPct}%
            </span>
            <h2 className="bv-panel-title">Minified Result</h2>
          </div>

          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', marginBottom: '1rem' }}>
            <div>Original: <strong>{minifiedResult.origBytes} B</strong></div>
            <div style={{ color: '#059669' }}>Minified: <strong>{minifiedResult.miniBytes} B</strong></div>
            <div style={{ color: '#FF4E27' }}>Saved: <strong>{minifiedResult.savedBytes} B</strong></div>
          </div>

          <textarea
            className="bv-input bv-textarea"
            rows={8}
            readOnly
            value={minifiedResult.code}
            style={{ fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: '#F8FAFC', marginBottom: '1rem' }}
          />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(minifiedResult.code)}>
              {copied ? '✓ Copied!' : 'Copy Minified Code'}
            </button>
            <button type="button" className="btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => downloadText(minifiedResult.code, `minified.${minifyLang}`)}>
              Download (.min)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
