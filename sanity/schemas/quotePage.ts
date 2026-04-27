import { defineType, defineField } from 'sanity';

export const quotePage = defineType({
  name: 'quotePage',
  title: 'Quote Page',
  type: 'document',
  description: 'Singleton for /quote page',
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
      name: 'howItWorksSteps',
      title: 'How It Works Steps',
      type: 'array',
      validation: (rule) =>
        rule.length(3).error('Exactly 3 steps are required'),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Step Title',
              validation: (rule) => rule.required(),
            },
            {
              name: 'body',
              type: 'blockContent',
              title: 'Step Description',
            },
          ],
          preview: {
            select: {
              title: 'title',
            },
            prepare({ title }) {
              return { title: title || 'Untitled step' };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'quoteFormBlock',
      title: 'Quote Form Block',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'bodyAboveForm', type: 'blockContent', title: 'Body Above Form' },
        { name: 'submitLabel', type: 'string', title: 'Submit Button Label', initialValue: 'Submit Quote Request' },
        { name: 'footerNote', type: 'string', title: 'Footer Note' },
      ],
    }),
    defineField({
      name: 'industryOptions',
      title: 'Industry Options',
      type: 'array',
      description: 'Options for the industry dropdown in the form',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required() },
            { name: 'value', type: 'string', title: 'Value', validation: (rule) => rule.required() },
          ],
          preview: {
            select: { label: 'label', value: 'value' },
            prepare({ label, value }) {
              return { title: label || 'Untitled', subtitle: value };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'whatToInclude',
      title: 'What to Include',
      type: 'sectionBlock',
      description: '"What helps us quote faster" section with bullet list',
    }),
    defineField({
      name: 'pickupTile',
      title: 'Pickup Tile',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'body', type: 'blockContent', title: 'Body' },
        { name: 'cta', type: 'ctaBlock', title: 'CTA' },
      ],
    }),
    defineField({
      name: 'deliveryTile',
      title: 'Delivery Tile',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'body', type: 'blockContent', title: 'Body' },
        { name: 'cta', type: 'ctaBlock', title: 'CTA' },
      ],
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
        title: 'Quote Page',
      };
    },
  },
});
