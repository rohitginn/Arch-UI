import { GlassLabel, GlassInput } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassLabelDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-label" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Label
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A form label component with subtle styling, required/optional indicators, and accessibility features.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<div className="space-y-2">
  <GlassLabel htmlFor="email">Email Address</GlassLabel>
  <GlassInput id="email" placeholder="Enter your email" />
</div>`}
          vueCode={`<template>
  <div class="space-y-2">
    <GlassLabel for="email">Email Address</GlassLabel>
    <GlassInput id="email" placeholder="Enter your email" />
  </div>
</template>`}
        >
          <div className="space-y-2 w-64">
            <GlassLabel htmlFor="email-preview">Email Address</GlassLabel>
            <GlassInput id="email-preview" placeholder="Enter your email" />
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
          code={`import { GlassLabel, GlassInput } from '@archui/react';

export default function Example() {
  return (
    <div className="space-y-2">
      <GlassLabel htmlFor="username">Username</GlassLabel>
      <GlassInput id="username" placeholder="Enter username" />
    </div>
  );
}`}
          vueCode={`<script setup>
import { GlassLabel, GlassInput } from '@archui/vue';
</script>

<template>
  <div class="space-y-2">
    <GlassLabel for="username">Username</GlassLabel>
    <GlassInput id="username" placeholder="Enter username" />
  </div>
</template>`}
        />
      </div>

      {/* Required & Optional */}
      <div className="space-y-4">
        <h2 id="required-optional" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Required & Optional Indicators
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Add visual indicators for required or optional fields.
        </p>
        <ComponentPreview 
          code={`<GlassLabel required>Required Field</GlassLabel>
<GlassLabel optional>Optional Field</GlassLabel>`}
          vueCode={`<GlassLabel required>Required Field</GlassLabel>
<GlassLabel optional>Optional Field</GlassLabel>`}
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <GlassLabel required>Required Field</GlassLabel>
              <GlassInput placeholder="This field is required" />
            </div>
            <div className="space-y-2">
              <GlassLabel optional>Optional Field</GlassLabel>
              <GlassInput placeholder="This field is optional" />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassLabel variant="default">Default Label</GlassLabel>
<GlassLabel variant="muted">Muted Label</GlassLabel>
<GlassLabel variant="error">Error Label</GlassLabel>
<GlassLabel variant="success">Success Label</GlassLabel>`}
          vueCode={`<GlassLabel variant="default">Default Label</GlassLabel>
<GlassLabel variant="muted">Muted Label</GlassLabel>
<GlassLabel variant="error">Error Label</GlassLabel>
<GlassLabel variant="success">Success Label</GlassLabel>`}
        >
          <div className="flex flex-col gap-3">
            <GlassLabel variant="default">Default Label</GlassLabel>
            <GlassLabel variant="muted">Muted Label</GlassLabel>
            <GlassLabel variant="error">Error Label</GlassLabel>
            <GlassLabel variant="success">Success Label</GlassLabel>
          </div>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassLabel size="sm">Small Label</GlassLabel>
<GlassLabel size="md">Medium Label</GlassLabel>
<GlassLabel size="lg">Large Label</GlassLabel>`}
          vueCode={`<GlassLabel size="sm">Small Label</GlassLabel>
<GlassLabel size="md">Medium Label</GlassLabel>
<GlassLabel size="lg">Large Label</GlassLabel>`}
        >
          <div className="flex flex-col gap-3">
            <GlassLabel size="sm">Small Label</GlassLabel>
            <GlassLabel size="md">Medium Label (Default)</GlassLabel>
            <GlassLabel size="lg">Large Label</GlassLabel>
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
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "muted" | "error" | "success"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Label color variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Label text size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>required</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Show required asterisk (*)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>optional</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Show "(optional)" text</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>htmlFor</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Associates label with input ID</td>
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
          <li>Uses native <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">&lt;label&gt;</code> element for full accessibility support</li>
          <li>Associate with inputs using <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">htmlFor</code> and <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">id</code></li>
          <li>Required indicator uses <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">aria-hidden</code> since it's decorative</li>
          <li>Clicking the label focuses the associated input</li>
        </ul>
      </div>
    </div>
  );
}
