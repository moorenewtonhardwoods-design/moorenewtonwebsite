import { defineType, defineField } from 'sanity';

export const relatedSpeciesRef = defineType({
  name: 'relatedSpeciesRef',
  title: 'Related Species Reference',
  type: 'object',
  fields: [
    defineField({
      name: 'species',
      title: 'Species',
      type: 'reference',
      to: [{ type: 'speciesPage' }],
      validation: (rule) => rule.required().error('Species reference is required'),
    }),
    defineField({
      name: 'descriptionOverride',
      title: 'Description Override',
      type: 'string',
      description:
        'Override the default related-species description. Leave empty to use the generated description.',
    }),
  ],
  preview: {
    select: {
      speciesTitle: 'species.title',
      override: 'descriptionOverride',
    },
    prepare({ speciesTitle, override }) {
      return {
        title: speciesTitle || 'Select a species',
        subtitle: override ? `Custom: ${override}` : 'Default description',
      };
    },
  },
});
