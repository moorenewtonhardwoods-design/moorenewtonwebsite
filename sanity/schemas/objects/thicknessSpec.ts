import { defineType, defineField } from 'sanity';

export const thicknessSpec = defineType({
  name: 'thicknessSpec',
  title: 'Thickness Specification',
  type: 'object',
  fields: [
    defineField({
      name: 'thickness',
      title: 'Thickness',
      type: 'string',
      description: 'e.g., "4/4", "8/4", "12/4"',
      validation: (rule) => rule.required().error('Thickness is required'),
    }),
    defineField({
      name: 'widths',
      title: 'Available Widths',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional: specific widths available at this thickness',
    }),
    defineField({
      name: 'dimensioning',
      title: 'Dimensioning',
      type: 'string',
      options: {
        list: [
          { title: 'Rough', value: 'rough' },
          { title: 'S3S (Surfaced 3 Sides)', value: 'S3S' },
          { title: 'S4S (Surfaced 4 Sides)', value: 'S4S' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().error('Dimensioning type is required'),
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'Optional note, e.g., "6-7ft shorts available at discount"',
    }),
  ],
  preview: {
    select: {
      thickness: 'thickness',
      dimensioning: 'dimensioning',
    },
    prepare({ thickness, dimensioning }) {
      return {
        title: `${thickness} ${dimensioning || ''}`.trim(),
      };
    },
  },
});
