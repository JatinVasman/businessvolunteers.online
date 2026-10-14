import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { ToolMeta } from '../../../data/toolsData';
import { copyToClipboard, downloadBlob } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

export const MarketingRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --------------------------------------------------------------------------
  // SOCIAL RESIZERS (Instagram, Facebook, LinkedIn, YouTube, Reels)
  // --------------------------------------------------------------------------
  const [socialFile, setSocialFile] = useState<File | null>(null);
  const [socialPreviewUrl, setSocialPreviewUrl] = useState<string | null>(null);
  const [fitMode, setFitMode] = useState<'blur' | 'cover' | 'contain'>('blur');

  // Determine preset dimension from tool.id
  let targetW = 1080;
  let targetH = 1080;
  let presetName = 'Instagram Square (1080 x 1080)';

  if (tool.id === 'facebook-cover-resizer') {
    targetW = 820;
    targetH = 312;
    presetName = 'Facebook Page Cover (820 x 312)';
  } else if (tool.id === 'linkedin-banner-resizer') {
    targetW = 1584;
    targetH = 396;
    presetName = 'LinkedIn Banner (1584 x 396)';
  } else if (tool.id === 'youtube-thumbnail-resizer') {
    targetW = 1280;
    targetH = 720;
    presetName = 'YouTube Thumbnail 16:9 (1280 x 720)';
  } else if (tool.id === 'reels-and-shorts-resizer') {
    targetW = 1080;
    targetH = 1920;
    presetName = 'Reels & Shorts 9:16 (1080 x 1920)';
  }

  // Handle image render on canvas
  useEffect(() => {
    if (!socialPreviewUrl || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, targetW, targetH);

      if (fitMode === 'blur') {
        // Draw heavily blurred background
        ctx.save();
        ctx.filter = 'blur(20px) brightness(0.7)';
        ctx.drawImage(img, -20, -20, targetW + 40, targetH + 40);
        ctx.restore();

        // Draw centered contained image
        const imgAspect = img.width / img.height;
        let dw = targetW;
        let dh = dw / imgAspect;
        if (dh > targetH) {
          dh = targetH;
          dw = dh * imgAspect;
        }
        const dx = (targetW - dw) / 2;
        const dy = (targetH - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      } else if (fitMode === 'cover') {
        // Cover fill
        const imgAspect = img.width / img.height;
        const targetAspect = targetW / targetH;
        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (imgAspect > targetAspect) {
          sw = img.height * targetAspect;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / targetAspect;
          sy = (img.height - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH);
      } else {
        // Contain with white background
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, targetW, targetH);
        const imgAspect = img.width / img.height;
        let dw = targetW;
        let dh = dw / imgAspect;
        if (dh > targetH) {
          dh = targetH;
          dw = dh * imgAspect;
        }
        const dx = (targetW - dw) / 2;
        const dy = (targetH - dh) / 2;
        ctx.drawImage(img, dx, dy, dw, dh);
      }
    };
    img.src = socialPreviewUrl;
  }, [socialPreviewUrl, targetW, targetH, fitMode]);

  // --------------------------------------------------------------------------
  // 6: CAPTION GENERATOR
  // --------------------------------------------------------------------------
  const [captionTopic, setCaptionTopic] = useState('New e-commerce shipping automation tool');
  const [captionPlatform, setCaptionPlatform] = useState<'instagram' | 'linkedin' | 'x'>('instagram');
  const [captionTone, setCaptionTone] = useState<'high_energy' | 'professional' | 'minimal'>('high_energy');
  const [generatedCaption, setGeneratedCaption] = useState('');

  const executeGenerateCaption = () => {
    let hook = '';
    let body = '';
    let cta = '';
    let tags = '#BusinessTools #EcommerceGrowth #IndiaBusiness #Automation #StartupIndia';

    if (captionTone === 'high_energy') {
      hook = `🚀 Stop wasting hours on manual work! Meet our ${captionTopic}.`;
      body = `We built this browser-first utility so Indian founders & sellers can move 10x faster. 100% private, free, and runs directly on your device.`;
      cta = `👉 Tap the link in bio to try it free! Which feature are you most excited about? Drop a comment below! 👇`;
    } else if (captionTone === 'professional') {
      hook = `Scaling an enterprise requires eliminating administrative friction. Introducing our latest solution for ${captionTopic}.`;
      body = `Engineered for modern operators, this utility processes data client-side with zero server latency or data leakage risks.`;
      cta = `Explore the complete directory at businessvolunteers.online/tools and streamline your operations today.`;
    } else {
      hook = `${captionTopic}. Clean, private, free.`;
      body = `No sign-up. No credit card. Just pure utility for modern builders.`;
      cta = `Link in bio.`;
    }

    setGeneratedCaption(`${hook}\n\n${body}\n\n${cta}\n\n${tags}`);
  };

  // --------------------------------------------------------------------------
  // 7: UTM BUILDER
  // --------------------------------------------------------------------------
  const [utmUrl, setUtmUrl] = useState('https://businessvolunteers.online');
  const [utmSource, setUtmSource] = useState('linkedin');
  const [utmMedium, setUtmMedium] = useState('social_post');
  const [utmCampaign, setUtmCampaign] = useState('october_tools_launch');
  const [utmTerm, setUtmTerm] = useState('');
  const [utmContent, setUtmContent] = useState('banner_variant_a');

  const fullUtmUrl = useMemo(() => {
    try {
      const base = utmUrl.trim() || 'https://businessvolunteers.online';
      const u = new URL(base.startsWith('http') ? base : 'https://' + base);
      if (utmSource) u.searchParams.set('utm_source', utmSource);
      if (utmMedium) u.searchParams.set('utm_medium', utmMedium);
      if (utmCampaign) u.searchParams.set('utm_campaign', utmCampaign);
      if (utmTerm) u.searchParams.set('utm_term', utmTerm);
      if (utmContent) u.searchParams.set('utm_content', utmContent);
      return u.toString();
    } catch {
      return '';
    }
  }, [utmUrl, utmSource, utmMedium, utmCampaign, utmTerm, utmContent]);

  // --------------------------------------------------------------------------
  // 8: WHATSAPP LINK
  // --------------------------------------------------------------------------
  const [waPhone, setWaPhone] = useState('9876543210');
  const [waText, setWaText] = useState('Hi! I need a consultation for my e-commerce business.');
  const waFullLink = `https://wa.me/91${waPhone}?text=${encodeURIComponent(waText)}`;

  // --------------------------------------------------------------------------
  // 9: GOOGLE SNIPPET PREVIEW
  // --------------------------------------------------------------------------
  const [serpTitle, setSerpTitle] = useState('106 Free Business & E-Commerce Tools | Business Volunteers');
  const [serpUrl, setSerpUrl] = useState('https://businessvolunteers.online/tools');
  const [serpDesc, setSerpDesc] = useState(
    'Free client-side tools for Indian sellers and founders: GST calculators, Amazon & Flipkart label croppers, PDF editors, QR codes, and developer utilities.'
  );

  return (
    <div className="bv-tool-layout">
      {/* INPUTS PANEL */}
      <div className="bv-tool-panel bv-inputs-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge">MARKETING SUITE</span>
          <h2 className="bv-panel-title">{tool.name}</h2>
        </div>

        {/* SOCIAL RESIZERS */}
        {(tool.id.includes('resizer') || tool.id === 'instagram-image-resizer') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-dropzone">
              <div className="bv-dropzone-icon">🖼️</div>
              <div className="bv-dropzone-text"><strong>Choose Image</strong> to resize for {presetName}</div>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) {
                    setSocialFile(f);
                    setSocialPreviewUrl(URL.createObjectURL(f));
                  }
                }}
                className="bv-file-input"
              />
              {socialFile && (
                <div style={{ fontSize: '0.8rem', color: '#059669', marginTop: '0.4rem', fontWeight: 600 }}>
                  ✓ {socialFile.name} ({(socialFile.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Border Fitting Mode</span>
              <select className="bv-input bv-select" value={fitMode} onChange={e => setFitMode(e.target.value as any)}>
                <option value="blur">Aesthetic Blur Background Fill (Recommended)</option>
                <option value="cover">Crop to Fill Frame</option>
                <option value="contain">Clean White Border</option>
              </select>
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={!socialPreviewUrl}
              onClick={() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                canvas.toBlob(blob => {
                  if (blob) downloadBlob(blob, `${tool.id}_${targetW}x${targetH}.jpg`);
                }, 'image/jpeg', 0.95);
              }}
            >
              📥 Download {targetW}x{targetH} Image
            </button>
          </div>
        )}

        {/* 6: CAPTION GENERATOR */}
        {tool.id === 'social-media-caption-generator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Topic / Product Announcement</span>
              <input
                type="text"
                className="bv-input"
                value={captionTopic}
                onChange={e => setCaptionTopic(e.target.value)}
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Platform</span>
                <select className="bv-input bv-select" value={captionPlatform} onChange={e => setCaptionPlatform(e.target.value as any)}>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="x">Twitter / X</option>
                </select>
              </label>

              <label className="bv-field">
                <span className="bv-field-label">Tone of Voice</span>
                <select className="bv-input bv-select" value={captionTone} onChange={e => setCaptionTone(e.target.value as any)}>
                  <option value="high_energy">High Energy &amp; Viral</option>
                  <option value="professional">Professional / B2B</option>
                  <option value="minimal">Minimalist Hook</option>
                </select>
              </label>
            </div>

            <button type="button" className="btn-primary" style={{ padding: '0.75rem' }} onClick={executeGenerateCaption}>
              ✨ Generate Captions &amp; Hashtags
            </button>
          </div>
        )}

        {/* 7: UTM BUILDER */}
        {tool.id === 'utm-builder' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Destination URL</span>
              <input
                type="text"
                className="bv-input"
                value={utmUrl}
                onChange={e => setUtmUrl(e.target.value)}
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Campaign Source (utm_source)</span>
                <input
                  type="text"
                  className="bv-input"
                  value={utmSource}
                  onChange={e => setUtmSource(e.target.value)}
                  placeholder="google, newsletter, linkedin"
                />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Campaign Medium (utm_medium)</span>
                <input
                  type="text"
                  className="bv-input"
                  value={utmMedium}
                  onChange={e => setUtmMedium(e.target.value)}
                  placeholder="cpc, email, social"
                />
              </label>
            </div>

            <label className="bv-field">
              <span className="bv-field-label">Campaign Name (utm_campaign)</span>
              <input
                type="text"
                className="bv-input"
                value={utmCampaign}
                onChange={e => setUtmCampaign(e.target.value)}
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Campaign Term (utm_term, optional)</span>
                <input
                  type="text"
                  className="bv-input"
                  value={utmTerm}
                  onChange={e => setUtmTerm(e.target.value)}
                  placeholder="e.g. running+shoes"
                />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Campaign Content (utm_content, optional)</span>
                <input
                  type="text"
                  className="bv-input"
                  value={utmContent}
                  onChange={e => setUtmContent(e.target.value)}
                  placeholder="e.g. banner_variant_a"
                />
              </label>
            </div>
          </div>
        )}

        {/* 8: WHATSAPP LINK */}
        {tool.id === 'whatsapp-link-generator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">WhatsApp Mobile (with Country Code 91)</span>
              <input
                type="text"
                className="bv-input"
                value={waPhone}
                onChange={e => setWaPhone(e.target.value)}
              />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Greeting Message</span>
              <textarea
                className="bv-input bv-textarea"
                rows={4}
                value={waText}
                onChange={e => setWaText(e.target.value)}
              />
            </label>
          </div>
        )}

        {/* 9: GOOGLE SNIPPET PREVIEW */}
        {tool.id === 'google-snippet-preview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">SEO Page Title ({serpTitle.length} chars)</span>
              <input
                type="text"
                className="bv-input"
                value={serpTitle}
                onChange={e => setSerpTitle(e.target.value)}
              />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Page URL / Breadcrumb</span>
              <input
                type="text"
                className="bv-input"
                value={serpUrl}
                onChange={e => setSerpUrl(e.target.value)}
              />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Meta Description ({serpDesc.length} chars)</span>
              <textarea
                className="bv-input bv-textarea"
                rows={3}
                value={serpDesc}
                onChange={e => setSerpDesc(e.target.value)}
              />
            </label>
          </div>
        )}
      </div>

      {/* RESULTS PANEL */}
      <div className="bv-tool-panel bv-results-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>PREVIEW &amp; EXPORT</span>
          <h2 className="bv-panel-title">Live Result</h2>
        </div>

        {/* Canvas for resizers */}
        {(tool.id.includes('resizer') || tool.id === 'instagram-image-resizer') && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '360px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }} />
          </div>
        )}

        {/* Caption result */}
        {tool.id === 'social-media-caption-generator' && generatedCaption && (
          <>
            <textarea
              className="bv-input bv-textarea"
              rows={9}
              readOnly
              value={generatedCaption}
              style={{ backgroundColor: '#F8FAFC', marginBottom: '1rem' }}
            />
            <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(generatedCaption)}>
              {copied ? '✓ Copied!' : 'Copy Caption & Hashtags'}
            </button>
          </>
        )}

        {/* UTM Result */}
        {tool.id === 'utm-builder' && (
          <>
            <div style={{ padding: '1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {fullUtmUrl}
            </div>
            <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(fullUtmUrl)}>
              {copied ? '✓ Copied!' : 'Copy Tracking Link'}
            </button>
          </>
        )}

        {/* WhatsApp Link result */}
        {tool.id === 'whatsapp-link-generator' && (
          <>
            <div style={{ padding: '1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {waFullLink}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(waFullLink)}>
                {copied ? '✓ Copied!' : 'Copy Link'}
              </button>
              <a href={waFullLink} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', textDecoration: 'none' }}>
                Open Chat ↗
              </a>
            </div>
          </>
        )}

        {/* Google Snippet preview */}
        {tool.id === 'google-snippet-preview' && (
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '0.8rem', color: '#202124', marginBottom: '0.25rem' }}>
              {serpUrl}
            </div>
            <div style={{ fontSize: '1.25rem', color: '#1A0DAB', fontWeight: 600, lineHeight: 1.3, marginBottom: '0.35rem', cursor: 'pointer' }}>
              {serpTitle}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#4D5156', lineHeight: 1.5 }}>
              {serpDesc}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
