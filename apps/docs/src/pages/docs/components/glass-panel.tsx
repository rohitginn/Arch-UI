import { GlassPanel } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassPanelDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-panel" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Panel
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A versatile container component with glassmorphic styling for content sections.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassPanel className="p-6">
  <h3 className="text-lg font-semibold text-white">Panel Title</h3>
  <p className="mt-2 text-white/60">Panel content goes here...</p>
</GlassPanel>`}
          vueCode={`<GlassPanel class="p-6">
  <h3 class="text-lg font-semibold text-white">Panel Title</h3>
  <p class="mt-2 text-white/60">Panel content goes here...</p>
</GlassPanel>`}
        >
          <GlassPanel className="w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-white">Panel Title</h3>
            <p className="mt-2 text-white/60">Panel content goes here...</p>
          </GlassPanel>
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
          code={`import { GlassPanel } from '@archui/react';

export default function Example() {
  return (
    <GlassPanel>
      <h3>Panel Title</h3>
      <p>Your content goes here...</p>
    </GlassPanel>
  );
}`}
          vueCode={`<script setup>
import { GlassPanel } from '@archui/vue';
</script>

<template>
  <GlassPanel>
    <h3>Panel Title</h3>
    <p>Your content goes here...</p>
  </GlassPanel>
</template>`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassPanel variant="default">Default</GlassPanel>
<GlassPanel variant="elevated">Elevated</GlassPanel>
<GlassPanel variant="outlined">Outlined</GlassPanel>`}
          vueCode={`<GlassPanel variant="default">Default</GlassPanel>
<GlassPanel variant="elevated">Elevated</GlassPanel>
<GlassPanel variant="outlined">Outlined</GlassPanel>`}
        >
          <div className="flex flex-wrap gap-4">
            <GlassPanel variant="default" className="p-4">
              <p className="text-white">Default</p>
            </GlassPanel>
            <GlassPanel variant="elevated" className="p-4">
              <p className="text-white">Elevated</p>
            </GlassPanel>
            <GlassPanel variant="floating" className="p-4">
              <p className="text-white">Floating</p>
            </GlassPanel>
            <GlassPanel variant="subtle" className="p-4">
              <p className="text-white">Subtle</p>
            </GlassPanel>
          </div>
        </ComponentPreview>
      </div>

      {/* Padding */}
      <div className="space-y-4">
        <h2 id="padding" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Padding Options
        </h2>
        <CodeBlock 
          code={`// No padding
<GlassPanel padding="none">...</GlassPanel>

// Small padding
<GlassPanel padding="sm">...</GlassPanel>

// Medium padding (default)
<GlassPanel padding="md">...</GlassPanel>

// Large padding
<GlassPanel padding="lg">...</GlassPanel>`}
          vueCode={`<!-- No padding -->
<GlassPanel padding="none">...</GlassPanel>

<!-- Small padding -->
<GlassPanel padding="sm">...</GlassPanel>

<!-- Medium padding (default) -->
<GlassPanel padding="md">...</GlassPanel>

<!-- Large padding -->
<GlassPanel padding="lg">...</GlassPanel>`}
        />
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
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "elevated" | "outlined" | "ghost"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Panel style variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>padding</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"none" | "sm" | "md" | "lg"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Internal padding size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>blur</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg" | "xl"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Backdrop blur intensity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
