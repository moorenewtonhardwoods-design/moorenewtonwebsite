import { createClient } from '@sanity/client';
import { config } from 'dotenv';

config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  const assets = await client.fetch<Array<{ _id: string; originalFilename: string }>>(
    `*[_type == "sanity.imageAsset"] | order(originalFilename asc) { _id, originalFilename }`
  );

  console.log(`Found ${assets.length} image assets:\n`);
  assets.forEach((a) => console.log(`  ${a.originalFilename}`));
}

main().catch(console.error);
