/**
 * Seed Articles from Markdown Files
 *
 * Parses Copy/Article - *.md files and creates draft documents in Sanity.
 * Idempotent: uses createOrReplace with consistent _id pattern.
 *
 * Usage:
 *   npx tsx scripts/seed-articles.ts
 *
 * Requirements:
 *   - SANITY_API_WRITE_TOKEN in .env.local with write permissions
 *   - Article markdown files in ../moore-newton-website/Copy/
 */

import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

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

const COPY_DIR = path.join(__dirname, '../../moore-newton-website/Copy');

const ARTICLE_FILES = [
  'Article - White Oak vs Red Oak.md',
  'Article - Choosing Hardwood Plywood for Custom Cabinets.md',
  'Article - Understanding NHLA Grading.md',
  'Article - Veneer Core vs Combination Core.md',
];

const SPECIES_SLUG_MAPPINGS: Record<string, string[]> = {
  'white-oak-vs-red-oak': ['white-oak', 'red-oak'],
  'choosing-hardwood-plywood-for-custom-cabinets': [],
  'understanding-nhla-grading': [],
  'veneer-core-vs-combination-core': [],
};

interface ParsedArticle {
  slug: string;
  title: string;
  titleTag: string;
  metaDescription: string;
  primaryKeyword: string;
  leadParagraph: string;
  bodyContent: string;
  relatedSpeciesSlugs: string[];
}

function extractSlug(content: string): string {
  const match = content.match(/\*\*URL:\*\*\s*`\/articles\/([^`]+)`/);
  return match ? match[1].trim() : '';
}

function extractTitle(content: string): string {
  const match = content.match(/^# (.+)$/m);
  return match ? match[1].trim() : '';
}

function extractMetaTitle(content: string): string {
  const match = content.match(/\*\*Title tag[^:]*:\*\*\s*\n([^\n]+)/);
  return match ? match[1].trim() : '';
}

function extractMetaDescription(content: string): string {
  const match = content.match(/\*\*Meta description[^:]*:\*\*\s*\n([^\n]+)/);
  return match ? match[1].trim() : '';
}

function extractPrimaryKeyword(content: string): string {
  const match = content.match(/\*\*Primary keyword:\*\*\s*`([^`]+)`/);
  return match ? match[1].trim() : '';
}

function extractLead(content: string): string {
  const match = content.match(/## Lead\s*\n\n([\s\S]*?)(?=\n---)/);
  return match ? match[1].trim() : '';
}

function extractBodyContent(content: string): string {
  const leadEnd = content.indexOf('## Lead');
  if (leadEnd === -1) return '';

  const afterLead = content.indexOf('---', leadEnd + 10);
  if (afterLead === -1) return '';

  let body = content.slice(afterLead + 3);

  const notesStart = body.indexOf('## Notes & Decisions for Jack');
  if (notesStart !== -1) {
    body = body.slice(0, notesStart);
  }

  body = body.replace(/---\s*$/g, '').trim();

  return body;
}

function textToBlockContent(text: string, keyPrefix: string): object[] {
  if (!text) return [];

  const blocks: object[] = [];
  const lines = text.split('\n');
  let currentParagraph: string[] = [];
  let blockIndex = 0;
  let inList = false;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `${keyPrefix}${blockIndex++}`,
          style: 'normal',
          children: parseInlineFormatting(text, `${keyPrefix}${blockIndex}`),
        });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      listItems.forEach((item, i) => {
        blocks.push({
          _type: 'block',
          _key: `${keyPrefix}${blockIndex++}`,
          style: 'normal',
          listItem: 'bullet',
          level: 1,
          children: parseInlineFormatting(item, `${keyPrefix}${blockIndex}`),
        });
      });
      listItems = [];
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === '') {
      flushParagraph();
      flushList();
      continue;
    }

    if (trimmedLine.startsWith('## ')) {
      flushParagraph();
      flushList();
      const headingText = trimmedLine.replace(/^## /, '');
      blocks.push({
        _type: 'block',
        _key: `${keyPrefix}${blockIndex++}`,
        style: 'h2',
        children: [{ _type: 'span', _key: `${keyPrefix}${blockIndex}s`, text: headingText }],
      });
      continue;
    }

    if (trimmedLine.startsWith('### ')) {
      flushParagraph();
      flushList();
      const headingText = trimmedLine.replace(/^### /, '');
      blocks.push({
        _type: 'block',
        _key: `${keyPrefix}${blockIndex++}`,
        style: 'h3',
        children: [{ _type: 'span', _key: `${keyPrefix}${blockIndex}s`, text: headingText }],
      });
      continue;
    }

    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      flushParagraph();
      inList = true;
      listItems.push(trimmedLine.replace(/^[-*] /, ''));
      continue;
    }

    if (inList && !trimmedLine.startsWith('-') && !trimmedLine.startsWith('*')) {
      flushList();
    }

    currentParagraph.push(trimmedLine);
  }

  flushParagraph();
  flushList();

  return blocks;
}

function parseInlineFormatting(text: string, keyPrefix: string): object[] {
  const children: object[] = [];
  let remaining = text;
  let spanIndex = 0;

  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    let firstMatchIndex = remaining.length;
    let matchType: 'bold' | 'link' | null = null;
    let match: RegExpMatchArray | null = null;

    if (boldMatch && boldMatch.index !== undefined && boldMatch.index < firstMatchIndex) {
      firstMatchIndex = boldMatch.index;
      matchType = 'bold';
      match = boldMatch;
    }

    if (linkMatch && linkMatch.index !== undefined && linkMatch.index < firstMatchIndex) {
      firstMatchIndex = linkMatch.index;
      matchType = 'link';
      match = linkMatch;
    }

    if (firstMatchIndex > 0) {
      children.push({
        _type: 'span',
        _key: `${keyPrefix}s${spanIndex++}`,
        text: remaining.slice(0, firstMatchIndex),
      });
    }

    if (!match) {
      break;
    }

    if (matchType === 'bold') {
      children.push({
        _type: 'span',
        _key: `${keyPrefix}s${spanIndex++}`,
        text: match[1],
        marks: ['strong'],
      });
      remaining = remaining.slice(firstMatchIndex + match[0].length);
    } else if (matchType === 'link') {
      const href = match[2];
      const markKey = `link${spanIndex}`;
      children.push({
        _type: 'span',
        _key: `${keyPrefix}s${spanIndex++}`,
        text: match[1],
        marks: [markKey],
      });
      remaining = remaining.slice(firstMatchIndex + match[0].length);
    }
  }

  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: `${keyPrefix}s0`,
      text: text,
    });
  }

  return children;
}

function parseMarkdownFile(filePath: string): ParsedArticle | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    const slug = extractSlug(content);
    if (!slug) {
      console.warn(`Could not extract slug from ${filePath}`);
      return null;
    }

    const title = extractTitle(content);
    const relatedSpeciesSlugs = SPECIES_SLUG_MAPPINGS[slug] || [];

    return {
      slug,
      title,
      titleTag: extractMetaTitle(content),
      metaDescription: extractMetaDescription(content),
      primaryKeyword: extractPrimaryKeyword(content),
      leadParagraph: extractLead(content),
      bodyContent: extractBodyContent(content),
      relatedSpeciesSlugs,
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

async function getSpeciesIds(slugs: string[]): Promise<Array<{ _type: 'reference'; _ref: string; _key: string }>> {
  if (slugs.length === 0) return [];

  const species = await client.fetch<Array<{ _id: string; slug: { current: string } }>>(
    `*[_type == "speciesPage" && slug.current in $slugs] { _id, slug }`,
    { slugs }
  );

  return species.map((s, i) => ({
    _type: 'reference' as const,
    _ref: s._id.replace('drafts.', ''),
    _key: `species${i}`,
  }));
}

function createSanityDocument(
  parsed: ParsedArticle,
  relatedSpeciesRefs: Array<{ _type: 'reference'; _ref: string; _key: string }>
): { _id: string; _type: string; [key: string]: unknown } {
  const docId = `drafts.article-${parsed.slug}`;

  const fullBody = parsed.leadParagraph + '\n\n' + parsed.bodyContent;
  const bodyBlocks = textToBlockContent(fullBody, 'body');

  const doc: Record<string, unknown> = {
    _type: 'article',
    _id: docId,
    title: parsed.title,
    slug: { _type: 'slug', current: parsed.slug },
    body: bodyBlocks,
    relatedSpecies: relatedSpeciesRefs.length > 0 ? relatedSpeciesRefs : undefined,
    seo: {
      title: parsed.titleTag,
      description: parsed.metaDescription,
    },
  };

  return doc as { _id: string; _type: string; [key: string]: unknown };
}

async function seed() {
  console.log('Starting article seed...\n');

  const results = {
    success: [] as string[],
    failed: [] as string[],
    skipped: [] as string[],
    relationships: [] as { article: string; species: string[] }[],
  };

  for (const filename of ARTICLE_FILES) {
    const filePath = path.join(COPY_DIR, filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      results.skipped.push(filename);
      continue;
    }

    console.log(`Parsing ${filename}...`);
    const parsed = parseMarkdownFile(filePath);

    if (!parsed) {
      results.failed.push(filename);
      continue;
    }

    const relatedSpeciesRefs = await getSpeciesIds(parsed.relatedSpeciesSlugs);

    if (relatedSpeciesRefs.length > 0) {
      results.relationships.push({
        article: parsed.slug,
        species: parsed.relatedSpeciesSlugs,
      });
    }

    const doc = createSanityDocument(parsed, relatedSpeciesRefs);
    console.log(`  Creating draft: drafts.article-${parsed.slug}`);

    try {
      await client.createOrReplace(doc);
      results.success.push(parsed.slug);
      console.log(`  ✓ Created drafts.article-${parsed.slug}`);
    } catch (error) {
      console.error(`  ✗ Failed to create ${parsed.slug}:`, error);
      results.failed.push(filename);
    }
  }

  console.log('\n--- Seed Complete ---');
  console.log(`\n(a) Article slugs created: ${results.success.length}`);
  results.success.forEach((slug) => console.log(`    ✓ ${slug}`));

  console.log(`\n(b) URLs:`);
  results.success.forEach((slug) => console.log(`    /articles/${slug}`));

  console.log(`\n(c) Cross-link relationships:`);
  if (results.relationships.length > 0) {
    results.relationships.forEach((r) =>
      console.log(`    ${r.article} → ${r.species.join(', ')}`)
    );
  } else {
    console.log('    (none established)');
  }

  if (results.failed.length > 0) {
    console.log(`\nFailed: ${results.failed.length}`);
    results.failed.forEach((f) => console.log(`    - ${f}`));
  }

  console.log('\nView drafts in Sanity Studio:');
  console.log('  http://localhost:3000/studio/structure/article');
}

seed().catch(console.error);
