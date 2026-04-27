import type { FaqItem, BlockContent } from '@/sanity/types.generated';

export interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface SimpleFAQItem {
  question: string;
  answer: string;
}

function blockContentToPlainText(blocks: BlockContent | undefined): string {
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

export function buildFAQPageSchema(faqs: FaqItem[]): FAQPageSchema | null {
  const validFaqs = faqs.filter((faq) => faq.question && faq.answer);

  if (validFaqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question!,
      acceptedAnswer: {
        '@type': 'Answer',
        text: blockContentToPlainText(faq.answer),
      },
    })),
  };
}

export function buildSimpleFAQPageSchema(faqs: SimpleFAQItem[]): FAQPageSchema | null {
  const validFaqs = faqs.filter((faq) => faq.question && faq.answer);

  if (validFaqs.length === 0) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
