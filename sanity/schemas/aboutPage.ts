import { defineType, defineField } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  description: 'Singleton for /about page',
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
      name: 'shortVersionBlock',
      title: 'The Short Version',
      type: 'sectionBlock',
      description: 'Quick intro section',
    }),
    defineField({
      name: 'storyBlock',
      title: 'Our Story',
      type: 'sectionBlock',
      description: 'Full history section with Portable Text',
    }),
    defineField({
      name: 'commitments',
      title: 'What We Stand For',
      type: 'array',
      description: 'Three-commitment grid',
      validation: (rule) =>
        rule.length(3).error('Exactly 3 commitments are required'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Commitment Title',
              validation: (rule) => rule.required(),
            },
            {
              name: 'body',
              type: 'blockContent',
              title: 'Description',
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return { title: title || 'Untitled commitment' };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'inventoryBlock',
      title: 'What We Stock',
      type: 'sectionBlock',
    }),
    defineField({
      name: 'millworkBlock',
      title: 'The Millwork Shop',
      type: 'sectionBlock',
    }),
    defineField({
      name: 'industriesBlock',
      title: 'Industries We Serve',
      type: 'sectionBlock',
      description: 'Uses Portable Text paragraph, not the grid from homepage',
    }),
    defineField({
      name: 'visitBlock',
      title: 'Visit the Yard',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'body', type: 'blockContent', title: 'Body' },
        { name: 'image', type: 'imageWithAlt', title: 'Image' },
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
        title: 'About Page',
      };
    },
  },
});
