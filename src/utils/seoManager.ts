import type { PageView } from '../types';
import {
  STATIC_PAGES_SEO,
  SERVICES_SEO,
  getLocationSeo,
  getIndustrySeo,
  getGraphicDesignItemSeo,
  getLegalServiceSeo,
  getBlogPostSeo,
  type PageSeoMeta
} from './seoConfig';
import { SERVICE_ID_TO_SLUG, getRoutePath } from './routes';
import { getServiceBySlug } from '../data/servicesData';

export interface SeoDynamicContext {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalPath?: string;
  h1?: string;
  ogImage?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  tags?: string[];
  faqItems?: Array<{ q: string; a: string }>;
  verifiedPrice?: string;
  category?: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Derives SEO metadata and breadcrumbs for any given page and slug
 */
export function resolveSeoMetadata(page: PageView, slug?: string, context?: SeoDynamicContext): {
  seo: PageSeoMeta;
  breadcrumbs: BreadcrumbItem[];
  canonicalUrl: string;
} {
  let seo: PageSeoMeta;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' }
  ];

  switch (page) {
    case 'home':
      seo = STATIC_PAGES_SEO['/'];
      break;

    case 'services':
      seo = STATIC_PAGES_SEO['/services'];
      breadcrumbs.push({ name: 'Services', path: '/services' });
      break;

    case 'service-details': {
      const svc = slug ? getServiceBySlug(slug) : undefined;
      const cleanSlug = svc?.slug || (slug ? (SERVICE_ID_TO_SLUG[slug] || slug.toLowerCase()) : 'seo');
      seo = SERVICES_SEO[cleanSlug] || (svc ? {
        title: `${svc.title} Services — Pricing, Strategy & Results | Business Volunteers`,
        description: svc.longDescription || svc.description,
        keywords: [svc.title.toLowerCase(), `${svc.title.toLowerCase()} agency`, `${svc.category.toLowerCase()}`],
        canonicalPath: `/services/${svc.slug}`,
        h1: `${svc.title} Services`,
        ogType: 'website',
        primaryKeyword: `${svc.title.toLowerCase()} services`
      } : {
        title: `${context?.title || 'Service Details'} | Business Volunteers`,
        description: context?.description || 'Explore specialized digital marketing and software engineering capabilities by Business Volunteers.',
        keywords: ['digital marketing services', 'growth engineering', 'performance agency'],
        canonicalPath: `/services/${cleanSlug}`,
        h1: context?.h1 || `${context?.title || 'Service Details'}`,
        ogType: 'website',
        primaryKeyword: context?.title || 'digital marketing service'
      });
      breadcrumbs.push({ name: 'Services', path: '/services' });
      breadcrumbs.push({ name: seo.h1.replace(/ Services$/, ''), path: seo.canonicalPath });
      break;
    }

    case 'about':
      seo = STATIC_PAGES_SEO['/about'];
      breadcrumbs.push({ name: 'About Us', path: '/about' });
      break;

    case 'contact':
      seo = STATIC_PAGES_SEO['/contact'];
      breadcrumbs.push({ name: 'Contact', path: '/contact' });
      break;

    case 'portfolio':
      seo = STATIC_PAGES_SEO['/portfolio'];
      breadcrumbs.push({ name: 'Our Work', path: '/portfolio' });
      break;

    case 'industries': {
      if (slug) {
        seo = getIndustrySeo(slug, context?.title);
        breadcrumbs.push({ name: 'Industries', path: '/industries' });
        breadcrumbs.push({ name: seo.h1.replace(/^Digital Marketing for /, ''), path: seo.canonicalPath });
      } else {
        seo = STATIC_PAGES_SEO['/industries'];
        breadcrumbs.push({ name: 'Industries', path: '/industries' });
      }
      break;
    }

    case 'blog':
      seo = STATIC_PAGES_SEO['/blogs'];
      breadcrumbs.push({ name: 'Blogs', path: '/blogs' });
      break;

    case 'blog-post': {
      const cleanSlug = slug || 'guide';
      seo = getBlogPostSeo(cleanSlug, context?.title, context?.description);
      breadcrumbs.push({ name: 'Blogs', path: '/blogs' });
      breadcrumbs.push({ name: seo.h1, path: seo.canonicalPath });
      break;
    }

    case 'smm':
      seo = STATIC_PAGES_SEO['/smm'];
      breadcrumbs.push({ name: 'Social Media Marketing', path: '/smm' });
      break;

    case 'legal':
      seo = STATIC_PAGES_SEO['/legal'];
      breadcrumbs.push({ name: 'Legal Solutions', path: '/legal' });
      break;

    case 'legal-details': {
      const cleanSlug = slug || 'practice-area';
      seo = getLegalServiceSeo(cleanSlug, context?.title);
      breadcrumbs.push({ name: 'Legal Solutions', path: '/legal' });
      breadcrumbs.push({ name: seo.h1, path: seo.canonicalPath });
      break;
    }

    case 'location': {
      const cleanCity = slug || 'noida';
      seo = getLocationSeo(cleanCity);
      breadcrumbs.push({ name: 'Locations', path: '/digital-marketing' });
      breadcrumbs.push({ name: seo.h1.replace(/^Digital Marketing Services in /, ''), path: seo.canonicalPath });
      break;
    }

    case 'all-locations':
      seo = STATIC_PAGES_SEO['/digital-marketing'];
      breadcrumbs.push({ name: 'Locations Directory', path: '/digital-marketing' });
      break;

    case 'graphic-details':
      seo = STATIC_PAGES_SEO['/graphic-design'];
      breadcrumbs.push({ name: 'Graphic Design', path: '/graphic-design' });
      break;

    case 'design-item': {
      const cleanSlug = slug || 'item';
      seo = getGraphicDesignItemSeo(cleanSlug, context?.title);
      breadcrumbs.push({ name: 'Graphic Design', path: '/graphic-design' });
      breadcrumbs.push({ name: seo.h1.replace(/ Services$/, ''), path: seo.canonicalPath });
      break;
    }

    case 'payment':
      seo = STATIC_PAGES_SEO['/payment'];
      breadcrumbs.push({ name: 'Pay Online', path: '/payment' });
      break;

    case '404':
      seo = STATIC_PAGES_SEO['/404'];
      break;

    default:
      seo = STATIC_PAGES_SEO['/'];
      break;
  }

  // Override from explicit context if provided
  if (context?.title && page !== 'service-details' && page !== 'location' && page !== '404') {
    seo.title = `${context.title} | Business Volunteers`;
    seo.h1 = context.title;
  }
  if (context?.description) {
    seo.description = context.description;
  }

  const cleanPath = getRoutePath(page, slug);
  const normalizedPath = cleanPath === '/' ? '' : cleanPath;
  const canonicalUrl = `https://businessvolunteers.online${normalizedPath}`;

  return { seo, breadcrumbs, canonicalUrl };
}

/**
 * Updates DOM head elements and dynamic JSON-LD structured data synchronously
 */
export function updatePageSeo(page: PageView, slug?: string, context?: SeoDynamicContext): void {
  if (typeof document === 'undefined') return;

  const { seo, breadcrumbs, canonicalUrl } = resolveSeoMetadata(page, slug, context);

  // 1. Update Document Title
  document.title = seo.title;

  // 2. Helper to set/create meta tag
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 3. Description, Keywords, Author, Robots
  setMetaTag('name', 'description', seo.description);
  setMetaTag('name', 'keywords', seo.keywords.join(', '));
  setMetaTag('name', 'author', 'Business Volunteers');
  setMetaTag('name', 'robots', seo.isNoIndex ? 'noindex, nofollow' : 'index, follow');

  // 4. Canonical URL
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 5. Open Graph Metadata
  const ogImage = context?.ogImage || 'https://businessvolunteers.online/businessvolunteers/logo.png';
  setMetaTag('property', 'og:title', seo.title);
  setMetaTag('property', 'og:description', seo.description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:type', seo.ogType || 'website');
  setMetaTag('property', 'og:image', ogImage);
  setMetaTag('property', 'og:site_name', 'Business Volunteers');
  setMetaTag('property', 'og:locale', 'en_US');

  // 6. Twitter Card Metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', seo.title);
  setMetaTag('name', 'twitter:description', seo.description);
  setMetaTag('name', 'twitter:url', canonicalUrl);
  setMetaTag('name', 'twitter:image', ogImage);

  // 7. Dynamic JSON-LD Structured Data Schema Generation
  const scriptId = 'businessvolunteers-dynamic-schema';
  let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = scriptId;
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  // Build structured data graph
  const graph: any[] = [
    {
      "@type": "Organization",
      "@id": "https://businessvolunteers.online/#organization",
      "name": "Business Volunteers",
      "url": "https://businessvolunteers.online",
      "logo": "https://businessvolunteers.online/businessvolunteers/logo.png",
      "image": "https://businessvolunteers.online/businessvolunteers/logo.png",
      "description": "India's leading performance marketing, generative engine optimization (GEO/AEO), web development, and B2B growth agency.",
      "telephone": "+918586989832",
      "priceRange": "₹₹",
      "sameAs": [
        "https://www.instagram.com/thebusinessvolunteers/",
        "https://www.linkedin.com/company/business-volunteers1",
        "https://www.facebook.com/people/BusinessVolunteers/61579138254807/",
        "https://www.youtube.com/@TheBusinessVolunteers"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Sector 62",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201309",
        "addressCountry": "IN"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://businessvolunteers.online/#website",
      "url": "https://businessvolunteers.online",
      "name": "Business Volunteers",
      "publisher": { "@id": "https://businessvolunteers.online/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://businessvolunteers.online/blogs?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      "name": seo.title,
      "description": seo.description,
      "isPartOf": { "@id": "https://businessvolunteers.online/#website" }
    }
  ];

  // BreadcrumbList Schema
  if (breadcrumbs.length > 1) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      "itemListElement": breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "name": b.name,
        "item": `https://businessvolunteers.online${b.path === '/' ? '' : b.path}`
      }))
    });
  }

  // Contextual Schema: Service / LocalBusiness / Article / FAQPage
  if (page === 'service-details' || page === 'smm' || page === 'design-item' || page === 'legal-details') {
    const serviceSchema: any = {
      "@type": "Service",
      "@id": `${canonicalUrl}#service`,
      "name": seo.h1,
      "serviceType": context?.category || seo.primaryKeyword || "Digital Marketing",
      "description": seo.description,
      "provider": { "@id": "https://businessvolunteers.online/#organization" }
    };
    if (context?.verifiedPrice) {
      serviceSchema.offers = {
        "@type": "Offer",
        "price": context.verifiedPrice.replace(/[^0-9,.]/g, ''),
        "priceCurrency": "INR"
      };
    }
    graph.push(serviceSchema);
  }

  if (page === 'location') {
    const cityName = seo.h1.replace(/^Digital Marketing Services in /, '');
    graph.push({
      "@type": "ProfessionalService",
      "@id": `${canonicalUrl}#localbusiness`,
      "name": `Business Volunteers - ${cityName}`,
      "url": canonicalUrl,
      "description": seo.description,
      "telephone": "+918586989832",
      "areaServed": cityName,
      "provider": { "@id": "https://businessvolunteers.online/#organization" }
    });
  }

  if (page === 'blog-post') {
    graph.push({
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      "isPartOf": { "@id": `${canonicalUrl}#webpage` },
      "headline": context?.title || seo.h1,
      "description": seo.description,
      "datePublished": context?.datePublished || "2026-08-15",
      "dateModified": context?.dateModified || "2026-08-15",
      "author": {
        "@type": "Organization",
        "name": context?.author || "Business Volunteers",
        "url": "https://businessvolunteers.online"
      },
      "publisher": { "@id": "https://businessvolunteers.online/#organization" },
      "keywords": context?.tags?.join(', ') || seo.keywords.join(', ')
    });
  }

  // FAQPage Schema if FAQs are passed and non-empty
  if (context?.faqItems && context.faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": context.faqItems.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    });
  }

  scriptEl.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });
}
