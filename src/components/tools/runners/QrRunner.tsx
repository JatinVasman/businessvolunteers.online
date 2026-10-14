import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';
import JSZip from 'jszip';
import type { ToolMeta } from '../../../data/toolsData';
import { copyToClipboard, downloadBlob } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

export const QrRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --------------------------------------------------------------------------
  // 1: STANDARD QR CODE GENERATOR
  // --------------------------------------------------------------------------
  const [qrText, setQrText] = useState('https://businessvolunteers.online');
  const [qrFgColor, setQrFgColor] = useState('#0B132A');
  const [qrBgColor, setQrBgColor] = useState('#FFFFFF');
  const [qrSize, setQrSize] = useState<number>(300);
  const [qrEcLevel, setQrEcLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  // --------------------------------------------------------------------------
  // 2: CUSTOM LOGO QR
  // --------------------------------------------------------------------------
  const [logoImg, setLogoImg] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // 3: BULK QR
  // --------------------------------------------------------------------------
  const [bulkInput, setBulkInput] = useState("SKU-1001,Wireless Mouse\nSKU-1002,Mechanical Keyboard\nSKU-1003,USB-C Hub\nSKU-1004,Laptop Stand");
  const [bulkProgress, setBulkProgress] = useState<string | null>(null);

  // --------------------------------------------------------------------------
  // 4: UPI QR
  // --------------------------------------------------------------------------
  const [upiVpa, setUpiVpa] = useState('businessvolunteers@icici');
  const [upiName, setUpiName] = useState('Business Volunteers');
  const [upiAmount, setUpiAmount] = useState<string>('500');
  const [upiNote, setUpiNote] = useState('Consultation Fee');

  const upiLink = `upi://pay?pa=${encodeURIComponent(upiVpa)}&pn=${encodeURIComponent(upiName)}${upiAmount ? `&am=${encodeURIComponent(upiAmount)}` : ''}&tn=${encodeURIComponent(upiNote)}&cu=INR`;

  // --------------------------------------------------------------------------
  // 5: WHATSAPP QR
  // --------------------------------------------------------------------------
  const [waCountry, setWaCountry] = useState('91');
  const [waPhone, setWaPhone] = useState('9876543210');
  const [waMsg, setWaMsg] = useState('Hello! I would like to learn more about your services.');

  const waLink = `https://wa.me/${waCountry}${waPhone}?text=${encodeURIComponent(waMsg)}`;

  // --------------------------------------------------------------------------
  // 6: WIFI QR
  // --------------------------------------------------------------------------
  const [wifiSsid, setWifiSsid] = useState('BV_Guest_HighSpeed');
  const [wifiType, setWifiType] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiPass, setWifiPass] = useState('Welcome@2026');
  const [wifiHidden, setWifiHidden] = useState(false);

  const wifiPayload = `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};H:${wifiHidden ? 'true' : 'false'};;`;

  // --------------------------------------------------------------------------
  // 7: BARCODE GENERATOR
  // --------------------------------------------------------------------------
  const [barcodeText, setBarcodeText] = useState('890103091234');
  const [barcodeFormat, setBarcodeFormat] = useState<'CODE128' | 'EAN13' | 'EAN8' | 'UPC' | 'CODE39'>('CODE128');

  // --------------------------------------------------------------------------
  // CANVAS RENDER EFFECT
  // --------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let payload = qrText;
    let ec: 'L' | 'M' | 'Q' | 'H' = qrEcLevel;

    if (tool.id === 'upi-qr-generator') {
      payload = upiLink;
      ec = 'M';
    } else if (tool.id === 'whatsapp-qr-generator') {
      payload = waLink;
      ec = 'M';
    } else if (tool.id === 'wifi-qr-generator') {
      payload = wifiPayload;
      ec = 'M';
    } else if (tool.id === 'custom-logo-qr-generator') {
      payload = qrText;
      ec = 'H'; // Enforce high error correction for logo
    }

    if (tool.id !== 'barcode-generator' && tool.id !== 'bulk-qr-code-generator') {
      QRCode.toCanvas(
        canvas,
        payload || 'https://businessvolunteers.online',
        {
          width: qrSize,
          margin: 2,
          color: {
            dark: qrFgColor,
            light: qrBgColor,
          },
          errorCorrectionLevel: ec,
        },
        err => {
          if (err) console.error(err);
          // If custom logo is provided, draw it in the center
          if (tool.id === 'custom-logo-qr-generator' && logoImg && !err) {
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const img = new Image();
            img.src = logoImg;
            img.onload = () => {
              const centerSize = qrSize * 0.22;
              const centerPos = (qrSize - centerSize) / 2;
              // Draw white buffer background
              ctx.fillStyle = '#FFFFFF';
              ctx.beginPath();
              ctx.arc(qrSize / 2, qrSize / 2, centerSize / 1.6, 0, Math.PI * 2);
              ctx.fill();
              // Draw logo image
              ctx.drawImage(img, centerPos, centerPos, centerSize, centerSize);
            };
          }
        }
      );
    }
  }, [
    tool.id,
    qrText,
    qrFgColor,
    qrBgColor,
    qrSize,
    qrEcLevel,
    logoImg,
    upiLink,
    waLink,
    wifiPayload,
  ]);

  // Barcode Render Effect
  useEffect(() => {
    if (tool.id === 'barcode-generator' && svgRef.current) {
      try {
        let text = barcodeText.trim();
        // If EAN-13 has 12 digits, calculate checksum
        if (barcodeFormat === 'EAN13' && text.length === 12 && /^\d+$/.test(text)) {
          let sum = 0;
          for (let i = 0; i < 12; i++) {
            sum += parseInt(text[i], 10) * (i % 2 === 0 ? 1 : 3);
          }
          const checksum = (10 - (sum % 10)) % 10;
          text += checksum;
        }

        JsBarcode(svgRef.current, text || '12345678', {
          format: barcodeFormat,
          lineColor: '#0B132A',
          width: 2,
          height: 100,
          displayValue: true,
          font: 'Outfit',
          fontSize: 16,
        });
      } catch (e) {
        console.warn('Barcode error: ', e);
      }
    }
  }, [tool.id, barcodeText, barcodeFormat]);

  const downloadCanvasAsPng = (filename: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(blob => {
      if (blob) downloadBlob(blob, filename);
    });
  };

  const handleBulkGenerate = async () => {
    const lines = bulkInput
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    if (!lines.length) return;

    setBulkProgress(`Generating 1 of ${lines.length}...`);
    const zip = new JSZip();

    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(',');
      const val = parts[0].trim();
      const filename = (parts[1]?.trim() || `qr_${i + 1}`).replace(/[^a-z0-9_-]/gi, '_') + '.png';

      const dataUrl = await QRCode.toDataURL(val, {
        width: 400,
        margin: 2,
        errorCorrectionLevel: 'M',
      });
      const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
      zip.file(filename, base64Data, { base64: true });

      setBulkProgress(`Generated ${i + 1} of ${lines.length}...`);
    }

    setBulkProgress('Packaging ZIP archive...');
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(zipBlob, 'bulk_qr_codes.zip');
    setBulkProgress(null);
  };

  // --------------------------------------------------------------------------
  // RENDER PER TOOL ID
  // --------------------------------------------------------------------------

  // 1 & 2: QR & LOGO QR
  if (tool.id === 'qr-code-generator' || tool.id === 'custom-logo-qr-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">CONFIGURATION</span>
            <h2 className="bv-panel-title">{tool.name}</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Target URL or Plain Text</span>
            <textarea
              className="bv-input bv-textarea"
              rows={4}
              value={qrText}
              onChange={e => setQrText(e.target.value)}
              placeholder="https://yourwebsite.com or any text..."
            />
          </label>

          {tool.id === 'custom-logo-qr-generator' && (
            <label className="bv-field" style={{ marginTop: '0.75rem' }}>
              <span className="bv-field-label">Upload Center Logo / Icon</span>
              <input
                type="file"
                accept="image/*"
                className="bv-input"
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) {
                    const reader = new FileReader();
                    reader.onload = ev => setLogoImg(ev.target?.result as string);
                    reader.readAsDataURL(f);
                  }
                }}
              />
              <small className="bv-field-hint">Automatically enforced Level H error correction (30% redundancy) for 100% scan safety.</small>
            </label>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">QR Foreground Color</span>
              <input
                type="color"
                value={qrFgColor}
                onChange={e => setQrFgColor(e.target.value)}
                style={{ width: '100%', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Background Color</span>
              <input
                type="color"
                value={qrBgColor}
                onChange={e => setQrBgColor(e.target.value)}
                style={{ width: '100%', height: '40px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              />
            </label>
          </div>

          <label className="bv-field" style={{ marginTop: '0.75rem' }}>
            <span className="bv-field-label">Error Correction Redundancy</span>
            <select
              className="bv-input bv-select"
              value={qrEcLevel}
              onChange={e => setQrEcLevel(e.target.value as any)}
              disabled={tool.id === 'custom-logo-qr-generator'}
            >
              <option value="L">Level L (7% recovery - compact)</option>
              <option value="M">Level M (15% recovery - standard)</option>
              <option value="Q">Level Q (25% recovery - high durability)</option>
              <option value="H">Level H (30% recovery - best for logos)</option>
            </select>
          </label>

          <label className="bv-field" style={{ marginTop: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="bv-field-label">Resolution / Size: {qrSize}px</span>
            </div>
            <input
              type="range"
              min={200}
              max={600}
              step={50}
              value={qrSize}
              onChange={e => setQrSize(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#FF4E27' }}
            />
          </label>
        </div>

        {/* QR OUTPUT */}
        <div className="bv-tool-panel bv-results-panel" style={{ textAlign: 'center' }}>
          <div className="bv-panel-header" style={{ textAlign: 'left' }}>
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>HIGH RESOLUTION</span>
            <h2 className="bv-panel-title">QR Code Preview</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              onClick={() => downloadCanvasAsPng('qrcode.png')}
            >
              📥 Download PNG (High Res)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3: BULK QR
  if (tool.id === 'bulk-qr-code-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">CSV TO ZIP</span>
            <h2 className="bv-panel-title">Bulk QR Generator</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Paste List (Format: Value, Filename)</span>
            <textarea
              className="bv-input bv-textarea"
              rows={9}
              value={bulkInput}
              onChange={e => setBulkInput(e.target.value)}
              placeholder="https://site.com/sku-1, product_1"
              style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
            <small className="bv-field-hint">One item per line. Each QR code will be generated as a high-resolution PNG.</small>
          </label>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem 1.5rem', marginTop: '1rem', width: '100%' }}
            disabled={!!bulkProgress}
            onClick={handleBulkGenerate}
          >
            {bulkProgress || '⚡ Generate & Download ZIP'}
          </button>
        </div>

        {/* BULK STATUS */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>BATCH ENGINE</span>
            <h2 className="bv-panel-title">Batch Progress</h2>
          </div>

          <div style={{ padding: '1.5rem', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0B132A', margin: 0 }}>
              {bulkInput.split('\n').filter(Boolean).length} QR Codes in Queue
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.4rem' }}>
              All QR codes are compiled client-side in browser memory and packaged into a neat ZIP archive.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 4: UPI QR
  if (tool.id === 'upi-qr-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">NPCI COMPLIANT</span>
            <h2 className="bv-panel-title">UPI Payment QR</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Payee UPI VPA ID</span>
            <input
              type="text"
              className="bv-input"
              value={upiVpa}
              onChange={e => setUpiVpa(e.target.value)}
              placeholder="e.g. yourstore@okaxis"
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Business / Payee Name</span>
              <input
                type="text"
                className="bv-input"
                value={upiName}
                onChange={e => setUpiName(e.target.value)}
              />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Fixed Amount (₹) [Optional]</span>
              <input
                type="number"
                className="bv-input"
                value={upiAmount}
                onChange={e => setUpiAmount(e.target.value)}
                placeholder="Leave blank for dynamic"
              />
            </label>
          </div>

          <label className="bv-field" style={{ marginTop: '0.75rem' }}>
            <span className="bv-field-label">Transaction Note</span>
            <input
              type="text"
              className="bv-input"
              value={upiNote}
              onChange={e => setUpiNote(e.target.value)}
            />
          </label>

          <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.8rem', color: '#64748B' }}>
            URI: <code>{upiLink}</code>
          </div>
        </div>

        {/* UPI OUTPUT */}
        <div className="bv-tool-panel bv-results-panel" style={{ textAlign: 'center' }}>
          <div className="bv-panel-header" style={{ textAlign: 'left' }}>
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>BHIM / GPAY / PHONEPE</span>
            <h2 className="bv-panel-title">Printable QR Standee</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
            <canvas ref={canvasRef} style={{ maxWidth: '240px', height: 'auto', borderRadius: '12px' }} />
            <div style={{ marginTop: '0.75rem', fontWeight: 900, fontSize: '1.2rem', color: '#0B132A' }}>{upiName}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{upiVpa}</div>
            {upiAmount && <div style={{ fontSize: '1.3rem', fontWeight: 900, color: '#FF4E27', marginTop: '0.25rem' }}>₹{upiAmount}</div>}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              onClick={() => downloadCanvasAsPng('upi_qr_standee.png')}
            >
              📥 Download Standee PNG
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
              onClick={() => handleCopy(upiLink)}
            >
              {copied ? '✓ Copied!' : 'Copy UPI Link'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5: WHATSAPP QR
  if (tool.id === 'whatsapp-qr-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">CLICK TO CHAT</span>
            <h2 className="bv-panel-title">WhatsApp Chat QR</h2>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '90px' }}>
              <span className="bv-field-label">Country</span>
              <input
                type="text"
                className="bv-input"
                value={waCountry}
                onChange={e => setWaCountry(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span className="bv-field-label">WhatsApp Mobile Number</span>
              <input
                type="text"
                className="bv-input"
                value={waPhone}
                onChange={e => setWaPhone(e.target.value)}
              />
            </div>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Prefilled Message</span>
            <textarea
              className="bv-input bv-textarea"
              rows={4}
              value={waMsg}
              onChange={e => setWaMsg(e.target.value)}
            />
          </label>
        </div>

        {/* WA OUTPUT */}
        <div className="bv-tool-panel bv-results-panel" style={{ textAlign: 'center' }}>
          <div className="bv-panel-header" style={{ textAlign: 'left' }}>
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>WA.ME LINK</span>
            <h2 className="bv-panel-title">Scannable QR</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
            <canvas ref={canvasRef} style={{ maxWidth: '240px', height: 'auto', borderRadius: '12px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              onClick={() => downloadCanvasAsPng('whatsapp_qr.png')}
            >
              📥 Download PNG
            </button>
            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
              style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem', textDecoration: 'none' }}
            >
              Test Open Chat ↗
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 6: WIFI QR
  if (tool.id === 'wifi-qr-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">GUEST ACCESS</span>
            <h2 className="bv-panel-title">WiFi QR Standee</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Network Name (SSID)</span>
            <input
              type="text"
              className="bv-input"
              value={wifiSsid}
              onChange={e => setWifiSsid(e.target.value)}
            />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.75rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Security Protocol</span>
              <select className="bv-input bv-select" value={wifiType} onChange={e => setWifiType(e.target.value as any)}>
                <option value="WPA">WPA / WPA2 / WPA3</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Password</span>
              <input
                type="text"
                className="bv-input"
                disabled={wifiType === 'nopass'}
                value={wifiPass}
                onChange={e => setWifiPass(e.target.value)}
              />
            </label>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', marginTop: '0.75rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={wifiHidden} onChange={e => setWifiHidden(e.target.checked)} />
            Hidden SSID Network
          </label>
        </div>

        {/* WIFI OUTPUT */}
        <div className="bv-tool-panel bv-results-panel" style={{ textAlign: 'center' }}>
          <div className="bv-panel-header" style={{ textAlign: 'left' }}>
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>TABLE STANDEE</span>
            <h2 className="bv-panel-title">Scan to Connect</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
            <canvas ref={canvasRef} style={{ maxWidth: '240px', height: 'auto', borderRadius: '12px' }} />
            <div style={{ marginTop: '0.75rem', fontWeight: 900, fontSize: '1.2rem', color: '#0B132A' }}>📶 {wifiSsid}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748B' }}>Scan with camera to connect instantly</div>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
            onClick={() => downloadCanvasAsPng('wifi_connect_qr.png')}
          >
            📥 Download Table Standee PNG
          </button>
        </div>
      </div>
    );
  }

  // 7: BARCODE GENERATOR
  if (tool.id === 'barcode-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">RETAIL STANDARDS</span>
            <h2 className="bv-panel-title">Barcode Generator</h2>
          </div>

          <label className="bv-field">
            <span className="bv-field-label">Barcode Symbology</span>
            <select className="bv-input bv-select" value={barcodeFormat} onChange={e => setBarcodeFormat(e.target.value as any)}>
              <option value="CODE128">Code 128 (General SKUs &amp; Inventory)</option>
              <option value="EAN13">EAN-13 (Standard Retail Product Barcode)</option>
              <option value="EAN8">EAN-8 (Compact Retail Barcode)</option>
              <option value="UPC">UPC-A (North American Retail Standard)</option>
              <option value="CODE39">Code 39 (Industrial &amp; Logistics)</option>
            </select>
          </label>

          <label className="bv-field" style={{ marginTop: '0.75rem' }}>
            <span className="bv-field-label">SKU / Code String</span>
            <input
              type="text"
              className="bv-input"
              value={barcodeText}
              onChange={e => setBarcodeText(e.target.value)}
              placeholder="e.g. 890103091234"
            />
            {barcodeFormat === 'EAN13' && barcodeText.length === 12 && (
              <small className="bv-field-hint" style={{ color: '#16A34A', fontWeight: 600 }}>
                ✓ Auto-calculating 13th modulo-10 check digit.
              </small>
            )}
          </label>
        </div>

        {/* BARCODE OUTPUT */}
        <div className="bv-tool-panel bv-results-panel" style={{ textAlign: 'center' }}>
          <div className="bv-panel-header" style={{ textAlign: 'left' }}>
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>SCANNABLE VECTOR</span>
            <h2 className="bv-panel-title">Barcode Preview</h2>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '1.5rem', background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '1.5rem' }}>
            <svg ref={svgRef} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
            onClick={() => {
              const svg = svgRef.current;
              if (!svg) return;
              const serializer = new XMLSerializer();
              const svgBlob = new Blob([serializer.serializeToString(svg)], { type: 'image/svg+xml;charset=utf-8' });
              downloadBlob(svgBlob, `barcode_${barcodeText}.svg`);
            }}
          >
            📥 Download Vector SVG Barcode
          </button>
        </div>
      </div>
    );
  }

  return null;
};
