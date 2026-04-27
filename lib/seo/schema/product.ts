import type { SpeciesPage, ProductPage } from '@/sanity/types.generated';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moorenewton.com';

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  url: string;
  description?: string;
  category?: string;
  additionalProperty?: Array<{
    '@type': 'PropertyValue';
    name: string;
    value: string;
  }>;
  offers?: {
    '@type': 'Offer';
    availability: 'https://schema.org/InStoreOnly';
    seller?: {
      '@type': 'Organization';
      name: string;
    };
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  'domestic-hardwood': 'Domestic Hardwood',
  'imported-hardwood': 'Imported Hardwood',
  softwood: 'Softwood',
  specialty: 'Specialty Wood',
};

export function buildSpeciesProductSchema(species: SpeciesPage): ProductSchema {
  const slug = species.slug?.current ?? '';
  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: species.title ?? 'Lumber Species',
    url: `${SITE_URL}/species/${slug}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStoreOnly',
      seller: {
        '@type': 'Organization',
        name: 'Moore Newton Hardwoods',
      },
    },
  };

  if (species.hero?.subhead) {
    schema.description = species.hero.subhead;
  }

  if (species.category) {
    schema.category = CATEGORY_LABELS[species.category] ?? species.category;
  }

  const additionalProps: ProductSchema['additionalProperty'] = [];

  if (species.botanicalName) {
    additionalProps.push({
      '@type': 'PropertyValue',
      name: 'Botanical Name',
      value: species.botanicalName,
    });
  }

  if (additionalProps.length > 0) {
    schema.additionalProperty = additionalProps;
  }

  return schema;
}

export function buildProductPageSchema(product: ProductPage): ProductSchema {
  const slug = product.slug?.current ?? '';
  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title ?? 'Lumber Product',
    url: `${SITE_URL}/products/${slug}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStoreOnly',
      seller: {
        '@type': 'Organization',
        name: 'Moore Newton Hardwoods',
      },
    },
  };

  if (product.hero?.subhead) {
    schema.description = product.hero.subhead;
  }

  return schema;
}
