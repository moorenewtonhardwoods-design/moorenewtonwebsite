/**
 * Seed Species from Markdown Files
 *
 * Parses Copy/Species - *.md files and creates draft documents in Sanity.
 * Idempotent: uses createOrReplace with consistent _id pattern.
 *
 * Usage:
 *   npx tsx scripts/seed-species.ts
 *
 * Requirements:
 *   - SANITY_API_WRITE_TOKEN in .env.local with write permissions (Editor role or higher)
 *   - Species markdown files in ../moore-newton-website/Copy/
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
  console.error('Usage: SANITY_API_WRITE_TOKEN=<token> npx tsx scripts/seed-species.ts');
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

const SPECIES_FILES = [
  'Species - Cherry.md',
  'Species - Red Oak.md',
  'Species - Hard Maple.md',
  'Species - Black Walnut.md',
  'Species - Alder.md',
  'Species - Ash.md',
  'Species - Birch.md',
  'Species - African Mahogany.md',
  'Species - Douglas Fir.md',
  'Species - Hickory.md',
  'Species - Honduran Mahogany.md',
  'Species - Poplar.md',
  'Species - Quartersawn White Oak.md',
  'Species - Rift White Oak.md',
  'Species - Sapele.md',
  'Species - Soft Maple.md',
  'Species - Teak.md',
  'Species - Western Red Cedar.md',
];

const CATEGORY_MAP: Record<string, string> = {
  cherry: 'domestic-hardwood',
  'red oak': 'domestic-hardwood',
  'hard maple': 'domestic-hardwood',
  'black walnut': 'domestic-hardwood',
  walnut: 'domestic-hardwood',
  alder: 'domestic-hardwood',
  ash: 'domestic-hardwood',
  birch: 'domestic-hardwood',
  hickory: 'domestic-hardwood',
  poplar: 'domestic-hardwood',
  'soft maple': 'domestic-hardwood',
  'white oak': 'domestic-hardwood',
  'quartersawn white oak': 'domestic-hardwood',
  'rift white oak': 'domestic-hardwood',
  'rift-sawn white oak': 'domestic-hardwood',
  'african mahogany': 'imported-hardwood',
  'honduran mahogany': 'imported-hardwood',
  sapele: 'imported-hardwood',
  teak: 'imported-hardwood',
  'douglas fir': 'softwood',
  'western red cedar': 'softwood',
};

const FEATURED_SPECIES = [
  'white-oak',
  'walnut',
  'cherry',
  'hard-maple',
  'sapele',
  'honduran-mahogany',
];

interface ParsedSpecies {
  slug: string;
  title: string;
  titleTag: string;
  metaDescription: string;
  h1: string;
  primaryKeyword: string;
  subhead: string;
  leadParagraph: string;
  specs: Array<{ label: string; value: string }>;
  gradeIntro: string;
  grades: Array<{ grade: string; typicalUse: string }>;
  thicknesses: string[];
  figuredInventory: string;
  whereItComesFrom: string;
  fscNote: string;
  grainAndAppearance: string;
  typicalUses: string;
  workingCharacteristics: string;
  finishingNotes: string;
  relatedSpecies: string[];
  faqItems: Array<{ question: string; answer: string }>;
  millworkCta: { heading: string; body: string } | null;
  finalCtaHeading: string;
  finalCtaBody: string;
  category: string;
}

function extractSlug(content: string): string {
  const match = content.match(/# .+ — `\/species\/([^`]+)`/);
  return match ? match[1] : '';
}

function extractMetaTitle(content: string): string {
  const match = content.match(/\*\*Title tag[^:]*:\*\*\s*\n([^\n]+)/);
  return match ? match[1].trim() : '';
}

function extractMetaDescription(content: string): string {
  const match = content.match(/\*\*Meta description[^:]*:\*\*\s*\n([^\n]+)/);
  return match ? match[1].trim() : '';
}

function extractH1(content: string): string {
  const match = content.match(/\*\*H1:\*\*\s*([^\n]+)/);
  return match ? match[1].trim() : '';
}

function extractPrimaryKeyword(content: string): string {
  const match = content.match(/\*\*Primary keyword:\*\*\s*`([^`]+)`/);
  return match ? match[1].trim() : '';
}

function extractSubhead(content: string): string {
  const heroSection = content.match(/## 1\. Hero[\s\S]*?(?=---)/);
  if (!heroSection) return '';
  const subheadMatch = heroSection[0].match(/\*\*Subhead:\*\*\s*\n([^\n]+)/);
  return subheadMatch ? subheadMatch[1].trim() : '';
}

function extractLeadParagraph(content: string): string {
  const heroSection = content.match(/## 1\. Hero[\s\S]*?(?=---)/);
  if (!heroSection) return '';
  const leadMatch = heroSection[0].match(/\*\*Lead paragraph:\*\*\s*\n([\s\S]*?)(?=\n---|\n\n##)/);
  return leadMatch ? leadMatch[1].trim() : '';
}

function extractSpecsTable(content: string): Array<{ label: string; value: string }> {
  const specsSection = content.match(/## 2\. Specs at a Glance[\s\S]*?(?=---)/);
  if (!specsSection) return [];

  const specs: Array<{ label: string; value: string }> = [];
  const tableRows = specsSection[0].matchAll(/\| \*\*([^*]+)\*\* \| ([^|]+) \|/g);

  for (const row of tableRows) {
    specs.push({
      label: row[1].trim(),
      value: row[2].trim(),
    });
  }

  return specs;
}

function extractGradeIntro(content: string): string {
  const gradeSection = content.match(/## 3\. Grade & Availability[\s\S]*?(?=---)/);
  if (!gradeSection) return '';
  const introMatch = gradeSection[0].match(/\*\*Intro:\*\*\s*\n([\s\S]*?)(?=\n\n\*\*Grade|\n\n\|)/);
  return introMatch ? introMatch[1].trim() : '';
}

function extractGradesTable(content: string): Array<{ grade: string; typicalUse: string }> {
  const gradeSection = content.match(/## 3\. Grade & Availability[\s\S]*?(?=---)/);
  if (!gradeSection) return [];

  const grades: Array<{ grade: string; typicalUse: string }> = [];
  const tableRows = gradeSection[0].matchAll(/\| \*\*([^*]+)\*\* \| ([^|]+) \|/g);

  for (const row of tableRows) {
    if (row[1].toLowerCase() !== 'grade') {
      grades.push({
        grade: row[1].trim(),
        typicalUse: row[2].trim(),
      });
    }
  }

  return grades;
}

function extractThicknesses(content: string): string[] {
  const match = content.match(/\*\*Thicknesses stocked[^:]*:\*\*\s*\n?([^\n]+)/);
  if (!match) return [];
  const thicknessStr = match[1].trim();
  const thicknesses = thicknessStr.match(/\d+\/\d+/g);
  return thicknesses || [];
}

function extractSection(content: string, sectionNum: number, sectionName: string): string {
  const regex = new RegExp(`## ${sectionNum}\\. ${sectionName}[\\s\\S]*?(?=\\n---)`);
  const match = content.match(regex);
  if (!match) return '';

  let text = match[0]
    .replace(new RegExp(`## ${sectionNum}\\. ${sectionName}\\s*\\n+`), '')
    .trim();

  if (text.startsWith('**')) {
    const bodyStart = text.indexOf('\n\n');
    if (bodyStart > -1) {
      text = text.slice(bodyStart + 2).trim();
    }
  }

  return text;
}

function extractFSCNote(content: string): string {
  const whereSection = content.match(/## 4\. Where It Comes From[\s\S]*?(?=---)/);
  if (!whereSection) return '';
  const fscMatch = whereSection[0].match(/\*\*FSC note:\*\*\s*([^\n]+(?:\n(?!\n)[^\n]+)*)/);
  return fscMatch ? fscMatch[1].trim() : '';
}

function extractWhereItComesFrom(content: string): string {
  const section = content.match(/## 4\. Where It Comes From[\s\S]*?(?=---)/);
  if (!section) return '';

  let text = section[0]
    .replace(/## 4\. Where It Comes From[^\n]*\n+/, '')
    .replace(/\*\*FSC note:\*\*[\s\S]*$/, '')
    .trim();

  return text;
}

function extractFiguredInventory(content: string): string {
  const match = content.match(/\*\*Figured inventory:\*\*\s*([^\n]+(?:\n(?!\n|\*\*)[^\n]+)*)/);
  return match ? match[1].trim() : '';
}

function extractFAQs(content: string): Array<{ question: string; answer: string }> {
  const faqSection = content.match(/## 10\. FAQ[\s\S]*?(?=---)/);
  if (!faqSection) return [];

  const faqs: Array<{ question: string; answer: string }> = [];
  const qaPairs = faqSection[0].matchAll(/\*\*([^*]+\?)\*\*\s*\n([\s\S]*?)(?=\n\n\*\*|\n---)/g);

  for (const pair of qaPairs) {
    faqs.push({
      question: pair[1].trim(),
      answer: pair[2].trim(),
    });
  }

  return faqs;
}

function extractMillworkCta(content: string): { heading: string; body: string } | null {
  const millworkSection = content.match(/## 11\. In-House Millwork[\s\S]*?(?=---)/);
  if (!millworkSection) return null;

  const heading = 'Custom Millwork Available';
  const body = millworkSection[0]
    .replace(/## 11\. In-House Millwork\s*\n+/, '')
    .replace(/\*\*CTA button:\*\*[^\n]+/, '')
    .trim();

  return { heading, body };
}

function extractRelatedSpecies(content: string): string[] {
  const section = content.match(/## 9\. Related Species[\s\S]*?(?=---)/);
  if (!section) return [];

  const slugs: string[] = [];
  const links = section[0].matchAll(/\[([^\]]+)\]\(\/species\/([^)]+)\)/g);

  for (const link of links) {
    slugs.push(link[2]);
  }

  return slugs;
}

function parseMarkdownFile(filePath: string): ParsedSpecies | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    const slug = extractSlug(content);
    if (!slug) {
      console.warn(`Could not extract slug from ${filePath}`);
      return null;
    }

    const h1 = extractH1(content);
    const title = h1 || slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    const category = CATEGORY_MAP[title.toLowerCase()] || 'specialty';

    return {
      slug,
      title,
      titleTag: extractMetaTitle(content),
      metaDescription: extractMetaDescription(content),
      h1,
      primaryKeyword: extractPrimaryKeyword(content),
      subhead: extractSubhead(content),
      leadParagraph: extractLeadParagraph(content),
      specs: extractSpecsTable(content),
      gradeIntro: extractGradeIntro(content),
      grades: extractGradesTable(content),
      thicknesses: extractThicknesses(content),
      figuredInventory: extractFiguredInventory(content),
      whereItComesFrom: extractWhereItComesFrom(content),
      fscNote: extractFSCNote(content),
      grainAndAppearance: extractSection(content, 5, 'Grain & Appearance'),
      typicalUses: extractSection(content, 6, 'Typical Uses'),
      workingCharacteristics: extractSection(content, 7, 'Working Characteristics'),
      finishingNotes: extractSection(content, 8, 'Finishing Notes'),
      relatedSpecies: extractRelatedSpecies(content),
      faqItems: extractFAQs(content),
      millworkCta: extractMillworkCta(content),
      finalCtaHeading: `Need ${title.toLowerCase()} for a project?`,
      finalCtaBody:
        "Send us a cutlist or describe what you're working on. We'll confirm pricing, availability, and delivery within the day.",
      category,
    };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

function textToBlockContent(text: string, keyPrefix: string): object[] {
  if (!text) return [];

  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());

  return paragraphs.map((p, i) => ({
    _type: 'block',
    _key: `${keyPrefix}${i}`,
    style: 'normal',
    children: [
      {
        _type: 'span',
        _key: `${keyPrefix}${i}s`,
        text: p.trim().replace(/\n/g, ' '),
      },
    ],
  }));
}

function createSanityDocument(parsed: ParsedSpecies): { _id: string; _type: string; [key: string]: unknown } {
  const docId = `drafts.species-${parsed.slug}`;

  const doc: Record<string, unknown> = {
    _type: 'speciesPage',
    _id: docId,
    title: parsed.title,
    slug: { _type: 'slug', current: parsed.slug },
    botanicalName: extractBotanicalName(parsed.subhead),
    category: parsed.category,
    primaryKeyword: parsed.primaryKeyword,
    featuredOnHome: FEATURED_SPECIES.includes(parsed.slug),
    hero: {
      h1: parsed.h1,
      subhead: parsed.subhead,
      leadParagraph: textToBlockContent(parsed.leadParagraph, 'lead'),
    },
    specsAtAGlance: parsed.specs.map((spec, i) => ({
      _type: 'specRow',
      _key: `spec${i}`,
      label: spec.label,
      value: spec.value,
    })),
    gradeIntro: textToBlockContent(parsed.gradeIntro, 'gradeintro'),
    gradesStocked: parsed.grades.map((grade, i) => ({
      _type: 'gradeStocked',
      _key: `grade${i}`,
      grade: grade.grade,
      typicalUse: textToBlockContent(grade.typicalUse, `gradeuse${i}`),
    })),
    thicknessesStocked: parsed.thicknesses.map((t, i) => ({
      _type: 'thicknessSpec',
      _key: `thick${i}`,
      thickness: t,
      dimensioning: 'rough',
    })),
    figuredInventory: textToBlockContent(parsed.figuredInventory, 'fig'),
    whereItComesFrom: textToBlockContent(parsed.whereItComesFrom, 'where'),
    fscNote: textToBlockContent(parsed.fscNote, 'fsc'),
    grainAndAppearance: textToBlockContent(parsed.grainAndAppearance, 'grain'),
    typicalUses: textToBlockContent(parsed.typicalUses, 'uses'),
    workingCharacteristics: textToBlockContent(parsed.workingCharacteristics, 'work'),
    finishingNotes: textToBlockContent(parsed.finishingNotes, 'finish'),
    showMillworkCta: !!parsed.millworkCta,
    finalCta: {
      heading: parsed.finalCtaHeading,
      body: textToBlockContent(parsed.finalCtaBody, 'finalcta'),
      primaryCta: {
        label: `Request a Quote — ${parsed.title}`,
        href: '/quote',
        variant: 'primary',
      },
    },
    seo: {
      title: parsed.titleTag,
      description: parsed.metaDescription,
    },
  };

  if (parsed.millworkCta) {
    doc.millworkCta = {
      heading: parsed.millworkCta.heading,
      body: textToBlockContent(parsed.millworkCta.body, 'millwork'),
      ctaLabel: 'Request Millwork Quote',
      ctaHref: '/quote',
    };
  }

  return doc as { _id: string; _type: string; [key: string]: unknown };
}

function extractBotanicalName(subhead: string): string {
  const match = subhead.match(/\*([^*]+)\*/);
  return match ? match[1].trim() : '';
}

async function seed() {
  console.log('Starting species seed...\n');

  const results = {
    success: [] as string[],
    failed: [] as string[],
    skipped: [] as string[],
  };

  for (const filename of SPECIES_FILES) {
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

    const doc = createSanityDocument(parsed);
    console.log(`  Creating draft: drafts.species-${parsed.slug}`);

    try {
      await client.createOrReplace(doc);
      results.success.push(parsed.slug);
      console.log(`  ✓ Created drafts.species-${parsed.slug}`);
    } catch (error) {
      console.error(`  ✗ Failed to create ${parsed.slug}:`, error);
      results.failed.push(filename);
    }
  }

  console.log('\n--- Seed Complete ---');
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`Skipped: ${results.skipped.length}`);

  if (results.success.length > 0) {
    console.log('\nSuccessfully created drafts:');
    results.success.forEach((slug) => console.log(`  - drafts.species-${slug}`));
  }

  if (results.failed.length > 0) {
    console.log('\nFailed:');
    results.failed.forEach((f) => console.log(`  - ${f}`));
  }

  console.log('\nView drafts in Sanity Studio:');
  console.log(
    `  https://moorenewton.sanity.studio/structure/speciesPage;drafts.species-{slug}`
  );
}

seed().catch(console.error);
