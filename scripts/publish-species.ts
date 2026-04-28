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
  console.log('📄 Publishing all draft species documents...\n');

  // Find all draft species documents
  const drafts = await client.fetch<Array<{ _id: string; title: string }>>(
    `*[_type == "speciesPage" && _id in path("drafts.**")] { _id, title }`
  );

  if (drafts.length === 0) {
    console.log('No draft species documents found.');
    return;
  }

  console.log(`Found ${drafts.length} draft species to publish:\n`);

  for (const draft of drafts) {
    const publishedId = draft._id.replace('drafts.', '');

    try {
      // Get the full draft document
      const draftDoc = await client.getDocument(draft._id);

      if (!draftDoc) {
        console.log(`⚠️  ${draft.title}: Draft not found`);
        continue;
      }

      // Create/update the published version and delete the draft
      await client
        .transaction()
        .createOrReplace({
          ...draftDoc,
          _id: publishedId,
        })
        .delete(draft._id)
        .commit();

      console.log(`✅ ${draft.title}: Published`);
    } catch (error) {
      console.log(`❌ ${draft.title}: Failed - ${error}`);
    }
  }

  console.log('\n✨ Done!');
}

main().catch(console.error);
