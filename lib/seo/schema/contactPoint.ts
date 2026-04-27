import type { SiteSettings } from '@/sanity/types.generated';

export interface ContactPointSchema {
  '@context': 'https://schema.org';
  '@type': 'ContactPoint';
  contactType: string;
  telephone?: string;
  email?: string;
  availableLanguage?: string;
}

export function buildContactPointSchema(settings: SiteSettings): ContactPointSchema {
  const schema: ContactPointSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPoint',
    contactType: 'sales',
    availableLanguage: 'English',
  };

  if (settings.phone) {
    schema.telephone = settings.phone;
  }

  if (settings.email) {
    schema.email = settings.email;
  }

  return schema;
}
