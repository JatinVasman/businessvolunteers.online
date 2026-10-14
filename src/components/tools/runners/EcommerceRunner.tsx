import React, { useState, useMemo } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import JsBarcode from 'jsbarcode';
import type { ToolMeta } from '../../../data/toolsData';
import { formatINR, downloadBlob, copyToClipboard } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

// Marketplace presets for the shared label cropping engine
const MARKETPLACE_PRESETS: Record<string, { name: string; topPct: number; heightPct: number; leftPct: number; widthPct: number }> = {
  'amazon-label-cropper': { name: 'Amazon ATS / Easy Ship', topPct: 0, heightPct: 52, leftPct: 3, widthPct: 94 },
  'flipkart-label-cropper': { name: 'Flipkart Ekart', topPct: 0, heightPct: 50, leftPct: 4, widthPct: 92 },
  'meesho-label-cropper': { name: 'Meesho Thermal', topPct: 0, heightPct: 50, leftPct: 3, widthPct: 94 },
  'myntra-label-cropper': { name: 'Myntra Logistics', topPct: 0, heightPct: 48, leftPct: 5, widthPct: 90 },
  'ajio-label-cropper': { name: 'AJIO B2C', topPct: 0, heightPct: 50, leftPct: 4, widthPct: 92 },
  'nykaa-fashion-label-cropper': { name: 'Nykaa Beauty & Fashion', topPct: 0, heightPct: 52, leftPct: 3, widthPct: 94 },
  'jiomart-label-cropper': { name: 'JioMart Retail', topPct: 0, heightPct: 50, leftPct: 4, widthPct: 92 },
  'snapdeal-label-cropper': { name: 'Snapdeal', topPct: 0, heightPct: 50, leftPct: 3, widthPct: 94 },
  'tata-cliq-label-cropper': { name: 'Tata CLiQ', topPct: 0, heightPct: 50, leftPct: 4, widthPct: 92 },
  'ebay-label-cropper': { name: 'eBay Domestic & Global', topPct: 0, heightPct: 52, leftPct: 3, widthPct: 94 },
  'etsy-label-cropper': { name: 'Etsy Shipping', topPct: 0, heightPct: 50, leftPct: 4, widthPct: 92 },
  'shopify-shipping-label-cropper': { name: 'Shopify / Shiprocket', topPct: 0, heightPct: 50, leftPct: 3, widthPct: 94 },
  'woocommerce-shipping-label-cropper': { name: 'WooCommerce', topPct: 0, heightPct: 50, leftPct: 4, widthPct: 92 },
  'shipping-label-cropper': { name: 'Universal Custom', topPct: 0, heightPct: 50, leftPct: 4, widthPct: 92 },
};

export const EcommerceRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --------------------------------------------------------------------------
  // SHARED LABEL CROPPING ENGINE (14 Marketplace Croppers + A4 to 4x6)
  // --------------------------------------------------------------------------
  const [labelFiles, setLabelFiles] = useState<File[]>([]);
  const isLabelCropper = !!MARKETPLACE_PRESETS[tool.id] || tool.id === 'a4-to-4x6-label-converter';

  const defaultPreset = MARKETPLACE_PRESETS[tool.id] || {
    name: 'Standard A4 to 4x6',
    topPct: 0,
    heightPct: 50,
    leftPct: 4,
    widthPct: 92,
  };
  const [cropTopPct, setCropTopPct] = useState<number>(defaultPreset.topPct);
  const [cropHeightPct, setCropHeightPct] = useState<number>(defaultPreset.heightPct);
  const [cropLeftPct, setCropLeftPct] = useState<number>(defaultPreset.leftPct);
  const [cropWidthPct, setCropWidthPct] = useState<number>(defaultPreset.widthPct);

  const executeLabelCropper = async () => {
    if (!labelFiles.length) {
      setStatusMsg({ text: 'Please select or drag-and-drop your shipping label PDF(s).', ok: false });
      return;
    }

    setIsProcessing(true);
    setStatusMsg({ text: `Processing and cropping ${labelFiles.length} file(s) into 4x6 thermal roll format...`, ok: true });

    try {
      // 4x6 inches in PDF points (72 points per inch) = 288 x 432 pt
      const target4x6Width = 288;
      const target4x6Height = 432;
      const outputPdf = await PDFDocument.create();

      for (const file of labelFiles) {
        const buffer = await file.arrayBuffer();
        const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        const numPages = srcDoc.getPageCount();

        for (let i = 0; i < numPages; i++) {
          const srcPage = srcDoc.getPage(i);
          const { width, height } = srcPage.getSize();

          // Calculate crop box points
          const cropX = width * (cropLeftPct / 100);
          const cropW = width * (cropWidthPct / 100);
          const cropH = height * (cropHeightPct / 100);
          // In PDF coordinates, y=0 is bottom
          const cropY = height * (1 - (cropTopPct + cropHeightPct) / 100);

          srcPage.setCropBox(cropX, cropY, cropW, cropH);

          // Copy page to target 4x6 document
          const [embeddedPage] = await outputPdf.copyPages(srcDoc, [i]);
          embeddedPage.setSize(target4x6Width, target4x6Height);
          embeddedPage.scale(target4x6Width / cropW, target4x6Height / cropH);
          outputPdf.addPage(embeddedPage);
        }
      }

      const bytes = await outputPdf.save();
      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), `${tool.id}_4x6_thermal.pdf`);
      setIsProcessing(false);
      setStatusMsg({
        text: `✓ Successfully converted ${outputPdf.getPageCount()} shipping label page(s) into clean 4x6 thermal PDF!`,
        ok: true,
      });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Label processing error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // MULTIPLE LABELS PER PAGE (2/4/6/8 on A4)
  // --------------------------------------------------------------------------
  const [gridCount, setGridCount] = useState<number>(4);

  const executeMultipleLabels = async () => {
    if (!labelFiles[0]) return;
    setIsProcessing(true);
    setStatusMsg({ text: `Arranging labels into ${gridCount}-up grid on A4...`, ok: true });

    try {
      const buffer = await labelFiles[0].arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const outDoc = await PDFDocument.create();
      const totalSrcPages = srcDoc.getPageCount();

      // Standard A4: 595.28 x 841.89 points
      const a4W = 595.28;
      const a4H = 841.89;

      let currentPage = outDoc.addPage([a4W, a4H]);
      let slot = 0;

      for (let i = 0; i < totalSrcPages; i++) {
        if (slot >= gridCount) {
          currentPage = outDoc.addPage([a4W, a4H]);
          slot = 0;
        }

        const [embedded] = await outDoc.embedPdf(srcDoc, [i]);
        const slotW = a4W / 2;
        const slotH = a4H / 2;
        const col = slot % 2;
        const row = Math.floor(slot / 2);

        currentPage.drawPage(embedded, {
          x: col * slotW + 10,
          y: a4H - (row + 1) * slotH + 10,
          width: slotW - 20,
          height: slotH - 20,
        });

        slot++;
      }

      const bytes = await outDoc.save();
      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), `multiple_labels_${gridCount}up_a4.pdf`);
      setIsProcessing(false);
      setStatusMsg({ text: `✓ Generated ${outDoc.getPageCount()} A4 sheet(s) with ${gridCount} labels per page!`, ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // SHIPPING LABEL PAGE SPLITTER (Odd/Even Split)
  // --------------------------------------------------------------------------
  const executeSplitter = async () => {
    if (!labelFiles[0]) return;
    setIsProcessing(true);
    setStatusMsg({ text: 'Splitting label pages from customer invoices...', ok: true });

    try {
      const buffer = await labelFiles[0].arrayBuffer();
      const srcDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const total = srcDoc.getPageCount();

      const labelsPdf = await PDFDocument.create();
      const invoicesPdf = await PDFDocument.create();

      const labelIndices = [];
      const invoiceIndices = [];

      for (let i = 0; i < total; i++) {
        if (i % 2 === 0) labelIndices.push(i);
        else invoiceIndices.push(i);
      }

      if (labelIndices.length) {
        const pages = await labelsPdf.copyPages(srcDoc, labelIndices);
        pages.forEach(p => labelsPdf.addPage(p));
        const lBytes = await labelsPdf.save();
        downloadBlob(new Blob([lBytes as any], { type: 'application/pdf' }), 'All_Shipping_Labels.pdf');
      }

      if (invoiceIndices.length) {
        const pages = await invoicesPdf.copyPages(srcDoc, invoiceIndices);
        pages.forEach(p => invoicesPdf.addPage(p));
        const iBytes = await invoicesPdf.save();
        downloadBlob(new Blob([iBytes as any], { type: 'application/pdf' }), 'All_Customer_Invoices.pdf');
      }

      setIsProcessing(false);
      setStatusMsg({ text: `✓ Separated ${labelIndices.length} labels and ${invoiceIndices.length} invoices!`, ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Split error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // MARKETPLACE PROFIT CALCULATOR
  // --------------------------------------------------------------------------
  const [productCost, setProductCost] = useState<number>(350);
  const [sellingPrice, setSellingPrice] = useState<number>(999);
  const [shippingWeightGrams, setShippingWeightGrams] = useState<number>(500);
  const [marketplacePlatform, setMarketplacePlatform] = useState<'amazon' | 'flipkart' | 'meesho' | 'myntra'>('amazon');
  const [referralFeePct, setReferralFeePct] = useState<number>(12);
  const [closingFee, setClosingFee] = useState<number>(25);
  const [shippingFee, setShippingFee] = useState<number>(65);
  const [packagingCost, setPackagingCost] = useState<number>(20);
  const [adSpendPerOrder, setAdSpendPerOrder] = useState<number>(80);
  const [returnRatePct, setReturnRatePct] = useState<number>(10);

  const profitCalc = useMemo(() => {
    const referralAmt = (sellingPrice * referralFeePct) / 100;
    const totalPlatformFee = referralAmt + closingFee + shippingFee;
    const gstOnServices = totalPlatformFee * 0.18; // 18% GST on marketplace services
    const returnLoss = (returnRatePct / 100) * (shippingFee * 1.5 + packagingCost); // Return logistics hit
    const totalExpenses = productCost + totalPlatformFee + gstOnServices + packagingCost + adSpendPerOrder + returnLoss;
    const netProfit = sellingPrice - totalExpenses;
    const netMarginPct = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;

    return { referralAmt, totalPlatformFee, gstOnServices, returnLoss, totalExpenses, netProfit, netMarginPct };
  }, [productCost, sellingPrice, referralFeePct, closingFee, shippingFee, packagingCost, adSpendPerOrder, returnRatePct]);

  // --------------------------------------------------------------------------
  // SELLING PRICE CALCULATOR (Target Margin Backward Pricing)
  // --------------------------------------------------------------------------
  const [targetMarginPct, setTargetMarginPct] = useState<number>(25);

  const targetPriceCalc = useMemo(() => {
    const fixedCostPart = productCost + closingFee + shippingFee + packagingCost + adSpendPerOrder;
    // SP - (SP * referral% + SP * 18% on referral + targetMargin% * SP) = fixedCostPart
    const variableFraction = (referralFeePct * 1.18 + targetMarginPct) / 100;
    const recPrice = variableFraction < 1 ? fixedCostPart / (1 - variableFraction) : 0;
    const estProfit = (recPrice * targetMarginPct) / 100;
    return { recPrice: Math.round(recPrice), estProfit: Math.round(estProfit) };
  }, [productCost, closingFee, shippingFee, packagingCost, adSpendPerOrder, referralFeePct, targetMarginPct]);

  // --------------------------------------------------------------------------
  // INVENTORY & REORDER CALCULATOR
  // --------------------------------------------------------------------------
  const [currentStock, setCurrentStock] = useState<number>(450);
  const [dailySalesVelocity, setDailySalesVelocity] = useState<number>(15);
  const [leadTimeDays, setLeadTimeDays] = useState<number>(14);
  const [safetyBufferDays, setSafetyBufferDays] = useState<number>(7);

  const inventoryCalc = useMemo(() => {
    const stockCoverDays = dailySalesVelocity > 0 ? Math.floor(currentStock / dailySalesVelocity) : 0;
    const leadTimeDemand = dailySalesVelocity * leadTimeDays;
    const safetyStock = dailySalesVelocity * safetyBufferDays;
    const reorderPoint = leadTimeDemand + safetyStock;
    const needsReorder = currentStock <= reorderPoint;
    const suggestedOrderQty = Math.max(0, reorderPoint * 2 - currentStock);

    return { stockCoverDays, leadTimeDemand, safetyStock, reorderPoint, needsReorder, suggestedOrderQty };
  }, [currentStock, dailySalesVelocity, leadTimeDays, safetyBufferDays]);

  // --------------------------------------------------------------------------
  // PRODUCT BARCODE LABEL SHEET MAKER (24-up on A4)
  // --------------------------------------------------------------------------
  const [barcodeSku, setBarcodeSku] = useState('BV-TSHIRT-BLK-L');
  const [barcodeTitle, setBarcodeTitle] = useState('Classic Cotton Crewneck T-Shirt');
  const [barcodeMrp, setBarcodeMrp] = useState('1499');

  const executeBarcodeSheet = async () => {
    setIsProcessing(true);
    setStatusMsg({ text: 'Generating 24-up A4 barcode sticker sheet...', ok: true });

    try {
      const doc = await PDFDocument.create();
      const page = doc.addPage([595.28, 841.89]); // A4
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

      // Generate barcode as image
      const canvas = document.createElement('canvas');
      JsBarcode(canvas, barcodeSku, {
        format: 'CODE128',
        width: 2,
        height: 45,
        displayValue: true,
        font: 'Outfit',
        fontSize: 12,
        margin: 0,
      });

      const pngUrl = canvas.toDataURL('image/png');
      const pngImage = await doc.embedPng(pngUrl);

      // 3 cols x 8 rows = 24 stickers
      const cols = 3;
      const rows = 8;
      const stickerW = 180;
      const stickerH = 95;
      const marginX = 25;
      const marginY = 35;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = marginX + c * (stickerW + 8);
          const y = 841.89 - marginY - (r + 1) * (stickerH + 4);

          // Sticker border
          page.drawRectangle({
            x,
            y,
            width: stickerW,
            height: stickerH,
            borderColor: rgb(0.85, 0.85, 0.85),
            borderWidth: 0.5,
          });

          // Product title
          page.drawText(barcodeTitle.slice(0, 24), { x: x + 8, y: y + stickerH - 16, size: 8, font });
          page.drawText(`MRP: Rs. ${barcodeMrp} (Incl. of all taxes)`, { x: x + 8, y: y + stickerH - 28, size: 7, font: fontRegular, color: rgb(0.2, 0.2, 0.2) });

          // Barcode image
          page.drawImage(pngImage, { x: x + 8, y: y + 8, width: stickerW - 16, height: 45 });
        }
      }

      const bytes = await doc.save();
      downloadBlob(new Blob([bytes as any], { type: 'application/pdf' }), 'barcode_sticker_sheet_24up.pdf');
      setIsProcessing(false);
      setStatusMsg({ text: '✓ 24-Up A4 Barcode Sticker Sheet generated!', ok: true });
    } catch (err: any) {
      setIsProcessing(false);
      setStatusMsg({ text: `Barcode sheet error: ${err.message}`, ok: false });
    }
  };

  // --------------------------------------------------------------------------
  // SELLER SETTLEMENT RECONCILIATION
  // --------------------------------------------------------------------------
  const [orderCsvText, setOrderCsvText] = useState("Order_ID,Expected_Payout\nORD-8001,850.00\nORD-8002,1250.00\nORD-8003,450.00\nORD-8004,2100.00");
  const [bankCsvText, setBankCsvText] = useState("Order_ID,Bank_Payout\nORD-8001,850.00\nORD-8002,1100.00\nORD-8004,2100.00");

  const reconciliationReport = useMemo(() => {
    const orders: Record<string, number> = {};
    orderCsvText.split('\n').slice(1).forEach(l => {
      const [id, amt] = l.split(',');
      if (id && amt) orders[id.trim()] = Number(amt) || 0;
    });

    const bank: Record<string, number> = {};
    bankCsvText.split('\n').slice(1).forEach(l => {
      const [id, amt] = l.split(',');
      if (id && amt) bank[id.trim()] = Number(amt) || 0;
    });

    const discrepancies: { id: string; expected: number; received: number; diff: number; status: string }[] = [];
    Object.entries(orders).forEach(([id, exp]) => {
      const rec = bank[id];
      if (rec === undefined) {
        discrepancies.push({ id, expected: exp, received: 0, diff: -exp, status: 'Missing in Payout' });
      } else if (rec !== exp) {
        discrepancies.push({ id, expected: exp, received: rec, diff: rec - exp, status: 'Underpaid / Discrepancy' });
      }
    });

    return discrepancies;
  }, [orderCsvText, bankCsvText]);

  // --------------------------------------------------------------------------
  // PRODUCT IMAGE COMPLIANCE CHECKER
  // --------------------------------------------------------------------------
  const [auditFiles, setAuditFiles] = useState<File[]>([]);
  const [auditResults, setAuditResults] = useState<{ name: string; w: number; h: number; sizeKb: number; passAspect: boolean; passRes: boolean; passOverall: boolean }[]>([]);

  const executeImageAudit = async (files: File[]) => {
    const results = [];
    for (const f of files) {
      const url = URL.createObjectURL(f);
      const img = new Image();
      img.src = url;
      await img.decode();
      const passRes = img.width >= 1000 && img.height >= 1000;
      const aspect = img.width / img.height;
      const passAspect = aspect >= 0.8 && aspect <= 1.25;
      const passOverall = passRes && passAspect && f.size < 5 * 1024 * 1024;
      results.push({
        name: f.name,
        w: img.width,
        h: img.height,
        sizeKb: Math.round(f.size / 1024),
        passAspect,
        passRes,
        passOverall,
      });
    }
    setAuditResults(results);
  };

  return (
    <div className="bv-tool-layout">
      {/* INPUTS PANEL */}
      <div className="bv-tool-panel bv-inputs-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge">E-COMMERCE SUITE</span>
          <h2 className="bv-panel-title">{tool.name}</h2>
        </div>

        {/* 1: SHIPPING LABEL CROPPERS */}
        {isLabelCropper && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-dropzone">
              <div className="bv-dropzone-icon">📦</div>
              <div className="bv-dropzone-text">
                <strong>Upload Shipping Label PDF(s)</strong> or drag &amp; drop
              </div>
              <small className="bv-dropzone-hint">
                {labelFiles.length > 0 ? `Selected: ${labelFiles.map(f => f.name).join(', ')}` : 'Supports multi-page manifests & batch orders.'}
              </small>
              <input
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={e => setLabelFiles(Array.from(e.target.files || []))}
                className="bv-file-input"
              />
            </label>

            <div style={{ padding: '0.85rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.825rem' }}>
              <div style={{ fontWeight: 800, color: '#0B132A', marginBottom: '0.35rem' }}>
                Preset: {defaultPreset.name}
              </div>
              <div style={{ color: '#64748B' }}>
                Crops the shipping label and isolates clean 4x6 inch (100x150 mm) output for thermal roll printers.
              </div>
            </div>

            {tool.id === 'shipping-label-cropper' && (
              <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, marginBottom: '0.5rem' }}>Custom Crop Boundaries</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <label className="bv-field">
                    <span className="bv-field-label">Top %: {cropTopPct}%</span>
                    <input type="range" min={0} max={50} value={cropTopPct} onChange={e => setCropTopPct(Number(e.target.value))} />
                  </label>
                  <label className="bv-field">
                    <span className="bv-field-label">Height %: {cropHeightPct}%</span>
                    <input type="range" min={20} max={80} value={cropHeightPct} onChange={e => setCropHeightPct(Number(e.target.value))} />
                  </label>
                  <label className="bv-field">
                    <span className="bv-field-label">Left %: {cropLeftPct}%</span>
                    <input type="range" min={0} max={30} value={cropLeftPct} onChange={e => setCropLeftPct(Number(e.target.value))} />
                  </label>
                  <label className="bv-field">
                    <span className="bv-field-label">Width %: {cropWidthPct}%</span>
                    <input type="range" min={50} max={100} value={cropWidthPct} onChange={e => setCropWidthPct(Number(e.target.value))} />
                  </label>
                </div>
              </div>
            )}

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.85rem' }}
              disabled={isProcessing || !labelFiles.length}
              onClick={executeLabelCropper}
            >
              ⚡ Crop &amp; Export 4x6 Thermal PDF
            </button>
          </div>
        )}

        {/* 2: MULTIPLE LABELS PER PAGE */}
        {tool.id === 'multiple-labels-per-page' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-dropzone">
              <div className="bv-dropzone-icon">📄</div>
              <div className="bv-dropzone-text"><strong>Upload 4x6 Label PDF</strong></div>
              <input type="file" accept=".pdf,application/pdf" onChange={e => setLabelFiles(Array.from(e.target.files || []))} className="bv-file-input" />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Grid Layout per A4 Sheet</span>
              <select className="bv-input bv-select" value={gridCount} onChange={e => setGridCount(Number(e.target.value))}>
                <option value={2}>2 Labels per Page (1x2)</option>
                <option value={4}>4 Labels per Page (2x2 - Recommended)</option>
                <option value={6}>6 Labels per Page (2x3)</option>
              </select>
            </label>

            <button type="button" className="btn-primary" style={{ padding: '0.85rem' }} disabled={!labelFiles.length} onClick={executeMultipleLabels}>
              📑 Generate Paper-Saving A4 Grid PDF
            </button>
          </div>
        )}

        {/* 3: SPLITTER */}
        {tool.id === 'shipping-label-page-splitter' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-dropzone">
              <div className="bv-dropzone-icon">✂️</div>
              <div className="bv-dropzone-text"><strong>Upload Combined Order PDF</strong></div>
              <input type="file" accept=".pdf,application/pdf" onChange={e => setLabelFiles(Array.from(e.target.files || []))} className="bv-file-input" />
            </label>
            <button type="button" className="btn-primary" style={{ padding: '0.85rem' }} disabled={!labelFiles.length} onClick={executeSplitter}>
              ✂️ Split into Labels PDF &amp; Invoices PDF
            </button>
          </div>
        )}

        {/* 4: MARKETPLACE PROFIT CALCULATOR */}
        {tool.id === 'marketplace-profit-calculator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Marketplace Platform</span>
              <select className="bv-input bv-select" value={marketplacePlatform} onChange={e => setMarketplacePlatform(e.target.value as any)}>
                <option value="amazon">Amazon India</option>
                <option value="flipkart">Flipkart</option>
                <option value="meesho">Meesho</option>
                <option value="myntra">Myntra</option>
              </select>
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Product Cost Price (₹)</span>
                <input type="number" className="bv-input" min={0} value={productCost} onChange={e => setProductCost(Number(e.target.value))} />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Selling Price (₹)</span>
                <input type="number" className="bv-input" min={0} value={sellingPrice} onChange={e => setSellingPrice(Number(e.target.value))} />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Referral Fee (%)</span>
                <input type="number" className="bv-input" value={referralFeePct} onChange={e => setReferralFeePct(Number(e.target.value))} />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Shipping / Courier Fee (₹)</span>
                <input type="number" className="bv-input" value={shippingFee} onChange={e => setShippingFee(Number(e.target.value))} />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Package Weight (g)</span>
                <input type="number" className="bv-input" value={shippingWeightGrams} onChange={e => setShippingWeightGrams(Number(e.target.value))} />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Packaging Cost (₹)</span>
                <input type="number" className="bv-input" value={packagingCost} onChange={e => setPackagingCost(Number(e.target.value))} />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Closing Fee (₹)</span>
                <input type="number" className="bv-input" value={closingFee} onChange={e => setClosingFee(Number(e.target.value))} />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Ad Spend per Order (₹)</span>
                <input type="number" className="bv-input" value={adSpendPerOrder} onChange={e => setAdSpendPerOrder(Number(e.target.value))} />
              </label>
            </div>

            <label className="bv-field">
              <span className="bv-field-label">Customer Return Rate (%): {returnRatePct}%</span>
              <input type="range" min={0} max={30} value={returnRatePct} onChange={e => setReturnRatePct(Number(e.target.value))} style={{ width: '100%', accentColor: '#FF4E27' }} />
            </label>
          </div>
        )}

        {/* 5: SELLING PRICE CALCULATOR */}
        {tool.id === 'selling-price-calculator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Product Cost Price (₹)</span>
              <input type="number" className="bv-input" min={0} value={productCost} onChange={e => setProductCost(Number(e.target.value))} />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Target Desired Net Profit Margin (%)</span>
              <input type="number" className="bv-input" min={1} max={60} value={targetMarginPct} onChange={e => setTargetMarginPct(Number(e.target.value))} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Marketplace Fee (%)</span>
                <input type="number" className="bv-input" value={referralFeePct} onChange={e => setReferralFeePct(Number(e.target.value))} />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Fixed Shipping Fee (₹)</span>
                <input type="number" className="bv-input" value={shippingFee} onChange={e => setShippingFee(Number(e.target.value))} />
              </label>
            </div>
          </div>
        )}

        {/* 6: INVENTORY REORDER */}
        {tool.id === 'inventory-reorder-calculator' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Current Warehouse Stock Units</span>
              <input type="number" className="bv-input" value={currentStock} onChange={e => setCurrentStock(Number(e.target.value))} />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Daily Average Sales Velocity (Units/Day)</span>
              <input type="number" className="bv-input" value={dailySalesVelocity} onChange={e => setDailySalesVelocity(Number(e.target.value))} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Supplier Lead Time (Days)</span>
                <input type="number" className="bv-input" value={leadTimeDays} onChange={e => setLeadTimeDays(Number(e.target.value))} />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Safety Buffer (Days)</span>
                <input type="number" className="bv-input" value={safetyBufferDays} onChange={e => setSafetyBufferDays(Number(e.target.value))} />
              </label>
            </div>
          </div>
        )}

        {/* 7: PRODUCT BARCODE MAKER */}
        {tool.id === 'product-barcode-label-maker' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Product Name / Title</span>
              <input type="text" className="bv-input" value={barcodeTitle} onChange={e => setBarcodeTitle(e.target.value)} />
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">SKU Code</span>
                <input type="text" className="bv-input" value={barcodeSku} onChange={e => setBarcodeSku(e.target.value)} />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">MRP (₹)</span>
                <input type="text" className="bv-input" value={barcodeMrp} onChange={e => setBarcodeMrp(e.target.value)} />
              </label>
            </div>
            <button type="button" className="btn-primary" style={{ padding: '0.85rem' }} onClick={executeBarcodeSheet}>
              🖨️ Generate 24-Up A4 Sticker Sheet PDF
            </button>
          </div>
        )}

        {/* 8: SETTLEMENT RECONCILIATION */}
        {tool.id === 'seller-settlement-reconciliation' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Dispatched Orders (CSV: Order_ID, Expected_Payout)</span>
              <textarea className="bv-input bv-textarea" rows={4} value={orderCsvText} onChange={e => setOrderCsvText(e.target.value)} />
            </label>
            <label className="bv-field">
              <span className="bv-field-label">Bank Settlement Report (CSV: Order_ID, Bank_Payout)</span>
              <textarea className="bv-input bv-textarea" rows={4} value={bankCsvText} onChange={e => setBankCsvText(e.target.value)} />
            </label>
          </div>
        )}

        {/* 9: IMAGE COMPLIANCE CHECKER */}
        {tool.id === 'product-image-compliance-checker' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label className="bv-dropzone">
              <div className="bv-dropzone-icon">🔍</div>
              <div className="bv-dropzone-text"><strong>Upload Catalog Images</strong> to audit</div>
              {auditFiles.length > 0 && <small className="bv-dropzone-hint">{auditFiles.length} file(s) selected</small>}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={e => {
                  const fs = Array.from(e.target.files || []);
                  setAuditFiles(fs);
                  executeImageAudit(fs);
                }}
                className="bv-file-input"
              />
            </label>
          </div>
        )}
      </div>

      {/* RESULTS PANEL */}
      <div className="bv-tool-panel bv-results-panel">
        <div className="bv-panel-header">
          <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>ANALYTICS &amp; RESULTS</span>
          <h2 className="bv-panel-title">Output Dashboard</h2>
        </div>

        {statusMsg && (
          <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', marginBottom: '1rem', background: statusMsg.ok ? '#ECFDF5' : '#FEF2F2', color: statusMsg.ok ? '#059669' : '#DC2626', fontSize: '0.85rem' }}>
            {statusMsg.text}
          </div>
        )}

        {/* Marketplace Profit Results */}
        {tool.id === 'marketplace-profit-calculator' && (
          <div>
            <div style={{ padding: '1.25rem', background: '#FFF1EE', borderRadius: '16px', border: '1.5px solid #FF4E27', marginBottom: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FF4E27', textTransform: 'uppercase' }}>Net Profit per Order</div>
              <div style={{ fontSize: '2.4rem', fontWeight: 900, color: profitCalc.netProfit >= 0 ? '#0B132A' : '#DC2626', marginTop: '0.2rem' }}>
                {formatINR(profitCalc.netProfit)}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: profitCalc.netMarginPct >= 15 ? '#16A34A' : '#EA580C' }}>
                {profitCalc.netMarginPct.toFixed(1)}% Net Margin
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '1rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Selling Price</td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right', fontWeight: 700 }}>{formatINR(sellingPrice)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Product Cost</td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right', color: '#DC2626' }}>-{formatINR(productCost)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Marketplace Fees + 18% GST</td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right', color: '#DC2626' }}>-{formatINR(profitCalc.totalPlatformFee + profitCalc.gstOnServices)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.5rem 0', color: '#64748B' }}>Ad Spend &amp; Return Allowance</td>
                  <td style={{ padding: '0.5rem 0', textAlign: 'right', color: '#DC2626' }}>-{formatINR(adSpendPerOrder + profitCalc.returnLoss)}</td>
                </tr>
              </tbody>
            </table>

            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              onClick={() => handleCopy(`Selling Price: ${formatINR(sellingPrice)} | Net Profit: ${formatINR(profitCalc.netProfit)} (${profitCalc.netMarginPct.toFixed(1)}% margin)`)}
            >
              {copied ? '✓ Copied!' : 'Copy Summary'}
            </button>
          </div>
        )}

        {/* Target Selling Price Results */}
        {tool.id === 'selling-price-calculator' && (
          <div style={{ padding: '1.25rem', background: '#FFF1EE', borderRadius: '16px', border: '1.5px solid #FF4E27', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#FF4E27', textTransform: 'uppercase' }}>Recommended Listing Price</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B132A', marginTop: '0.2rem' }}>
              {formatINR(targetPriceCalc.recPrice)}
            </div>
            <p style={{ color: '#64748B', fontSize: '0.85rem', marginTop: '0.35rem' }}>
              Generates ~{formatINR(targetPriceCalc.estProfit)} profit ({targetMarginPct}%) per order after all fees.
            </p>
          </div>
        )}

        {/* Inventory Reorder Results */}
        {tool.id === 'inventory-reorder-calculator' && (
          <div>
            <div style={{ padding: '1.25rem', background: inventoryCalc.needsReorder ? '#FEF2F2' : '#ECFDF5', borderRadius: '14px', border: `1.5px solid ${inventoryCalc.needsReorder ? '#DC2626' : '#10B981'}`, textAlign: 'center', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: inventoryCalc.needsReorder ? '#DC2626' : '#16A34A', textTransform: 'uppercase' }}>
                {inventoryCalc.needsReorder ? '⚠️ REORDER NEEDED NOW' : '✓ HEALTHY INVENTORY'}
              </div>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0B132A', marginTop: '0.2rem' }}>
                {inventoryCalc.stockCoverDays} Days Cover
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.25rem' }}>
                Reorder Point: <strong>{inventoryCalc.reorderPoint} units</strong> (Current: {currentStock})
              </div>
            </div>

            {inventoryCalc.needsReorder && (
              <div style={{ padding: '0.85rem', background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', fontSize: '0.85rem', color: '#92400E' }}>
                Suggested Replenishment PO: <strong>{inventoryCalc.suggestedOrderQty} units</strong>
              </div>
            )}
          </div>
        )}

        {/* Settlement Reconciliation Results */}
        {tool.id === 'seller-settlement-reconciliation' && (
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0B132A', marginBottom: '0.5rem' }}>
              Audit Report ({reconciliationReport.length} Discrepancies Flagged)
            </h4>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <tr>
                    <th style={{ padding: '0.4rem', textAlign: 'left' }}>Order ID</th>
                    <th style={{ padding: '0.4rem', textAlign: 'right' }}>Expected</th>
                    <th style={{ padding: '0.4rem', textAlign: 'right' }}>Received</th>
                    <th style={{ padding: '0.4rem', textAlign: 'right' }}>Gap</th>
                  </tr>
                </thead>
                <tbody>
                  {reconciliationReport.map(r => (
                    <tr key={r.id} style={{ borderBottom: '1px solid #F1F5F9', color: '#DC2626' }}>
                      <td style={{ padding: '0.4rem', fontWeight: 700 }}>{r.id}</td>
                      <td style={{ padding: '0.4rem', textAlign: 'right' }}>₹{r.expected}</td>
                      <td style={{ padding: '0.4rem', textAlign: 'right' }}>₹{r.received}</td>
                      <td style={{ padding: '0.4rem', textAlign: 'right', fontWeight: 800 }}>₹{r.diff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Image Compliance Results */}
        {tool.id === 'product-image-compliance-checker' && auditResults.length > 0 && (
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <tr>
                  <th style={{ padding: '0.4rem', textAlign: 'left' }}>Image File</th>
                  <th style={{ padding: '0.4rem', textAlign: 'center' }}>Dimensions</th>
                  <th style={{ padding: '0.4rem', textAlign: 'center' }}>Size</th>
                  <th style={{ padding: '0.4rem', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {auditResults.map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.4rem', fontWeight: 600 }}>{r.name}</td>
                    <td style={{ padding: '0.4rem', textAlign: 'center' }}>{r.w}x{r.h}</td>
                    <td style={{ padding: '0.4rem', textAlign: 'center' }}>{r.sizeKb} KB</td>
                    <td style={{ padding: '0.4rem', textAlign: 'right', fontWeight: 800, color: r.passOverall ? '#16A34A' : '#DC2626' }}>
                      {r.passOverall ? '✓ PASS' : '✕ FAIL'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
