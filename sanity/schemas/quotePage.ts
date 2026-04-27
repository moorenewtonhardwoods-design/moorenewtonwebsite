import { defineType } from 'sanity';

export const quotePage = defineType({
  name: 'quotePage',
  title: 'Quote Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Quote Page',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
      description: 'TODO: Replace with full schema',
    },
  ],
  preview: {
    prepare() {
      return { title: 'Quote Page' };
    },
  },
});
