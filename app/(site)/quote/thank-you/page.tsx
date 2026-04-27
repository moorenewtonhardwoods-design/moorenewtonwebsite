import type { Metadata } from 'next';
import Link from 'next/link';
import { H1, Body } from '@/components/Typography';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Quote Request Received | Moore Newton',
  description: 'Your quote request has been received. We will respond within one business day.',
  path: '/quote/thank-you',
  noIndex: true,
});

export default function QuoteThankYouPage() {
  return (
    <main id="main" className="flex-1 flex items-center justify-center py-24">
      <div className="max-w-lg mx-auto px-6 text-center">
        <p className="font-display text-xs tracking-label uppercase text-accent mb-4">
          Request Received
        </p>
        <H1 className="mb-6">Thank You</H1>
        <Body className="mb-4">
          Your request has been received. We&apos;ll respond within one business day with pricing,
          availability, and a delivery estimate.
        </Body>
        <Body className="mb-8">
          For urgent orders, call{' '}
          <a href="tel:+15103176500" className="text-accent hover:text-emphasis underline">
            (510) 317-6500
          </a>
          .
        </Body>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/species"
            className="font-display text-xs tracking-label uppercase px-8 py-3 border-2 border-emphasis text-emphasis bg-transparent hover:bg-emphasis hover:text-canvas transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Browse Species
          </Link>
          <Link
            href="/products"
            className="font-display text-xs tracking-label uppercase px-8 py-3 border border-body/30 text-body hover:border-body transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
