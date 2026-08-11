// Generates public/sitemap.xml and public/robots.txt from SITE_URL at
// build time (runs automatically via the `postbuild` npm script).
// Falls back to a clearly-labeled placeholder domain when SITE_URL is not
// yet configured, so the site still builds locally before a domain exists.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const rawSiteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
const isConfigured = rawSiteUrl && !/needs user input/i.test(rawSiteUrl);
const siteUrl = (isConfigured ? rawSiteUrl : 'https://your-production-domain-example.com').replace(
  /\/$/,
  ''
);

if (!isConfigured) {
  console.warn(
    '\n[generate-seo-files] SITE_URL is not set. sitemap.xml/robots.txt were generated with a placeholder domain.\n' +
      'Set SITE_URL in your environment before deploying to production. See .env.example.\n'
  );
}

const staticRoutes = [
  '/',
  '/services',
  '/services/ac-service',
  '/services/refrigerator-service',
  '/services/geyser-service',
  '/services/microwave-oven-service',
  '/services/washing-machine-service',
  '/areas',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-conditions',
  '/service-policy',
];

const today = new Date().toISOString().split('T')[0];

const urlEntries = staticRoutes
  .map((route) => {
    const priority = route === '/' ? '1.0' : route.startsWith('/services/') ? '0.8' : '0.6';
    return `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
writeFileSync(join(publicDir, 'robots.txt'), robots);

console.log(`[generate-seo-files] wrote sitemap.xml and robots.txt using SITE_URL=${siteUrl}`);
