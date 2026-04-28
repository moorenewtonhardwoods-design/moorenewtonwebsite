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

async function main() {
  console.log('Querying Sanity...');
  console.log('Project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET);

  const species = await client.fetch<Array<{ _id: string; title: string; slug: { current: string } }>>(
    `*[_type == "speciesPage"] { _id, title, slug }`
  );

  console.log(`\nFound ${species.length} species:\n`);
  species.forEach((s) => console.log(`  ${s.slug?.current} -> ${s.title}`));
}

main().catch(console.error);
