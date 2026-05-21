import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://dineshkumarcs.online';
const PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/#about', priority: '0.9', changefreq: 'monthly' },
  { path: '/#education', priority: '0.8', changefreq: 'monthly' },
  { path: '/#skills', priority: '0.9', changefreq: 'monthly' },
  { path: '/#experience', priority: '0.9', changefreq: 'monthly' },
  { path: '/#projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/#achievements', priority: '0.8', changefreq: 'monthly' },
  { path: '/#contact', priority: '0.7', changefreq: 'monthly' },
];

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function generateSitemap() {
  const currentDate = getCurrentDate();
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  PAGES.forEach(page => {
    sitemap += `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  sitemap += `</urlset>`;

  return sitemap;
}

function saveSitemap() {
  const sitemap = generateSitemap();
  const publicDir = path.join(__dirname, 'client', 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('✅ Sitemap generated successfully!');
  console.log(`📍 Location: ${sitemapPath}`);
  console.log(`📊 Total URLs: ${PAGES.length}`);
  console.log(`🌐 Site URL: ${SITE_URL}`);
}

// Run the generator
saveSitemap();
