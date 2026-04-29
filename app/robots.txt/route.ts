function ensureProtocol(url: string): string {
  if (url.startsWith('https://') || url.startsWith('http://')) return url;
  return `https://${url}`;
}

const SITE_URL = ensureProtocol(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moorenewton.com');

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
