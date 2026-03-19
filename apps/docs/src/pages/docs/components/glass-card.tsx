import { GlassCard } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { PropsTable } from '../../../components/props-table';

export function GlassCardDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-card" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Card
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A beautiful card component with frosted glass effect and backdrop blur.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`<GlassCard className="max-w-sm p-6">
  <h3 className="text-lg font-semibold text-foreground">Glass Card</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    This is a glassmorphic card with backdrop blur and subtle transparency.
  </p>
</GlassCard>`}
          vueCode={`<GlassCard class="max-w-sm p-6">
  <h3 class="text-lg font-semibold text-foreground">Glass Card</h3>
  <p class="mt-2 text-sm text-muted-foreground">
    This is a glassmorphic card with backdrop blur and subtle transparency.
  </p>
</GlassCard>`}
        >
          <GlassCard className="max-w-sm p-6">
            <h3 className="text-lg font-semibold text-foreground">Glass Card</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This is a glassmorphic card with backdrop blur and subtle transparency.
            </p>
          </GlassCard>
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
          code={`import { GlassCard } from '@archui/react';

export default function Example() {
  return (
    <GlassCard>
      <h3>Card Title</h3>
      <p>Card content goes here.</p>
    </GlassCard>
  );
}`}
          vueCode={`<script setup>
import { GlassCard } from '@archui/vue';
</script>

<template>
  <GlassCard>
    <h3>Card Title</h3>
    <p>Card content goes here.</p>
  </GlassCard>
</template>`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview
          code={`<GlassCard variant="default">Default</GlassCard>
<GlassCard variant="glow">Glow</GlassCard>
<GlassCard variant="gradient">Gradient</GlassCard>`}
          vueCode={`<GlassCard variant="default">Default</GlassCard>
<GlassCard variant="glow">Glow</GlassCard>
<GlassCard variant="gradient">Gradient</GlassCard>`}
        >
          <div className="flex flex-wrap gap-4">
            <GlassCard variant="default" className="p-4">
              <p className="text-foreground">Default</p>
            </GlassCard>
            <GlassCard variant="glow" className="p-4">
              <p className="text-foreground">Glow</p>
            </GlassCard>
            <GlassCard variant="gradient" className="p-4">
              <p className="text-foreground">Gradient</p>
            </GlassCard>
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <PropsTable
        title="Props"
        id="props"
        rows={[
          {
            prop: 'variant',
            type: '"default" | "gradient" | "glow" | "elevated"',
            default: '"default"',
            description: 'The visual style of the card.',
          },
          {
            prop: 'blur',
            type: '"none" | "sm" | "md" | "lg" | "xl"',
            default: '"md"',
            description: 'Backdrop blur intensity applied behind the card.',
          },
          {
            prop: 'animated',
            type: 'boolean',
            default: 'false',
            description: 'Enable scale + shadow hover animation.',
          },
          {
            prop: 'shine',
            type: 'boolean',
            default: 'false',
            description: 'Add a moving shine highlight on hover.',
          },
          {
            prop: 'className',
            type: 'string',
            default: '—',
            description: 'Additional Tailwind classes merged onto the root element.',
          },
          {
            prop: 'children',
            type: 'ReactNode',
            description: 'Card content.',
            required: true,
          },
        ]}
      />
    </div>
  );
}
