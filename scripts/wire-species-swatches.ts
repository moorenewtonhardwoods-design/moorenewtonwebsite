/**
 * Wire Species Swatches Script
 *
 * This script connects the uploaded hardwood species swatch images to their
 * corresponding species documents in Sanity.
 *
 * Run with: npx tsx scripts/wire-species-swatches.ts
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';

config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

// Hero image mappings: species slug -> asset filename (without extension)
// Based on actual uploaded filenames in Sanity and species slugs
const heroImageMappings: Record<string, string> = {
  'red-oak': 'red-oak-plainsliced',
  'quartersawn-white-oak': 'white-oak-quartered',
  'white-oak-rift': 'white-oak-rift',
  'cherry': 'cherry-plainsliced',
  'walnut': 'walnut-plainsliced',
  'hard-maple': 'maple-plainsliced',
  'soft-maple': 'maple-soft-curly',
  'african-mahogany': 'mahogany-khaya-plainsliced',
  'birch': 'birch-natural-rotary',
  'douglas-fir': 'douglasfir-vg',
  'hickory': 'hickory',
  'poplar': 'poplar',
  'sapele': 'sapele',
  'teak': 'teak',
};

// Gallery mappings: species slug -> array of { filename, caption }
// Based on actual uploaded filenames in Sanity
const galleryMappings: Record<string, Array<{ filename: string; caption: string }>> = {
  'white-oak': [
    { filename: 'white-oak-quartered', caption: 'Quartersawn' },
    { filename: 'white-oak-rift', caption: 'Rift' },
  ],
  'red-oak': [
    { filename: 'red-oak-quartered', caption: 'Quartersawn' },
    { filename: 'red-oak-rift', caption: 'Rift' },
  ],
  'cherry': [
    { filename: 'cherry-quartered', caption: 'Quartersawn' },
  ],
  'walnut': [
    { filename: 'walnut-quartered', caption: 'Quartersawn' },
  ],
  'hard-maple': [
    { filename: 'maple-quartered', caption: 'Quartersawn' },
    { filename: 'maple-rotary', caption: 'Rotary' },
    { filename: 'maple-birsdeye', caption: 'Birdseye' },
  ],
  'african-mahogany': [
    { filename: 'mahogany-khaya-quartered', caption: 'Quartersawn' },
  ],
  'teak': [
    { filename: 'teak-quartered', caption: 'Quartersawn' },
  ],
};

// Alt text patterns based on species and cut
// Format: "<Species name> <cut> face showing <grain/color description>"
// Keys match actual uploaded filenames in Sanity
const altTextMappings: Record<string, string> = {
  // White Oak
  'white-oak-plainsliced': 'White oak plain-sliced face showing cathedral grain with golden-tan heartwood',
  'white-oak-quartered': 'Quartersawn white oak face showing prominent ray fleck figure with straight grain',
  'white-oak-rift': 'Rift white oak face showing tight straight grain with minimal ray fleck',
  // Red Oak
  'red-oak-plainsliced': 'Red oak plain-sliced face showing prominent cathedral grain with pinkish-red tones',
  'red-oak-quartered': 'Red oak quartersawn face showing straight grain with ray fleck figure',
  'red-oak-rift': 'Red oak rift face showing tight parallel grain lines',
  // Cherry
  'cherry-plainsliced': 'Cherry plain-sliced face showing fine grain with warm reddish-brown heartwood',
  'cherry-quartered': 'Cherry quartersawn face showing straight grain with subtle figure',
  // Black Walnut
  'walnut-plainsliced': 'Black walnut plain-sliced face showing rich chocolate-brown heartwood with flowing grain',
  'walnut-quartered': 'Black walnut quartersawn face showing straight grain with deep brown tones',
  // Hard Maple
  'maple-plainsliced': 'Hard maple plain-sliced face showing fine closed grain with creamy white color',
  'maple-quartered': 'Hard maple quartersawn face showing straight tight grain',
  'maple-rotary': 'Hard maple rotary face showing wide consistent grain pattern',
  'maple-birsdeye': 'Hard maple birdseye face showing distinctive eye-shaped figure throughout',
  // Soft Maple
  'maple-soft-curly': 'Soft maple curly face showing wavy chatoyant figure with light tan color',
  // African Mahogany (Khaya)
  'mahogany-khaya-plainsliced': 'African mahogany plain-sliced face showing interlocked grain with reddish-brown color',
  'mahogany-khaya-quartered': 'African mahogany quartersawn face showing ribbon stripe figure',
  // Birch
  'birch-natural-rotary': 'Birch natural rotary face showing uniform light tan color with subtle grain',
  // Douglas Fir
  'douglasfir-vg': 'Douglas fir vertical grain face showing tight parallel growth rings',
  // Hickory
  'hickory': 'Hickory face showing bold grain pattern with contrasting heartwood and sapwood',
  // Poplar
  'poplar': 'Poplar face showing straight grain with greenish-tan heartwood',
  // Sapele
  'sapele': 'Sapele face showing interlocked grain with ribbon stripe and reddish-brown color',
  // Teak
  'teak': 'Teak face showing straight grain with golden-brown color and natural oils',
  'teak-quartered': 'Teak quartersawn face showing tight straight grain with golden tones',
  // Cedar
  'cedar-aromatic': 'Aromatic cedar face showing distinctive reddish-brown color with tight grain',
  // Pine
  'pine-clear': 'Clear pine face showing light color with minimal knots and straight grain',
  'pine-knotty': 'Knotty pine face showing characteristic knot pattern with warm golden tones',
  // Exotic species
  'jatoba': 'Jatoba face showing rich reddish-brown color with interlocked grain',
  'rosewood': 'Rosewood face showing deep purple-brown color with dramatic grain pattern',
  // Plywood-only species
  'lacewood': 'Lacewood face showing large distinctive ray fleck with silvery sheen',
  'padauk': 'Padauk face showing vibrant orange-red color with interlocked grain',
  'wenge': 'Wenge face showing dark brown color with fine black streaking',
};

interface SanityAsset {
  _id: string;
  originalFilename: string;
  url: string;
}

interface SpeciesDocument {
  _id: string;
  title: string;
  slug: { current: string };
}

async function findAssetByFilename(filename: string): Promise<SanityAsset | null> {
  const assets = await client.fetch<SanityAsset[]>(
    `*[_type == "sanity.imageAsset" && originalFilename match $pattern] {
      _id,
      originalFilename,
      url
    }`,
    { pattern: `${filename}*` }
  );

  if (assets.length === 0) {
    return null;
  }

  // Prefer exact match (with any extension)
  const exactMatch = assets.find(a =>
    a.originalFilename?.replace(/\.[^.]+$/, '').toLowerCase() === filename.toLowerCase()
  );

  return exactMatch || assets[0];
}

async function getAllSpecies(): Promise<SpeciesDocument[]> {
  return client.fetch<SpeciesDocument[]>(
    `*[_type == "speciesPage"] {
      _id,
      title,
      slug
    }`
  );
}

async function updateAssetAltText(assetId: string, altText: string): Promise<void> {
  await client.patch(assetId).set({ altText }).commit();
}

async function main() {
  console.log('🌳 Wiring species swatches to Sanity documents...\n');

  // Fetch all species
  const species = await getAllSpecies();
  console.log(`Found ${species.length} species documents\n`);

  const results = {
    heroImagesPaired: [] as string[],
    heroImagesEmpty: [] as string[],
    galleriesPopulated: [] as { species: string; cuts: string[] }[],
    errors: [] as string[],
  };

  // Process each species
  for (const sp of species) {
    const slug = sp.slug?.current;
    if (!slug) {
      console.log(`⚠️  Skipping species without slug: ${sp.title}`);
      continue;
    }

    const heroFilename = heroImageMappings[slug];

    // Step 2: Set hero image
    if (heroFilename) {
      const asset = await findAssetByFilename(heroFilename);

      if (asset) {
        const altText = altTextMappings[heroFilename] || `${sp.title} hardwood face`;

        // Update asset alt text
        try {
          await updateAssetAltText(asset._id, altText);
        } catch (e) {
          console.log(`  ⚠️  Could not update asset alt text: ${e}`);
        }

        // Set heroImage on species document
        try {
          await client.patch(sp._id).set({
            heroImage: {
              _type: 'imageWithAlt',
              asset: {
                _type: 'image',
                asset: {
                  _type: 'reference',
                  _ref: asset._id,
                },
              },
              alt: altText,
            },
          }).commit();

          console.log(`✅ ${sp.title}: heroImage set to ${heroFilename}`);
          results.heroImagesPaired.push(sp.title);
        } catch (e) {
          console.log(`❌ ${sp.title}: Failed to set heroImage - ${e}`);
          results.errors.push(`${sp.title} heroImage: ${e}`);
        }
      } else {
        console.log(`⚠️  ${sp.title}: Asset not found for ${heroFilename}`);
        results.heroImagesEmpty.push(sp.title);
      }
    } else {
      console.log(`⏭️  ${sp.title}: No hero mapping (will need future scan)`);
      results.heroImagesEmpty.push(sp.title);
    }

    // Step 3: Populate gallery
    const galleryItems = galleryMappings[slug];
    if (galleryItems && galleryItems.length > 0) {
      const galleryImages = [];
      const cuts = [];

      for (const item of galleryItems) {
        const asset = await findAssetByFilename(item.filename);

        if (asset) {
          const altText = altTextMappings[item.filename] || `${sp.title} ${item.caption} face`;

          // Update asset alt text
          try {
            await updateAssetAltText(asset._id, altText);
          } catch (e) {
            console.log(`  ⚠️  Could not update gallery asset alt text: ${e}`);
          }

          galleryImages.push({
            _type: 'imageWithAlt',
            _key: item.filename,
            asset: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: asset._id,
              },
            },
            alt: altText,
            caption: item.caption,
          });
          cuts.push(item.caption);
        } else {
          console.log(`  ⚠️  Gallery asset not found: ${item.filename}`);
        }
      }

      if (galleryImages.length > 0) {
        try {
          await client.patch(sp._id).set({ gallery: galleryImages }).commit();
          console.log(`  📸 Gallery: ${cuts.join(', ')}`);
          results.galleriesPopulated.push({ species: sp.title, cuts });
        } catch (e) {
          console.log(`  ❌ Failed to set gallery: ${e}`);
          results.errors.push(`${sp.title} gallery: ${e}`);
        }
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`\n(a) Hero images paired: ${results.heroImagesPaired.length}`);
  results.heroImagesPaired.forEach(s => console.log(`    ✅ ${s}`));

  console.log(`\n(b) Hero images empty (no swatch yet): ${results.heroImagesEmpty.length}`);
  results.heroImagesEmpty.forEach(s => console.log(`    ⏭️  ${s}`));

  console.log(`\n(c) Galleries populated:`);
  results.galleriesPopulated.forEach(g =>
    console.log(`    📸 ${g.species}: ${g.cuts.join(', ')}`)
  );

  if (results.errors.length > 0) {
    console.log(`\n❌ Errors: ${results.errors.length}`);
    results.errors.forEach(e => console.log(`    ${e}`));
  }

  console.log('\n✨ Done!');
}

main().catch(console.error);
