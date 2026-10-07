import React, { useState, useEffect } from 'react';
import type { Currency, PageView } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { LegalSection } from './components/LegalSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContactFormModal } from './components/ContactFormModal';

import { InteractiveStatsBar } from './components/InteractiveStatsBar';
import { ClientVoices } from './components/ClientVoices';
import { FloatingSocials } from './components/FloatingSocials';
import { WorkShowcaseMarquee } from './components/WorkShowcaseMarquee';
import { SectionNavigator } from './components/SectionNavigator';

// Modals
import { StatCardModal } from './components/StatCardModal';
import type { StatType } from './components/StatCardModal';
import { LeadershipModal } from './components/LeadershipModal';
import type { LeaderPerson } from './components/LeadershipModal';
import { StrategyModal } from './components/StrategyModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { LocationsModal } from './components/LocationsModal';

// Dedicated Pages
import { ServicesPage } from './pages/ServicesPage';
import { SmmPage } from './pages/SmmPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { LocationPage } from './pages/LocationPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { LegalDetailsPage } from './pages/LegalDetailsPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { GraphicDetailPage } from './pages/GraphicDetailPage';
import { GraphicItemDetailPage } from './pages/GraphicItemDetailPage';
import { LocationsDirectoryPage } from './pages/LocationsDirectoryPage';
import { HtmlSitemapPage } from './pages/HtmlSitemapPage';
import { PaymentPage } from './pages/PaymentPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { updatePageSeo } from './utils/seoManager';
import { parseRoute, getRoutePath } from './utils/routes';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Modals state
  const [activeStatModal, setActiveStatModal] = useState<StatType>(null);
  const [activeLeaderModal, setActiveLeaderModal] = useState<LeaderPerson>(null);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [strategyModalNote, setStrategyModalNote] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isLocationsModalOpen, setIsLocationsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalService, setContactModalService] = useState('');

  // Selected Location for location landing page
  const [selectedLocation, setSelectedLocation] = useState<string>('Lucknow');

  // Selected Blog Slug for blog post page
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('');

  // Legal section query pass-through state
  const [initialLegalQuery, setInitialLegalQuery] = useState('');
  const [initialLegalShowResults, setInitialLegalShowResults] = useState(false);
  const [selectedLegalServiceTitle, setSelectedLegalServiceTitle] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('');
  const [selectedGraphicCat, setSelectedGraphicCat] = useState<string>('');
  const [selectedDesignItem, setSelectedDesignItem] = useState<string>('');

  useEffect(() => {
    const syncRoute = () => {
      const { page, slug } = parseRoute(window.location.pathname, window.location.search);
      
      if (page === 'blog-post' && slug) {
        setSelectedBlogSlug(slug);
      } else if (page === 'service-details' && slug) {
        setSelectedServiceId(slug);
      } else if (page === 'industries') {
        setSelectedIndustryId(slug || '');
      } else if (page === 'about') {
        if (slug) {
          const lower = slug.toLowerCase();
          if (lower.includes('co-founder') || lower.includes('cofounder') || lower.includes('khwahish') || lower.includes('creative')) {
            setActiveLeaderModal('co-founder');
          } else if (lower.includes('founder') || lower.includes('harsh')) {
            setActiveLeaderModal('founder');
          } else if (lower.includes('why') || lower.includes('diff')) {
            setActiveLeaderModal('why-us');
          } else if (lower.includes('team') || lower.includes('crew') || lower.includes('specialist')) {
            setActiveLeaderModal('team');
          } else {
            setActiveLeaderModal(null);
          }
        } else {
          setActiveLeaderModal(null);
        }
      } else if (page === 'legal-details' && slug) {
        setSelectedLegalServiceTitle(slug);
      } else if (page === 'graphic-details' && slug) {
        setSelectedGraphicCat(slug);
      } else if (page === 'design-item' && slug) {
        setSelectedDesignItem(slug);
      } else if (page === 'location' && slug) {
        setSelectedLocation(slug);
      }
      
      setActivePage(page);

      // Upgrade legacy query params (?page=...) to clean SEO paths
      if (window.location.search.includes('page=')) {
        const cleanPath = getRoutePath(page, slug);
        window.history.replaceState(null, '', cleanPath);
      }
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  // Synchronous Unified SEO Metadata Manager
  useEffect(() => {
    const activeSlug = activePage === 'blog-post' ? selectedBlogSlug :
      activePage === 'service-details' ? selectedServiceId :
      activePage === 'location' ? selectedLocation :
      activePage === 'legal-details' ? selectedLegalServiceTitle :
      activePage === 'graphic-details' ? selectedGraphicCat :
      activePage === 'design-item' ? selectedDesignItem :
      activePage === 'industries' ? selectedIndustryId : undefined;

    updatePageSeo(activePage, activeSlug);
  }, [activePage, selectedLocation, selectedBlogSlug, selectedServiceId, selectedLegalServiceTitle, selectedGraphicCat, selectedDesignItem, selectedIndustryId]);

  const handleThemeToggle = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleNavigate = (page: PageView, slug?: string) => {
    if (page === 'blog-post' && slug) {
      setSelectedBlogSlug(slug);
    }
    if (page === 'service-details' && slug) {
      setSelectedServiceId(slug);
    }
    if (page === 'industries') {
      setSelectedIndustryId(slug || '');
    }
    if (page === 'graphic-details' && slug) {
      setSelectedGraphicCat(slug);
    }
    if (page === 'design-item' && slug) {
      setSelectedDesignItem(slug);
    }
    if (page === 'location' && slug) {
      setSelectedLocation(slug);
    }
    if (page === 'about') {
      if (slug) {
        const lower = slug.toLowerCase();
        if (lower.includes('co-founder') || lower.includes('cofounder') || lower.includes('khwahish') || lower.includes('creative')) {
          setActiveLeaderModal('co-founder');
        } else if (lower.includes('founder') || lower.includes('harsh')) {
          setActiveLeaderModal('founder');
        } else if (lower.includes('why') || lower.includes('diff')) {
          setActiveLeaderModal('why-us');
        } else if (lower.includes('team') || lower.includes('crew') || lower.includes('specialist')) {
          setActiveLeaderModal('team');
        } else {
          setActiveLeaderModal(null);
        }
      } else {
        setActiveLeaderModal(null);
      }
    }
    if (page === 'legal-details' && slug) {
      setSelectedLegalServiceTitle(slug);
    }
    if (page === 'legal') {
      setInitialLegalQuery('');
      setInitialLegalShowResults(false);
    }

    const cleanPath = getRoutePath(page, slug);
    window.history.pushState(null, '', cleanPath);
    
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRedirectToLegal = (query?: string, showResults?: boolean) => {
    setInitialLegalQuery(query || '');
    setInitialLegalShowResults(showResults ?? true);
    setActivePage('legal');
    const cleanPath = getRoutePath('legal');
    window.history.pushState(null, '', cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLocation = (loc: string) => {
    setSelectedLocation(loc);
    setActivePage('location');
    const cleanPath = getRoutePath('location', loc);
    window.history.pushState(null, '', cleanPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStrategyModal = (note?: string) => {
    setStrategyModalNote(note || '');
    setIsStrategyModalOpen(true);
  };

  const handleOpenLeaderModal = (person: LeaderPerson) => {
    setActiveLeaderModal(person);
    setActivePage('about');
    const cleanPath = person ? getRoutePath('about', person) : '/about';
    window.history.pushState(null, '', cleanPath);
  };

  const handleCloseLeaderModal = () => {
    setActiveLeaderModal(null);
    if (activePage === 'about') {
      window.history.pushState(null, '', '/about');
    } else {
      window.history.pushState(null, '', getRoutePath(activePage));
    }
  };

  return (
    <div className="app-container" data-theme={theme}>
      {/* GLASSMORPHIC HEADER */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        onOpenStrategyModal={() => handleOpenStrategyModal()}
        onOpenLeaderModal={handleOpenLeaderModal}
      />

      {/* MAIN ROUTER BODY */}
      <main>
        {activePage === 'home' && (
          <>
            <Hero
              onOpenStatModal={setActiveStatModal}
              onOpenStrategyModal={() => handleOpenStrategyModal()}
              onNavigateServices={() => handleNavigate('services')}
              onNavigatePortfolio={() => handleNavigate('portfolio')}
            />
            <div id="stats" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '4rem', paddingBottom: '2rem' }}>
              <InteractiveStatsBar
                onSelectLocation={handleSelectLocation}
                onOpenStrategyModal={handleOpenStrategyModal}
              />
            </div>
            <ServicesGrid
              onOpenStrategyModal={handleOpenStrategyModal}
              onNavigate={handleNavigate}
              backgroundColor="#FFFFFF"
            />
            <AboutUs
              onNavigate={handleNavigate}
              onOpenLeaderModal={handleOpenLeaderModal}
              onOpenStrategyModal={handleOpenStrategyModal}
              onSelectLocation={handleSelectLocation}
              backgroundColor="var(--bg-main)"
            />
            <ClientVoices backgroundColor="#FFFFFF" />
            <WorkShowcaseMarquee />
            <WhyChooseUs
              onSelectLocation={handleSelectLocation}
              onOpenStrategyModal={handleOpenStrategyModal}
              backgroundColor="var(--bg-main)"
            />
            <LegalSection 
              onOpenStrategyModal={handleOpenStrategyModal} 
              isHomepage={true}
              onRedirectToLegal={handleRedirectToLegal}
              backgroundColor="#F8FAFC"
              onOpenContactModal={(service) => { setContactModalService(service || ''); setIsContactModalOpen(true); }}
            />
            <ContactSection backgroundColor="var(--bg-main)" onOpenContactModal={() => { setContactModalService(''); setIsContactModalOpen(true); }} />
          </>
        )}

        {activePage === 'about' && (
          <AboutUs
            isStandalone={true}
            onNavigate={handleNavigate}
            onOpenLeaderModal={handleOpenLeaderModal}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'industries' && (
          <IndustriesPage
            industryId={selectedIndustryId}
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

         {activePage === 'legal' && (
           <LegalSection 
             onOpenStrategyModal={handleOpenStrategyModal} 
             isHomepage={false}
             initialQuery={initialLegalQuery}
             initialShowResults={initialLegalShowResults}
             backgroundColor="#F8FAFC"
             onOpenContactModal={(service) => { setContactModalService(service || ''); setIsContactModalOpen(true); }}
           />
         )}

        {activePage === 'portfolio' && (
          <PortfolioPage
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'smm' && (
          <SmmPage
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'contact' && (
          <ContactSection isStandalone={true} onOpenContactModal={() => { setContactModalService(''); setIsContactModalOpen(true); }} />
        )}

        {activePage === 'location' && (
          <LocationPage
            locationName={selectedLocation}
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'blog' && (
          <BlogPage
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'blog-post' && (
          <BlogPostPage
            slug={selectedBlogSlug}
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'legal-details' && (
          <LegalDetailsPage
            serviceTitle={selectedLegalServiceTitle}
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'service-details' && (
          <ServiceDetailPage
            serviceId={selectedServiceId}
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'graphic-details' && (
          <GraphicDetailPage
            categoryId={selectedGraphicCat}
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'design-item' && (
          <GraphicItemDetailPage
            itemId={selectedDesignItem}
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'all-locations' && (
          <LocationsDirectoryPage
            onNavigate={handleNavigate}
            onSelectLocation={handleSelectLocation}
          />
        )}

        {activePage === 'html-sitemap' && (
          <HtmlSitemapPage
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}

        {activePage === 'payment' && (
          <PaymentPage
            onNavigate={handleNavigate}
            onOpenContactModal={() => { setContactModalService(''); setIsContactModalOpen(true); }}
          />
        )}

        {activePage === '404' && (
          <NotFoundPage
            onNavigate={handleNavigate}
            onOpenStrategyModal={handleOpenStrategyModal}
          />
        )}
      </main>

      {/* FOOTER WITH DOMESTIC & INTERNATIONAL LOCATIONS */}
      <Footer
        onNavigate={handleNavigate}
        onSelectLocation={handleSelectLocation}
        onOpenLocationsModal={() => setIsLocationsModalOpen(true)}
        onOpenContactModal={() => { setContactModalService(''); setIsContactModalOpen(true); }}
      />

      {/* POP-UP MODALS */}
      <LocationsModal
        isOpen={isLocationsModalOpen}
        onClose={() => setIsLocationsModalOpen(false)}
        onSelectLocation={handleSelectLocation}
      />

      <StatCardModal
        statType={activeStatModal}
        onClose={() => setActiveStatModal(null)}
        onOpenStrategyModal={handleOpenStrategyModal}
      />

      <LeadershipModal
        person={activeLeaderModal}
        onClose={handleCloseLeaderModal}
        onOpenStrategyModal={handleOpenStrategyModal}
        onNavigate={handleNavigate}
      />

      <StrategyModal
        isOpen={isStrategyModalOpen}
        onClose={() => setIsStrategyModalOpen(false)}
        planName={strategyModalNote}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Floating social media quick contact icons */}
      <FloatingSocials />

      {/* ChatGPT-style section navigator — homepage only */}
      <SectionNavigator activePage={activePage} />

      {/* Global Contact Form Modal — accessible from anywhere */}
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledService={contactModalService}
      />
    </div>
  );
};
export default App;
