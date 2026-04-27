import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Millwork Bay Area | Commercial Facility | Moore Newton',
  description:
    "Moore Newton's commercial millwork facility — S4S, standard and custom profiles, custom knives, glue-ups. Bay Area hardwood millwork with 5–7 business day turnaround.",
  path: '/products/millwork',
});

const faqItems = [
  {
    question: 'How do I submit a custom profile?',
    answer:
      "Email info@moorenewton.com or submit via the quote form with a drawing, sketch, sample, or photo. PDF and DWG are both accepted. A clean 1:1 drawing is fastest; a photo with measurements next to it also works. If you have a sample piece of the original moulding (for matching existing work), drop it off at our facility and we'll scan it directly.",
  },
  {
    question: 'How long does custom millwork take?',
    answer:
      "Standard turnaround is 5–7 business days from approved quote to shipped material. Rush timelines are possible — mention the deadline in the quote request and we'll confirm whether it's achievable.",
  },
  {
    question: 'How much does a custom knife cost?',
    answer:
      "Knife cost is billed per inch of profile width, with a minimum charge. Most standard profiles land at the minimum; wider profiles (baseboard, crown, picture-frame mouldings) scale up from there. Deep-cut and carbide knives carry a modest surcharge. The knife is retained in our library after the first run and can be re-cut against at no additional knife cost on future orders. Concrete knife cost is quoted up front alongside the linear-footage cost so there's nothing hidden.",
  },
  {
    question: 'Do you do finishing?',
    answer:
      'Not in v1. Milled stock ships unfinished. Finish sanding to standard grits is available as an add-on; spraying, staining, or clear-coating is not part of our millwork scope.',
  },
  {
    question: 'Can you match an existing profile from a historical building?',
    answer:
      "Usually, yes. Send a photo or a sample (even a small broken-off piece) and we'll cut a knife that matches. For intricate historical profiles (Victorian, Craftsman-era) the knife may be more complex and the linear-footage output slower — all quoted up front.",
  },
  {
    question: 'Do you do CNC routing or cabinet-parts programs?',
    answer:
      "Our CNC is a grinder — it's dedicated to cutting custom profile knives, not routing sheet goods or solid-wood parts. For full cabinet-parts programs, you're looking for a cabinetmaker with a CNC router.",
  },
  {
    question: 'Can you cut plywood to size?',
    answer:
      'Yes. Standard cutdowns on stocked panels are handled at our facility. For commercial volumes — full-pallet cut-to-size or production parts programs on sheet goods — we fulfill through a beam-saw partner. Send the species, thickness, and cut list with the quote request.',
  },
  {
    question: 'Can you glue-up wider panels than the stock comes in?',
    answer:
      "Yes. Glue-ups are a standard part of our millwork service. Send the target width and length; we'll glue up to spec and deliver flat, sanded panels ready for the next step.",
  },
];

const speciesLinks = [
  { name: 'White Oak', href: '/species/white-oak' },
  { name: 'Rift White Oak', href: '/species/white-oak-rift' },
  { name: 'Quartersawn White Oak', href: '/species/quartersawn-white-oak' },
  { name: 'Black Walnut', href: '/species/walnut' },
  { name: 'Poplar', href: '/species/poplar' },
  { name: 'Honduran Mahogany', href: '/species/honduran-mahogany' },
  { name: 'African Mahogany', href: '/species/african-mahogany' },
  { name: 'Hard Maple', href: '/species/hard-maple' },
  { name: 'Sapele', href: '/species/sapele' },
  { name: 'Douglas Fir', href: '/species/douglas-fir' },
  { name: 'Western Red Cedar', href: '/species/western-red-cedar' },
];

export default function MillworkPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Millwork', path: '/products/millwork' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Products · Millwork"
        title="Millwork."
        subhead="Moore Newton's commercial millwork facility turns our comprehensive rough-sawn lumber inventory into installation-ready wood products. S4S dimensioning, custom profile runs, glue-ups, and specialty milling — all fulfilled in-house from the same stock that crosses our counter."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Millwork' },
        ]}
      />

      {/* What We Mill */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Capabilities</Eyebrow>
          <H2 className="mb-6">Custom Millwork, Delivered.</H2>
          <Body className="mb-8">
            Moore Newton operates a commercial millwork facility that pulls directly from the same
            lumber inventory we sell across the counter — which means no lost inventory, no
            substitution at the last minute, and no mismatch between what was ordered and what was
            milled.
          </Body>

          <H3 className="text-base mb-4">Services stocked and quoted:</H3>
          <ul className="space-y-4 text-body list-disc pl-6">
            <li>
              <strong>S4S dimensioning</strong> — Surfaced on four sides to nominal or custom
              dimensions. Stocked in the dimensional sizes most commonly specified (1x4 through 1x12
              in poplar, 2x4 through 2x8 in poplar, 1x4/1x6 in alder, 1x4/1x6 in birch, 1x4 through
              1x8 in African mahogany); other S4S runs quoted per project.
            </li>
            <li>
              <strong>Standard profile runs</strong> — Baseboard, crown, door casing, window casing,
              panel moulding, chair rail, and other standard architectural profiles. Stock profiles
              run in the species commonly specified (poplar, oak, walnut, hard maple, soft maple,
              alder).
            </li>
            <li>
              <strong>Custom profile runs</strong> — Custom knives cut in-house on our CNC grinder,
              then run against your specified species. Standard turnaround is 5–7 business days from
              approved drawing to shipped material.
            </li>
            <li>
              <strong>Glue-ups</strong> — Wider panels glued up from multiple boards to your
              specified width and length. Used for tabletops, panel doors, and case sides where the
              species isn&apos;t stocked in the width needed.
            </li>
            <li>
              <strong>Specialty milling</strong> — Beveled edges, rabbets, grooves, dados, and other
              non-profile milling quoted per project.
            </li>
            <li>
              <strong>Resawing</strong> — Thick stock resawn to thinner dimensions when the source
              material is available but the end spec is thinner.
            </li>
            <li>
              <strong>Sanding</strong> — Finish-sanding at standardized grits quoted as an add-on to
              milled stock.
            </li>
            <li>
              <strong>Commercial plywood cut-to-size</strong> — Full-pallet and production-volume
              plywood cut-to-size fulfilled through our beam-saw partner for cabinetmakers and
              fabricators running parts programs at scale.
            </li>
          </ul>
        </div>
      </section>

      {/* Custom Knives */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Custom Profiles</Eyebrow>
          <H2 className="mb-6">From drawing to shipped material in 5–7 business days.</H2>
          <Body className="mb-8">
            Most architectural millwork specifications call for a profile that isn&apos;t in
            anyone&apos;s standard catalog. That&apos;s what the custom knife process is for. How it
            works:
          </Body>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">1. You send the profile.</H3>
              <Body>
                Drawing, sketch, sample of the existing moulding, photo of a detail you want matched
                — any of these is enough to start. PDF, DWG, hand sketch, or physical sample.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">2. We quote.</H3>
              <Body>
                We confirm the species, linear footage, and the knife cost. Knife cost is typically
                quoted separately from the linear-footage cost; the knife becomes yours for future
                runs if the project is ongoing.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">3. Knife is CNC-ground in-house.</H3>
              <Body>
                We grind custom knives on our own CNC grinder. Turnaround from approved quote to
                knife-in-the-machine is typically 2–3 business days.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">4. Material is milled and shipped.</H3>
              <Body>
                Once the knife is set up, we mill the linear footage against your stock species.
                Standard total turnaround from approved quote to shipped material is{' '}
                <strong>5–7 business days</strong>. Rush timelines are possible with notice.
              </Body>
            </div>
          </div>

          <Body className="mt-8">
            <strong>Knife libraries:</strong> We keep knife libraries from recent projects. If you
            or a cabinetmaker you work with has run a profile through our facility before,
            there&apos;s a reasonable chance the knife is still on the shelf — mention it at the
            quote stage.
          </Body>
        </div>
      </section>

      {/* Stock Integration */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Same Stock, Same Facility</Eyebrow>
          <H2 className="mb-6">
            Every board milled in-house is the board you&apos;d buy across the counter.
          </H2>
          <Body className="mb-6">
            When you order millwork from Moore Newton, the stock comes from the same inventory we
            sell over the counter to every other customer. No substitution, no &quot;close
            enough&quot; grade mixing, no material brought in from an outside mill under a different
            grade assumption. The stock species, the grade sort, the kiln-drying state, the face
            selection — all match what our lumber customers are buying from the same aisle.
          </Body>
          <Body>
            That consistency matters when a millwork run is part of a larger project. If a
            cabinetmaker is ordering FAS walnut for cabinet faces and also ordering walnut moulding
            to match, they come from the same inventory. Color, figure, and grain match because they
            are from the same source.
          </Body>
        </div>
      </section>

      {/* Species We Mill Most */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Species</Eyebrow>
          <H2 className="mb-6">Species commonly run through our facility.</H2>
          <Body className="mb-6">
            Some species see more millwork volume than others. The millwork-hero species at Moore
            Newton:
          </Body>

          <ul className="space-y-3 text-body">
            <li>
              <Link href="/species/white-oak" className="text-accent hover:text-emphasis underline">
                <strong>White Oak</strong>
              </Link>{' '}
              (all three cuts:{' '}
              <Link
                href="/species/white-oak"
                className="text-accent hover:text-emphasis underline"
              >
                plain-sawn
              </Link>
              ,{' '}
              <Link
                href="/species/white-oak-rift"
                className="text-accent hover:text-emphasis underline"
              >
                rift
              </Link>
              , and{' '}
              <Link
                href="/species/quartersawn-white-oak"
                className="text-accent hover:text-emphasis underline"
              >
                quartersawn
              </Link>
              ) — the Bay Area&apos;s most-specified architectural hardwood.
            </li>
            <li>
              <Link href="/species/walnut" className="text-accent hover:text-emphasis underline">
                <strong>Black Walnut</strong>
              </Link>{' '}
              — high-end residential and commercial millwork.
            </li>
            <li>
              <Link href="/species/poplar" className="text-accent hover:text-emphasis underline">
                <strong>Poplar</strong>
              </Link>{' '}
              — the paint-grade workhorse; molder blanks stocked in 1x4/1x6/1x8 standard patterns.
            </li>
            <li>
              <Link
                href="/species/honduran-mahogany"
                className="text-accent hover:text-emphasis underline"
              >
                <strong>Honduran Mahogany</strong>
              </Link>{' '}
              — high-end millwork and boatbuilding.
            </li>
            <li>
              <Link
                href="/species/african-mahogany"
                className="text-accent hover:text-emphasis underline"
              >
                <strong>African Mahogany</strong>
              </Link>{' '}
              — custom window and door specification hardwood.
            </li>
            <li>
              <Link href="/species/hard-maple" className="text-accent hover:text-emphasis underline">
                <strong>Hard Maple</strong>
              </Link>{' '}
              — specified for commercial casework and retail fixtures.
            </li>
            <li>
              <Link href="/species/sapele" className="text-accent hover:text-emphasis underline">
                <strong>Sapele</strong>
              </Link>{' '}
              — exterior door and window frames where durability is the spec.
            </li>
            <li>
              <Link href="/species/douglas-fir" className="text-accent hover:text-emphasis underline">
                <strong>Douglas Fir</strong>
              </Link>{' '}
              — Craftsman and Arts-and-Crafts millwork; 85/15 export-grade VG stock.
            </li>
            <li>
              <Link
                href="/species/western-red-cedar"
                className="text-accent hover:text-emphasis underline"
              >
                <strong>Western Red Cedar</strong>
              </Link>{' '}
              — exterior siding, soffit, and trim.
            </li>
          </ul>

          <Body className="mt-6">
            Other species are milled on request; these are simply the species where we run the most
            linear footage.
          </Body>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Frequently Asked Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Have a profile you need milled?"
        body="Send us a drawing, a photo, or a sample — whatever you have — along with the species and quantity. We'll quote knife cost, linear-footage cost, and turnaround within one business day."
        primaryCta={{ label: 'Request a Millwork Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Contact Sales →', href: '/contact', variant: 'secondary' }}
      />
    </>
  );
}
