import { sanityFetch } from '@/lib/sanity/fetch';

function ensureProtocol(url: string): string {
  if (url.startsWith('https://') || url.startsWith('http://')) return url;
  return `https://${url}`;
}

const SITE_URL = ensureProtocol(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moorenewton.com');

interface SitemapEntry {
  slug: string;
  _updatedAt: string;
}

interface SitemapRoute {
  url: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
}

function generateSitemapXml(routes: SitemapRoute[]): string {
  const urlEntries = routes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route.url}</loc>${route.lastmod ? `\n    <lastmod>${route.lastmod}</lastmod>` : ''}
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export async function GET() {
  const [species, products] = await Promise.all([
    sanityFetch<SitemapEntry[]>({
      query: /* groq */ `*[_type == "speciesPage" && defined(slug.current)] | order(_updatedAt desc) {
        "slug": slug.current,
        _updatedAt
      }`,
      tags: ['sanity:species'],
    }),
    sanityFetch<SitemapEntry[]>({
      query: /* groq */ `*[_type == "productPage" && defined(slug.current)] | order(_updatedAt desc) {
        "slug": slug.current,
        _updatedAt
      }`,
      tags: ['sanity:products'],
    }),
  ]);

  const staticRoutes: SitemapRoute[] = [
    { url: '/', lastmod: formatDate(new Date()), changefreq: 'weekly', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.8 },
    { url: '/contact', changefreq: 'monthly', priority: 0.8 },
    { url: '/quote', changefreq: 'monthly', priority: 0.9 },
    { url: '/delivery', changefreq: 'monthly', priority: 0.7 },
    { url: '/species', changefreq: 'weekly', priority: 0.9 },
    { url: '/products', changefreq: 'weekly', priority: 0.9 },
  ];

  const speciesRoutes: SitemapRoute[] = species.map((s) => ({
    url: `/species/${s.slug}`,
    lastmod: formatDate(s._updatedAt),
    changefreq: 'weekly' as const,
    priority: 0.8,
  }));

  const productRoutes: SitemapRoute[] = products.map((p) => ({
    url: `/products/${p.slug}`,
    lastmod: formatDate(p._updatedAt),
    changefreq: 'weekly' as const,
    priority: 0.7,
  }));

  const allRoutes = [...staticRoutes, ...speciesRoutes, ...productRoutes];

  return new Response(generateSitemapXml(allRoutes), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

export const revalidate = 3600;
