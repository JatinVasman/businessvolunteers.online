import React from 'react';
import type { PageView } from '../types';
import { TOP_FOOTER_DOMESTIC_LOCATIONS, TOP_FOOTER_INTERNATIONAL_LOCATIONS } from '../data/locationsData';

export const domesticLocations = TOP_FOOTER_DOMESTIC_LOCATIONS;
export const internationalLocations = TOP_FOOTER_INTERNATIONAL_LOCATIONS;

interface FooterProps {
  onNavigate: (page: PageView, slug?: string) => void;
  onSelectLocation?: (locationName: string) => void;
  onOpenLocationsModal?: () => void;
  onOpenContactModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectLocation, onOpenLocationsModal: _onOpenLocationsModal, onOpenContactModal }) => {
  const handleLocationClick = (loc: string) => {
    if (onSelectLocation) {
      onSelectLocation(loc);
    } else {
      onNavigate('location');
    }
  };

  return (
    <footer style={{ background: '#110D0C', color: '#F1F5F9', paddingTop: '5rem', paddingBottom: '3rem', borderTop: '1px solid #261F1C' }}>
      <div className="container">
        
        {/* MAIN FOOTER GRID */}
        <div className="footer-main-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr 1.5fr', gap: '3rem', marginBottom: '4rem' }}>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img
                src="/businessvolunteers/logo.png"
                alt="Business Volunteers Logo"
                width="42"
                height="42"
                loading="lazy"
                decoding="async"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#FFFFFF' }}>
                Business Volunteers
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google & Meta ads, social media, web design, and graphic design.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '1.25rem' }}>Navigation</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#94A3B8', listStyle: 'none', padding: 0 }}>
              <li><a href="/" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a></li>
              <li><a href="/about" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('about'); }}>About Us</a></li>
              <li><a href="/portfolio" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }}>Our Work</a></li>
              <li><a href="/blogs" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>Blog Articles</a></li>
              <li><a href="/smm" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('smm'); }}>Social Growth (SMM)</a></li>
              <li><a href="/contact" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>Contact Us</a></li>
              <li><a href="/payment" style={{ color: '#FF4E27', textDecoration: 'none', fontWeight: 700 }} onClick={(e) => { e.preventDefault(); onNavigate('payment'); }}>💳 Pay Online (UPI / Bank)</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '1.25rem' }}>Services</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.875rem', color: '#94A3B8', listStyle: 'none', padding: 0 }}>
              <li><a href="/services/seo" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('service-details', 'seo'); }}>SEO Services</a></li>
              <li><a href="/services/google-ads" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('service-details', 'google-ads'); }}>Google Ads (PPC)</a></li>
              <li><a href="/services/meta-ads" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('service-details', 'meta-ads'); }}>Meta Ads</a></li>
              <li><a href="/smm" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('smm'); }}>SMM Growth</a></li>
              <li><a href="/services/web-development" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('service-details', 'web-development'); }}>Custom Web App</a></li>
              <li><a href="/graphic-design" style={{ color: 'inherit', textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); onNavigate('graphic-details'); }}>Graphic Design</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#FFF', marginBottom: '1.25rem' }}>Direct Contact</h4>
            <div style={{ fontSize: '0.875rem', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>📍 <strong>Primary Office:</strong> Sector 62, Noida, UP, 201309, India</div>
              <div>📍 <strong>Delhi NCR:</strong> New Ashok Nagar, Delhi, 110096, India</div>
              <div>📞 +91 85869 89832</div>
              <div>✉️ <a href="#contact" onClick={(e) => { e.preventDefault(); if (onOpenContactModal) onOpenContactModal(); }} style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s ease', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.color = '#3B82F6'} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>contact.businessvolunteers@gmail.com</a></div>
              <div>💳 <a href="/payment" onClick={(e) => { e.preventDefault(); onNavigate('payment'); }} style={{ color: '#FF4E27', textDecoration: 'none', fontWeight: 700, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>Pay Online / Invoicing Details →</a></div>
              <a
                href="https://wa.me/918586989832?text=Hi%2C%20I%20am%20interested%20in%20your%20services"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#D97706', fontWeight: 700, textDecoration: 'none', marginTop: '0.5rem' }}
              >
                Chat on WhatsApp 💬 →
              </a>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: '#261F1C', margin: '3rem 0' }}></div>

        {/* DOMESTIC & INTERNATIONAL LOCATIONS SECTION (EXACT 2 SECTIONS MATCHING SCREENSHOT) */}
        <div>
          {/* SECTION 1: DOMESTIC LOCATIONS */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ fontFamily: 'Outfit, serif', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Our Services Are Available In Domestic Locations
            </h4>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {TOP_FOOTER_DOMESTIC_LOCATIONS.map((loc) => {
                const slug = loc.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                return (
                  <a
                    key={loc}
                    href={`/digital-marketing/${slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLocationClick(loc);
                    }}
                    style={{
                      textDecoration: 'none',
                      backgroundColor: '#1E1815',
                      color: '#E2E8F0',
                      border: '1px solid #382E2A',
                      borderRadius: '999px',
                      padding: '0.45rem 1.15rem',
                      fontSize: '0.825rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#D97706';
                      e.currentTarget.style.color = '#0F172A';
                      e.currentTarget.style.borderColor = '#D97706';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1E1815';
                      e.currentTarget.style.color = '#E2E8F0';
                      e.currentTarget.style.borderColor = '#382E2A';
                    }}
                  >
                    {loc}
                  </a>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: INTERNATIONAL LOCATIONS */}
          <div style={{ marginBottom: '2.5rem' }}>
            <h4 style={{ fontFamily: 'Outfit, serif', fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.25rem' }}>
              Our Services Are Available In International Locations
            </h4>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {TOP_FOOTER_INTERNATIONAL_LOCATIONS.map((loc) => {
                const slug = loc.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                return (
                  <a
                    key={loc}
                    href={`/digital-marketing/${slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLocationClick(loc);
                    }}
                    style={{
                      textDecoration: 'none',
                      backgroundColor: '#1E1815',
                      color: '#E2E8F0',
                      border: '1px solid #382E2A',
                      borderRadius: '999px',
                      padding: '0.45rem 1.15rem',
                      fontSize: '0.825rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'inline-block'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#D97706';
                      e.currentTarget.style.color = '#0F172A';
                      e.currentTarget.style.borderColor = '#D97706';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1E1815';
                      e.currentTarget.style.color = '#E2E8F0';
                      e.currentTarget.style.borderColor = '#382E2A';
                    }}
                  >
                    🌐 {loc}
                  </a>
                );
              })}
            </div>
          </div>

          {/* VIEW ALL 500+ LOCATIONS CTA BANNER */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <button
              onClick={() => onNavigate('all-locations')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: 'rgba(255, 78, 39, 0.1)',
                color: '#FF4E27',
                border: '1.5px solid rgba(255, 78, 39, 0.4)',
                padding: '0.95rem 2.25rem',
                borderRadius: '999px',
                fontSize: '0.95rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 25px rgba(255, 78, 39, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FF4E27';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 78, 39, 0.1)';
                e.currentTarget.style.color = '#FF4E27';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>📍 View Complete 500+ Domestic & International Locations Directory (Tier 2, Tier 3 & Tier 4 Coverage)</span>
              <span>➔</span>
            </button>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR: ALL RIGHTS TO BUSINESS VOLUNTEERS */}
        <div style={{ height: '1px', background: '#261F1C', margin: '3rem 0 1.5rem 0' }}></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: '#94A3B8' }}>
          <div>
            © 2025 <a href="https://businessvolunteers.online" target="_blank" rel="noopener noreferrer" style={{ color: '#D97706', fontWeight: 800, textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.85'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>Business Volunteers</a>. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
            <a
              href="/html-sitemap"
              onClick={(e) => { e.preventDefault(); onNavigate('html-sitemap'); }}
              style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF4E27'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}
            >
              📄 HTML Sitemap
            </a>
            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); onNavigate('services'); }}
              style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF4E27'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}
            >
              Services
            </a>
            <a
              href="/industries"
              onClick={(e) => { e.preventDefault(); onNavigate('industries'); }}
              style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF4E27'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}
            >
              89 Industries
            </a>
            <a
              href="/portfolio"
              onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }}
              style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF4E27'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}
            >
              Case Studies
            </a>
            <a
              href="/blogs"
              onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
              style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF4E27'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}
            >
              Blog
            </a>
            <a
              href="/legal"
              onClick={(e) => { e.preventDefault(); onNavigate('legal'); }}
              style={{ color: '#E2E8F0', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FF4E27'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#E2E8F0'}
            >
              Legal & Compliance
            </a>
            <a
              href="/payment"
              onClick={(e) => { e.preventDefault(); onNavigate('payment'); }}
              style={{ color: '#FF4E27', textDecoration: 'none', fontWeight: 700, transition: 'color 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#FF4E27'}
            >
              💳 Pay Online
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
