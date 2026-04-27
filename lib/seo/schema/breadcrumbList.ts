const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.moorenewton.com';

export interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const isLast = index === items.length - 1;
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        ...(isLast ? {} : { item: `${SITE_URL}${item.path}` }),
      };
    }),
  };
}
