import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const baseUrl = (process.env.SITEMAP_BASE_URL || 'https://www.weeomedia.com').replace(/\/$/, '');

async function extractStaticRoutes(appFile) {
  const content = await readFile(appFile, 'utf8');
  const matches = [...content.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]);
  const staticRoutes = matches.filter((route) => !route.includes(':'));
  return Array.from(new Set(staticRoutes));
}

function findObjectBlock(source, objectStartName) {
  const startIndex = source.indexOf(`const ${objectStartName}`);
  if (startIndex === -1) return '';

  const openBrace = source.indexOf('{', startIndex);
  if (openBrace === -1) return '';

  let depth = 0;
  for (let i = openBrace; i < source.length; i += 1) {
    const ch = source[i];
    if (ch === '{') depth += 1;
    if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openBrace + 1, i);
      }
    }
  }

  return '';
}

async function extractServiceRoutes(serviceDetailFile) {
  const content = await readFile(serviceDetailFile, 'utf8');
  const block = findObjectBlock(content, 'serviceDetails');
  if (!block) return [];

  const slugMatches = [...block.matchAll(/^\s*([a-z0-9-]+):\s*\{/gim)].map((m) => m[1]);
  return slugMatches.map((slug) => `/services/${slug}`);
}

function buildXml(urls) {
  const lastmod = new Date().toISOString();
  const entries = urls
    .map((url) => {
      return `  <url>\n    <loc>${baseUrl}${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n${entries}\n</urlset>\n`;
}

async function main() {
  const appFile = path.join(projectRoot, 'src', 'App.tsx');
  const serviceDetailFile = path.join(projectRoot, 'src', 'pages', 'service-detail.tsx');
  const sitemapFile = path.join(projectRoot, 'public', 'sitemap.xml');

  const staticRoutes = await extractStaticRoutes(appFile);
  const serviceRoutes = await extractServiceRoutes(serviceDetailFile);

  const urls = Array.from(new Set([...staticRoutes, ...serviceRoutes])).sort((a, b) => a.localeCompare(b));
  const xml = buildXml(urls);
  await writeFile(sitemapFile, xml, 'utf8');

  console.log(`Generated sitemap with ${urls.length} URLs at ${sitemapFile}`);
}

main().catch((error) => {
  console.error('Failed to generate sitemap:', error);
  process.exitCode = 1;
});
