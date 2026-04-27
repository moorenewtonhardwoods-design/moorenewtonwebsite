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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      description: 'TODO: Replace with full schema (answer field)',
    }),
  ],
  preview: {
    select: {
      title: 'question',
    },
  },
});
