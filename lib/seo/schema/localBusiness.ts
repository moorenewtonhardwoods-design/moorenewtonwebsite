import type { SiteSettings } from '@/sanity/types.generated';
import { SITE_URL } from '../siteUrl';

export interface LocalBusinessSchema {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  '@id': string;
  name: string;
  url: string;
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
  openingHoursSpecification?: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
  priceRange?: string;
}

const DAY_MAP: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export function buildLocalBusinessSchema(settings: SiteSettings): LocalBusinessSchema {
  const schema: LocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: settings.displayName ?? 'Moore Newton Hardwoods',
    url: SITE_URL,
    priceRange: '$$',
  };

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

  if (settings.hours?.length) {
    schema.openingHoursSpecification = settings.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: DAY_MAP[h.day ?? ''] ?? h.day ?? '',
      opens: h.open ?? '',
      closes: h.close ?? '',
    }));
  }

  return schema;
}
