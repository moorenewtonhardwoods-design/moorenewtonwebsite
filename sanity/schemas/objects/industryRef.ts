import { defineType, defineField } from 'sanity';

export const industryRef = defineType({
  name: 'industryRef',
  title: 'Industry Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'reference',
      to: [{ type: 'industry' }],
      validation: (rule) => rule.required().error('Industry reference is required'),
    }),
    defineField({
      name: 'descriptionOverride',
      title: 'Description Override',
      type: 'string',
      description:
        "Override the industry's default shortDescription for this placement. Leave empty to use the default.",
    }),
  ],
  preview: {
    select: {
      industryTitle: 'industry.title',
      override: 'descriptionOverride',
    },
    prepare({ industryTitle, override }) {
      return {
        title: industryTitle || 'Select an industry',
        subtitle: override ? `Custom: ${override}` : 'Default description',
      };
    },
  },
});
