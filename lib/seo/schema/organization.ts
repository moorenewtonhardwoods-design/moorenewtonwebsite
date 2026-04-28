import type { SiteSettings } from '@/sanity/types.generated';
import { SITE_URL } from '../siteUrl';

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  legalName?: string;
  url: string;
  foundingDate?: string;
  telephone?: string;
  email?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
}

export function buildOrganizationSchema(settings: Partial<SiteSettings>): OrganizationSchema {
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.displayName ?? 'Moore Newton Hardwoods',
    url: SITE_URL,
  };

  if (settings.legalName) {
    schema.legalName = settings.legalName;
  }

  if (settings.foundingYear) {
    schema.foundingDate = String(settings.foundingYear);
  }

  if (settings.phone) {
    schema.telephone = settings.phone;
  }

  if (settings.email) {
    schema.email = settings.email;
  }

  if (settings.address) {
    schema.address = {
      '@type': 'PostalAddress',
      streetAddress: settings.address.street,
      addressLocality: settings.address.city,
      addressRegion: settings.address.state,
      postalCode: settings.address.zip,
      addressCountry: settings.address.country ?? 'US',
    };
  }

  if (settings.social?.length) {
    schema.sameAs = settings.social
      .filter((s) => s.url)
      .map((s) => s.url!);
  }

  return schema;
}
