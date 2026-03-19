import { DesignToolTemplate } from '@archui/react';
import { CodeBlock } from '../../../components/component-preview';

export function DesignToolDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1
          id="design-tool"
          className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]"
        >
          Design Tool / Creative SaaS
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A full-page collaborative design tool website template inspired by
          "Canvas" — featuring a Slate + Amber palette, infinite dot-grid hero
          with animated cursors, real-time collaboration showcase, bento-grid
          feature cards, AI component generation demos with typewriter effect,
          filterable template gallery, social proof stats, and a three-tier
          pricing section. Supports light and dark themes out of the box.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300">
            React
          </span>
          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Vue
          </span>
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Light &amp; Dark
          </span>
        </div>
      </div>

      {/* Live Preview */}
      <section className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Preview
        </h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Full interactive preview — toggle between light/dark mode, try the AI
          demos, filter templates, and switch pricing plans.
        </p>
        <div className="relative w-full overflow-hidden rounded-xl border border-[hsl(var(--border))] shadow-sm">
          <div className="h-[700px] w-full overflow-y-auto">
            <DesignToolTemplate />
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Installation
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Install the package via your preferred package manager:
        </p>
        <CodeBlock
          code={`npm install @archui/react
# or
pnpm add @archui/react`}
          vueCode={`npm install @archui/vue
# or
pnpm add @archui/vue`}
        />
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Usage
        </h2>
        <CodeBlock
          code={`import { DesignToolTemplate } from '@archui/react';

export default function DesignToolPage() {
  return <DesignToolTemplate />;
}`}
          vueCode={`<script setup lang="ts">
import { DesignToolTemplate } from '@archui/vue';
</script>

<template>
  <DesignToolTemplate />
</template>`}
        />
      </section>

      {/* Included Sections */}
      <section className="space-y-4">
        <h2
          id="sections"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Included Sections
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              title: 'Sticky Navbar',
              desc: 'Scroll-aware blur backdrop with GitHub stars badge and mobile menu.',
            },
            {
              title: 'Hero',
              desc: 'Infinite dot-grid background, product mockup browser frame, live collaboration cursors with CSS bezier animations, and feature callout badges.',
            },
            {
              title: 'Collaboration Showcase',
              desc: 'Browser frame with interactive comment thread, animated cursors, and live editing demo.',
            },
            {
              title: 'Features Bento Grid',
              desc: 'Seven feature cards with variable grid spans, interactive demo zones for collaboration and AI cards.',
            },
            {
              title: 'AI Features (Dark)',
              desc: 'Three AI capability cards with typewriter prompt animation and result reveal on click.',
            },
            {
              title: 'Templates Gallery',
              desc: 'Filterable grid with 6 categories and 12 preview templates. Hover-to-reveal "Open in Canvas" overlay.',
            },
            {
              title: 'Social Proof',
              desc: 'Four stat counters and four testimonial cards with avatars and star ratings.',
            },
            {
              title: 'Pricing',
              desc: 'Three tiers (Free / Pro / Organization) with monthly/annual toggle and highlighted popular plan.',
            },
            {
              title: 'CTA Section',
              desc: 'Dark section with dual CTAs — "Start designing free" and "Schedule a demo".',
            },
            {
              title: 'Footer',
              desc: 'Five-column footer with GitHub stars badge, four link groups, and legal links.',
            },
          ].map((s) => (
            <div
              key={s.title}
              className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4"
            >
              <h3 className="font-semibold text-[hsl(var(--foreground))]">{s.title}</h3>
              <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Tokens */}
      <section className="space-y-4">
        <h2
          id="design-tokens"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Design Tokens
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-2 pr-4 text-left font-medium text-[hsl(var(--foreground))]">Token</th>
                <th className="py-2 pr-4 text-left font-medium text-[hsl(var(--foreground))]">Light</th>
                <th className="py-2 text-left font-medium text-[hsl(var(--foreground))]">Dark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['Background', 'white', 'zinc-950'],
                ['Surface', 'zinc-50', 'zinc-900'],
                ['Border', 'zinc-200', 'zinc-800'],
                ['Accent', 'slate-700', 'slate-300'],
                ['Heading Font', 'Geist / Inter, weight 800', 'Geist / Inter, weight 800'],
                ['Body Font', 'Inter, weight 400', 'Inter, weight 400'],
                ['Code Font', 'Geist Mono', 'Geist Mono'],
                ['Collaboration', '#60a5fa (blue)', '#60a5fa (blue)'],
                ['Design/Creativity', '#fb7185 (rose)', '#fb7185 (rose)'],
                ['Code', '#34d399 (emerald)', '#34d399 (emerald)'],
                ['AI', 'amber-400', 'amber-400'],
              ].map(([token, light, dark]) => (
                <tr key={token}>
                  <td className="py-2 pr-4 font-mono text-xs text-[hsl(var(--foreground))]">{token}</td>
                  <td className="py-2 pr-4 text-[hsl(var(--muted-foreground))]">{light}</td>
                  <td className="py-2 text-[hsl(var(--muted-foreground))]">{dark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Customization */}
      <section className="space-y-4">
        <h2
          id="customization"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Customization
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Pass a custom <code className="rounded bg-[hsl(var(--muted))] px-1 py-0.5 text-sm">className</code> prop to override the root container styles:
        </p>
        <CodeBlock
          code={`<DesignToolTemplate className="font-sans" />`}
          vueCode={`<DesignToolTemplate class="font-sans" />`}
        />
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          The template uses Tailwind CSS utility classes throughout. You can
          override any section by forking the component and adjusting colors,
          spacing, or layout. Feature accent colors (blue for collaboration,
          rose for design, emerald for code, amber for AI) are hardcoded and
          can be swapped directly in the source.
        </p>
      </section>
    </div>
  );
}
