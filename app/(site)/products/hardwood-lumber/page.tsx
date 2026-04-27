import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Hardwood Lumber Bay Area | 40+ Species | Moore Newton',
  description:
    '40+ species of NHLA-graded, kiln-dried hardwood lumber stocked in San Leandro. 4/4 through 16/4, rough, S3S, and S4S. Next-day Bay Area delivery from $500.',
  path: '/products/hardwood-lumber',
});

const faqItems = [
  {
    question: 'Can I order hardwood lumber delivered to my project?',
    answer:
      'Yes. Next-business-day delivery across the Greater Bay Area on orders $500 and up, placed by 4:30 PM Pacific. Flat $50 delivery fee. Orders over $750 ship with no delivery fee to commercial addresses and at a reduced $35 fee to residential addresses. Orders below $500 are will-call at our Williams Street facility.',
  },
  {
    question: "What's the difference between rough, S3S, and S4S?",
    answer:
      "Rough lumber is the mill's output — either fully sawn or skip-planed. S3S is surfaced on the face, back, and one edge (one edge jointed straight). S4S is fully dimensioned on all four sides. Rough is the raw material for builders with their own mill line; S3S saves a step; S4S is ready to cut and assemble.",
  },
  {
    question: 'Do you stock figured and character lumber?',
    answer:
      "Yes, in several species. Curly and birdseye hard maple are stocked sorts. Figured walnut and character walnut are stocked as separate sorts. Quartersawn white oak includes a Tiger Stripe Heavy Figure Sort. Figured inventory outside those dedicated sorts is species-dependent — ask the sales counter.",
  },
  {
    question: 'Is your lumber kiln-dried?',
    answer:
      'Yes. All hardwood lumber leaves our facility kiln-dried to 6–8% moisture content suitable for interior work. Softwoods are stocked at their appropriate seasoning state (Douglas fir export-grade rough, Western Red Cedar air-dried rough).',
  },
  {
    question: 'Is the lumber FSC-certified?',
    answer:
      "FSC-certified stock is available in specific species and lines; standard inventory is not universally FSC-certified. If a project requires FSC chain-of-custody, mention it in the quote request and we'll quote from our FSC-certified sources with appropriate documentation.",
  },
  {
    question: 'Can I order in volume / do you have contract pricing?',
    answer:
      'Yes. Production cabinetmakers running standing orders, architectural millwork firms on long projects, and general contractors with repeat cutlists are a meaningful share of our book. Volume pricing is quoted per project; email info@moorenewton.com or submit the quote form with the project scope.',
  },
];

const domesticHardwoods = [
  'White Oak (plain-sawn, rift, quartersawn)',
  'Red Oak',
  'Black Walnut',
  'Cherry',
  'Hard Maple',
  'Soft Maple',
  'Ash',
  'Alder',
  'Hickory',
  'Poplar (plain and quartersawn)',
  'Yellow Birch (Natural and Select Red)',
  'American Chestnut',
  'Cypress',
  'Red Elm',
];

const importedHardwoods = [
  'Honduran Mahogany',
  'African Mahogany (Khaya ivorensis)',
  'Sapele',
  'Utile',
  'Burmese Teak (FEQ)',
  'Spanish Cedar',
  'Peruvian Walnut',
  'European White Oak',
  'European Beech',
];

const specialtyExotic = [
  'Bloodwood',
  'Bubinga',
  'Canarywood',
  'Goncalo Alves',
  'Jatoba',
  'Lacewood',
  'Padauk',
  'Pau Ferro',
  'Purpleheart',
  'Wenge',
  'Yellowheart',
  'Zebrawood',
  'Curly Maple',
  'Birdseye Maple',
  'Aromatic Cedar',
];

export default function HardwoodLumberPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Hardwood Lumber', path: '/products/hardwood-lumber' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Products · Hardwood Lumber"
        title="Hardwood Lumber."
        subhead="40+ species of kiln-dried, NHLA-graded hardwood lumber. Domestic, imported, and exotic. 4/4 through 16/4 rough. Proprietary sorts, specified grades, deep inventory — stocked at our San Leandro facility."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Hardwood Lumber' },
        ]}
      />

      {/* What We Stock */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow className="mb-4">Inventory</Eyebrow>
          <H2 className="mb-6">Domestic, imported, and exotic — 40+ species across the range.</H2>
          <Body className="mb-8 max-w-4xl">
            Moore Newton stocks every major domestic hardwood species that crosses a Bay Area bench:
            white oak (plain, rift, and quartersawn), red oak, black walnut, cherry, hard maple,
            soft maple, ash, alder, hickory, poplar (plain and quartersawn), yellow birch, cypress,
            red elm, and American chestnut from the last remaining stand. We carry the imported
            hardwoods that trade customers specify by name — Honduran mahogany, African mahogany
            (Khaya ivorensis), sapele, Burmese teak, European white oak, European beech — plus a
            rotating slate of figured, exotic, and character-grade stock across multiple species.
          </Body>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <H3 className="text-base mb-4">Domestic Hardwoods</H3>
              <ul className="space-y-1 text-sm text-body">
                {domesticHardwoods.map((species) => (
                  <li key={species}>{species}</li>
                ))}
              </ul>
            </div>
            <div>
              <H3 className="text-base mb-4">Imported Hardwoods</H3>
              <ul className="space-y-1 text-sm text-body">
                {importedHardwoods.map((species) => (
                  <li key={species}>{species}</li>
                ))}
              </ul>
            </div>
            <div>
              <H3 className="text-base mb-4">Specialty and Exotic</H3>
              <ul className="space-y-1 text-sm text-body">
                {specialtyExotic.map((species) => (
                  <li key={species}>{species}</li>
                ))}
              </ul>
            </div>
          </div>

          <Body className="mt-8">
            <strong>Softwoods</strong> — See{' '}
            <Link
              href="/products/softwood-lumber"
              className="text-accent hover:text-emphasis underline"
            >
              Softwood Lumber
            </Link>{' '}
            for the full softwood slate (Alaskan Yellow Cedar, VG Clear Douglas Fir, VG Clear
            Western Red Cedar, Port Orford Cedar, Sugar Pine, Ponderosa Pine).
          </Body>
        </div>
      </section>

      {/* Grades */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">NHLA-Graded</Eyebrow>
          <H2 className="mb-6">Graded to the spec your work calls for.</H2>
          <Body className="mb-8">
            Every board of hardwood lumber we stock is NHLA-graded — either at the mill or verified
            on receipt. The NHLA grades you&apos;ll encounter in our inventory:
          </Body>

          <div className="space-y-6 mb-8">
            <div>
              <H3 className="text-base mb-2">FAS (Firsts and Seconds)</H3>
              <Body>
                The highest standard NHLA grade. Long, wide, mostly clear cuttings on both faces.
                Specified for architectural millwork, custom cabinetry, and any application where
                visible defects won&apos;t do.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">F1F (FAS One Face)</H3>
              <Body>
                FAS grade on the better face, #1 Common on the back. Used where one face shows and
                the other is hidden (cabinet interiors, panel builds, bottom edges).
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Select &amp; Better (S&amp;B)</H3>
              <Body>
                A blend of FAS and #1 Common, typically sorted to produce clear face material with
                some acceptable back-face variation. The workhorse grade for cabinetry.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">#1 Common</H3>
              <Body>
                Shorter, narrower clear cuttings. Specified for flooring, production use, and
                production runs where cutlists favor smaller parts.
              </Body>
            </div>
          </div>

          <H3 className="text-base mb-4">Moore Newton proprietary sorts:</H3>
          <Body className="mb-4">
            Beyond the NHLA baseline, we run dedicated sorts that tighten the grade for specific
            applications. These aren&apos;t NHLA designations — they&apos;re our own sorts, named
            and stocked:
          </Body>
          <ul className="space-y-2 text-body list-disc pl-6">
            <li>
              <strong>Tiger Stripe Quartersawn White Oak</strong> — Heavy-figure quartersawn WO
              sort, graded for pronounced medullary-ray flake.
            </li>
            <li>
              <strong>Select White Sap Hard Maple</strong> — Heartwood-only sap excluded; uniformly
              pale face for painted or naturally-finished casework.
            </li>
            <li>
              <strong>Select Red Birch</strong> — Heartwood-only yellow birch for warm-toned
              applications.
            </li>
            <li>
              <strong>Natural Yellow Birch S&amp;B</strong> — Standard cabinet-grade birch with the
              natural mix of sap and heart within the board.
            </li>
            <li>
              <strong>8&quot;+ Wide Sort</strong> — Quartersawn white oak graded for minimum
              8&quot; face width.
            </li>
            <li>
              <strong>Quartersawn S&amp;B Poplar</strong> — Quartered poplar for ray-flake figure in
              paint-grade and stained applications.
            </li>
          </ul>

          <Body className="mt-6">
            <strong>HPVA plywood grading:</strong> For plywood, see{' '}
            <Link
              href="/products/hardwood-plywood"
              className="text-accent hover:text-emphasis underline"
            >
              Hardwood Plywood
            </Link>
            .
          </Body>
        </div>
      </section>

      {/* Thicknesses */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Thicknesses</Eyebrow>
          <H2 className="mb-6">4/4 through 16/4, rough — plus S3S and S4S where stocked.</H2>
          <Body className="mb-8">
            Most hardwood species are stocked in 4/4, 5/4, 6/4, and 8/4 rough. Thicker stock (10/4,
            12/4, 16/4) is stocked in species where thick inventory is regularly specified — white
            oak, walnut, hard maple, poplar, African mahogany. Exotic and imported species are
            typically stocked in 4/4 and 8/4 only, with thicker material available on special order
            through our mill network.
          </Body>

          <H3 className="text-base mb-4">Dimensioning options:</H3>
          <ul className="space-y-4 text-body">
            <li>
              <strong>Rough</strong> — The baseline. Surfaced at the mill or left skip-planed.
            </li>
            <li>
              <strong>S3S</strong> — Surfaced 3 sides. Face and back planed smooth, one edge jointed
              square. Stocked in the species most frequently specified for cabinetry: oak, walnut,
              cherry, hard maple, soft maple, ash, alder, poplar, birch, Douglas fir framing
              applications.
            </li>
            <li>
              <strong>S4S</strong> — Surfaced 4 sides. Face, back, and both edges dimensioned.
              Stocked in the species and nominal dimensions most frequently specified: 1x4 through
              1x12 and 2x4 through 2x8 in poplar, 1x4/1x6 in alder, 1x4/1x6 in birch, 1x4 through 1x8
              in African mahogany. S4S runs outside the stocked slate are quoted through our
              millwork facility.
            </li>
          </ul>

          <Body className="mt-6">
            Exact thickness/width availability varies by species. See the individual species page
            for a species-specific matrix.
          </Body>
        </div>
      </section>

      {/* Browse by Species */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Browse by Species</Eyebrow>
          <H2 className="mb-6">Every species, spec&apos;d.</H2>
          <Body className="mb-8">
            Each species has a dedicated page with the full spec sheet — grades stocked, thicknesses,
            sourcing, grain and appearance, working characteristics, finishing notes, and typical
            uses. Start with the species your project calls for:
          </Body>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-3">Flagship species:</H3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <Link href="/species/white-oak" className="text-accent hover:text-emphasis underline">
                  White Oak
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/white-oak-rift" className="text-accent hover:text-emphasis underline">
                  Rift White Oak
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/quartersawn-white-oak" className="text-accent hover:text-emphasis underline">
                  Quartersawn White Oak
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/walnut" className="text-accent hover:text-emphasis underline">
                  Black Walnut
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/cherry" className="text-accent hover:text-emphasis underline">
                  Cherry
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/hard-maple" className="text-accent hover:text-emphasis underline">
                  Hard Maple
                </Link>
              </div>
            </div>

            <div>
              <H3 className="text-base mb-3">Production workhorses:</H3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <Link href="/species/red-oak" className="text-accent hover:text-emphasis underline">
                  Red Oak
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/ash" className="text-accent hover:text-emphasis underline">
                  Ash
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/alder" className="text-accent hover:text-emphasis underline">
                  Alder
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/soft-maple" className="text-accent hover:text-emphasis underline">
                  Soft Maple
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/poplar" className="text-accent hover:text-emphasis underline">
                  Poplar
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/hickory" className="text-accent hover:text-emphasis underline">
                  Hickory
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/birch" className="text-accent hover:text-emphasis underline">
                  Birch
                </Link>
              </div>
            </div>

            <div>
              <H3 className="text-base mb-3">Imported and specialty:</H3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <Link href="/species/honduran-mahogany" className="text-accent hover:text-emphasis underline">
                  Honduran Mahogany
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/african-mahogany" className="text-accent hover:text-emphasis underline">
                  African Mahogany
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/sapele" className="text-accent hover:text-emphasis underline">
                  Sapele
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/teak" className="text-accent hover:text-emphasis underline">
                  Teak
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/douglas-fir" className="text-accent hover:text-emphasis underline">
                  Douglas Fir
                </Link>
                <span className="text-body/50">·</span>
                <Link href="/species/western-red-cedar" className="text-accent hover:text-emphasis underline">
                  Western Red Cedar
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/species"
              className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
            >
              Browse All Species →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ
        heading="Frequently Asked Questions"
        items={faqItems.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />

      {/* Final CTA */}
      <FinalCTA
        heading="Ready to quote a cutlist?"
        body="Send us the species, thicknesses, grades, and quantities — or paste a cutlist — and we'll respond within one business day with pricing, availability, and a delivery estimate."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Browse Species →', href: '/species', variant: 'secondary' }}
      />
    </>
  );
}
