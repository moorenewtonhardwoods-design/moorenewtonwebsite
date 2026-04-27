'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Header, Footer, SkipToContent } from '@/components/layout';
import { H1, Body } from '@/components/Typography';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Error Boundary]', error);
  }, [error]);

  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 flex items-center justify-center py-24">
        <div className="max-w-lg mx-auto px-6 text-center">
          <p className="font-display text-xs tracking-label uppercase text-body mb-4">
            Something Went Wrong
          </p>
          <H1 className="mb-6">Error</H1>
          <Body className="mb-8">
            We encountered an unexpected error. Please try again, or contact us if the problem
            persists.
          </Body>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="font-display text-xs tracking-label uppercase px-8 py-3 border-2 border-emphasis text-emphasis bg-transparent hover:bg-emphasis hover:text-canvas transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="font-display text-xs tracking-label uppercase px-8 py-3 border border-body/30 text-body hover:border-body transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
