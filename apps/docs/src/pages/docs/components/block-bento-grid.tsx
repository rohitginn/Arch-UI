import { BentoGrid } from '@archui/react';
import type { BentoGridItem } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { LayoutGrid, Zap, Shield, Globe, Code2, BarChart3 } from 'lucide-react';

const sampleItems: BentoGridItem[] = [
  {
    title: 'Flexible Grid',
    description: 'Build asymmetric layouts using simple span configuration.',
    icon: <LayoutGrid className="h-5 w-5" />,
    span: { cols: 2, rows: 1 },
  },
  {
    title: 'Blazing Fast',
    description: 'Zero runtime overhead with pure CSS grid.',
    icon: <Zap className="h-5 w-5" />,
  },
  {
    title: 'Secure by Default',
    description: 'Built with accessibility and security best practices.',
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: 'Global CDN',
    description: 'Distributed across 200+ edge locations worldwide.',
    icon: <Globe className="h-5 w-5" />,
    span: { cols: 1, rows: 2 },
  },
  {
    title: 'Developer Experience',
    description: 'TypeScript-first API with full IntelliSense support.',
    icon: <Code2 className="h-5 w-5" />,
  },
  {
    title: 'Analytics',
    description: 'Real-time insights into performance and usage.',
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

export function BlockBentoGridDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="bento-grid" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Bento Grid
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A responsive masonry-style feature grid with scroll-reveal stagger and shimmer hover effects. Cards support variable column and row spans.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`import { BentoGrid } from '@archui/react';

const items = [
  { title: 'Flexible Grid', description: '...', span: { cols: 2, rows: 1 } },
  { title: 'Blazing Fast', description: '...' },
  { title: 'Secure by Default', description: '...' },
];

<BentoGrid items={items} columns={3} />`}
          vueCode={`<script setup lang="ts">
import { BentoGrid } from '@archui/vue';

const items = [
  { title: 'Flexible Grid', description: '...', colSpan: 2 },
  { title: 'Blazing Fast', description: '...' },
];
</script>

<template>
  <BentoGrid :items="items" :columns="3" />
</template>`}
        >
          <BentoGrid items={sampleItems} columns={3} />
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
          code={`import { BentoGrid } from '@archui/react';
import type { BentoGridItem } from '@archui/react';

const items: BentoGridItem[] = [
  {
    title: 'Feature One',
    description: 'A short description of this feature.',
    icon: <MyIcon />,
    span: { cols: 2, rows: 1 }, // spans 2 columns
  },
  {
    title: 'Feature Two',
    description: 'Another useful capability.',
    image: '/images/feature-2.jpg',
  },
];

export default function Page() {
  return <BentoGrid items={items} columns={3} gap="md" />;
}`}
          vueCode={`<script setup lang="ts">
import { BentoGrid } from '@archui/vue';

const items = [
  {
    title: 'Feature One',
    description: 'A short description of this feature.',
    colSpan: 2,
  },
  {
    title: 'Feature Two',
    description: 'Another useful capability.',
    image: '/images/feature-2.jpg',
  },
];
</script>

<template>
  <BentoGrid :items="items" :columns="3" gap="md" />
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
                ['items', 'BentoGridItem[]', '—', 'Array of grid card definitions'],
                ['columns', '2 | 3 | 4', '3', 'Number of base columns (responsive)'],
                ['gap', '"sm" | "md" | "lg"', '"md"', 'Gap size between cells'],
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

        <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">BentoGridItem</h3>
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
                ['icon', 'ReactNode', 'Icon rendered in the card header'],
                ['image', 'string', 'Cover image URL (scales on hover)'],
                ['span.cols', '1 | 2', 'Column span (default 1)'],
                ['span.rows', '1 | 2', 'Row span (default 1)'],
                ['children', 'ReactNode', 'Custom content inside the card'],
                ['className', 'string', 'Additional classes for this cell'],
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
