import { defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Page',
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
      return { title: 'About Page' };
    },
  },
});
