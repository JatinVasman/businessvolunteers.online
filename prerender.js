import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://businessvolunteers.online';
const DIST_DIR = path.join(process.cwd(), 'dist');
const BASE_HTML_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(BASE_HTML_PATH)) {
  console.error('❌ dist/index.html not found! Run vite build before prerendering.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(BASE_HTML_PATH, 'utf8');

// Helper to extract routes from public/sitemap.xml
function getSitemapUrls() {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    return ['/'];
  }
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = sitemapContent.matchAll(/<loc>https:\/\/businessvolunteers\.online([^<]*)<\/loc>/g);
  const routes = new Set(['/']);
  for (const match of locMatches) {
    const r = match[1] || '/';
    routes.add(r);
  }
  return Array.from(routes);
}

// Derive Metadata for a route
function getRouteMetadata(routePath) {
  const cleanPath = routePath.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath ? cleanPath.split('/') : [];
  const first = segments[0] || 'home';
  const second = segments[1] || '';

  const defaultMeta = {
    title: 'Business Volunteers — AI-Powered Digital Marketing Agency in Noida',
    description: 'Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google & Meta ads, social media, web design, and graphic design.',
    h1: 'We Build Brands That Get Noticed.',
    ogType: 'website',
    canonicalPath: routePath,
    category: 'Digital Marketing',
    faqItems: []
  };

  // 1. Root / Core Pages
  if (!cleanPath || first === 'home') {
    return {
      ...defaultMeta,
      title: 'Business Volunteers — AI-Powered Digital Marketing Agency in Noida',
      description: 'Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google & Meta ads, social media, web design, and graphic design.',
      h1: 'We Build Brands That Get Noticed.',
      faqItems: [
        { q: 'What makes Business Volunteers different?', a: 'We provide founder-led execution, zero lock-in contracts, transparent KPI dashboards, and post-pay milestones on selected projects.' },
        { q: 'How fast can campaigns launch?', a: 'Initial campaigns and strategies are typically deployed within 24 to 48 hours.' }
      ]
    };
  }

  if (first === 'about') {
    return {
      ...defaultMeta,
      title: 'About Business Volunteers — Leadership, Mission & Performance Marketing',
      description: 'Learn about Business Volunteers leadership, engineering philosophy, and founder-led performance marketing methodology driving measurable client growth across 89+ sectors.',
      h1: 'About Business Volunteers — Leadership, Mission & Performance Marketing'
    };
  }

  if (first === 'services' && !second) {
    return {
      ...defaultMeta,
      title: 'Digital Marketing & Growth Engineering Services | Business Volunteers',
      description: 'Explore 17 full-funnel digital capabilities: SEO, Google & Meta PPC ads, high-converting web apps, WhatsApp automation, and graphic design.',
      h1: 'Growth Capabilities & Digital Engineering Services'
    };
  }

  if (first === 'services' && second) {
    const formatted = second.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      ...defaultMeta,
      title: `${formatted} Services — Pricing, Strategy & Results | Business Volunteers`,
      description: `Performance-driven ${formatted} services with verified ROI, real-time KPI tracking, and founder oversight.`,
      h1: `${formatted} Services`,
      category: formatted
    };
  }

  if (first === 'contact') {
    return {
      ...defaultMeta,
      title: 'Contact Business Volunteers — Free 30-Min Growth Strategy Consultation',
      description: 'Schedule a free 30-minute growth strategy session with Business Volunteers marketing specialists. Direct access to founders, zero lock-in terms, and fast onboarding.',
      h1: 'Contact Business Volunteers'
    };
  }

  if (first === 'portfolio') {
    return {
      ...defaultMeta,
      title: 'Client Case Studies & Verified Growth Results | Business Volunteers',
      description: 'Discover verified client case studies, ROAS performance metrics, and growth results delivered across SEO, Google Ads, Meta Ads, and custom web applications.',
      h1: 'Our Work Gallery & Client Case Studies'
    };
  }

  if (first === 'industries' && !second) {
    return {
      ...defaultMeta,
      title: '89+ Industry Digital Marketing & Growth Solutions | Business Volunteers',
      description: 'Specialized digital marketing, SEO, and lead generation frameworks tailored for 89+ industries including Healthcare, Real Estate, E-Commerce, Education, and Tech.',
      h1: '89 Sectors Scaled. Zero Generic Marketing.'
    };
  }

  if (first === 'industries' && second) {
    const industryName = second.replace(/^marketing-for-/, '').replace(/^marketing-/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      ...defaultMeta,
      title: `Digital Marketing for ${industryName} | Client & Revenue Growth | Business Volunteers`,
      description: `Specialized digital marketing for ${industryName.toLowerCase()}: attract new clients, build local market trust, and scale with tailored SEO, PPC, and social media.`,
      h1: `Digital Marketing for ${industryName}`,
      category: industryName
    };
  }

  if (first === 'blogs' && !second) {
    return {
      ...defaultMeta,
      title: 'Digital Marketing, SEO & AI Search Insights Blog | Business Volunteers',
      description: 'Read expert articles and in-depth pillar guides on SEO, AI search optimization (GEO/AEO), Google Ads scaling, social media growth, and B2B marketing funnels.',
      h1: 'The Business Volunteers Blog'
    };
  }

  if (first === 'blogs' && second) {
    const titleFormatted = second
      .replace(/^strat_/, '')
      .replace(/^blog_/, '')
      .split(/[-_]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      ...defaultMeta,
      title: `${titleFormatted} | Business Volunteers`,
      description: `Read our comprehensive guide on ${titleFormatted}. Actionable performance marketing, SEO, and business growth strategies from Business Volunteers.`,
      h1: titleFormatted,
      ogType: 'article'
    };
  }

  if (first === 'digital-marketing' && !second) {
    return {
      ...defaultMeta,
      title: 'Pan-India & Global Digital Marketing Locations Directory | Business Volunteers',
      description: 'Explore Business Volunteers localized digital marketing, SEO, and performance advertising services across 50+ major cities and international business hubs.',
      h1: 'Explore Our Complete Digital Marketing Locations Directory'
    };
  }

  if (first === 'digital-marketing' && second) {
    const cityName = second.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      ...defaultMeta,
      title: `Digital Marketing & SEO Agency in ${cityName} | Business Volunteers`,
      description: `Local SEO, Performance Marketing, and Google Maps optimization services for businesses in ${cityName} and surrounding regions.`,
      h1: `Digital Marketing Services in ${cityName}`,
      category: `Digital Marketing in ${cityName}`,
      faqItems: [
        { q: `Do you offer digital marketing services in ${cityName}?`, a: `Yes! Business Volunteers provides full-spectrum performance marketing, SEO, Meta ads, Google ads, and web design for businesses in ${cityName}.` },
        { q: `How soon can we start in ${cityName}?`, a: `We can launch your ${cityName} campaigns within 24 to 48 hours after our initial strategy onboarding.` }
      ]
    };
  }

  if (first === 'smm') {
    return {
      ...defaultMeta,
      title: 'Social Media Marketing Agency & Viral Reels Strategy | Business Volunteers',
      description: 'Full-funnel organic and paid social media management for Instagram, LinkedIn, and Facebook designed to build brand authority and generate qualified buyer leads.',
      h1: 'Full-Funnel Organic & Paid Social Media Management'
    };
  }

  if (first === 'legal' && !second) {
    return {
      ...defaultMeta,
      title: 'Legal Marketing & Corporate Practice Growth Solutions | Business Volunteers',
      description: 'Specialized ethical digital marketing, local SEO, website design, and client acquisition funnels engineered for advocates, law firms, and legal consultants.',
      h1: 'Legal Marketing & Corporate Practice Growth Solutions'
    };
  }

  if (first === 'legal' && second) {
    const legalTitle = second.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      ...defaultMeta,
      title: `${legalTitle} — Legal Marketing & Practice Growth | Business Volunteers`,
      description: `Specialized digital acquisition and client intake systems for ${legalTitle.toLowerCase()} practices.`,
      h1: `${legalTitle} Legal Marketing`
    };
  }

  if (first === 'html-sitemap') {
    return {
      ...defaultMeta,
      title: 'HTML Sitemap & Complete Website Directory | Business Volunteers',
      description: 'Browse the complete index of Business Volunteers services, 89+ industry solutions, 50+ local markets, legal frameworks, and digital marketing blog articles.',
      h1: 'Complete Website Directory & HTML Sitemap'
    };
  }

  if (first === 'graphic-design' && second) {
    const itemName = second.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return {
      ...defaultMeta,
      title: `${itemName} Services — Formats, Pricing & Turnaround | Business Volunteers`,
      description: `Professional ${itemName.toLowerCase()} design services with fast 24-48 hour turnaround, print-ready source files, and transparent per-design pricing.`,
      h1: `${itemName} Design Services`
    };
  }

  if (first === 'payment') {
    return {
      ...defaultMeta,
      title: 'Pay Online — UPI QR Code & Official Bank Transfer Details | Business Volunteers',
      description: 'Official payment portal for Business Volunteers. Pay retainers and invoices securely via PhonePe, Google Pay, BHIM, UPI QR, or direct Union Bank of India transfer.',
      h1: 'Make a Payment to Business Volunteers',
      faqItems: [
        { q: 'How fast is payment verified?', a: 'UPI and IMPS payments settle immediately. We acknowledge receipt within 15-30 minutes.' },
        { q: 'Do you issue a GST invoice?', a: 'Yes, full tax invoice with your company GSTIN is provided.' }
      ]
    };
  }

  return defaultMeta;
}

// Generate Structured Data Schema for Route
function generateSchema(routePath, meta) {
  const canonicalUrl = `${DOMAIN}${routePath === '/' ? '' : routePath}`;
  const graph = [
    {
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      "name": "Business Volunteers",
      "url": DOMAIN,
      "logo": `${DOMAIN}/businessvolunteers/logo.png`,
      "image": `${DOMAIN}/businessvolunteers/logo.png`,
      "description": "Founder-led digital marketing agency in Noida serving 89+ industries — SEO, Google & Meta ads, social media, web design, and graphic design.",
      "telephone": "+918586989832",
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
      "@id": `${DOMAIN}/#website`,
      "url": DOMAIN,
      "name": "Business Volunteers",
      "publisher": { "@id": `${DOMAIN}/#organization` }
    },
    {
      "@type": "WebPage",
      "@id": `${canonicalUrl}#webpage`,
      "url": canonicalUrl,
      "name": meta.title,
      "description": meta.description,
      "isPartOf": { "@id": `${DOMAIN}/#website` }
    }
  ];

  if (meta.ogType === 'article') {
    graph.push({
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      "isPartOf": { "@id": `${canonicalUrl}#webpage` },
      "headline": meta.h1,
      "description": meta.description,
      "author": { "@id": `${DOMAIN}/#organization` },
      "publisher": { "@id": `${DOMAIN}/#organization` },
      "mainEntityOfPage": canonicalUrl
    });
  }

  if (meta.faqItems && meta.faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": meta.faqItems.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    });
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });
}

// Generate crawlable fallback HTML for body
function generateCrawlableBody(routePath, meta) {
  return `
    <header style="background:#110D0C;padding:1rem 2rem;color:#FFF;display:flex;justify-content:space-between;align-items:center;">
      <a href="/" style="color:#FFF;text-decoration:none;font-weight:900;font-size:1.25rem;">Business Volunteers</a>
      <nav style="display:flex;gap:1.5rem;font-size:0.9rem;">
        <a href="/" style="color:#FFF;text-decoration:none;">Home</a>
        <a href="/services" style="color:#FFF;text-decoration:none;">Services</a>
        <a href="/industries" style="color:#FFF;text-decoration:none;">Industries</a>
        <a href="/portfolio" style="color:#FFF;text-decoration:none;">Portfolio</a>
        <a href="/blogs" style="color:#FFF;text-decoration:none;">Blogs</a>
        <a href="/contact" style="color:#FFF;text-decoration:none;">Contact</a>
      </nav>
    </header>
    <main style="max-width:1100px;margin:2rem auto;padding:0 1.5rem;font-family:system-ui,sans-serif;color:#1E293B;">
      <nav aria-label="Breadcrumb" style="font-size:0.875rem;color:#64748B;margin-bottom:1rem;">
        <a href="/" style="color:#3B82F6;">Home</a> / <span>${meta.h1}</span>
      </nav>
      <h1 style="font-size:2.5rem;font-weight:900;color:#0F172A;line-height:1.2;margin-bottom:1rem;">${meta.h1}</h1>
      <p style="font-size:1.15rem;color:#475569;line-height:1.7;margin-bottom:2rem;">${meta.description}</p>
      
      ${meta.faqItems && meta.faqItems.length > 0 ? `
        <section style="margin-top:3rem;background:#F8FAFC;padding:2rem;border-radius:16px;border:1px solid #E2E8F0;">
          <h2 style="font-size:1.5rem;font-weight:800;color:#0F172A;margin-bottom:1.5rem;">Frequently Asked Questions</h2>
          <div style="display:flex;flex-direction:column;gap:1.25rem;">
            ${meta.faqItems.map(f => `
              <div>
                <h3 style="font-size:1.1rem;font-weight:700;color:#0F172A;margin-bottom:0.4rem;">${f.q}</h3>
                <p style="color:#475569;line-height:1.6;margin:0;">${f.a}</p>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}

      <section style="margin-top:3rem;padding:2rem;background:#FFF;border:1px solid #E2E8F0;border-radius:16px;">
        <h2 style="font-size:1.3rem;font-weight:800;margin-bottom:1rem;">Explore Business Volunteers Growth Services</h2>
        <ul style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.75rem;padding:0;list-style:none;">
          <li><a href="/services/seo" style="color:#3B82F6;text-decoration:none;">SEO Services</a></li>
          <li><a href="/services/google-ads" style="color:#3B82F6;text-decoration:none;">Google Ads (PPC)</a></li>
          <li><a href="/services/meta-ads" style="color:#3B82F6;text-decoration:none;">Meta Ads (Facebook & IG)</a></li>
          <li><a href="/smm" style="color:#3B82F6;text-decoration:none;">Social Media Growth</a></li>
          <li><a href="/services/web-development" style="color:#3B82F6;text-decoration:none;">Custom Web Development</a></li>
          <li><a href="/graphic-design" style="color:#3B82F6;text-decoration:none;">Graphic Design</a></li>
          <li><a href="/html-sitemap" style="color:#3B82F6;text-decoration:none;">Complete Website Directory</a></li>
        </ul>
      </section>
    </main>
    <footer style="background:#110D0C;color:#94A3B8;padding:3rem 2rem;margin-top:4rem;text-align:center;font-size:0.875rem;">
      <p style="color:#FFF;font-weight:800;margin-bottom:0.5rem;">Business Volunteers — Founder-Led Digital Marketing Agency</p>
      <p>Sector 62, Noida, UP, 201309, India • New Ashok Nagar, Delhi, 110096, India</p>
      <p>© 2025 Business Volunteers. All Rights Reserved. • <a href="/html-sitemap" style="color:#D97706;text-decoration:none;">HTML Sitemap</a></p>
    </footer>
  `;
}

// Process all sitemap routes
const routes = getSitemapUrls();
console.log(`🚀 Prerendering ${routes.length} static HTML pages for instant crawler indexing...`);

let count = 0;
for (const route of routes) {
  const meta = getRouteMetadata(route);
  const canonicalUrl = `${DOMAIN}${route === '/' ? '' : route}`;
  const schemaJson = generateSchema(route, meta);

  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${meta.title}</title>`);

  // Replace Meta Description
  html = html.replace(/<meta name="description" content="[^"]*"/i, `<meta name="description" content="${meta.description}"`);

  // Replace Canonical Link
  html = html.replace(/<link rel="canonical" href="[^"]*"/i, `<link rel="canonical" href="${canonicalUrl}"`);

  // Replace OG / Twitter tags
  html = html.replace(/<meta property="og:title" content="[^"]*"/i, `<meta property="og:title" content="${meta.title}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/i, `<meta property="og:description" content="${meta.description}"`);
  html = html.replace(/<meta property="og:url" content="[^"]*"/i, `<meta property="og:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/i, `<meta name="twitter:title" content="${meta.title}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/i, `<meta name="twitter:description" content="${meta.description}"`);
  html = html.replace(/<meta name="twitter:url" content="[^"]*"/i, `<meta name="twitter:url" content="${canonicalUrl}"`);

  // Replace JSON-LD Schema
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script type="application/ld+json">\n${schemaJson}\n    </script>`);

  // Insert crawlable fallback content inside <div id="root">
  // Wrapped in a hidden div so crawlers see it but real users never flash it.
  // The inline script removes it instantly before React hydrates.
  const crawlableContent = generateCrawlableBody(route, meta);
  const hiddenWrapper = `<div id="seo-prerender" style="display:none;visibility:hidden;" aria-hidden="true">${crawlableContent}</div><script>document.getElementById('seo-prerender')&&document.getElementById('seo-prerender').remove();<\/script>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${hiddenWrapper}</div>`);

  // Determine output path in dist/
  let outFilePath;
  if (route === '/') {
    outFilePath = path.join(DIST_DIR, 'index.html');
  } else {
    const cleanRoute = route.replace(/^\/+|\/+$/g, '');
    const outDir = path.join(DIST_DIR, cleanRoute);
    fs.mkdirSync(outDir, { recursive: true });
    outFilePath = path.join(outDir, 'index.html');
  }

  fs.writeFileSync(outFilePath, html, 'utf8');
  count++;
}

console.log(`✅ Prerender complete: Generated ${count} static HTML snapshots in dist/!`);
