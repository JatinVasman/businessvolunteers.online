import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { ToolMeta } from '../../../data/toolsData';
import { copyToClipboard, downloadBlob, downloadText } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

export const DocsRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const handleCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --------------------------------------------------------------------------
  // 1: CSV TO JSON
  // --------------------------------------------------------------------------
  const [csvText, setCsvText] = useState("Name,Role,City,Department\nAnkit Sharma,Lead Architect,Delhi,Engineering\nPriya Patel,Product Designer,Mumbai,Design\nRahul Verma,SEO Specialist,Bangalore,Marketing");
  const [jsonOutput, setJsonOutput] = useState('');

  const executeCsvToJson = () => {
    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setStatusMsg({ text: 'CSV requires at least 1 header line and 1 data line.', ok: false });
        return;
      }
      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      const records: any[] = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const row = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
        const obj: any = {};
        headers.forEach((h, idx) => {
          let val: any = row[idx] ?? '';
          if (!isNaN(Number(val)) && val !== '') val = Number(val);
          else if (val.toLowerCase() === 'true') val = true;
          else if (val.toLowerCase() === 'false') val = false;
          obj[h] = val;
        });
        records.push(obj);
      }

      const formatted = JSON.stringify(records, null, 2);
      setJsonOutput(formatted);
      setStatusMsg({ text: `✓ Converted ${records.length} records to JSON`, ok: true });
    } catch (err: any) {
      setStatusMsg({ text: `CSV Parse error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 2: JSON TO CSV
  // --------------------------------------------------------------------------
  const [jsonInput, setJsonInput] = useState('[\n  {\n    "id": 1,\n    "title": "Strategy Workshop",\n    "cost": 15000\n  },\n  {\n    "id": 2,\n    "title": "Infrastructure Setup",\n    "cost": 35000\n  }\n]');
  const [csvOutput, setCsvOutput] = useState('');

  const executeJsonToCsv = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const arr = Array.isArray(parsed) ? parsed : [parsed];
      if (!arr.length) return;

      const keys = Array.from(new Set(arr.flatMap(item => Object.keys(item))));
      const lines = [keys.join(',')];

      arr.forEach(item => {
        const row = keys.map(k => {
          let v = item[k] ?? '';
          if (typeof v === 'object') v = JSON.stringify(v);
          v = String(v).replace(/"/g, '""');
          return v.includes(',') || v.includes('\n') ? `"${v}"` : v;
        });
        lines.push(row.join(','));
      });

      const out = lines.join('\n');
      setCsvOutput(out);
      setStatusMsg({ text: `✓ Converted ${arr.length} objects to CSV`, ok: true });
    } catch (err: any) {
      setStatusMsg({ text: `JSON parse error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // 3 & 4: CSV TO XLSX & XLSX TO CSV
  // --------------------------------------------------------------------------
  const [excelSheets, setExcelSheets] = useState<string[]>([]);
  const [activeWorkbook, setActiveWorkbook] = useState<XLSX.WorkBook | null>(null);

  const executeCsvToXlsx = () => {
    try {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(csvText.split('\n').map(l => l.split(',')));
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      downloadBlob(new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), 'spreadsheet.xlsx');
      setStatusMsg({ text: '✓ Exported XLSX workbook', ok: true });
    } catch (err: any) {
      setStatusMsg({ text: `XLSX error: ${err.message}`, ok: false });
    }
  };

  const handleXlsxUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const buffer = await file.arrayBuffer();
    const wb = XLSX.read(buffer, { type: 'array' });
    setActiveWorkbook(wb);
    setExcelSheets(wb.SheetNames);
    if (wb.SheetNames.length) {
      const firstSheet = wb.Sheets[wb.SheetNames[0]];
      const csv = XLSX.utils.sheet_to_csv(firstSheet);
      setCsvOutput(csv);
      setStatusMsg({ text: `✓ Extracted sheet "${wb.SheetNames[0]}" (${csv.split('\n').length} rows)`, ok: true });
    }
  };

  // --------------------------------------------------------------------------
  // 5: MARKDOWN TO HTML
  // --------------------------------------------------------------------------
  const [mdInput, setMdInput] = useState("# Business Volunteers Tools\n\n- **100% Client-Side** execution\n- *Fast & Private*\n\n| Tool | Category | Status |\n|---|---|---|\n| GST Calc | Finance | Live |\n| QR Generator | Marketing | Live |\n");
  const [htmlOutput, setHtmlOutput] = useState('');

  const executeMarkdown = () => {
    let html = mdInput
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      .replace(/^- (.*$)/gim, '<li>$1</li>')
      .replace(/\n\n/gim, '<p></p>')
      .replace(/\n/gim, '<br/>');
    setHtmlOutput(html);
  };

  // --------------------------------------------------------------------------
  // 7: TEXT TO PDF
  // --------------------------------------------------------------------------
  const [plainText, setPlainText] = useState("Meeting Minutes - Product Strategy\nDate: October 2026\n\n1. Tools Directory rebuild launched with 106 tools.\n2. All operations remain strictly client-side.\n3. Mobile-first responsive optimization complete.");

  const executeTextToPdf = async () => {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595.28, 841.89]);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const lines = plainText.split('\n');

    let y = 800;
    for (const line of lines) {
      page.drawText(line, { x: 50, y, size: 11, font, color: rgb(0.1, 0.1, 0.1) });
      y -= 18;
      if (y < 50) break;
    }

    const bytes = await doc.save();
    downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), 'document.pdf');
    setStatusMsg({ text: '✓ Text document compiled to PDF', ok: true });
  };

  // --------------------------------------------------------------------------
  // 8: ZIP FILE CREATOR
  // --------------------------------------------------------------------------
  const [zipFiles, setZipFiles] = useState<File[]>([]);
  const [zipArchiveName, setZipArchiveName] = useState('archive.zip');

  const executeZip = async () => {
    if (!zipFiles.length) return;
    setStatusMsg({ text: `Bundling ${zipFiles.length} files into ZIP...`, ok: true });
    const zip = new JSZip();
    for (const f of zipFiles) {
      const buf = await f.arrayBuffer();
      zip.file(f.name, buf);
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(zipBlob, zipArchiveName || 'archive.zip');
    setStatusMsg({ text: `✓ ZIP created (${(zipBlob.size / 1024).toFixed(1)} KB)`, ok: true });
  };

  return (
    <div className="bv-tool-layout">
      {/* INPUTS PANEL */}
      <div className="bv-tool-panel bv-inputs-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge">DOCUMENT PROCESSOR</span>
          <h2 className="bv-panel-title">{tool.name}</h2>
        </div>

        {/* 1: CSV TO JSON */}
        {tool.id === 'csv-to-json' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">CSV Content</span>
              <textarea
                className="bv-input bv-textarea"
                rows={9}
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
              />
            </label>
            <button type="button" className="btn-primary" style={{ padding: '0.75rem' }} onClick={executeCsvToJson}>
              ⚡ Convert CSV to JSON
            </button>
          </div>
        )}

        {/* 2: JSON TO CSV */}
        {tool.id === 'json-to-csv' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">JSON Array</span>
              <textarea
                className="bv-input bv-textarea"
                rows={9}
                value={jsonInput}
                onChange={e => setJsonInput(e.target.value)}
                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
              />
            </label>
            <button type="button" className="btn-primary" style={{ padding: '0.75rem' }} onClick={executeJsonToCsv}>
              ⚡ Convert JSON to CSV
            </button>
          </div>
        )}

        {/* 3: CSV TO XLSX */}
        {tool.id === 'csv-to-xlsx' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">CSV Data</span>
              <textarea
                className="bv-input bv-textarea"
                rows={9}
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
              />
            </label>
            <button type="button" className="btn-primary" style={{ padding: '0.75rem' }} onClick={executeCsvToXlsx}>
              📊 Generate Excel (.xlsx) File
            </button>
          </div>
        )}

        {/* 4: XLSX TO CSV */}
        {tool.id === 'xlsx-to-csv' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-dropzone">
              <div className="bv-dropzone-icon">📊</div>
              <div className="bv-dropzone-text"><strong>Choose an Excel Workbook</strong> (.xlsx / .xls)</div>
              <input type="file" accept=".xlsx,.xls" onChange={handleXlsxUpload} className="bv-file-input" />
            </label>
            {excelSheets.length > 0 && (
              <label className="bv-field">
                <span className="bv-field-label">Select Workbook Sheet</span>
                <select
                  className="bv-input bv-select"
                  onChange={e => {
                    const sheet = activeWorkbook?.Sheets[e.target.value];
                    if (sheet) {
                      const csv = XLSX.utils.sheet_to_csv(sheet);
                      setCsvOutput(csv);
                    }
                  }}
                >
                  {excelSheets.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            )}
          </div>
        )}

        {/* 5: MARKDOWN TO HTML */}
        {tool.id === 'markdown-to-html' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Markdown Input</span>
              <textarea
                className="bv-input bv-textarea"
                rows={9}
                value={mdInput}
                onChange={e => setMdInput(e.target.value)}
                style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
              />
            </label>
            <button type="button" className="btn-primary" style={{ padding: '0.75rem' }} onClick={executeMarkdown}>
              ⚡ Parse Markdown to HTML
            </button>
          </div>
        )}

        {/* 6 & 7: HTML & TEXT TO PDF */}
        {(tool.id === 'html-to-pdf' || tool.id === 'text-to-pdf') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Document Text</span>
              <textarea
                className="bv-input bv-textarea"
                rows={9}
                value={plainText}
                onChange={e => setPlainText(e.target.value)}
              />
            </label>
            <button type="button" className="btn-primary" style={{ padding: '0.75rem' }} onClick={executeTextToPdf}>
              📄 Export to Paginated PDF
            </button>
          </div>
        )}

        {/* 8: ZIP CREATOR */}
        {tool.id === 'zip-file-creator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-dropzone">
              <div className="bv-dropzone-icon">🗂️</div>
              <div className="bv-dropzone-text"><strong>Choose Multiple Files</strong> to ZIP</div>
              <input type="file" multiple onChange={e => setZipFiles(Array.from(e.target.files || []))} className="bv-file-input" />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Archive File Name</span>
              <input
                type="text"
                className="bv-input"
                value={zipArchiveName}
                onChange={e => setZipArchiveName(e.target.value)}
              />
            </label>
            <button type="button" className="btn-primary" style={{ padding: '0.75rem' }} disabled={!zipFiles.length} onClick={executeZip}>
              🗜️ Bundle into ZIP File ({zipFiles.length} files)
            </button>
          </div>
        )}
      </div>

      {/* RESULTS PANEL */}
      <div className="bv-tool-panel bv-results-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>OUTPUT</span>
          <h2 className="bv-panel-title">Converted Data</h2>
        </div>

        {statusMsg && (
          <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', marginBottom: '1rem', background: statusMsg.ok ? '#ECFDF5' : '#FEF2F2', color: statusMsg.ok ? '#059669' : '#DC2626', fontSize: '0.85rem' }}>
            {statusMsg.text}
          </div>
        )}

        {(tool.id === 'csv-to-json' || tool.id === 'json-to-csv' || tool.id === 'xlsx-to-csv') && (
          <>
            <textarea
              className="bv-input bv-textarea"
              rows={10}
              readOnly
              value={tool.id === 'csv-to-json' ? jsonOutput : csvOutput}
              style={{ fontFamily: 'monospace', fontSize: '0.85rem', backgroundColor: '#F8FAFC', marginBottom: '1rem' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-primary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                onClick={() => handleCopy(tool.id === 'csv-to-json' ? jsonOutput : csvOutput)}
              >
                {copied ? '✓ Copied!' : 'Copy Converted Data'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                onClick={() => downloadText(tool.id === 'csv-to-json' ? jsonOutput : csvOutput, tool.id === 'csv-to-json' ? 'data.json' : 'data.csv')}
              >
                Download File
              </button>
            </div>
          </>
        )}

        {tool.id === 'markdown-to-html' && htmlOutput && (
          <>
            <div style={{ padding: '1rem', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', marginBottom: '1rem', maxHeight: '200px', overflowY: 'auto' }} dangerouslySetInnerHTML={{ __html: htmlOutput }} />
            <button type="button" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }} onClick={() => handleCopy(htmlOutput)}>
              {copied ? '✓ Copied HTML!' : 'Copy Clean HTML'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
