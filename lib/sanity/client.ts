import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from '@/sanity/env';

if (typeof window !== 'undefined') {
  throw new Error(
    'lib/sanity/client.ts must not be imported in client bundles. ' +
      'Use sanityFetch from lib/sanity/fetch.ts in server components only.'
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});
