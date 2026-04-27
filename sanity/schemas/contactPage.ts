import { defineType, defineField } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  description: 'Singleton for /contact page',
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
      name: 'contactFormBlock',
      title: 'Contact Form Block',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'bodyAboveForm', type: 'blockContent', title: 'Body Above Form' },
        { name: 'submitLabel', type: 'string', title: 'Submit Button Label', initialValue: 'Send Message' },
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
      name: 'quickContactPhone',
      title: 'Quick Contact: Phone',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'phone', type: 'string', title: 'Phone Number' },
        { name: 'hours', type: 'string', title: 'Hours' },
        { name: 'bestForCopy', type: 'blockContent', title: 'Best For Copy' },
      ],
    }),
    defineField({
      name: 'quickContactEmail',
      title: 'Quick Contact: Email',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'email', type: 'string', title: 'Email Address' },
        { name: 'responseTime', type: 'string', title: 'Response Time' },
        { name: 'bestForCopy', type: 'blockContent', title: 'Best For Copy' },
      ],
    }),
    defineField({
      name: 'visitBlock',
      title: 'Visit the Yard Block',
      type: 'sectionBlock',
      description: 'Section with map embed',
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
      name: 'socialBlock',
      title: 'Social Block',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
        { name: 'body', type: 'blockContent', title: 'Body' },
        { name: 'instagramHandle', type: 'string', title: 'Instagram Handle' },
        { name: 'instagramUrl', type: 'url', title: 'Instagram URL' },
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
        title: 'Contact Page',
      };
    },
  },
});
