import React, { useState, useMemo } from 'react';
import type { PageView } from '../types';
import { ALL_17_SERVICES } from '../data/servicesData';
import { TOP_FOOTER_DOMESTIC_LOCATIONS, TOP_FOOTER_INTERNATIONAL_LOCATIONS } from '../data/locationsData';
import { all89IndustriesList } from './IndustriesPage';
import { ALL_BLOGS } from '../data/blogData';

interface HtmlSitemapPageProps {
  onNavigate: (page: PageView, slug?: string) => void;
  onOpenStrategyModal?: (note?: string) => void;
}

export const HtmlSitemapPage: React.FC<HtmlSitemapPageProps> = ({ onNavigate, onOpenStrategyModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'services' | 'industries' | 'locations' | 'blogs'>('all');

  const corePages = [
    { title: 'Home — AI-Powered Growth Agency', path: '/', page: 'home' as PageView },
    { title: 'About Business Volunteers — Leadership & Mission', path: '/about', page: 'about' as PageView },
    { title: 'All Services & Growth Capabilities', path: '/services', page: 'services' as PageView },
    { title: '89+ Industry Marketing Frameworks', path: '/industries', page: 'industries' as PageView },
    { title: 'Client Portfolio & Case Studies', path: '/portfolio', page: 'portfolio' as PageView },
    { title: 'Social Media Marketing (SMM) Engine', path: '/smm', page: 'smm' as PageView },
    { title: 'Graphic Design Studio & Catalog', path: '/graphic-design', page: 'graphic-details' as PageView },
    { title: 'Legal & Practice Area Solutions', path: '/legal', page: 'legal' as PageView },
    { title: 'All Domestic & Global Locations', path: '/digital-marketing', page: 'all-locations' as PageView },
    { title: 'Insights & Strategy Blog Library', path: '/blogs', page: 'blog' as PageView },
    { title: 'Contact Founders & Book Strategy Call', path: '/contact', page: 'contact' as PageView },
    { title: 'Payment Portal — UPI QR & Bank Transfer', path: '/payment', page: 'payment' as PageView },
  ];

  const filteredServices = useMemo(() => {
    return ALL_17_SERVICES.filter(s =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredIndustries = useMemo(() => {
    return all89IndustriesList.filter(ind =>
      ind.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ind.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredLocations = useMemo(() => {
    const allLocs = [...TOP_FOOTER_DOMESTIC_LOCATIONS, ...TOP_FOOTER_INTERNATIONAL_LOCATIONS];
    return allLocs.filter(l => l.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const filteredBlogs = useMemo(() => {
    return ALL_BLOGS.filter(b =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary, #0B0808)', color: 'var(--text-primary, #FFFFFF)', minHeight: '100vh', padding: '6rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ display: 'inline-block', background: 'rgba(255, 78, 39, 0.12)', border: '1px solid rgba(255, 78, 39, 0.3)', color: '#FF4E27', padding: '0.4rem 1.25rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            Direct Index & Crawl Architecture
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '1rem', color: '#FFF' }}>
            Complete Website Directory & HTML Sitemap
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
            Browse through all core capabilities, 89+ industry scaling blueprints, 50+ local markets, and 500+ deep-dive strategic guides engineered by Business Volunteers.
          </p>

          {/* Quick Search Input */}
          <div style={{ maxWidth: '550px', margin: '2rem auto 0', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search across all pages, services, industries, or blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#FFF',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.25)'
              }}
            />
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'services', label: `17 Services (${filteredServices.length})` },
              { id: 'industries', label: `89 Industries (${filteredIndustries.length})` },
              { id: 'locations', label: `50+ Locations (${filteredLocations.length})` },
              { id: 'blogs', label: `500+ Articles (${filteredBlogs.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: '30px',
                  border: activeTab === tab.id ? '1px solid #FF4E27' : '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: activeTab === tab.id ? '#FF4E27' : 'rgba(255,255,255,0.03)',
                  color: '#FFF',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 1: Core Website Pages */}
        {(activeTab === 'all') && (
          <div style={{ marginBottom: '4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span>🏛️</span> Core Website Navigation & Hubs
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {corePages.map((item, idx) => (
                <a
                  key={idx}
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.page);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.85rem 1.2rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    color: '#FFF',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <span style={{ color: '#FF4E27', marginRight: '0.5rem' }}>→</span>
                  {item.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: 17 Core Services */}
        {(activeTab === 'all' || activeTab === 'services') && (
          <div style={{ marginBottom: '4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span>⚡</span> 17 Full-Funnel Growth Services & Capabilities
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {filteredServices.map(s => (
                <a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('service-details', s.slug);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.25rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    color: '#FFF',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#FFF' }}>{s.title}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.4 }}>
                    {s.description}
                  </span>
                  <span style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#FF4E27', fontWeight: 700 }}>
                    {s.pricing}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: 89 Industry Hubs */}
        {(activeTab === 'all' || activeTab === 'industries') && (
          <div style={{ marginBottom: '4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span>🏢</span> 89+ Industry Digital Scaling Frameworks
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
              {filteredIndustries.map(ind => (
                <a
                  key={ind.id}
                  href={`/industries/marketing-for-${ind.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('industries', ind.id);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '8px',
                    color: 'rgba(255,255,255,0.9)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <span>{ind.icon}</span>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ind.name}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Domestic & Global Locations */}
        {(activeTab === 'all' || activeTab === 'locations') && (
          <div style={{ marginBottom: '4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span>📍</span> 50+ Pan-India & Global Location Hubs
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              {filteredLocations.map((loc, idx) => {
                const cleanSlug = loc.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                return (
                  <a
                    key={idx}
                    href={`/digital-marketing/${cleanSlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('location', cleanSlug);
                    }}
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '8px',
                      color: 'rgba(255,255,255,0.85)',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      textAlign: 'center'
                    }}
                  >
                    Digital Marketing in {loc}
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 5: Blog Library */}
        {(activeTab === 'all' || activeTab === 'blogs') && (
          <div style={{ marginBottom: '4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '20px', padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span>📚</span> Strategic Growth Articles & Guides ({filteredBlogs.length})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
              {filteredBlogs.slice(0, 80).map(b => (
                <a
                  key={b.slug}
                  href={`/blogs/${b.slug.replace(/^strategy\//, '')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('blog-post', b.slug.replace(/^strategy\//, ''));
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem 1.25rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '10px',
                    color: '#FFF',
                    textDecoration: 'none'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: '#FF4E27', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                    {b.category}
                  </span>
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.4, color: '#FFF' }}>
                    {b.title}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.5rem' }}>
                    🗓 {b.date} • ⏱ {b.readTime}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem 2rem', background: 'linear-gradient(135deg, rgba(255,78,39,0.12) 0%, rgba(15,23,42,0.6) 100%)', borderRadius: '24px', border: '1px solid rgba(255,78,39,0.3)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.75rem', color: '#FFF' }}>
            Ready to Scale Your Brand with Business Volunteers?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 2rem', fontSize: '1.05rem' }}>
            Book a complimentary 30-minute growth roadmap consultation with our founders. Zero lock-in contracts, guaranteed execution.
          </p>
          <button
            onClick={() => onOpenStrategyModal ? onOpenStrategyModal('HTML Sitemap CTA') : onNavigate('contact')}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: '#FF4E27',
              color: '#FFF',
              border: 'none',
              borderRadius: '50px',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(255,78,39,0.4)'
            }}
          >
            Claim Your Free Strategy Blueprint →
          </button>
        </div>

      </div>
    </div>
  );
};
