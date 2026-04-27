import { H1, H2, H3, H4, Body, Lead, Eyebrow, Caption } from '@/components/Typography';

const colors = [
  { name: 'canvas', hex: '#F5F0E8', var: '--color-canvas', type: 'primary' },
  { name: 'surface', hex: '#EDE6D8', var: '--color-surface', type: 'primary' },
  { name: 'accent', hex: '#8B6914', var: '--color-accent', type: 'primary' },
  { name: 'body', hex: '#5C4A2E', var: '--color-body', type: 'primary' },
  { name: 'emphasis', hex: '#2C2416', var: '--color-emphasis', type: 'primary' },
  { name: 'highlight', hex: '#D4A0A0', var: '--color-highlight', type: 'secondary' },
  { name: 'positive', hex: '#8A9A7B', var: '--color-positive', type: 'secondary' },
  { name: 'info', hex: '#7E92A5', var: '--color-info', type: 'secondary' },
  { name: 'warning', hex: '#C9A84C', var: '--color-warning', type: 'secondary' },
  { name: 'warm', hex: '#B86B4A', var: '--color-warm', type: 'secondary' },
];

function ColorSwatch({
  name,
  hex,
  varName,
}: {
  name: string;
  hex: string;
  varName: string;
}) {
  return (
    <div className="flex flex-col">
      <div
        className="h-20 w-full border border-body/15"
        style={{ backgroundColor: hex }}
      />
      <div className="p-3 border border-t-0 border-body/15">
        <p className="font-display text-xs tracking-label uppercase text-emphasis">{name}</p>
        <p className="font-mono text-xs text-body">{hex}</p>
        <p className="font-mono text-xs text-body/60">{varName}</p>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <Eyebrow className="mb-2 block">Design System Preview</Eyebrow>
        <H1>Style Guide</H1>
        <Lead className="mt-4 max-w-prose mx-auto">
          This page displays all typography components and color tokens from the Design System
          Style Guide. For internal QA only.
        </Lead>
      </div>

      <hr className="border-t border-body/10 my-16" />

      {/* Typography Section */}
      <section className="mb-16">
        <H2 className="text-center mb-12">Typography</H2>

        <div className="space-y-12">
          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              H1 - Jost 400, text-4xl md:text-6xl, tracking-headline, uppercase
            </Caption>
            <H1>Page Title Example</H1>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              H2 - Jost 400, text-2xl md:text-3xl, tracking-wide, uppercase
            </Caption>
            <H2>Section Heading Example</H2>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              H3 - Jost 600, text-lg md:text-xl, tracking-subhead, uppercase
            </Caption>
            <H3>Card Heading Example</H3>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              H4 - Jost 400, text-sm, tracking-headline, uppercase
            </Caption>
            <H4>Subheading Example</H4>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              Body - Libre Baskerville 400, text-base, leading-relaxed
            </Caption>
            <Body>
              This is body text using Libre Baskerville. It has a refined serif character that
              pairs well with the geometric sans headlines. The line height is set to
              leading-relaxed (1.625) for an editorial feel. Maximum content width should be
              max-w-prose (65ch) for optimal readability.
            </Body>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              Lead - Libre Baskerville 400, text-lg md:text-xl, leading-relaxed
            </Caption>
            <Lead>
              Lead text is larger body copy used for introductory paragraphs, pull quotes, and
              other emphasized content.
            </Lead>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              Eyebrow - Jost 400, text-xs, tracking-label, uppercase
            </Caption>
            <Eyebrow>Category Label</Eyebrow>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              Caption - Libre Baskerville 400, text-sm
            </Caption>
            <Caption>Caption or metadata text, smaller and secondary.</Caption>
          </div>
        </div>
      </section>

      <hr className="border-t border-body/10 my-16" />

      {/* Font Samples Section */}
      <section className="mb-16">
        <H2 className="text-center mb-12">Font Families</H2>

        <div className="space-y-8">
          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">Jost (Display) - Weights 400, 600</Caption>
            <p className="font-display text-2xl font-normal mb-2">
              Jost Regular 400 - ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
            <p className="font-display text-2xl font-semibold">
              Jost Semibold 600 - ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">
              Libre Baskerville (Body) - Weights 400, 700, Italic
            </Caption>
            <p className="font-body text-xl font-normal mb-2">
              Libre Baskerville Regular 400 - The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-body text-xl font-bold mb-2">
              Libre Baskerville Bold 700 - The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-body text-xl italic">
              Libre Baskerville Italic 400 - The quick brown fox jumps over the lazy dog.
            </p>
          </div>

          <div className="p-8 border border-body/15">
            <Caption className="block mb-4 text-body/60">IBM Plex Mono - Weight 400</Caption>
            <p className="font-mono text-lg">
              IBM Plex Mono 400 - 1234567890 | $1,250.00 | 4/4 FAS | 8&quot; Wide
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t border-body/10 my-16" />

      {/* Colors Section */}
      <section className="mb-16">
        <H2 className="text-center mb-12">Color Palette</H2>

        <div className="mb-8">
          <H3 className="mb-6">Primary Colors</H3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors
              .filter((c) => c.type === 'primary')
              .map((color) => (
                <ColorSwatch
                  key={color.name}
                  name={color.name}
                  hex={color.hex}
                  varName={color.var}
                />
              ))}
          </div>
        </div>

        <div>
          <H3 className="mb-6">Secondary Colors</H3>
          <p className="font-body text-sm text-body/70 mb-4">
            WCAG AA Note: Secondary colors fail contrast requirements for text. Use only for
            backgrounds, borders, or decorative elements.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors
              .filter((c) => c.type === 'secondary')
              .map((color) => (
                <ColorSwatch
                  key={color.name}
                  name={color.name}
                  hex={color.hex}
                  varName={color.var}
                />
              ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-body/10 my-16" />

      {/* Contrast Notes */}
      <section className="mb-16">
        <H2 className="text-center mb-12">Contrast Ratios</H2>

        <div className="max-w-2xl mx-auto">
          <div className="border border-body/15 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-body/15 bg-surface">
                  <th className="p-3 text-left font-display text-xs tracking-label uppercase">
                    Combination
                  </th>
                  <th className="p-3 text-left font-display text-xs tracking-label uppercase">
                    Ratio
                  </th>
                  <th className="p-3 text-left font-display text-xs tracking-label uppercase">
                    WCAG AA
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                <tr className="border-b border-body/10">
                  <td className="p-3">body on canvas</td>
                  <td className="p-3">~5.2:1</td>
                  <td className="p-3 text-positive">PASS</td>
                </tr>
                <tr className="border-b border-body/10">
                  <td className="p-3">emphasis on canvas</td>
                  <td className="p-3">~10.8:1</td>
                  <td className="p-3 text-positive">PASS</td>
                </tr>
                <tr className="border-b border-body/10">
                  <td className="p-3">accent on canvas</td>
                  <td className="p-3">~3.8:1</td>
                  <td className="p-3 text-warning">Large text only</td>
                </tr>
                <tr className="border-b border-body/10">
                  <td className="p-3">body on surface</td>
                  <td className="p-3">~4.5:1</td>
                  <td className="p-3 text-positive">PASS (borderline)</td>
                </tr>
                <tr>
                  <td className="p-3">secondary colors as text</td>
                  <td className="p-3">&lt;3:1</td>
                  <td className="p-3 text-warm">FAIL - use for bg only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
