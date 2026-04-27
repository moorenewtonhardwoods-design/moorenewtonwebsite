import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  description: 'Sitewide facts surfaced in footer, contact blocks, JSON-LD, and metadata',
  fields: [
    defineField({
      name: 'legalName',
      title: 'Legal Name',
      type: 'string',
      description: 'Full legal company name, e.g., "Moore Newton Quality Hardwoods Corp."',
      validation: (rule) => rule.required().error('Legal name is required'),
    }),
    defineField({
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Short name for display, e.g., "Moore Newton Hardwoods"',
      validation: (rule) => rule.required().error('Display name is required'),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: "Company tagline, e.g., \"The Bay Area's Premier Distributor...\"",
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      description: 'Primary phone number. E.164 preferred, display format accepted.',
      validation: (rule) => rule.required().error('Phone number is required'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Primary contact email',
      validation: (rule) =>
        rule.required().email().error('A valid email address is required'),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', type: 'string', title: 'Street Address' },
        { name: 'city', type: 'string', title: 'City' },
        { name: 'state', type: 'string', title: 'State' },
        { name: 'zip', type: 'string', title: 'ZIP Code' },
        { name: 'country', type: 'string', title: 'Country', initialValue: 'USA' },
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'array',
      description: 'Leave day entry empty for closed',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              type: 'string',
              title: 'Day',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'open',
              type: 'string',
              title: 'Open',
              description: 'Opening time in HH:mm format, e.g., "07:00"',
            },
            {
              name: 'close',
              type: 'string',
              title: 'Close',
              description: 'Closing time in HH:mm format, e.g., "16:30"',
            },
          ],
          preview: {
            select: {
              day: 'day',
              open: 'open',
              close: 'close',
            },
            prepare({ day, open, close }) {
              const closed = !open || !close;
              return {
                title: day ? day.charAt(0).toUpperCase() + day.slice(1) : 'Day',
                subtitle: closed ? 'Closed' : `${open} - ${close}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'hoursNote',
      title: 'Hours Note',
      type: 'string',
      description: 'e.g., "Closed Saturday, Sunday, and major U.S. holidays"',
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'LinkedIn', value: 'linkedin' },
                ],
              },
              validation: (rule) => rule.required(),
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (rule) => rule.required(),
            },
            {
              name: 'handle',
              type: 'string',
              title: 'Handle',
              description: 'e.g., "@moorenewtonhardwoods"',
            },
          ],
          preview: {
            select: {
              platform: 'platform',
              handle: 'handle',
            },
            prepare({ platform, handle }) {
              return {
                title: platform ? platform.charAt(0).toUpperCase() + platform.slice(1) : 'Platform',
                subtitle: handle,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'foundingYear',
      title: 'Founding Year',
      type: 'number',
      validation: (rule) =>
        rule.integer().min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default OG Image',
      type: 'imageWithAlt',
      description: "Fallback OG image when a page doesn't specify one",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
