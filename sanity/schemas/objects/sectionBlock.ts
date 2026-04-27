import { defineType, defineField } from 'sanity';

export const sectionBlock = defineType({
  name: 'sectionBlock',
  title: 'Section Block',
  type: 'object',
  description: "The site's canonical section pattern: eyebrow + heading + body + optional image and CTA",
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Small-caps eyebrow text above the heading',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Section H2 heading',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Section copy in Portable Text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      description: 'Optional supporting image for the section',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'ctaBlock',
      description: 'Optional end-of-section CTA button',
    }),
  ],
  preview: {
    select: {
      eyebrow: 'eyebrow',
      heading: 'heading',
      media: 'image.asset',
    },
    prepare({ eyebrow, heading, media }) {
      return {
        title: heading || eyebrow || 'Untitled section',
        subtitle: eyebrow && heading ? eyebrow : undefined,
        media,
      };
    },
  },
});
