import { SITE_URL } from '../siteUrl';

export interface ContactPageSchema {
  '@context': 'https://schema.org';
  '@type': 'ContactPage';
  name: string;
  url: string;
  description?: string;
  mainEntity?: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

export interface BuildContactPageSchemaOptions {
  title: string;
  description?: string;
  organizationName?: string;
}

export function buildContactPageSchema({
  title,
  description,
  organizationName = 'Moore Newton Hardwoods',
}: BuildContactPageSchemaOptions): ContactPageSchema {
  const schema: ContactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: title,
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: organizationName,
      url: SITE_URL,
    },
  };

  if (description) {
    schema.description = description;
  }

  return schema;
}
