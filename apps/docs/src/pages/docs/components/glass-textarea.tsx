import { GlassTextarea } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassTextareaDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-textarea" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Textarea
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A multi-line text input component with glassmorphic styling.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassTextarea placeholder="Enter your message..." rows={4} />`}
          vueCode={`<GlassTextarea placeholder="Enter your message..." :rows="4" />`}
        >
          <div className="w-full max-w-md">
            <GlassTextarea placeholder="Enter your message..." rows={4} />
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
          code={`import { GlassTextarea } from '@archui/react';

export default function Example() {
  return (
    <GlassTextarea 
      placeholder="Enter your message..." 
      rows={4}
    />
  );
}`}
          vueCode={`<script setup>
import { GlassTextarea } from '@archui/vue';
</script>

<template>
  <GlassTextarea 
    placeholder="Enter your message..." 
    :rows="4"
  />
</template>`}
        />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassTextarea size="sm" placeholder="Small textarea" />
<GlassTextarea size="md" placeholder="Medium textarea" />
<GlassTextarea size="lg" placeholder="Large textarea" />`}
          vueCode={`<GlassTextarea size="sm" placeholder="Small textarea" />
<GlassTextarea size="md" placeholder="Medium textarea" />
<GlassTextarea size="lg" placeholder="Large textarea" />`}
        >
          <div className="w-full max-w-md space-y-4">
            <GlassTextarea size="sm" placeholder="Small textarea" rows={2} />
            <GlassTextarea size="md" placeholder="Medium textarea" rows={2} />
            <GlassTextarea size="lg" placeholder="Large textarea" rows={2} />
          </div>
        </ComponentPreview>
      </div>

      {/* Error State */}
      <div className="space-y-4">
        <h2 id="error-state" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Error State
        </h2>
        <ComponentPreview 
          code={`<GlassTextarea isError placeholder="This field has an error" />`}
          vueCode={`<GlassTextarea is-error placeholder="This field has an error" />`}
        >
          <div className="w-full max-w-md">
            <GlassTextarea isError placeholder="This field has an error" rows={3} />
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Textarea size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>blur</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg" | "xl"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Backdrop blur intensity</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>error</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Show error state</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>rows</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">number</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">3</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Number of visible rows</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
