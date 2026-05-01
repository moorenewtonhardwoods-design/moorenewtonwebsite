import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { H1, H2, Eyebrow, Body } from '@/components/Typography';
import { PortableText } from '@/components/PortableText';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  JsonLd,
  buildBreadcrumbListSchema,
  buildArticleSchema,
} from '@/lib/seo/schema';
import { getAllArticleSlugs, getArticleBySlug } from '@/lib/sanity/queries';
import { urlFor } from '@/lib/sanity/image';
import type { BlockContent } from '@/sanity/types.generated';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return buildMetadata({
      title: 'Article Not Found | Moore Newton',
      description: 'The requested article could not be found.',
      path: `/articles/${slug}`,
      noIndex: true,
    });
  }

  const title = article.seo?.title || `${article.title} | Moore Newton`;
  const description = article.seo?.description || '';

  return buildMetadata({
    title,
    description,
    path: `/articles/${slug}`,
  });
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const heroImageUrl = article.heroImage?.asset?.asset?.url;
  const heroImageAlt = article.heroImage?.alt || article.title;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Articles', path: '/articles' },
          { name: article.title, path: `/articles/${slug}` },
        ])}
      />
      <JsonLd
        data={buildArticleSchema({
          title: article.title,
          description: article.seo?.description,
          path: `/articles/${slug}`,
          publishedAt: article.publishedAt,
          imageUrl: heroImageUrl,
        })}
      />

      <article className="py-16 md:py-20 bg-canvas">
        <div className="max-w-3xl mx-auto px-6">
          <Eyebrow className="mb-4">
            <Link href="/articles" className="hover:text-accent transition-colors">
              Articles
            </Link>
          </Eyebrow>

          <H1 className="mb-4">{article.title}</H1>

          {article.publishedAt && (
            <p className="text-sm text-body/85 mb-8">
              Published {formatDate(article.publishedAt)}
            </p>
          )}

          {heroImageUrl && (
            <div className="relative aspect-video mb-8 bg-surface overflow-hidden">
              <Image
                src={heroImageUrl}
                alt={heroImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose-moore-newton">
            <PortableText value={article.body as BlockContent} />
          </div>

          {article.relatedSpecies && article.relatedSpecies.length > 0 && (
            <aside className="mt-12 pt-8 border-t border-surface">
              <H2 className="text-lg mb-4">Related Species</H2>
              <div className="flex flex-wrap gap-3">
                {article.relatedSpecies.map((species) => (
                  <Link
                    key={species._id}
                    href={`/species/${species.slug?.current}`}
                    className="inline-block px-4 py-2 bg-surface text-sm text-emphasis hover:bg-accent hover:text-white transition-colors"
                  >
                    {species.title}
                  </Link>
                ))}
              </div>
            </aside>
          )}

          <div className="mt-12 pt-8 border-t border-surface">
            <Link
              href="/articles"
              className="text-accent hover:text-emphasis transition-colors"
            >
              ← Back to Articles
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
