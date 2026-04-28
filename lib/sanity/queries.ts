import { sanityFetch, sanityFetchOrNull } from './fetch';
import type {
  HomePage,
  AboutPage,
  ContactPage,
  QuotePage,
  DeliveryPage,
  SiteSettings,
  Navigation,
  SpeciesPage,
  ProductPage,
  Industry,
  FaqItem,
} from '@/sanity/types.generated';

// =============================================================================
// GROQ Fragments (reusable query parts)
// =============================================================================

const seoFragment = /* groq */ `
  seo {
    title,
    description,
    noindex,
    canonicalOverride,
    ogImage {
      asset-> { _id, url, metadata { dimensions } },
      alt,
      caption
    }
  }
`;

const ctaFragment = /* groq */ `
  label,
  href,
  variant,
  openInNewTab
`;

const imageWithAltFragment = /* groq */ `
  asset {
    asset-> { _id, url, metadata { dimensions, lqip } }
  },
  alt,
  caption
`;

const sectionBlockFragment = /* groq */ `
  eyebrow,
  heading,
  body,
  image { ${imageWithAltFragment} },
  cta { ${ctaFragment} }
`;

const faqItemFragment = /* groq */ `
  _id,
  question,
  answer,
  scope
`;

const speciesCardFragment = /* groq */ `
  _id,
  title,
  slug,
  botanicalName,
  category,
  hero { h1, subhead }
`;

const industryFragment = /* groq */ `
  _id,
  title,
  slug,
  shortDescription,
  icon
`;

// =============================================================================
// Singleton Queries
// =============================================================================

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetchOrNull<SiteSettings>({
    query: /* groq */ `*[_type == "siteSettings"][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      legalName,
      displayName,
      tagline,
      phone,
      email,
      address,
      hours,
      hoursNote,
      social,
      foundingYear,
      defaultOgImage { ${imageWithAltFragment} }
    }`,
    tags: ['sanity:global'],
  });
}

export async function getNavigation(): Promise<Navigation | null> {
  return sanityFetchOrNull<Navigation>({
    query: /* groq */ `*[_type == "navigation"][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      primaryNav,
      footerColumns,
      utilityNav
    }`,
    tags: ['sanity:global'],
  });
}

export async function getHomePage(): Promise<HomePage | null> {
  return sanityFetchOrNull<HomePage>({
    query: /* groq */ `*[_type == "homePage"][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      heroEyebrow,
      heroHeadline,
      heroSubhead,
      heroPrimaryCta { ${ctaFragment} },
      heroSecondaryCta { ${ctaFragment} },
      subHeroBlock { ${sectionBlockFragment} },
      millworkBlock { ${sectionBlockFragment} },
      inventoryBlock { ${sectionBlockFragment} },
      industries[] {
        _key,
        industry-> { ${industryFragment} },
        descriptionOverride
      },
      industriesBody,
      productTiles,
      featuredSpecies[]-> { ${speciesCardFragment} },
      featuredSpeciesCta { ${ctaFragment} },
      deliveryBlock { ${sectionBlockFragment} },
      aboutTeaser { ${sectionBlockFragment} },
      finalCta {
        heading,
        body,
        primaryCta { ${ctaFragment} },
        secondaryCta { ${ctaFragment} }
      },
      ${seoFragment}
    }`,
    tags: ['sanity:home', 'sanity:global'],
  });
}

export async function getAboutPage(): Promise<AboutPage | null> {
  return sanityFetchOrNull<AboutPage>({
    query: /* groq */ `*[_type == "aboutPage"][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      heroEyebrow,
      heroHeadline,
      heroSubhead,
      shortVersionBlock { ${sectionBlockFragment} },
      storyBlock { ${sectionBlockFragment} },
      commitments,
      inventoryBlock { ${sectionBlockFragment} },
      millworkBlock { ${sectionBlockFragment} },
      industriesBlock { ${sectionBlockFragment} },
      visitBlock {
        eyebrow,
        heading,
        body,
        image { ${imageWithAltFragment} },
        primaryCta { ${ctaFragment} },
        secondaryCta { ${ctaFragment} }
      },
      ${seoFragment}
    }`,
    tags: ['sanity:about'],
  });
}

export async function getContactPage(): Promise<ContactPage | null> {
  return sanityFetchOrNull<ContactPage>({
    query: /* groq */ `*[_type == "contactPage"][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      heroEyebrow,
      heroHeadline,
      heroSubhead,
      contactFormBlock,
      industryOptions,
      quickContactPhone,
      quickContactEmail,
      visitBlock { ${sectionBlockFragment} },
      pickupTile,
      deliveryTile,
      socialBlock,
      finalCta {
        heading,
        body,
        primaryCta { ${ctaFragment} },
        secondaryCta { ${ctaFragment} }
      },
      ${seoFragment}
    }`,
    tags: ['sanity:contact'],
  });
}

export async function getQuotePage(): Promise<QuotePage | null> {
  return sanityFetchOrNull<QuotePage>({
    query: /* groq */ `*[_type == "quotePage"][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      heroEyebrow,
      heroHeadline,
      heroSubhead,
      howItWorksSteps,
      quoteFormBlock,
      industryOptions,
      whatToInclude { ${sectionBlockFragment} },
      pickupTile,
      deliveryTile,
      faqs[]-> { ${faqItemFragment} },
      finalCta {
        heading,
        body,
        primaryCta { ${ctaFragment} },
        secondaryCta { ${ctaFragment} }
      },
      ${seoFragment}
    }`,
    tags: ['sanity:quote', 'sanity:faq'],
  });
}

export async function getDeliveryPage(): Promise<DeliveryPage | null> {
  return sanityFetchOrNull<DeliveryPage>({
    query: /* groq */ `*[_type == "deliveryPage"][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      heroEyebrow,
      heroHeadline,
      heroSubhead,
      deliveryZones,
      deliveryTiers,
      pickupBlock { ${sectionBlockFragment} },
      schedulingBlock { ${sectionBlockFragment} },
      faqs[]-> { ${faqItemFragment} },
      finalCta {
        heading,
        body,
        primaryCta { ${ctaFragment} },
        secondaryCta { ${ctaFragment} }
      },
      ${seoFragment}
    }`,
    tags: ['sanity:delivery', 'sanity:faq'],
  });
}

// =============================================================================
// Species Queries
// =============================================================================

export async function getAllSpeciesSlugs(): Promise<Array<{ slug: string }>> {
  return sanityFetch<Array<{ slug: string }>>({
    query: /* groq */ `*[_type == "speciesPage" && defined(slug.current)] {
      "slug": slug.current
    }`,
    tags: ['sanity:species'],
  });
}

export async function getAllSpecies(): Promise<SpeciesPage[]> {
  return sanityFetch<SpeciesPage[]>({
    query: /* groq */ `*[_type == "speciesPage"] | order(title asc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      botanicalName,
      category,
      primaryKeyword,
      featuredOnHome,
      hero { h1, subhead, leadParagraph }
    }`,
    tags: ['sanity:species'],
  });
}

export interface FeaturedSpecies {
  _id: string;
  title: string;
  slug: { current: string };
  botanicalName?: string;
  hero?: { subhead?: string };
}

export async function getFeaturedSpecies(): Promise<FeaturedSpecies[]> {
  return sanityFetch<FeaturedSpecies[]>({
    query: /* groq */ `*[_type == "speciesPage" && featuredOnHome == true] | order(title asc) {
      _id,
      title,
      slug,
      botanicalName,
      hero { subhead }
    }`,
    tags: ['sanity:species'],
  });
}

export async function getSpeciesBySlug(slug: string): Promise<SpeciesPage | null> {
  return sanityFetchOrNull<SpeciesPage>({
    query: /* groq */ `*[_type == "speciesPage" && slug.current == $slug][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      botanicalName,
      category,
      primaryKeyword,
      featuredOnHome,
      heroImage { ${imageWithAltFragment} },
      gallery[] { ${imageWithAltFragment} },
      hero {
        h1,
        subhead,
        leadParagraph
      },
      specsAtAGlance,
      gradeIntro,
      gradesStocked,
      alternativeGrades,
      thicknessesStocked,
      figuredInventory,
      whereItComesFrom,
      fscNote,
      grainAndAppearance,
      typicalUses,
      workingCharacteristics,
      finishingNotes,
      relatedSpecies[] {
        _key,
        species-> { ${speciesCardFragment} },
        descriptionOverride
      },
      faqs[]-> { ${faqItemFragment} },
      showMillworkCta,
      millworkCta,
      finalCta {
        heading,
        body,
        primaryCta { ${ctaFragment} }
      },
      agilityId,
      ${seoFragment}
    }`,
    params: { slug },
    tags: ['sanity:species', `sanity:species:${slug}`],
  });
}

// =============================================================================
// Product Queries
// =============================================================================

export async function getAllProductSlugs(): Promise<Array<{ slug: string }>> {
  return sanityFetch<Array<{ slug: string }>>({
    query: /* groq */ `*[_type == "productPage" && defined(slug.current)] {
      "slug": slug.current
    }`,
    tags: ['sanity:products'],
  });
}

export async function getAllProducts(): Promise<ProductPage[]> {
  return sanityFetch<ProductPage[]>({
    query: /* groq */ `*[_type == "productPage"] | order(title asc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      parentProduct-> { _id, title, slug },
      hero {
        eyebrow,
        h1,
        subhead,
        leadParagraph
      }
    }`,
    tags: ['sanity:products'],
  });
}

export async function getProductBySlug(slug: string): Promise<ProductPage | null> {
  return sanityFetchOrNull<ProductPage>({
    query: /* groq */ `*[_type == "productPage" && slug.current == $slug][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      parentProduct-> { _id, title, slug },
      hero {
        eyebrow,
        h1,
        subhead,
        leadParagraph
      },
      sections[] { ${sectionBlockFragment} },
      featuredSpecies[]-> { ${speciesCardFragment} },
      faqs[]-> { ${faqItemFragment} },
      finalCta {
        heading,
        body,
        primaryCta { ${ctaFragment} },
        secondaryCta { ${ctaFragment} }
      },
      agilityId,
      ${seoFragment}
    }`,
    params: { slug },
    tags: ['sanity:products', `sanity:product:${slug}`],
  });
}

// =============================================================================
// Reusable Content Queries
// =============================================================================

export async function getAllIndustries(): Promise<Industry[]> {
  return sanityFetch<Industry[]>({
    query: /* groq */ `*[_type == "industry"] | order(title asc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      title,
      slug,
      shortDescription,
      longDescription,
      icon
    }`,
    tags: ['sanity:industry'],
  });
}

export async function getAllFaqItems(scope?: FaqItem['scope']): Promise<FaqItem[]> {
  const scopeFilter = scope ? ` && scope == "${scope}"` : '';
  return sanityFetch<FaqItem[]>({
    query: /* groq */ `*[_type == "faqItem"${scopeFilter}] | order(question asc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      _rev,
      question,
      answer,
      scope,
      relatedSpecies-> { _id, title, slug }
    }`,
    tags: ['sanity:faq'],
  });
}

// =============================================================================
// Face Species Swatches (for Hardwood Plywood page)
// =============================================================================

export interface FaceSpeciesSwatch {
  _id: string;
  originalFilename: string;
  url: string;
  altText?: string;
  title?: string;
}

export async function getFaceSpeciesSwatches(): Promise<FaceSpeciesSwatch[]> {
  return sanityFetch<FaceSpeciesSwatch[]>({
    query: /* groq */ `*[_type == "sanity.imageAsset" && (
      originalFilename match "white-oak*" ||
      originalFilename match "red-oak*" ||
      originalFilename match "quartersawn-white-oak*" ||
      originalFilename match "rift-white-oak*" ||
      originalFilename match "cherry*" ||
      originalFilename match "black-walnut*" ||
      originalFilename match "hard-maple*" ||
      originalFilename match "soft-maple*" ||
      originalFilename match "african-mahogany*" ||
      originalFilename match "birch*" ||
      originalFilename match "douglas-fir*" ||
      originalFilename match "hickory*" ||
      originalFilename match "poplar*" ||
      originalFilename match "sapele*" ||
      originalFilename match "teak*" ||
      originalFilename match "alder*" ||
      originalFilename match "ash*" ||
      originalFilename match "honduran-mahogany*" ||
      originalFilename match "western-red-cedar*" ||
      originalFilename match "lacewood*" ||
      originalFilename match "padauk*" ||
      originalFilename match "wenge*" ||
      originalFilename match "zebrawood*"
    )] | order(originalFilename asc) {
      _id,
      originalFilename,
      url,
      altText,
      title
    }`,
    tags: ['sanity:assets'],
  });
}

// =============================================================================
// Global Settings (for layout)
// =============================================================================

export interface GlobalSettings {
  siteSettings: SiteSettings | null;
  navigation: Navigation | null;
}

export async function getGlobalSettings(): Promise<GlobalSettings> {
  const [siteSettings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
  ]);
  return { siteSettings, navigation };
}
