const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moorenewton.com';

export interface AboutPageSchema {
  '@context': 'https://schema.org';
  '@type': 'AboutPage';
  name: string;
  url: string;
  description?: string;
  mainEntity?: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

export interface BuildAboutPageSchemaOptions {
  title: string;
  description?: string;
  organizationName?: string;
}

export function buildAboutPageSchema({
  title,
  description,
  organizationName = 'Moore Newton Hardwoods',
}: BuildAboutPageSchemaOptions): AboutPageSchema {
  const schema: AboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    url: `${SITE_URL}/about`,
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
