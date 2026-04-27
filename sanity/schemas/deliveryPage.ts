import { defineType } from 'sanity';

export const deliveryPage = defineType({
  name: 'deliveryPage',
  title: 'Delivery Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Delivery Page',
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
      return { title: 'Delivery Page' };
    },
  },
});
