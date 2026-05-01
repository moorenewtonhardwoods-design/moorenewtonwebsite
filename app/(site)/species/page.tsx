import type { Metadata } from 'next';
import Link from 'next/link';
import { H1, H2, H3, Eyebrow, Body } from '@/components/Typography';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema } from '@/lib/seo/schema';
import { getAllSpecies } from '@/lib/sanity/queries';
import type { SpeciesPage } from '@/sanity/types.generated';

export const metadata: Metadata = buildMetadata({
  title: 'Hardwood Lumber Species | Bay Area | Moore Newton',
  description:
    'Browse 40+ hardwood and softwood lumber species stocked at Moore Newton in San Leandro. NHLA-graded, kiln-dried. Next-day Bay Area delivery.',
  path: '/species',
});

const categoryLabels: Record<string, string> = {
  'domestic-hardwood': 'Domestic Hardwoods',
  'imported-hardwood': 'Imported Hardwoods',
  softwood: 'Softwoods',
  specialty: 'Specialty Woods',
};

const categoryOrder = ['domestic-hardwood', 'imported-hardwood', 'softwood', 'specialty'];

function groupByCategory(species: SpeciesPage[]): Record<string, SpeciesPage[]> {
  const groups: Record<string, SpeciesPage[]> = {};

  for (const s of species) {
    const category = s.category ?? 'specialty';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(s);
  }

  return groups;
}

function SpeciesCard({ species }: { species: SpeciesPage }) {
  const slug = species.slug?.current;
  if (!slug) return null;

  return (
    <Link
      href={`/species/${slug}`}
      className="group block p-6 bg-surface hover:bg-emphasis transition-colors"
    >
      <H3 as="h3" className="text-base mb-1 group-hover:text-canvas transition-colors">
        {species.title}
      </H3>
      {species.botanicalName && (
        <p className="text-sm italic text-body/85 mb-2 group-hover:text-canvas/85 transition-colors">
          {species.botanicalName}
        </p>
      )}
      <Body as="span" className="text-sm group-hover:text-canvas/80 transition-colors">
        {species.hero?.subhead}
      </Body>
    </Link>
  );
}

export default async function SpeciesIndexPage() {
  const allSpecies = await getAllSpecies();
  const groupedSpecies = groupByCategory(allSpecies);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Species', path: '/species' },
        ])}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-body/85">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li className="text-emphasis">Species</li>
            </ol>
          </nav>

          <Eyebrow className="mb-4">Lumber Species</Eyebrow>
          <H1 className="mb-6">Over 40 Species, Stocked.</H1>
          <Body className="max-w-2xl">
            Every major domestic, imported, and exotic hardwood species the Bay Area builds with.
            All lumber is graded to NHLA standards, kiln-dried, and ready for next-day delivery
            across the Greater Bay Area.
          </Body>
        </div>
      </section>

      {/* Species Grid by Category */}
      {categoryOrder.map((category) => {
        const speciesInCategory = groupedSpecies[category];
        if (!speciesInCategory?.length) return null;

        return (
          <section key={category} className="py-16 md:py-20 bg-canvas">
            <div className="max-w-6xl mx-auto px-6">
              <H2 className="mb-8">{categoryLabels[category] ?? category}</H2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {speciesInCategory.map((species) => (
                  <SpeciesCard key={species._id} species={species} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* No Species Fallback */}
      {allSpecies.length === 0 && (
        <section className="py-16 md:py-20 bg-canvas">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Body>Species information is being added. Check back soon.</Body>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 md:py-20 bg-emphasis text-canvas">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <H2 className="mb-6 text-canvas">Need help choosing a species?</H2>
          <Body className="mb-8 text-canvas/80">
            Tell us about your project and we&apos;ll recommend the right species for your
            application, budget, and timeline.
          </Body>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center font-display text-sm tracking-label uppercase px-8 py-3 bg-accent text-canvas hover:bg-canvas hover:text-emphasis transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
