'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { H2, Eyebrow, Body, Caption } from '@/components/Typography';
import { X } from 'lucide-react';

interface FaceSpeciesSwatch {
  _id: string;
  originalFilename: string;
  url: string;
  altText?: string;
  title?: string;
}

interface SwatchData {
  id: string;
  filename: string;
  url: string;
  speciesName: string;
  cut: string;
  slug: string | null;
  altText: string;
  caption?: string;
}

const plywoodOnlyCaptions: Record<string, string> = {
  lacewood:
    'Lacewood (Panopsis spp.) — Large, distinctive ray fleck figure with a silvery sheen. Native to South America. Popular for accent panels and architectural millwork where bold figure is the design intent.',
  padauk:
    'Padauk (Pterocarpus soyauxii) — Vivid orange-red color that deepens to a rich burgundy over time. Native to Central and West Africa. Specified for high-contrast accent work and statement pieces.',
  wenge:
    'Wenge (Millettia laurentii) — Dark chocolate brown with fine black streaking. Native to Central Africa. Dense, dramatic, and specified for contemporary millwork where a near-black wood is the design.',
  zebrawood:
    'Zebrawood (Microberlinia brazzavillensis) — Bold striped pattern alternating tan and dark brown. Native to Central Africa. Used for accent panels, furniture, and architectural features where graphic impact is required.',
};

function parseSwatchFilename(filename: string): {
  speciesName: string;
  cut: string;
  slug: string | null;
} {
  const base = filename.replace(/\.[^.]+$/, '').toLowerCase();

  const cutPatterns = [
    { pattern: '-plainsliced', label: 'Plain-sliced' },
    { pattern: '-plain-sliced', label: 'Plain-sliced' },
    { pattern: '-quartered', label: 'Quartersliced' },
    { pattern: '-quartersliced', label: 'Quartersliced' },
    { pattern: '-quartersawn', label: 'Quartersawn' },
    { pattern: '-rift', label: 'Rift' },
    { pattern: '-rotary', label: 'Rotary' },
    { pattern: '-natural-rotary', label: 'Rotary' },
    { pattern: '-birsdeye', label: 'Birdseye' },
    { pattern: '-birdseye', label: 'Birdseye' },
    { pattern: '-soft-curly', label: 'Curly' },
    { pattern: '-curly', label: 'Curly' },
    { pattern: '-vg', label: 'Vertical Grain' },
    { pattern: '-clear', label: 'Clear' },
    { pattern: '-knotty', label: 'Knotty' },
    { pattern: '-aromatic', label: 'Aromatic' },
  ];

  let cut = '';
  let speciesBase = base;

  for (const { pattern, label } of cutPatterns) {
    if (base.includes(pattern)) {
      cut = label;
      speciesBase = base.replace(pattern, '');
      break;
    }
  }

  const speciesNames: Record<string, string> = {
    'white-oak': 'White Oak',
    'red-oak': 'Red Oak',
    cherry: 'Cherry',
    walnut: 'Black Walnut',
    maple: 'Hard Maple',
    'maple-soft': 'Soft Maple',
    'mahogany-khaya': 'African Mahogany',
    birch: 'Birch',
    douglasfir: 'Douglas Fir',
    hickory: 'Hickory',
    poplar: 'Poplar',
    sapele: 'Sapele',
    teak: 'Teak',
    cedar: 'Western Red Cedar',
    pine: 'Pine',
    jatoba: 'Jatoba',
    rosewood: 'Rosewood',
    lacewood: 'Lacewood',
    padauk: 'Padauk',
    wenge: 'Wenge',
    zebrawood: 'Zebrawood',
  };

  const speciesSlugs: Record<string, string | null> = {
    'white-oak': 'white-oak',
    'red-oak': 'red-oak',
    cherry: 'cherry',
    walnut: 'walnut',
    maple: 'hard-maple',
    'maple-soft': 'soft-maple',
    'mahogany-khaya': 'african-mahogany',
    birch: 'birch',
    douglasfir: 'douglas-fir',
    hickory: 'hickory',
    poplar: 'poplar',
    sapele: 'sapele',
    teak: 'teak',
    cedar: null,
    pine: null,
    jatoba: null,
    rosewood: null,
    lacewood: null,
    padauk: null,
    wenge: null,
    zebrawood: null,
  };

  const speciesName = speciesNames[speciesBase] || speciesBase.replace(/-/g, ' ');
  const slug = speciesSlugs[speciesBase] ?? null;

  return { speciesName, cut, slug };
}

function processSwatches(swatches: FaceSpeciesSwatch[]): SwatchData[] {
  return swatches.map((swatch) => {
    const { speciesName, cut, slug } = parseSwatchFilename(swatch.originalFilename);
    const baseSlug = swatch.originalFilename.replace(/\.[^.]+$/, '').toLowerCase();

    return {
      id: swatch._id,
      filename: swatch.originalFilename,
      url: swatch.url,
      speciesName,
      cut,
      slug,
      altText: swatch.altText || `${speciesName}${cut ? ` ${cut}` : ''} face`,
      caption: plywoodOnlyCaptions[baseSlug.split('-')[0]],
    };
  });
}

interface ModalProps {
  swatch: SwatchData;
  onClose: () => void;
}

function SwatchModal({ swatch, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-emphasis/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-canvas p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-body hover:text-emphasis transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="aspect-square relative mb-4">
          <Image
            src={swatch.url}
            alt={swatch.altText}
            fill
            sizes="(max-width: 640px) 100vw, 600px"
            className="object-cover"
          />
        </div>

        <h3 className="font-display text-xl tracking-wide uppercase text-emphasis mb-1">
          {swatch.speciesName}
        </h3>
        {swatch.cut && <Caption className="text-accent mb-3">{swatch.cut}</Caption>}
        {swatch.caption && <Body className="text-sm">{swatch.caption}</Body>}
      </div>
    </div>
  );
}

interface SwatchTileProps {
  swatch: SwatchData;
  onClick: () => void;
}

function SwatchTile({ swatch, onClick }: SwatchTileProps) {
  const content = (
    <>
      <div className="aspect-square relative overflow-hidden bg-surface">
        <Image
          src={swatch.url}
          alt={swatch.altText}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="font-display text-sm tracking-wide uppercase text-emphasis group-hover:text-accent transition-colors">
          {swatch.speciesName}
        </p>
        {swatch.cut && <Caption className="text-body/70">{swatch.cut}</Caption>}
      </div>
    </>
  );

  if (swatch.slug) {
    return (
      <Link href={`/species/${swatch.slug}`} className="group block bg-canvas hover:shadow-md transition-shadow">
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group block w-full text-left bg-canvas hover:shadow-md transition-shadow cursor-pointer"
    >
      {content}
    </button>
  );
}

interface FaceSpeciesGalleryProps {
  swatches: FaceSpeciesSwatch[];
}

export function FaceSpeciesGallery({ swatches }: FaceSpeciesGalleryProps) {
  const [selectedSwatch, setSelectedSwatch] = useState<SwatchData | null>(null);
  const processedSwatches = processSwatches(swatches);

  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <Eyebrow className="mb-4">Face Veneers</Eyebrow>
        <H2 className="mb-2">Face Species Available</H2>
        <Body className="mb-8 max-w-2xl">
          {processedSwatches.length} face species stocked across our hardwood plywood inventory.
          Click any species with a dedicated page to learn more.
        </Body>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {processedSwatches.map((swatch) => (
            <SwatchTile
              key={swatch.id}
              swatch={swatch}
              onClick={() => setSelectedSwatch(swatch)}
            />
          ))}
        </div>
      </div>

      {selectedSwatch && (
        <SwatchModal swatch={selectedSwatch} onClose={() => setSelectedSwatch(null)} />
      )}
    </section>
  );
}
