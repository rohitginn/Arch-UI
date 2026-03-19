import { GlassButton } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { PropsTable } from '../../../components/props-table';

export function GlassButtonDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-button" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Button
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A button component with glassmorphic styling and multiple variants.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassButton variant="default">Default</GlassButton>
<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>`}
          vueCode={`<GlassButton variant="default">Default</GlassButton>
<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>`}
        >
          <div className="flex items-center gap-4">
            <GlassButton variant="default">Default</GlassButton>
            <GlassButton variant="primary">Primary</GlassButton>
            <GlassButton variant="ghost">Ghost</GlassButton>
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
          code={`import { GlassButton } from '@archui/react';

export default function Example() {
  return (
    <GlassButton variant="primary">
      Click me
    </GlassButton>
  );
}`}
          vueCode={`<script setup>
import { GlassButton } from '@archui/vue';
</script>

<template>
  <GlassButton variant="primary">
    Click me
  </GlassButton>
</template>`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassButton variant="default">Default</GlassButton>
<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="secondary">Secondary</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="primary" glow>Glow</GlassButton>`}
          vueCode={`<GlassButton variant="default">Default</GlassButton>
<GlassButton variant="primary">Primary</GlassButton>
<GlassButton variant="secondary">Secondary</GlassButton>
<GlassButton variant="ghost">Ghost</GlassButton>
<GlassButton variant="outline">Outline</GlassButton>
<GlassButton variant="primary" glow>Glow</GlassButton>`}
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <GlassButton variant="default">Default</GlassButton>
            <GlassButton variant="primary">Primary</GlassButton>
            <GlassButton variant="secondary">Secondary</GlassButton>
            <GlassButton variant="ghost">Ghost</GlassButton>
            <GlassButton variant="outline">Outline</GlassButton>
            <GlassButton variant="primary" glow>Glow</GlassButton>
          </div>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassButton size="sm">Small</GlassButton>
<GlassButton size="md">Medium</GlassButton>
<GlassButton size="lg">Large</GlassButton>`}
          vueCode={`<GlassButton size="sm">Small</GlassButton>
<GlassButton size="md">Medium</GlassButton>
<GlassButton size="lg">Large</GlassButton>`}
        >
          <div className="flex items-center gap-4">
            <GlassButton size="sm">Small</GlassButton>
            <GlassButton size="md">Medium</GlassButton>
            <GlassButton size="lg">Large</GlassButton>
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
            type: '"default" | "primary" | "secondary" | "ghost" | "gradient" | "outline"',
            default: '"default"',
            description: 'Visual style variant controlling color, background and border treatments.',
          },
          {
            prop: 'size',
            type: '"sm" | "md" | "lg" | "icon"',
            default: '"md"',
            description: 'Controls padding and font size. Use "icon" for square icon-only buttons.',
          },
          {
            prop: 'glow',
            type: 'boolean',
            default: 'false',
            description: 'Adds a coloured glow shadow beneath the button on hover.',
          },
          {
            prop: 'loading',
            type: 'boolean',
            default: 'false',
            description: 'Replaces label with a spinner and disables interaction.',
          },
          {
            prop: 'disabled',
            type: 'boolean',
            default: 'false',
            description: 'Disables the button and reduces opacity.',
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
            description: 'Button label or icon content.',
            required: true,
          },
        ]}
      />
    </div>
  );
}
