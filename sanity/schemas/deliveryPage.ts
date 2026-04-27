import { defineType, defineField } from 'sanity';

export const deliveryPage = defineType({
  name: 'deliveryPage',
  title: 'Delivery Page',
  type: 'document',
  description: 'Singleton for /delivery page',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
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
      rows: 3,
    }),
    defineField({
      name: 'deliveryZones',
      title: 'Delivery Zones',
      type: 'array',
      description: 'Bay Area coverage broken out by zone',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'zone',
              type: 'string',
              title: 'Zone Name',
              description: 'e.g., "East Bay", "Peninsula"',
              validation: (rule) => rule.required(),
            },
            {
              name: 'cities',
              type: 'array',
              title: 'Cities',
              of: [{ type: 'string' }],
            },
            {
              name: 'deliveryDays',
              type: 'string',
              title: 'Delivery Days',
              description: 'e.g., "Monday - Friday"',
            },
          ],
          preview: {
            select: {
              zone: 'zone',
              cities: 'cities',
            },
            prepare({ zone, cities }) {
              const cityCount = cities?.length || 0;
              return {
                title: zone || 'Unnamed zone',
                subtitle: `${cityCount} cit${cityCount === 1 ? 'y' : 'ies'}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'deliveryTiers',
      title: 'Delivery Tiers',
      type: 'array',
      description: 'Order minimums and delivery fees',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'orderMinimum',
              type: 'number',
              title: 'Order Minimum ($)',
              description: 'Minimum order value for this tier',
              validation: (rule) => rule.required().min(0),
            },
            {
              name: 'fee',
              type: 'number',
              title: 'Delivery Fee ($)',
              description: 'Fee for this tier (0 for free delivery)',
              validation: (rule) => rule.required().min(0),
            },
            {
              name: 'description',
              type: 'string',
              title: 'Description',
              description: 'e.g., "Free delivery for orders over $750"',
            },
          ],
          preview: {
            select: {
              orderMinimum: 'orderMinimum',
              fee: 'fee',
            },
            prepare({ orderMinimum, fee }) {
              return {
                title: `$${orderMinimum || 0}+ orders`,
                subtitle: fee === 0 ? 'Free delivery' : `$${fee} fee`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'pickupBlock',
      title: 'Pickup Block',
      type: 'sectionBlock',
      description: 'Will-call pickup details',
    }),
    defineField({
      name: 'schedulingBlock',
      title: 'Scheduling Block',
      type: 'sectionBlock',
      description: 'How delivery gets scheduled',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faqItem' }],
        },
      ],
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
        title: 'Delivery Page',
      };
    },
  },
});
