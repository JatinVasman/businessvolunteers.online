import React, { useState, useMemo } from 'react';
import type { ToolMeta } from '../../../data/toolsData';
import { formatINR, copyToClipboard, downloadText } from '../shared/toolUtils';

interface RunnerProps {
  tool: ToolMeta;
}

export const CalculatorsRunner: React.FC<RunnerProps> = ({ tool }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // --------------------------------------------------------------------------
  // 1 & 2: GST CALCULATOR & GST INCLUSIVE/EXCLUSIVE
  // --------------------------------------------------------------------------
  const [gstAmount, setGstAmount] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [gstType, setGstType] = useState<'intra' | 'inter'>('intra');
  const [gstMode, setGstMode] = useState<'exclusive' | 'inclusive'>(
    tool.id === 'gst-inclusive-exclusive-calculator' ? 'inclusive' : 'exclusive'
  );

  const gstCalc = useMemo(() => {
    const rateDecimal = gstRate / 100;
    let base = 0;
    let tax = 0;
    let total = 0;

    if (gstMode === 'exclusive') {
      base = gstAmount;
      tax = base * rateDecimal;
      total = base + tax;
    } else {
      total = gstAmount;
      base = total / (1 + rateDecimal);
      tax = total - base;
    }

    const cgst = gstType === 'intra' ? tax / 2 : 0;
    const sgst = gstType === 'intra' ? tax / 2 : 0;
    const igst = gstType === 'inter' ? tax : 0;

    return { base, tax, total, cgst, sgst, igst };
  }, [gstAmount, gstRate, gstType, gstMode]);

  // --------------------------------------------------------------------------
  // 3: EMI CALCULATOR
  // --------------------------------------------------------------------------
  const [emiPrincipal, setEmiPrincipal] = useState<number>(2500000);
  const [emiInterestRate, setEmiInterestRate] = useState<number>(8.5);
  const [emiTenureYears, setEmiTenureYears] = useState<number>(20);

  const emiCalc = useMemo(() => {
    const p = emiPrincipal;
    const r = emiInterestRate / 12 / 100;
    const n = emiTenureYears * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalAmount: 0, schedule: [] };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    // Generate yearly breakdown for display & CSV
    let balance = p;
    const schedule: { year: number; principalPaid: number; interestPaid: number; endingBalance: number }[] = [];

    for (let yr = 1; yr <= emiTenureYears; yr++) {
      let yrPrincipal = 0;
      let yrInterest = 0;
      for (let m = 1; m <= 12; m++) {
        const mInterest = balance * r;
        const mPrincipal = emi - mInterest;
        yrInterest += mInterest;
        yrPrincipal += mPrincipal;
        balance -= mPrincipal;
      }
      schedule.push({
        year: yr,
        principalPaid: yrPrincipal,
        interestPaid: yrInterest,
        endingBalance: Math.max(0, balance),
      });
    }

    return { emi, totalInterest, totalAmount, schedule };
  }, [emiPrincipal, emiInterestRate, emiTenureYears]);

  // --------------------------------------------------------------------------
  // 4: DISCOUNT CALCULATOR
  // --------------------------------------------------------------------------
  const [origPrice, setOrigPrice] = useState<number>(2500);
  const [disc1, setDisc1] = useState<number>(20);
  const [disc2, setDisc2] = useState<number>(10);
  const [flatCoupon, setFlatCoupon] = useState<number>(100);
  const [postTaxRate, setPostTaxRate] = useState<number>(0);

  const discountCalc = useMemo(() => {
    const afterDisc1 = origPrice * (1 - disc1 / 100);
    const afterDisc2 = afterDisc1 * (1 - disc2 / 100);
    const afterFlat = Math.max(0, afterDisc2 - flatCoupon);
    const taxAmt = afterFlat * (postTaxRate / 100);
    const finalPrice = afterFlat + taxAmt;
    const totalSavings = Math.max(0, origPrice - (finalPrice - taxAmt));
    const effectivePct = origPrice > 0 ? (totalSavings / origPrice) * 100 : 0;

    return { afterDisc1, afterDisc2, afterFlat, taxAmt, finalPrice, totalSavings, effectivePct };
  }, [origPrice, disc1, disc2, flatCoupon, postTaxRate]);

  // --------------------------------------------------------------------------
  // 5: PROFIT MARGIN CALCULATOR
  // --------------------------------------------------------------------------
  const [marginCalcMode, setMarginCalcMode] = useState<'from_sp' | 'from_margin'>('from_sp');
  const [costPrice, setCostPrice] = useState<number>(600);
  const [sellingPrice, setSellingPrice] = useState<number>(1000);
  const [targetMargin, setTargetMargin] = useState<number>(40);

  const marginCalc = useMemo(() => {
    if (marginCalcMode === 'from_sp') {
      const profit = sellingPrice - costPrice;
      const margin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;
      const markup = costPrice > 0 ? (profit / costPrice) * 100 : 0;
      return { cost: costPrice, sp: sellingPrice, profit, margin, markup };
    } else {
      const sp = targetMargin < 100 ? costPrice / (1 - targetMargin / 100) : 0;
      const profit = sp - costPrice;
      const markup = costPrice > 0 ? (profit / costPrice) * 100 : 0;
      return { cost: costPrice, sp, profit, margin: targetMargin, markup };
    }
  }, [marginCalcMode, costPrice, sellingPrice, targetMargin]);

  // --------------------------------------------------------------------------
  // 6: BREAK-EVEN CALCULATOR
  // --------------------------------------------------------------------------
  const [fixedCosts, setFixedCosts] = useState<number>(80000);
  const [variableCostUnit, setVariableCostUnit] = useState<number>(350);
  const [unitSellingPrice, setUnitSellingPrice] = useState<number>(750);

  const breakEvenCalc = useMemo(() => {
    const contributionMargin = unitSellingPrice - variableCostUnit;
    const cmRatio = unitSellingPrice > 0 ? (contributionMargin / unitSellingPrice) * 100 : 0;
    const bepUnits = contributionMargin > 0 ? Math.ceil(fixedCosts / contributionMargin) : 0;
    const bepRevenue = bepUnits * unitSellingPrice;

    const projections = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(multiplier => {
      const units = Math.round(bepUnits * multiplier);
      const rev = units * unitSellingPrice;
      const totalCost = fixedCosts + units * variableCostUnit;
      const netProfit = rev - totalCost;
      return { multiplier: `${Math.round(multiplier * 100)}%`, units, rev, netProfit };
    });

    return { contributionMargin, cmRatio, bepUnits, bepRevenue, projections };
  }, [fixedCosts, variableCostUnit, unitSellingPrice]);

  // --------------------------------------------------------------------------
  // 7: INVOICE & QUOTATION GENERATOR
  // --------------------------------------------------------------------------
  const [invoiceType, setInvoiceType] = useState<'Tax Invoice' | 'Quotation'>('Tax Invoice');
  const [invNumber, setInvNumber] = useState('INV-2026-001');
  const [invDate, setInvDate] = useState('2026-10-14');
  const [sellerName, setSellerName] = useState('Business Volunteers Pvt Ltd');
  const [sellerGst, setSellerGst] = useState('09AAACB1234F1Z8');
  const [buyerName, setBuyerName] = useState('Acme Enterprises');
  const [buyerGst, setBuyerGst] = useState('07BBAAA9876E1Z2');
  const [invItems, setInvItems] = useState([
    { desc: 'Web Application Design & Architecture', hsn: '998314', qty: 1, rate: 45000, taxRate: 18 },
    { desc: 'Technical SEO & Cloud Infrastructure Setup', hsn: '998315', qty: 1, rate: 25000, taxRate: 18 }
  ]);

  const invoiceTotals = useMemo(() => {
    let subtotal = 0;
    let taxTotal = 0;
    invItems.forEach(item => {
      const lineBase = item.qty * item.rate;
      const lineTax = lineBase * (item.taxRate / 100);
      subtotal += lineBase;
      taxTotal += lineTax;
    });
    return { subtotal, taxTotal, grandTotal: subtotal + taxTotal };
  }, [invItems]);

  const printInvoice = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${invoiceType} - ${invNumber}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 40px; color: #1E293B; line-height: 1.5; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #FF4E27; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 28px; font-weight: 800; color: #0B132A; }
          .parties { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .party-box { width: 48%; }
          .party-title { font-size: 13px; text-transform: uppercase; color: #64748B; font-weight: 700; margin-bottom: 6px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
          th { background: #F8FAFC; text-align: left; padding: 12px; border-bottom: 2px solid #E2E8F0; font-size: 13px; }
          td { padding: 12px; border-bottom: 1px solid #E2E8F0; font-size: 13px; }
          .totals { width: 320px; margin-left: auto; }
          .totals-row { display: flex; justify-content: space-between; padding: 6px 0; }
          .grand-total { font-weight: 800; font-size: 18px; color: #FF4E27; border-top: 2px solid #E2E8F0; margin-top: 10px; padding-top: 10px; }
          @media print { body { padding: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="title">${invoiceType}</div>
            <div style="color: #64748B; font-weight: 600;"># ${invNumber}</div>
            <div style="font-size: 13px; color: #64748B;">Date: ${invDate}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-weight: 800; font-size: 16px;">${sellerName}</div>
            <div style="font-size: 13px; color: #64748B;">GSTIN: ${sellerGst}</div>
          </div>
        </div>

        <div class="parties">
          <div class="party-box">
            <div class="party-title">Billed To</div>
            <div style="font-weight: 700; font-size: 15px;">${buyerName}</div>
            <div style="font-size: 13px; color: #64748B;">GSTIN: ${buyerGst || 'Unregistered'}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Item / Description</th>
              <th>HSN/SAC</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>GST %</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${invItems.map(item => `
              <tr>
                <td><strong>${item.desc}</strong></td>
                <td>${item.hsn}</td>
                <td>${item.qty}</td>
                <td>₹${item.rate.toLocaleString('en-IN')}</td>
                <td>${item.taxRate}%</td>
                <td style="text-align: right;">₹${(item.qty * item.rate * (1 + item.taxRate / 100)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row"><span>Taxable Value:</span><span>₹${invoiceTotals.subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
          <div class="totals-row"><span>Total GST:</span><span>₹${invoiceTotals.taxTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
          <div class="totals-row grand-total"><span>Grand Total:</span><span>₹${invoiceTotals.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
        </div>

        <div style="margin-top: 50px; font-size: 12px; color: #94A3B8; text-align: center; border-top: 1px solid #E2E8F0; padding-top: 15px;">
          Generated with Business Volunteers Free Tools Directory • 100% Client-Side
        </div>
        <script>window.print();</script>
      </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  // --------------------------------------------------------------------------
  // RENDER SELECTION ACCORDING TO TOOL.ID
  // --------------------------------------------------------------------------

  // 1 & 2: GST
  if (tool.id === 'gst-calculator' || tool.id === 'gst-inclusive-exclusive-calculator') {
    const summaryText = `GST Calculation Summary:
Base Price: ${formatINR(gstCalc.base)}
GST Rate: ${gstRate}% (${gstType === 'intra' ? `CGST: ${formatINR(gstCalc.cgst)} + SGST: ${formatINR(gstCalc.sgst)}` : `IGST: ${formatINR(gstCalc.igst)}`})
Total GST Amount: ${formatINR(gstCalc.tax)}
Total Final Price: ${formatINR(gstCalc.total)}`;

    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">TAX CONFIGURATION</span>
            <h2 className="bv-panel-title">{tool.name}</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Calculation Mode</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.4rem' }}>
                <button
                  type="button"
                  className={gstMode === 'exclusive' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.6rem', fontSize: '0.85rem' }}
                  onClick={() => setGstMode('exclusive')}
                >
                  Add GST (Exclusive)
                </button>
                <button
                  type="button"
                  className={gstMode === 'inclusive' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.6rem', fontSize: '0.85rem' }}
                  onClick={() => setGstMode('inclusive')}
                >
                  Reverse GST (Inclusive)
                </button>
              </div>
            </label>

            <label className="bv-field">
              <span className="bv-field-label">{gstMode === 'exclusive' ? 'Pre-Tax Base Amount (₹)' : 'Total Inclusive Amount (₹)'}</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                value={gstAmount}
                onChange={e => setGstAmount(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">GST Tax Rate Slab</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
                {[0, 5, 12, 18, 28].map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setGstRate(r)}
                    style={{
                      padding: '0.45rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: gstRate === r ? '2px solid #FF4E27' : '1px solid #CBD5E1',
                      background: gstRate === r ? '#FFF1EE' : '#FFFFFF',
                      color: gstRate === r ? '#FF4E27' : '#475569'
                    }}
                  >
                    {r}%
                  </button>
                ))}
              </div>
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Custom GST Rate (%)</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                max={100}
                step={0.1}
                value={gstRate}
                onChange={e => setGstRate(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Transaction Jurisdiction</span>
              <select
                className="bv-input bv-select"
                value={gstType}
                onChange={e => setGstType(e.target.value as 'intra' | 'inter')}
              >
                <option value="intra">Intra-State (CGST 50% + SGST 50%)</option>
                <option value="inter">Inter-State (IGST 100%)</option>
              </select>
            </label>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  setGstAmount(25000);
                  setGstRate(18);
                  setGstType('intra');
                  setGstMode('exclusive');
                }}
              >
                Try Example (₹25,000 @ 18%)
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  setGstAmount(1000);
                  setGstRate(18);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* OUTPUT RESULTS */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>CALCULATION RESULT</span>
            <h2 className="bv-panel-title">Tax Breakdown</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Base Amount</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0B132A', marginTop: '0.25rem' }}>{formatINR(gstCalc.base)}</div>
            </div>
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total GST ({gstRate}%)</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#FF4E27', marginTop: '0.25rem' }}>{formatINR(gstCalc.tax)}</div>
            </div>
            <div style={{ padding: '1rem', background: '#FFF1EE', borderRadius: '12px', border: '1.5px solid #FF4E27' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF4E27', textTransform: 'uppercase' }}>Final Total Price</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0B132A', marginTop: '0.25rem' }}>{formatINR(gstCalc.total)}</div>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>Net Base Amount</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(gstCalc.base)}</td>
                </tr>
                {gstType === 'intra' ? (
                  <>
                    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>CGST ({gstRate / 2}%)</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(gstCalc.cgst)}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>SGST ({gstRate / 2}%)</td>
                      <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(gstCalc.sgst)}</td>
                    </tr>
                  </>
                ) : (
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>IGST ({gstRate}%)</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(gstCalc.igst)}</td>
                  </tr>
                )}
                <tr style={{ backgroundColor: '#F8FAFC' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#0B132A' }}>Gross Total Payable</td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 900, color: '#FF4E27', fontSize: '1.05rem' }}>
                    {formatINR(gstCalc.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              onClick={() => handleCopy(summaryText)}
            >
              {copied ? '✓ Copied to Clipboard!' : 'Copy Summary'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
              onClick={() => {
                const csv = `Item,Amount\nBase Amount,${gstCalc.base.toFixed(2)}\nCGST,${gstCalc.cgst.toFixed(2)}\nSGST,${gstCalc.sgst.toFixed(2)}\nIGST,${gstCalc.igst.toFixed(2)}\nTotal Amount,${gstCalc.total.toFixed(2)}`;
                downloadText(csv, 'gst_breakdown.csv', 'text/csv');
              }}
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3: EMI CALCULATOR
  if (tool.id === 'emi-calculator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">LOAN DETAILS</span>
            <h2 className="bv-panel-title">EMI & Amortization Calculator</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Loan Principal Amount (₹)</span>
              <input
                type="number"
                className="bv-input"
                min={1000}
                step={10000}
                value={emiPrincipal}
                onChange={e => setEmiPrincipal(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Annual Interest Rate (%)</span>
              <input
                type="number"
                className="bv-input"
                min={0.1}
                max={50}
                step={0.1}
                value={emiInterestRate}
                onChange={e => setEmiInterestRate(Math.max(0.1, Number(e.target.value) || 0.1))}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Loan Tenure (Years)</span>
              <input
                type="number"
                className="bv-input"
                min={1}
                max={40}
                value={emiTenureYears}
                onChange={e => setEmiTenureYears(Math.max(1, Number(e.target.value) || 1))}
              />
            </label>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  setEmiPrincipal(5000000);
                  setEmiInterestRate(8.4);
                  setEmiTenureYears(20);
                }}
              >
                Try Home Loan (₹50 Lakh @ 8.4%)
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  setEmiPrincipal(800000);
                  setEmiInterestRate(9.2);
                  setEmiTenureYears(5);
                }}
              >
                Try Car Loan (₹8 Lakh @ 9.2%)
              </button>
            </div>
          </div>
        </div>

        {/* EMI RESULTS */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>MONTHLY REPAYMENT</span>
            <h2 className="bv-panel-title">EMI Breakdown</h2>
          </div>

          <div style={{ padding: '1.25rem', background: '#FFF1EE', borderRadius: '16px', border: '1.5px solid #FF4E27', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF4E27', textTransform: 'uppercase' }}>Monthly Loan EMI</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0B132A', marginTop: '0.25rem' }}>{formatINR(emiCalc.emi)}</div>
            <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.35rem' }}>
              Payable for {emiTenureYears * 12} months
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Interest</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#EA580C', marginTop: '0.25rem' }}>{formatINR(emiCalc.totalInterest)}</div>
            </div>
            <div style={{ padding: '1rem', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Payment (P + I)</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0B132A', marginTop: '0.25rem' }}>{formatINR(emiCalc.totalAmount)}</div>
            </div>
          </div>

          {/* Yearly Amortization preview */}
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0B132A', marginBottom: '0.75rem' }}>Yearly Amortization Schedule</h4>
          <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid #E2E8F0', borderRadius: '10px', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
              <thead style={{ position: 'sticky', top: 0, background: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0' }}>
                <tr>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Year</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Principal</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Interest</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {emiCalc.schedule.map(row => (
                  <tr key={row.year} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.5rem', fontWeight: 700 }}>Yr {row.year}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatINR(row.principalPaid)}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', color: '#EA580C' }}>{formatINR(row.interestPaid)}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(row.endingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            onClick={() => {
              let csv = 'Year,Principal Paid,Interest Paid,Ending Balance\n';
              emiCalc.schedule.forEach(r => {
                csv += `${r.year},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.endingBalance.toFixed(2)}\n`;
              });
              downloadText(csv, 'amortization_schedule.csv', 'text/csv');
            }}
          >
            Download Full Amortization CSV
          </button>
        </div>
      </div>
    );
  }

  // 4: DISCOUNT CALCULATOR
  if (tool.id === 'discount-calculator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">OFFER PARAMETERS</span>
            <h2 className="bv-panel-title">Discount Calculator</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Original Price (₹)</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                value={origPrice}
                onChange={e => setOrigPrice(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Primary Discount (%)</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                max={100}
                value={disc1}
                onChange={e => setDisc1(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Extra Stacked Discount (%) [Optional]</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                max={100}
                value={disc2}
                onChange={e => setDisc2(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Flat Coupon / Voucher Discount (₹) [Optional]</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                value={flatCoupon}
                onChange={e => setFlatCoupon(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Post-Discount Tax / GST (%) [Optional]</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                max={100}
                value={postTaxRate}
                onChange={e => setPostTaxRate(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  setOrigPrice(4999);
                  setDisc1(30);
                  setDisc2(10);
                  setFlatCoupon(250);
                  setPostTaxRate(18);
                }}
              >
                Try Festive Sale Example
              </button>
            </div>
          </div>
        </div>

        {/* DISCOUNT OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>SAVINGS ANALYSIS</span>
            <h2 className="bv-panel-title">Final Price & Savings</h2>
          </div>

          <div style={{ padding: '1.25rem', background: '#FFF1EE', borderRadius: '16px', border: '1.5px solid #FF4E27', marginBottom: '1.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF4E27', textTransform: 'uppercase' }}>Final Payable Price</div>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0B132A', marginTop: '0.25rem' }}>{formatINR(discountCalc.finalPrice)}</div>
            <div style={{ fontSize: '0.9rem', color: '#16A34A', fontWeight: 800, marginTop: '0.35rem' }}>
              You Save {formatINR(discountCalc.totalSavings)} ({discountCalc.effectivePct.toFixed(1)}% Effective Off)
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>Original Price</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(origPrice)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>After {disc1}% Primary Discount</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(discountCalc.afterDisc1)}</td>
                </tr>
                {disc2 > 0 && (
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>After Extra {disc2}% Stacked Discount</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(discountCalc.afterDisc2)}</td>
                  </tr>
                )}
                {flatCoupon > 0 && (
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>After Flat Coupon (-{formatINR(flatCoupon)})</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(discountCalc.afterFlat)}</td>
                  </tr>
                )}
                {postTaxRate > 0 && (
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>Plus GST / Tax ({postTaxRate}%)</td>
                    <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>+{formatINR(discountCalc.taxAmt)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            onClick={() => handleCopy(`Original Price: ${formatINR(origPrice)} | Final Price: ${formatINR(discountCalc.finalPrice)} | Savings: ${formatINR(discountCalc.totalSavings)} (${discountCalc.effectivePct.toFixed(1)}% off)`)}
          >
            {copied ? '✓ Copied!' : 'Copy Summary'}
          </button>
        </div>
      </div>
    );
  }

  // 5: PROFIT MARGIN CALCULATOR
  if (tool.id === 'profit-margin-calculator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">FINANCIAL METRICS</span>
            <h2 className="bv-panel-title">Profit Margin vs Markup</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Calculation Mode</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.4rem' }}>
                <button
                  type="button"
                  className={marginCalcMode === 'from_sp' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.6rem', fontSize: '0.8rem' }}
                  onClick={() => setMarginCalcMode('from_sp')}
                >
                  From Selling Price
                </button>
                <button
                  type="button"
                  className={marginCalcMode === 'from_margin' ? 'btn-primary' : 'btn-secondary'}
                  style={{ padding: '0.6rem', fontSize: '0.8rem' }}
                  onClick={() => setMarginCalcMode('from_margin')}
                >
                  From Target Margin
                </button>
              </div>
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Cost of Goods / Unit Cost (₹)</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                value={costPrice}
                onChange={e => setCostPrice(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>

            {marginCalcMode === 'from_sp' ? (
              <label className="bv-field">
                <span className="bv-field-label">Selling Price (₹)</span>
                <input
                  type="number"
                  className="bv-input"
                  min={0}
                  value={sellingPrice}
                  onChange={e => setSellingPrice(Math.max(0, Number(e.target.value) || 0))}
                />
              </label>
            ) : (
              <label className="bv-field">
                <span className="bv-field-label">Target Profit Margin (%)</span>
                <input
                  type="number"
                  className="bv-input"
                  min={1}
                  max={99}
                  value={targetMargin}
                  onChange={e => setTargetMargin(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                />
              </label>
            )}

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  setCostPrice(750);
                  setSellingPrice(1500);
                  setMarginCalcMode('from_sp');
                }}
              >
                Try 50% Markup Example
              </button>
            </div>
          </div>
        </div>

        {/* MARGIN OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>PROFITABILITY</span>
            <h2 className="bv-panel-title">Margin & Markup</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Profit Margin</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#059669', marginTop: '0.25rem' }}>{marginCalc.margin.toFixed(2)}%</div>
              <small style={{ color: '#64748B', fontSize: '0.75rem' }}>Profit / Selling Price</small>
            </div>
            <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Markup Percentage</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#2563EB', marginTop: '0.25rem' }}>{marginCalc.markup.toFixed(2)}%</div>
              <small style={{ color: '#64748B', fontSize: '0.75rem' }}>Profit / Cost Price</small>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>Cost Price (CP)</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(marginCalc.cost)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '0.75rem 1rem', color: '#64748B' }}>Selling Price (SP)</td>
                  <td style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 700 }}>{formatINR(marginCalc.sp)}</td>
                </tr>
                <tr style={{ backgroundColor: '#FFF1EE' }}>
                  <td style={{ padding: '0.85rem 1rem', fontWeight: 800, color: '#0B132A' }}>Gross Profit per Unit</td>
                  <td style={{ padding: '0.85rem 1rem', textAlign: 'right', fontWeight: 900, color: '#FF4E27', fontSize: '1.1rem' }}>
                    {formatINR(marginCalc.profit)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            onClick={() => handleCopy(`Cost: ${formatINR(marginCalc.cost)} | SP: ${formatINR(marginCalc.sp)} | Profit: ${formatINR(marginCalc.profit)} | Margin: ${marginCalc.margin.toFixed(2)}% | Markup: ${marginCalc.markup.toFixed(2)}%`)}
          >
            {copied ? '✓ Copied!' : 'Copy Summary'}
          </button>
        </div>
      </div>
    );
  }

  // 6: BREAK-EVEN CALCULATOR
  if (tool.id === 'break-even-calculator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">COST STRUCTURE</span>
            <h2 className="bv-panel-title">Break-Even Analysis</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <label className="bv-field">
              <span className="bv-field-label">Total Fixed Overhead Costs (₹/Month)</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                value={fixedCosts}
                onChange={e => setFixedCosts(Math.max(0, Number(e.target.value) || 0))}
              />
              <small className="bv-field-hint">Rent, executive salaries, software subscriptions, insurance</small>
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Variable Cost per Unit (₹)</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                value={variableCostUnit}
                onChange={e => setVariableCostUnit(Math.max(0, Number(e.target.value) || 0))}
              />
              <small className="bv-field-hint">Raw materials, direct labor, packaging, per-unit delivery</small>
            </label>

            <label className="bv-field">
              <span className="bv-field-label">Selling Price per Unit (₹)</span>
              <input
                type="number"
                className="bv-input"
                min={0}
                value={unitSellingPrice}
                onChange={e => setUnitSellingPrice(Math.max(0, Number(e.target.value) || 0))}
              />
            </label>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                onClick={() => {
                  setFixedCosts(120000);
                  setVariableCostUnit(450);
                  setUnitSellingPrice(1100);
                }}
              >
                Try D2C Apparel Example
              </button>
            </div>
          </div>
        </div>

        {/* BREAK EVEN OUTPUT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>BREAK-EVEN TARGET</span>
            <h2 className="bv-panel-title">Volume & Revenue Required</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1.25rem', background: '#FFF1EE', borderRadius: '14px', border: '1.5px solid #FF4E27', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#FF4E27', textTransform: 'uppercase' }}>Break-Even Units</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#0B132A', marginTop: '0.25rem' }}>
                {breakEvenCalc.bepUnits.toLocaleString('en-IN')} Units
              </div>
              <small style={{ color: '#64748B', fontSize: '0.75rem' }}>Units to sell to cover all costs</small>
            </div>
            <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '14px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>Break-Even Revenue</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#059669', marginTop: '0.25rem' }}>
                {formatINR(breakEvenCalc.bepRevenue)}
              </div>
              <small style={{ color: '#64748B', fontSize: '0.75rem' }}>Contribution Margin: {formatINR(breakEvenCalc.contributionMargin)}/unit</small>
            </div>
          </div>

          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0B132A', marginBottom: '0.75rem' }}>Sales Volume & Profit Projections</h4>
          <div style={{ border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', marginBottom: '1.25rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead style={{ background: '#F8FAFC', borderBottom: '1.5px solid #E2E8F0' }}>
                <tr>
                  <th style={{ padding: '0.5rem', textAlign: 'left' }}>Volume</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Units</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Revenue</th>
                  <th style={{ padding: '0.5rem', textAlign: 'right' }}>Net Profit/Loss</th>
                </tr>
              </thead>
              <tbody>
                {breakEvenCalc.projections.map((p, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #F1F5F9', background: p.multiplier === '100%' ? '#FFFBEB' : '#FFFFFF' }}>
                    <td style={{ padding: '0.5rem', fontWeight: p.multiplier === '100%' ? 800 : 500 }}>
                      {p.multiplier} {p.multiplier === '100%' ? '(BEP)' : ''}
                    </td>
                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>{p.units.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right' }}>{formatINR(p.rev)}</td>
                    <td style={{ padding: '0.5rem', textAlign: 'right', fontWeight: 800, color: p.netProfit < 0 ? '#DC2626' : p.netProfit === 0 ? '#D97706' : '#16A34A' }}>
                      {formatINR(p.netProfit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            onClick={() => handleCopy(`Break-Even: ${breakEvenCalc.bepUnits} units | Revenue: ${formatINR(breakEvenCalc.bepRevenue)} | Contribution Margin: ${formatINR(breakEvenCalc.contributionMargin)}`)}
          >
            {copied ? '✓ Copied!' : 'Copy Summary'}
          </button>
        </div>
      </div>
    );
  }

  // 7: INVOICE & QUOTATION GENERATOR
  if (tool.id === 'invoice-and-quotation-generator') {
    return (
      <div className="bv-tool-layout">
        <div className="bv-tool-panel bv-inputs-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge">DOCUMENT SETUP</span>
            <h2 className="bv-panel-title">Invoice & Quotation Maker</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Document Type</span>
                <select
                  className="bv-input bv-select"
                  value={invoiceType}
                  onChange={e => setInvoiceType(e.target.value as any)}
                >
                  <option value="Tax Invoice">Tax Invoice</option>
                  <option value="Quotation">Quotation / Proforma</option>
                </select>
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Invoice Number</span>
                <input
                  type="text"
                  className="bv-input"
                  value={invNumber}
                  onChange={e => setInvNumber(e.target.value)}
                />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Invoice Date</span>
                <input
                  type="date"
                  className="bv-input"
                  value={invDate}
                  onChange={e => setInvDate(e.target.value)}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Seller Business Name</span>
                <input
                  type="text"
                  className="bv-input"
                  value={sellerName}
                  onChange={e => setSellerName(e.target.value)}
                />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Seller GSTIN</span>
                <input
                  type="text"
                  className="bv-input"
                  value={sellerGst}
                  onChange={e => setSellerGst(e.target.value)}
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <label className="bv-field">
                <span className="bv-field-label">Buyer Client Name</span>
                <input
                  type="text"
                  className="bv-input"
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                />
              </label>
              <label className="bv-field">
                <span className="bv-field-label">Buyer GSTIN (Optional)</span>
                <input
                  type="text"
                  className="bv-input"
                  value={buyerGst}
                  onChange={e => setBuyerGst(e.target.value)}
                />
              </label>
            </div>

            {/* Line items manager */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="bv-field-label">Line Items</span>
                <button
                  type="button"
                  style={{ background: 'transparent', border: 'none', color: '#FF4E27', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                  onClick={() => setInvItems([...invItems, { desc: 'Consulting / Product Line Item', hsn: '9983', qty: 1, rate: 1000, taxRate: 18 }])}
                >
                  + Add Line Item
                </button>
              </div>

              {invItems.map((item, idx) => (
                <div key={idx} style={{ padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <input
                      type="text"
                      className="bv-input"
                      style={{ flex: 2 }}
                      placeholder="Item Description"
                      value={item.desc}
                      onChange={e => {
                        const copy = [...invItems];
                        copy[idx].desc = e.target.value;
                        setInvItems(copy);
                      }}
                    />
                    <input
                      type="text"
                      className="bv-input"
                      style={{ flex: 1 }}
                      placeholder="HSN/SAC"
                      value={item.hsn}
                      onChange={e => {
                        const copy = [...invItems];
                        copy[idx].hsn = e.target.value;
                        setInvItems(copy);
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="number"
                      className="bv-input"
                      style={{ width: '70px' }}
                      placeholder="Qty"
                      min={1}
                      value={item.qty}
                      onChange={e => {
                        const copy = [...invItems];
                        copy[idx].qty = Math.max(1, Number(e.target.value) || 1);
                        setInvItems(copy);
                      }}
                    />
                    <input
                      type="number"
                      className="bv-input"
                      style={{ flex: 1 }}
                      placeholder="Rate (₹)"
                      min={0}
                      value={item.rate}
                      onChange={e => {
                        const copy = [...invItems];
                        copy[idx].rate = Math.max(0, Number(e.target.value) || 0);
                        setInvItems(copy);
                      }}
                    />
                    <select
                      className="bv-input bv-select"
                      style={{ width: '85px' }}
                      value={item.taxRate}
                      onChange={e => {
                        const copy = [...invItems];
                        copy[idx].taxRate = Number(e.target.value) || 0;
                        setInvItems(copy);
                      }}
                    >
                      <option value={0}>0%</option>
                      <option value={5}>5%</option>
                      <option value={12}>12%</option>
                      <option value={18}>18%</option>
                      <option value={28}>28%</option>
                    </select>
                    {invItems.length > 1 && (
                      <button
                        type="button"
                        style={{ background: 'transparent', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '0.25rem' }}
                        onClick={() => setInvItems(invItems.filter((_, i) => i !== idx))}
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* INVOICE PREVIEW & PRINT */}
        <div className="bv-tool-panel bv-results-panel">
          <div className="bv-panel-header">
            <span className="bv-panel-badge" style={{ backgroundColor: '#ECFDF5', color: '#059669' }}>PRINT-READY PREVIEW</span>
            <h2 className="bv-panel-title">Document Summary</h2>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #FF4E27', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0B132A' }}>{invoiceType}</h3>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>#{invNumber}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ fontSize: '0.9rem' }}>{sellerName}</strong>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>GSTIN: {sellerGst}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
              <span style={{ color: '#64748B' }}>Billed to: </span>
              <strong>{buyerName}</strong> {buyerGst ? `(GSTIN: ${buyerGst})` : ''}
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '0.4rem', textAlign: 'left' }}>Item</th>
                  <th style={{ padding: '0.4rem', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '0.4rem', textAlign: 'right' }}>Rate</th>
                  <th style={{ padding: '0.4rem', textAlign: 'right' }}>Tax</th>
                  <th style={{ padding: '0.4rem', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {invItems.map((item, i) => {
                  const b = item.qty * item.rate;
                  const t = b * (item.taxRate / 100);
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '0.4rem' }}>{item.desc}</td>
                      <td style={{ padding: '0.4rem', textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ padding: '0.4rem', textAlign: 'right' }}>₹{item.rate.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '0.4rem', textAlign: 'right' }}>{item.taxRate}%</td>
                      <td style={{ padding: '0.4rem', textAlign: 'right', fontWeight: 700 }}>₹{(b + t).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{ borderTop: '1.5px solid #E2E8F0', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Taxable Base:</span>
                <span>{formatINR(invoiceTotals.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Total GST:</span>
                <span>{formatINR(invoiceTotals.taxTotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: '1.1rem', color: '#FF4E27', borderTop: '1px solid #E2E8F0', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                <span>Grand Total:</span>
                <span>{formatINR(invoiceTotals.grandTotal)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="button"
              className="btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={printInvoice}
            >
              <span>🖨️</span> Print / Save PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
