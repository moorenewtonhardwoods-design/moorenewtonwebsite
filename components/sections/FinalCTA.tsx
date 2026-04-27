import Link from 'next/link';
import { H2, Body } from '@/components/Typography';

interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface FinalCTAProps {
  heading: string;
  body: string;
  primaryCta: CTAButton;
  secondaryCta?: CTAButton;
}

export function FinalCTA({ heading, body, primaryCta, secondaryCta }: FinalCTAProps) {
  return (
    <section className="py-16 md:py-20 bg-emphasis text-canvas">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <H2 className="mb-6 text-canvas">{heading}</H2>
        <Body className="mb-8 text-canvas/80">{body}</Body>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={primaryCta.href}
            className="inline-flex items-center justify-center font-display text-sm tracking-label uppercase px-8 py-3 bg-accent text-canvas hover:bg-canvas hover:text-emphasis transition-colors"
          >
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center font-display text-sm tracking-label uppercase text-canvas hover:text-canvas/80 transition-colors"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
