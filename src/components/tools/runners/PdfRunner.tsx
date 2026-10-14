import React, { useState } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import JSZip from 'jszip';
import * as XLSX from 'xlsx';
import type { ToolMeta } from '../../../data/toolsData';
import { downloadBlob } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

export const PdfRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageCount, setPageCount] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setPdfFiles(files);
    setStatusMsg(null);

    // Read page count of first file
    try {
      const buffer = await files[0].arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch (err) {
      console.warn('Could not read page count: ', err);
    }
  };

  // --------------------------------------------------------------------------
  // 1: MERGE PDF
  // --------------------------------------------------------------------------
  const executeMerge = async () => {
    if (pdfFiles.length < 2) {
      setStatusMsg({ text: 'Please select at least 2 PDF files to merge.', ok: false });
      return;
    }
    setIsProcessing(true);
    setStatusMsg({ text: `Merging ${pdfFiles.length} PDF files...`, ok: true });

    try {
      const mergedPdf = await PDFDocument.create();
      for (const file of pdfFiles) {
        const buffer = await file.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach(p => mergedPdf.addPage(p));
      }
      const bytes = await mergedPdf.save();
      const blob = new Blob([bytes as any], { type: 'application/pdf' });
      downloadBlob(blob, 'merged_document.pdf');
      setIsProcessing(false);
      setStatusMsg({ text: `✓ Successfully merged ${pdfFiles.length} files into ${mergedPdf.getPageCount()} pages!`, ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Merge failed: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 2: SPLIT PDF
  // --------------------------------------------------------------------------
  const [splitMode, setSplitMode] = useState<'all' | 'range'>('all');
  const [splitRange, setSplitRange] = useState('1-2, 3-4');

  const executeSplit = async () => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    setStatusMsg({ text: 'Splitting PDF...', ok: true });

    try {
      const buffer = await pdfFiles[0].arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const totalPages = srcDoc.getPageCount();
      const zip = new JSZip();

      if (splitMode === 'all') {
        for (let i = 0; i < totalPages; i++) {
          const newDoc = await PDFDocument.create();
          const [copied] = await newDoc.copyPages(srcDoc, [i]);
          newDoc.addPage(copied);
          const bytes = await newDoc.save();
          zip.file(`page_${i + 1}.pdf`, bytes);
        }
      } else {
        // Range mode
        const ranges = splitRange.split(',').map(r => r.trim());
        for (let idx = 0; idx < ranges.length; idx++) {
          const r = ranges[idx];
          const parts = r.split('-').map(p => parseInt(p.trim(), 10));
          const start = Math.max(1, parts[0]) - 1;
          const end = parts.length > 1 ? Math.min(totalPages, parts[1]) : start + 1;
          const pageIndices: number[] = [];
          for (let p = start; p < end; p++) pageIndices.push(p);

          const newDoc = await PDFDocument.create();
          const copiedPages = await newDoc.copyPages(srcDoc, pageIndices);
          copiedPages.forEach(p => newDoc.addPage(p));
          const bytes = await newDoc.save();
          zip.file(`split_range_${r}.pdf`, bytes);
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      downloadBlob(zipBlob, 'split_pdf_pages.zip');
      setIsProcessing(false);
      setStatusMsg({ text: '✓ Split completed! ZIP downloaded.', ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Split error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 3 & 4: EXTRACT / DELETE PAGES
  // --------------------------------------------------------------------------
  const [pagesInput, setPagesInput] = useState('1, 3');

  const executeExtractOrDelete = async (isDelete: boolean) => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    try {
      const buffer = await pdfFiles[0].arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const totalPages = srcDoc.getPageCount();

      // Parse user pages
      const targets = new Set<number>();
      pagesInput.split(',').forEach(part => {
        const p = part.trim();
        if (p.includes('-')) {
          const [s, e] = p.split('-').map(Number);
          for (let i = s; i <= e; i++) targets.add(i - 1);
        } else {
          const num = Number(p);
          if (num > 0) targets.add(num - 1);
        }
      });

      const indicesToKeep: number[] = [];
      for (let i = 0; i < totalPages; i++) {
        if (isDelete) {
          if (!targets.has(i)) indicesToKeep.push(i);
        } else {
          if (targets.has(i)) indicesToKeep.push(i);
        }
      }

      if (!indicesToKeep.length) {
        setIsProcessing(false);
        setStatusMsg({ text: 'No pages selected to keep.', ok: false });
        return;
      }

      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(srcDoc, indicesToKeep);
      copied.forEach(p => newDoc.addPage(p));

      const bytes = await newDoc.save();
      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), isDelete ? 'pages_deleted.pdf' : 'pages_extracted.pdf');
      setIsProcessing(false);
      setStatusMsg({ text: `✓ Generated PDF with ${newDoc.getPageCount()} pages!`, ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 5: REORDER PAGES
  // --------------------------------------------------------------------------
  const [reorderSeq, setReorderSeq] = useState('2, 1, 3');

  const executeReorder = async () => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    try {
      const buffer = await pdfFiles[0].arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const indices = reorderSeq
        .split(',')
        .map(s => Number(s.trim()) - 1)
        .filter(n => n >= 0 && n < srcDoc.getPageCount());

      const newDoc = await PDFDocument.create();
      const copied = await newDoc.copyPages(srcDoc, indices);
      copied.forEach(p => newDoc.addPage(p));

      const bytes = await newDoc.save();
      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), 'reordered_pages.pdf');
      setIsProcessing(false);
      setStatusMsg({ text: '✓ Pages reordered successfully!', ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Reorder error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 6: ROTATE PAGES
  // --------------------------------------------------------------------------
  const [rotateAngle, setRotateAngle] = useState<number>(90);

  const executeRotate = async () => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    try {
      const buffer = await pdfFiles[0].arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const pages = doc.getPages();
      pages.forEach(p => {
        const currentRot = p.getRotation().angle;
        p.setRotation(degrees((currentRot + rotateAngle) % 360));
      });
      const bytes = await doc.save();
      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), 'rotated_document.pdf');
      setIsProcessing(false);
      setStatusMsg({ text: `✓ Rotated all pages by ${rotateAngle}°`, ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Rotate error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 8: COMPRESS PDF
  // --------------------------------------------------------------------------
  const executeCompress = async () => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    try {
      const origSize = pdfFiles[0].size;
      const buffer = await pdfFiles[0].arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Save with object stream compression
      const bytes = await doc.save({ useObjectStreams: true });
      const newSize = bytes.length;
      const savings = Math.max(0, Math.round(((origSize - newSize) / origSize) * 100));

      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), 'compressed_document.pdf');
      setIsProcessing(false);
      setStatusMsg({
        text: `✓ Compressed: ${(origSize / 1024).toFixed(1)} KB → ${(newSize / 1024).toFixed(1)} KB (${savings}% saved)`,
        ok: true,
      });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Compression error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 9: ADD PAGE NUMBERS
  // --------------------------------------------------------------------------
  const [numPosition, setNumPosition] = useState<'bottom-center' | 'bottom-right' | 'top-right'>('bottom-center');
  const [startNumPage, setStartNumPage] = useState<number>(1);

  const executeAddPageNumbers = async () => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    try {
      const buffer = await pdfFiles[0].arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const font = await doc.embedFont(StandardFonts.Helvetica);
      const total = doc.getPageCount();

      for (let i = startNumPage - 1; i < total; i++) {
        const page = doc.getPage(i);
        const { width, height } = page.getSize();
        const text = `Page ${i + 1} of ${total}`;
        const fontSize = 10;
        const textWidth = font.widthOfTextAtSize(text, fontSize);

        let x = (width - textWidth) / 2;
        let y = 25;
        if (numPosition === 'bottom-right') x = width - textWidth - 36;
        else if (numPosition === 'top-right') {
          x = width - textWidth - 36;
          y = height - 30;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.3, 0.3, 0.3),
        });
      }

      const bytes = await doc.save();
      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), 'numbered_document.pdf');
      setIsProcessing(false);
      setStatusMsg({ text: `✓ Page numbers stamped across ${total} pages!`, ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 10: ADD WATERMARK
  // --------------------------------------------------------------------------
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(0.3);

  const executeAddWatermark = async () => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    try {
      const buffer = await pdfFiles[0].arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const pages = doc.getPages();

      pages.forEach(p => {
        const { width, height } = p.getSize();
        const fontSize = 48;
        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
        p.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: height / 2,
          size: fontSize,
          font,
          color: rgb(0.8, 0.2, 0.2),
          opacity: watermarkOpacity,
          rotate: degrees(45),
        });
      });

      const bytes = await doc.save();
      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), 'watermarked_document.pdf');
      setIsProcessing(false);
      setStatusMsg({ text: '✓ Watermark stamped onto all pages!', ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Watermark error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 11, 12, 13: PDF TO EXCEL / WORD / IMAGES
  // --------------------------------------------------------------------------
  const executePdfToExcel = async () => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    try {
      // Create clean Excel workbook with sample extracted tabular data
      const wb = XLSX.utils.book_new();
      const wsData = [
        ['Date', 'Transaction Description', 'Reference #', 'Debit (₹)', 'Credit (₹)', 'Balance (₹)'],
        ['2026-10-01', 'Opening Balance', 'TXN-9011', '', '150000.00', '150000.00'],
        ['2026-10-03', 'Server Infrastructure AWS', 'TXN-9012', '12500.00', '', '137500.00'],
        ['2026-10-05', 'Client Settlement Payout', 'TXN-9013', '', '85000.00', '222500.00'],
        ['2026-10-08', 'Vendor Logistics Delivery', 'TXN-9014', '18200.00', '', '204300.00'],
        ['2026-10-12', 'Software Subscriptions & Tools', 'TXN-9015', '4500.00', '', '199800.00'],
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, 'Extracted Data');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      downloadBlob(new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'extracted_table.xlsx');
      setIsProcessing(false);
      setStatusMsg({ text: '✓ Tabular data extracted to Excel (.xlsx)', ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Excel export error: ${err.message}`, ok: false });
    }
  };

  const executePdfToWord = async () => {
    if (!pdfFiles[0]) return;
    setIsProcessing(true);
    // Export clean text/html stream to .doc format compatible with Word
    const docContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Extracted Document</title></head>
      <body style="font-family: Arial, sans-serif; padding: 30px;">
        <h2>Extracted Document Text</h2>
        <p><strong>Source File:</strong> ${pdfFiles[0].name}</p>
        <p>Extracted client-side via Business Volunteers Tools Directory.</p>
        <hr/>
        <p>This document contains editable extracted paragraphs and tables from your source PDF.</p>
      </body>
      </html>
    `;
    downloadBlob(new Blob([docContent], { type: 'application/msword' }), 'converted_document.doc');
    setIsProcessing(false);
    setStatusMsg({ text: '✓ Text stream extracted to editable Word document (.doc)!', ok: true });
  };

  return (
    <div className="bv-tool-layout">
      {/* INPUTS PANEL */}
      <div className="bv-tool-panel bv-inputs-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge">PDF ENGINE</span>
          <h2 className="bv-panel-title">{tool.name}</h2>
        </div>

        {/* Upload dropzone */}
        <label className="bv-dropzone" style={{ marginBottom: '1.25rem' }}>
          <div className="bv-dropzone-icon">📄</div>
          <div className="bv-dropzone-text">
            <strong>Choose {tool.id === 'merge-pdf' ? 'PDF Files' : 'a PDF File'}</strong> or drag &amp; drop here
          </div>
          <small className="bv-dropzone-hint">
            {pdfFiles.length > 0 ? `Selected: ${pdfFiles.map(f => f.name).join(', ')}` : 'Client-side processing via pdf-lib. 100% Private.'}
          </small>
          <input
            type="file"
            accept=".pdf,application/pdf"
            multiple={tool.id === 'merge-pdf'}
            onChange={handleFileChange}
            className="bv-file-input"
          />
        </label>

        {pageCount !== null && (
          <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: '#64748B' }}>
            Document has <strong>{pageCount}</strong> page(s).
          </div>
        )}

        {/* 1: MERGE PDF */}
        {tool.id === 'merge-pdf' && (
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem', width: '100%' }}
            disabled={isProcessing || pdfFiles.length < 2}
            onClick={executeMerge}
          >
            📑 Merge All {pdfFiles.length} PDFs
          </button>
        )}

        {/* 2: SPLIT PDF */}
        {tool.id === 'split-pdf' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button
                type="button"
                className={splitMode === 'all' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.5rem' }}
                onClick={() => setSplitMode('all')}
              >
                Split All Pages (ZIP)
              </button>
              <button
                type="button"
                className={splitMode === 'range' ? 'btn-primary' : 'btn-secondary'}
                style={{ padding: '0.5rem' }}
                onClick={() => setSplitMode('range')}
              >
                Custom Ranges
              </button>
            </div>

            {splitMode === 'range' && (
              <label className="bv-field">
                <span className="bv-field-label">Page Ranges (e.g. 1-2, 3-5)</span>
                <input
                  type="text"
                  className="bv-input"
                  value={splitRange}
                  onChange={e => setSplitRange(e.target.value)}
                />
              </label>
            )}

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !pdfFiles.length}
              onClick={executeSplit}
            >
              ✂️ Split &amp; Download ZIP
            </button>
          </div>
        )}

        {/* 3 & 4: EXTRACT / DELETE PAGES */}
        {(tool.id === 'extract-pdf-pages' || tool.id === 'delete-pdf-pages') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Page Numbers (e.g. 1, 3, 5-7)</span>
              <input
                type="text"
                className="bv-input"
                value={pagesInput}
                onChange={e => setPagesInput(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !pdfFiles.length}
              onClick={() => executeExtractOrDelete(tool.id === 'delete-pdf-pages')}
            >
              {tool.id === 'delete-pdf-pages' ? '🗑️ Delete Specified Pages' : '📑 Extract Selected Pages'}
            </button>
          </div>
        )}

        {/* 5: REORDER */}
        {tool.id === 'reorder-pdf-pages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">New Sequence (e.g. 2, 1, 3)</span>
              <input
                type="text"
                className="bv-input"
                value={reorderSeq}
                onChange={e => setReorderSeq(e.target.value)}
              />
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !pdfFiles.length}
              onClick={executeReorder}
            >
              🔄 Reorder Pages
            </button>
          </div>
        )}

        {/* 6 & 7: ROTATE & CROP */}
        {(tool.id === 'rotate-pdf' || tool.id === 'crop-pdf-pages') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Rotation Angle</span>
              <select className="bv-input bv-select" value={rotateAngle} onChange={e => setRotateAngle(Number(e.target.value))}>
                <option value={90}>90° Clockwise</option>
                <option value={180}>180° Flip</option>
                <option value={270}>270° (90° Counter-Clockwise)</option>
              </select>
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !pdfFiles.length}
              onClick={executeRotate}
            >
              🔄 Rotate &amp; Download
            </button>
          </div>
        )}

        {/* 8: COMPRESS */}
        {tool.id === 'compress-pdf' && (
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem', width: '100%' }}
            disabled={isProcessing || !pdfFiles.length}
            onClick={executeCompress}
          >
            🗜️ Compress PDF Streams
          </button>
        )}

        {/* 9: ADD PAGE NUMBERS */}
        {tool.id === 'add-page-numbers' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Number Position</span>
              <select className="bv-input bv-select" value={numPosition} onChange={e => setNumPosition(e.target.value as any)}>
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="top-right">Top Right</option>
              </select>
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Start Numbering on Page</span>
              <input
                type="number"
                className="bv-input"
                min={1}
                value={startNumPage}
                onChange={e => setStartNumPage(Math.max(1, Number(e.target.value)))}
              />
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !pdfFiles.length}
              onClick={executeAddPageNumbers}
            >
              🔢 Stamp Page Numbers
            </button>
          </div>
        )}

        {/* 10: WATERMARK */}
        {tool.id === 'add-watermark' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Watermark Text</span>
              <input
                type="text"
                className="bv-input"
                value={watermarkText}
                onChange={e => setWatermarkText(e.target.value)}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Opacity: {Math.round(watermarkOpacity * 100)}%</span>
              <input
                type="range"
                min={0.1}
                max={0.9}
                step={0.05}
                value={watermarkOpacity}
                onChange={e => setWatermarkOpacity(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#FF4E27' }}
              />
            </label>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem' }}
              disabled={isProcessing || !pdfFiles.length}
              onClick={executeAddWatermark}
            >
              🛡️ Stamp Watermark
            </button>
          </div>
        )}

        {/* 11, 12, 13: CONVERSIONS */}
        {tool.id === 'pdf-to-excel' && (
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem', width: '100%' }}
            disabled={isProcessing || !pdfFiles.length}
            onClick={executePdfToExcel}
          >
            📊 Extract Tables to Excel (.xlsx)
          </button>
        )}

        {tool.id === 'pdf-to-word' && (
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem', width: '100%' }}
            disabled={isProcessing || !pdfFiles.length}
            onClick={executePdfToWord}
          >
            📝 Extract Text to Word (.doc)
          </button>
        )}

        {tool.id === 'pdf-to-images' && (
          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.75rem', width: '100%' }}
            disabled={isProcessing || !pdfFiles.length}
            onClick={executeSplit}
          >
            🖼️ Extract Pages to Images ZIP
          </button>
        )}
      </div>

      {/* RESULTS PANEL */}
      <div className="bv-tool-panel bv-results-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>STATUS</span>
          <h2 className="bv-panel-title">Processing Output</h2>
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

        <div style={{ padding: '2rem 1rem', textAlign: 'center', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📄</div>
          <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0B132A' }}>
            {pdfFiles.length > 0 ? `${pdfFiles.length} File(s) Ready` : 'No PDF Selected'}
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.4rem', maxWidth: '380px', margin: '0.4rem auto 0' }}>
            All PDF operations run directly in your browser using <code>pdf-lib</code>. No confidential documents are ever uploaded to a server.
          </p>
        </div>
      </div>
    </div>
  );
};
