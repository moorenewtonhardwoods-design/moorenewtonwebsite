import 'server-only';
import { client } from './client';
import type { QueryParams } from 'next-sanity';

export interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate,
}: SanityFetchOptions): Promise<T> {
  const start = Date.now();

  try {
    const result = await client.fetch<T>(query, params, {
      next: {
        revalidate: tags.length > 0 ? false : (revalidate ?? 3600),
        tags,
      },
    });

    if (process.env.NODE_ENV === 'development') {
      const duration = Date.now() - start;
      const queryPreview = query.slice(0, 60).replace(/\s+/g, ' ');
      console.log(`[sanity] ${duration}ms — ${queryPreview}...`);
    }

    return result;
  } catch (error) {
    console.error('[sanity] Query failed:', error instanceof Error ? error.message : error);
    throw new Error('Failed to fetch content');
  }
}

export async function sanityFetchOrNull<T>({
  query,
  params = {},
  tags = [],
  revalidate,
}: SanityFetchOptions): Promise<T | null> {
  try {
    const result = await sanityFetch<T | null>({ query, params, tags, revalidate });
    return result;
  } catch {
    return null;
  }
}
