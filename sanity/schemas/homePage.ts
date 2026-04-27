import { defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Home Page',
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
      return { title: 'Home Page' };
    },
  },
});
