import type { Metadata } from 'next';
import Link from 'next/link';
import { H2, Eyebrow, Body } from '@/components/Typography';
import { PageHero, ProductCard, FinalCTA } from '@/components/sections';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema } from '@/lib/seo/schema';

export const metadata: Metadata = buildMetadata({
  title: 'Hardwood Products | Moore Newton | San Leandro',
  description:
    'Hardwood lumber, hardwood plywood, composite products, and custom millwork — all in stock and available from our sprawling indoor San Leandro facility.',
  path: '/products',
});

const productCategories = [
  {
    title: 'Hardwood Lumber',
    description:
      'Over 40 species of kiln-dried hardwood graded to NHLA standards. Domestic oak, walnut, cherry, hard maple, hickory, ash, alder, poplar, birch, and soft maple — plus imported Honduran mahogany, African mahogany, sapele, Burmese teak, and a rotating slate of exotics. 4/4 through 16/4 rough; S3S and S4S inventory in the species that call for it. Proprietary sorts (Tiger Stripe Quartersawn White Oak, Select White Sap Hard Maple, 8"+ Wide Sort, and others) stocked year-round.',
    href: '/products/hardwood-lumber',
    cta: 'Browse Hardwood Lumber →',
  },
  {
    title: 'Hardwood Plywood',
    description:
      'Panels graded to HPVA standards in six core constructions: veneer core, combination core, engineered core, multiply (ApplePly and Columbia PureBond MPX), calibrated MDF core, and premium MPX. Pre-finished maple and birch. A full range of face-veneer species, cuts (plain, rift, quartered, rotary), and matching patterns.',
    href: '/products/hardwood-plywood',
    cta: 'Browse Hardwood Plywood →',
  },
  {
    title: 'Multiply Plywood',
    description:
      'States Industries ApplePly and Columbia PureBond MPX Core — both stocked, not special-ordered. Void-free, dimensionally stable, and edge-finishable. The multiply-core panel of choice for high-end casework, retail fixtures, and exposed-edge applications.',
    href: '/products/hardwood-plywood/multiply',
    cta: 'See Multiply Plywood →',
  },
  {
    title: 'Millwork',
    description:
      'Full-service commercial millwork facility under the same roof as our lumber inventory. S4S dimensioning, standard profile runs, custom knives cut to your drawing (5–7 business day turnaround), glue-ups, and specialty milling. Every board milled in-house comes from the same material we sell across the counter.',
    href: '/products/millwork',
    cta: 'See Millwork Capabilities →',
  },
  {
    title: 'Softwood Lumber',
    description:
      'Specification-grade softwoods: 85/15 export-grade Douglas fir (vertical-grain, fine-grain, full-sawn in the rough), Clear Vertical Grain Western Red Cedar, Alaskan Yellow Cedar, Port Orford Cedar, Sugar Pine, Ponderosa Pine, Spanish Cedar, and Aromatic Tennessee Cedar. Not a commodity softwood slate — sorted for architectural millwork, custom windows and doors, and exterior siding.',
    href: '/products/softwood-lumber',
    cta: 'Browse Softwood Lumber →',
  },
  {
    title: 'Baltic Birch',
    description:
      'Baltic-region multiply birch in 5×5, 4×8, and 10×5 panels, BB/BB and B/BB grades, prefinished options stocked. Phenolic-resin WBP adhesive. The Bay Area standard for CNC work, jig-building, production casework, and exposed-edge furniture.',
    href: '/products/baltic-birch',
    cta: 'Browse Baltic Birch →',
  },
  {
    title: 'Composite Panels',
    description:
      'Plum Creek MDF2, Ultralight MDF, Roseburg Armorite exterior MDF, American Laminates melamine (TFL, RWT, EIR, FFF), and HPL combination-core panels. Stocked in 1/8" through 2" thicknesses across 4×8, 4×10, and 5×10 sheet sizes (not every thickness in every dimension). For production casework, architectural interiors, signage, and utility applications.',
    href: '/products/composite-panels',
    cta: 'Browse Composite Panels →',
  },
];

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ])}
      />

      {/* Hero */}
      <PageHero
        eyebrow="Products"
        title="Hardwood Products."
        subhead="Lumber, plywood, panels, and millwork — everything a Bay Area builder needs, stocked deep at our Williams Street facility in San Leandro and delivered next-day across the Bay."
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products' },
        ]}
      />

      {/* Intro */}
      <section className="py-12 md:py-16 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Body>
            Moore Newton is a full-line hardwood distributor. We carry{' '}
            <Link href="/species" className="text-accent hover:text-emphasis underline">
              over 40 species
            </Link>{' '}
            of lumber graded to NHLA standards in thicknesses from 4/4 through 16/4, six core types
            of hardwood plywood graded to HPVA standards, Baltic birch, specification-grade
            softwoods, composite panels, and a full-service commercial millwork facility under the
            same roof. Most orders are stocked and shipping the same or next day. Custom millwork
            runs 5–7 business days on standard turnaround.
          </Body>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <Eyebrow className="mb-4">What We Carry</Eyebrow>
          <H2 className="mb-8">Seven product lines, one facility.</H2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCategories.map((category) => (
              <ProductCard
                key={category.title}
                title={category.title}
                description={category.description}
                href={category.href}
                ctaLabel={category.cta}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA
        heading="Need a quote on a specific product or species?"
        body="Send us a cutlist, a drawing, or a description of what you're working on. We respond within one business day with pricing, availability, and a delivery estimate."
        primaryCta={{ label: 'Request a Quote', href: '/quote', variant: 'primary' }}
        secondaryCta={{ label: 'Contact Sales →', href: '/contact', variant: 'secondary' }}
      />
    </>
  );
}
