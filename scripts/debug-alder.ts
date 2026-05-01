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
  console.log('Raw Alder heroImage data:');
  const raw = await client.fetch(`*[_type == "speciesPage" && slug.current == "alder"][0].heroImage`);
  console.log(JSON.stringify(raw, null, 2));

  console.log('\nWith dereferencing:');
  const deref = await client.fetch(`*[_type == "speciesPage" && slug.current == "alder"][0] {
    heroImage {
      asset {
        asset-> { _id, url }
      },
      alt
    }
  }`);
  console.log(JSON.stringify(deref, null, 2));

  console.log('\nCompare to working species (Red Oak):');
  const redOak = await client.fetch(`*[_type == "speciesPage" && slug.current == "red-oak"][0].heroImage`);
  console.log(JSON.stringify(redOak, null, 2));
}

check().catch(console.error);
