import type { Metadata } from 'next';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Baltic Birch Bay Area | 5×5, 4×8, 10×5 | Moore Newton',
  description:
    'Baltic birch plywood stocked in San Leandro. 5×5, 4×8, and 10×5 panels, BB/BB and B/BB grades, prefinished options. The Bay Area standard for CNC and casework.',
  path: '/products/baltic-birch',
});

const faqItems = [
  {
    question: 'Where does your Baltic birch come from?',
    answer:
      "From the Baltic regions of northern Europe. Supply has tightened and shifted meaningfully since 2022; we maintain inventory through a mill network that supplies from the producing regions currently active in the market, and we honor committed orders even when spot supply fluctuates.",
  },
  {
    question: 'Can I get FSC-certified Baltic birch?',
    answer:
      "FSC-certified Baltic birch availability has varied significantly since 2022. We stock FSC-certified Baltic birch when the mill network can supply it; if a project requires FSC chain-of-custody, mention it at the quote stage and we'll confirm current availability and documentation.",
  },
  {
    question: 'Can you cut Baltic birch panels down?',
    answer:
      'Yes. Basic cutdowns at our facility. Commercial parts programs — full-pallet or production-volume cut-to-size — fulfill through our beam-saw partner via our millwork facility.',
  },
  {
    question: 'Do you stock prefinished Baltic birch?',
    answer:
      'Yes. 1/2" and 3/4" BB/BB prefinished in 4×8, 1/2" and 5/8" BB/BB prefinished in 5×5, plus prefinished bullnose drawer sides in 1/2" × 8" and 1/2" × 12" at 5\' lengths.',
  },
  {
    question: 'Is Baltic birch waterproof?',
    answer:
      "Baltic birch uses a phenolic-resin (WBP) adhesive, which is rated weather-and-boilproof. Applications where the panel will see occasional water exposure (garage casework, utility areas, marine-adjacent fixtures) are in-scope for standard Baltic birch. For fully-submerged marine applications, a dedicated marine plywood is the correct specification.",
  },
  {
    question: "What's the difference between Baltic birch and domestic multiply (ApplePly, MPX)?",
    answer:
      "All three are high-ply multiply construction. Baltic birch uses birch in every ply and a phenolic-resin adhesive. Domestic multiply (ApplePly, Columbia MPX) uses birch face and back, typically with a soy-based NAF adhesive, and varies in crossband species. For most production casework, the panels are substitutable; for specification work where the spec names one or the other, the spec wins.",
  },
  {
    question: 'Can I get 10×5 panels in anything other than 3/4"?',
    answer:
      "Not as a stocked item. 10×5 is stocked in 3/4\" BB/BB for long-run casework and oversize panel applications. Other thicknesses in 10×5 are special-order through the mill network.",
  },
];

const stockTable = [
  { size: '4×8 (48" × 96") BB/BB', thicknesses: '1/4", 3/8", 1/2", 5/8", 3/4", 1"' },
  { size: '4×8 B/BB', thicknesses: '1/2", 3/4"' },
  { size: '4×8 BB/BB prefinished', thicknesses: '1/2", 3/4"' },
  { size: '5×5 (60" × 60") — mostly B/BB', thicknesses: '1/8", 1/4", 3/8", 1/2", 3/4"' },
  { size: '5×5 BB/BB prefinished', thicknesses: '1/2", 5/8"' },
  { size: '10×5 (120" × 60") BB/BB', thicknesses: '3/4"' },
];

export default function BalticBirchPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Baltic Birch', path: '/products/baltic-birch' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Products · Baltic Birch"
        title="Baltic Birch."
        subhead="Multiply birch plywood from the Baltic regions — stocked in 5×5, 4×8, and 10×5 panels, BB/BB and B/BB grades, with prefinished and specialty bullnose drawer-side options. The Bay Area standard for CNC work, jig-building, production casework, and exposed-edge furniture."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Baltic Birch' },
        ]}
      />

      {/* Why Baltic Birch */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">What Makes It Different</Eyebrow>
          <H2 className="mb-6">More plies, better crossbanding, exposed-edge ready.</H2>
          <Body className="mb-8">
            Baltic birch is a specific class of multiply birch plywood — manufactured in the Baltic
            regions of northern Europe — with a distinctive construction that&apos;s made it the de
            facto panel for a handful of demanding applications. What distinguishes it:
          </Body>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">High ply count.</H3>
              <Body>
                A 3/4&quot; Baltic birch panel typically runs 13 plies, compared to 5–7 in standard
                veneer-core plywood. More plies = more cross-bonded layers = better dimensional
                stability and flatness.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Solid birch throughout.</H3>
              <Body>
                Face, back, and core plies are all solid birch — not alternating species, not MDF
                center, not particleboard. The panel behaves as a homogeneous stack through any
                cross-section.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Void-free.</H3>
              <Body>
                No gaps in the core plies. Edges expose the uniform birch layers, which is why
                exposed-edge construction (boxes, drawers, shelving with visible edges) is such a
                common Baltic birch use case.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Waterproof phenolic-resin adhesive.</H3>
              <Body>
                Baltic birch is bonded with phenolic (WBP) resin — rated for weather-and-boilproof
                applications. This is a meaningful differentiator against domestic multiply and
                hardwood plywood, which typically use interior-only soy or urea-formaldehyde
                adhesives.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Screw-hold through edge and face.</H3>
              <Body>
                The dense birch stack takes fasteners through any axis, which makes Baltic birch the
                panel of choice for knockdown casework, jig-building, and trade-show fixtures.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">CNC-friendly.</H3>
              <Body>
                Flatness and homogeneity mean consistent cut quality across a large parts batch — the
                reason CNC builders across the Bay Area specify it.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Stocked Slate */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Stock</Eyebrow>
          <H2 className="mb-6">Three panel sizes, two grades, prefinished where it matters.</H2>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <caption className="sr-only">Baltic Birch stock by panel size and thickness</caption>
              <thead>
                <tr className="border-b border-muted">
                  <th scope="col" className="text-left py-3 pr-4 font-display font-medium">
                    Panel size
                  </th>
                  <th scope="col" className="text-left py-3 font-display font-medium">
                    Thicknesses
                  </th>
                </tr>
              </thead>
              <tbody>
                {stockTable.map((row) => (
                  <tr key={row.size} className="border-b border-muted/50">
                    <td className="py-3 pr-4">{row.size}</td>
                    <td className="py-3">{row.thicknesses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Body className="mb-4">
            <strong>Specialty items:</strong> Prefinished bullnosed drawer sides — 1/2&quot;
            thickness in 8&quot; and 12&quot; widths, stocked in 5&apos; lengths. Pre-machined and
            prefinished for direct-to-assembly drawer construction.
          </Body>

          <Body>
            <strong>Other sizes and thicknesses</strong> (4×10 oversize, intermediate metric
            thicknesses, etc.) on special order through our mill network.
          </Body>
        </div>
      </section>

      {/* Grades */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Grades</Eyebrow>
          <H2 className="mb-6">BB/BB standard, B/BB for show-both-sides work.</H2>
          <Body className="mb-6">
            Baltic birch uses its own grading system based on face-and-back quality, different from
            the HPVA grades used on domestic hardwood plywood. The grades you&apos;ll see in our
            inventory:
          </Body>

          <ul className="space-y-4 text-body list-disc pl-6 mb-6">
            <li>
              <strong>B/BB</strong> — B-grade face (clean, clear, no patches), BB-grade back (small
              oval football-patches allowed). The top of the commercial range. Specified for
              furniture and exposed-face casework where one face shows fully clean.
            </li>
            <li>
              <strong>BB/BB</strong> — BB on both faces. The workhorse grade and our default stock.
              Both faces are clean-looking with oval patches where pin-knots were removed at the
              mill. Acceptable for nearly all commercial applications.
            </li>
          </ul>

          <Body className="mb-6">
            Higher grades (B/B, S/BB) are available on special order when a project specifies them.
          </Body>

          <Body className="text-sm italic">
            <strong>A note on &quot;cabinet grade&quot;:</strong> &quot;Cabinet grade&quot;
            isn&apos;t a formal Baltic birch designation — it&apos;s an informal phrase that usually
            means BB/BB or B/BB. When in doubt, ask for BB/BB.
          </Body>
        </div>
      </section>

      {/* Prefinished */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Prefinished</Eyebrow>
          <H2 className="mb-6">UV-cured finish on both faces, ready to assemble.</H2>
          <Body className="mb-6">
            Prefinished Baltic birch comes from the mill with a UV-cured clear coat applied to both
            faces — durable, cleanable, and ready to cut and assemble without the finishing step. We
            stock prefinished Baltic birch in three formats:
          </Body>

          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>4×8 BB/BB prefinished</strong> in 1/2&quot; and 3/4&quot;.
            </li>
            <li>
              <strong>5×5 BB/BB prefinished</strong> in 1/2&quot; and 5/8&quot;.
            </li>
            <li>
              <strong>Bullnose drawer sides</strong> — 1/2&quot; × 8&quot; and 1/2&quot; × 12&quot;,
              5&apos; lengths, factory-finished and edge-profiled for direct drawer construction.
            </li>
          </ul>

          <Body>
            Prefinished Baltic birch is specified for production casework where production time for
            finishing is the bottleneck, for cabinet interiors where the prefinished face is the
            final surface, and for drawer construction where the bullnose drawer-side stock lets
            builders assemble drawers without additional milling or finishing.
          </Body>
        </div>
      </section>

      {/* Typical Uses */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Where It Goes</Eyebrow>
          <H2 className="mb-6">The jobs Baltic birch was made for.</H2>

          <ul className="space-y-2 text-body list-disc pl-6">
            <li>
              <strong>CNC cabinet parts programs</strong> — flat, void-free, consistent cut quality,
              good edge finish. The default panel for cabinet-parts CNC programs.
            </li>
            <li>
              <strong>Jig-building</strong> — exceptional flatness and screw-hold make Baltic birch
              the go-to for jigs, templates, and production fixtures.
            </li>
            <li>
              <strong>Production casework</strong> — trade-show fixtures, retail fixtures, office
              casework where panels are cut, assembled, disassembled, and reassembled.
            </li>
            <li>
              <strong>Drawer boxes</strong> — 1/2&quot; sides, 1/4&quot; or 3/8&quot; bottoms; clean
              edges, durable, screws well. Bullnose prefinished drawer sides are a volume shortcut
              for high-output builders.
            </li>
            <li>
              <strong>Exposed-edge furniture</strong> — tables, shelving, casegoods where the
              multiply edge is the design.
            </li>
            <li>
              <strong>Model-making and architectural models</strong> — the go-to sheet good for
              laser-cut and CNC-routed models.
            </li>
            <li>
              <strong>Speaker cabinets and enclosures</strong> — valued for uniform density and
              acoustic behavior.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Frequently Asked Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Need Baltic birch for a job?"
        body="Send us the size, thickness, grade, and panel count — we'll confirm stock and quote pricing and delivery within one business day."
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
