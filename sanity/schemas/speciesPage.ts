import { defineType, defineField } from 'sanity';

export const speciesPage = defineType({
  name: 'speciesPage',
  title: 'Species Page',
  type: 'document',
  description: 'Species pages at /species/[slug]',
  groups: [
    { name: 'identification', title: 'Identification', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'specs', title: 'Specs & Grades' },
    { name: 'content', title: 'Content Sections' },
    { name: 'related', title: 'Related & CTA' },
    { name: 'internal', title: 'Internal' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // === IDENTIFICATION ===
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Display name, e.g., "White Oak"',
      group: 'identification',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'identification',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required().error('Slug is required'),
    }),
    defineField({
      name: 'botanicalName',
      title: 'Botanical Name',
      type: 'string',
      description: 'e.g., "*Quercus alba*" — stored as markdown, rendered with italics',
      group: 'identification',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'identification',
      options: {
        list: [
          { title: 'Domestic Hardwood', value: 'domestic-hardwood' },
          { title: 'Imported Hardwood', value: 'imported-hardwood' },
          { title: 'Softwood', value: 'softwood' },
          { title: 'Specialty', value: 'specialty' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required().error('Category is required'),
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      description: 'Internal SEO tracking',
      group: 'identification',
    }),
    defineField({
      name: 'featuredOnHome',
      title: 'Featured on Home',
      type: 'boolean',
      description: 'Surfaces on the Home featuredSpecies picker',
      group: 'identification',
      initialValue: false,
    }),

    // === HERO ===
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'imageWithAlt',
      description: 'Primary species swatch image displayed in hero section',
      group: 'hero',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Additional cut images (quartersliced, rift, rotary, birdseye, etc.)',
      group: 'hero',
      of: [{ type: 'imageWithAlt' }],
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      group: 'hero',
      fields: [
        {
          name: 'h1',
          type: 'string',
          title: 'H1',
          description: 'Typically just the species name',
        },
        {
          name: 'subhead',
          type: 'string',
          title: 'Subhead',
          description: 'Spec-anchored subhead (botanical name, region, Janka, grain type)',
        },
        {
          name: 'leadParagraph',
          type: 'blockContent',
          title: 'Lead Paragraph',
          description: 'One-paragraph intro',
        },
      ],
    }),

    // === SPECS & GRADES ===
    defineField({
      name: 'specsAtAGlance',
      title: 'Specs at a Glance',
      type: 'array',
      description: '5–8 rows typical. Order preserved.',
      group: 'specs',
      of: [{ type: 'specRow' }],
    }),
    defineField({
      name: 'gradeIntro',
      title: 'Grade Introduction',
      type: 'blockContent',
      group: 'specs',
    }),
    defineField({
      name: 'gradesStocked',
      title: 'Grades Stocked',
      type: 'array',
      group: 'specs',
      validation: (rule) => rule.min(1).error('At least one grade is required'),
      of: [{ type: 'gradeStocked' }],
    }),
    defineField({
      name: 'alternativeGrades',
      title: 'Alternative Grades',
      type: 'blockContent',
      description: 'Optional: special-order note',
      group: 'specs',
    }),
    defineField({
      name: 'thicknessesStocked',
      title: 'Thicknesses Stocked',
      type: 'array',
      group: 'specs',
      of: [{ type: 'thicknessSpec' }],
    }),
    defineField({
      name: 'figuredInventory',
      title: 'Figured Inventory',
      type: 'blockContent',
      description: 'Optional: figured wood notes',
      group: 'specs',
    }),

    // === CONTENT SECTIONS ===
    defineField({
      name: 'whereItComesFrom',
      title: 'Where It Comes From',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'fscNote',
      title: 'FSC Note',
      type: 'blockContent',
      description: 'Standard FSC pattern per species',
      group: 'content',
    }),
    defineField({
      name: 'grainAndAppearance',
      title: 'Grain & Appearance',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'typicalUses',
      title: 'Typical Uses',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'workingCharacteristics',
      title: 'Working Characteristics',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'finishingNotes',
      title: 'Finishing Notes',
      type: 'blockContent',
      group: 'content',
    }),

    // === RELATED & CTA ===
    defineField({
      name: 'relatedSpecies',
      title: 'Related Species',
      type: 'array',
      description: 'Max 5, typical 3',
      group: 'related',
      validation: (rule) => rule.max(5),
      of: [{ type: 'relatedSpeciesRef' }],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'related',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faqItem' }],
        },
      ],
    }),
    defineField({
      name: 'showMillworkCta',
      title: 'Show Millwork CTA',
      type: 'boolean',
      description: 'Toggles the standard millwork CTA section',
      group: 'related',
      initialValue: false,
    }),
    defineField({
      name: 'millworkCta',
      title: 'Millwork CTA',
      type: 'object',
      description: 'Only shown if showMillworkCta is true',
      group: 'related',
      hidden: ({ parent }) => !parent?.showMillworkCta,
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'body', type: 'blockContent', title: 'Body' },
        { name: 'ctaLabel', type: 'string', title: 'CTA Label' },
        { name: 'ctaHref', type: 'string', title: 'CTA Link' },
      ],
    }),
    defineField({
      name: 'finalCta',
      title: 'Final CTA',
      type: 'object',
      group: 'related',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'body', type: 'blockContent', title: 'Body' },
        { name: 'primaryCta', type: 'ctaBlock', title: 'Primary CTA' },
      ],
    }),

    // === INTERNAL ===
    defineField({
      name: 'agilityId',
      title: 'Agility ID',
      type: 'string',
      description: 'DMSI Agility identifier for future live-inventory integration. Leave empty for v1.',
      group: 'internal',
    }),
    defineField({
      name: 'notesAndDecisionsForJack',
      title: 'Notes & Decisions for Jack',
      type: 'blockContent',
      description: 'Not rendered on public page; visible in Studio for editorial review',
      group: 'internal',
    }),

    // === SEO ===
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      botanicalName: 'botanicalName',
      category: 'category',
      slug: 'slug.current',
    },
    prepare({ title, botanicalName, category, slug }) {
      const categoryLabels: Record<string, string> = {
        'domestic-hardwood': 'Domestic',
        'imported-hardwood': 'Imported',
        softwood: 'Softwood',
        specialty: 'Specialty',
      };
      const categoryLabel = (category && categoryLabels[category]) || category || '';

      return {
        title: title || 'Untitled species',
        subtitle: `${botanicalName || ''} · ${categoryLabel} · /species/${slug || ''}`.replace(/^ · | · $/g, ''),
      };
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Category, then Title',
      name: 'categoryThenTitle',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
});
