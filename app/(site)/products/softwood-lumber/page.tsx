import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Softwood Lumber Bay Area | VG Fir & Cedars | Moore Newton',
  description:
    'Architectural softwoods in San Leandro — 85/15 VG Douglas fir, Clear VG WRC and Alaskan Yellow Cedar, Port Orford Cedar, Sugar Pine, Ponderosa Pine, Spanish cedar.',
  path: '/products/softwood-lumber',
});

const faqItems = [
  {
    question: 'Can I get any of these softwoods dimensioned (S3S or S4S)?',
    answer:
      'The softwood slate is full-sawn in the rough, with the exception of the Ponderosa Pine C&BTR S4S line. For S3S or S4S on any other softwood, the run goes through our millwork facility. Submit the spec — species, thickness, dimension, linear footage, and any profile — and we\'ll quote.',
  },
  {
    question: 'Is the Douglas fir kiln-dried?',
    answer:
      'Douglas fir is stocked in its export-grade rough state, which for 85/15 VG material arrives air-dried with mill-specific kiln schedules depending on source lot. Moisture content on arrival at our facility is typically 12–15%. For projects requiring tighter MC specs, ask at the quote stage.',
  },
  {
    question: 'Is the Western Red Cedar kiln-dried?',
    answer:
      'All Clear VG WRC in our rough stock is kiln-dried — the stability this delivers for exterior millwork and architectural siding is meaningful and is a distinguishing feature of our cedar against typical Bay Area suppliers. The 4×4 and 6×6 mixed-grain timbers are air-dried (kiln cycles on heavy timber stock aren\'t practical).',
  },
  {
    question: 'Can you mill WRC siding, T&G, or shiplap from your stock?',
    answer:
      'Yes. All standard cedar siding profiles (bevel, shiplap, T&G, V-groove, channel) run through our millwork facility from the Clear VG rough. Send the pattern and linear footage with the quote request.',
  },
  {
    question: 'Can I order Douglas fir in 16/4 or heavier timbers?',
    answer:
      'Our current thickness ceiling for Douglas fir is 12/4. For 16/4 or heavier timbers, special order through our mill network; lead time and pricing confirmed at the quote stage.',
  },
  {
    question: 'Do you stock cedar shingles or shakes?',
    answer:
      'No. Our WRC inventory is architectural lumber — rough siding stock, T&G blanks, trim, and timber sizing. Shingle and shake roofing is a different supply chain; for those, source through a roofing distributor.',
  },
];

const douglasFirStock = [
  { thickness: '4/4', widths: '6", 8", 12"' },
  { thickness: '5/4', widths: '6", 8"' },
  { thickness: '8/4', widths: '3", 4", 6", 8", 10", 12"' },
  { thickness: '12/4', widths: '6", 12"' },
];

const wrcStock = [
  { thickness: '4/4', widths: '6", 8", 12"' },
  { thickness: '5/4', widths: '6", 8"' },
  { thickness: '7/4', widths: '4", 6", 8"' },
  { thickness: '8/4', widths: '4", 6", 8", 10", 12"' },
];

export default function SoftwoodLumberPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Softwood Lumber', path: '/products/softwood-lumber' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Products · Softwood Lumber"
        title="Softwood Lumber."
        subhead="Specification-grade softwoods for architectural millwork, custom windows and doors, exterior siding, and boatbuilding. Six stocked species — Douglas fir, Western Red Cedar, Alaskan Yellow Cedar, Port Orford Cedar, Sugar Pine, Ponderosa Pine — plus Spanish cedar and Aromatic Tennessee Cedar."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Softwood Lumber' },
        ]}
      />

      {/* Intro */}
      <section className="py-12 md:py-16 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Body className="mb-4">
            Moore Newton&apos;s softwood slate isn&apos;t a commodity lineup. We don&apos;t compete
            for framing lumber, stud-grade studs, or pressure-treated 2×4s — the regional box stores
            cover that scope and cover it well. What we stock is the specification-grade softwood
            that cabinetmakers, window and door builders, exterior trim contractors, boatbuilders,
            and architectural millwork firms spec by grade and source.
          </Body>
          <Body>
            Six stocked species anchor the slate:{' '}
            <strong>85/15 export-grade vertical-grain Douglas fir</strong>,{' '}
            <strong>Clear Vertical Grain Western Red Cedar</strong>,{' '}
            <strong>Clear Vertical Grain Alaskan Yellow Cedar</strong>,{' '}
            <strong>C&amp;BTR mixed-grain Port Orford Cedar</strong>,{' '}
            <strong>Sugar Pine</strong> in 4/4 through 8/4 rough, and <strong>Ponderosa Pine</strong>{' '}
            in both #2 common rough widths and C&amp;BTR S4S. Two specialty cedars round it out —{' '}
            <strong>4/4 Spanish cedar</strong> and{' '}
            <strong>4/4 Aromatic #1&amp;BTR Tennessee cedar</strong>.
          </Body>
        </div>
      </section>

      {/* Douglas Fir */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Douglas Fir</Eyebrow>
          <H2 className="mb-6">85/15 export-grade VG fine-grain, rough-sawn.</H2>
          <Body className="mb-6">
            Every board of Douglas fir in our inventory is <strong>85/15 export-grade</strong> — the
            highest grade of Douglas fir commercially graded. The &quot;85/15&quot; nomenclature
            means the face shows at least 85% vertical grain (VG) and no more than 15% other grain
            orientations, producing the straight, parallel, tight grain that Craftsman-era and
            Arts-and-Crafts millwork made famous. Fine-grain specification adds a tight ring count,
            producing the characteristically uniform surface. Full-sawn in the rough means the board
            is sawn to full nominal dimension at the mill — no trim-up to a smaller finished size.
          </Body>

          <H3 className="text-base mb-4">Stocked thicknesses and widths:</H3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <caption className="sr-only">Douglas Fir stock by thickness and width</caption>
              <thead>
                <tr className="border-b border-muted">
                  <th scope="col" className="text-left py-3 pr-4 font-display font-medium">
                    Thickness
                  </th>
                  <th scope="col" className="text-left py-3 font-display font-medium">
                    Widths
                  </th>
                </tr>
              </thead>
              <tbody>
                {douglasFirStock.map((row) => (
                  <tr key={row.thickness} className="border-b border-muted/50">
                    <td className="py-3 pr-4">{row.thickness}</td>
                    <td className="py-3">{row.widths}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Body className="mb-6">
            <strong>Discounted shorts:</strong> 6&apos;–7&apos; lengths in 8/4 × 3&quot;, 8/4 ×
            4&quot;, and 8/4 × 6&quot; stocked at a reduced price point for projects where shorter
            cutoffs work.
          </Body>

          <Body className="mb-6">
            <strong>Typical uses:</strong> Craftsman millwork, interior trim, staircase parts,
            custom window and door frames (particularly period-appropriate), historic restoration.
            Also specified for boatbuilding stringers and frames where the grain uniformity delivers
            predictable fastener behavior. 12/4 thickness opens structural beam and heavy-timber
            applications.
          </Body>

          <Link
            href="/species/douglas-fir"
            className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
          >
            See Douglas Fir Species Page →
          </Link>
        </div>
      </section>

      {/* Western Red Cedar */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Western Red Cedar</Eyebrow>
          <H2 className="mb-6">Clear Vertical Grain fine-grain, kiln-dried rough.</H2>
          <Body className="mb-6">
            Our Western Red Cedar is <strong>Clear Vertical Grain (Clear VG) fine-grain</strong> —
            the highest-grade architectural cedar, specified for exterior siding, soffits, eaves,
            exterior door and window jambs, and naturally-weathering projects where dimensional
            stability and decay resistance matter. Unlike the air-dried cedar sold at most commodity
            suppliers, our Clear VG WRC slate is <strong>kiln-dried</strong> to architectural
            moisture content — the stability this delivers for exterior millwork and finished
            interior applications is meaningful.
          </Body>

          <H3 className="text-base mb-4">Stocked thicknesses and widths (Clear VG, kiln-dried):</H3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <caption className="sr-only">Western Red Cedar stock by thickness and width</caption>
              <thead>
                <tr className="border-b border-muted">
                  <th scope="col" className="text-left py-3 pr-4 font-display font-medium">
                    Thickness
                  </th>
                  <th scope="col" className="text-left py-3 font-display font-medium">
                    Widths
                  </th>
                </tr>
              </thead>
              <tbody>
                {wrcStock.map((row) => (
                  <tr key={row.thickness} className="border-b border-muted/50">
                    <td className="py-3 pr-4">{row.thickness}</td>
                    <td className="py-3">{row.widths}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Body className="mb-4">
            <strong>Mixed-grain timbers (air-dried):</strong> 4×4 and 6×6 mixed-grain cedar timbers
            stocked for beam applications, decorative posts, pergolas, and outdoor structures.
          </Body>

          <Body className="mb-6">
            <strong>Siding, T&amp;G, and shiplap:</strong> Clear VG WRC siding patterns (bevel,
            shiplap, tongue-and-groove, V-groove, channel) run through our{' '}
            <Link
              href="/products/millwork"
              className="text-accent hover:text-emphasis underline"
            >
              millwork facility
            </Link>{' '}
            from our rough stock. Send the pattern, width, and linear footage with the quote request.
          </Body>

          <Link
            href="/species/western-red-cedar"
            className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
          >
            See Western Red Cedar Species Page →
          </Link>
        </div>
      </section>

      {/* Other Species */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Other Species</Eyebrow>
          <H2 className="mb-8">Alaskan Yellow Cedar, Port Orford Cedar, and Pines.</H2>

          <div className="space-y-8">
            <div>
              <H3 className="text-base mb-2">Alaskan Yellow Cedar</H3>
              <Body>
                Alaskan Yellow Cedar (<em>Cupressus nootkatensis</em>) is the Pacific Northwest&apos;s
                premier boatbuilding and exterior-millwork cedar — denser, harder, more dimensionally
                stable, and more rot-resistant than Western Red Cedar, with a pale yellow tone that
                weathers to silver-gray. We stock it in <strong>Clear Vertical Grain, kiln-dried rough</strong>{' '}
                for the boatbuilders, high-end exterior millwork firms, and exterior furniture makers
                who specify it by name. Stocked in 4/4 and 8/4.
              </Body>
            </div>

            <div>
              <H3 className="text-base mb-2">Port Orford Cedar</H3>
              <Body>
                Port Orford Cedar (<em>Chamaecyparis lawsoniana</em>) is a range-limited Pacific
                Northwest cedar — native to a narrow coastal strip in southern Oregon and northern
                California — with exceptional rot resistance, a pale color, and a mild spicy aroma.
                We stock it in <strong>C&amp;BTR (C &amp; Better) mixed-grain</strong> rough for
                boatbuilders, specialty exterior applications, and period-restoration work. Stocked
                in 4/4.
              </Body>
            </div>

            <div>
              <H3 className="text-base mb-2">Sugar Pine</H3>
              <Body>
                Sugar Pine (<em>Pinus lambertiana</em>) is the softwood pattern-maker&apos;s species
                — stable, low-density, easy to work, and forgiving of complex cuts. We stock{' '}
                <strong>Sugar Pine in rough 4/4, 6/4, and 8/4</strong> for pattern makers, industrial
                pattern work, specialty fixtures, and casework applications where a soft, stable pine
                outperforms a denser alternative.
              </Body>
            </div>

            <div>
              <H3 className="text-base mb-2">Ponderosa Pine</H3>
              <Body>
                Ponderosa Pine (<em>Pinus ponderosa</em>) splits into two grades in our inventory:{' '}
                <strong>1×12 #2 Common rough</strong> — the knotty pine for Western-style interiors,
                shelving, barn-door panels, and rustic millwork. And{' '}
                <strong>C&amp;BTR S4S</strong> — clear-and-better surfaced in standard 1× dimensional
                sizes for paint-grade trim, millwork blanks, and interior casework parts.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Cedars */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Spanish Cedar &amp; Aromatic Tennessee Cedar</Eyebrow>
          <H2 className="mb-6">Two specialty cedars at the counter.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">4/4 Spanish Cedar</H3>
              <Body>
                True Spanish cedar (<em>Cedrela odorata</em>), the mahogany-family species specified
                for cigar humidor interiors, guitar necks and interior parts, fine exterior millwork,
                and boatbuilding parts where the species&apos; natural insect resistance and
                dimensional stability matter. Stocked in 4/4 rough.
              </Body>
            </div>

            <div>
              <H3 className="text-base mb-2">4/4 Aromatic Tennessee Cedar #1&amp;BTR</H3>
              <Body>
                Eastern Red Cedar (<em>Juniperus virginiana</em>) from Tennessee-sourced stock, graded
                #1 and better. The aromatic cedar specified for closet linings, chest and blanket-chest
                interiors, drawer interiors, and any application where the distinctive cedar aroma is
                the point. Stocked in 4/4 rough.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* What We Don't Stock */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Other Softwoods</Eyebrow>
          <H2 className="mb-6">If you need it, we can point you somewhere.</H2>
          <Body className="mb-4">We don&apos;t stock:</Body>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>Construction-grade softwood at volume</strong> — stud-grade 2×4s by the unit,
              roof sheathing, pressure-treated lumber, engineered lumber (LVL, PSL, glulam). Home
              Depot, commodity distributors, and structural distributors cover that scope.
            </li>
            <li>
              <strong>Redwood</strong> — not carried. For projects specifying redwood, customers
              typically source from specialty California coastal suppliers.
            </li>
            <li>
              <strong>Cedar shingles and shakes</strong> — not carried. Shingle and shake roofing is
              a different supply chain.
            </li>
          </ul>
          <Body>
            If your project calls for a softwood we don&apos;t stock, ask at the quote stage — we
            can often source through our mill network, though lead times are longer than stocked
            items.
          </Body>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Frequently Asked Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Need softwood for a specification job?"
        body="Send us the species, thickness, width, length, and quantity — or describe the project — and we'll quote pricing, availability, and delivery within one business day."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'See Species Pages →', href: '/species', variant: 'secondary' }}
      />
    </>
  );
}
