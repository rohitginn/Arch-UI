import { MarqueeLogos } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Sample data                                                         */
/* ------------------------------------------------------------------ */

// Using placeholder SVG logos in place of real brand assets
function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <div className="h-6 w-6 rounded bg-[hsl(var(--muted))] flex items-center justify-center">
        <span className="text-[8px] font-bold text-[hsl(var(--muted-foreground))] uppercase">{name[0]}</span>
      </div>
      <span className="text-sm font-semibold text-[hsl(var(--muted-foreground))] whitespace-nowrap">{name}</span>
    </div>
  );
}

const logos = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png', alt: 'Amazon' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png', alt: 'Google' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png', alt: 'Microsoft' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/505px-Apple_logo_black.svg.png', alt: 'Apple' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Notion-logo.svg/2048px-Notion-logo.svg.png', alt: 'Notion' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1024px-Y_Combinator_logo.svg.png', alt: 'Y Combinator' },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function BlockMarqueeLogosDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 id="marquee-logos" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Marquee Logos
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A continuously scrolling ticker of customer/partner logos. Configurable speed, direction, and pause-on-hover behaviour.
        </p>
      </div>

      {/* ── Default ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`import { MarqueeLogos } from '@archui/react';

<MarqueeLogos
  heading="Trusted by teams at"
  logos={[
    { src: '/logos/amazon.svg', alt: 'Amazon' },
    { src: '/logos/google.svg', alt: 'Google' },
    { src: '/logos/microsoft.svg', alt: 'Microsoft' },
    // ...
  ]}
  pauseOnHover
/>`}
        >
          <MarqueeLogos
            heading="Trusted by teams at"
            logos={logos}
            pauseOnHover
          />
        </ComponentPreview>
      </section>

      {/* ── Speed variants ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="speed" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Speed variants
        </h2>
        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Slow</h3>
        <ComponentPreview code={`<MarqueeLogos logos={logos} speed="slow" />`}>
          <MarqueeLogos logos={logos} speed="slow" />
        </ComponentPreview>

        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Fast</h3>
        <ComponentPreview code={`<MarqueeLogos logos={logos} speed="fast" />`}>
          <MarqueeLogos logos={logos} speed="fast" />
        </ComponentPreview>
      </section>

      {/* ── Direction ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="direction" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Reverse direction
        </h2>
        <ComponentPreview code={`<MarqueeLogos logos={logos} direction="right" />`}>
          <MarqueeLogos logos={logos} direction="right" />
        </ComponentPreview>
      </section>

      {/* ── Installation ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock code={`npm install @archui/react\n# or\npnpm add @archui/react`} />
      </section>

      {/* ── Usage ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Usage
        </h2>
        <CodeBlock
          code={`import { MarqueeLogos } from '@archui/react';

export default function TrustSection() {
  const logos = [
    { src: '/logos/vercel.svg', alt: 'Vercel' },
    { src: '/logos/github.svg', alt: 'GitHub' },
    { src: '/logos/aws.svg', alt: 'AWS' },
  ];

  return (
    <MarqueeLogos
      heading="Trusted by teams at"
      logos={logos}
      speed="normal"
      pauseOnHover
    />
  );
}`}
        />
      </section>

      {/* ── Props ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Default</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['logos', 'LogoItem[]', '—', 'Array of logo objects with src and alt (required)'],
                ['heading', 'string', '—', 'Optional heading above the ticker (e.g. "Trusted by")'],
                ['speed', "'slow' | 'normal' | 'fast'", 'normal', 'Scroll animation speed'],
                ['direction', "'left' | 'right'", 'left', 'Scroll direction'],
                ['pauseOnHover', 'boolean', 'true', 'Pause the animation when the user hovers over the track'],
                ['background', 'ReactNode', '—', 'Optional background component'],
                ['className', 'string', '—', 'Additional Tailwind classes'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="bg-[hsl(var(--background))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{def}</td>
                  <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
