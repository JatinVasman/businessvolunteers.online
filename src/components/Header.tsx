import React, { useState, useEffect } from 'react';
import type { Currency, PageView } from '../types';
import type { LeaderPerson } from './LeadershipModal';

interface HeaderProps {
  activePage: PageView;
  onNavigate: (page: PageView, slug?: string) => void;
  currency?: Currency;
  onCurrencyChange?: (c: Currency) => void;
  theme?: 'light' | 'dark';
  onThemeToggle?: () => void;
  onOpenStrategyModal: () => void;
  onOpenLeaderModal: (person: LeaderPerson) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenStrategyModal,
  onOpenLeaderModal: _onOpenLeaderModal,
}) => {
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobileScreen(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Toggle scrolled background state
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleMobileNav = (page: PageView, slug?: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(page, slug);
  };

  return (
    <div className={`header-wrapper ${isScrolled ? 'header-wrapper--scrolled' : ''} ${isVisible ? 'header-wrapper--visible' : 'header-wrapper--hidden'}`}>
      <header className="header">
        <div className="header-container">
          {/* OFFICIAL BUSINESS VOLUNTEERS LOGO */}
          <div className="logo" onClick={() => onNavigate('home')} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', flexShrink: 0 }}>
            <img
              src="/businessvolunteers/logo.png"
              alt="Business Volunteers Logo"
              width="38"
              height="38"
              decoding="async"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                objectFit: 'cover',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            />
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '1.3rem', letterSpacing: '-0.02em', color: 'var(--secondary)', whiteSpace: 'nowrap' }}>
              Business Volunteers
            </span>
          </div>

          {/* Navigation Track (Desktop Only) */}
          <nav className="nav-menu desktop-nav-only">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className={`nav-link-item ${activePage === 'home' ? 'active' : ''}`}
            >
              Home
            </a>

            {/* ABOUT ▾ DROPDOWN MENU */}
            <div
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setIsAboutDropdownOpen(true)}
              onMouseLeave={() => setIsAboutDropdownOpen(false)}
            >
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  setIsAboutDropdownOpen(false);
                  onNavigate('about');
                }}
                className={`nav-link-item ${activePage === 'about' ? 'active' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', textDecoration: 'none' }}
                title="Click to view About Us Page"
              >
                About ▾
              </a>

              {/* Dropdown Menu Card with seamless top hover bridge */}
              {isAboutDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    paddingTop: '0.45rem',
                    zIndex: 1100
                  }}
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  <div
                    style={{
                      width: '260px',
                      background: '#FFFFFF',
                      borderRadius: '20px',
                      boxShadow: '0 20px 40px rgba(11, 19, 42, 0.15)',
                      border: '1px solid #E2E8F0',
                      padding: '0.75rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.2rem'
                    }}
                  >
                    <a
                      href="/about"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsAboutDropdownOpen(false);
                        onNavigate('about');
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--text-main)',
                        transition: 'var(--transition)',
                        background: 'transparent',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF1EE')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      About Business Volunteers
                    </a>

                    <a
                      href="/about/founder"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsAboutDropdownOpen(false);
                        onNavigate('about', 'founder');
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#475569',
                        transition: 'var(--transition)',
                        background: 'transparent',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF1EE')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      Founder — <strong>Harsh Chaudhary</strong>
                    </a>

                    <a
                      href="/about/co-founder"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsAboutDropdownOpen(false);
                        onNavigate('about', 'co-founder');
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#475569',
                        transition: 'var(--transition)',
                        background: 'transparent',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF1EE')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      Co-Founder — <strong>Khwahish Sahai</strong>
                    </a>

                    <a
                      href="/about/why-us"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsAboutDropdownOpen(false);
                        onNavigate('about', 'why-us');
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#475569',
                        transition: 'var(--transition)',
                        background: 'transparent',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF1EE')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      Why Business Volunteers
                    </a>

                    <a
                      href="/about/team"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsAboutDropdownOpen(false);
                        onNavigate('about', 'team');
                      }}
                      style={{
                        textAlign: 'left',
                        padding: '0.65rem 1rem',
                        borderRadius: '12px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#475569',
                        transition: 'var(--transition)',
                        background: 'transparent',
                        textDecoration: 'none',
                        display: 'block'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF1EE')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      Our Team
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/services"
              onClick={(e) => { e.preventDefault(); onNavigate('services'); }}
              className={`nav-link-item ${activePage === 'services' ? 'active' : ''}`}
            >
              Services
            </a>

            <a
              href="/industries"
              onClick={(e) => { e.preventDefault(); onNavigate('industries'); }}
              className={`nav-link-item ${activePage === 'industries' ? 'active' : ''}`}
            >
              Industries
            </a>

            <a
              href="/legal"
              onClick={(e) => { e.preventDefault(); onNavigate('legal'); }}
              className={`nav-link-item ${activePage === 'legal' ? 'active' : ''}`}
            >
              Legal
            </a>

            <a
              href="/portfolio"
              onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }}
              className={`nav-link-item ${activePage === 'portfolio' ? 'active' : ''}`}
            >
              Our Work
            </a>

            <a
              href="/blogs"
              onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
              className={`nav-link-item ${activePage === 'blog' ? 'active' : ''}`}
            >
              Blog
            </a>

            <a
              href="/smm"
              onClick={(e) => { e.preventDefault(); onNavigate('smm'); }}
              className={`nav-link-item ${activePage === 'smm' ? 'active' : ''}`}
            >
              SMM
            </a>

            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
              className={`nav-link-item ${activePage === 'contact' ? 'active' : ''}`}
            >
              Contact
            </a>
          </nav>

          {/* Right Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
            {/* Direct Pay Online Button (Desktop) */}
            <a
              href="/payment"
              onClick={(e) => { e.preventDefault(); onNavigate('payment'); }}
              className="desktop-nav-only"
              style={{
                display: isMobileScreen ? 'none' : 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                backgroundColor: activePage === 'payment' ? 'var(--primary)' : 'rgba(255, 78, 39, 0.08)',
                color: activePage === 'payment' ? '#FFFFFF' : '#FF4E27',
                border: '1.5px solid rgba(255, 78, 39, 0.4)',
                padding: '0.45rem 1.05rem',
                borderRadius: '999px',
                fontSize: '0.825rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
                boxShadow: activePage === 'payment' ? '0 4px 14px rgba(255, 78, 39, 0.35)' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FF4E27';
                e.currentTarget.style.color = '#FFFFFF';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 78, 39, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = activePage === 'payment' ? 'var(--primary)' : 'rgba(255, 78, 39, 0.08)';
                e.currentTarget.style.color = activePage === 'payment' ? '#FFFFFF' : '#FF4E27';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = activePage === 'payment' ? '0 4px 14px rgba(255, 78, 39, 0.35)' : 'none';
              }}
            >
              <span>💳</span>
              <span>Pay Online</span>
            </a>

            {/* MOBILE COMPACT PAY BUTTON (PHONES <= 768px) */}
            {isMobileScreen && (
              <a
                href="/payment"
                onClick={(e) => { e.preventDefault(); onNavigate('payment'); }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  backgroundColor: activePage === 'payment' ? 'var(--primary)' : 'rgba(255, 78, 39, 0.1)',
                  color: activePage === 'payment' ? '#FFFFFF' : '#FF4E27',
                  border: '1px solid rgba(255, 78, 39, 0.35)',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  minHeight: '36px',
                  lineHeight: 1,
                  boxShadow: activePage === 'payment' ? '0 3px 10px rgba(255, 78, 39, 0.3)' : 'none',
                }}
              >
                <span>💳</span>
                <span>Pay</span>
              </a>
            )}

            {/* MOBILE HAMBURGER MENU BUTTON (STRICTLY MOBILE PHONES <= 768px) */}
            {isMobileScreen && (
              <button
                className="mobile-menu-trigger"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Navigation Drawer"
              >
                ☰
              </button>
            )}
          </div>
        </div>

        {/* MOBILE SIDE SLIDE-OVER NAVIGATION DRAWER (EXACTLY MATCHING SCREENSHOT 1) */}
        {isMobileMenuOpen && (
          <div className="mobile-drawer-overlay">
            {/* Dark translucent backdrop on left side */}
            <div className="mobile-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)} />

            {/* Cream / White Slide-Over Panel on right side */}
            <div className="mobile-drawer-panel animate-slide-left">
              {/* Drawer Top Header */}
              <div className="mobile-drawer-header">
                <h3 className="mobile-drawer-title">Navigation</h3>
                <button
                  className="mobile-drawer-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close Navigation"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Menu Items */}
              <div className="mobile-drawer-body">
                <button
                  className={`mobile-drawer-link ${activePage === 'home' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('home')}
                >
                  <span>Home</span>
                </button>

                <div className="mobile-drawer-link-group">
                  <button
                    className={`mobile-drawer-link ${activePage === 'about' ? 'active' : ''}`}
                    onClick={() => {
                      setIsAboutDropdownOpen(!isAboutDropdownOpen);
                    }}
                    style={{ justifyContent: 'space-between' }}
                  >
                    <span>About</span>
                    <span style={{ fontSize: '0.75rem' }}>{isAboutDropdownOpen ? '▲' : '▾'}</span>
                  </button>

                  {isAboutDropdownOpen && (
                    <div className="mobile-drawer-sublinks">
                      <button onClick={() => handleMobileNav('about')}>About Business Volunteers</button>
                      <button onClick={() => handleMobileNav('about', 'founder')}>Founder — Harsh Chaudhary</button>
                      <button onClick={() => handleMobileNav('about', 'co-founder')}>Co-Founder — Khwahish Sahai</button>
                      <button onClick={() => handleMobileNav('about', 'why-us')}>Why Business Volunteers</button>
                      <button onClick={() => handleMobileNav('about', 'team')}>Our Team</button>
                    </div>
                  )}
                </div>

                <button
                  className={`mobile-drawer-link ${activePage === 'services' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('services')}
                >
                  <span>Services</span>
                </button>

                <button
                  className={`mobile-drawer-link ${activePage === 'portfolio' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('portfolio')}
                >
                  <span>Portfolio</span>
                </button>

                <button
                  className={`mobile-drawer-link ${activePage === 'industries' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('industries')}
                >
                  <span>Industries</span>
                </button>

                <button
                  className={`mobile-drawer-link ${activePage === 'legal' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('legal')}
                >
                  <span>Legal & Transparency</span>
                </button>

                <button
                  className={`mobile-drawer-link ${activePage === 'blog' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('blog')}
                >
                  <span>Blog</span>
                </button>

                <button
                  className={`mobile-drawer-link ${activePage === 'smm' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('smm')}
                >
                  <span>SMM</span>
                </button>

                <button
                  className={`mobile-drawer-link ${activePage === 'contact' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('contact')}
                >
                  <span>Contact</span>
                </button>

                <button
                  className={`mobile-drawer-link ${activePage === 'payment' ? 'active' : ''}`}
                  onClick={() => handleMobileNav('payment')}
                  style={{
                    backgroundColor: activePage === 'payment' ? 'var(--primary)' : 'rgba(255, 78, 39, 0.08)',
                    color: activePage === 'payment' ? '#FFFFFF' : '#FF4E27',
                    fontWeight: 800,
                  }}
                >
                  <span>💳 Pay Online (UPI / Bank)</span>
                </button>
              </div>

              {/* Drawer Bottom CTA Button matching Screenshot 1 */}
              <div className="mobile-drawer-footer">
                <button
                  className="mobile-drawer-cta-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenStrategyModal();
                  }}
                >
                  Book Strategy Call ➔
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
