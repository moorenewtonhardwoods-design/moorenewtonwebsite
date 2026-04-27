import { H1, Eyebrow, Lead } from '@/components/Typography';
import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subhead?: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, subhead, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <div className="max-w-4xl mx-auto px-6">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <H1 className="mb-6">{title}</H1>
        {subhead && <Lead className="max-w-3xl">{subhead}</Lead>}
        {children}
      </div>
    </section>
  );
}
