/**
 * Seed Related Species Links
 *
 * Populates relatedSpecies array on all speciesPage documents.
 * Each species gets at least 2 related species based on logical groupings.
 *
 * Usage:
 *   npx tsx scripts/seed-related-species.ts
 *
 * Requirements:
 *   - SANITY_API_WRITE_TOKEN in .env.local with write permissions
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '3mozn5ff';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('SANITY_API_WRITE_TOKEN is required');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
});

const RELATED_SPECIES_MAP: Record<string, string[]> = {
  'white-oak': ['red-oak', 'quartersawn-white-oak', 'white-oak-rift'],
  'red-oak': ['white-oak', 'hickory', 'cherry'],
  'quartersawn-white-oak': ['white-oak', 'white-oak-rift', 'hard-maple'],
  'white-oak-rift': ['white-oak', 'quartersawn-white-oak', 'walnut'],
  'hard-maple': ['soft-maple', 'birch', 'cherry'],
  'soft-maple': ['hard-maple', 'birch', 'poplar'],
  'cherry': ['walnut', 'hard-maple', 'sapele'],
  'walnut': ['cherry', 'white-oak', 'african-mahogany'],
  'hickory': ['red-oak', 'hard-maple', 'ash'],
  'ash': ['hickory', 'red-oak', 'white-oak'],
  'birch': ['hard-maple', 'soft-maple', 'poplar'],
  'poplar': ['soft-maple', 'birch', 'alder'],
  'alder': ['poplar', 'soft-maple', 'cherry'],
  'african-mahogany': ['sapele', 'honduran-mahogany', 'walnut'],
  'sapele': ['african-mahogany', 'honduran-mahogany', 'cherry'],
  'honduran-mahogany': ['african-mahogany', 'sapele', 'teak'],
  'teak': ['honduran-mahogany', 'jatoba', 'western-red-cedar'],
  'jatoba': ['teak', 'african-mahogany', 'sapele'],
  'douglas-fir': ['ponderosa-pine', 'sugar-pine', 'western-red-cedar'],
  'ponderosa-pine': ['sugar-pine', 'douglas-fir', 'western-red-cedar'],
  'sugar-pine': ['ponderosa-pine', 'douglas-fir', 'western-red-cedar'],
  'western-red-cedar': ['aromatic-tennessee-cedar', 'douglas-fir', 'sugar-pine'],
  'aromatic-tennessee-cedar': ['western-red-cedar', 'walnut', 'cherry'],
};

interface SpeciesDoc {
  _id: string;
  title: string;
  slug: { current: string };
  relatedSpecies?: unknown[];
}

async function seed() {
  console.log('Starting related species seed...\n');

  const species = await client.fetch<SpeciesDoc[]>(
    `*[_type == "speciesPage" && defined(slug.current)] { _id, title, slug, relatedSpecies }`
  );

  console.log(`Found ${species.length} species documents\n`);

  const slugToId = new Map<string, string>();
  species.forEach((s) => {
    slugToId.set(s.slug.current, s._id);
  });

  let updated = 0;
  let skipped = 0;

  for (const doc of species) {
    const slug = doc.slug.current;
    const relatedSlugs = RELATED_SPECIES_MAP[slug];

    if (!relatedSlugs || relatedSlugs.length < 2) {
      console.log(`  ⚠ No mapping for ${slug}, skipping`);
      skipped++;
      continue;
    }

    if (doc.relatedSpecies && doc.relatedSpecies.length >= 2) {
      console.log(`  ✓ ${slug} already has ${doc.relatedSpecies.length} related species`);
      skipped++;
      continue;
    }

    const relatedRefs = relatedSlugs
      .map((relSlug, idx) => {
        const refId = slugToId.get(relSlug);
        if (!refId) {
          console.warn(`    Warning: species ${relSlug} not found in Sanity`);
          return null;
        }
        return {
          _type: 'relatedSpeciesRef',
          _key: `related${idx}`,
          species: {
            _type: 'reference',
            _ref: refId.replace('drafts.', ''),
          },
        };
      })
      .filter(Boolean);

    if (relatedRefs.length < 2) {
      console.log(`  ⚠ ${slug}: could only resolve ${relatedRefs.length} related species`);
      skipped++;
      continue;
    }

    try {
      await client.patch(doc._id).set({ relatedSpecies: relatedRefs }).commit();
      console.log(`  ✓ ${slug} -> ${relatedSlugs.slice(0, relatedRefs.length).join(', ')}`);
      updated++;
    } catch (error) {
      console.error(`  ✗ Failed to update ${slug}:`, error);
    }
  }

  console.log('\n--- Seed Complete ---');
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
}

seed().catch(console.error);
