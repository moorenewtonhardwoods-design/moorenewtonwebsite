import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '3mozn5ff',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token: process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
});

async function check() {
  console.log('Checking Alder species document...\n');

  const alder = await client.fetch(`*[_type == "speciesPage" && slug.current == "alder"][0] {
    _id,
    title,
    heroImage {
      asset { _ref },
      alt
    }
  }`);
  console.log('Alder heroImage:', JSON.stringify(alder?.heroImage, null, 2));

  console.log('\nChecking for alder assets...');
  const assets = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename match "alder*"] { originalFilename, _id }`);
  console.log('Found', assets.length, 'alder assets:');
  assets.forEach((a: { originalFilename: string }) => console.log('  ', a.originalFilename));

  console.log('\nRecent uploads (last 10):');
  const recent = await client.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc) [0...10] { originalFilename, _createdAt }`);
  recent.forEach((a: { originalFilename: string; _createdAt: string }) => console.log('  ', a.originalFilename, '-', a._createdAt.substring(0, 10)));
}

check().catch(console.error);
