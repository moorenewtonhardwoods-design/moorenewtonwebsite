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
  const species = await client.fetch(`
    *[_type == "speciesPage" && slug.current == "hard-maple"][0] {
      title,
      heroImage {
        asset {
          asset-> { _id, url }
        },
        alt
      },
      gallery[] {
        asset {
          asset-> { _id, url }
        },
        alt,
        caption
      }
    }
  `);

  console.log('Hard Maple data:\n');
  console.log(JSON.stringify(species, null, 2));
}

main().catch(console.error);
