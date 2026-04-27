import { defineType, defineArrayMember } from 'sanity';

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                name: 'openInNewTab',
                type: 'boolean',
                title: 'Open in new tab',
                initialValue: false,
              },
            ],
          },
          {
            name: 'speciesLink',
            type: 'object',
            title: 'Species Link',
            fields: [
              {
                name: 'species',
                type: 'reference',
                title: 'Species',
                to: [{ type: 'speciesPage' }],
                validation: (rule) => rule.required(),
              },
            ],
          },
          {
            name: 'productLink',
            type: 'object',
            title: 'Product Link',
            fields: [
              {
                name: 'product',
                type: 'reference',
                title: 'Product',
                to: [{ type: 'productPage' }],
                validation: (rule) => rule.required(),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'calloutBox',
      title: 'Callout Box',
      fields: [
        {
          name: 'variant',
          type: 'string',
          title: 'Variant',
          options: {
            list: [
              { title: 'Note', value: 'note' },
              { title: 'Spec', value: 'spec' },
              { title: 'Warning', value: 'warning' },
            ],
            layout: 'radio',
          },
          initialValue: 'note',
          validation: (rule) => rule.required(),
        },
        {
          name: 'body',
          type: 'array',
          title: 'Body',
          of: [
            {
              type: 'block',
              styles: [{ title: 'Normal', value: 'normal' }],
              lists: [{ title: 'Bullet', value: 'bullet' }],
              marks: {
                decorators: [
                  { title: 'Strong', value: 'strong' },
                  { title: 'Emphasis', value: 'em' },
                ],
                annotations: [],
              },
            },
          ],
        },
      ],
      preview: {
        select: {
          variant: 'variant',
        },
        prepare({ variant }) {
          return {
            title: `Callout: ${variant || 'note'}`,
          };
        },
      },
    }),
    defineArrayMember({
      type: 'object',
      name: 'imageBlock',
      title: 'Image Block',
      fields: [
        {
          name: 'image',
          type: 'imageWithAlt',
          title: 'Image',
          validation: (rule) => rule.required(),
        },
      ],
      preview: {
        select: {
          alt: 'image.alt',
          media: 'image.asset',
        },
        prepare({ alt, media }) {
          return {
            title: alt || 'Image block',
            media,
          };
        },
      },
    }),
  ],
});
