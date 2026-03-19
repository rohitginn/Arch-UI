import {
  HeroCentered,
  HeroSplit,
  HeroMinimal,
  HeroTerminal,
} from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Shared sample data                                                   */
/* ------------------------------------------------------------------ */

const primaryCta = { label: 'Get started free', href: '#' };
const secondaryCta = { label: 'View docs →', href: '#' };
const sampleImage = {
  src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
  alt: 'Product screenshot',
};

const terminalLines = [
  { text: 'npx archui init my-app' },
  { text: '✓ Creating project structure…', isOutput: true },
  { text: '✓ Installing dependencies…', isOutput: true },
  { text: '✓ Done! Run cd my-app && pnpm dev', isOutput: true },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function BlockHeroSectionsDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 id="hero-sections" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Hero Sections
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Five ready-to-use hero variants — centered, split, minimal, terminal, and video — each supporting dark and light themes via CSS tokens.
        </p>
      </div>

      {/* ── HeroCentered ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="hero-centered" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          HeroCentered
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          Full-width centered headline with optional badge, subheading, and dual CTAs. Accepts a background slot.
        </p>
        <ComponentPreview
          code={`import { HeroCentered } from '@archui/react';

<HeroCentered
  badge="Now in public beta"
  heading="Build beautiful interfaces, faster."
  subheading="A component library rooted in material neutrals and precision craft."
  primaryCta={{ label: 'Get started free', href: '/signup' }}
  secondaryCta={{ label: 'View docs →', href: '/docs' }}
/>`}
        >
          <HeroCentered
            badge="Now in public beta"
            heading="Build beautiful interfaces, faster."
            subheading="A component library rooted in material neutrals and precision craft."
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
          />
        </ComponentPreview>
      </section>

      {/* ── HeroSplit ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="hero-split" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          HeroSplit
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          Two-column layout — copy on the left, a floating product image on the right. Use <code className="rounded bg-[hsl(var(--muted))] px-1 py-0.5 text-xs">reversed</code> to flip the order.
        </p>
        <ComponentPreview
          code={`import { HeroSplit } from '@archui/react';

<HeroSplit
  badge="New release"
  heading="Orchestrate your workflow with confidence."
  subheading="Visual building blocks that snap together with zero friction."
  primaryCta={{ label: 'Start building', href: '/signup' }}
  secondaryCta={{ label: 'See a demo →', href: '/demo' }}
  image={{ src: '/screenshot.png', alt: 'App screenshot' }}
/>`}
        >
          <HeroSplit
            badge="New release"
            heading="Orchestrate your workflow with confidence."
            subheading="Visual building blocks that snap together with zero friction."
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            image={sampleImage}
          />
        </ComponentPreview>

        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Reversed</h3>
        <ComponentPreview
          code={`<HeroSplit
  heading="Ship products your users love."
  subheading="Glassmorphic components with dark and light theme support."
  primaryCta={{ label: 'Get started', href: '/signup' }}
  image={{ src: '/screenshot.png', alt: 'App screenshot' }}
  reversed
/>`}
        >
          <HeroSplit
            heading="Ship products your users love."
            subheading="Glassmorphic components with dark and light theme support."
            primaryCta={primaryCta}
            image={sampleImage}
            reversed
          />
        </ComponentPreview>
      </section>

      {/* ── HeroMinimal ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="hero-minimal" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          HeroMinimal
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          Maximum whitespace, typography-first. No media — just a headline, subheading, and a single CTA. Ideal for editorial and agency sites.
        </p>
        <ComponentPreview
          code={`import { HeroMinimal } from '@archui/react';

<HeroMinimal
  heading="Craft is the product."
  subheading="We build digital experiences that stand out."
  cta={{ label: 'Start a project', href: '/contact' }}
/>`}
        >
          <HeroMinimal
            heading="Craft is the product."
            subheading="We build digital experiences for teams that care about quality."
            cta={primaryCta}
          />
        </ComponentPreview>
      </section>

      {/* ── HeroTerminal ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="hero-terminal" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          HeroTerminal
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          Developer-facing hero with an animated code block that types out a CLI command sequence. Perfect for API products and dev tools.
        </p>
        <ComponentPreview
          code={`import { HeroTerminal } from '@archui/react';

<HeroTerminal
  heading="From idea to production in minutes."
  subheading="One command to scaffold a production-ready component library."
  primaryCta={{ label: 'Get started', href: '/docs' }}
  lines={[
    { text: 'npx archui init my-app' },
    { text: '✓ Creating project structure…', isOutput: true },
    { text: '✓ Installing dependencies…', isOutput: true },
    { text: '✓ Done! Run cd my-app && pnpm dev', isOutput: true },
  ]}
/>`}
        >
          <HeroTerminal
            heading="From idea to production in minutes."
            subheading="One command to scaffold a production-ready component library."
            primaryCta={primaryCta}
            lines={terminalLines}
          />
        </ComponentPreview>
      </section>

      {/* ── Installation ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock
          code={`npm install @archui/react
# or
pnpm add @archui/react`}
        />
      </section>

      {/* ── Props tables ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props — HeroCentered / HeroSplit
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
                ['badge', 'string', '—', 'Small pill above the headline'],
                ['heading', 'string', '—', 'Main hero headline (required)'],
                ['subheading', 'string', '—', 'Supporting paragraph beneath the headline'],
                ['primaryCta', "{ label: string; href: string }", '—', 'Primary call-to-action (required)'],
                ['secondaryCta', "{ label: string; href: string }", '—', 'Secondary call-to-action'],
                ['image', '{ src: string; alt: string }', '—', 'Product screenshot (HeroSplit only)'],
                ['imageRotation', 'number', '3', 'Image tilt in degrees (HeroSplit only)'],
                ['reversed', 'boolean', 'false', 'Flip copy / image column order (HeroSplit only)'],
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

      <section className="space-y-4">
        <h2 id="props-terminal" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props — HeroTerminal
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
                ['heading', 'string', '—', 'Main hero headline'],
                ['subheading', 'string', '—', 'Supporting paragraph'],
                ['primaryCta', "{ label: string; href: string }", '—', 'Primary CTA link/button (required)'],
                ['lines', "TerminalLine[]", '[]', 'Lines to animate in the code block'],
                ['typingSpeed', 'number', '40', 'Typing speed in ms per character'],
                ['terminalTitle', 'string', 'Terminal', 'Title shown in the terminal window'],
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
