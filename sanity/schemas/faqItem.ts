import { defineType, defineField } from 'sanity';

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required().error('Question is required'),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
      validation: (rule) => rule.required().error('Answer is required'),
    }),
    defineField({
      name: 'scope',
      title: 'Scope',
      type: 'string',
      description: 'Category for filtering FAQs in the Studio',
      options: {
        list: [
          { title: 'Delivery', value: 'delivery' },
          { title: 'Quote', value: 'quote' },
          { title: 'Species', value: 'species' },
          { title: 'Product', value: 'product' },
          { title: 'General', value: 'general' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required().error('Scope is required'),
    }),
    defineField({
      name: 'relatedSpecies',
      title: 'Related Species',
      type: 'reference',
      to: [{ type: 'speciesPage' }],
      description: 'Optional: link species-specific FAQs back to their species page',
      hidden: ({ parent }) => parent?.scope !== 'species',
    }),
  ],
  preview: {
    select: {
      question: 'question',
      scope: 'scope',
    },
    prepare({ question, scope }) {
      return {
        title: question || 'Untitled FAQ',
        subtitle: scope ? `[${scope}]` : undefined,
      };
    },
  },
});
