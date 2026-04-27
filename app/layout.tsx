import type { Metadata, Viewport } from 'next';
import './globals.css';

// TODO: Wire up fonts (Jost, Libre Baskerville, IBM Plex Mono) per Design System Style Guide

export const metadata: Metadata = {
  title: 'Moore Newton Hardwoods',
  description: 'Premium hardwood lumber distributor in San Leandro, CA',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
