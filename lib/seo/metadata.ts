import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moorenewton.com';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/default.svg`;

export interface BuildMetadataOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  if (process.env.NODE_ENV === 'development') {
    if (title.length > 60) {
      console.warn(`[SEO] Title exceeds 60 chars (${title.length}): "${title}"`);
    }
    if (description.length > 160) {
      console.warn(`[SEO] Description exceeds 160 chars (${description.length}): "${description.slice(0, 50)}..."`);
    }
  }

  const canonicalUrl = `${SITE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Moore Newton Hardwoods',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
