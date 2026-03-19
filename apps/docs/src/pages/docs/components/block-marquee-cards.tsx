import { MarqueeCards } from '@archui/react';
import type { MarqueeCard } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const topRow: MarqueeCard[] = [
  { title: 'Lightning Fast', description: 'Sub-100ms response times at any scale.' },
  { title: 'Type-Safe APIs', description: 'End-to-end TypeScript from schema to UI.' },
  { title: 'Edge Native', description: 'Deployed to 200+ edge locations globally.' },
  { title: 'Zero Config', description: 'Sensible defaults that just work out of the box.' },
  { title: 'Accessible', description: 'WCAG 2.2 AA compliant out of the box.' },
];

const bottomRow: MarqueeCard[] = [
  { title: 'Dark Mode', description: 'First-class dark and light theme support.' },
  { title: 'Open Source', description: 'MIT licensed — use it anywhere.' },
  { title: 'Tree Shakeable', description: 'Only ship the code your app actually uses.' },
  { title: 'SSR Ready', description: 'Works seamlessly with Next.js and Nuxt.' },
  { title: 'Composable', description: 'Mix and match blocks to build any layout.' },
];

export function BlockMarqueeCardsDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="marquee-cards" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Marquee Cards
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A dual-row infinite scroll marquee. The top row scrolls left and the bottom row scrolls right, creating a dynamic feature showcase with edge-fade masks and optional hover-to-pause.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`import { MarqueeCards } from '@archui/react';

const topRow = [
  { title: 'Lightning Fast', description: 'Sub-100ms response times.' },
  { title: 'Type-Safe APIs', description: 'End-to-end TypeScript.' },
  // ...more cards
];

const bottomRow = [
  { title: 'Dark Mode', description: 'First-class theme support.' },
  // ...more cards
];

<MarqueeCards topRow={topRow} bottomRow={bottomRow} speed="normal" pauseOnHover />`}
          vueCode={`<script setup lang="ts">
import { MarqueeCards } from '@archui/vue';

const cards = [
  { title: 'Lightning Fast', description: 'Sub-100ms response times.' },
  { title: 'Type-Safe APIs', description: 'Full TypeScript support.' },
  // ...more cards
];
</script>

<template>
  <MarqueeCards :cards="cards" speed="40" :pause-on-hover="true" />
</template>`}
        >
          <MarqueeCards topRow={topRow} bottomRow={bottomRow} speed="normal" pauseOnHover />
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock
          code={`npm install @archui/react
# or
pnpm add @archui/react`}
          vueCode={`npm install @archui/vue
# or
pnpm add @archui/vue`}
        />
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Usage
        </h2>
        <CodeBlock
          code={`import { MarqueeCards } from '@archui/react';
import type { MarqueeCard } from '@archui/react';

const topRow: MarqueeCard[] = [
  { title: 'Feature One', description: 'Description of the feature.' },
  { title: 'Feature Two', description: 'Another great capability.' },
  { title: 'Feature Three', description: 'Something else noteworthy.' },
];

const bottomRow: MarqueeCard[] = [
  { title: 'Benefit A', description: 'Why users love this.' },
  { title: 'Benefit B', description: 'Another key benefit.' },
];

export default function Page() {
  return (
    <MarqueeCards
      topRow={topRow}
      bottomRow={bottomRow}
      speed="normal"
      pauseOnHover
    />
  );
}`}
          vueCode={`<script setup lang="ts">
import { MarqueeCards } from '@archui/vue';

const cards = [
  { title: 'Feature One', description: 'Description of the feature.' },
  { title: 'Feature Two', description: 'Another great capability.' },
  { title: 'Feature Three', description: 'Something else noteworthy.' },
];
</script>

<template>
  <MarqueeCards
    :cards="cards"
    :speed="40"
    :pause-on-hover="true"
  />
</template>`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
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
                ['topRow', 'MarqueeCard[]', '—', 'Cards for the top row (scrolls left)'],
                ['bottomRow', 'MarqueeCard[]', '—', 'Cards for the bottom row (scrolls right). Defaults to topRow if omitted.'],
                ['speed', '"slow" | "normal" | "fast"', '"normal"', 'Scroll animation speed'],
                ['pauseOnHover', 'boolean', 'false', 'Pause scrolling when the user hovers'],
                ['className', 'string', '—', 'Additional CSS classes'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="text-[hsl(var(--muted-foreground))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs">{type}</td>
                  <td className="px-4 py-3 font-mono text-xs">{def}</td>
                  <td className="px-4 py-3 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">MarqueeCard</h3>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['title', 'string', 'Card heading'],
                ['description', 'string', 'Supporting text'],
                ['image', 'string', 'Cover image URL'],
                ['icon', 'ReactNode', 'Icon element rendered above the title'],
                ['href', 'string', 'Makes the card a link when provided'],
              ].map(([prop, type, desc]) => (
                <tr key={prop} className="text-[hsl(var(--muted-foreground))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs">{type}</td>
                  <td className="px-4 py-3 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
