import React, { useState } from 'react';
import { sendEmail } from '../utils/emailService';

interface ContactSectionProps {
  backgroundColor?: string;
  isStandalone?: boolean;
  onOpenContactModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ backgroundColor, isStandalone = false, onOpenContactModal }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await sendEmail({
      formType: 'contact',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
    });

    setLoading(false);

    if (res.success) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 6000);
    } else {
      setErrorMsg(res.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <section id="contact" style={{ padding: '5rem 0', backgroundColor: backgroundColor || 'transparent' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">CONTACT US</div>
          {isStandalone ? (
            <h1 className="section-title">Let's Build Something Amazing Together</h1>
          ) : (
            <h2 className="section-title">Let's Build Something Amazing Together</h2>
          )}
          <p className="section-subtitle">Tell us about your project and our experts will get in touch with you within 24 hours.</p>
        </div>

        <div className="contact-grid">
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '24px', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
            {submitted ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--green-accent)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎉 Message Sent Successfully!</h3>
                <p style={{ color: 'var(--text-muted)' }}>Thank you. Our team will contact you at {formData.email || 'your email'} shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMsg && (
                  <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', fontSize: '0.85rem' }}>
                    {errorMsg}
                  </div>
                )}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--secondary)' }}>Full Name</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="Enter your name" style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-subtle)', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--secondary)' }}>Email Address</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="Enter your email" style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-subtle)', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--secondary)' }}>Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required placeholder="Enter your phone number" style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-subtle)', outline: 'none' }} />
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--secondary)' }}>Your Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required placeholder="Tell us about your project..." style={{ width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--bg-subtle)', outline: 'none', minHeight: '120px' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      backgroundColor: '#111111',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '0.9rem 1.5rem',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: loading ? 0.7 : 1,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.15)'
                    }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#222222'; }}
                    onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = '#111111'; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  </button>

                  <a
                    href="https://wa.me/918586989832?text=Hi%2C%20I%20am%20interested%20in%20your%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.6rem',
                      backgroundColor: '#25D366',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '0.9rem 1.5rem',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.25)'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#20bd5a'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#25D366'; }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.146.568 4.157 1.559 5.897l-1.567 5.727 5.877-1.542c1.678.916 3.6 1.436 5.642 1.436 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" /></svg>
                    <span>Send via WhatsApp</span>
                  </a>
                </div>


              </form>
            )}

            {/* Social Icons Row */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.85rem', marginTop: '2rem' }}>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/people/BusinessVolunteers/61579138254807/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Business Volunteers on Facebook"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(24, 119, 242, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/thebusinessvolunteers/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Business Volunteers on Instagram"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(228, 64, 95, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke="#E4405F" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="#E4405F" strokeWidth="2" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke="#E4405F" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/business-volunteers1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with Business Volunteers on LinkedIn"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(10, 102, 194, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/@TheBusinessVolunteers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Business Volunteers on YouTube"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 0, 0, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-badge)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✉️</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Us</div>
                <a href="#contact" onClick={(e) => { e.preventDefault(); if (onOpenContactModal) onOpenContactModal(); }} style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                  contact.businessvolunteers@gmail.com
                </a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-badge)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📞</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Call Us</div>
                <a href="tel:+918586989832" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>+91 85869 89832</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-badge)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>💬</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>WhatsApp</div>
                <a href="https://wa.me/918586989832?text=Hi%2C%20I%20am%20interested%20in%20your%20services" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}>+91 85869 89832</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '1.25rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--bg-badge)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📍</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Office Locations</div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Primary: Sector 62, Noida, UP, 201309, India</div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Delhi NCR: New Ashok Nagar, Delhi, 110096, India</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Mon – Sat: 09:00 AM – 06:00 PM IST • Guaranteed response within 2 hours</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-card)', border: '1.5px solid rgba(255, 78, 39, 0.35)', borderRadius: '14px', padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255, 78, 39, 0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>💳</div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Online Payment & Invoicing</div>
                <a href="/payment" style={{ fontWeight: 800, color: 'var(--primary)', textDecoration: 'none', fontSize: '0.92rem' }}>
                  Pay via UPI QR & Bank Transfer ➔
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
