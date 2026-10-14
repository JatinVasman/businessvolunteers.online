import React, { useState } from 'react';
import { socialMediaProjects } from '../data/portfolioData';
import type { SocialMediaProject } from '../data/portfolioData';

// Divide the 47 items into three balanced rows for marquee movement
const row1 = socialMediaProjects.slice(0, 16);
const row2 = socialMediaProjects.slice(16, 32);
const row3 = socialMediaProjects.slice(32);

interface WorkShowcaseMarqueeProps {
  locationName?: string;
}

export const WorkShowcaseMarquee: React.FC<WorkShowcaseMarqueeProps> = ({ locationName }) => {
  const [activeLightboxProject, setActiveLightboxProject] = useState<SocialMediaProject | null>(null);

  return (
    <section id="showcase" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-main)', overflow: 'hidden', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
      {/* Ambient background blur blobs */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, rgba(59, 130, 246, 0) 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(96, 165, 250, 0.05) 0%, rgba(96, 165, 250, 0) 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="section-tag" style={{ color: '#3B82F6', background: 'rgba(59, 130, 246, 0.1)' }}>OUR SHOWCASE</span>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: 'Outfit, sans-serif', color: 'var(--secondary)', marginTop: '0.5rem', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Live Campaign Showcase {locationName ? `in ${locationName}` : ''}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.5 }}>
            Explore our authentic, high-impact social media creatives {locationName ? `in ${locationName}` : ''}. Hover to pause, click to enlarge in full-screen.
          </p>
        </div>
      </div>

      <style>{`
        .showcase-marquee-card {
          position: relative;
          background: #FFFFFF;
          border-radius: 20px;
          overflow: hidden;
          width: 250px;
          margin-right: 1.75rem;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s ease, border-color 0.45s ease;
        }
        .showcase-marquee-card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.12) !important;
          border-color: rgba(59, 130, 246, 0.3) !important;
        }
        .showcase-marquee-card img.showcase-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .showcase-marquee-card:hover img.showcase-image {
          transform: scale(1.03);
        }
        
        /* Lightbox animations */
        .lightbox-overlay {
          animation: fadeInBg 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .lightbox-image {
          animation: scaleUpImg 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* TRACK 1 - SCROLLS LEFT */}
      <div className="marquee-container" style={{ marginBottom: '1.75rem', position: 'relative', zIndex: 1 }}>
        <div className="marquee-track-left">
          {[...row1, ...row1, ...row1].map((item, idx) => (
            <div
              key={`r1-img-${idx}`}
              className="showcase-marquee-card"
              onClick={() => setActiveLightboxProject(item)}
            >
              {/* BRAND HEADER */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: '#FFFFFF', textAlign: 'center', width: '100%' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>{item.name}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', marginTop: '0.1rem' }}>{item.niche}</div>
              </div>

              {/* IMAGE DISPLAY */}
              <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                <img
                  className="showcase-image"
                  src={item.cardImage}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRACK 2 - SCROLLS RIGHT */}
      <div className="marquee-container" style={{ marginBottom: '1.75rem', position: 'relative', zIndex: 1 }}>
        <div className="marquee-track-right">
          {[...row2, ...row2, ...row2].map((item, idx) => (
            <div
              key={`r2-img-${idx}`}
              className="showcase-marquee-card"
              onClick={() => setActiveLightboxProject(item)}
            >
              {/* BRAND HEADER */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: '#FFFFFF', textAlign: 'center', width: '100%' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>{item.name}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', marginTop: '0.1rem' }}>{item.niche}</div>
              </div>

              {/* IMAGE DISPLAY */}
              <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                <img
                  className="showcase-image"
                  src={item.cardImage}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRACK 3 - SCROLLS LEFT */}
      <div className="marquee-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="marquee-track-left">
          {[...row3, ...row3, ...row3].map((item, idx) => (
            <div
              key={`r3-img-${idx}`}
              className="showcase-marquee-card"
              onClick={() => setActiveLightboxProject(item)}
            >
              {/* BRAND HEADER */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', backgroundColor: '#FFFFFF', textAlign: 'center', width: '100%' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>{item.name}</div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%', marginTop: '0.1rem' }}>{item.niche}</div>
              </div>

              {/* IMAGE DISPLAY */}
              <div style={{ position: 'relative', overflow: 'hidden', flex: 1 }}>
                <img
                  className="showcase-image"
                  src={item.cardImage}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX FOR ENLARGING SHOWCASE IMAGES */}
      {activeLightboxProject && (
        <div 
          className="lightbox-overlay"
          onClick={() => setActiveLightboxProject(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'zoom-out'
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setActiveLightboxProject(null)}
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
              zIndex: 1000000,
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
              src={activeLightboxProject.cardImage} 
              alt={activeLightboxProject.name} 
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
    </section>
  );
};
export default WorkShowcaseMarquee;
