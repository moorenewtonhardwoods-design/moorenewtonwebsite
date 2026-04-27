import { defineType, defineField } from 'sanity';

export const specRow = defineType({
  name: 'specRow',
  title: 'Specification Row',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g., "Janka hardness", "Origin", "Grain"',
      validation: (rule) => rule.required().error('Label is required'),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'e.g., "1,360 lbf", "Eastern North America"',
      validation: (rule) => rule.required().error('Value is required'),
    }),
  ],
  preview: {
    select: {
      label: 'label',
      value: 'value',
    },
    prepare({ label, value }) {
      return {
        title: `${label}: ${value}`,
      };
    },
  },
});
