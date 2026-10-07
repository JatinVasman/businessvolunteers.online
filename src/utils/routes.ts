import type { PageView } from '../types';

export interface RouteInfo {
  page: PageView;
  slug?: string;
}

// Service slug to ID and ID to canonical slug mapping
export const SERVICE_SLUG_TO_ID: Record<string, string> = {
  'social-media-marketing': '1',
  'smm': '1',
  'graphic-design': '2',
  'graphics': '2',
  'ugc-reels-creator-marketing': '3',
  'ugc-reels': '3',
  'creator-marketing': '3',
  'dashboard-kpi-systems': '4',
  'kpi-dashboards': '4',
  'dashboards': '4',
  'seo': '5',
  'seo-services': '5',
  'search-engine-optimization': '5',
  'google-ads': '6',
  'google-ads-management': '6',
  'ppc': '6',
  'meta-ads': '7',
  'meta-ads-management': '7',
  'facebook-ads': '7',
  'instagram-ads': '7',
  'paid-ads': '7',
  'web-development': '8',
  'website-development': '8',
  'custom-web-apps': '8',
  'whatsapp-marketing': '9',
  'whatsapp-api': '9',
  'email-marketing': '10',
  'email-marketing-funnels': '10',
  'influencer-marketing': '11',
  'b2b-lead-generation': '12',
  'lead-generation': '12',
  'b2b-leads': '12',
  'ecommerce-scaling': '13',
  'e-commerce-scaling': '13',
  'ecommerce-marketing': '13',
  'e-commerce-marketing': '13',
  'ecommerce': '13',
  'e-commerce': '13',
  'cro': '14',
  'conversion-rate-optimization': '14',
  'conversion-optimization': '14',
  'local-seo': '15',
  'local-business-seo': '15',
  'ai-automation-systems': '16',
  'ai-automation': '16',
  'ai-systems': '16',
  'brand-identity-design': '17',
  'brand-identity': '17',
  'branding': '17',
  'logo-branding': '17',
  'logo-and-branding': '17'
};

export const SERVICE_ID_TO_SLUG: Record<string, string> = {
  '1': 'social-media-marketing',
  '2': 'graphic-design',
  '3': 'ugc-reels-creator-marketing',
  '4': 'dashboard-kpi-systems',
  '5': 'seo',
  '6': 'google-ads',
  '7': 'meta-ads',
  '8': 'web-development',
  '9': 'whatsapp-marketing',
  '10': 'email-marketing',
  '11': 'influencer-marketing',
  '12': 'b2b-lead-generation',
  '13': 'ecommerce-scaling',
  '14': 'cro',
  '15': 'local-seo',
  '16': 'ai-automation-systems',
  '17': 'brand-identity-design'
};

/**
 * Parses pathname and search parameters into a normalized PageView and slug
 */
export function parseRoute(pathname: string, search: string): RouteInfo {
  // 1. Check legacy query parameters for backwards compatibility
  const params = new URLSearchParams(search);
  const pageParam = params.get('page');
  const idParam = params.get('id') || params.get('service') || params.get('q');

  if (pageParam) {
    switch (pageParam) {
      case 'home':
        return { page: 'home' };
      case 'services':
        if (idParam) {
          const serviceId = SERVICE_SLUG_TO_ID[idParam.toLowerCase()] || idParam;
          return { page: 'service-details', slug: serviceId };
        }
        return { page: 'services' };
      case 'service-details':
        return { page: 'service-details', slug: idParam ? (SERVICE_SLUG_TO_ID[idParam.toLowerCase()] || idParam) : undefined };
      case 'blog':
      case 'blogs':
        return { page: 'blog' };
      case 'blog-post':
        return { page: 'blog-post', slug: idParam || undefined };
      case 'about':
        return { page: 'about' };
      case 'contact':
        return { page: 'contact' };
      case 'industries':
        return { page: 'industries', slug: idParam || undefined };
      case 'portfolio':
        return { page: 'portfolio' };
      case 'smm':
        return { page: 'smm' };
      case 'legal':
        return { page: 'legal' };
      case 'legal-details':
        return { page: 'legal-details', slug: idParam || undefined };
      case 'location':
        return { page: 'location', slug: idParam || undefined };
      case 'all-locations':
        return { page: 'all-locations' };
      case 'graphic-details':
        return { page: 'graphic-details', slug: idParam || undefined };
      case 'design-item':
        return { page: 'design-item', slug: idParam || undefined };
      case 'payment':
      case 'pay':
        return { page: 'payment' };
      default:
        return { page: pageParam as PageView, slug: idParam || undefined };
    }
  }

  // 2. Parse clean SEO path
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  if (!cleanPath) {
    return { page: 'home' };
  }

  const rawSegments = cleanPath.split('/');
  const segments = rawSegments.map(s => decodeURIComponent(s).toLowerCase());
  const [first, ...rest] = segments;
  const second = rest.join('/');

  if (first === 'services' || first === 'service') {
    if (second) {
      const mappedId = SERVICE_SLUG_TO_ID[second] || second;
      return { page: 'service-details', slug: mappedId };
    }
    return { page: 'services' };
  }

  if (first === 'blogs' || first === 'blog') {
    if (second) {
      let slug = decodeURIComponent(rawSegments.slice(1).join('/')).replace(/^strategy\//, '');
      return { page: 'blog-post', slug };
    }
    return { page: 'blog' };
  }

  if (first === 'html-sitemap' || first === 'sitemap') {
    return { page: 'html-sitemap' };
  }

  if (first === 'about' || first === 'about-us') {
    if (second) {
      return { page: 'about', slug: second };
    }
    return { page: 'about' };
  }

  if (first === 'contact' || first === 'contact-us') {
    return { page: 'contact' };
  }

  if (first === 'industries' || first === 'industry') {
    return { page: 'industries', slug: second || undefined };
  }

  if (first === 'portfolio' || first === 'our-work' || first === 'work') {
    return { page: 'portfolio' };
  }

  if (first === 'smm' || first === 'social-media-marketing') {
    return { page: 'smm' };
  }

  if (first === 'legal') {
    if (second) {
      return { page: 'legal-details', slug: rawSegments.slice(1).join('/') };
    }
    return { page: 'legal' };
  }

  if (first === 'legal-details') {
    return { page: 'legal-details', slug: rawSegments.slice(1).join('/') };
  }

  if (first === 'digital-marketing' || first === 'digital-marketing-agency' || first === 'digital-marketing-services') {
    if (second) {
      const city = second
        .toLowerCase()
        .replace(/^digital-marketing-agency-in-/, '')
        .replace(/^digital-marketing-in-/, '')
        .replace(/^digital-marketing-/, '')
        .replace(/^in\//, '')
        .replace(/^in-/, '')
        .replace(/^agency-in-/, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      return { page: 'location', slug: city };
    }
    return { page: 'all-locations' };
  }

  if (first.startsWith('digital-marketing-in-') || first.startsWith('digital-marketing-agency-in-') || first.startsWith('digital-marketing-')) {
    const city = first
      .toLowerCase()
      .replace(/^digital-marketing-agency-in-/, '')
      .replace(/^digital-marketing-in-/, '')
      .replace(/^digital-marketing-/, '')
      .replace(/^in-/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return { page: 'location', slug: city };
  }

  if (first === 'location' || first === 'locations') {
    if (second) {
      const city = second
        .toLowerCase()
        .replace(/^digital-marketing-agency-in-/, '')
        .replace(/^digital-marketing-in-/, '')
        .replace(/^digital-marketing-/, '')
        .replace(/^in\//, '')
        .replace(/^in-/, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      return { page: 'location', slug: city };
    }
    return { page: 'all-locations' };
  }

  if (first === 'all-locations') {
    return { page: 'all-locations' };
  }

  if (first === 'graphic-design' || first === 'graphic-details' || first === 'graphics') {
    if (second) {
      return { page: 'design-item', slug: second };
    }
    return { page: 'graphic-details' };
  }

  if (first === 'design-item') {
    return { page: 'design-item', slug: second };
  }

  if (first === 'payment' || first === 'pay') {
    return { page: 'payment' };
  }

  if (first === '404' || first === 'not-found') {
    return { page: '404' };
  }

  return { page: '404' };
}

/**
 * Returns the canonical clean SEO path for a given page and slug
 */
export function getRoutePath(page: PageView, slug?: string): string {
  switch (page) {
    case 'home':
      return '/';
    case 'services':
      return '/services';
    case 'service-details': {
      if (!slug) return '/services';
      const cleanSlug = SERVICE_ID_TO_SLUG[slug] || slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `/services/${cleanSlug}`;
    }
    case 'blog':
      return '/blogs';
    case 'blog-post': {
      if (!slug) return '/blogs';
      const cleanSlug = slug.replace(/^strategy\//, '').replace(/[^a-zA-Z0-9_-]+/g, '-');
      return `/blogs/${cleanSlug}`;
    }
    case 'html-sitemap':
      return '/html-sitemap';
    case 'about': {
      if (!slug) return '/about';
      let cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (cleanSlug === 'harsh' || cleanSlug === 'harsh-chaudhary') cleanSlug = 'founder';
      if (cleanSlug === 'khwahish' || cleanSlug === 'khwahish-sahai' || cleanSlug === 'cofounder') cleanSlug = 'co-founder';
      return `/about/${cleanSlug}`;
    }
    case 'contact':
      return '/contact';
    case 'industries': {
      if (!slug) return '/industries';
      let cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (!cleanSlug.startsWith('marketing-for-') && !cleanSlug.startsWith('marketing-')) {
        cleanSlug = `marketing-for-${cleanSlug}`;
      }
      return `/industries/${cleanSlug}`;
    }
    case 'portfolio':
      return '/portfolio';
    case 'smm':
      return '/smm';
    case 'legal':
      return '/legal';
    case 'legal-details': {
      if (!slug) return '/legal';
      const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `/legal/${cleanSlug}`;
    }
    case 'location': {
      if (!slug) return '/digital-marketing';
      const cleanSlug = slug.toLowerCase()
        .replace(/^digital-marketing-agency-in-/, '')
        .replace(/^digital-marketing-in-/, '')
        .replace(/^digital-marketing-/, '')
        .replace(/^in\//, '')
        .replace(/^in-/, '')
        .replace(/^location-/, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      return `/digital-marketing/${cleanSlug}`;
    }
    case 'all-locations':
      return '/digital-marketing';
    case 'graphic-details':
      return slug ? `/graphic-design#${encodeURIComponent(slug)}` : '/graphic-design';
    case 'design-item': {
      if (!slug) return '/graphic-design';
      const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `/graphic-design/${cleanSlug}`;
    }
    case 'payment':
      return '/payment';
    case '404':
      return '/404';
    default:
      return '/';
  }
}
