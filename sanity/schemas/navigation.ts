import { defineType, defineField } from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  description: 'Header and footer navigation structure',
  fields: [
    defineField({
      name: 'primaryNav',
      title: 'Primary Navigation',
      type: 'array',
      description: 'Top-level nav with one level of dropdown support',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (rule) => rule.required(),
            },
            {
              name: 'href',
              type: 'string',
              title: 'Link',
              description: 'Internal path or external URL',
              validation: (rule) => rule.required(),
            },
            {
              name: 'children',
              type: 'array',
              title: 'Dropdown Items',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required() },
                    { name: 'href', type: 'string', title: 'Link', validation: (rule) => rule.required() },
                  ],
                  preview: {
                    select: { label: 'label', href: 'href' },
                    prepare({ label, href }) {
                      return { title: label || 'Untitled', subtitle: href };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              label: 'label',
              href: 'href',
              children: 'children',
            },
            prepare({ label, href, children }) {
              const childCount = children?.length || 0;
              return {
                title: label || 'Untitled',
                subtitle: childCount > 0 ? `${href} (${childCount} items)` : href,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      description: 'Up to 4 footer columns',
      validation: (rule) => rule.max(4),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'heading',
              type: 'string',
              title: 'Column Heading',
              validation: (rule) => rule.required(),
            },
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required() },
                    { name: 'href', type: 'string', title: 'Link', validation: (rule) => rule.required() },
                  ],
                  preview: {
                    select: { label: 'label', href: 'href' },
                    prepare({ label, href }) {
                      return { title: label || 'Untitled', subtitle: href };
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              heading: 'heading',
              links: 'links',
            },
            prepare({ heading, links }) {
              const linkCount = links?.length || 0;
              return {
                title: heading || 'Untitled column',
                subtitle: `${linkCount} link${linkCount === 1 ? '' : 's'}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'utilityNav',
      title: 'Utility Navigation',
      type: 'array',
      description: 'Small top-bar links if used (e.g., "Quote," "Contact")',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required() },
            { name: 'href', type: 'string', title: 'Link', validation: (rule) => rule.required() },
          ],
          preview: {
            select: { label: 'label', href: 'href' },
            prepare({ label, href }) {
              return { title: label || 'Untitled', subtitle: href };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Navigation',
      };
    },
  },
});
