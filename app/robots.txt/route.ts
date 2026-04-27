const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moorenewton.com';

export function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /studio

Sitemap: ${SITE_URL}/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
