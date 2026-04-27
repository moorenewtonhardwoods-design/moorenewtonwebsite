import { defineType, defineField } from 'sanity';

export const industry = defineType({
  name: 'industry',
  title: 'Industry',
  type: 'document',
  description: 'Reusable industry entries for "Who We Serve" sections',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., "Custom Cabinets & Casework"',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'For potential future /industries/[slug] pages',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'One-liner used in grid tiles',
      validation: (rule) => rule.required().error('Short description is required'),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'blockContent',
      description: 'Reserved for future expansion',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon identifier if icon set is adopted later',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      shortDescription: 'shortDescription',
    },
    prepare({ title, shortDescription }) {
      return {
        title: title || 'Untitled industry',
        subtitle: shortDescription,
      };
    },
  },
});
