/**
 * Add publishedAt dates to articles
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@sanity/client';

const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error('SANITY_API_WRITE_TOKEN is required');
  process.exit(1);
}

const client = createClient({
  projectId: '3mozn5ff',
  dataset: 'production',
  apiVersion: '2024-10-01',
  token,
  useCdn: false,
});

const ARTICLES = [
  'article-white-oak-vs-red-oak',
  'article-choosing-hardwood-plywood-for-custom-cabinets',
  'article-understanding-nhla-grading',
  'article-veneer-core-vs-combination-core',
];

async function addPublishDates() {
  const now = new Date().toISOString();
  console.log('Adding publishedAt dates...\n');

  for (const id of ARTICLES) {
    try {
      await client.patch(id).set({ publishedAt: now }).commit();
      console.log(`  ✓ ${id} → publishedAt: ${now}`);
    } catch (error) {
      console.error(`  ✗ ${id}:`, error);
    }
  }

  console.log('\nDone!');
}

addPublishDates().catch(console.error);
