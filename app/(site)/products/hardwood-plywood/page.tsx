import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Hardwood Plywood Bay Area | HPVA-Graded | Moore Newton',
  description:
    'HPVA-graded hardwood plywood — VC, combination, calibrated combination, multiply, MDF, and premium MPX cores. Stocked in San Leandro for Bay Area builders.',
  path: '/products/hardwood-plywood',
});

const faqItems = [
  {
    question: 'Can I see samples before specifying?',
    answer:
      "Yes. Visit us during business hours and we'll pull sample corners for the face-veneer species, cut, and match you're considering. For project-specific samples (e.g., a full 12\"×12\" of a specific cut+match combination), we can prepare them on request.",
  },
  {
    question: 'What are multiply-core panels and when should I spec them?',
    answer:
      'Multiply panels (Baltic Birch, ApplePly, and Columbia PureBond MPX) are many-ply, void-free constructions specified for exposed edges, complex joinery, routed shapes, and applications where the panel behaves like solid wood.',
  },
  {
    question: 'Is your hardwood plywood FSC-certified?',
    answer:
      "Many of our plywood lines are available FSC-certified. If FSC chain-of-custody is project-required, mention it in the quote request and we'll confirm which stocked panels carry current FSC documentation.",
  },
  {
    question: 'Can you match a specific veneer cut-and-pattern sequence for a large project?',
    answer:
      'Yes. Standard sequence-matched panels are in stock across virtually every A1 panel we carry. For larger architectural sequence-match runs with specific flitch requirements, we produce to spec on special order; lead times run 3–6 weeks depending on the species and mill capacity.',
  },
  {
    question: 'Is your plywood formaldehyde-free?',
    answer:
      'Yes — virtually every domestic hardwood plywood panel we stock is built with soy-based, formaldehyde-free adhesives (NAF). For imported panels or specialty lines, confirm at the sales counter.',
  },
  {
    question: 'Do you cut panels down for pickup?',
    answer:
      'Panel cutting on request at our facility; minimal charge for basic cutdowns. Detailed panel-part programs (with parts list, grain direction, yield optimization) are quoted through our millwork facility.',
  },
];

const coreTypes = [
  {
    name: 'Veneer Core (VC)',
    description:
      'The traditional construction: crossed veneer plies bonded to face and back veneers. Light, reasonable screw-holding, moderate cost. The go-to for general casework where weight matters and the panel won\'t see extreme stress. Standard thicknesses stocked: 1/4", 1/2", 3/4" (other thicknesses on order).',
  },
  {
    name: 'Combination Core',
    description:
      "Crossband layers of veneer plus an MDF or particleboard center. Combines VC's screw-holding in the crossband plies with an MDF center's flatness and uniformity. Heavier than VC, flatter, better for large-format work where panel telegraph-through is a concern.",
  },
  {
    name: 'Calibrated Combination Core',
    description:
      'A combination-core panel sanded twice at the mill to calibrate every panel to the same thickness tolerance as MDF core. The only combination-core build where you get MDF-grade thickness consistency with the screw-holding behavior of a veneer crossband. Specified for cabinet-parts runs where both face flatness and edge fastener performance matter.',
  },
  {
    name: 'Multiply Core',
    description:
      'A multi-ply panel with many thin cross-bonded layers — typically 11 or more plies in a 3/4" panel. Void-free, exceptionally flat, edge-finishable. Stocked: Baltic Birch, States Industries ApplePly, and Columbia PureBond MPX Core.',
  },
  {
    name: 'MDF Core',
    description:
      'An MDF center with face and back veneers. Because the core is medium-density fiberboard, every panel is inherently at exact thickness — no calibration step required, no mill-to-mill variation. Maximum face flatness and consistent screw-holding through the face. Heavier than VC. Specified for cabinet doors, large panel work, and any application where substrate movement would show through the finish.',
  },
  {
    name: 'Premium MPX',
    description:
      'A premium multi-ply construction with a dense, uniform core built to the standard of marine plywood. Specified where the project demands the stability of multiply with the substrate density of a premium core. Stocked in select face-veneer species.',
  },
];

const grades = [
  { code: 'AA-1', description: 'Architectural-grade face (AA), excellent back (1). The top of the stocked range, specified for high-end architectural millwork and visible-panel applications.' },
  { code: 'A1', description: 'A-face with excellent back. The workhorse spec grade; virtually every A1 panel in our inventory is sequence-matched and numbered at the mill.' },
  { code: 'A4', description: "A-face with utility back. Specified where the back won't be seen (cabinet boxes, fixed installations, panel-in-frame construction)." },
  { code: 'B1', description: 'Character face (B allows knots, mineral streaks, and minor color variation) with an excellent back. Specified where character-grade face is the design and the back still shows.' },
  { code: 'B2', description: 'Character face with a sound back. Production-casework default where character is acceptable on the face.' },
  { code: 'C2', description: 'Utility face with sound back. Specified for production runs where cost drives the decision and the face is painted, laminated over, or hidden.' },
  { code: 'C4', description: 'Utility face with utility back. Specified for jigs, fixtures, and temporary structures.' },
  { code: 'Shop-grade', description: 'Factory seconds. Minor factory damage or defect (edge chips, surface marks, small patches) with 80%+ of the panel usable. The value play for builders that can cut around defects; priced well below graded stock.' },
];

export default function HardwoodPlywoodPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Hardwood Plywood', path: '/products/hardwood-plywood' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Products · Hardwood Plywood"
        title="Hardwood Plywood."
        subhead="HPVA-graded plywood in six core constructions. Veneer core, combination core, calibrated combination core, multiply (Baltic Birch, ApplePly, and MPX), MDF core, and premium MPX. Pre-finished panels. A full slate of face-veneer species, cuts, and matches."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Hardwood Plywood' },
        ]}
      />

      {/* Intro */}
      <section className="py-12 md:py-16 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Body>
            Moore Newton is a Bay Area stocking distributor of hardwood plywood. We stock panels in
            every core construction a Bay Area cabinetmaker, millwork firm, or fixture fabricator
            regularly specifies — and we stock them in the face-veneer species and grades that
            actually move. ApplePly from States Industries and Columbia Forest Products PureBond MPX
            are in inventory, not paper-stocked. Every sheet is HPVA-graded.
          </Body>
        </div>
      </section>

      {/* Core Constructions */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Cores</Eyebrow>
          <H2 className="mb-6">Six ways the panel is built.</H2>
          <Body className="mb-8">
            The panel&apos;s <strong>core</strong> is what sits between the face veneers — and it
            drives weight, stability, screw-holding, cost, and how the panel machines. We stock six
            core types because different applications call for different cores, and substitution
            isn&apos;t free.
          </Body>

          <div className="space-y-8">
            {coreTypes.map((core) => (
              <div key={core.name}>
                <H3 className="text-base mb-2">{core.name}</H3>
                <Body>{core.description}</Body>
              </div>
            ))}
          </div>

          <Body className="mt-8">
            See our{' '}
            <Link
              href="/products/hardwood-plywood/multiply"
              className="text-accent hover:text-emphasis underline"
            >
              Multiply Plywood page
            </Link>{' '}
            for the full treatment of Baltic Birch, ApplePly, and MPX.
          </Body>
        </div>
      </section>

      {/* Face Veneers */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Face Veneers</Eyebrow>
          <H2 className="mb-6">Species, cuts, and matches.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">Species stocked in face veneers:</H3>
              <Body>
                Red Oak, White Oak (plain, rift, and quartered), Black Walnut, Cherry, Hard Maple,
                Soft Maple, Birch (natural and rotary), Ash, Alder, Hickory, Poplar, Sapele, African
                Mahogany, Honduran Mahogany. Additional species available on special order through
                our mill network.
              </Body>
            </div>

            <div>
              <H3 className="text-base mb-2">Veneer cuts:</H3>
              <ul className="space-y-2 text-body list-disc pl-6">
                <li>
                  <strong>Plain-sawn (flat-cut)</strong> — The default. Produces a cathedral figure
                  on the face. Cost-efficient, widely specified.
                </li>
                <li>
                  <strong>Rift-sawn</strong> — Cut at 30°–60° to the growth rings; produces straight,
                  parallel grain with minimal cathedral. The standard for contemporary design where
                  visual consistency is the spec.
                </li>
                <li>
                  <strong>Quartersawn</strong> — Cut at 60°–90°; produces straight grain with
                  medullary-ray flake in oak. Specified for traditional millwork and where ray-fleck
                  figure is the design.
                </li>
                <li>
                  <strong>Rotary-cut</strong> — Peeled from the log like paper towel off a roll.
                  Produces a wide, non-cathedral figure. Standard on rotary birch and a handful of
                  specialty applications.
                </li>
              </ul>
            </div>

            <div>
              <H3 className="text-base mb-2">Matches:</H3>
              <ul className="space-y-2 text-body list-disc pl-6">
                <li>
                  <strong>Book match</strong> — The default. Adjacent veneer leaves flipped like
                  pages in a book and mirrored at the seam, producing a symmetrical pattern.
                </li>
                <li>
                  <strong>Slip match</strong> — Leaves slid (not flipped), producing a repeating
                  progression without mirror-symmetry.
                </li>
                <li>
                  <strong>Random match</strong> — No attempt at pattern continuity; used for rustic
                  and character-grade aesthetics.
                </li>
                <li>
                  <strong>Whole Piece Face (rotary cut)</strong> — A single continuous rotary-cut
                  veneer covering the full panel face without a seam. Common in prefinished birch and
                  maple cabinet-interior applications.
                </li>
              </ul>
            </div>

            <div>
              <H3 className="text-base mb-2">Sequence-matched panels:</H3>
              <Body>
                Sequence-matched panels are sold in numbered sets, identically matched from a single
                veneer flitch, so the grain and color flow continuously from panel to panel on a wall
                or casework run. <strong>Virtually every A1-grade panel we stock is
                sequence-matched and numbered at the mill.</strong> Larger sequence-match runs
                (architectural millwork across many panels) are also produced to spec on special
                order.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Finished Panels */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Pre-Finished</Eyebrow>
          <H2 className="mb-6">UV-cured clear, both faces — no field finishing required.</H2>
          <Body className="mb-6">
            We stock pre-finished plywood across the species and cuts that dominate cabinet interior
            and architectural specification. Pre-finished means both faces are UV-cured with a clear
            catalyzed finish at the mill, so cabinet boxes can be cut, assembled, and installed
            without any in-house finishing on the interior.
          </Body>

          <H3 className="text-base mb-4">Pre-finished species stocked:</H3>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>Maple</strong> — the workhorse pre-finished panel. Stocked in 1/4&quot;,
              3/8&quot;, 1/2&quot;, 5/8&quot;, 3/4&quot;, and 1&quot;.
            </li>
            <li>
              <strong>Birch</strong> — pre-finished Birch is stocked in White only (no natural).
            </li>
            <li>
              <strong>Walnut</strong> — stocked as a standard pre-finished panel for upscale
              residential and commercial cabinet interiors.
            </li>
            <li>
              <strong>White Oak</strong> — stocked in both plain-sawn and rift-sawn cuts for
              contemporary casework where pre-finished white oak is the spec.
            </li>
          </ul>

          <Body className="text-sm italic mb-6">
            A note on maple: Pre-finished maple is manufactured from a mix of commercial maple
            species (hard maple, soft maple, and related Acers depending on the mill&apos;s lot). For
            that reason, the face veneer is specified and sold simply as &quot;Maple&quot; — not
            &quot;Hard Maple&quot; — which is the correct terminology for veneer-face products across
            the industry.
          </Body>

          <H3 className="text-base mb-4">Benefits for cabinet and casework builders:</H3>
          <ul className="space-y-2 text-body list-disc pl-6">
            <li>Eliminates interior spray-finishing labor</li>
            <li>
              Finish is harder and more scratch-resistant than most field-applied finishes
            </li>
            <li>Consistent panel-to-panel — no finishing variance by operator or day</li>
            <li>
              Edges can be finished, edgebanded, or left raw depending on the project spec
            </li>
          </ul>
        </div>
      </section>

      {/* Grades */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">HPVA-Graded</Eyebrow>
          <H2 className="mb-6">Graded at the mill, verified on receipt.</H2>
          <Body className="mb-8">
            Every panel Moore Newton stocks is HPVA-graded (Hardwood Plywood and Veneer
            Association). HPVA grades use a letter-and-number code — the letter grades the face
            veneer, the number grades the back. We stock the grades that Bay Area builders specify:
          </Body>

          <div className="space-y-4">
            {grades.map((grade) => (
              <div key={grade.code} className="flex gap-4">
                <span className="font-display text-sm font-medium text-emphasis w-24 flex-shrink-0">
                  {grade.code}
                </span>
                <Body className="text-sm">{grade.description}</Body>
              </div>
            ))}
          </div>

          <Body className="mt-8">
            <strong>Adhesives:</strong> Virtually every domestic hardwood plywood panel we stock is
            built with soy-based, formaldehyde-free adhesives. NAF (no-added-formaldehyde) is the
            industry default for domestic lines.
          </Body>
        </div>
      </section>

      {/* Sizes */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Panel Sizes</Eyebrow>
          <H2 className="mb-6">4×8 is the standard; 4×10, 5×5, and oversize on order.</H2>

          <div className="space-y-4">
            <Body>
              <strong>4×8</strong> (48&quot; × 96&quot;) is the stocked standard across every core
              and species combination. Most orders ship from 4×8 inventory.
            </Body>
            <Body>
              <strong>4×10</strong> (48&quot; × 120&quot;) is stocked in select high-demand species
              (hard maple, birch) and cores (veneer core, MDF). Oversize panels are specified where
              a cabinetmaker&apos;s parts list has large components and cross-cutting 4×8 would
              waste material.
            </Body>
            <Body>
              <strong>5×5</strong> (60&quot; × 60&quot;) — specifically for Baltic birch and a few
              multiply SKUs. See{' '}
              <Link
                href="/products/baltic-birch"
                className="text-accent hover:text-emphasis underline"
              >
                Baltic Birch
              </Link>
              .
            </Body>
            <Body>
              <strong>Custom sizes</strong> — special-order from the mill; lead time and pricing
              confirmed at the quote stage.
            </Body>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Frequently Asked Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Need a quote on plywood?"
        body="Send us the core, species, cut, match, grade, and quantity — we'll quote pricing, availability, and delivery within one business day."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{
          label: 'See Multiply Plywood →',
          href: '/products/hardwood-plywood/multiply',
          variant: 'secondary',
        }}
      />
    </>
  );
}
