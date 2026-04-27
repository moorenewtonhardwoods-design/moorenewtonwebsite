import { defineType, defineField } from 'sanity';

export const gradeStocked = defineType({
  name: 'gradeStocked',
  title: 'Grade Stocked',
  type: 'object',
  fields: [
    defineField({
      name: 'grade',
      title: 'Grade Name',
      type: 'string',
      description: 'e.g., "FAS", "Select", "FAS Natural Yellow Birch S&B"',
      validation: (rule) => rule.required().error('Grade name is required'),
    }),
    defineField({
      name: 'typicalUse',
      title: 'Typical Use',
      type: 'array',
      of: [{ type: 'block' }],
      description: '1-2 sentence description of what this grade is used for',
    }),
  ],
  preview: {
    select: {
      grade: 'grade',
    },
    prepare({ grade }) {
      return {
        title: grade || 'Untitled grade',
      };
    },
  },
});
