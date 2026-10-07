import fs from 'fs';
import path from 'path';

const DOMAIN = 'https://businessvolunteers.online';
const today = new Date().toISOString().split('T')[0];

const seenUrls = new Set();
const urls = [];

function addUrl(rawPath, changefreq = 'weekly', priority = '0.8') {
  let cleanPath = rawPath.trim();
  if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
  if (cleanPath === '/') cleanPath = '';

  const fullUrl = `${DOMAIN}${cleanPath}`;
  if (!seenUrls.has(fullUrl)) {
    seenUrls.add(fullUrl);
    urls.push({ loc: fullUrl, lastmod: today, changefreq, priority });
  }
}

// 1. Pillar Static Pages
addUrl('', 'daily', '1.0');
addUrl('/services', 'weekly', '0.9');
addUrl('/about', 'monthly', '0.8');
addUrl('/contact', 'monthly', '0.9');
addUrl('/portfolio', 'weekly', '0.9');
addUrl('/industries', 'weekly', '0.9');
addUrl('/blogs', 'daily', '0.9');
addUrl('/smm', 'weekly', '0.9');
addUrl('/legal', 'monthly', '0.8');
addUrl('/digital-marketing', 'weekly', '0.9');
addUrl('/graphic-design', 'weekly', '0.9');
addUrl('/payment', 'monthly', '0.8');

// 2. All 17 Detailed Service Pages
const services = [
  'seo',
  'social-media-marketing',
  'google-ads',
  'meta-ads',
  'web-development',
  'graphic-design',
  'ugc-reels-creator-marketing',
  'dashboard-kpi-systems',
  'whatsapp-marketing',
  'email-marketing',
  'influencer-marketing',
  'b2b-lead-generation',
  'ecommerce-scaling',
  'cro',
  'local-seo',
  'ai-automation-systems',
  'brand-identity-design'
];

services.forEach(s => addUrl(`/services/${s}`, 'weekly', '0.9'));

// 3. Graphic Design Detail Categories & Sub-items
const graphicItems = [
  'poster-design',
  'flyer-design',
  'logo-design',
  'visiting-card-design',
  'ppt-presentation-design',
  'product-label-design',
  'restaurant-menu-design',
  'infographic-design',
  'standard-creatives',
  'structured-designs',
  'multi-page-documents',
  'large-format-corporate-branding',
  'packaging-product-design',
  'restaurant-hospitality',
  'custom-creative-services'
];

graphicItems.forEach(item => addUrl(`/graphic-design/${item}`, 'monthly', '0.8'));

// 4. Extract and Add 89 Industry Hubs from IndustriesPage.tsx
const industriesFilePath = path.join(process.cwd(), 'src', 'pages', 'IndustriesPage.tsx');
if (fs.existsSync(industriesFilePath)) {
  const content = fs.readFileSync(industriesFilePath, 'utf8');
  const idMatches = content.matchAll(/id:\s*'([a-z0-9-]+)'/g);
  for (const match of idMatches) {
    const slug = match[1];
    if (slug && !slug.includes('tab') && !slug.includes('filter')) {
      const cleanSlug = slug.startsWith('marketing-for-') ? slug : `marketing-for-${slug}`;
      addUrl(`/industries/${cleanSlug}`, 'monthly', '0.8');
    }
  }
}

// 5. Extract and Add Legal Services from LegalSection.tsx
const legalFilePath = path.join(process.cwd(), 'src', 'components', 'LegalSection.tsx');
if (fs.existsSync(legalFilePath)) {
  const content = fs.readFileSync(legalFilePath, 'utf8');
  const titleMatches = content.matchAll(/title:\s*'([^']+)'/g);
  for (const match of titleMatches) {
    const title = match[1];
    if (title && title.length > 2 && !title.includes('Legal Practice') && !title.includes('Zero Lock')) {
      const cleanSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      addUrl(`/legal/${cleanSlug}`, 'monthly', '0.7');
    }
  }
}

// 6. Locations from locationsData.ts & Top Locations
const locationsFilePath = path.join(process.cwd(), 'src', 'data', 'locationsData.ts');
if (fs.existsSync(locationsFilePath)) {
  const content = fs.readFileSync(locationsFilePath, 'utf8');
  // Match quoted city strings
  const cityMatches = content.matchAll(/'([a-zA-Z\s.-]+)'/g);
  for (const match of cityMatches) {
    const raw = match[1].trim();
    if (raw && raw.length > 2 && !['domestic', 'international', 'state', 'tier2', 'tier3_4'].includes(raw)) {
      const cleanCity = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      if (cleanCity && cleanCity.length > 1) {
        addUrl(`/digital-marketing/${cleanCity}`, 'monthly', '0.7');
      }
    }
  }
}

// Ensure top domestic & international cities
const fallbackCities = [
  'noida', 'delhi', 'mumbai', 'bangalore', 'gurgaon', 'lucknow', 'hyderabad', 'chennai', 'kolkata', 'ahmedabad',
  'pune', 'jaipur', 'dehradun', 'uttarakhand', 'chandigarh', 'surat', 'indore', 'nagpur', 'kochi', 'coimbatore',
  'ghaziabad', 'faridabad', 'thane', 'navi-mumbai', 'bhopal', 'visakhapatnam', 'patna', 'bhubaneswar', 'vadodara',
  'rajkot', 'ludhiana', 'amritsar', 'kanpur', 'varanasi', 'agra', 'nashik', 'mysuru', 'mangalore', 'goa',
  'guwahati', 'raipur', 'ranchi', 'jodhpur', 'udaipur', 'vijayawada', 'thiruvananthapuram', 'madurai', 'meerut',
  'moradabad', 'prayagraj', 'jammu', 'gwalior', 'gorakhpur', 'ajmer', 'kota', 'jabalpur', 'solapur', 'kolhapur',
  'usa', 'australia', 'uk', 'canada', 'dubai', 'singapore', 'malaysia'
];
fallbackCities.forEach(c => addUrl(`/digital-marketing/${c}`, 'monthly', '0.7'));

// Also add HTML Sitemap page
addUrl('/html-sitemap', 'weekly', '0.7');

// 7. All Blog Posts from blogData.ts & public/blogs directory
const blogDataPath = path.join(process.cwd(), 'src', 'data', 'blogData.ts');
if (fs.existsSync(blogDataPath)) {
  const content = fs.readFileSync(blogDataPath, 'utf8');
  const slugMatches = content.matchAll(/slug:\s*'([^']+)'/g);
  for (const match of slugMatches) {
    const slug = match[1];
    if (slug) {
      const cleanSlug = slug.replace(/^strategy\//, '').replace(/[^a-zA-Z0-9_-]+/g, '-');
      addUrl(`/blogs/${cleanSlug}`, 'monthly', '0.8');
    }
  }
}

// Also scan markdown files in public/blogs/
const blogsDir = path.join(process.cwd(), 'public', 'blogs');
if (fs.existsSync(blogsDir)) {
  const rootFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.md'));
  rootFiles.forEach(f => {
    const slug = f.replace(/\.md$/, '');
    const cleanSlug = slug.replace(/^strategy\//, '').replace(/[^a-zA-Z0-9_-]+/g, '-');
    addUrl(`/blogs/${cleanSlug}`, 'monthly', '0.8');
  });
}

// Generate valid XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), xml, 'utf8');
console.log(`✅ Successfully generated public/sitemap.xml with ${urls.length} unique canonical URLs!`);
