import { Jost, Libre_Baskerville, IBM_Plex_Mono } from 'next/font/google';

export const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-jost',
  display: 'swap',
});

export const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-baskerville',
  display: 'swap',
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const fontVariables = `${jost.variable} ${libreBaskerville.variable} ${ibmPlexMono.variable}`;
