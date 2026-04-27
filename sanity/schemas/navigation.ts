import { defineType } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Site Navigation',
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
      return { title: 'Site Navigation' };
    },
  },
});
