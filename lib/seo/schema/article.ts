import { SITE_URL } from '../siteUrl';

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    url: string;
    logo?: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

export interface BuildArticleSchemaOptions {
  title: string;
  description?: string;
  path: string;
  publishedAt?: string;
  modifiedAt?: string;
  imageUrl?: string;
}

export function buildArticleSchema({
  title,
  description,
  path,
  publishedAt,
  modifiedAt,
  imageUrl,
}: BuildArticleSchemaOptions): ArticleSchema {
  const pageUrl = `${SITE_URL}${path}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Moore Newton Hardwoods',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Moore Newton Hardwoods',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
  };
}
