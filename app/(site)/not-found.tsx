import Link from 'next/link';
import { H1, Body } from '@/components/Typography';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-24">
      <div className="max-w-lg mx-auto px-6 text-center">
        <p className="font-display text-xs tracking-label uppercase text-body mb-4">
          Error 404
        </p>
        <H1 className="mb-6">Page Not Found</H1>
        <Body className="mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Try searching
          our species catalog or navigating from the homepage.
        </Body>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="font-display text-xs tracking-label uppercase px-8 py-3 border-2 border-emphasis text-emphasis bg-transparent hover:bg-emphasis hover:text-canvas transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Go to Homepage
          </Link>
          <Link
            href="/species"
            className="font-display text-xs tracking-label uppercase px-8 py-3 border border-body/30 text-body hover:border-body transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Browse Species
          </Link>
        </div>
      </div>
    </div>
  );
}
