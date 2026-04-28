import type { SiteSettings } from '@/sanity/types.generated';
import { SITE_URL } from '../siteUrl';

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description?: string;
}

export function buildWebSiteSchema(settings: Partial<SiteSettings>): WebSiteSchema {
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
