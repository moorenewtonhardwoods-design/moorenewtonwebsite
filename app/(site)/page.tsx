import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { H1, H2, H3, Eyebrow, Lead, Body } from '@/components/Typography';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildLumberStoreSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
} from '@/lib/seo/schema';
import { getSiteSettings, getFeaturedSpecies } from '@/lib/sanity/queries';
import type { FeaturedSpecies } from '@/lib/sanity/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Hardwood Lumber Bay Area | Moore Newton | San Leandro',
  description:
    'Bay Area hardwood distributor in San Leandro. 40+ species, NHLA-graded lumber, HPVA-graded plywood, commercial millwork. Next-day delivery, free at $750+.',
  path: '/',
});

const industries = [
  { title: 'Custom Cabinets & Casework', description: 'Kitchen, bath, built-in, commercial.' },
  { title: 'Architectural Millwork', description: 'Doors, panels, trim, specified runs.' },
  { title: 'Custom Windows & Doors', description: 'Species-matched, grade-controlled stock.' },
  { title: 'Furniture', description: 'Solid-wood and veneer work, studio to production.' },
  {
    title: 'Exhibit & Staging Fabrication',
    description: 'Retail fixtures, trade show builds, set construction.',
  },
  { title: 'Moulding & Trim', description: 'Standard profiles and custom runs.' },
  { title: 'CNC Cutting', description: 'Consistent stock for repeatable cutting programs.' },
];

const products = [
  {
    title: 'Hardwood Lumber',
    description: '40+ species. FAS, Select & Better, and proprietary sorts.',
    href: '/products/hardwood-lumber',
  },
  {
    title: 'Hardwood Plywood',
    description: 'Veneer, combination, multiply, MDF cores, MPX.',
    href: '/products/hardwood-plywood',
  },
  {
    title: 'Baltic Birch',
    description: '5×5, 4×8, and 10×5 panels. BB/BB and B/BB grades, prefinished options.',
    href: '/products/baltic-birch',
  },
  {
    title: 'Softwood Lumber',
    description: '85/15 VG Douglas fir, Clear VG cedars, Sugar and Ponderosa pine.',
    href: '/products/softwood-lumber',
  },
  {
    title: 'Composite Panels',
    description:
      'Plum Creek MDF2, Ultralight MDF, Armorite, American Laminates melamine, HPL combination-core.',
    href: '/products/composite-panels',
  },
  {
    title: 'Millwork & Moulding',
    description: 'S4S, custom profiles, glue-ups, commercial cut-to-size.',
    href: '/products/millwork',
  },
];

const fallbackSpecies: FeaturedSpecies[] = [
  {
    _id: 'white-oak',
    title: 'White Oak',
    slug: { current: 'white-oak' },
    botanicalName: 'Quercus alba',
    hero: { subhead: 'Plain-sawn, rift, and quartersawn. 4/4 through 16/4. The flagship.' },
  },
  {
    _id: 'walnut',
    title: 'Black Walnut',
    slug: { current: 'walnut' },
    botanicalName: 'Juglans nigra',
    hero: { subhead: 'American Juglans nigra. Figured and character runs available.' },
  },
  {
    _id: 'cherry',
    title: 'Cherry',
    slug: { current: 'cherry' },
    botanicalName: 'Prunus serotina',
    hero: { subhead: 'American black cherry. Clear, wide boards, consistent color.' },
  },
  {
    _id: 'hard-maple',
    title: 'Hard Maple',
    slug: { current: 'hard-maple' },
    botanicalName: 'Acer saccharum',
    hero: { subhead: 'Select White Sap. FAS and Select & Better. The workhorse.' },
  },
  {
    _id: 'sapele',
    title: 'Sapele',
    slug: { current: 'sapele' },
    botanicalName: 'Entandrophragma cylindricum',
    hero: { subhead: 'West African ribbon-figure standard.' },
  },
  {
    _id: 'honduran-mahogany',
    title: 'Honduran Mahogany',
    slug: { current: 'honduran-mahogany' },
    botanicalName: 'Swietenia macrophylla',
    hero: { subhead: 'Swietenia macrophylla, FAS.' },
  },
];

export default async function HomePage() {
  const [siteSettings, featuredSpeciesData] = await Promise.all([
    getSiteSettings(),
    getFeaturedSpecies(),
  ]);

  const featuredSpecies =
    featuredSpeciesData.length > 0 ? featuredSpeciesData.slice(0, 6) : fallbackSpecies;

  return (
    <>
      <JsonLd data={buildLumberStoreSchema(siteSettings ?? {})} />
      <JsonLd data={buildOrganizationSchema(siteSettings ?? {})} />
      <JsonLd data={buildWebSiteSchema(siteSettings ?? {})} />

      {/* 1. Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-surface">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-lumber-yard.jpg"
            alt="Stacks of premium hardwood lumber at Moore Newton's San Leandro facility"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <Eyebrow className="mb-4">San Leandro · Since 2006</Eyebrow>
          <H1 className="mb-6">The Bay Area&apos;s Premier Hardwood Lumberyard.</H1>
          <Lead className="mb-8 max-w-2xl mx-auto">
            40+ species of kiln-dried, NHLA-graded lumber. HPVA-graded plywood. Commercial millwork
            facility. Next-day delivery across the Bay; no fee on commercial orders over $750.
          </Lead>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center font-display text-sm tracking-label uppercase px-8 py-3 bg-accent text-canvas hover:bg-emphasis transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Request a Quote
            </Link>
            <Link
              href="/species"
              className="inline-flex items-center justify-center font-display text-sm tracking-label uppercase px-8 py-3 border-2 border-emphasis text-emphasis hover:bg-emphasis hover:text-canvas transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Browse Species →
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Sub-hero — Multiply Plywood Differentiator */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow className="mb-4">Stocking Distributor</Eyebrow>
              <H2 className="mb-6">ApplePly and Columbia PureBond MPX, in stock.</H2>
              <Body className="mb-6">
                Moore Newton stocks ApplePly from States Industries and Columbia PureBond MPX Core
                in our San Leandro warehouse. Both are on the floor today — not special-ordered, not
                paper-stocked. If your work calls for a multiply-core panel with dimensional
                stability, void-free construction, and a brand-name grade you can specify by name,
                we have it.
              </Body>
              <Link
                href="/products/hardwood-plywood/multiply"
                className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
              >
                See Multiply Plywood →
              </Link>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/multiply-plywood-stack.jpg"
                alt="ApplePly and Columbia PureBond multiply plywood stacked in warehouse"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Commercial Millwork Facility */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative aspect-[4/3]">
              <Image
                src="/images/millwork-facility.jpg"
                alt="Commercial millwork equipment at Moore Newton facility"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <Eyebrow className="mb-4">Commercial Millwork</Eyebrow>
              <H2 className="mb-6">Custom Millwork, Delivered.</H2>
              <Body className="mb-6">
                Our full-service commercial millwork facility turns our rough-sawn lumber inventory
                into high-quality dimensional boards and custom profiles on a short turnaround. S4S
                dimensioning, standard and custom profile runs, glue-ups, and specialty milling —
                all fulfilled in-house from the same inventory we sell across the counter. Typical
                turnaround is 5–7 business days for custom profiles; standard S4S is faster. Submit
                a drawing or a sample and we&apos;ll quote linear footage, pricing, and lead time.
              </Body>
              <Link
                href="/products/millwork"
                className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
              >
                Millwork Capabilities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Inventory Depth */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Eyebrow className="mb-4">What We Stock</Eyebrow>
          <H2 className="mb-6">Over 40 species. 4/4 through 16/4. Graded, kiln-dried, stocked.</H2>
          <Body className="mb-4 max-w-3xl mx-auto">
            Every major domestic, imported, and exotic hardwood species the Bay Area builds with —
            plain-sawn white oak to African sapele to Burmese teak. Thicknesses run 4/4 through 12/4
            in most species; 16/4 in poplar. All lumber is graded to NHLA standards. All plywood is
            graded to HPVA standards. FSC-certified material is carried across several lines.
          </Body>
          <Body className="max-w-3xl mx-auto">
            Hardwood plywood in six core types. Prefinished panels. Baltic birch. Softwood lumber.
            Composite panels. Custom moulding and millwork. Delivered next-business-day across the
            Greater Bay Area, or picked up at our San Leandro location, Monday through Friday.
          </Body>
        </div>
      </section>

      {/* 5. Who We Serve */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow className="mb-4">Industries</Eyebrow>
            <H2 className="mb-6">Bay Area builders that specify their materials.</H2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {industries.map((industry) => (
              <div key={industry.title} className="p-6 bg-canvas">
                <H3 as="h3" className="text-base mb-2">
                  {industry.title}
                </H3>
                <Body as="span" className="text-sm">
                  {industry.description}
                </Body>
              </div>
            ))}
          </div>
          <Body className="text-center max-w-3xl mx-auto">
            Production cabinetmakers running standing orders. One-off makers sourcing for a single
            commission. General contractors pulling for a specific job. Architects and designers
            specifying the material for all of them.
          </Body>
        </div>
      </section>

      {/* 6. Products Overview */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow className="mb-4">Products</Eyebrow>
            <H2 className="mb-6">Everything a Bay Area builder needs, under one roof.</H2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                className="group p-6 bg-surface hover:bg-emphasis transition-colors duration-300"
              >
                <H3 as="h3" className="text-base mb-2 group-hover:text-canvas transition-colors">
                  {product.title}
                </H3>
                <Body
                  as="span"
                  className="text-sm mb-4 block group-hover:text-canvas/80 transition-colors"
                >
                  {product.description}
                </Body>
                <span className="font-display text-xs tracking-label uppercase text-accent group-hover:text-canvas transition-colors">
                  Browse →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Species */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow className="mb-4">Stock Profiles</Eyebrow>
            <H2 className="mb-6">Six species worth a closer look.</H2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredSpecies.map((species) => (
              <Link
                key={species._id}
                href={`/species/${species.slug.current}`}
                className="group relative overflow-hidden bg-canvas"
              >
                <div className="relative aspect-[3/2]">
                  <Image
                    src={`/images/species/${species.slug.current}.jpg`}
                    alt={`${species.title} lumber grain pattern`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <H3 as="h3" className="text-base mb-1">
                    {species.title}
                  </H3>
                  <Body as="span" className="text-sm">
                    {species.hero?.subhead}
                  </Body>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/species"
              className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
            >
              Browse all 40+ species →
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Delivery & Pickup */}
      <section className="py-20 md:py-28 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <Eyebrow className="mb-4">Delivery</Eyebrow>
            <H2 className="mb-6">From our dock to yours, next day.</H2>
            <Body className="mb-6">
              Next-day delivery across the Greater Bay Area on orders $500 and up — San Francisco,
              Oakland, Berkeley, San Jose, San Rafael, Palo Alto, Santa Cruz, Salinas/Carmel, and
              the places in between — placed by 4:30 PM Pacific. Flat $50 delivery fee; no fee on
              orders over $750 to commercial addresses, $35 reduced fee to residential. Clear Lake
              on a weekly Wednesday run; Sacramento and the foothills on a 2–3 day schedule. LTL
              freight (including U.S. military bases) on request. Will-call pickup at 2115 Williams
              Street, San Leandro, Monday through Friday, no minimum, no appointment required.
            </Body>
            <Link
              href="/delivery"
              className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
            >
              Delivery Details →
            </Link>
          </div>
        </div>
      </section>

      {/* 9. About Teaser */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow className="mb-4">Since 2006</Eyebrow>
              <H2 className="mb-6">Family-owned, independently run.</H2>
              <Body className="mb-6">
                Moore Newton Hardwoods was founded in 2006 and has operated from our Williams Street
                facility in San Leandro since 2013. We&apos;re independently owned, FSC-certified, and
                focused on one thing: supplying the material Bay Area builders actually build with.
              </Body>
              <Link
                href="/about"
                className="inline-flex items-center font-display text-sm tracking-label uppercase text-accent hover:text-emphasis transition-colors border-b-2 border-accent hover:border-emphasis pb-1"
              >
                Our Story →
              </Link>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="/images/about-facility.jpg"
                alt="Moore Newton Hardwoods facility exterior on Williams Street, San Leandro"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section className="py-20 md:py-28 bg-emphasis text-canvas">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <H2 className="mb-6 text-canvas">Ready for a quote?</H2>
          <Body className="mb-8 text-canvas/80">
            Send us a cutlist or a project description. We respond within one business day with
            pricing, availability, and a delivery estimate.
          </Body>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center font-display text-sm tracking-label uppercase px-8 py-3 bg-accent text-canvas hover:bg-canvas hover:text-emphasis transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 focus-visible:ring-offset-emphasis"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-display text-sm tracking-label uppercase px-8 py-3 border-2 border-canvas text-canvas hover:bg-canvas hover:text-emphasis transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-canvas focus-visible:ring-offset-2 focus-visible:ring-offset-emphasis"
            >
              Visit Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
