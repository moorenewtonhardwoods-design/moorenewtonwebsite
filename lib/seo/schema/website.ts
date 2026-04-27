import type { SiteSettings } from '@/sanity/types.generated';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moorenewton.com';

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
}

export function buildWebSiteSchema(settings: SiteSettings): WebSiteSchema {
  const schema: WebSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.displayName ?? 'Moore Newton Hardwoods',
    url: SITE_URL,
  };

  if (settings.tagline) {
    schema.description = settings.tagline;
  }

  return schema;
}
