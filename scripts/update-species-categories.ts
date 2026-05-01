/**
 * Update Species Categories
 *
 * One-time script to ensure all species have their category field set.
 *
 * Usage:
 *   npx tsx scripts/update-species-categories.ts
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

const CATEGORY_MAP: Record<string, 'domestic-hardwood' | 'imported-hardwood' | 'softwood' | 'specialty'> = {
  // Domestic Hardwoods
  'white-oak': 'domestic-hardwood',
  'white-oak-rift': 'domestic-hardwood',
  'rift-white-oak': 'domestic-hardwood',
  'quartersawn-white-oak': 'domestic-hardwood',
  'red-oak': 'domestic-hardwood',
  'cherry': 'domestic-hardwood',
  'walnut': 'domestic-hardwood',
  'black-walnut': 'domestic-hardwood',
  'hard-maple': 'domestic-hardwood',
  'soft-maple': 'domestic-hardwood',
  'alder': 'domestic-hardwood',
  'ash': 'domestic-hardwood',
  'birch': 'domestic-hardwood',
  'hickory': 'domestic-hardwood',
  'poplar': 'domestic-hardwood',
  'beech': 'domestic-hardwood',

  // Imported Hardwoods
  'african-mahogany': 'imported-hardwood',
  'honduran-mahogany': 'imported-hardwood',
  'sapele': 'imported-hardwood',
  'teak': 'imported-hardwood',
  'jatoba': 'imported-hardwood',
  'ipe': 'imported-hardwood',
  'wenge': 'imported-hardwood',
  'zebrawood': 'imported-hardwood',
  'padauk': 'imported-hardwood',
  'lacewood': 'imported-hardwood',
  'rosewood': 'imported-hardwood',

  // Softwoods
  'douglas-fir': 'softwood',
  'western-red-cedar': 'softwood',
  'aromatic-tennessee-cedar': 'softwood',
  'sugar-pine': 'softwood',
  'ponderosa-pine': 'softwood',
  'redwood': 'softwood',
  'white-pine': 'softwood',
  'hemlock': 'softwood',
  'spruce': 'softwood',
};

async function updateCategories() {
  console.log('Fetching all species documents...\n');

  const species = await client.fetch<Array<{ _id: string; title: string; slug: string; category?: string }>>(
    `*[_type == "speciesPage"] | order(title asc) { _id, title, "slug": slug.current, category }`
  );

  console.log(`Found ${species.length} species documents.\n`);

  const updates: Array<{ id: string; title: string; slug: string; oldCategory?: string; newCategory: string }> = [];
  const skipped: Array<{ id: string; title: string; slug: string; category: string }> = [];
  const unmapped: Array<{ id: string; title: string; slug: string }> = [];

  for (const s of species) {
    const slug = s.slug;
    const mappedCategory = CATEGORY_MAP[slug];

    if (s.category && s.category === mappedCategory) {
      skipped.push({ id: s._id, title: s.title, slug, category: s.category });
    } else if (mappedCategory) {
      updates.push({ id: s._id, title: s.title, slug, oldCategory: s.category, newCategory: mappedCategory });
    } else if (!s.category) {
      unmapped.push({ id: s._id, title: s.title, slug });
    } else {
      skipped.push({ id: s._id, title: s.title, slug, category: s.category });
    }
  }

  console.log('=== UPDATES TO APPLY ===');
  if (updates.length === 0) {
    console.log('  (none)\n');
  } else {
    for (const u of updates) {
      console.log(`  ${u.title} (${u.slug}): ${u.oldCategory || '(empty)'} → ${u.newCategory}`);
    }
    console.log('');
  }

  console.log('=== ALREADY CORRECT ===');
  if (skipped.length === 0) {
    console.log('  (none)\n');
  } else {
    for (const s of skipped) {
      console.log(`  ${s.title} (${s.slug}): ${s.category}`);
    }
    console.log('');
  }

  if (unmapped.length > 0) {
    console.log('=== UNMAPPED (need manual categorization) ===');
    for (const u of unmapped) {
      console.log(`  ${u.title} (${u.slug})`);
    }
    console.log('');
  }

  if (updates.length === 0) {
    console.log('No updates needed.');
    return;
  }

  console.log(`Applying ${updates.length} updates...\n`);

  for (const u of updates) {
    try {
      await client.patch(u.id).set({ category: u.newCategory }).commit();
      console.log(`  ✓ ${u.title} → ${u.newCategory}`);
    } catch (error) {
      console.error(`  ✗ ${u.title}: ${error}`);
    }
  }

  console.log('\nDone!');
}

updateCategories().catch(console.error);
