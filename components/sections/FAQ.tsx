import { H2, Eyebrow, Body } from '@/components/Typography';

export interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

interface FAQProps {
  eyebrow?: string;
  heading?: string;
  items: FAQItem[];
}

export function FAQ({ eyebrow = 'FAQ', heading = 'Frequently Asked Questions', items }: FAQProps) {
  return (
    <section className="py-16 md:py-20 bg-canvas">
      <div className="max-w-4xl mx-auto px-6">
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <H2 className="mb-8">{heading}</H2>
        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group border border-muted bg-surface"
            >
              <summary className="flex cursor-pointer items-center justify-between p-6 font-display text-base font-medium text-emphasis hover:bg-canvas/50 transition-colors list-none [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  className="ml-4 flex-shrink-0 text-body/50 group-open:rotate-45 transition-transform"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="px-6 pb-6 pt-2">
                <Body>{item.answer}</Body>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
