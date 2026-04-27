import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FAQ, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema, buildSimpleFAQPageSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Multiply Plywood Bay Area | Baltic Birch, ApplePly, MPX',
  description:
    'Baltic Birch, ApplePly, and Columbia PureBond MPX — all three multiply products stocked in San Leandro. Void-free panels for exposed edges and complex work.',
  path: '/products/hardwood-plywood/multiply',
});

const faqItems = [
  {
    question: 'Is multiply plywood really worth the cost premium?',
    answer:
      "For projects where exposed edges, complex joinery, routed shapes, edge fastener performance, or production-CNC yield are on the spec, yes — the labor and material savings pay back the premium. For general casework where the panel won't see stress and the edges will be banded anyway, standard VC plywood is the more cost-effective call.",
  },
  {
    question: "What's the difference between Baltic Birch, ApplePly, and MPX?",
    answer:
      "Different products for different specifications. Baltic Birch is the production-casework and jig-building workhorse — BB/BB grade, phenolic resin adhesive, all-birch construction. ApplePly carries premium face-veneer species (WPF white maple in our stock) for visible architectural applications where multiply construction plus a specified face is the requirement. MPX is Columbia Forest Products' multiply line, specified where the project spec calls for PureBond by name or where a specific face-species combination is needed. All three are multiply by construction; the choice is about project spec and face appearance.",
  },
  {
    question: 'Do you cut multiply panels to size?',
    answer:
      'Yes. Standard cutdowns at our facility; detailed panel-parts programs through our millwork facility.',
  },
  {
    question: 'Can you source other ApplePly configurations?',
    answer:
      'Yes — ApplePly with other face species (birch, cherry, walnut, oak), custom sizes, or alternative thicknesses are available on special order from States Industries. Lead times typically 2–4 weeks.',
  },
  {
    question: 'Can I get pre-finished multiply?',
    answer:
      'Yes. Pre-finished ApplePly (WPF white maple) is stocked in 1/4", 1/2", 3/4", and 1". Pre-finished MPX is stocked in maple and birch. Baltic Birch is stocked unfinished.',
  },
  {
    question: 'Do you carry matching edgebanding?',
    answer:
      "Yes — matching iron-on and PSA edgebanding is stocked in the species that match our plywood face veneers. Multiply is often specified because the edge is the design, but banding is available when the detail calls for it.",
  },
];

const balticBirchStock = [
  { size: '4×8 (48" × 96") BB/BB', thicknesses: '1/4", 3/8", 1/2", 5/8", 3/4", 1"' },
  { size: '4×8 B/BB', thicknesses: '1/2", 3/4"' },
  { size: '4×8 BB/BB prefinished', thicknesses: '1/2", 3/4"' },
  { size: '5×5 (60" × 60") — mostly B/BB', thicknesses: '1/8", 1/4", 3/8", 1/2", 3/4"' },
  { size: '5×5 BB/BB prefinished', thicknesses: '1/2", 5/8"' },
  { size: '10×5 (120" × 60") BB/BB', thicknesses: '3/4"' },
];

export default function MultiplyPlywoodPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Hardwood Plywood', path: '/products/hardwood-plywood' },
          { name: 'Multiply', path: '/products/hardwood-plywood/multiply' },
        ])}
      />
      <JsonLd data={buildSimpleFAQPageSchema(faqItems)} />

      {/* Hero */}
      <PageHero
        eyebrow="Products · Hardwood Plywood · Multiply"
        title="Multiply Plywood."
        subhead="Baltic Birch, States Industries ApplePly, and Columbia PureBond MPX — three multiply products, all stocked at our San Leandro facility. The void-free, many-ply construction that behaves like solid wood: exposed edges, complex joinery, routed shapes, and production casework."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: 'Hardwood Plywood', path: '/products/hardwood-plywood' },
          { name: 'Multiply' },
        ]}
      />

      {/* What Makes a Multiply Panel Different */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Construction</Eyebrow>
          <H2 className="mb-6">13 plies, all birch, 1/16&quot; each — no voids.</H2>
          <Body className="mb-8">
            A multiply panel is built from many thin, cross-bonded veneer layers —{' '}
            <strong>13 plies in a 3/4&quot; panel</strong>, each ply 1/16&quot; thick, all solid
            birch. No alternating species, no MDF center, no particleboard, no voids. The
            construction produces a panel that is:
          </Body>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">Void-free.</H3>
              <Body>
                Each layer is a full solid-birch veneer, not an edge-glued lumber core with gaps.
                Edges expose a clean, continuous stack of crossbanded plies — stackable as a design
                element rather than a liability to be edgebanded.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Dimensionally stable.</H3>
              <Body>
                The high ply count distributes stress across many cross-bonded layers, so the panel
                resists warping, cupping, and telegraph-through over time and humidity swings.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Flat.</H3>
              <Body>
                Manufactured to tighter flatness tolerances than standard veneer-core plywood —
                specified where panel flatness is the spec (large cabinet doors, exposed case sides,
                tabletops).
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Holds fasteners through any axis.</H3>
              <Body>
                The dense ply stack takes and holds screws and nails through any face or edge —
                critical for knockdown casework, jig-building, and exposed-edge hardware mounting.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Machines like solid wood.</H3>
              <Body>
                Clean edges off a router, crisp profiles through a shaper, predictable behavior on a
                CNC. That&apos;s why multiply is the panel of choice for routed profile work,
                decorative patterns, and shaped parts where MDF would blow out and veneer core would
                expose voids.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Saves labor on edgebanding.</H3>
              <Body>
                Because the multiply edge is clean and continuous, it can be sanded and finished
                directly — no banding, no filler, no hide-the-edge details. On a full cabinet-parts
                run, that&apos;s hours or days of labor off the job.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* Baltic Birch */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Baltic Birch</Eyebrow>
          <H2 className="mb-6">The production-casework multiply standard.</H2>
          <Body className="mb-6">
            Baltic Birch is the original multiply panel — solid-birch plywood from the Baltic
            regions with uniform 1/16&quot; plies and phenolic resin adhesive bonds. It&apos;s the
            Bay Area&apos;s default panel for CNC cabinet-parts programs, jig-building, exposed-edge
            furniture, and production fixtures.
          </Body>

          <H3 className="text-base mb-4">Stocked grades:</H3>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>BB/BB</strong> — BB face on both sides, the industry workhorse. Clean faces
              with small oval football-patches where pin-knots were removed at the mill. The Moore
              Newton default.
            </li>
            <li>
              <strong>B/BB</strong> — B-grade face (clear, no patches), BB back. Specified when one
              face shows and needs to be patch-free.
            </li>
          </ul>

          <H3 className="text-base mb-4">Stocked sizes and thicknesses:</H3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <caption className="sr-only">Baltic Birch stock by panel size and thickness</caption>
              <thead>
                <tr className="border-b border-muted">
                  <th scope="col" className="text-left py-3 pr-4 font-display font-medium">
                    Panel size
                  </th>
                  <th scope="col" className="text-left py-3 font-display font-medium">
                    Thicknesses stocked
                  </th>
                </tr>
              </thead>
              <tbody>
                {balticBirchStock.map((row) => (
                  <tr key={row.size} className="border-b border-muted/50">
                    <td className="py-3 pr-4">{row.size}</td>
                    <td className="py-3">{row.thicknesses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Body className="mb-4">
            <strong>Specialty items:</strong> Prefinished bullnosed drawer sides — 1/2&quot; × 8&quot;
            and 1/2&quot; × 12&quot;, 5&apos; lengths.
          </Body>

          <Body className="mb-4">
            <strong>Adhesive:</strong> Phenolic resin — the water-resistant (WBP) adhesive system
            that Baltic Birch has always used. Durable, weather-capable, and the reason Baltic Birch
            panels perform in applications that would come apart on a standard domestic-adhesive
            panel.
          </Body>

          <Body className="mb-6">
            <strong>Typical uses:</strong> CNC cabinet-parts programs, jigs and fixtures, trade-show
            and retail fixtures, drawer boxes, exposed-edge furniture, laser-cut and CNC-routed
            architectural models, speaker cabinets.
          </Body>

          <Link
            href="/products/baltic-birch"
            className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
          >
            Deeper dive: Baltic Birch →
          </Link>
        </div>
      </section>

      {/* ApplePly */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">ApplePly</Eyebrow>
          <H2 className="mb-6">States Industries ApplePly — stocked in WPF white maple.</H2>
          <Body className="mb-6">
            ApplePly is made by States Industries in Oregon. The brand has been the U.S. West Coast
            standard for multiply-core panels with premium face veneers for decades; when a Bay Area
            designer or architect calls out ApplePly by name, the project is specifying this
            construction specifically.
          </Body>

          <H3 className="text-base mb-4">What we stock:</H3>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              <strong>WPF White Maple ApplePly</strong> — Whole Piece Face white maple, one
              continuous rotary-cut veneer across the panel face.
            </li>
            <li>
              <strong>Stocked thicknesses:</strong> 1/4&quot;, 1/2&quot;, 3/4&quot;, and 1&quot;.
            </li>
            <li>
              <strong>Finish options:</strong> pre-finished (UV-cured clear both faces) and
              unfinished — both stocked in all four thicknesses.
            </li>
          </ul>

          <Body className="mb-6">
            <strong>Other ApplePly configurations</strong> (different face species, birch face,
            custom sizes) are available on special order through States Industries; lead times
            typically 2–4 weeks.
          </Body>

          <Body className="text-sm italic mb-6">
            A note on maple: ApplePly face veneer is sold and specified as &quot;Maple&quot; — not
            &quot;Hard Maple.&quot; Maple veneer is typically a mix of commercial maple species
            depending on the mill&apos;s lot, and &quot;Maple&quot; is the correct industry-standard
            term for the veneer face.
          </Body>

          <Body>
            <strong>Typical specification language:</strong> &quot;ApplePly, 3/4&quot;, WPF white
            maple, [prefinished / unfinished], sized as per drawing.&quot; When the spec reads like
            that, this is what&apos;s being asked for.
          </Body>
        </div>
      </section>

      {/* Columbia PureBond MPX */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">PureBond MPX</Eyebrow>
          <H2 className="mb-6">Columbia Forest Products PureBond MPX Core.</H2>
          <Body className="mb-6">
            Columbia PureBond MPX Core is Columbia Forest Products&apos; multiply construction.
            Similar many-ply, void-free architecture to Baltic Birch and ApplePly, produced in a
            rotating slate of face-veneer species for projects that specify PureBond MPX by name.
          </Body>

          <H3 className="text-base mb-4">Stocked at Moore Newton:</H3>
          <ul className="space-y-2 text-body list-disc pl-6 mb-6">
            <li>
              3/4&quot; × 4×8 in a rotating slate of face species including birch, maple, cherry, red
              oak, white oak, and walnut.
            </li>
            <li>1/2&quot; × 4×8 in the most-specified species.</li>
            <li>
              Pre-finished MPX available in maple and birch (UV-cured clear on both faces).
            </li>
          </ul>

          <Body>
            <strong>Specification use case:</strong> MPX is specified in projects where the
            architectural spec calls for Columbia PureBond by name, or where a specific face-veneer
            species combination across a multiply construction is the requirement.
          </Body>
        </div>
      </section>

      {/* Multiply vs. Other Cores */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">When to Spec Multiply</Eyebrow>
          <H2 className="mb-6">Why multiply earns its cost premium.</H2>
          <Body className="mb-8">
            Multiply panels cost more per sheet than veneer-core, MDF-core, or combination-core
            plywoods. The question on every project is whether the application actually needs what
            multiply delivers.
          </Body>

          <H3 className="text-base mb-4">Spec multiply when the project calls for any of these:</H3>
          <ul className="space-y-2 text-body list-disc pl-6 mb-8">
            <li>
              <strong>Exposed edges.</strong> Multiply&apos;s clean, void-free edge finishes
              directly. No edgebanding, no filler, no reveal detail to hide a ragged edge.
            </li>
            <li>
              <strong>Complex joinery.</strong> Dados, rabbets, dovetails, finger joints, and other
              joinery cut across multiply as cleanly as through solid wood. Veneer core exposes
              voids; MDF core chips and crumbles.
            </li>
            <li>
              <strong>Routed shapes and profiles.</strong> Curves, chamfers, ogee profiles, and CNC
              contours hold a crisp edge through multiply where MDF would fuzz and veneer core would
              tear.
            </li>
            <li>
              <strong>Screw-hold through edges and face.</strong> Multiply holds fasteners through
              any axis, which makes it the panel of choice for knockdown and trade-show casework,
              jigs, and fixtures.
            </li>
            <li>
              <strong>Flatness.</strong> Multiply holds flatter than veneer core over time and
              humidity swings.
            </li>
            <li>
              <strong>Labor savings on production casework.</strong> When a cutlist has hundreds of
              exposed edges, the hours saved on edgebanding pay for the material premium.
            </li>
          </ul>

          <H3 className="text-base mb-4">Don&apos;t spec multiply when:</H3>
          <ul className="space-y-2 text-body list-disc pl-6">
            <li>
              <strong>The panel will never show an edge.</strong> General cabinet boxes with banded
              edges and hidden panels are fine in standard veneer core; multiply is wasted spec.
            </li>
            <li>
              <strong>The spec calls for MDF-grade flatness for a cabinet door.</strong> MDF core or
              calibrated combination core is flatter panel-to-panel for large flat doors.
            </li>
            <li>
              <strong>Cost is the primary driver.</strong> Multiply is a specification panel, not a
              budget panel.
            </li>
          </ul>
        </div>
      </section>

      {/* Typical Applications */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Where It Goes</Eyebrow>
          <H2 className="mb-6">The jobs multiply was made for.</H2>
          <ul className="space-y-2 text-body list-disc pl-6">
            <li>
              <strong>Production cabinet-parts CNC programs</strong> — flat, void-free, consistent
              cut quality, good edge finish across a large parts batch.
            </li>
            <li>
              <strong>Exposed-edge furniture</strong> — tables, shelving, casegoods where the
              laminated multiply edge is the design.
            </li>
            <li>
              <strong>Trade-show and retail fixtures</strong> — demountable construction with
              repeated assembly/disassembly; screw-hold through face and edge is critical.
            </li>
            <li>
              <strong>Jigs, templates, and production fixtures</strong> — exceptional flatness and
              screw-hold.
            </li>
            <li>
              <strong>Drawer boxes</strong> — 1/2&quot; sides, 1/4&quot; or 3/8&quot; bottoms;
              durable, cleanly-edged, screws well.
            </li>
            <li>
              <strong>Architectural millwork</strong> — reception desks, built-ins, and commercial
              casework specified with multiply by name.
            </li>
            <li>
              <strong>Model-making, laser-cut substrates, and architectural models</strong> — the
              go-to sheet good for precision cut work.
            </li>
            <li>
              <strong>Speaker cabinets and enclosures</strong> — valued for uniform density and
              acoustic properties.
            </li>
            <li>
              <strong>Routed and shaped parts</strong> — shaped shelving, profile panels, curved
              parts.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <FAQ heading="Frequently Asked Questions" items={faqItems} />

      {/* Final CTA */}
      <FinalCTA
        heading="Multiply panels, in stock."
        body="Need Baltic Birch, ApplePly, or MPX for a project? Send us the product, thickness, grade or face, panel count, and delivery address — we'll quote and confirm stock within one business day."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{
          label: 'Back to Hardwood Plywood →',
          href: '/products/hardwood-plywood',
          variant: 'secondary',
        }}
      />
    </>
  );
}
