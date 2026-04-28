import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { H1, H2, H3, Eyebrow, Lead, Body } from '@/components/Typography';
import { PortableText } from '@/components/PortableText';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildSpeciesProductSchema,
  buildBreadcrumbListSchema,
  buildFAQPageSchema,
} from '@/lib/seo/schema';
import { getAllSpeciesSlugs, getSpeciesBySlug } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { SpeciesPage, FaqItem, BlockContent } from '@/sanity/types.generated';

interface ResolvedFaq {
  _id: string;
  question?: string;
  answer?: BlockContent;
  scope?: string;
}

interface ResolvedRelatedSpecies {
  _key: string;
  species?: {
    _id: string;
    title?: string;
    slug?: { current?: string };
    botanicalName?: string;
    category?: string;
    hero?: { h1?: string; subhead?: string };
  };
  descriptionOverride?: string;
}

interface ResolvedImage {
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      dimensions?: { width: number; height: number };
      lqip?: string;
    };
  };
  alt?: string;
  caption?: string;
}

interface ResolvedSpeciesPage extends Omit<SpeciesPage, 'faqs' | 'relatedSpecies' | 'heroImage' | 'gallery'> {
  faqs?: ResolvedFaq[];
  relatedSpecies?: ResolvedRelatedSpecies[];
  heroImage?: ResolvedImage;
  gallery?: ResolvedImage[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSpeciesSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const species = await getSpeciesBySlug(slug);

  if (!species) {
    return buildMetadata({
      title: 'Species Not Found | Moore Newton',
      description: 'The requested species page could not be found.',
      path: `/species/${slug}`,
      noIndex: true,
    });
  }

  const title = species.seo?.title ?? `${species.title} Lumber Bay Area | Moore Newton`;
  const description =
    species.seo?.description ??
    `${species.title} (${species.botanicalName ?? ''}) stocked at Moore Newton in San Leandro. Next-day Bay Area delivery.`;

  return buildMetadata({
    title,
    description,
    path: `/species/${slug}`,
    noIndex: species.seo?.noindex,
  });
}

function SpecsTable({ specs }: { specs: SpeciesPage['specsAtAGlance'] }) {
  if (!specs?.length) return null;

  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">Species specifications at a glance</caption>
      <tbody>
        {specs.map((spec) => (
          <tr key={spec._key} className="border-b border-body/10">
            <th
              scope="row"
              className="py-3 pr-4 text-left font-display text-sm tracking-label uppercase text-emphasis"
            >
              {spec.label}
            </th>
            <td className="py-3 text-body">{spec.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function GradesTable({ grades }: { grades: SpeciesPage['gradesStocked'] }) {
  if (!grades?.length) return null;

  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">Lumber grades stocked</caption>
      <thead>
        <tr className="border-b-2 border-emphasis">
          <th
            scope="col"
            className="py-3 pr-4 text-left font-display text-sm tracking-label uppercase text-emphasis"
          >
            Grade
          </th>
          <th
            scope="col"
            className="py-3 text-left font-display text-sm tracking-label uppercase text-emphasis"
          >
            Typical Use
          </th>
        </tr>
      </thead>
      <tbody>
        {grades.map((grade) => (
          <tr key={grade._key} className="border-b border-body/10">
            <td className="py-3 pr-4 font-semibold text-emphasis">{grade.grade}</td>
            <td className="py-3 text-body">
              {grade.typicalUse && (
                <PortableText value={grade.typicalUse as BlockContent} className="[&_p]:mb-0" />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ThicknessTable({ thicknesses }: { thicknesses: SpeciesPage['thicknessesStocked'] }) {
  if (!thicknesses?.length) return null;

  return (
    <table className="w-full border-collapse">
      <caption className="sr-only">Lumber thicknesses stocked</caption>
      <thead>
        <tr className="border-b-2 border-emphasis">
          <th
            scope="col"
            className="py-3 pr-4 text-left font-display text-sm tracking-label uppercase text-emphasis"
          >
            Thickness
          </th>
          <th
            scope="col"
            className="py-3 pr-4 text-left font-display text-sm tracking-label uppercase text-emphasis"
          >
            Widths
          </th>
          <th
            scope="col"
            className="py-3 pr-4 text-left font-display text-sm tracking-label uppercase text-emphasis"
          >
            Dimensioning
          </th>
          <th
            scope="col"
            className="py-3 text-left font-display text-sm tracking-label uppercase text-emphasis"
          >
            Note
          </th>
        </tr>
      </thead>
      <tbody>
        {thicknesses.map((t) => (
          <tr key={t._key} className="border-b border-body/10">
            <td className="py-3 pr-4 font-semibold text-emphasis">{t.thickness}</td>
            <td className="py-3 pr-4 text-body">{t.widths?.join(', ') ?? '—'}</td>
            <td className="py-3 pr-4 text-body">{t.dimensioning ?? '—'}</td>
            <td className="py-3 text-body">{t.note ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FAQSection({ faqs }: { faqs: ResolvedFaq[] }) {
  if (!faqs?.length) return null;

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        <Eyebrow className="mb-4">Frequently Asked Questions</Eyebrow>
        <H2 className="mb-8">Common Questions</H2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq._id} className="group bg-canvas">
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-display text-base tracking-wide uppercase text-emphasis hover:text-accent transition-colors">
                <span>{faq.question}</span>
                <span className="ml-4 text-accent group-open:rotate-180 transition-transform">
                  ▼
                </span>
              </summary>
              <div className="px-6 pb-6">
                <PortableText value={faq.answer} />
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

interface RelatedSpeciesCardProps {
  species: NonNullable<ResolvedRelatedSpecies['species']>;
  descriptionOverride?: string;
}

function RelatedSpeciesCard({ species, descriptionOverride }: RelatedSpeciesCardProps) {
  const slug = species.slug?.current;
  if (!slug) return null;

  return (
    <Link
      href={`/species/${slug}`}
      className="group block p-6 bg-canvas hover:bg-emphasis transition-colors"
    >
      <H3 as="h3" className="text-base mb-1 group-hover:text-canvas transition-colors">
        {species.title}
      </H3>
      {species.botanicalName && (
        <p className="text-sm italic text-body/70 mb-2 group-hover:text-canvas/70 transition-colors">
          {species.botanicalName}
        </p>
      )}
      <Body
        as="span"
        className="text-sm group-hover:text-canvas/80 transition-colors"
      >
        {descriptionOverride ?? species.hero?.subhead}
      </Body>
    </Link>
  );
}

export default async function SpeciesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const speciesData = await getSpeciesBySlug(slug);

  if (!speciesData) {
    notFound();
  }

  const species = speciesData as unknown as ResolvedSpeciesPage;
  const faqs = species.faqs ?? [];
  const faqSchema = buildFAQPageSchema(faqs as unknown as FaqItem[]);

  const heroImageUrl = species.heroImage?.asset?.url
    ?? (species.seo?.ogImage?.asset
      ? urlFor(species.seo.ogImage.asset)?.width(1200).height(630).url()
      : null);
  const heroImageAlt = species.heroImage?.alt ?? `${species.title} lumber grain pattern`;

  return (
    <>
      <JsonLd data={buildSpeciesProductSchema(speciesData)} />
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Species', path: '/species' },
          { name: species.title ?? 'Species', path: `/species/${slug}` },
        ])}
      />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-surface">
        {heroImageUrl && (
          <div className="absolute inset-0">
            <Image
              src={heroImageUrl}
              alt={heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-10"
            />
          </div>
        )}
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-body/70">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li>
                <Link href="/species" className="hover:text-accent transition-colors">
                  Species
                </Link>
              </li>
              <li aria-hidden="true">→</li>
              <li className="text-emphasis">{species.title}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <H1 className="mb-4">{species.hero?.h1 ?? species.title}</H1>
              {species.hero?.subhead && <Lead className="mb-6">{species.hero.subhead}</Lead>}
              {species.hero?.leadParagraph && (
                <PortableText value={species.hero.leadParagraph} className="max-w-3xl" />
              )}
            </div>
            {species.heroImage?.asset?.url && (
              <div className="relative aspect-square bg-canvas overflow-hidden">
                <Image
                  src={species.heroImage.asset.url}
                  alt={species.heroImage.alt ?? `${species.title} face`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {species.heroImage.caption && (
                  <span className="absolute bottom-0 left-0 right-0 bg-emphasis/80 text-canvas text-sm px-4 py-2">
                    {species.heroImage.caption}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery - Alternate Cuts */}
      {species.gallery && species.gallery.length > 0 && (
        <section className="py-12 md:py-16 bg-canvas">
          <div className="max-w-6xl mx-auto px-6">
            <Eyebrow className="mb-4">Veneer Cuts</Eyebrow>
            <H2 className="mb-8">Available Cuts</H2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {species.gallery.map((img, idx) => (
                <div key={img.asset?._id ?? idx} className="group">
                  <div className="relative aspect-square bg-surface overflow-hidden">
                    {img.asset?.url && (
                      <Image
                        src={img.asset.url}
                        alt={img.alt ?? `${species.title} alternate cut`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover"
                      />
                    )}
                  </div>
                  {img.caption && (
                    <p className="mt-2 text-sm font-display tracking-wide uppercase text-emphasis">
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Specs at a Glance */}
      {species.specsAtAGlance && species.specsAtAGlance.length > 0 && (
        <section className="py-16 md:py-20 bg-canvas">
          <div className="max-w-4xl mx-auto px-6">
            <Eyebrow className="mb-4">Specs at a Glance</Eyebrow>
            <H2 className="mb-8">Technical Specifications</H2>
            <div className="bg-surface p-6 md:p-8">
              <SpecsTable specs={species.specsAtAGlance} />
            </div>
          </div>
        </section>
      )}

      {/* Grade & Availability */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Grade & Availability</Eyebrow>
          <H2 className="mb-6">What We Stock</H2>

          {species.gradeIntro && <PortableText value={species.gradeIntro} className="mb-8" />}

          {species.gradesStocked && species.gradesStocked.length > 0 && (
            <div className="mb-8">
              <H3 className="mb-4">Grades Stocked</H3>
              <div className="bg-canvas p-6 overflow-x-auto">
                <GradesTable grades={species.gradesStocked} />
              </div>
            </div>
          )}

          {species.thicknessesStocked && species.thicknessesStocked.length > 0 && (
            <div className="mb-8">
              <H3 className="mb-4">Thicknesses Stocked</H3>
              <div className="bg-canvas p-6 overflow-x-auto">
                <ThicknessTable thicknesses={species.thicknessesStocked} />
              </div>
            </div>
          )}

          {species.alternativeGrades && (
            <div className="mb-8">
              <H3 className="mb-4">Alternative Grades</H3>
              <PortableText value={species.alternativeGrades} />
            </div>
          )}

          {species.figuredInventory && (
            <div>
              <H3 className="mb-4">Figured Inventory</H3>
              <PortableText value={species.figuredInventory} />
            </div>
          )}
        </div>
      </section>

      {/* Where It Comes From */}
      {species.whereItComesFrom && (
        <section className="py-16 md:py-20 bg-canvas">
          <div className="max-w-4xl mx-auto px-6">
            <Eyebrow className="mb-4">Sourcing</Eyebrow>
            <H2 className="mb-6">Where It Comes From</H2>
            <PortableText value={species.whereItComesFrom} />
            {species.fscNote && (
              <div className="mt-6 p-4 bg-surface border-l-4 border-positive">
                <H3 className="mb-2">FSC Certification</H3>
                <PortableText value={species.fscNote} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Grain & Appearance */}
      {species.grainAndAppearance && (
        <section className="py-16 md:py-20 bg-surface">
          <div className="max-w-4xl mx-auto px-6">
            <Eyebrow className="mb-4">Appearance</Eyebrow>
            <H2 className="mb-6">Grain & Appearance</H2>
            <PortableText value={species.grainAndAppearance} />
          </div>
        </section>
      )}

      {/* Typical Uses */}
      {species.typicalUses && (
        <section className="py-16 md:py-20 bg-canvas">
          <div className="max-w-4xl mx-auto px-6">
            <Eyebrow className="mb-4">Applications</Eyebrow>
            <H2 className="mb-6">Typical Uses</H2>
            <PortableText value={species.typicalUses} />
          </div>
        </section>
      )}

      {/* Working Characteristics */}
      {species.workingCharacteristics && (
        <section className="py-16 md:py-20 bg-surface">
          <div className="max-w-4xl mx-auto px-6">
            <Eyebrow className="mb-4">Workability</Eyebrow>
            <H2 className="mb-6">Working Characteristics</H2>
            <PortableText value={species.workingCharacteristics} />
          </div>
        </section>
      )}

      {/* Finishing Notes */}
      {species.finishingNotes && (
        <section className="py-16 md:py-20 bg-canvas">
          <div className="max-w-4xl mx-auto px-6">
            <Eyebrow className="mb-4">Finishing</Eyebrow>
            <H2 className="mb-6">Finishing Notes</H2>
            <PortableText value={species.finishingNotes} />
          </div>
        </section>
      )}

      {/* Related Species */}
      {species.relatedSpecies && species.relatedSpecies.length > 0 && (
        <section className="py-16 md:py-20 bg-surface">
          <div className="max-w-6xl mx-auto px-6">
            <Eyebrow className="mb-4">Related</Eyebrow>
            <H2 className="mb-8">Related Species</H2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {species.relatedSpecies.map((rel) =>
                rel.species ? (
                  <RelatedSpeciesCard
                    key={rel._key}
                    species={rel.species}
                    descriptionOverride={rel.descriptionOverride}
                  />
                ) : null
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection faqs={faqs} />

      {/* Millwork CTA (optional) */}
      {species.showMillworkCta && species.millworkCta && (
        <section className="py-16 md:py-20 bg-canvas">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Eyebrow className="mb-4">Millwork</Eyebrow>
            <H2 className="mb-6">{species.millworkCta.heading ?? 'Custom Millwork Available'}</H2>
            {species.millworkCta.body && (
              <PortableText value={species.millworkCta.body} className="mb-8" />
            )}
            <Link
              href={species.millworkCta.ctaHref ?? '/quote'}
              className="inline-flex items-center justify-center font-display text-sm tracking-label uppercase px-8 py-3 bg-accent text-canvas hover:bg-emphasis transition-colors"
            >
              {species.millworkCta.ctaLabel ?? 'Request Millwork Quote'}
            </Link>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-emphasis text-canvas">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <H2 className="mb-6 text-canvas">
            {species.finalCta?.heading ?? `Need ${species.title} for a project?`}
          </H2>
          {species.finalCta?.body ? (
            <PortableText value={species.finalCta.body} className="mb-8 text-canvas/80" />
          ) : (
            <Body className="mb-8 text-canvas/80">
              Send us a cutlist or describe what you&apos;re working on. We&apos;ll confirm pricing,
              availability, and delivery within the day.
            </Body>
          )}
          <Link
            href={species.finalCta?.primaryCta?.href ?? '/quote'}
            className="inline-flex items-center justify-center font-display text-sm tracking-label uppercase px-8 py-3 bg-accent text-canvas hover:bg-canvas hover:text-emphasis transition-colors"
          >
            {species.finalCta?.primaryCta?.label ?? `Request a Quote — ${species.title}`}
          </Link>
        </div>
      </section>
    </>
  );
}
