import type { Metadata } from 'next';
import Link from 'next/link';
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
  title: 'About Moore Newton Hardwoods | Bay Area Lumber Supplier',
  description:
    'Moore Newton Hardwoods is the Bay Area\'s source for hardwood lumber, plywood, and millwork. Family-owned since 1954, serving woodworkers, cabinetmakers, and contractors.',
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
          title: 'About Moore Newton Hardwoods',
          description:
            'Moore Newton Hardwoods is the Bay Area\'s source for hardwood lumber, plywood, and millwork.',
        })}
      />
      {siteSettings && <JsonLd data={buildOrganizationSchema(siteSettings)} />}

      {/* Hero */}
      <PageHero
        eyebrow="About"
        title="About Moore Newton."
        subhead="The Bay Area's hardwood lumber supplier since 1954. We stock what woodworkers, cabinetmakers, and contractors actually need — and mill it to spec when they need something different."
        breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'About' }]}
      />

      {/* Who We Are */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Who We Are</Eyebrow>
          <H2 className="mb-6">A lumberyard that stocks what you need.</H2>
          <Body className="mb-6">
            Moore Newton Hardwoods is a full-service hardwood lumber supplier and commercial
            millwork facility based in San Leandro, California. We serve woodworkers, cabinetmakers,
            furniture makers, contractors, and architects across the Bay Area and Northern
            California.
          </Body>
          <Body>
            Our inventory includes domestic and imported hardwood lumber, architectural plywood,
            Baltic birch, composite panels, and softwood lumber. Our millwork facility turns that
            inventory into S4S stock, custom profiles, glue-ups, and specialty milling — all
            fulfilled in-house from the same material that crosses our counter.
          </Body>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Our Story</Eyebrow>
          <H2 className="mb-6">Seven decades of hardwood in the Bay Area.</H2>
          <Body className="mb-6">
            Moore Newton Hardwoods was founded in 1954 in the East Bay. The company started as a
            small hardwood yard serving local furniture makers and cabinetmakers — the kind of
            customers who needed specific species, specific grades, and specific dimensions, and
            needed to see the wood before they bought it.
          </Body>
          <Body className="mb-6">
            Over the decades, the inventory grew. The species list expanded from the domestic
            staples to include imported exotics, mahogany, sapele, and rift-sawn white oak. The
            panel selection grew to include architectural plywood, Baltic birch, and composite
            panels. The millwork facility was added to turn that inventory into installation-ready
            material.
          </Body>
          <Body>
            Today, Moore Newton serves the same customer base we always have — woodworkers who need
            the right material for the job, not the material that happens to be in stock. That means
            stocking what gets specified, grading it accurately, and milling it when the spec calls
            for something beyond a standard dimension.
          </Body>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">What We Stand For</Eyebrow>
          <H2 className="mb-6">No surprises. Just the material you ordered.</H2>

          <div className="space-y-6">
            <div>
              <H3 className="text-base mb-2">Accurate grading.</H3>
              <Body>
                What we call FAS is FAS. What we call #1 Common is #1 Common. Grades mean something
                because they have to — your yield depends on it.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Consistent inventory.</H3>
              <Body>
                We stock the species and grades that get specified in the Bay Area. No rotating
                inventory of whatever was cheap last month. If we say we stock it, we stock it.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">Transparent pricing.</H3>
              <Body>
                Quotes include everything. No surcharges that appear at checkout, no hidden fees on
                millwork, no mismatch between the quoted price and the invoice.
              </Body>
            </div>
            <div>
              <H3 className="text-base mb-2">In-house millwork.</H3>
              <Body>
                The same material we sell across the counter goes into our millwork facility. No
                substitution, no outside mill with different grade assumptions. What you order is
                what gets milled.
              </Body>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stock */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">What We Stock</Eyebrow>
          <H2 className="mb-6">From rough lumber to installation-ready millwork.</H2>

          <ul className="space-y-4 text-body list-disc pl-6">
            <li>
              <Link href="/products/hardwood-lumber" className="text-accent hover:text-emphasis underline">
                <strong>Hardwood Lumber</strong>
              </Link>{' '}
              — Domestic and imported species, rough-sawn and S4S, in the thicknesses and grades
              specified by Bay Area woodworkers.
            </li>
            <li>
              <Link href="/products/hardwood-plywood" className="text-accent hover:text-emphasis underline">
                <strong>Hardwood Plywood</strong>
              </Link>{' '}
              — Veneer-core, MDF-core, and particleboard-core panels in architectural species. A1 and
              A4 grades.
            </li>
            <li>
              <Link href="/products/baltic-birch" className="text-accent hover:text-emphasis underline">
                <strong>Baltic Birch</strong>
              </Link>{' '}
              — 5×5, 4×8, and 10×5 panels in BB/BB and B/BB grades, plus prefinished options.
            </li>
            <li>
              <Link href="/products/composite-panels" className="text-accent hover:text-emphasis underline">
                <strong>Composite Panels</strong>
              </Link>{' '}
              — MDF, particleboard, and melamine in standard and fire-rated options.
            </li>
            <li>
              <Link href="/products/softwood-lumber" className="text-accent hover:text-emphasis underline">
                <strong>Softwood Lumber</strong>
              </Link>{' '}
              — Douglas fir, western red cedar, and specialty softwoods for architectural millwork.
            </li>
            <li>
              <Link href="/products/millwork" className="text-accent hover:text-emphasis underline">
                <strong>Millwork</strong>
              </Link>{' '}
              — S4S dimensioning, custom profiles, glue-ups, and specialty milling from our in-house
              facility.
            </li>
          </ul>
        </div>
      </section>

      {/* Millwork Facility */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Millwork Facility</Eyebrow>
          <H2 className="mb-6">Custom millwork from the same stock you&apos;d buy over the counter.</H2>
          <Body className="mb-6">
            Moore Newton operates a commercial millwork facility that pulls directly from our lumber
            inventory. S4S dimensioning, custom profile runs, glue-ups, and specialty milling — all
            fulfilled in-house with 5–7 business day turnaround.
          </Body>
          <Body className="mb-6">
            Custom knives are cut on our CNC grinder and retained in our knife library for future
            runs. When a profile has been run through our facility before, the knife is often still
            on the shelf — mention it at the quote stage.
          </Body>
          <Body>
            <Link href="/products/millwork" className="text-accent hover:text-emphasis underline">
              Learn more about our millwork services →
            </Link>
          </Body>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Industries We Serve</Eyebrow>
          <H2 className="mb-6">From one-board projects to production runs.</H2>

          <ul className="space-y-3 text-body list-disc pl-6">
            <li>
              <strong>Cabinetmakers and casework shops</strong> — Hardwood, plywood, and Baltic birch
              for cabinet faces, cases, and drawer construction.
            </li>
            <li>
              <strong>Furniture makers</strong> — Select hardwoods for custom furniture, from FAS
              walnut to rift white oak.
            </li>
            <li>
              <strong>Architects and designers</strong> — Specification-grade material for
              residential and commercial millwork.
            </li>
            <li>
              <strong>General contractors</strong> — Framing lumber, trim stock, and millwork for
              renovation and new construction.
            </li>
            <li>
              <strong>Hobbyist woodworkers</strong> — No minimum order. Buy one board or one hundred.
            </li>
            <li>
              <strong>Boatbuilders</strong> — Marine-grade mahogany, teak, and specialty species for
              traditional wooden boat construction.
            </li>
          </ul>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Visit Us</Eyebrow>
          <H2 className="mb-6">Come see the inventory in person.</H2>
          <Body className="mb-6">
            Our San Leandro facility is open Monday through Friday, 7:00 AM to 4:30 PM. Walk the
            aisles, pull boards, and talk to the sales team about your project. Will-call pickup is
            available for orders placed ahead of time.
          </Body>
          <Body className="mb-6">
            <strong>Address:</strong>
            <br />
            2075 Williams Street
            <br />
            San Leandro, CA 94577
          </Body>
          <Body>
            <Link href="/contact" className="text-accent hover:text-emphasis underline">
              Get directions and contact information →
            </Link>
          </Body>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        heading="Ready to get started?"
        body="Whether you need a single board or a truckload, we're here to help. Request a quote or give us a call."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Contact Us →', href: '/contact', variant: 'secondary' }}
      />
    </>
  );
}
