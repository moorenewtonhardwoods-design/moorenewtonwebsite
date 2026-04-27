import Link from 'next/link';
import { H3, Body } from '@/components/Typography';

interface ProductCardProps {
  title: string;
  description: string;
  href: string;
  ctaLabel?: string;
}

export function ProductCard({ title, description, href, ctaLabel = 'Browse →' }: ProductCardProps) {
  return (
    <Link
      href={href}
      className="group block p-6 bg-surface hover:bg-emphasis transition-colors"
    >
      <H3 as="h3" className="text-base mb-2 group-hover:text-canvas transition-colors">
        {title}
      </H3>
      <Body as="p" className="text-sm mb-4 group-hover:text-canvas/80 transition-colors">
        {description}
      </Body>
      <span className="font-display text-xs tracking-label uppercase text-accent group-hover:text-canvas transition-colors">
        {ctaLabel}
      </span>
    </Link>
  );
}
