import { defineType, defineField } from 'sanity';

export const productPage = defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  description: 'Product hub pages under /products/*',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Hardwood Plywood"',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Supports nested paths, e.g., "hardwood-plywood" or "hardwood-plywood/multiply"',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'parentProduct',
      title: 'Parent Product',
      type: 'reference',
      to: [{ type: 'productPage' }],
      description: 'Optional: for nested product pages (e.g., Multiply under Hardwood Plywood)',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
        { name: 'h1', type: 'string', title: 'H1', validation: (rule) => rule.required() },
        { name: 'subhead', type: 'string', title: 'Subhead' },
        { name: 'leadParagraph', type: 'blockContent', title: 'Lead Paragraph' },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Flexible section stack',
      of: [{ type: 'sectionBlock' }],
    }),
    defineField({
      name: 'featuredSpecies',
      title: 'Featured Species',
      type: 'array',
      description: 'Related species to surface on this product page',
      of: [
        {
          type: 'reference',
          to: [{ type: 'speciesPage' }],
        },
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
      name: 'agilityId',
      title: 'Agility ID',
      type: 'string',
      description: 'DMSI Agility identifier for future live-inventory integration. Leave empty for v1.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      parent: 'parentProduct.title',
    },
    prepare({ title, slug, parent }) {
      return {
        title: title || 'Untitled',
        subtitle: parent ? `${parent} / ${slug}` : `/products/${slug}`,
      };
    },
  },
});
