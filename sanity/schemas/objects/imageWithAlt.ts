import { defineType, defineField } from 'sanity';

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image with Alt Text',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().error('Image is required'),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for screen readers and SEO',
      validation: (rule) => rule.required().error('Alt text is required for accessibility'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional caption displayed below the image',
    }),
  ],
  preview: {
    select: {
      alt: 'alt',
      media: 'asset',
    },
    prepare({ alt, media }) {
      return {
        title: alt || 'No alt text',
        media,
      };
    },
  },
});
