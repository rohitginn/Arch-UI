import { useState } from 'react';
import { GlassSelect } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSelectDocs() {
  const [value, setValue] = useState('');

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-select" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Select
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A dropdown select component with glassmorphic styling for form inputs.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`const [value, setValue] = useState('');

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

<GlassSelect
  value={value}
  onChange={(e) => setValue(e.target.value)}
  options={options}
  placeholder="Select a fruit"
/>`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassSelect } from '@archui/vue';

const value = ref('');

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];
</script>

<template>
  <GlassSelect
    v-model="value"
    :options="options"
    placeholder="Select a fruit"
  />
</template>`}
        >
          <div className="w-full max-w-sm">
            <GlassSelect
              value={value}
              onChange={(e) => setValue(e.target.value)}
              options={options}
              placeholder="Select a fruit"
            />
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
          code={`import { GlassSelect } from '@archui/react';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export default function Example() {
  const [value, setValue] = useState('');
  
  return (
    <GlassSelect
      value={value}
      onValueChange={setValue}
      options={options}
      placeholder="Select an option"
    />
  );
}`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassSelect } from '@archui/vue';

const value = ref('');

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];
</script>

<template>
  <GlassSelect
    v-model="value"
    :options="options"
    placeholder="Select an option"
  />
</template>`}
        />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <CodeBlock 
          code={`// Small
<GlassSelect size="sm" options={options} />

// Medium (default)
<GlassSelect size="md" options={options} />

// Large
<GlassSelect size="lg" options={options} />`}
          vueCode={`<!-- Small -->
<GlassSelect size="sm" :options="options" />

<!-- Medium (default) -->
<GlassSelect size="md" :options="options" />

<!-- Large -->
<GlassSelect size="lg" :options="options" />`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 id="select-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassSelect Props
        </h3>
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>value</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Controlled value</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onValueChange</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(value: string) =&gt; void</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Change handler</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>options</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">GlassSelectOption[]</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">[]</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Array of options</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Select size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>placeholder</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"Select..."</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Placeholder text</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>disabled</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Disable the select</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
