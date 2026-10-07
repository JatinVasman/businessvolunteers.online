import React, { useState } from 'react';
import type { PageView } from '../types';
import { sendEmail } from '../utils/emailService';

interface PaymentPageProps {
  onNavigate: (page: PageView, slug?: string) => void;
  onOpenContactModal?: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ onNavigate }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'upi' | 'bank'>('all');
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [showFullPosterInModal, setShowFullPosterInModal] = useState(false);

  // Form State for Payment Confirmation & UTR Submission
  const [utrForm, setUtrForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    utrNumber: '',
    serviceName: '',
    paymentMethod: 'UPI / QR Code',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Payment Details constant
  const paymentDetails = {
    beneficiaryName: 'Business Volunteers',
    bankName: 'Union Bank of India',
    accountNumber: '556601010050767',
    ifscCode: 'UBIN0555665',
    upiId: '8586989832@ybl',
    qrPath: '/businessvolunteers/QR-scannable.jpg',
    qrOriginalPosterPath: '/businessvolunteers/QR.jpg',
    accountType: 'Current Account',
    phone: '+91 85869 89832',
    email: 'contact.businessvolunteers@gmail.com',
  };

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2200);
  };

  const handleUtrSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const formattedMessage = `
PAYMENT VERIFICATION SUBMISSION:
----------------------------------------
Client / Business: ${utrForm.name}
Email: ${utrForm.email}
Phone: ${utrForm.phone}
Amount Paid: ₹${utrForm.amount}
Payment Mode: ${utrForm.paymentMethod}
UTR / Transaction ID: ${utrForm.utrNumber}
Service / Invoice Ref: ${utrForm.serviceName}
Notes: ${utrForm.notes || 'None'}
Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
----------------------------------------
    `.trim();

    try {
      const res = await sendEmail({
        formType: 'contact',
        name: utrForm.name,
        email: utrForm.email,
        phone: utrForm.phone,
        message: formattedMessage,
        service: `Payment UTR: ${utrForm.utrNumber}`,
      });

      if (res.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(res.message || 'Failed to submit payment details. Please message us on WhatsApp.');
      }
    } catch (err: any) {
      setSubmitError('Unable to send confirmation right now. Please confirm directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Business Volunteers team,\n\nI have completed a payment for agency services.\n\n` +
      `• Client Name: ${utrForm.name || '[Your Name / Business]'}\n` +
      `• Amount Paid: ₹${utrForm.amount || '[Amount]'}\n` +
      `• UTR / Reference ID: ${utrForm.utrNumber || '[12-Digit Transaction ID]'}\n` +
      `• Method: ${utrForm.paymentMethod}\n` +
      `• Service: ${utrForm.serviceName || '[SEO / Web / Retainer]'}\n\n` +
      `Kindly share the GST invoice & payment receipt. Thank you!`
    );
    return `https://wa.me/918586989832?text=${text}`;
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* MOBILE-RESPONSIVE TOAST NOTIFICATION FOR COPIED DATA */}
      {copiedKey && (
        <div className="payment-copied-toast">
          <span>✓</span>
          <span>{copiedKey} copied to clipboard!</span>
        </div>
      )}

      {/* QR ZOOM MODAL (RESPONSIVE FOR ALL VIEWPORTS) */}
      {isQrModalOpen && (
        <div
          onClick={() => setIsQrModalOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 19, 42, 0.88)',
            backdropFilter: 'blur(8px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#0B0F19',
              borderRadius: '20px',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              maxWidth: '460px',
              width: '100%',
              maxHeight: '92vh',
              overflowY: 'auto',
              textAlign: 'center',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              border: '1px solid #334155',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ color: '#FFFFFF', fontSize: '1.15rem', fontWeight: 800 }}>PhonePe & UPI QR Code</h3>
                <p style={{ color: '#94A3B8', fontSize: '0.8rem' }}>Scan with PhonePe, GPay, Paytm or BHIM</p>
              </div>
              <button
                onClick={() => setIsQrModalOpen(false)}
                style={{
                  background: '#1E293B',
                  color: '#FFFFFF',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  border: 'none',
                }}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid rgba(255, 78, 39, 0.3)',
                marginBottom: '1.25rem',
                backgroundColor: '#000',
              }}
            >
              <img
                src={showFullPosterInModal ? paymentDetails.qrOriginalPosterPath : paymentDetails.qrPath}
                alt="Business Volunteers Official UPI Payment QR Code"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '52vh',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowFullPosterInModal(!showFullPosterInModal)}
                style={{
                  backgroundColor: '#1E293B',
                  color: '#E2E8F0',
                  border: '1px solid #334155',
                  padding: '0.65rem 1rem',
                  borderRadius: '999px',
                  fontWeight: 600,
                  fontSize: '0.825rem',
                  cursor: 'pointer',
                }}
              >
                {showFullPosterInModal ? '📐 Switch to Scannable Square' : '📜 View Full Poster'}
              </button>

              <a
                href={paymentDetails.qrOriginalPosterPath}
                download="Business-Volunteers-Payment-QR.jpg"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  textDecoration: 'none',
                }}
              >
                📥 Download Full QR
              </a>
            </div>
          </div>
        </div>
      )}

      {/* TOP HERO & HEADER BANNER */}
      <section className="payment-page-container" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              Home
            </a>
            <span>/</span>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Pay Online</span>
          </nav>

          <div style={{ maxWidth: '820px' }}>
            <div className="payment-gateway-badge">
              <span className="payment-gateway-badge__part">
                <span>🛡️</span>
                <span>OFFICIAL PAYMENT GATEWAY</span>
              </span>
              <span className="payment-gateway-badge__dot">•</span>
              <span className="payment-gateway-badge__part">
                <span>100% SECURE & GST COMPLIANT</span>
              </span>
            </div>

            <h1 className="payment-hero-title">
              Make a Payment to <span style={{ color: 'var(--primary)' }}>Business Volunteers</span>
            </h1>

            <p className="payment-hero-subtitle">
              Clear invoices, project retainers, and marketing campaign milestones instantly. Pay securely via all major UPI apps (PhonePe, Google Pay, Paytm, BHIM, Cred) or direct IMPS/NEFT bank transfer.
            </p>
          </div>

          {/* Quick Security Pillars (Responsive 4/2/1 grid) */}
          <div className="payment-pillars-grid">
            <div
              className="payment-pillar-card"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '1.4rem', color: '#10B981', flexShrink: 0 }}>⚡</div>
              <div>
                <div className="payment-pillar-title" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--secondary)' }}>Instant Processing</div>
                <div className="payment-pillar-desc" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>0% convenience or surcharge fees</div>
              </div>
            </div>

            <div
              className="payment-pillar-card"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '1.4rem', color: '#3B82F6', flexShrink: 0 }}>🏛️</div>
              <div>
                <div className="payment-pillar-title" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--secondary)' }}>Union Bank of India</div>
                <div className="payment-pillar-desc" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified corporate bank account</div>
              </div>
            </div>

            <div
              className="payment-pillar-card"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '1.4rem', color: '#F59E0B', flexShrink: 0 }}>🧾</div>
              <div>
                <div className="payment-pillar-title" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--secondary)' }}>GST Tax Invoicing</div>
                <div className="payment-pillar-desc" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Official receipt with GSTIN input</div>
              </div>
            </div>

            <div
              className="payment-pillar-card"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '1rem 1.1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '1.4rem', color: '#EC4899', flexShrink: 0 }}>🔒</div>
              <div>
                <div className="payment-pillar-title" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--secondary)' }}>Bank-Grade Encryption</div>
                <div className="payment-pillar-desc" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Direct beneficiary-to-bank settlement</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER TABS (MOBILE & TABLET TOUCH-OPTIMIZED) */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        <div className="payment-tabs-wrapper">
          <div className="payment-tabs-pill-track">
            <button
              onClick={() => setActiveTab('all')}
              className="payment-tab-btn"
              style={{
                backgroundColor: activeTab === 'all' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'all' ? '#FFFFFF' : 'var(--text-muted)',
              }}
            >
              🌟 All Modes
            </button>
            <button
              onClick={() => setActiveTab('upi')}
              className="payment-tab-btn"
              style={{
                backgroundColor: activeTab === 'upi' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'upi' ? '#FFFFFF' : 'var(--text-muted)',
              }}
            >
              📱 UPI QR Code
            </button>
            <button
              onClick={() => setActiveTab('bank')}
              className="payment-tab-btn"
              style={{
                backgroundColor: activeTab === 'bank' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'bank' ? '#FFFFFF' : 'var(--text-muted)',
              }}
            >
              🏛️ Bank Transfer
            </button>
          </div>
        </div>

        {/* MAIN PAYMENT METHODS GRID */}
        <div className={`payment-methods-grid ${activeTab === 'all' ? 'methods-all' : ''}`}>
          
          {/* ================= METHOD 1: UPI & PHONEPE QR CODE ================= */}
          {(activeTab === 'all' || activeTab === 'upi') && (
            <div className="payment-method-card">
              <div className="payment-card-header">
                <div className="payment-card-title-group">
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #5f259f 0%, #3f156f 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      boxShadow: '0 6px 16px rgba(95, 37, 159, 0.3)',
                      flexShrink: 0,
                    }}
                  >
                    पे
                  </div>
                  <div>
                    <h2 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', fontWeight: 800, color: 'var(--secondary)' }}>
                      Scan & Pay via UPI QR
                    </h2>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      PhonePe, Google Pay, Paytm, BHIM & CRED
                    </p>
                  </div>
                </div>

                {/* 100% Responsive Recommendation Badge */}
                <div className="payment-badge-recommended">
                  <span style={{ fontSize: '0.85rem' }}>✓</span>
                  <span>Recommended</span>
                  <span style={{ opacity: 0.5 }}>•</span>
                  <span>0% Fee</span>
                </div>
              </div>

              {/* Scannable High-Clarity QR Frame (Aspect ratio 1:1 mobile optimized) */}
              <div className="payment-qr-frame">
                <div
                  className="payment-qr-img-wrapper"
                  onClick={() => setIsQrModalOpen(true)}
                  title="Click to view full-screen QR"
                >
                  <img
                    src={paymentDetails.qrPath}
                    alt="Official PhonePe / UPI QR Code for Business Volunteers"
                    className="payment-qr-img"
                    loading="eager"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0.65rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      backdropFilter: 'blur(4px)',
                      color: '#FFFFFF',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.7rem',
                      borderRadius: '999px',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    🔍 Click to Enlarge
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '0.55rem',
                    marginTop: '0.85rem',
                    width: '100%',
                  }}
                >
                  <a
                    href={paymentDetails.qrOriginalPosterPath}
                    download="Business-Volunteers-Payment-QR.jpg"
                    style={{
                      backgroundColor: '#1E293B',
                      color: '#F8FAFC',
                      padding: '0.55rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      border: '1px solid #334155',
                      textDecoration: 'none',
                      minHeight: '40px',
                    }}
                  >
                    <span>📥</span>
                    <span>Download QR</span>
                  </a>

                  {/* Direct Mobile UPI Deep Link */}
                  <a
                    href={`upi://pay?pa=${paymentDetails.upiId}&pn=Business%20Volunteers&cu=INR`}
                    style={{
                      backgroundColor: 'rgba(255, 78, 39, 0.12)',
                      color: 'var(--primary)',
                      padding: '0.55rem 1rem',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      border: '1px solid rgba(255, 78, 39, 0.3)',
                      textDecoration: 'none',
                      minHeight: '40px',
                    }}
                  >
                    <span>📱</span>
                    <span>Pay in UPI App</span>
                  </a>
                </div>
              </div>

              {/* UPI ID Card with One-Click Copy */}
              <div
                style={{
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  padding: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Official UPI ID / VPA
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>● Active & Verified</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '0.65rem 0.85rem',
                    gap: '0.5rem',
                  }}
                >
                  <code
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 'clamp(0.9rem, 3.5vw, 1.05rem)',
                      fontWeight: 800,
                      color: 'var(--secondary)',
                      letterSpacing: '0.02em',
                      wordBreak: 'break-all',
                    }}
                  >
                    {paymentDetails.upiId}
                  </code>

                  <button
                    onClick={() => copyToClipboard(paymentDetails.upiId, 'UPI ID')}
                    className="payment-copy-btn"
                    style={{
                      backgroundColor: copiedKey === 'UPI ID' ? '#10B981' : 'var(--primary)',
                      color: '#FFFFFF',
                      border: 'none',
                    }}
                  >
                    {copiedKey === 'UPI ID' ? '✓ Copied' : '📋 Copy UPI'}
                  </button>
                </div>

                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.4rem' }}>
                  <span>Verified Name: <strong>{paymentDetails.beneficiaryName}</strong></span>
                  <span>Handling Bank: <strong>YES Bank / PhonePe</strong></span>
                </div>
              </div>

              {/* Supported UPI Apps Pills */}
              <div style={{ marginTop: 'auto' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Supported Apps (100+ Banks & Wallets):
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {['PhonePe', 'Google Pay', 'Paytm', 'BHIM UPI', 'CRED', 'Amazon Pay'].map((app) => (
                    <span
                      key={app}
                      style={{
                        backgroundColor: 'var(--bg-main)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '999px',
                        padding: '0.2rem 0.65rem',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                      }}
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= METHOD 2: DIRECT BANK TRANSFER (IMPS / NEFT / RTGS) ================= */}
          {(activeTab === 'all' || activeTab === 'bank') && (
            <div className="payment-method-card">
              <div className="payment-card-header">
                <div className="payment-card-title-group">
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      backgroundColor: '#1E3A8A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      fontSize: '1.3rem',
                      boxShadow: '0 6px 16px rgba(30, 58, 138, 0.3)',
                      flexShrink: 0,
                    }}
                  >
                    🏛️
                  </div>
                  <div>
                    <h2 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.4rem)', fontWeight: 800, color: 'var(--secondary)' }}>
                      Direct Bank Transfer
                    </h2>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      IMPS (Instant 24x7) • NEFT • RTGS
                    </p>
                  </div>
                </div>

                {/* 100% Responsive Corporate Badge */}
                <div className="payment-badge-corporate">
                  <span>🏛️</span>
                  <span>Corporate Account</span>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Transfer directly from your net banking portal or mobile banking app. Ideal for retainers, milestone settlements, and GST expense claims.
              </p>

              {/* Bank Data Rows with One-Click Copy */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                
                {/* 1. Beneficiary Name */}
                <div className="payment-data-row">
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Beneficiary / Account Name
                    </div>
                    <div style={{ fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', fontWeight: 800, color: 'var(--secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {paymentDetails.beneficiaryName}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentDetails.beneficiaryName, 'Beneficiary Name')}
                    className="payment-copy-btn"
                    style={{
                      backgroundColor: copiedKey === 'Beneficiary Name' ? '#10B981' : 'transparent',
                      color: copiedKey === 'Beneficiary Name' ? '#FFFFFF' : 'var(--primary)',
                      border: '1px solid var(--primary)',
                    }}
                  >
                    {copiedKey === 'Beneficiary Name' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>

                {/* 2. Bank Name */}
                <div className="payment-data-row">
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Bank Name
                    </div>
                    <div style={{ fontSize: 'clamp(0.95rem, 3vw, 1.05rem)', fontWeight: 800, color: 'var(--secondary)' }}>
                      {paymentDetails.bankName}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentDetails.bankName, 'Bank Name')}
                    className="payment-copy-btn"
                    style={{
                      backgroundColor: copiedKey === 'Bank Name' ? '#10B981' : 'transparent',
                      color: copiedKey === 'Bank Name' ? '#FFFFFF' : 'var(--primary)',
                      border: '1px solid var(--primary)',
                    }}
                  >
                    {copiedKey === 'Bank Name' ? '✓ Copied' : '📋 Copy'}
                  </button>
                </div>

                {/* 3. Account Number */}
                <div
                  className="payment-data-row"
                  style={{
                    border: '1.5px solid rgba(255, 78, 39, 0.35)',
                    background: 'linear-gradient(to right, var(--bg-main), rgba(255, 78, 39, 0.05))',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
                      Account Number (Current A/C)
                    </div>
                    <div
                      className="payment-data-value"
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 'clamp(1.05rem, 3.8vw, 1.25rem)',
                        fontWeight: 900,
                        color: 'var(--secondary)',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {paymentDetails.accountNumber}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentDetails.accountNumber, 'Account Number')}
                    className="payment-copy-btn"
                    style={{
                      backgroundColor: copiedKey === 'Account Number' ? '#10B981' : 'var(--primary)',
                      color: '#FFFFFF',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(255, 78, 39, 0.25)',
                    }}
                  >
                    {copiedKey === 'Account Number' ? '✓ Copied' : '📋 Copy A/C'}
                  </button>
                </div>

                {/* 4. IFSC Code */}
                <div
                  className="payment-data-row"
                  style={{
                    border: '1.5px solid rgba(16, 185, 129, 0.35)',
                    background: 'linear-gradient(to right, var(--bg-main), rgba(16, 185, 129, 0.05))',
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#10B981', textTransform: 'uppercase' }}>
                      IFSC Code (11-Digits)
                    </div>
                    <div
                      className="payment-data-value"
                      style={{
                        fontFamily: 'monospace',
                        fontSize: 'clamp(1rem, 3.5vw, 1.2rem)',
                        fontWeight: 900,
                        color: 'var(--secondary)',
                        letterSpacing: '0.06em',
                      }}
                    >
                      {paymentDetails.ifscCode}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(paymentDetails.ifscCode, 'IFSC Code')}
                    className="payment-copy-btn"
                    style={{
                      backgroundColor: copiedKey === 'IFSC Code' ? '#10B981' : '#10B981',
                      color: '#FFFFFF',
                      border: 'none',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)',
                    }}
                  >
                    {copiedKey === 'IFSC Code' ? '✓ Copied' : '📋 Copy IFSC'}
                  </button>
                </div>

                {/* 5. Account Type & Branch */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                  <div
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '0.65rem 0.85rem',
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>ACCOUNT TYPE</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--secondary)' }}>Current A/C</div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '12px',
                      padding: '0.65rem 0.85rem',
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)' }}>BRANCH LOCATION</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--secondary)' }}>Noida / NCR</div>
                  </div>
                </div>
              </div>

              {/* Quick Transfer Steps Guide */}
              <div
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.05)',
                  border: '1px dashed rgba(59, 130, 246, 0.35)',
                  borderRadius: '14px',
                  padding: '0.85rem 1rem',
                  marginTop: 'auto',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.825rem', color: '#1E40AF', marginBottom: '0.3rem' }}>
                  💡 IMPS / NEFT Transfer Steps:
                </div>
                <ol style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '1.15rem', lineHeight: 1.45 }}>
                  <li>Open your banking app and add <strong>{paymentDetails.beneficiaryName}</strong> as a payee.</li>
                  <li>Use A/C: <strong>{paymentDetails.accountNumber}</strong> & IFSC: <strong>{paymentDetails.ifscCode}</strong>.</li>
                  <li>Select <strong>IMPS</strong> for instant settlement.</li>
                  <li>Copy your <strong>12-digit UTR reference</strong> to confirm below.</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= PAYMENT ACKNOWLEDGEMENT & UTR PROOF SUBMISSION ================= */}
      <section className="container" style={{ paddingTop: '3.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(255, 78, 39, 0.04) 100%)',
            border: '2px solid var(--border-color)',
            borderRadius: '24px',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center', marginBottom: '2rem' }}>
            <div
              style={{
                display: 'inline-block',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                color: '#10B981',
                padding: '0.3rem 0.95rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '0.65rem',
              }}
            >
              STEP 2: NOTIFY OUR FINANCE DESK
            </div>
            <h2
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)',
                fontWeight: 900,
                color: 'var(--secondary)',
                marginBottom: '0.65rem',
              }}
            >
              Confirm Your Payment & Receive GST Invoice
            </h2>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Share your 12-digit UTR or transaction ID so our accounting team can reconcile your transfer within 15–30 minutes and issue your official tax invoice receipt.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '2rem',
              alignItems: 'start',
            }}
          >
            {/* OPTION A: ONE-CLICK WHATSAPP CONFIRMATION */}
            <div
              style={{
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '18px',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.3rem',
                    flexShrink: 0,
                  }}
                >
                  💬
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)' }}>
                    Instant WhatsApp Proof
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 700 }}>
                    ⚡ Recommended (Fastest Turnaround)
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                Send your screenshot, payment receipt PDF, or UTR number directly to our founder & accounts desk on WhatsApp. We verify and reply immediately.
              </p>

              <div
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  border: '1px solid var(--border-color)',
                  marginBottom: '1.25rem',
                  fontSize: '0.825rem',
                  color: 'var(--text-main)',
                }}
              >
                <div>📱 <strong>Accounts Helpline:</strong> +91 85869 89832</div>
                <div style={{ marginTop: '0.25rem' }}>⏱️ <strong>Typical Response:</strong> &lt; 15 Minutes</div>
                <div style={{ marginTop: '0.25rem' }}>📄 <strong>Receipt Format:</strong> Digitally Signed GST PDF</div>
              </div>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '999px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                  marginTop: 'auto',
                  minHeight: '46px',
                }}
              >
                <span>💬 Share Proof on WhatsApp</span>
                <span>➔</span>
              </a>
            </div>

            {/* OPTION B: ON-PAGE UTR SUBMISSION FORM */}
            <div
              style={{
                backgroundColor: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                borderRadius: '18px',
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)', marginBottom: '0.35rem' }}>
                Online UTR Submission Form
              </h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Fill out your transaction reference and we will email your tax receipt.
              </p>

              {submitSuccess ? (
                <div
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    border: '1.5px solid #10B981',
                    borderRadius: '16px',
                    padding: '1.75rem 1.25rem',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '2.2rem', marginBottom: '0.4rem' }}>🎉</div>
                  <h4 style={{ color: '#10B981', fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                    Payment Details Submitted!
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '1rem' }}>
                    Thank you, <strong>{utrForm.name}</strong>. Our accounts team will verify UTR reference <code>{utrForm.utrNumber}</code> and send your invoice to <strong>{utrForm.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setUtrForm({
                        name: '',
                        email: '',
                        phone: '',
                        amount: '',
                        utrNumber: '',
                        serviceName: '',
                        paymentMethod: 'UPI / QR Code',
                        notes: '',
                      });
                    }}
                    style={{
                      backgroundColor: 'var(--primary)',
                      color: '#FFFFFF',
                      padding: '0.65rem 1.3rem',
                      borderRadius: '999px',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                  >
                    Submit Another Transaction
                  </button>
                </div>
              ) : (
                <form onSubmit={handleUtrSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {submitError && (
                    <div
                      style={{
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        fontSize: '0.825rem',
                        fontWeight: 600,
                      }}
                    >
                      ⚠️ {submitError}
                    </div>
                  )}

                  <div className="payment-form-row-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--secondary)' }}>
                        Your / Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Corp / Rahul"
                        className="payment-form-input"
                        value={utrForm.name}
                        onChange={(e) => setUtrForm({ ...utrForm, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--secondary)' }}>
                        Email (For GST Invoice) *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="payment-form-input"
                        value={utrForm.email}
                        onChange={(e) => setUtrForm({ ...utrForm, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="payment-form-row-2">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--secondary)' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        className="payment-form-input"
                        value={utrForm.phone}
                        onChange={(e) => setUtrForm({ ...utrForm, phone: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--secondary)' }}>
                        Amount Paid (INR ₹) *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 25000"
                        className="payment-form-input"
                        value={utrForm.amount}
                        onChange={(e) => setUtrForm({ ...utrForm, amount: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="payment-form-row-utr">
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--primary)' }}>
                        12-Digit UTR / Ref Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 427819028491"
                        className="payment-form-input"
                        style={{
                          border: '1.5px solid var(--primary)',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                        }}
                        value={utrForm.utrNumber}
                        onChange={(e) => setUtrForm({ ...utrForm, utrNumber: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--secondary)' }}>
                        Payment Method
                      </label>
                      <select
                        value={utrForm.paymentMethod}
                        onChange={(e) => setUtrForm({ ...utrForm, paymentMethod: e.target.value })}
                        className="payment-form-input"
                      >
                        <option value="UPI / QR Code">UPI QR (PhonePe/GPay)</option>
                        <option value="IMPS Transfer">Bank Transfer (IMPS)</option>
                        <option value="NEFT / RTGS">Bank Transfer (NEFT/RTGS)</option>
                        <option value="Other">Other Mode</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--secondary)' }}>
                      Service / Project Reference
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SEO Retainer, Meta Ads Campaign, Web App Deposit"
                      className="payment-form-input"
                      value={utrForm.serviceName}
                      onChange={(e) => setUtrForm({ ...utrForm, serviceName: e.target.value })}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      backgroundColor: isSubmitting ? 'var(--text-muted)' : 'var(--primary)',
                      color: '#FFFFFF',
                      padding: '0.85rem 1.5rem',
                      borderRadius: '999px',
                      fontWeight: 800,
                      fontSize: '0.925rem',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      border: 'none',
                      marginTop: '0.4rem',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 6px 18px rgba(255, 78, 39, 0.3)',
                      minHeight: '48px',
                    }}
                  >
                    {isSubmitting ? 'Submitting Reference...' : 'Submit Payment Reference ➔'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FREQUENTLY ASKED QUESTIONS (FAQS) ================= */}
      <section className="container" style={{ paddingTop: '4rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 800, color: 'var(--secondary)' }}>
              Payment & Invoicing FAQ
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Everything you need to know about agency settlements, GST billing, and security.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              {
                q: 'How fast is my payment verified and credited?',
                a: 'UPI payments and IMPS transfers settle instantly. Once you notify us via WhatsApp or submit your 12-digit UTR above, our finance desk acknowledges receipt within 15–30 minutes during business hours (Mon–Sat 09:00 AM – 06:00 PM IST).',
              },
              {
                q: 'Will I receive a GST compliant tax invoice?',
                a: 'Yes, 100%. Business Volunteers issues official tax invoices containing our registered GSTIN and your business GSTIN so you can seamlessly claim full Input Tax Credit (ITC).',
              },
              {
                q: 'Are there any extra transaction convenience fees or hidden charges?',
                a: 'No. There are zero convenience fees, zero gateway surcharges, and zero hidden platform cuts when paying via UPI or direct bank transfer.',
              },
              {
                q: 'Can corporate clients transfer via RTGS or NEFT?',
                a: 'Yes, our Union Bank of India current account readily accepts RTGS and NEFT transactions for retainers and enterprise invoices of any value.',
              },
              {
                q: 'What if I made a payment but forgot to save the UTR reference?',
                a: 'You can check your banking app transaction history or SMS confirmation to locate the 12-digit reference number, or message our accounts desk at +91 85869 89832 with the sender account name.',
              },
              {
                q: 'Do you accept international wire transfers / SWIFT?',
                a: 'Yes, for international clients based in the US, UK, UAE, or Australia, please reach out to contact.businessvolunteers@gmail.com for our SWIFT / BIC code and intermediary banking details.',
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '14px',
                  padding: '1.1rem 1.25rem',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <summary
                  style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--secondary)',
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ color: 'var(--primary)', fontSize: '1.2rem', marginLeft: '0.75rem' }}>+</span>
                </summary>
                <p style={{ marginTop: '0.75rem', color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.55 }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          {/* Need help banner */}
          <div
            style={{
              marginTop: '2.5rem',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '18px',
              padding: '1.5rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.65rem',
            }}
          >
            <div style={{ fontSize: '1.6rem' }}>💬</div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--secondary)' }}>
              Need Help With a Payment or Custom Invoice?
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '520px' }}>
              Speak directly with our billing team. We are available Monday to Saturday to answer any account queries.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center', marginTop: '0.4rem' }}>
              <a
                href="tel:+918586989832"
                style={{
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--secondary)',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  textDecoration: 'none',
                  minHeight: '40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                📞 Call +91 85869 89832
              </a>
              <a
                href="https://wa.me/918586989832?text=Hi%20Business%20Volunteers%2C%20I%20have%20a%20question%20regarding%20payment%20and%20billing"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  textDecoration: 'none',
                  minHeight: '40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                💬 Chat on WhatsApp
              </a>
              <a
                href="mailto:contact.businessvolunteers@gmail.com?subject=Payment%20Query%20-%20Business%20Volunteers"
                style={{
                  backgroundColor: 'var(--bg-main)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--secondary)',
                  padding: '0.6rem 1.15rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '0.825rem',
                  textDecoration: 'none',
                  minHeight: '40px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                ✉️ Email Accounts Desk
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PaymentPage;
