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
  'alder': 'alder',
  'ash': 'ash-plain-sliced',
  'white-oak': 'white-oak-plainsliced',
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
  'aromatic-tennessee-cedar': 'cedar-aromatic',
  'jatoba': 'jatoba',
  'sugar-pine': 'pine-clear',
  'ponderosa-pine': 'pine-knotty',
  // Pending species pages: beech (european-beech), bamboo
  // No swatches yet: honduran-mahogany, western-red-cedar
};

// Gallery mappings: species slug -> array of { filename, caption }
// Based on actual uploaded filenames in Sanity
// Note: white-oak gallery is empty because quartersawn and rift are separate species pages
const galleryMappings: Record<string, Array<{ filename: string; caption: string }>> = {
  // white-oak: no gallery (quartersawn and rift have their own species pages)
  'ash': [
    { filename: 'ash-quartersliced', caption: 'Quartersliced' },
  ],
  'red-oak': [
    { filename: 'red-oak-quartered', caption: 'Quartersliced' },
    { filename: 'red-oak-rift', caption: 'Rift' },
  ],
  'cherry': [
    { filename: 'cherry-quartered', caption: 'Quartersliced' },
  ],
  'walnut': [
    { filename: 'walnut-quartered', caption: 'Quartersliced' },
  ],
  'hard-maple': [
    { filename: 'maple-quartered', caption: 'Quartersliced' },
    { filename: 'maple-rotary', caption: 'Rotary' },
    { filename: 'maple-birsdeye', caption: 'Birdseye' }, // Note: typo in uploaded filename
  ],
  'african-mahogany': [
    { filename: 'mahogany-khaya-quartered', caption: 'Quartersliced' },
  ],
  'teak': [
    { filename: 'teak-quartered', caption: 'Quartersliced' },
  ],
};

// Alt text patterns based on species and cut
// Format: "<Species name> <cut> face showing <grain/color description>"
// Descriptions pulled verbatim from Copy/Species - *.md Grain & Appearance sections
// Keys match actual uploaded filenames in Sanity
const altTextMappings: Record<string, string> = {
  // Alder — diffuse-porous, fine uniform texture, pale tan to light reddish-brown
  'alder': 'Alder face showing fine uniform grain with pale tan to light reddish-brown color',
  // Ash — ring-porous, strong grain pattern, pale tan to light brown
  'ash-plain-sliced': 'Ash plain-sliced face showing bold cathedral grain with pale tan heartwood',
  'ash-quartersliced': 'Ash quartersliced face showing straight grain with consistent pale tan color',
  // European Beech — diffuse-porous, fine uniform texture, pale cream to light tan with pink undertones
  'beech': 'European beech face showing fine uniform grain with pale cream color and subtle pink undertones',
  // Bamboo — grass species with distinctive edge-grain appearance
  'bamboo-amber-edge-grain': 'Bamboo amber edge-grain panel showing caramelized color with linear striped pattern',
  'bamboo-natural-edge-grain': 'Bamboo natural edge-grain panel showing pale blonde color with linear striped pattern',
  // White Oak — ring-porous with closed heartwood, pale tan to warm medium brown with olive undertones
  'white-oak-plainsliced': 'White oak plain-sliced face showing bold cathedral grain with warm medium brown heartwood',
  'white-oak-quartered': 'Quartersawn white oak face showing medullary-ray fleck figure with straight grain',
  'white-oak-rift': 'Rift white oak face showing tight straight grain with minimal cathedral figure',
  // Red Oak — ring-porous with open pores throughout, pale pink to warm reddish-brown
  'red-oak-plainsliced': 'Red oak plain-sliced face showing bold cathedral grain with warm wheat-brown heartwood',
  'red-oak-quartered': 'Red oak quartersliced face showing straight grain with subtle ray fleck figure',
  'red-oak-rift': 'Red oak rift face showing tight parallel grain with consistent color',
  // Cherry — diffuse-porous, fine uniform texture, pale pink-tan aging to reddish-brown
  'cherry-plainsliced': 'Cherry plain-sliced face showing fine uniform grain with pale pink-tan heartwood',
  'cherry-quartered': 'Cherry quartersliced face showing linear straight grain with subtle ray figure',
  // Black Walnut — diffuse-porous, fine uniform texture, chocolate-brown heartwood
  'walnut-plainsliced': 'Black walnut plain-sliced face showing fine uniform grain with rich chocolate-brown heartwood',
  'walnut-quartered': 'Black walnut quartersliced face showing linear straight grain with deep brown tones',
  // Hard Maple — diffuse-porous, finest uniform texture, cream-white sapwood
  'maple-plainsliced': 'Hard maple plain-sliced face showing fine closed grain with cream-white color',
  'maple-quartered': 'Hard maple quartersliced face showing linear grain with tight uniform texture',
  'maple-rotary': 'Hard maple rotary face showing wide consistent grain with pale uniform color',
  'maple-birsdeye': 'Hard maple birdseye face showing distinctive eye-shaped figure throughout',
  // Soft Maple — lighter weight, easier to work, figured sorts available
  'maple-soft-curly': 'Soft maple curly face showing wavy chatoyant figure with light tan color',
  // African Mahogany (Khaya) — interlocked grain, reddish-brown with ribbon stripe on quarter
  'mahogany-khaya-plainsliced': 'African mahogany plain-sliced face showing interlocked grain with reddish-brown color',
  'mahogany-khaya-quartered': 'African mahogany quartersliced face showing ribbon stripe figure',
  // Birch — diffuse-porous, uniform light tan, rotary standard for plywood
  'birch-natural-rotary': 'Birch natural rotary face showing uniform light tan color with subtle grain',
  // Douglas Fir — softwood, prominent growth rings, vertical grain for stability
  'douglasfir-vg': 'Douglas fir vertical grain face showing tight parallel growth rings',
  // Hickory — ring-porous, dramatic sapwood/heartwood contrast
  'hickory': 'Hickory face showing bold grain with dramatic heartwood and sapwood contrast',
  // Poplar — diffuse-porous, straight grain, greenish-tan heartwood
  'poplar': 'Poplar face showing straight grain with characteristic greenish-tan heartwood',
  // Sapele — interlocked grain producing ribbon stripe, reddish-brown
  'sapele': 'Sapele face showing interlocked grain with ribbon stripe and reddish-brown color',
  // Teak — straight grain, golden-brown with natural oils
  'teak': 'Teak face showing straight grain with golden-brown color',
  'teak-quartered': 'Teak quartersliced face showing tight straight grain with golden tones',
  // Plywood-only species (captions from Copy/Plywood Face Species — Captions.md)
  'lacewood': 'Lacewood face showing distinctive lace-like ray fleck against pale pink-tan background',
  'padauk': 'Padauk face showing blood-red color with straight to interlocked grain',
  'wenge': 'Wenge face showing very dark brown color with darker striping and coarse open grain',
  'zebrawood': 'Zebrawood face showing sharp dark-on-light striping with pale gold to medium brown',
  // Aromatic Tennessee Cedar — diffuse-porous juniper, reddish-brown to purplish-red heartwood
  'cedar-aromatic': 'Aromatic Tennessee Cedar face showing reddish-brown heartwood with creamy sapwood contrast and tight knots',
  // Jatoba — diffuse-porous tropical hardwood, pale pink-tan aging to deep reddish-brown
  'jatoba': 'Jatoba face showing warm reddish-brown color with interlocked grain and uniform texture',
  // Sugar Pine — soft pattern-grade pine, creamy white to pale yellow-brown
  'pine-clear': 'Sugar Pine face showing uniform pale cream color with straight fine grain',
  // Ponderosa Pine — knotty Western pine, moderate latewood transition
  'pine-knotty': 'Ponderosa Pine face showing tight character knots with pale yellow-brown color',
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
