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

const whiteOakDocument = {
  _type: 'speciesPage',
  _id: 'species-white-oak',
  title: 'White Oak (Plain-Sawn)',
  slug: { _type: 'slug', current: 'white-oak' },
  botanicalName: 'Quercus alba',
  category: 'domestic-hardwood',
  primaryKeyword: 'white oak lumber bay area',
  featuredOnHome: true,
  hero: {
    h1: 'White Oak (Plain-Sawn)',
    subhead:
      'Quercus alba · Appalachian · 1,350 lbf Janka · Ring-porous with closed-grain heartwood',
    leadParagraph: [
      {
        _type: 'block',
        _key: 'lead1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: "White oak is the defining hardwood of modern Bay Area cabinetry and architectural millwork. Specified in kitchens, hospitality fit-outs, flooring, and furniture from Sonoma to San Jose, it's also the hardwood that barrel coopers have trusted for centuries — the same tyloses that make white oak watertight in a whiskey cask make it dimensionally stable in a cabinet face. Moore Newton stocks plain-sawn white oak in 4/4 through 16/4 at our Williams Street facility in San Leandro, with a deep bench of wide-sort FAS, a 4/4 Rustic line, and premium color-sorted stock pulled directly from our mill network.",
          },
        ],
      },
    ],
  },
  specsAtAGlance: [
    { _type: 'specRow', _key: 'spec1', label: 'Botanical name', value: 'Quercus alba (Fagaceae)' },
    { _type: 'specRow', _key: 'spec2', label: 'Janka hardness', value: '1,350 lbf' },
    { _type: 'specRow', _key: 'spec3', label: 'Average dried weight', value: '47 lbs/ft³' },
    {
      _type: 'specRow',
      _key: 'spec4',
      label: 'Typical moisture content (kiln-dried)',
      value: '6–8%',
    },
    {
      _type: 'specRow',
      _key: 'spec5',
      label: 'Grain & figure',
      value:
        'Ring-porous with closed, tylosis-filled heartwood. Plain-sawn shows strong cathedrals; rustic sub-grade allows knots and natural character.',
    },
    {
      _type: 'specRow',
      _key: 'spec6',
      label: 'Workability',
      value: 'Moderate. Hard but responds well to sharp tools. Dulls blades on extended runs.',
    },
  ],
  gradeIntro: [
    {
      _type: 'block',
      _key: 'grade1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'Plain-sawn white oak is stocked at Moore Newton in FAS grade across every thickness from 4/4 to 16/4, plus a dedicated Rustic sub-grade in 4/4, plus wide-sort specifications that pull the widest boards out of our FAS inventory. We pay a premium to source stock sorted for consistent color within FAS — a specification most Bay Area builders want and few distributors hold. Rough-sawn is the default; S3S and S4S milling are stocked in select thicknesses and widths.',
        },
      ],
    },
  ],
  gradesStocked: [
    {
      _type: 'gradeStocked',
      _key: 'g1',
      grade: 'FAS',
      typicalUse: [
        {
          _type: 'block',
          _key: 'gu1',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Premium clear-face work — cabinet doors, furniture tops, architectural trim. Long clear cuttings with minimal defects. Stocked in every thickness from 4/4 through 16/4.',
            },
          ],
        },
      ],
    },
    {
      _type: 'gradeStocked',
      _key: 'g2',
      grade: 'FAS Wide-Sort (4/4)',
      typicalUse: [
        {
          _type: 'block',
          _key: 'gu2',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'FAS stock sorted for 8" and 10"-and-wider boards in 4/4. Specified for wide panels, single-board table components, and architectural millwork where board width is the design intent.',
            },
          ],
        },
      ],
    },
    {
      _type: 'gradeStocked',
      _key: 'g3',
      grade: 'FAS Wide-Sort (8/4)',
      typicalUse: [
        {
          _type: 'block',
          _key: 'gu3',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'FAS stock sorted for 9"-and-wider boards in 8/4. Specified for thick wide table tops, door stiles, and bench seats.',
            },
          ],
        },
      ],
    },
    {
      _type: 'gradeStocked',
      _key: 'g4',
      grade: 'FAS Premium Color-Sort',
      typicalUse: [
        {
          _type: 'block',
          _key: 'gu4',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'FAS stock sorted for consistent color across a run. Moore Newton pays a premium to source this sort from our mill partners because it\'s a specification Bay Area builders and architects increasingly request for whole-run white oak work. Available across thicknesses on request.',
            },
          ],
        },
      ],
    },
    {
      _type: 'gradeStocked',
      _key: 'g5',
      grade: 'Rustic White Oak (4/4)',
      typicalUse: [
        {
          _type: 'block',
          _key: 'gu5',
          style: 'normal',
          children: [
            {
              _type: 'span',
              _key: 's1',
              text: 'Intentional inclusion of sound knots, mineral streaking, and natural character. Stocked in 4/4 only. Specified for wide-plank flooring, farmhouse cabinetry, and projects where natural character is the design intent.',
            },
          ],
        },
      ],
    },
  ],
  thicknessesStocked: [
    { _type: 'thicknessSpec', _key: 't1', thickness: '4/4', dimensioning: 'rough' },
    { _type: 'thicknessSpec', _key: 't2', thickness: '5/4', dimensioning: 'rough' },
    { _type: 'thicknessSpec', _key: 't3', thickness: '6/4', dimensioning: 'rough' },
    { _type: 'thicknessSpec', _key: 't4', thickness: '8/4', dimensioning: 'rough' },
    { _type: 'thicknessSpec', _key: 't5', thickness: '10/4', dimensioning: 'rough' },
    { _type: 'thicknessSpec', _key: 't6', thickness: '12/4', dimensioning: 'rough' },
    { _type: 'thicknessSpec', _key: 't7', thickness: '16/4', dimensioning: 'rough' },
  ],
  figuredInventory: [
    {
      _type: 'block',
      _key: 'fig1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: "We do not stock curly or figured white oak in plain-sawn. Figured white oak is not a regular market category in plain-sawn stock; the species' figure story lives in rift and quartersawn cuts, where the medullary rays produce the signature ray-fleck figure.",
        },
      ],
    },
  ],
  whereItComesFrom: [
    {
      _type: 'block',
      _key: 'where1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'Moore Newton sources white oak primarily from the Appalachian region — Pennsylvania, Ohio, West Virginia, Kentucky, and Tennessee. Appalachian white oak grows more slowly than its Midwestern and Southern counterparts, which produces the tighter grain and more consistent color that Bay Area cabinetmakers and architects expect. The hardwood forests of the Appalachian region have grown in total standing volume for decades — a rare example of a commercial timber region where the resource is expanding, not contracting, under current forestry practice.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'where2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'Our primary mill partners maintain NHLA certification, and we pay a premium for color-sorted runs that meet our FAS Premium Color-Sort specification.',
        },
      ],
    },
  ],
  fscNote: [
    {
      _type: 'block',
      _key: 'fsc1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'Moore Newton does not stock FSC-certified white oak lumber as standard inventory. FSC-certified white oak can be special-ordered through our mill network; lead time and pricing are confirmed at the quote stage.',
        },
      ],
    },
  ],
  grainAndAppearance: [
    {
      _type: 'block',
      _key: 'grain1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: "White oak is a ring-porous hardwood with large open pores in the earlywood and closed, tylosis-filled pores in the latewood and heartwood. Tyloses — the balloon-shaped cell ingrowths that plug the vessels — are the single reason white oak behaves so differently from red oak despite the two species' surface similarity. It's why white oak holds liquid (wine and whiskey barrels), why it resists rot in exterior applications, and why it takes stain unevenly compared to red oak.",
        },
      ],
    },
    {
      _type: 'block',
      _key: 'grain2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'Color ranges from pale tan in young sapwood through warm medium brown in mature heartwood, often with olive or gray-green undertones that shift toward honey tones as the wood ages. UV exposure drives the color further toward amber over months to years. Plain-sawn white oak shows bold cathedral grain; our FAS Premium Color-Sort specification narrows the color range across a run to produce a more uniform visual surface across whole-kitchen and large-architectural installations.',
        },
      ],
    },
    {
      _type: 'block',
      _key: 'grain3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'Rustic white oak — our 4/4 sub-grade — allows sound knots, mineral streaking, and other natural character that would not pass FAS. Specified for wide-plank flooring, farmhouse cabinetry, and projects where the character is the design intent rather than a defect.',
        },
      ],
    },
  ],
  typicalUses: [
    {
      _type: 'block',
      _key: 'uses1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'Bay Area cabinetmakers specify plain-sawn white oak primarily for full-kitchen casework, bathroom vanities, built-ins, and architectural doors. Millwork firms use 4/4 and 5/4 for wall paneling and 8/4 for architectural trim and door stiles. Flooring and stair-tread work pulls 4/4 and 5/4 in volume — and for wide-plank flooring specifications, the Rustic sub-grade is often the right call. Furniture makers use 8/4 through 12/4 for table tops, bench seats, and chair components, while 16/4 stock sees demand from timber-frame and heavy-furniture builders. FAS Wide-Sort stock is pulled heavily for single-board table work, wide furniture tops, and modern architectural millwork where visible board width is the design intent.',
        },
      ],
    },
  ],
  workingCharacteristics: [
    {
      _type: 'block',
      _key: 'work1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: 'White oak machines moderately well. Sharp carbide blades are recommended for ripping and crosscuts; HSS tooling dulls noticeably on long production runs. It planes and joints cleanly when feed rates are moderate. It glues well with standard yellow and polyurethane wood glues. It accepts screws and nails reliably, though predrilling is recommended near end grain to prevent splitting. One practical caveat: white oak reacts with iron in the presence of moisture, producing a dark blue-black stain. For exterior work, outdoor furniture, and any application where fasteners or hardware might oxidize, stainless steel or coated fasteners are the standard specification.',
        },
      ],
    },
  ],
  finishingNotes: [
    {
      _type: 'block',
      _key: 'finish1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: "White oak takes stain unevenly: the open pores of plain-sawn earlywood absorb stain far more deeply than the closed, tylosis-filled pores of the latewood. Cabinetmakers finishing plain-sawn white oak for stained cabinetry often pre-seal with a washcoat to equalize absorption. Oil finishes — Rubio Monocoat, Osmo, hardwax oils — are the dominant modern specification for white oak kitchens and millwork. Fumed white oak (traditional ammonia fuming) remains a useful technique for darkening the wood without masking the grain, and the reaction runs more strongly with white oak than with most other species thanks to the wood's high tannin content.",
        },
      ],
    },
  ],
  showMillworkCta: true,
  millworkCta: {
    heading: 'Custom White Oak Millwork',
    body: [
      {
        _type: 'block',
        _key: 'mill1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Moore Newton runs a full millwork facility in-house at our Williams Street location. Custom plain-sawn white oak profiles are milled from our inventory — including wide-sort and color-sorted FAS stock — with knives cut in-house on our CNC machine. Standard turnaround is 5–7 business days; rush orders are available on request.',
          },
        ],
      },
    ],
    ctaLabel: 'Request Millwork Quote',
    ctaHref: '/quote',
  },
  finalCta: {
    heading: 'Need plain-sawn white oak for a project?',
    body: [
      {
        _type: 'block',
        _key: 'cta1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: "Send us a cutlist or describe what you're working on — including any wide-sort, rustic, color-sort, or millwork needs. We'll confirm pricing, availability, and delivery within the day.",
          },
        ],
      },
    ],
    primaryCta: {
      label: 'Request a Quote — White Oak',
      href: '/quote',
      variant: 'primary',
    },
  },
  seo: {
    title: 'White Oak Lumber Bay Area | Plain-Sawn | Moore Newton',
    description:
      'Plain-sawn white oak (Quercus alba) stocked at Moore Newton in San Leandro. 4/4 through 16/4 FAS. Wide-sort, rustic, and premium color sorts. Next-day delivery.',
  },
};

async function seed() {
  console.log('Seeding White Oak species document...');

  try {
    const result = await client.createOrReplace(whiteOakDocument);
    console.log('Successfully created/updated White Oak document:', result._id);
  } catch (error) {
    console.error('Error seeding White Oak:', error);
    process.exit(1);
  }
}

seed();
