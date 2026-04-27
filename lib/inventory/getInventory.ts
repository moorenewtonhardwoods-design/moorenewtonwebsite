/**
 * Rosetta Stone Inventory Abstraction
 *
 * This module abstracts the inventory data source so that page components
 * don't need to know whether data comes from Sanity (static) or DMSI Agility (live).
 *
 * == V1 IMPLEMENTATION ==
 * Currently returns grades, thicknesses, and figured inventory from the Sanity
 * document. No live inventory quantities are shown — per CLAUDE.md §10, we do
 * not display fake "in stock" numbers.
 *
 * == FUTURE AGILITY INTEGRATION ==
 * When AGILITY_API_BASE_URL is set:
 * 1. Look up the Sanity document's `agilityId` field
 * 2. Call Agility API for live inventory data
 * 3. Fall back to Sanity data if Agility is unreachable
 * 4. Merge live stock levels with static grade/thickness info
 *
 * The function signature is designed so callers don't change when Agility goes live.
 */

import 'server-only';
import { sanityFetchOrNull } from '@/lib/sanity/fetch';
import type { GradeStocked, ThicknessSpec, BlockContent } from '@/sanity/types.generated';

export type InventoryType = 'species' | 'product';

export interface InventoryData {
  gradesStocked: GradeStocked[];
  thicknessesStocked: ThicknessSpec[];
  figuredInventory: BlockContent | null;
  agilityId: string | null;
}

interface SanityInventoryResult {
  gradesStocked?: Array<{ _key: string } & GradeStocked>;
  thicknessesStocked?: Array<{ _key: string } & ThicknessSpec>;
  figuredInventory?: BlockContent;
  agilityId?: string;
}

export async function getInventory(
  type: InventoryType,
  documentId: string
): Promise<InventoryData | null> {
  const docType = type === 'species' ? 'speciesPage' : 'productPage';

  const result = await sanityFetchOrNull<SanityInventoryResult>({
    query: /* groq */ `*[_type == $docType && _id == $id][0] {
      gradesStocked,
      thicknessesStocked,
      figuredInventory,
      agilityId
    }`,
    params: { docType, id: documentId },
    tags: [`sanity:${type}:${documentId}`],
  });

  if (!result) {
    return null;
  }

  return {
    gradesStocked: (result.gradesStocked ?? []) as GradeStocked[],
    thicknessesStocked: (result.thicknessesStocked ?? []) as ThicknessSpec[],
    figuredInventory: result.figuredInventory ?? null,
    agilityId: result.agilityId ?? null,
  };
}

export async function getInventoryBySlug(
  type: InventoryType,
  slug: string
): Promise<InventoryData | null> {
  const docType = type === 'species' ? 'speciesPage' : 'productPage';

  const result = await sanityFetchOrNull<SanityInventoryResult>({
    query: /* groq */ `*[_type == $docType && slug.current == $slug][0] {
      gradesStocked,
      thicknessesStocked,
      figuredInventory,
      agilityId
    }`,
    params: { docType, slug },
    tags: [`sanity:${type}:${slug}`],
  });

  if (!result) {
    return null;
  }

  return {
    gradesStocked: (result.gradesStocked ?? []) as GradeStocked[],
    thicknessesStocked: (result.thicknessesStocked ?? []) as ThicknessSpec[],
    figuredInventory: result.figuredInventory ?? null,
    agilityId: result.agilityId ?? null,
  };
}
