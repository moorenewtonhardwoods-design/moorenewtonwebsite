import { defineType, defineField } from 'sanity';

export const productTile = defineType({
  name: 'productTile',
  title: 'Product Tile',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'One-line tile description',
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Internal path (e.g., /products/hardwood-lumber) or external URL',
      validation: (rule) => rule.required().error('Link is required'),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      href: 'href',
      media: 'image.asset',
    },
    prepare({ title, href, media }) {
      return {
        title: title || 'Untitled tile',
        subtitle: href || 'No link',
        media,
      };
    },
  },
});
