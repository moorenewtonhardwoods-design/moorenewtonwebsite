import { GoogleAnalytics } from '@next/third-parties/google';
import { Header, Footer, SkipToContent } from '@/components/layout';

const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </>
  );
}
