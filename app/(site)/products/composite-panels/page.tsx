import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Composite Panels Bay Area | MDF, Melamine, HPL | Moore Newton',
  description:
    'Weyerhaeuser Plum Creek MDF2, Ultralight MDF, Armorite exterior MDF, American Laminates melamine, and HPL combination core — stocked at our San Leandro facility.',
  path: '/products/composite-panels',
});

const faqItems = [
  {
    question: 'Do you stock pre-laminated panels (HPL on MDF or particleboard)?',
    answer:
      'We stock the white HPL combination-core panel in 1/2" and 3/4" × 4×8. Other HPL-on-substrate configurations (specific colors, textured HPL, HPL on MDF core, HPL on Baltic birch) run through the mill network on special order.',
  },
  {
    question: 'Can I get fire-rated MDF?',
    answer:
      'Yes, on special order. Medex FR and similar fire-rated MDF products are available through our mill network; 1–3 week lead time typical.',
  },
  {
    question: 'Can you cut composite panels to size?',
    answer:
      'Yes. Basic cutdowns at our facility for stocked panels. Commercial volumes — full-pallet cut-to-size or production-volume parts programs — fulfill through our beam-saw partner via the millwork facility.',
  },
  {
    question: 'Do you stock particleboard?',
    answer:
      'Not anymore. Our substrate slate is MDF2, Ultralight MDF, Armorite, melamine (TFL), and HPL combination-core — the substrates the builders we serve actually specify. For particleboard, sourcing is available on special order through the mill network.',
  },
  {
    question: 'Do you stock wood-grain melamine?',
    answer:
      'Yes. Wood-grain TFL is a meaningful share of the American Laminates slate in inventory — maple, oak, walnut, teak, mahogany, ash, and a handful of stylized patterns.',
  },
  {
    question: 'Is MDF available formaldehyde-free?',
    answer:
      'Yes, on order. NAF and low-emission MDF products are available through the mill network. Not stocked as a standard SKU — mention in the quote request if NAF is required.',
  },
  {
    question: 'Do you stock Almond melamine?',
    answer:
      "No. Almond melamine volume has dropped off across the industry; we've replaced it with a tighter slate of patterns that actually move. If a job specifically calls for almond, we can order it through the mill network.",
  },
];

const mdf2Stock = [
  { thickness: '1/4"', fourByEight: '✓', fourByTen: '—' },
  { thickness: '3/8"', fourByEight: '✓', fourByTen: '—' },
  { thickness: '1/2"', fourByEight: '✓', fourByTen: '✓' },
  { thickness: '5/8"', fourByEight: '✓', fourByTen: '—' },
  { thickness: '3/4"', fourByEight: '✓', fourByTen: '✓' },
  { thickness: '7/8"', fourByEight: '✓', fourByTen: '—' },
  { thickness: '1"', fourByEight: '✓', fourByTen: '✓' },
  { thickness: '1-1/4"', fourByEight: '✓', fourByTen: '—' },
  { thickness: '1-1/2"', fourByEight: '✓', fourByTen: '—' },
];

const ultralightStock = [
  { thickness: '1/2"', fourByEight: '✓', fourByTen: '✓' },
  { thickness: '5/8"', fourByEight: '✓', fourByTen: '—' },
  { thickness: '3/4"', fourByEight: '✓', fourByTen: '✓' },
  { thickness: '1"', fourByEight: '✓', fourByTen: '—' },
  { thickness: '1-1/4"', fourByEight: '✓', fourByTen: '—' },
  { thickness: '1-1/2"', fourByEight: '✓', fourByTen: '—' },
];

export default function CompositePanelsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Composite Panels', path: '/products/composite-panels' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Products · Composite Panels"
        title="Composite Panels."
        subhead="The most-specified substrates on Bay Area builds — Weyerhaeuser Plum Creek MDF2 (the industry's most-requested MDF), Ultralight MDF, Roseburg Armorite exterior-grade MDF, nearly the full American Laminates melamine catalog, and HPL combination-core panels with a super-durable white laminate face."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Composite Panels' },
        ]}
      />

      {/* Plum Creek MDF2 */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Flagship MDF</Eyebrow>
          <H2 className="mb-6">Plum Creek MDF2 — the industry&apos;s most-requested MDF.</H2>
          <Body className="mb-6">
            Plum Creek MDF2 (now under the Weyerhaeuser brand) is the substrate most specified by Bay
            Area millwork firms and cabinet fabricators when the panel has to hold crisp detail, take
            paint or laminate without defects telegraphing through, and leave the production run with
            finished edges that aren&apos;t embarrassing. It&apos;s also the substrate that makes up{' '}
            <strong>most of our MDF inventory</strong> — because the builders ask for it by name.
          </Body>

          <Body className="mb-6">
            What makes MDF2 different from a commodity MDF panel is fiber refinement. The mill runs a
            tighter fiber-size distribution and a more homogeneous resin bond than standard MDF,
            producing:
          </Body>

          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>Edge grain that requires a fraction of the prep work</strong> — you can route a
              moulding profile directly out of the panel without tearout, fuzzing, or the
              glue-sealer-sand-sealer-sand sequence that commodity MDF demands.
            </li>
            <li>
              <strong>Uniform density through the full cross-section</strong> — no soft spots, no
              density gradient between face and core, no surprises on the router bit.
            </li>
            <li>
              <strong>A paint-ready surface straight off the sander</strong> — the machined face
              accepts primer and topcoat cleanly without the grain lift that standard MDF exhibits.
            </li>
            <li>
              <strong>Better screw-hold and edge fastener performance</strong> than commodity MDF,
              though still short of plywood or multiply in edge-loaded applications.
            </li>
          </ul>

          <H3 className="text-base mb-4">Stocked:</H3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <caption className="sr-only">MDF2 stock by thickness and panel size</caption>
              <thead>
                <tr className="border-b border-muted">
                  <th scope="col" className="text-left py-3 pr-4 font-display font-medium">
                    Thickness
                  </th>
                  <th scope="col" className="text-left py-3 pr-4 font-display font-medium">
                    4×8
                  </th>
                  <th scope="col" className="text-left py-3 font-display font-medium">
                    4×10
                  </th>
                </tr>
              </thead>
              <tbody>
                {mdf2Stock.map((row) => (
                  <tr key={row.thickness} className="border-b border-muted/50">
                    <td className="py-3 pr-4">{row.thickness}</td>
                    <td className="py-3 pr-4">{row.fourByEight}</td>
                    <td className="py-3">{row.fourByTen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Body>
            Deeper inventory than any other substrate we stock — because it&apos;s the substrate
            specified on nearly every paint-grade millwork job that crosses the counter.
          </Body>
        </div>
      </section>

      {/* Ultralight MDF */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Lightweight MDF</Eyebrow>
          <H2 className="mb-6">Ultralight MDF — the weight benefit without the compromises.</H2>
          <Body className="mb-6">
            Ultralight MDF is the pound-for-pound answer to heavy MDF assemblies. Roughly 30–35%
            lighter than standard MDF, with most of the machining and surface characteristics
            preserved. Specified for large-panel casework where the assembled weight matters —
            trade-show fixtures, retail displays, travel-destined millwork, upper-wall hanging
            fixtures, oversized door panels.
          </Body>

          <H3 className="text-base mb-4">Stocked:</H3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <caption className="sr-only">Ultralight MDF stock by thickness and panel size</caption>
              <thead>
                <tr className="border-b border-muted">
                  <th scope="col" className="text-left py-3 pr-4 font-display font-medium">
                    Thickness
                  </th>
                  <th scope="col" className="text-left py-3 pr-4 font-display font-medium">
                    4×8
                  </th>
                  <th scope="col" className="text-left py-3 font-display font-medium">
                    4×10
                  </th>
                </tr>
              </thead>
              <tbody>
                {ultralightStock.map((row) => (
                  <tr key={row.thickness} className="border-b border-muted/50">
                    <td className="py-3 pr-4">{row.thickness}</td>
                    <td className="py-3 pr-4">{row.fourByEight}</td>
                    <td className="py-3">{row.fourByTen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Body>
            Not every application can substitute Ultralight for MDF2 — edge screw-hold is lower and
            routed profile crispness is marginally softer — but where weight is the gating factor,
            the trade is worth it every time.
          </Body>
        </div>
      </section>

      {/* Armorite */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Exterior MDF</Eyebrow>
          <H2 className="mb-6">Roseburg Armorite — MDF rated for exterior exposure.</H2>
          <Body className="mb-6">
            Roseburg Armorite is an exterior-grade MDF panel engineered for soffits, exterior trim,
            shutter stock, exterior-door parts, and other outdoor millwork where the machining ease
            of MDF is required but the panel will see weather exposure. The binder resin and face
            treatment are formulated for moisture and UV durability the standard MDF substrates
            can&apos;t match.
          </Body>

          <H3 className="text-base mb-4">Stocked:</H3>
          <ul className="space-y-1 text-body mb-6">
            <li>1/2&quot; × 4×8</li>
            <li>3/4&quot; × 4×8</li>
            <li>3/4&quot; × 4×10</li>
          </ul>

          <Body>
            Armorite is not a marine-rated substrate and is not a replacement for a PVC or
            fiber-cement trim product in full-saturation conditions — it&apos;s the correct substrate
            for protected exterior applications (soffits, eaves, exterior millwork under overhangs)
            where MDF&apos;s machining and finishing characteristics are the specification driver.
          </Body>
        </div>
      </section>

      {/* Melamine */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Melamine</Eyebrow>
          <H2 className="mb-6">Nearly the full American Laminates catalog — on the floor.</H2>
          <Body className="mb-6">
            Thermally-fused laminate (TFL) panels are the standard interior substrate for production
            cabinetry, retail fixtures, and commercial casework where a durable pre-finished surface
            is required and production-time finishing is the bottleneck. We stock{' '}
            <strong>nearly the full American Laminates catalog</strong> in 3/4&quot; × 4×8 and many
            of the same patterns in 1/2&quot; × 4×8 for fixture interiors and drawer construction —
            if the spec sheet calls for an American Laminates pattern, there&apos;s a strong chance
            we have it on the rack.
          </Body>

          <H3 className="text-base mb-4">Popular patterns in stock:</H3>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>Whites and light neutrals</strong> — AmLam White, Antique White, Designer
              White, Glacier White.
            </li>
            <li>
              <strong>Greys and warm neutrals</strong> — Folkstone, Pumice, Opti Grey, Charcoal,
              Black.
            </li>
            <li>
              <strong>Woodgrains — light</strong> — Hardrock Maple, Pacific Maple, Rift White Oak,
              White Oak, Natural Ash, Whitewashed Ash.
            </li>
            <li>
              <strong>Woodgrains — mid and dark</strong> — Black Walnut, English Walnut, African
              Walnut, Dark Teak, June Mahogany, Mahogany D005.
            </li>
            <li>
              <strong>Stylized and specialty</strong> — Ebony Oak, Pepperwood, Rock Oak, Antiki.
            </li>
          </ul>

          <Body className="mb-6">
            We stock across American Laminates&apos; product lines including the standard TFL slate,{' '}
            <strong>RWT (Real Wood Texture)</strong>, <strong>EIR (Engraved In Register)</strong>,
            and <strong>FFF (Fine Furniture Finish)</strong> families. Patterns outside the stocked
            slate run on special order, typically 1–3 weeks from the mill.
          </Body>

          <Body>
            <strong>Edgebanding:</strong> Matching PVC and melamine edgebanding (iron-on and PSA)
            stocked in the volume pattern-matched lines; specialty pattern-matched banding on order
            from the American Laminates catalog.
          </Body>
        </div>
      </section>

      {/* HPL Combination-Core */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">HPL Combo-Core</Eyebrow>
          <H2 className="mb-6">
            A durable white HPL face on a combination core — the tougher melamine alternative.
          </H2>
          <Body className="mb-6">
            For applications where the face surface is going to see the kind of abuse that TFL
            melamine can&apos;t survive — institutional casework, commercial interiors, heavy-traffic
            fixtures, lab and hospital casework — we stock a{' '}
            <strong>white high-pressure-laminate (HPL) combination-core panel</strong>. The HPL face
            is meaningfully thicker and more abrasion-resistant than a TFL melamine surface, and the
            combination core (particle or MDF center with hardwood-ply crossbands) holds fasteners
            and screws reliably through the panel axis.
          </Body>

          <H3 className="text-base mb-4">Stocked:</H3>
          <ul className="space-y-1 text-body mb-6">
            <li>1/2&quot; × 4×8 white HPL combination-core.</li>
            <li>3/4&quot; × 4×8 white HPL combination-core.</li>
          </ul>

          <Body>
            <strong>Positioning:</strong> The 3/4&quot; panel comes in at a competitive price point
            against specialty HPL-on-MDF panels, with the edge-fastener performance of a combination
            core as an added benefit. The combo-core has become the substrate of choice for builders
            that used to spec HPL-on-particleboard and want the edge-loading improvement.
          </Body>
        </div>
      </section>

      {/* When to Specify */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">When to Specify</Eyebrow>
          <H2 className="mb-6">The right substrate for the job.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">Specify MDF2 for:</H3>
              <ul className="space-y-1 text-body list-disc pl-6">
                <li>
                  Paint-grade millwork — uniform surface takes primer and topcoat without the grain
                  telegraph-through you&apos;d get on solid wood.
                </li>
                <li>
                  Routed and shaped profiles — holds crisp detail where veneer-core plywood or
                  commodity MDF won&apos;t.
                </li>
                <li>
                  Sign-making, laser-cut substrates, and CNC fixtures where detail retention matters.
                </li>
                <li>Doors and large paint-grade panels up to 4×10.</li>
              </ul>
            </div>

            <div>
              <H3 className="text-base mb-2">Specify Ultralight MDF for:</H3>
              <ul className="space-y-1 text-body list-disc pl-6">
                <li>
                  Large-format paint-grade parts where assembled weight is a specification driver.
                </li>
                <li>
                  Trade-show and retail fixtures that get moved, shipped, and reinstalled.
                </li>
                <li>
                  Upper-wall casework and hanging fixtures where reducing panel weight reduces the
                  structural requirements of the carcass.
                </li>
              </ul>
            </div>

            <div>
              <H3 className="text-base mb-2">Specify Armorite for:</H3>
              <ul className="space-y-1 text-body list-disc pl-6">
                <li>Exterior soffit and trim under overhangs.</li>
                <li>
                  Exterior-door parts, shutter stock, and exterior millwork that sees protected
                  weather exposure.
                </li>
              </ul>
            </div>

            <div>
              <H3 className="text-base mb-2">Specify melamine (TFL) for:</H3>
              <ul className="space-y-1 text-body list-disc pl-6">
                <li>Cabinet interiors in production casework.</li>
                <li>
                  Retail and commercial fixtures where the interior surface needs a durable, cleanable
                  finish without in-house spraying.
                </li>
                <li>Garage cabinets, utility millwork, closet systems.</li>
              </ul>
            </div>

            <div>
              <H3 className="text-base mb-2">Specify HPL combination-core for:</H3>
              <ul className="space-y-1 text-body list-disc pl-6">
                <li>Institutional, commercial, and healthcare casework where the face surface sees hard use.</li>
                <li>Fixtures that get wiped down, scrubbed, or chemically cleaned regularly.</li>
                <li>
                  Applications where a TFL melamine face won&apos;t hold up but a full custom HPL
                  lay-up is overkill.
                </li>
              </ul>
            </div>

            <div>
              <H3 className="text-base mb-2">Don&apos;t specify composite panels for:</H3>
              <ul className="space-y-1 text-body list-disc pl-6">
                <li>
                  Structural members or anywhere that takes direct load through the panel axis.
                </li>
                <li>
                  Applications where screws are going into edges under repeated stress without a
                  proper edge-banded joint — MDF cores don&apos;t hold edge fasteners the way{' '}
                  <Link
                    href="/products/baltic-birch"
                    className="text-accent hover:text-emphasis underline"
                  >
                    Baltic birch
                  </Link>{' '}
                  or{' '}
                  <Link
                    href="/products/hardwood-plywood/multiply"
                    className="text-accent hover:text-emphasis underline"
                  >
                    multiply
                  </Link>{' '}
                  does. The HPL combination-core is the exception in this category because the
                  combination-core construction improves edge-fastener performance.
                </li>
                <li>Fully-submerged or marine applications.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Frequently Asked Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Need composite panels for a job?"
        body="Send us the substrate type, thickness, pattern or grade, and panel count — we'll confirm stock and quote pricing and delivery within one business day."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{
          label: 'See Hardwood Plywood →',
          href: '/products/hardwood-plywood',
          variant: 'secondary',
        }}
      />
    </>
  );
}
