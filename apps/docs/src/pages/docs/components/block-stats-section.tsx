import { StatsSection } from '@archui/react';
import type { StatItem } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const stats: StatItem[] = [
  { value: 12000, label: 'Developers', suffix: '+' },
  { value: 98, label: 'Uptime', suffix: '%', decimals: 1 },
  { value: 4.9, label: 'Avg. Rating', decimals: 1 },
  { value: 200, label: 'Edge Locations', suffix: '+' },
];

export function BlockStatsSectionDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="stats-section" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Stats Section
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A grid of metric cards with an optional count-up animation triggered on scroll. Supports prefix/suffix formatting and decimal places.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`import { StatsSection } from '@archui/react';

const stats = [
  { value: 12000, label: 'Developers', suffix: '+' },
  { value: 98, label: 'Uptime', suffix: '%', decimals: 1 },
  { value: 4.9, label: 'Avg. Rating', decimals: 1 },
  { value: 200, label: 'Edge Locations', suffix: '+' },
];

<StatsSection
  heading="Trusted at scale"
  subheading="Numbers that reflect the impact of what we build."
  stats={stats}
  animated
/>`}
          vueCode={`<script setup lang="ts">
import { StatsSection } from '@archui/vue';

const stats = [
  { value: 12000, label: 'Developers', suffix: '+' },
  { value: 98, label: 'Uptime', suffix: '%', decimals: 1 },
];
</script>

<template>
  <StatsSection
    heading="Trusted at scale"
    :stats="stats"
    :animated="true"
  />
</template>`}
        >
          <StatsSection
            heading="Trusted at scale"
            subheading="Numbers that reflect the impact of what we build."
            stats={stats}
            animated
          />
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
          code={`import { StatsSection } from '@archui/react';
import type { StatItem } from '@archui/react';

const stats: StatItem[] = [
  { value: 1500, label: 'Customers', suffix: '+' },
  { value: 99.9, label: 'Uptime SLA', suffix: '%', decimals: 1 },
  { value: 50, label: 'Countries', suffix: '+' },
  { value: 2, label: 'Average Response', prefix: '<', suffix: 'ms' },
];

export default function Page() {
  return (
    <StatsSection
      heading="Built for scale"
      stats={stats}
      animated
    />
  );
}`}
          vueCode={`<script setup lang="ts">
import { StatsSection } from '@archui/vue';

const stats = [
  { value: 1500, label: 'Customers', suffix: '+' },
  { value: 99.9, label: 'Uptime', suffix: '%', decimals: 1 },
];
</script>

<template>
  <StatsSection
    heading="Built for scale"
    :stats="stats"
    :animated="true"
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
                ['stats', 'StatItem[]', '—', 'Array of metric objects (required, 3-4 recommended)'],
                ['heading', 'string', '—', 'Section heading'],
                ['subheading', 'string', '—', 'Section subheading'],
                ['animated', 'boolean', 'false', 'Enable count-up animation on scroll-reveal'],
                ['background', 'ReactNode', '—', 'Background element'],
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

        <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">StatItem</h3>
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
                ['value', 'number | string', 'Numeric target for count-up, or a static string'],
                ['label', 'string', 'Label displayed below the number'],
                ['prefix', 'string', 'Prefix before the number (e.g. "$", "<")'],
                ['suffix', 'string', 'Suffix after the number (e.g. "+", "%", "K")'],
                ['decimals', 'number', 'Decimal places for count-up (default 0)'],
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
