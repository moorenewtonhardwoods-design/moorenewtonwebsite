import type { Metadata } from 'next';
import { H2, H3, Eyebrow, Body } from '@/components/Typography';
import { PageHero, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildBreadcrumbListSchema,
  buildAboutPageSchema,
  buildOrganizationSchema,
} from '@/lib/seo/schema';
import { getSiteSettings } from '@/lib/sanity/queries';

export const metadata: Metadata = buildMetadata({
  title: 'About Moore Newton | Bay Area Hardwood Distributor',
  description:
    "Moore Newton Hardwoods is an FSC-certified hardwood distributor in San Leandro, CA. Founded 2006. NHLA-graded lumber, HPVA-graded plywood, on-site millwork.",
  path: '/about',
});

export default async function AboutPage() {
  const siteSettings = await getSiteSettings();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <JsonLd
        data={buildAboutPageSchema({
          title: "The Bay Area's premier hardwood distributor",
          description:
            "Moore Newton Hardwoods is an FSC-certified hardwood distributor in San Leandro, CA.",
        })}
      />
      {siteSettings && <JsonLd data={buildOrganizationSchema(siteSettings)} />}

      {/* Hero */}
      <PageHero
        eyebrow="About Moore Newton"
        title="The Bay Area's premier hardwood distributor."
        subhead="Founded in 2006. Independently owned. FSC-certified. Supplying hardwood lumber, plywood, and millwork for Bay Area cabinetmakers, architects, boatbuilders, and fine woodworkers from our San Leandro facility."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About' }]}
      />

      {/* Who We Are */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Who We Are</Eyebrow>
          <Body>
            Moore Newton Hardwoods is the Bay Area&apos;s premier hardwood distributor. We stock
            over 40 species of kiln-dried lumber graded to NHLA standards, hardwood plywood graded
            to HPVA standards, specialty panels, and softwood lumber — and we operate a commercial
            millwork facility at our San Leandro location. Our customers are the production
            cabinetmakers, custom builders, architects, fine woodworkers, and designers who build
            the Bay Area&apos;s kitchens, buildings, boats, and furniture. We&apos;ve been doing
            this since 2006.
          </Body>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Our Story</Eyebrow>
          <H2 className="mb-6">Founded 2006. A Bay Area wood products staple.</H2>
          <Body className="mb-6">
            Founded by John Moore in 2006 — first as Moore Quality Lumber. A team of local industry
            experts was quickly assembled, and a Bay Area wood products staple was born overnight.
            In 2008, Mark Newton joined as a partner, bringing a second generation of
            hardwood-industry experience and the sourcing network that still underpins our inventory
            today.
          </Body>
          <Body className="mb-6">
            In 2012, Moore Newton integrated Higgins Lumber — a long-standing Bay Area hardwood
            supplier with its own roster of loyal trade customers. The combined operation moved to
            our current facility at 2115 Williams Street, San Leandro, in 2013. The Williams Street
            location is where we stock, grade, kiln-dry when needed, mill, and dispatch every order
            that leaves our dock.
          </Body>
          <Body>
            Two decades on, Moore Newton is still independently owned and still family-run. The
            business has grown, the inventory has deepened, and the mill network has gotten tighter
            — but the premise hasn&apos;t changed. Supply the material. Grade it honestly. Serve the
            Bay Area trade.
          </Body>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">How We Work</Eyebrow>
          <H2 className="mb-6">Three commitments that haven&apos;t moved in twenty years.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">1. Specification-grade material, every load.</H3>
              <Body>
                Every board of hardwood lumber we stock is NHLA-graded. Every sheet of hardwood
                plywood is HPVA-graded. Our proprietary sorts — Tiger Stripe Quartersawn White Oak,
                Select White Sap Hard Maple, Select Red Birch, Natural Yellow Birch S&amp;B, and
                others — are sorted to tighter specs than the NHLA baseline because that&apos;s what
                specification work demands.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">2. FSC certification where it matters.</H3>
              <Body>
                Moore Newton is FSC-certified. Multiple hardwood plywood lines and several lumber
                species are stocked in FSC-certified form. When a project requires chain-of-custody
                documentation, we can supply it. When it doesn&apos;t, we won&apos;t oversell it.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">3. Independent ownership, wholesale discipline.</H3>
              <Body>
                We&apos;re not a chain. We don&apos;t answer to a private-equity portfolio.
                We&apos;re a wholesale-oriented distributor that sells to the trade —
                cabinetmakers, millwork firms, boatbuilders, furniture makers, general contractors,
                architects, and designers. That discipline shows up in depth of inventory,
                consistency of grade, and the willingness to stock species a commodity distributor
                wouldn&apos;t touch.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stock */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Inventory</Eyebrow>
          <H2 className="mb-6">Deep in species, deeper in grades.</H2>

          <Body className="mb-6">
            Hardwood lumber across over 40 species — domestic oak, walnut, cherry, hard maple,
            hickory, ash, alder, poplar, birch, soft maple, and the full slate of figured and
            character sorts — plus imported Honduran mahogany, African mahogany, sapele, Burmese
            teak, and a rotating set of exotic species from bloodwood to zebrawood. Thicknesses run
            4/4 through 12/4 in most species, 16/4 in poplar. S3S and S4S inventory in the species
            that call for it. All lumber graded to NHLA standards.
          </Body>

          <Body className="mb-6">
            Hardwood plywood in six core constructions: veneer core, combination core, engineered
            core, multiply (ApplePly and Columbia PureBond MPX), calibrated MDF core, and premium
            MPX. Pre-finished maple and birch. Baltic birch in 5×5, 4×8, and 10×5 panels. All panels
            graded to HPVA standards.
          </Body>

          <Body>
            Softwood lumber across 85/15 VG Douglas fir, Clear VG cedars (Western Red, Alaskan
            Yellow, Port Orford), Sugar Pine, Ponderosa Pine, Spanish Cedar, and Aromatic Tennessee
            Cedar. Composite panels from Plum Creek MDF2, Ultralight MDF, Roseburg Armorite,
            American Laminates melamine, and HPL combination-core. Custom moulding and millwork.
          </Body>
        </div>
      </section>

      {/* The Millwork Facility */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Millwork</Eyebrow>
          <H2 className="mb-6">Custom Millwork, Delivered.</H2>
          <Body>
            Moore Newton operates a full-service commercial millwork facility that turns our
            rough-sawn lumber inventory into high-quality dimensional boards and custom profiles on
            a short turnaround. We produce S4S dimensioning across standard widths, run standard
            moulding profiles, cut custom knives for specified profiles (standard turnaround 5–7
            business days), and handle glue-ups and specialty milling. Every board that enters the
            millwork facility comes from the same inventory we sell across the counter — no
            substitutions, no &quot;close-enough&quot; material.
          </Body>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Who We Supply</Eyebrow>
          <H2 className="mb-6">The Bay Area builders that specify their materials.</H2>
          <Body>
            Custom cabinet and casework builders. Architectural millwork firms. Custom window and
            door builders. Furniture makers and studio woodworkers. Boatbuilders — from traditional
            wooden-boat restoration to plywood-core modern builds. Exhibit, staging, and set
            fabrication firms. Retail fixture builders. CNC production builders running repeatable
            cutting programs. General contractors pulling for specific jobs. And the architects and
            designers who specify the material for all of them.
          </Body>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Come See Us</Eyebrow>
          <H2 className="mb-6">2115 Williams Street, San Leandro.</H2>
          <Body className="mb-6">
            Our facility is open Monday through Friday, 8:00 AM to 4:30 PM. Will-call pickup is
            available to anyone — we&apos;ll set up an account for you on arrival. For delivery,
            orders of $500 and up ship next-business-day across the Greater Bay Area for a flat $50
            fee; orders over $750 ship at no delivery fee to commercial addresses and at a reduced
            $35 fee to residential addresses.
          </Body>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        heading="Ready to get started?"
        body="Request a quote or get in touch with our sales team."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Contact Us →', href: '/contact', variant: 'secondary' }}
      />
    </>
  );
}
