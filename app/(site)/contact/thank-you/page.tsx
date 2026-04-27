import type { Metadata } from 'next';
import Link from 'next/link';
import { H1, Body } from '@/components/Typography';
import { buildMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Message Received | Moore Newton',
  description: 'Thanks for reaching out. We will be in touch within one business day.',
  path: '/contact/thank-you',
  noIndex: true,
});

export default function ContactThankYouPage() {
  return (
    <main id="main" className="flex-1 flex items-center justify-center py-24">
      <div className="max-w-lg mx-auto px-6 text-center">
        <p className="font-display text-xs tracking-label uppercase text-accent mb-4">
          Message Received
        </p>
        <H1 className="mb-6">Thank You</H1>
        <Body className="mb-8">
          Thanks for reaching out. We&apos;ll be in touch within one business day.
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
