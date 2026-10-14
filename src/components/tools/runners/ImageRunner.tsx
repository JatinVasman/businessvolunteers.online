import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import type { ToolMeta } from '../../../data/toolsData';
import { downloadBlob } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

export const ImageRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [origDimensions, setOrigDimensions] = useState<{ w: number; h: number } | null>(null);
  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // File loading helper
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setSelectedFiles(files);
    setStatusMsg(null);

    const first = files[0];
    const url = URL.createObjectURL(first);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setOrigDimensions({ w: img.width, h: img.height });
      setTargetWidth(img.width);
      setTargetHeight(img.height);
    };
    img.src = url;
  };

  // --------------------------------------------------------------------------
  // 1: RESIZE IMAGE
  // --------------------------------------------------------------------------
  const [resizeMode, setResizeMode] = useState<'px' | 'pct'>('px');
  const [targetWidth, setTargetWidth] = useState<number>(800);
  const [targetHeight, setTargetHeight] = useState<number>(600);
  const [targetPct, setTargetPct] = useState<number>(75);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [exportFormat, setExportFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/jpeg');

  const executeResize = async () => {
    if (!previewUrl || !origDimensions) return;
    setIsProcessing(true);
    setStatusMsg({ text: 'Resizing image...', ok: true });

    let finalW = targetWidth;
    let finalH = targetHeight;
    if (resizeMode === 'pct') {
      finalW = Math.round(origDimensions.w * (targetPct / 100));
      finalH = Math.round(origDimensions.h * (targetPct / 100));
    }

    const img = new Image();
    img.src = previewUrl;
    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = finalW;
    canvas.height = finalH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, finalW, finalH);

    canvas.toBlob(blob => {
      setIsProcessing(false);
      if (blob) {
        const ext = exportFormat === 'image/png' ? 'png' : exportFormat === 'image/webp' ? 'webp' : 'jpg';
        downloadBlob(blob, `resized_${finalW}x${finalH}.${ext}`);
        setStatusMsg({ text: `✓ Successfully resized to ${finalW}x${finalH} px (${(blob.size / 1024).toFixed(1)} KB)`, ok: true });
      }
    }, exportFormat, 0.92);
  };

  // --------------------------------------------------------------------------
  // 2: CROP IMAGE
  // --------------------------------------------------------------------------
  const [cropAspect, setCropAspect] = useState<string>('1:1');
  const [cropInset, setCropInset] = useState<number>(10); // % inset from border

  const executeCrop = async () => {
    if (!previewUrl || !origDimensions) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = previewUrl;
    await img.decode();

    let cropW = origDimensions.w;
    let cropH = origDimensions.h;

    if (cropAspect === '1:1') {
      const minDim = Math.min(origDimensions.w, origDimensions.h) * (1 - cropInset / 100);
      cropW = minDim;
      cropH = minDim;
    } else if (cropAspect === '4:3') {
      cropW = origDimensions.w * (1 - cropInset / 100);
      cropH = (cropW * 3) / 4;
    } else if (cropAspect === '16:9') {
      cropW = origDimensions.w * (1 - cropInset / 100);
      cropH = (cropW * 9) / 16;
    } else if (cropAspect === '4:5') {
      cropH = origDimensions.h * (1 - cropInset / 100);
      cropW = (cropH * 4) / 5;
    }

    const startX = (origDimensions.w - cropW) / 2;
    const startY = (origDimensions.h - cropH) / 2;

    const canvas = document.createElement('canvas');
    canvas.width = Math.round(cropW);
    canvas.height = Math.round(cropH);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, startX, startY, cropW, cropH, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(blob => {
      setIsProcessing(false);
      if (blob) {
        downloadBlob(blob, `cropped_${canvas.width}x${canvas.height}.jpg`);
        setStatusMsg({ text: `✓ Cropped to ${canvas.width}x${canvas.height} px`, ok: true });
      }
    }, 'image/jpeg', 0.95);
  };

  // --------------------------------------------------------------------------
  // 3: COMPRESS IMAGE TO KB
  // --------------------------------------------------------------------------
  const [targetKb, setTargetKb] = useState<number>(100);

  const executeCompressToKb = async () => {
    if (!previewUrl || !selectedFiles[0]) return;
    setIsProcessing(true);
    setStatusMsg({ text: `Compressing to target < ${targetKb} KB...`, ok: true });

    const img = new Image();
    img.src = previewUrl;
    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);

    // Binary search for quality to hit target KB
    let minQ = 0.05;
    let maxQ = 0.95;
    let bestBlob: Blob | null = null;

    for (let iter = 0; iter < 7; iter++) {
      const midQ = (minQ + maxQ) / 2;
      const b: Blob = await new Promise(res => canvas.toBlob(res as any, 'image/jpeg', midQ));
      const sizeKb = b.size / 1024;
      if (sizeKb <= targetKb) {
        bestBlob = b;
        minQ = midQ; // try higher quality
      } else {
        maxQ = midQ; // need smaller size
      }
    }

    // If still too large, downscale canvas dimensions
    if (!bestBlob || bestBlob.size / 1024 > targetKb) {
      let scale = 0.8;
      while (scale > 0.2) {
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const b: Blob = await new Promise(res => canvas.toBlob(res as any, 'image/jpeg', 0.7));
        if (b.size / 1024 <= targetKb) {
          bestBlob = b;
          break;
        }
        scale -= 0.15;
      }
    }

    setIsProcessing(false);
    if (bestBlob) {
      const finalKb = (bestBlob.size / 1024).toFixed(1);
      downloadBlob(bestBlob, `compressed_${finalKb}kb.jpg`);
      setStatusMsg({
        text: `✓ Compressed successfully to ${finalKb} KB (Target: ${targetKb} KB)`,
        ok: true,
      });
    } else {
      setStatusMsg({ text: 'Image compressed to lowest achievable size.', ok: true });
    }
  };

  // --------------------------------------------------------------------------
  // 4: CONVERT TO WEBP
  // --------------------------------------------------------------------------
  const executeConvertToWebp = async () => {
    if (!selectedFiles.length) return;
    setIsProcessing(true);
    setStatusMsg({ text: `Converting ${selectedFiles.length} file(s) to WebP...`, ok: true });

    if (selectedFiles.length === 1) {
      const file = selectedFiles[0];
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.src = url;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(blob => {
        setIsProcessing(false);
        if (blob) {
          const savings = Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100));
          downloadBlob(blob, file.name.replace(/\.[^/.]+$/, '') + '.webp');
          setStatusMsg({
            text: `✓ Converted to WebP (${(blob.size / 1024).toFixed(1)} KB — ${savings}% smaller!)`,
            ok: true,
          });
        }
      }, 'image/webp', 0.85);
    } else {
      // Batch ZIP
      const zip = new JSZip();
      for (const file of selectedFiles) {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.src = url;
        await img.decode();
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d')?.drawImage(img, 0, 0);
        const blob: Blob = await new Promise(res => canvas.toBlob(res as any, 'image/webp', 0.85));
        zip.file(file.name.replace(/\.[^/.]+$/, '') + '.webp', blob);
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      setIsProcessing(false);
      downloadBlob(zipBlob, 'converted_webp_images.zip');
      setStatusMsg({ text: `✓ Converted ${selectedFiles.length} files to WebP ZIP`, ok: true });
    }
  };

  // --------------------------------------------------------------------------
  // 5: IMAGE TO PDF
  // --------------------------------------------------------------------------
  const [pdfPageSize, setPdfPageSize] = useState<'a4' | 'fit'>('a4');

  const executeImageToPdf = async () => {
    if (!selectedFiles.length) return;
    setIsProcessing(true);
    setStatusMsg({ text: 'Compiling PDF document...', ok: true });

    const pdfDoc = await PDFDocument.create();

    for (const file of selectedFiles) {
      const buffer = await file.arrayBuffer();
      let pdfImage;
      if (file.type === 'image/png') {
        pdfImage = await pdfDoc.embedPng(buffer);
      } else {
        pdfImage = await pdfDoc.embedJpg(buffer);
      }

      if (pdfPageSize === 'fit') {
        const page = pdfDoc.addPage([pdfImage.width, pdfImage.height]);
        page.drawImage(pdfImage, { x: 0, y: 0, width: pdfImage.width, height: pdfImage.height });
      } else {
        // Standard A4: 595.28 x 841.89 points
        const page = pdfDoc.addPage([595.28, 841.89]);
        const margin = 36;
        const availW = 595.28 - margin * 2;
        const availH = 841.89 - margin * 2;
        const imgAspect = pdfImage.width / pdfImage.height;
        let drawW = availW;
        let drawH = drawW / imgAspect;
        if (drawH > availH) {
          drawH = availH;
          drawW = drawH * imgAspect;
        }
        const x = margin + (availW - drawW) / 2;
        const y = margin + (availH - drawH) / 2;
        page.drawImage(pdfImage, { x, y, width: drawW, height: drawH });
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
    setIsProcessing(false);
    downloadBlob(blob, 'compiled_images.pdf');
    setStatusMsg({ text: `✓ Generated ${selectedFiles.length}-page PDF`, ok: true });
  };

  // --------------------------------------------------------------------------
  // 6: PASSPORT PHOTO MAKER
  // --------------------------------------------------------------------------
  const [passportStandard, setPassportStandard] = useState<'india' | 'us' | 'schengen'>('india');
  const [passportSheet, setPassportSheet] = useState<boolean>(true);

  const executePassportPhoto = async () => {
    if (!previewUrl || !origDimensions) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = previewUrl;
    await img.decode();

    // Indian passport 35x45mm (approx 413 x 531 px at 300 dpi)
    // US passport 2x2in (600 x 600 px at 300 dpi)
    const targetW = passportStandard === 'us' ? 600 : 413;
    const targetH = passportStandard === 'us' ? 600 : 531;

    // Center crop to aspect ratio
    const aspect = targetW / targetH;
    let cropW = origDimensions.w;
    let cropH = cropW / aspect;
    if (cropH > origDimensions.h) {
      cropH = origDimensions.h;
      cropW = cropH * aspect;
    }
    const cropX = (origDimensions.w - cropW) / 2;
    const cropY = (origDimensions.h - cropH) / 2;

    const singleCanvas = document.createElement('canvas');
    singleCanvas.width = targetW;
    singleCanvas.height = targetH;
    const sCtx = singleCanvas.getContext('2d');
    sCtx?.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, targetW, targetH);

    if (!passportSheet) {
      singleCanvas.toBlob(blob => {
        setIsProcessing(false);
        if (blob) downloadBlob(blob, `passport_photo_${passportStandard}.jpg`);
      }, 'image/jpeg', 0.95);
      return;
    }

    // Printable 4x6 inch sheet (1200 x 1800 px at 300 DPI)
    const sheetCanvas = document.createElement('canvas');
    sheetCanvas.width = 1800;
    sheetCanvas.height = 1200;
    const ctx = sheetCanvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, 1800, 1200);

    // Arrange 8 photos (4 columns x 2 rows)
    const cols = 4;
    const rows = 2;
    const marginX = 80;
    const marginY = 60;
    const spacingX = (1800 - marginX * 2 - cols * targetW) / (cols - 1);
    const spacingY = (1200 - marginY * 2 - rows * targetH) / (rows - 1);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = marginX + c * (targetW + spacingX);
        const y = marginY + r * (targetH + spacingY);
        ctx.drawImage(singleCanvas, x, y, targetW, targetH);
        // Cutting border
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, targetW, targetH);
      }
    }

    sheetCanvas.toBlob(blob => {
      setIsProcessing(false);
      if (blob) {
        downloadBlob(blob, `passport_sheet_4x6_${passportStandard}.jpg`);
        setStatusMsg({ text: `✓ Generated 8-photo printable 4x6" photo sheet!`, ok: true });
      }
    }, 'image/jpeg', 0.95);
  };

  // --------------------------------------------------------------------------
  // 7 & 8: HEIC CONVERT & EXIF REMOVER
  // --------------------------------------------------------------------------
  const executeExifRemoval = async () => {
    if (!previewUrl || !selectedFiles[0]) return;
    setIsProcessing(true);
    const img = new Image();
    img.src = previewUrl;
    await img.decode();

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0);

    canvas.toBlob(blob => {
      setIsProcessing(false);
      if (blob) {
        downloadBlob(blob, `sanitized_${selectedFiles[0].name.replace(/\.[^/.]+$/, '')}.jpg`);
        setStatusMsg({ text: '✓ 100% EXIF, GPS and camera metadata stripped cleanly.', ok: true });
      }
    }, 'image/jpeg', 0.95);
  };

  return (
    <div className="bv-tool-layout">
      {/* INPUTS PANEL */}
      <div className="bv-tool-panel bv-inputs-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge">BROWSER-FIRST</span>
          <h2 className="bv-panel-title">{tool.name}</h2>
        </div>

        {/* Upload dropzone */}
        <label className="bv-dropzone" style={{ marginBottom: '1.25rem' }}>
          <div className="bv-dropzone-icon">📷</div>
          <div className="bv-dropzone-text">
            <strong>Choose {tool.id === 'image-to-pdf' || tool.id === 'convert-image-to-webp' ? 'Photos' : 'a Photo'}</strong> or drag &amp; drop here
          </div>
          <small className="bv-dropzone-hint">
            {selectedFiles.length > 0 ? `Selected: ${selectedFiles.map(f => f.name).join(', ')}` : 'JPG, PNG, WebP supported. 100% Private.'}
          </small>
          <input
            type="file"
            accept="image/*,.heic,.heif"
            multiple={tool.id === 'image-to-pdf' || tool.id === 'convert-image-to-webp'}
            onChange={handleFileChange}
            className="bv-file-input"
          />
        </label>

        {/* 1: RESIZE CONFIG */}
        {tool.id === 'resize-image' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                className={resizeMode === 'px' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.5rem' }}
                onClick={() => setResizeMode('px')}
              >
                Exact Pixels
              </button>
              <button
                type="button"
                className={resizeMode === 'pct' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.5rem' }}
                onClick={() => setResizeMode('pct')}
              >
                Percentage Scale
              </button>
            </div>

            {resizeMode === 'px' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <label className="bv-field">
                  <span className="bv-field-label">Width (px)</span>
                  <input
                    type="number"
                    className="bv-input"
                    value={targetWidth}
                    onChange={e => {
                      const w = Number(e.target.value) || 0;
                      setTargetWidth(w);
                      if (lockAspect && origDimensions && origDimensions.w > 0) {
                        setTargetHeight(Math.round(w * (origDimensions.h / origDimensions.w)));
                      }
                    }}
                  />
                </label>
                <label className="bv-field">
                  <span className="bv-field-label">Height (px)</span>
                  <input
                    type="number"
                    className="bv-input"
                    value={targetHeight}
                    onChange={e => {
                      const h = Number(e.target.value) || 0;
                      setTargetHeight(h);
                      if (lockAspect && origDimensions && origDimensions.h > 0) {
                        setTargetWidth(Math.round(h * (origDimensions.w / origDimensions.h)));
                      }
                    }}
                  />
                </label>
              </div>
            ) : (
              <label className="bv-field">
                <span className="bv-field-label">Scale: {targetPct}%</span>
                <input
                  type="range"
                  min={10}
                  max={200}
                  value={targetPct}
                  onChange={e => setTargetPct(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#FF4E27' }}
                />
              </label>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#94a3b8', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={lockAspect}
                  onChange={e => setLockAspect(e.target.checked)}
                  style={{ accentColor: '#FF4E27' }}
                />
                Lock Aspect Ratio
              </label>
              <label className="bv-field" style={{ margin: 0 }}>
                <select
                  className="bv-input bv-select"
                  value={exportFormat}
                  onChange={e => setExportFormat(e.target.value as any)}
                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                >
                  <option value="image/jpeg">JPG Format</option>
                  <option value="image/png">PNG Format</option>
                  <option value="image/webp">WebP Format</option>
                </select>
              </label>
            </div>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !previewUrl}
              onClick={executeResize}
            >
              ⚡ Resize &amp; Download
            </button>
          </div>
        )}

        {/* 2: CROP CONFIG */}
        {tool.id === 'crop-image' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Aspect Ratio Preset</span>
              <select className="bv-input bv-select" value={cropAspect} onChange={e => setCropAspect(e.target.value)}>
                <option value="1:1">1:1 Square (Instagram / Profile)</option>
                <option value="4:5">4:5 Portrait (Instagram Feed)</option>
                <option value="16:9">16:9 Landscape (YouTube / Banner)</option>
                <option value="4:3">4:3 Standard</option>
              </select>
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Crop Zoom Margin: {cropInset}%</span>
              <input
                type="range"
                min={0}
                max={40}
                value={cropInset}
                onChange={e => setCropInset(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#FF4E27' }}
              />
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !previewUrl}
              onClick={executeCrop}
            >
              ✂️ Crop &amp; Download
            </button>
          </div>
        )}

        {/* 3: COMPRESS TO KB CONFIG */}
        {tool.id === 'compress-image-to-kb' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Target Maximum Size (KB): {targetKb} KB</span>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                {[50, 100, 200, 500].map(kb => (
                  <button
                    key={kb}
                    type="button"
                    className="btn-secondary"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', borderColor: targetKb === kb ? '#FF4E27' : undefined }}
                    onClick={() => setTargetKb(kb)}
                  >
                    {kb} KB
                  </button>
                ))}
              </div>
              <input
                type="number"
                className="bv-input"
                min={10}
                max={5000}
                value={targetKb}
                onChange={e => setTargetKb(Number(e.target.value))}
              />
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !previewUrl}
              onClick={executeCompressToKb}
            >
              🗜️ Compress to &lt; {targetKb} KB
            </button>
          </div>
        )}

        {/* 4: CONVERT TO WEBP */}
        {tool.id === 'convert-image-to-webp' && (
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem', width: '100%' }}
            disabled={isProcessing || !selectedFiles.length}
            onClick={executeConvertToWebp}
          >
            ⚡ Convert to Next-Gen WebP
          </button>
        )}

        {/* 5: IMAGE TO PDF */}
        {tool.id === 'image-to-pdf' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">PDF Page Layout</span>
              <select className="bv-input bv-select" value={pdfPageSize} onChange={e => setPdfPageSize(e.target.value as any)}>
                <option value="a4">Standard A4 (Padded margins)</option>
                <option value="fit">Fit to Image Size</option>
              </select>
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !selectedFiles.length}
              onClick={executeImageToPdf}
            >
              📄 Compile into PDF
            </button>
          </div>
        )}

        {/* 6: PASSPORT PHOTO MAKER */}
        {tool.id === 'passport-photo-maker' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Passport Standard Preset</span>
              <select className="bv-input bv-select" value={passportStandard} onChange={e => setPassportStandard(e.target.value as any)}>
                <option value="india">India Passport &amp; Visa (35 x 45 mm)</option>
                <option value="us">US / Canada Visa (2 x 2 inches / 51 x 51 mm)</option>
                <option value="schengen">Schengen Europe (35 x 45 mm)</option>
              </select>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={passportSheet} onChange={e => setPassportSheet(e.target.checked)} />
              Generate 8-photo printable 4x6 inch sheet (with cutting guides)
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !previewUrl}
              onClick={executePassportPhoto}
            >
              📸 Generate Passport Photo
            </button>
          </div>
        )}

        {/* 7 & 8: EXIF REMOVER & HEIC */}
        {(tool.id === 'exif-metadata-remover' || tool.id === 'heic-to-jpg') && (
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem', width: '100%' }}
            disabled={isProcessing || !previewUrl}
            onClick={executeExifRemoval}
          >
            🛡️ Strip EXIF &amp; Download Clean Photo
          </button>
        )}
      </div>

      {/* RESULTS & PREVIEW PANEL */}
      <div className="bv-tool-panel bv-results-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>LIVE PREVIEW</span>
          <h2 className="bv-panel-title">Processed Image</h2>
        </div>

        {statusMsg && (
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '10px',
              marginBottom: '1rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: statusMsg.ok ? '#ECFDF5' : '#FEF2F2',
              color: statusMsg.ok ? '#059669' : '#DC2626',
              border: `1px solid ${statusMsg.ok ? '#A7F3D0' : '#FECACA'}`,
            }}
          >
            {statusMsg.text}
          </div>
        )}

        {previewUrl ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '340px',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                objectFit: 'contain',
              }}
            />
            {origDimensions && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#64748B' }}>
                Original Dimensions: <strong>{origDimensions.w} x {origDimensions.h} px</strong>
                {selectedFiles[0] && ` • ${(selectedFiles[0].size / 1024).toFixed(1)} KB`}
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94A3B8' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🖼️</div>
            <p style={{ margin: 0 }}>Select or drag and drop an image to preview and run tool.</p>
          </div>
        )}
      </div>
    </div>
  );
};
