import { defineType, defineField } from 'sanity';

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      description: '50-60 characters recommended for search results',
      validation: (rule) =>
        rule.max(60).warning('Over 60 characters may be truncated in search results'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: '150-160 characters recommended',
      validation: (rule) =>
        rule.max(160).warning('Over 160 characters may be truncated in search results'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'imageWithAlt',
      description: 'Overrides the default OG image for this page',
    }),
    defineField({
      name: 'noindex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'If enabled, this page will not be indexed by search engines',
      initialValue: false,
    }),
    defineField({
      name: 'canonicalOverride',
      title: 'Canonical URL Override',
      type: 'url',
      description: 'Only set if this page should point to a different canonical URL',
    }),
  ],
});
