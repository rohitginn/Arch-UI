import { GlassInput } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassInputDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-input" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Input
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A text input component with glassmorphic styling and smooth focus transitions.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassInput placeholder="Enter your email" />`}
          vueCode={`<GlassInput placeholder="Enter your email" />`}
        >
          <div className="w-full max-w-sm">
            <GlassInput placeholder="Enter your email" />
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
          code={`import { GlassInput } from '@archui/react';

export default function Example() {
  return (
    <GlassInput
      type="email"
      placeholder="Enter your email"
      label="Email"
    />
  );
}`}
          vueCode={`<script setup>
import { GlassInput } from '@archui/vue';
</script>

<template>
  <GlassInput
    type="email"
    placeholder="Enter your email"
    label="Email"
  />
</template>`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassInput variant="default" placeholder="Default" />
<GlassInput variant="filled" placeholder="Filled" />
<GlassInput variant="outline" placeholder="Outline" />
<GlassInput variant="glow" placeholder="Glow" />`}
          vueCode={`<GlassInput variant="default" placeholder="Default" />
<GlassInput variant="filled" placeholder="Filled" />
<GlassInput variant="outline" placeholder="Outline" />
<GlassInput variant="glow" placeholder="Glow" />`}
        >
          <div className="w-full max-w-sm space-y-4">
            <GlassInput variant="default" placeholder="Default" />
            <GlassInput variant="filled" placeholder="Filled" />
            <GlassInput variant="outline" placeholder="Outline" />
            <GlassInput variant="glow" placeholder="Glow" />
          </div>
        </ComponentPreview>
      </div>

      {/* With Label and Helper Text */}
      <div className="space-y-4">
        <h2 id="with-label" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Label and Helper Text
        </h2>
        <ComponentPreview 
          code={`<GlassInput
  label="Email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>`}
          vueCode={`<GlassInput
  label="Email"
  placeholder="Enter your email"
  helper-text="We'll never share your email"
/>`}
        >
          <div className="w-full max-w-sm">
            <GlassInput
              label="Email"
              placeholder="Enter your email"
              helperText="We'll never share your email"
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Error State */}
      <div className="space-y-4">
        <h2 id="error-state" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Error State
        </h2>
        <ComponentPreview 
          code={`<GlassInput
  label="Email"
  placeholder="Enter your email"
  error="Please enter a valid email"
/>`}
          vueCode={`<GlassInput
  label="Email"
  placeholder="Enter your email"
  error="Please enter a valid email"
/>`}
        >
          <div className="w-full max-w-sm">
            <GlassInput
              label="Email"
              placeholder="Enter your email"
              error="Please enter a valid email"
            />
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
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "bordered" | "ghost" | "gradient"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Visual style variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Input size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>label</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Input label</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>helperText</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Helper text below input</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>isError</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Show error state</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>errorText</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Error message</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
