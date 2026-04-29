import type { Metadata } from 'next';
import Link from 'next/link';
import { H1, H2, Eyebrow, Body } from '@/components/Typography';
import { buildMetadata } from '@/lib/seo/metadata';
import { JsonLd, buildBreadcrumbListSchema } from '@/lib/seo/schema';
import { getAllArticles } from '@/lib/sanity/queries';

export const metadata: Metadata = buildMetadata({
  title: 'Articles | Hardwood Guides & Comparisons | Moore Newton',
  description:
    'Educational articles on hardwood lumber and plywood — species comparisons, grading systems, core constructions. From Moore Newton in San Leandro.',
  path: '/articles',
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbListSchema([
          { name: 'Home', path: '/' },
          { name: 'Articles', path: '/articles' },
        ])}
      />

      <section className="py-16 md:py-20 bg-canvas">
        <div className="max-w-4xl mx-auto px-6">
          <Eyebrow className="mb-4">Resources</Eyebrow>
          <H1 className="mb-6">Articles</H1>
          <Body className="mb-12 max-w-2xl">
            Educational guides on hardwood lumber and plywood — species comparisons, grading
            systems, core constructions, and practical specification advice for Bay Area builders.
          </Body>

          {articles.length === 0 ? (
            <Body className="text-body/70">No articles published yet. Check back soon.</Body>
          ) : (
            <div className="space-y-8">
              {articles.map((article) => (
                <article
                  key={article._id}
                  className="border-b border-surface pb-8 last:border-0"
                >
                  <Link
                    href={`/articles/${article.slug.current}`}
                    className="group block"
                  >
                    <H2 className="text-xl md:text-2xl mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </H2>
                    {article.publishedAt && (
                      <p className="text-sm text-body/60 mb-3">
                        {formatDate(article.publishedAt)}
                      </p>
                    )}
                    {article.seo?.description && (
                      <Body className="text-body/80">{article.seo.description}</Body>
                    )}
                    <span className="inline-block mt-3 text-accent group-hover:text-emphasis transition-colors">
                      Read article →
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
