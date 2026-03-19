import { useState } from 'react';
import { GlassCheckbox } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassCheckboxDocs() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-checkbox" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Checkbox
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A checkbox component with glassmorphic styling for boolean inputs.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`const [checked, setChecked] = useState(false);

<GlassCheckbox 
  checked={checked} 
  onChange={(e) => setChecked(e.target.checked)}
  label="Accept terms and conditions"
/>`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassCheckbox } from '@archui/vue';

const checked = ref(false);
</script>

<template>
  <GlassCheckbox 
    v-model:checked="checked"
    label="Accept terms and conditions"
  />
</template>`}
        >
          <GlassCheckbox 
            checked={checked} 
            onChange={(e) => setChecked(e.target.checked)}
            label="Accept terms and conditions"
          />
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
          code={`import { GlassCheckbox } from '@archui/react';

export default function Example() {
  const [checked, setChecked] = useState(false);
  
  return (
    <div className="flex items-center gap-2">
      <GlassCheckbox 
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label>Accept terms and conditions</label>
    </div>
  );
}`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassCheckbox } from '@archui/vue';

const checked = ref(false);
</script>

<template>
  <div class="flex items-center gap-2">
    <GlassCheckbox 
      v-model:checked="checked"
    />
    <label>Accept terms and conditions</label>
  </div>
</template>`}
        />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassCheckbox size="sm" />
<GlassCheckbox size="md" />
<GlassCheckbox size="lg" />`}
          vueCode={`<GlassCheckbox size="sm" />
<GlassCheckbox size="md" />
<GlassCheckbox size="lg" />`}
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <GlassCheckbox size="sm" checked />
              <span className="text-white text-sm">Small</span>
            </div>
            <div className="flex items-center gap-2">
              <GlassCheckbox size="md" checked />
              <span className="text-white">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <GlassCheckbox size="lg" checked />
              <span className="text-white text-lg">Large</span>
            </div>
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>checked</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Controlled checked state</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onCheckedChange</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(checked: boolean) =&gt; void</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Change handler</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Checkbox size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>disabled</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Disable the checkbox</td>
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
          <li>Uses native checkbox element for full keyboard support</li>
          <li>Supports <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">Space</code> key to toggle</li>
          <li>Label association via <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">id</code> prop</li>
        </ul>
      </div>
    </div>
  );
}
