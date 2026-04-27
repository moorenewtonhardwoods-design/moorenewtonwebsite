import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  description: 'Singleton for the homepage (/)',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      description: 'e.g., "SAN LEANDRO · SINCE 2006"',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (rule) => rule.required().error('Hero headline is required'),
    }),
    defineField({
      name: 'heroSubhead',
      title: 'Hero Subhead',
      type: 'text',
      rows: 4,
      description: 'The credibility-stacked subhead',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero Primary CTA',
      type: 'ctaBlock',
      description: 'Default: Request a Quote → /quote',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero Secondary CTA',
      type: 'ctaBlock',
      description: 'Default: Browse Species → /species',
    }),
    defineField({
      name: 'subHeroBlock',
      title: 'Sub-Hero Block',
      type: 'sectionBlock',
      description: 'Multiply plywood differentiator section',
    }),
    defineField({
      name: 'millworkBlock',
      title: 'Millwork Block',
      type: 'sectionBlock',
      description: 'Millwork shop section',
    }),
    defineField({
      name: 'inventoryBlock',
      title: 'Inventory Block',
      type: 'sectionBlock',
      description: 'Inventory depth section',
    }),
    defineField({
      name: 'industries',
      title: 'Industries We Serve',
      type: 'array',
      description: 'Who We Serve grid (max 7)',
      validation: (rule) => rule.max(7),
      of: [{ type: 'industryRef' }],
    }),
    defineField({
      name: 'industriesBody',
      title: 'Industries Body',
      type: 'blockContent',
      description: 'Body paragraph below the industries grid',
    }),
    defineField({
      name: 'productTiles',
      title: 'Product Tiles',
      type: 'array',
      description: 'Products Overview six-tile grid (max 6)',
      validation: (rule) => rule.max(6),
      of: [{ type: 'productTile' }],
    }),
    defineField({
      name: 'featuredSpecies',
      title: 'Featured Species',
      type: 'array',
      description: 'Featured Species grid (max 6)',
      validation: (rule) => rule.max(6),
      of: [
        {
          type: 'reference',
          to: [{ type: 'speciesPage' }],
        },
      ],
    }),
    defineField({
      name: 'featuredSpeciesCta',
      title: 'Featured Species CTA',
      type: 'ctaBlock',
      description: '"Browse all 35 species →"',
    }),
    defineField({
      name: 'deliveryBlock',
      title: 'Delivery Block',
      type: 'sectionBlock',
      description: 'Delivery & pickup section',
    }),
    defineField({
      name: 'aboutTeaser',
      title: 'About Teaser',
      type: 'sectionBlock',
      description: 'About teaser section',
    }),
    defineField({
      name: 'finalCta',
      title: 'Final CTA',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'body', type: 'blockContent', title: 'Body' },
        { name: 'primaryCta', type: 'ctaBlock', title: 'Primary CTA' },
        { name: 'secondaryCta', type: 'ctaBlock', title: 'Secondary CTA' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      };
    },
  },
});
