import { PortableText as SanityPortableText } from '@portabletext/react';
import Link from 'next/link';
import type { PortableTextComponents } from '@portabletext/react';
import type { BlockContent } from '@/sanity/types.generated';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
    h2: ({ children }) => (
      <h2 className="font-display text-2xl md:text-3xl tracking-wide uppercase text-emphasis mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-lg md:text-xl font-semibold tracking-subhead uppercase text-emphasis mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-display text-sm font-normal tracking-headline uppercase text-emphasis mt-4 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 my-4 italic text-body/85">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href ?? '#';
      const isExternal = href.startsWith('http');
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-emphasis underline transition-colors"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="text-accent hover:text-emphasis underline transition-colors">
          {children}
        </Link>
      );
    },
    speciesLink: ({ value, children }) => {
      const slug = value?.species?.slug?.current;
      if (!slug) return <>{children}</>;
      return (
        <Link
          href={`/species/${slug}`}
          className="text-accent hover:text-emphasis underline transition-colors"
        >
          {children}
        </Link>
      );
    },
    productLink: ({ value, children }) => {
      const slug = value?.product?.slug?.current;
      if (!slug) return <>{children}</>;
      return (
        <Link
          href={`/products/${slug}`}
          className="text-accent hover:text-emphasis underline transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    calloutBox: ({ value }) => {
      const variantStyles: Record<string, string> = {
        note: 'bg-info/10 border-info',
        spec: 'bg-accent/10 border-accent',
        warning: 'bg-warning/10 border-warning',
      };
      const style = variantStyles[value?.variant ?? 'note'] ?? variantStyles.note;
      return (
        <div className={`border-l-4 p-4 my-4 ${style}`}>
          {value?.body && <PortableText value={value.body} />}
        </div>
      );
    },
  },
};

interface PortableTextProps {
  value: BlockContent | null | undefined;
  className?: string;
}

export function PortableText({ value, className = '' }: PortableTextProps) {
  if (!value) return null;
  return (
    <div className={`font-body text-base leading-relaxed text-body ${className}`}>
      <SanityPortableText value={value} components={components} />
    </div>
  );
}

export function blockContentToPlainText(blocks: BlockContent | null | undefined): string {
  if (!blocks) return '';
  return blocks
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children
          .filter((child) => child._type === 'span')
          .map((span) => span.text ?? '')
          .join('');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n\n');
}
