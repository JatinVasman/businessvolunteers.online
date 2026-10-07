import { ALL_BLOGS } from '../data/blogData';

export interface PageSeoMeta {
  title: string;
  description: string;
  keywords: string[];
  canonicalPath: string;
  h1: string;
  ogType?: 'website' | 'article';
  searchIntent?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  isNoIndex?: boolean;
}

export const STATIC_PAGES_SEO: Record<string, PageSeoMeta> = {
  '/': {
    title: 'Digital Marketing Agency for Business Growth | Business Volunteers',
    description: 'Scale your brand with performance marketing, SEO, high-converting web development, Google Ads, and viral social media funnels. Zero lock-in contracts.',
    keywords: ['digital marketing agency', 'performance marketing agency', 'SEO services', 'Google ads management', 'web development', 'social media marketing', 'India'],
    canonicalPath: '/',
    h1: 'We Build Brands That Get Noticed.',
    ogType: 'website',
    searchIntent: 'Commercial / Transactional — Looking for top digital growth agency in India',
    primaryKeyword: 'digital marketing agency'
  },
  '/services': {
    title: 'Digital Marketing & Growth Services — Pricing & Strategy | Business Volunteers',
    description: 'Explore full-suite digital marketing services: SEO, Google & Meta Ads, Web Development, UGC Reels, WhatsApp Funnels, and Graphic Design with transparent pricing.',
    keywords: ['digital marketing services', 'performance marketing packages', 'SEO services', 'PPC agency', 'web development services'],
    canonicalPath: '/services',
    h1: 'Services & Transparent Pricing',
    ogType: 'website',
    searchIntent: 'Commercial Investigation — Exploring full service agency offerings & pricing',
    primaryKeyword: 'digital marketing services'
  },
  '/about': {
    title: 'About Business Volunteers — Leadership, Mission & Performance Marketing',
    description: 'Learn about Business Volunteers leadership, engineering philosophy, and founder-led performance marketing methodology driving measurable client growth across 89+ sectors.',
    keywords: ['about business volunteers', 'digital marketing leadership', 'Harsh Chaudhary', 'Khwahish Sahai', 'growth agency founders'],
    canonicalPath: '/about',
    h1: 'About Business Volunteers — Leadership, Mission & Performance Marketing',
    ogType: 'website',
    searchIntent: 'Informational / Navigational — Learning about company leadership and credibility',
    primaryKeyword: 'about business volunteers'
  },
  '/contact': {
    title: 'Contact Business Volunteers — Free 30-Min Growth Strategy Consultation',
    description: 'Schedule a free 30-minute growth strategy session with Business Volunteers marketing specialists. Direct access to founders, zero lock-in terms, and fast onboarding.',
    keywords: ['contact digital marketing agency', 'free marketing consultation', 'book strategy session', 'digital marketing quote'],
    canonicalPath: '/contact',
    h1: 'Contact Business Volunteers — Free 30-Min Strategy Consultation',
    ogType: 'website',
    searchIntent: 'Transactional — Booking consultation or getting a proposal',
    primaryKeyword: 'contact digital marketing agency'
  },
  '/portfolio': {
    title: 'Client Case Studies & Verified Growth Results | Business Volunteers',
    description: 'Discover verified client case studies, ROAS performance metrics, and growth results delivered across SEO, Google Ads, Meta Ads, and custom web applications.',
    keywords: ['digital marketing case studies', 'marketing agency results', 'ROAS case studies', 'SEO portfolio', 'client success stories'],
    canonicalPath: '/portfolio',
    h1: 'Our Work Gallery',
    ogType: 'website',
    searchIntent: 'Commercial / Proof — Evaluating agency track record and ROI results',
    primaryKeyword: 'digital marketing case studies'
  },
  '/industries': {
    title: '89+ Industry Digital Marketing & Growth Solutions | Business Volunteers',
    description: 'Specialized digital marketing, SEO, and lead generation frameworks tailored for 89+ industries including Healthcare, Real Estate, E-Commerce, Education, and Tech.',
    keywords: ['industry digital marketing', 'healthcare marketing', 'real estate marketing', 'b2b marketing', 'ecommerce growth solutions'],
    canonicalPath: '/industries',
    h1: '89 Sectors Scaled. Zero Generic Marketing.',
    ogType: 'website',
    searchIntent: 'Commercial — Finding niche-specific marketing strategies and solutions',
    primaryKeyword: 'industry digital marketing'
  },
  '/blogs': {
    title: 'Digital Marketing, SEO & AI Search Insights Blog | Business Volunteers',
    description: 'Read expert articles and in-depth pillar guides on SEO, AI search optimization (GEO/AEO), Google Ads scaling, social media growth, and B2B marketing funnels.',
    keywords: ['digital marketing blog', 'SEO guides', 'generative engine optimization blog', 'PPC strategies', 'growth marketing articles'],
    canonicalPath: '/blogs',
    h1: 'The Business Volunteers Blog',
    ogType: 'website',
    searchIntent: 'Informational — Researching digital marketing tactics and SEO strategies',
    primaryKeyword: 'digital marketing blog'
  },
  '/smm': {
    title: 'Social Media Marketing Agency & Viral Reels Strategy | Business Volunteers',
    description: 'Full-funnel organic and paid social media management for Instagram, LinkedIn, and Facebook designed to build brand authority and generate qualified buyer leads.',
    keywords: ['social media marketing agency', 'SMM services', 'Instagram reels marketing', 'LinkedIn B2B marketing', 'social media management pricing'],
    canonicalPath: '/smm',
    h1: 'Full-Funnel Organic & Paid Social Media Management',
    ogType: 'website',
    searchIntent: 'Commercial — Hiring a social media marketing agency',
    primaryKeyword: 'social media marketing agency'
  },
  '/html-sitemap': {
    title: 'HTML Sitemap & Complete Website Directory | Business Volunteers',
    description: 'Browse the complete index of Business Volunteers services, 89+ industry solutions, 50+ local markets, legal frameworks, and digital marketing blog articles.',
    keywords: ['html sitemap', 'website directory', 'site index', 'business volunteers pages', 'all services'],
    canonicalPath: '/html-sitemap',
    h1: 'Complete Website Directory & HTML Sitemap',
    ogType: 'website',
    searchIntent: 'Navigational — Full site navigation and directory browsing',
    primaryKeyword: 'html sitemap'
  },
  '/legal': {
    title: 'Legal Marketing & Corporate Practice Growth Solutions | Business Volunteers',
    description: 'Specialized digital marketing, client acquisition funnels, and personal branding tailored for Law Firms, Advocates, Corporate Lawyers, and CA/CS professionals.',
    keywords: ['legal marketing agency', 'law firm digital marketing', 'lawyer SEO services', 'trademark filing marketing', 'corporate legal growth'],
    canonicalPath: '/legal',
    h1: 'Legal Practice Marketing & Corporate Solutions',
    ogType: 'website',
    searchIntent: 'Commercial / Transactional — Law firms seeking client acquisition systems',
    primaryKeyword: 'legal marketing agency'
  },
  '/digital-marketing': {
    title: 'Domestic & Global Locations Directory | Business Volunteers',
    description: 'Explore Business Volunteers digital marketing coverage across 500+ Indian cities and international markets including Tier 1 metros, Tier 2/3 hubs, USA, UK, and Dubai.',
    keywords: ['digital marketing locations', 'SEO agency India', 'digital marketing agency Delhi NCR', 'digital marketing Mumbai', 'local marketing directory'],
    canonicalPath: '/digital-marketing',
    h1: 'Explore Our Complete Digital Marketing Locations Directory',
    ogType: 'website',
    searchIntent: 'Navigational / Commercial — Finding local digital marketing agency branch/services',
    primaryKeyword: 'digital marketing locations'
  },
  '/graphic-design': {
    title: 'Graphic Design Services & Per-Design Transparent Pricing | Business Volunteers',
    description: 'Custom social media creatives, corporate pitch decks, brochures, packaging labels, and logos with transparent per-design pricing and 24-hour turnaround.',
    keywords: ['graphic design services', 'per design pricing', 'social media post design', 'logo design services', 'packaging design India'],
    canonicalPath: '/graphic-design',
    h1: 'Graphic Design Services & Transparent Price List',
    ogType: 'website',
    searchIntent: 'Commercial / Transactional — Ordering graphic designs with clear per-unit rates',
    primaryKeyword: 'graphic design services'
  },
  '/payment': {
    title: 'Pay Online — UPI QR Code & Official Bank Transfer Details | Business Volunteers',
    description: 'Official payment portal for Business Volunteers. Pay retainers and invoices securely via PhonePe, Google Pay, BHIM, UPI QR, or direct Union Bank of India transfer.',
    keywords: ['business volunteers payment', 'pay business volunteers', 'upi qr payment', 'union bank of india', 'bank transfer details', 'pay online'],
    canonicalPath: '/payment',
    h1: 'Make a Payment to Business Volunteers',
    ogType: 'website',
    searchIntent: 'Transactional — Completing payment for agency services and milestone invoices',
    primaryKeyword: 'business volunteers payment'
  },
  '/404': {
    title: '404 - Page Not Found | Business Volunteers',
    description: 'The requested page could not be found. Explore our services, industry marketing hubs, blogs, or contact our team.',
    keywords: ['404', 'not found'],
    canonicalPath: '/404',
    h1: '404 - Page Not Found',
    ogType: 'website',
    isNoIndex: true
  }
};

export const SERVICES_SEO: Record<string, PageSeoMeta> = {
  'seo': {
    title: 'SEO Services & Search Engine Optimization Agency | Business Volunteers',
    description: 'Dominate Google search results with technical SEO, Generative Engine Optimization (GEO/AEO), high-intent keyword ranking, and data-driven link building.',
    keywords: ['SEO services', 'search engine optimization agency', 'technical SEO', 'generative engine optimization', 'GEO agency India', 'local SEO'],
    canonicalPath: '/services/seo',
    h1: 'Search Engine Optimization (SEO) Services',
    searchIntent: 'Commercial / Transactional — Looking for top SEO agency to rank on Google',
    primaryKeyword: 'SEO services'
  },
  'social-media-marketing': {
    title: 'Social Media Marketing Agency & SMM Retainers | Business Volunteers',
    description: 'Build brand presence and drive inbound leads on Instagram, Facebook, and LinkedIn with custom content calendars, viral reels, and active community moderation.',
    keywords: ['social media marketing agency', 'SMM retainers', 'Instagram marketing agency', 'LinkedIn lead generation', 'reels content strategy'],
    canonicalPath: '/services/social-media-marketing',
    h1: 'Social Media Marketing Services',
    searchIntent: 'Commercial / Transactional — Hiring SMM agency for social growth and leads',
    primaryKeyword: 'social media marketing agency'
  },
  'graphic-design': {
    title: 'Graphic Design Services — Per-Design Rates & Fast Turnaround | Business Volunteers',
    description: 'Bespoke social creatives, packaging, logos, sales brochures, and 3D mockups. Clear transparent pricing starting at ₹200 with rapid 24-48 hour turnaround.',
    keywords: ['graphic design services', 'per design pricing', 'social media creatives', 'brochure design', 'product packaging design'],
    canonicalPath: '/services/graphic-design',
    h1: 'Graphic Design Services',
    searchIntent: 'Commercial / Transactional — Purchasing high-converting design assets',
    primaryKeyword: 'graphic design services'
  },
  'ugc-reels-creator-marketing': {
    title: 'UGC Reels & Creator Marketing Agency | Business Volunteers',
    description: 'Drive social conversions with authentic User-Generated Content (UGC) videos scripted by direct-response copywriters and filmed by vetted creators.',
    keywords: ['UGC reels agency', 'creator marketing', 'user generated content India', 'viral reels agency', 'short form video ads'],
    canonicalPath: '/services/ugc-reels-creator-marketing',
    h1: 'UGC Reels & Creator Marketing Services',
    searchIntent: 'Commercial — Brands looking for UGC creators and high-converting video reels',
    primaryKeyword: 'UGC reels creator marketing'
  },
  'dashboard-kpi-systems': {
    title: 'Dashboard & KPI Systems — Live Marketing Analytics | Business Volunteers',
    description: 'Eliminate blind spots with custom real-time business intelligence dashboards connecting Google Ads, Meta Ads, CRM data, and revenue metrics in one unified view.',
    keywords: ['dashboard KPI systems', 'marketing analytics dashboard', 'custom BI dashboards', 'Looker Studio dashboards', 'revenue tracking dashboard'],
    canonicalPath: '/services/dashboard-kpi-systems',
    h1: 'Dashboard & KPI Systems',
    searchIntent: 'Commercial — Businesses wanting real-time marketing KPI tracking',
    primaryKeyword: 'dashboard KPI systems'
  },
  'google-ads': {
    title: 'Google Ads Management & PPC Advertising Agency | Business Volunteers',
    description: 'Capture high-intent search traffic and maximize ROAS with expert Google Ads management spanning Search, Performance Max, YouTube Ads, and Display campaigns.',
    keywords: ['Google Ads management', 'PPC advertising agency', 'Google Ads agency India', 'high ROAS PPC', 'Performance Max management'],
    canonicalPath: '/services/google-ads',
    h1: 'Google Ads Management Services',
    searchIntent: 'Commercial / Transactional — Hiring agency to run profitable Google PPC ads',
    primaryKeyword: 'Google Ads management'
  },
  'meta-ads': {
    title: 'Meta Ads Agency — Facebook & Instagram Advertising | Business Volunteers',
    description: 'Scale customer acquisition with high-converting Facebook and Instagram ad campaigns. Data-driven creative testing, Advantage+ funnels, and retargeting systems.',
    keywords: ['Meta ads agency', 'Facebook advertising agency', 'Instagram ads management', 'paid social agency', 'Advantage plus ads'],
    canonicalPath: '/services/meta-ads',
    h1: 'Meta Ads (Facebook & Instagram) Management',
    searchIntent: 'Commercial / Transactional — Brands scaling via paid social campaigns',
    primaryKeyword: 'Meta ads agency'
  },
  'web-development': {
    title: 'Website Development Services for Growing Businesses | Business Volunteers',
    description: 'Custom, high-converting web applications built with React, Next.js, and mobile-first responsive architecture. Optimized for fast loading speeds, SEO, and conversions.',
    keywords: ['website development services', 'custom web app development', 'Next.js web development', 'React web development', 'conversion rate optimized websites'],
    canonicalPath: '/services/web-development',
    h1: 'Website Development Services',
    searchIntent: 'Commercial / Transactional — Building custom, fast, high-converting web apps',
    primaryKeyword: 'website development services'
  },
  'whatsapp-marketing': {
    title: 'WhatsApp Marketing & WhatsApp Business API Solutions | Business Volunteers',
    description: 'Automate customer support, lead qualification, and promotional broadcast sequences with official WhatsApp Business API integration and CRM automation.',
    keywords: ['WhatsApp marketing', 'WhatsApp Business API', 'WhatsApp automation agency', 'lead qualification bot', 'broadcast messaging'],
    canonicalPath: '/services/whatsapp-marketing',
    h1: 'WhatsApp Marketing & API Automation',
    searchIntent: 'Commercial — Setting up WhatsApp API funnels and lead nurturing',
    primaryKeyword: 'WhatsApp marketing'
  },
  'email-marketing': {
    title: 'Email Marketing Services & Automated Lead Funnels | Business Volunteers',
    description: 'Turn subscribers into repeat buyers with behavioral email automation, newsletter management, high-converting copy, and inbox deliverability optimization.',
    keywords: ['email marketing services', 'automated email funnels', 'retention marketing agency', 'Klaviyo email agency', 'B2B email automation'],
    canonicalPath: '/services/email-marketing',
    h1: 'Email Marketing & Funnels',
    searchIntent: 'Commercial — Scaling lifecycle and automated email marketing campaigns',
    primaryKeyword: 'email marketing services'
  },
  'influencer-marketing': {
    title: 'Influencer Marketing Agency — Creator Collaborations | Business Volunteers',
    description: 'Boost brand trust and reach through vetted micro and macro influencer campaigns across Instagram, YouTube, and LinkedIn with full contract and ROI tracking.',
    keywords: ['influencer marketing agency', 'creator collaborations', 'micro influencer campaigns', 'YouTube sponsorships', 'Instagram influencer management'],
    canonicalPath: '/services/influencer-marketing',
    h1: 'Influencer Marketing Services',
    searchIntent: 'Commercial — Brands hiring creators for promotional endorsements',
    primaryKeyword: 'influencer marketing agency'
  },
  'b2b-lead-generation': {
    title: 'B2B Lead Generation & Account-Based Funnels | Business Volunteers',
    description: 'Fill sales calendars with qualified decision-maker meetings using multi-touch outbound funnels, LinkedIn automation, targeted email, and CRM workflows.',
    keywords: ['B2B lead generation', 'account based marketing', 'LinkedIn B2B prospecting', 'qualified appointment setting', 'sales pipeline agency'],
    canonicalPath: '/services/b2b-lead-generation',
    h1: 'B2B Lead Generation Services',
    searchIntent: 'Commercial / Transactional — B2B companies seeking qualified sales meetings',
    primaryKeyword: 'B2B lead generation'
  },
  'ecommerce-scaling': {
    title: 'E-commerce Marketing & Scaling Services | Business Volunteers',
    description: 'Scale D2C and e-commerce store revenue with full-funnel paid media, high-converting product pages, shopping feed management, and retention systems.',
    keywords: ['ecommerce marketing agency', 'D2C scaling', 'Shopify growth agency', 'Google shopping ads', 'ecommerce performance marketing'],
    canonicalPath: '/services/ecommerce-scaling',
    h1: 'E-Commerce Scaling Services',
    searchIntent: 'Commercial / Transactional — E-commerce brands aiming for revenue scaling',
    primaryKeyword: 'ecommerce marketing'
  },
  'cro': {
    title: 'Conversion Rate Optimization (CRO) Services | Business Volunteers',
    description: 'Increase conversion rates and maximize revenue per visitor with data-driven A/B testing, user journey audits, heuristic analysis, and UX enhancements.',
    keywords: ['conversion rate optimization', 'CRO services', 'landing page optimization', 'A/B testing agency', 'website conversion audit'],
    canonicalPath: '/services/cro',
    h1: 'Conversion Rate Optimization (CRO) Services',
    searchIntent: 'Commercial — Improving website lead capture and checkout conversion rates',
    primaryKeyword: 'conversion rate optimization'
  },
  'local-seo': {
    title: 'Local SEO Services & Google Maps Ranking Agency | Business Volunteers',
    description: 'Dominate local "near me" searches and Google Maps 3-pack rankings with verified Google Business Profile optimization, local citations, and geo-targeted landing pages.',
    keywords: ['local SEO services', 'Google Business Profile optimization', 'Google maps ranking', 'near me searches', 'local business SEO agency'],
    canonicalPath: '/services/local-seo',
    h1: 'Local Business SEO Services',
    searchIntent: 'Commercial / Local — Businesses wanting top local map and search visibility',
    primaryKeyword: 'local SEO services'
  },
  'ai-automation-systems': {
    title: 'AI Automation Systems for Sales & Operations | Business Volunteers',
    description: 'Deploy AI-powered customer service agents, automated lead nurturing workflows, and smart CRM integrations to cut manual labor and accelerate response times.',
    keywords: ['AI automation systems', 'AI business automation', 'CRM AI integration', 'conversational AI agents', 'marketing automation'],
    canonicalPath: '/services/ai-automation-systems',
    h1: 'AI & Automation Systems',
    searchIntent: 'Commercial — Implementing AI agents and workflow automations',
    primaryKeyword: 'AI automation systems'
  },
  'brand-identity-design': {
    title: 'Brand Identity Design & Strategic Positioning | Business Volunteers',
    description: 'Craft unforgettable brand identities, guidelines, typography systems, and visual positioning that establish instant authority and command premium pricing.',
    keywords: ['brand identity design', 'branding agency', 'corporate brand guidelines', 'visual identity system', 'brand positioning agency'],
    canonicalPath: '/services/brand-identity-design',
    h1: 'Brand Identity & Strategy Services',
    searchIntent: 'Commercial / Creative — Creating comprehensive brand identity systems',
    primaryKeyword: 'brand identity design'
  }
};

/**
 * Returns SEO metadata for a location page
 */
export function getLocationSeo(citySlug: string): PageSeoMeta {
  const rawSlug = (citySlug || 'noida').toLowerCase().trim();
  const cleanCity = rawSlug
    .replace(/^digital-marketing-agency-in-/, '')
    .replace(/^digital-marketing-in-/, '')
    .replace(/^digital-marketing-/, '')
    .replace(/^in\//, '')
    .replace(/^in-/, '')
    .replace(/^location-/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'noida';

  const formattedName = cleanCity
    .split('-')
    .map(w => w.toUpperCase() === 'NCR' || w.toUpperCase() === 'USA' || w.toUpperCase() === 'UK' ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `Digital Marketing Agency in ${formattedName} | Business Volunteers`,
    description: `Leading digital marketing agency in ${formattedName}. Performance marketing, local SEO, Google Ads, Meta Ads, and web design tailored for ${formattedName} businesses.`,
    keywords: [
      `digital marketing agency in ${formattedName}`,
      `SEO company in ${formattedName}`,
      `Google ads agency ${formattedName}`,
      `social media marketing ${formattedName}`,
      `web development ${formattedName}`
    ],
    canonicalPath: `/digital-marketing/${cleanCity}`,
    h1: `Digital Marketing Services in ${formattedName}`,
    ogType: 'website',
    searchIntent: `Local Commercial — Finding top digital marketing & SEO agency in ${formattedName}`,
    primaryKeyword: `digital marketing agency in ${formattedName}`
  };
}

/**
 * Returns SEO metadata for an industry landing page
 */
export function getIndustrySeo(industrySlug: string, industryName?: string): PageSeoMeta {
  const rawSlug = (industrySlug || '').toLowerCase().trim();
  const cleanSlug = rawSlug
    .replace(/^marketing-for-/, '')
    .replace(/^marketing-to-/, '')
    .replace(/^marketing-/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const name = industryName || cleanSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `Digital Marketing for ${name} — Client Acquisition & Growth | Business Volunteers`,
    description: `Tailored digital marketing, SEO, and performance ad frameworks for ${name}. Drive verified client inquiries, build brand authority, and scale revenue.`,
    keywords: [
      `digital marketing for ${name.toLowerCase()}`,
      `${name.toLowerCase()} SEO services`,
      `lead generation for ${name.toLowerCase()}`,
      `marketing strategy for ${name.toLowerCase()}`
    ],
    canonicalPath: `/industries/marketing-for-${cleanSlug}`,
    h1: `Digital Marketing for ${name}`,
    ogType: 'website',
    searchIntent: `Commercial — Sector-specific digital marketing strategies for ${name}`,
    primaryKeyword: `digital marketing for ${name.toLowerCase()}`
  };
}

/**
 * Returns SEO metadata for a blog post
 */
export function getBlogPostSeo(blogSlug: string, contextTitle?: string, contextDesc?: string): PageSeoMeta {
  const rawSlug = (blogSlug || '').trim();
  const decoded = decodeURIComponent(rawSlug);
  const blog = ALL_BLOGS.find(b =>
    b.slug === decoded ||
    b.slug === rawSlug ||
    b.slug.replace(/^strategy\//, '') === decoded.replace(/^strategy\//, '') ||
    b.slug.toLowerCase() === decoded.toLowerCase()
  );

  if (blog) {
    const cleanSlug = blog.slug.replace(/^strategy\//, '').replace(/[^a-zA-Z0-9_-]+/g, '-');
    return {
      title: `${blog.title} | Business Volunteers`,
      description: blog.excerpt || `Read our in-depth framework on ${blog.title}. Proven digital growth, SEO, and performance marketing strategies from Business Volunteers.`,
      keywords: [blog.keyword, blog.keyword2, ...(blog.tags || []), 'Business Volunteers'].filter(Boolean) as string[],
      canonicalPath: `/blogs/${cleanSlug}`,
      h1: blog.title,
      ogType: 'article',
      searchIntent: `Informational — ${blog.title}`,
      primaryKeyword: blog.keyword || blog.title
    };
  }

  const cleanFallbackSlug = (rawSlug || 'guide').replace(/^strategy\//, '').replace(/[^a-zA-Z0-9_-]+/g, '-');
  const fallbackTitle = contextTitle || decoded.split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || 'Digital Marketing Strategy Guide';
  return {
    title: `${fallbackTitle} | Business Volunteers`,
    description: contextDesc || 'Read practical frameworks on digital marketing, SEO, Generative AI search, and B2B growth funnels.',
    keywords: ['digital marketing blog', 'SEO insights', 'growth strategies'],
    canonicalPath: `/blogs/${cleanFallbackSlug}`,
    h1: fallbackTitle,
    ogType: 'article',
    searchIntent: 'Informational — Digital Marketing Strategy Guide',
    primaryKeyword: fallbackTitle
  };
}

/**
 * Returns SEO metadata for graphic design item
 */
export function getGraphicDesignItemSeo(itemSlug: string, itemName?: string): PageSeoMeta {
  const cleanSlug = itemSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const name = itemName || cleanSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${name} Services — Formats, Pricing & Turnaround | Business Volunteers`,
    description: `Professional ${name.toLowerCase()} services with fast 24-48 hour turnaround, print-ready source files, and transparent per-design pricing.`,
    keywords: [
      `${name.toLowerCase()}`,
      `professional ${name.toLowerCase()}`,
      `${name.toLowerCase()} pricing`,
      `custom ${name.toLowerCase()}`
    ],
    canonicalPath: `/graphic-design/${cleanSlug}`,
    h1: `${name} Services`,
    ogType: 'website',
    searchIntent: `Commercial / Transactional — Ordering custom ${name.toLowerCase()}`,
    primaryKeyword: `${name.toLowerCase()}`
  };
}

/**
 * Returns SEO metadata for legal practice area
 */
export function getLegalServiceSeo(serviceSlug: string, serviceName?: string): PageSeoMeta {
  const cleanSlug = serviceSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const name = serviceName || cleanSlug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${name} — Legal Practice Marketing & Compliance | Business Volunteers`,
    description: `Specialized digital acquisition and client intake workflows for ${name.toLowerCase()}. Build trusted authority and acquire high-value commercial clients.`,
    keywords: [
      `${name.toLowerCase()}`,
      `legal marketing for ${name.toLowerCase()}`,
      `${name.toLowerCase()} legal services`,
      `law firm marketing ${name.toLowerCase()}`
    ],
    canonicalPath: `/legal/${cleanSlug}`,
    h1: `${name}`,
    ogType: 'website',
    searchIntent: `Commercial — Law practice acquisition and marketing for ${name.toLowerCase()}`,
    primaryKeyword: `${name.toLowerCase()}`
  };
}
