import { GlassBadge } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { Check, AlertCircle, Star, Zap } from 'lucide-react';

export function GlassBadgeDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-badge" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Badge
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A badge component for status indicators, labels, and counts with dot animations and various styles.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassBadge>Default</GlassBadge>
<GlassBadge variant="primary">Primary</GlassBadge>
<GlassBadge variant="success">Success</GlassBadge>`}
          vueCode={`<template>
  <GlassBadge>Default</GlassBadge>
  <GlassBadge variant="primary">Primary</GlassBadge>
  <GlassBadge variant="success">Success</GlassBadge>
</template>`}
        >
          <div className="flex flex-wrap gap-3">
            <GlassBadge>Default</GlassBadge>
            <GlassBadge variant="primary">Primary</GlassBadge>
            <GlassBadge variant="success">Success</GlassBadge>
          </div>
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
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
      </div>

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassBadge } from '@archui/react';

export default function Example() {
  return (
    <div className="flex gap-2">
      <GlassBadge variant="success">Active</GlassBadge>
      <GlassBadge variant="warning">Pending</GlassBadge>
      <GlassBadge variant="error">Failed</GlassBadge>
    </div>
  );
}`}
          vueCode={`<script setup>
import { GlassBadge } from '@archui/vue';
</script>

<template>
  <div class="flex gap-2">
    <GlassBadge variant="success">Active</GlassBadge>
    <GlassBadge variant="warning">Pending</GlassBadge>
    <GlassBadge variant="error">Failed</GlassBadge>
  </div>
</template>`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassBadge variant="default">Default</GlassBadge>
<GlassBadge variant="primary">Primary</GlassBadge>
<GlassBadge variant="success">Success</GlassBadge>
<GlassBadge variant="warning">Warning</GlassBadge>
<GlassBadge variant="error">Error</GlassBadge>
<GlassBadge variant="outline">Outline</GlassBadge>
<GlassBadge variant="glass">Glass</GlassBadge>`}
          vueCode={`<GlassBadge variant="default">Default</GlassBadge>
<GlassBadge variant="primary">Primary</GlassBadge>
<GlassBadge variant="success">Success</GlassBadge>
<GlassBadge variant="warning">Warning</GlassBadge>
<GlassBadge variant="error">Error</GlassBadge>
<GlassBadge variant="outline">Outline</GlassBadge>
<GlassBadge variant="glass">Glass</GlassBadge>`}
        >
          <div className="flex flex-wrap gap-3">
            <GlassBadge variant="default">Default</GlassBadge>
            <GlassBadge variant="primary">Primary</GlassBadge>
            <GlassBadge variant="success">Success</GlassBadge>
            <GlassBadge variant="warning">Warning</GlassBadge>
            <GlassBadge variant="error">Error</GlassBadge>
            <GlassBadge variant="outline">Outline</GlassBadge>
            <GlassBadge variant="glass">Glass</GlassBadge>
          </div>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassBadge size="sm">Small</GlassBadge>
<GlassBadge size="md">Medium</GlassBadge>
<GlassBadge size="lg">Large</GlassBadge>`}
          vueCode={`<GlassBadge size="sm">Small</GlassBadge>
<GlassBadge size="md">Medium</GlassBadge>
<GlassBadge size="lg">Large</GlassBadge>`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <GlassBadge size="sm" variant="primary">Small</GlassBadge>
            <GlassBadge size="md" variant="primary">Medium</GlassBadge>
            <GlassBadge size="lg" variant="primary">Large</GlassBadge>
          </div>
        </ComponentPreview>
      </div>

      {/* With Dot */}
      <div className="space-y-4">
        <h2 id="with-dot" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Dot Indicator
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Add a colored dot indicator for status representation. Enable pulse animation for live status.
        </p>
        <ComponentPreview 
          code={`<GlassBadge dot dotColor="success">Online</GlassBadge>
<GlassBadge dot dotColor="warning">Away</GlassBadge>
<GlassBadge dot dotColor="error">Offline</GlassBadge>
<GlassBadge dot dotColor="success" pulse>Live</GlassBadge>`}
          vueCode={`<GlassBadge dot dot-color="success">Online</GlassBadge>
<GlassBadge dot dot-color="warning">Away</GlassBadge>
<GlassBadge dot dot-color="error">Offline</GlassBadge>
<GlassBadge dot dot-color="success" pulse>Live</GlassBadge>`}
        >
          <div className="flex flex-wrap gap-3">
            <GlassBadge dot dotColor="success">Online</GlassBadge>
            <GlassBadge dot dotColor="warning">Away</GlassBadge>
            <GlassBadge dot dotColor="error">Offline</GlassBadge>
            <GlassBadge dot dotColor="success" pulse>Live</GlassBadge>
          </div>
        </ComponentPreview>
      </div>

      {/* With Icon */}
      <div className="space-y-4">
        <h2 id="with-icon" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Icon
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Add icons for additional context and visual interest.
        </p>
        <ComponentPreview 
          code={`import { Check, AlertCircle, Star, Zap } from 'lucide-react';

<GlassBadge variant="success" icon={<Check className="h-3 w-3" />}>
  Verified
</GlassBadge>
<GlassBadge variant="warning" icon={<AlertCircle className="h-3 w-3" />}>
  Warning
</GlassBadge>
<GlassBadge variant="primary" icon={<Star className="h-3 w-3" />}>
  Featured
</GlassBadge>
<GlassBadge variant="glass" icon={<Zap className="h-3 w-3" />}>
  Pro
</GlassBadge>`}
          vueCode={`<script setup>
import { Check, AlertCircle, Star, Zap } from 'lucide-vue-next';
</script>

<template>
  <GlassBadge variant="success">
    <template #icon><Check class="h-3 w-3" /></template>
    Verified
  </GlassBadge>
</template>`}
        >
          <div className="flex flex-wrap gap-3">
            <GlassBadge variant="success" icon={<Check className="h-3 w-3" />}>Verified</GlassBadge>
            <GlassBadge variant="warning" icon={<AlertCircle className="h-3 w-3" />}>Warning</GlassBadge>
            <GlassBadge variant="primary" icon={<Star className="h-3 w-3" />}>Featured</GlassBadge>
            <GlassBadge variant="glass" icon={<Zap className="h-3 w-3" />}>Pro</GlassBadge>
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Default</th>
                <th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>variant</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "primary" | "success" | "warning" | "error" | "outline" | "glass"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Badge color variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Badge size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>dot</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Show a dot indicator</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>dotColor</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "primary" | "success" | "warning" | "error"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Dot indicator color</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>pulse</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Enable pulse animation on dot</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>icon</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">ReactNode</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Icon element to display</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))]">
          <li>Uses <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">&lt;span&gt;</code> element - purely presentational</li>
          <li>For interactive badges, wrap in a button or link</li>
          <li>Color is not the only indicator - always include text</li>
          <li>Pulse animation respects <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">prefers-reduced-motion</code></li>
        </ul>
      </div>
    </div>
  );
}
