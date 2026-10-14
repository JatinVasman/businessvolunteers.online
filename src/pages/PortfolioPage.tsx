import React, { useState } from 'react';
import { socialMediaProjects, type SocialMediaProject } from '../data/portfolioData';

interface PortfolioPageProps {
  onNavigate: (page: any) => void;
  onOpenStrategyModal?: (note?: string) => void;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({ onNavigate, onOpenStrategyModal: _onOpenStrategyModal }) => {
  const [selectedSocialProject, setSelectedSocialProject] = useState<SocialMediaProject | null>(null);


  return (
    <div style={{
      backgroundColor: '#A8B4C3',
      color: '#0F172A',
      minHeight: '100vh',
      padding: '2.5rem 0 5rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Ambient background blur blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, rgba(59, 130, 246, 0) 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '15%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(96, 165, 250, 0.06) 0%, rgba(96, 165, 250, 0) 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <style>{`
        .portfolio-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 1;
        }
        .portfolio-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px rgba(59, 130, 246, 0.15), 0 2px 8px rgba(59, 130, 246, 0.05) !important;
          border-color: rgba(59, 130, 246, 0.4) !important;
        }
        .portfolio-image-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .portfolio-image-wrapper img {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .portfolio-card:hover .portfolio-image-wrapper img {
          transform: scale(1.04);
        }
        .filter-tab {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background-color: #FFFFFF;
          border: 1px solid #E2E8F0 !important;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
          transform: translateY(0);
        }
        .filter-tab:hover {
          background-color: #FFFFFF !important;
          color: #3B82F6 !important;
          border-color: #3B82F6 !important;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.08);
        }
        .filter-tab.active {
          background-color: #3B82F6 !important;
          color: #FFFFFF !important;
          border-color: #3B82F6 !important;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25) !important;
          transform: translateY(0) scale(1.02);
        }
        .filter-tab.active:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 10px 28px rgba(59, 130, 246, 0.3) !important;
        }
        .metric-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 1;
        }
        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(59, 130, 246, 0.08) !important;
          border-color: rgba(59, 130, 246, 0.25) !important;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Lightbox/Popup bounce animations */
        .lightbox-overlay {
          animation: fadeInBg 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .lightbox-image {
          animation: scaleUpImg 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes fadeInBg {
          from { background-color: rgba(15, 23, 42, 0); backdrop-filter: blur(0px); }
          to { background-color: rgba(15, 23, 42, 0.95); backdrop-filter: blur(8px); }
        }
        @keyframes scaleUpImg {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        /* Metric Cards Floating Animations & Glow Hovers */
        @keyframes floatCard1 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
          100% { transform: translateY(0px); }
        }
        @keyframes floatCard2 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .metric-card-1 {
          animation: floatCard1 4s ease-in-out infinite;
        }
        .metric-card-2 {
          animation: floatCard2 4.6s ease-in-out infinite;
          animation-delay: 0.3s;
        }
        .metric-card-3 {
          animation: floatCard1 4.3s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        .metric-card-4 {
          animation: floatCard2 4.8s ease-in-out infinite;
          animation-delay: 0.9s;
        }
        .metric-card-1:hover {
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.25) !important;
          transform: translateY(-10px) scale(1.04) !important;
          border-color: rgba(99, 102, 241, 0.5) !important;
        }
        .metric-card-2:hover {
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.25) !important;
          transform: translateY(-10px) scale(1.04) !important;
          border-color: rgba(16, 185, 129, 0.5) !important;
        }
        .metric-card-3:hover {
          box-shadow: 0 20px 40px rgba(244, 63, 94, 0.25) !important;
          transform: translateY(-10px) scale(1.04) !important;
          border-color: rgba(244, 63, 94, 0.5) !important;
        }
        .metric-card-4:hover {
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.25) !important;
          transform: translateY(-10px) scale(1.04) !important;
          border-color: rgba(245, 158, 11, 0.5) !important;
        }
      `}</style>

      <div className="container">
        
        {/* BREADCRUMB */}
        <div style={{ fontSize: '0.825rem', color: '#64748B', marginBottom: '1.5rem', textAlign: 'center' }}>
          <span style={{ cursor: 'pointer', color: '#0F172A', fontWeight: 600 }} onClick={() => onNavigate('home')}>Home</span> / <span style={{ color: '#3B82F6', fontWeight: 700 }}>Our Portfolio</span>
        </div>

        {/* HEADER */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.25rem auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontSize: '0.75rem', fontWeight: 800, color: '#3B82F6', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            <span style={{ width: '30px', height: '1.5px', background: '#3B82F6' }}></span>
            <span>THE WORK</span>
            <span style={{ width: '30px', height: '1.5px', background: '#3B82F6' }}></span>
          </div>

          <h1 style={{ fontFamily: 'Outfit, serif', fontSize: '3rem', fontWeight: 900, color: '#0F172A', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Our Work Gallery
          </h1>

          <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.5, marginBottom: '0.2rem' }}>
            Real campaigns designed, published, and automated for top-tier Indian brands.
          </p>
          <p style={{ fontSize: '1rem', color: '#64748B', lineHeight: 1.5 }}>
            Explore our aesthetic layout catalogs below.
          </p>
        </div>

        {/* 🌟 NEW UNIQUE METRICS BAR WITH COLORS AND FLOATING ANIMATIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', maxWidth: '1140px', margin: '0 auto 3rem auto' }}>
          {[
            { 
              value: '45+', 
              label: 'Brands Transformed', 
              icon: '💎',
              bg: 'linear-gradient(135deg, #E0F2FE 0%, #C7D2FE 100%)',
              borderColor: 'rgba(99, 102, 241, 0.25)',
              textColor: '#4F46E5',
              labelColor: '#6366F1',
              shadow: '0 10px 25px rgba(99, 102, 241, 0.12)',
              class: 'metric-card-1'
            },
            { 
              value: '15M+', 
              label: 'Total Impressions', 
              icon: '📈',
              bg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              borderColor: 'rgba(16, 185, 129, 0.25)',
              textColor: '#059669',
              labelColor: '#10B981',
              shadow: '0 10px 25px rgba(16, 185, 129, 0.12)',
              class: 'metric-card-2'
            },
            { 
              value: '8.4%', 
              label: 'Avg Engagement Rate', 
              icon: '❤️',
              bg: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)',
              borderColor: 'rgba(244, 63, 94, 0.25)',
              textColor: '#E11D48',
              labelColor: '#F43F5E',
              shadow: '0 10px 25px rgba(244, 63, 94, 0.12)',
              class: 'metric-card-3'
            },
            { 
              value: '4.8x', 
              label: 'Average Ads ROAS', 
              icon: '🚀',
              bg: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
              borderColor: 'rgba(245, 158, 11, 0.25)',
              textColor: '#D97706',
              labelColor: '#F59E0B',
              shadow: '0 10px 25px rgba(245, 158, 11, 0.12)',
              class: 'metric-card-4'
            }
          ].map((m, idx) => (
            <div
              key={idx}
              className={m.class}
              style={{
                background: m.bg,
                borderRadius: '20px',
                padding: '1.5rem 1.25rem',
                textAlign: 'center',
                border: `1px solid ${m.borderColor}`,
                boxShadow: m.shadow,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{ fontSize: '1.85rem', marginBottom: '0.4rem' }}>{m.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: m.textColor, fontFamily: 'Outfit, serif', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{m.value}</div>
              <div style={{ fontSize: '0.725rem', color: m.labelColor, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.4rem' }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* 3. SOCIAL MEDIA PROJECTS GRID WITH ANIMATED TRANSITIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', maxWidth: '1140px', margin: '0 auto' }}>
          {socialMediaProjects.map((project) => {
            return (
              <div
                key={project.id}
                className="portfolio-card animate-fade-in"
                onClick={() => setSelectedSocialProject(project)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '0',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  overflow: 'hidden'
                }}
              >
                {/* BRAND HEADER */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.25rem 1.25rem 1rem 1.25rem', backgroundColor: '#FFFFFF', borderBottom: '1px solid #F1F5F9', textAlign: 'center', width: '100%' }}>
                  <h3 style={{ fontFamily: 'Outfit, serif', fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.15rem 0', lineHeight: 1.2 }}>
                    {project.name}
                  </h3>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>
                    {project.niche}
                  </div>
                </div>
                
                {/* PHONE SCREEN MOCKUP WRAPPER */}
                <div className="portfolio-image-wrapper" style={{ width: '100%', flex: 1, position: 'relative' }}>
                  <img
                    src={project.cardImage}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block'
                    }}
                  />


                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div style={{ marginTop: '4rem', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              backgroundColor: '#0F172A',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              maxWidth: '850px',
              width: '100%',
              textAlign: 'center',
              borderTop: '3px solid #3B82F6',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', fontSize: '0.75rem', fontWeight: 800, color: '#3B82F6', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              <span style={{ width: '30px', height: '1.5px', background: '#3B82F6' }}></span>
              <span>YOUR PROJECT NEXT?</span>
              <span style={{ width: '30px', height: '1.5px', background: '#3B82F6' }}></span>
            </div>

            <h2 style={{ fontFamily: 'Outfit, serif', fontSize: '2.2rem', fontWeight: 900, color: '#FFFFFF', marginBottom: '0.6rem', letterSpacing: '-0.01em' }}>
              Let's add your brand to this gallery
            </h2>

            <p style={{ fontSize: '0.95rem', color: '#94A3B8', maxWidth: '600px', margin: '0 auto 1.75rem auto', lineHeight: 1.5 }}>
              Social media glow-up or brand-new website — premium, transparent, on time.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => window.open('https://wa.me/918586989832?text=Hi%2C%20I%20am%20interested%20in%20starting%20a%20project%20with%20Digital%20Digix', '_blank')}
                style={{
                  backgroundColor: '#E0B56C',
                  color: '#0F172A',
                  padding: '0.65rem 1.75rem',
                  borderRadius: '999px',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(224, 181, 108, 0.25)',
                  transition: 'transform 0.25s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Start a Project ➔
              </button>

              <button
                onClick={() => onNavigate('services')}
                style={{
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  padding: '0.65rem 1.75rem',
                  borderRadius: '999px',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
              >
                View Services
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* FULL PAGE INTERACTIVE LIGHTBOX */}
      {selectedSocialProject && (
        <div 
          className="lightbox-overlay"
          onClick={() => setSelectedSocialProject(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 99999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out'
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setSelectedSocialProject(null)}
            style={{
              position: 'fixed',
              top: '1.5rem',
              right: '1.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '999px',
              padding: '0.6rem 1.2rem',
              fontSize: '0.875rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              zIndex: 100000,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            ✕ Close
          </button>

          {/* Lightbox Image Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img 
              className="lightbox-image"
              src={selectedSocialProject.cardImage} 
              alt={selectedSocialProject.name} 
              style={{
                maxWidth: '100%',
                maxHeight: '85vh',
                width: 'auto',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'block',
                cursor: 'default'
              }} 
            />
          </div>
        </div>
      )}

    </div>
  );
};
