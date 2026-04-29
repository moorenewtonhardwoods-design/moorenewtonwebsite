/**
 * Publish Draft Documents
 *
 * Publishes all draft articles and the White Oak species document.
 *
 * Usage:
 *   npx tsx scripts/publish-drafts.ts
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

const DOCUMENTS_TO_PUBLISH = [
  'drafts.article-white-oak-vs-red-oak',
  'drafts.article-choosing-hardwood-plywood-for-custom-cabinets',
  'drafts.article-understanding-nhla-grading',
  'drafts.article-veneer-core-vs-combination-core',
  'species-white-oak',
];

async function publish() {
  console.log('Publishing draft documents...\n');

  for (const draftId of DOCUMENTS_TO_PUBLISH) {
    const publishedId = draftId.replace('drafts.', '');

    try {
      const draft = await client.getDocument(draftId);

      if (!draft) {
        const published = await client.getDocument(publishedId);
        if (published) {
          console.log(`  ✓ ${publishedId} is already published`);
        } else {
          console.log(`  ⚠ ${draftId} not found`);
        }
        continue;
      }

      const publishedDoc = {
        ...draft,
        _id: publishedId,
      };
      delete (publishedDoc as Record<string, unknown>)._rev;

      await client.createOrReplace(publishedDoc);
      await client.delete(draftId);

      console.log(`  ✓ Published ${publishedId}`);
    } catch (error) {
      console.error(`  ✗ Failed to publish ${draftId}:`, error);
    }
  }

  console.log('\nDone!');
}

publish().catch(console.error);
