import { useState } from 'react';
import { GlassRadio, GlassRadioGroup } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassRadioDocs() {
  const [value, setValue] = useState('option1');

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-radio" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Radio
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A radio button group component with glassmorphic styling for single-choice inputs.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`const [value, setValue] = useState('option1');

<GlassRadioGroup value={value} onChange={setValue}>
  <GlassRadio value="option1" label="Option 1" />
  <GlassRadio value="option2" label="Option 2" />
  <GlassRadio value="option3" label="Option 3" />
</GlassRadioGroup>`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassRadio, GlassRadioGroup } from '@archui/vue';

const value = ref('option1');
</script>

<template>
  <GlassRadioGroup v-model="value">
    <GlassRadio value="option1" label="Option 1" />
    <GlassRadio value="option2" label="Option 2" />
    <GlassRadio value="option3" label="Option 3" />
  </GlassRadioGroup>
</template>`}
        >
          <GlassRadioGroup value={value} onChange={setValue}>
            <GlassRadio value="option1" label="Option 1" />
            <GlassRadio value="option2" label="Option 2" />
            <GlassRadio value="option3" label="Option 3" />
          </GlassRadioGroup>
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
          code={`import { GlassRadio, GlassRadioGroup } from '@archui/react';

export default function Example() {
  const [value, setValue] = useState('option1');
  
  return (
    <GlassRadioGroup value={value} onValueChange={setValue}>
      <div className="flex items-center gap-2">
        <GlassRadio value="option1" />
        <label>Option 1</label>
      </div>
      <div className="flex items-center gap-2">
        <GlassRadio value="option2" />
        <label>Option 2</label>
      </div>
      <div className="flex items-center gap-2">
        <GlassRadio value="option3" />
        <label>Option 3</label>
      </div>
    </GlassRadioGroup>
  );
}`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassRadio, GlassRadioGroup } from '@archui/vue';

const value = ref('option1');
</script>

<template>
  <GlassRadioGroup v-model="value">
    <div class="flex items-center gap-2">
      <GlassRadio value="option1" />
      <label>Option 1</label>
    </div>
    <div class="flex items-center gap-2">
      <GlassRadio value="option2" />
      <label>Option 2</label>
    </div>
    <div class="flex items-center gap-2">
      <GlassRadio value="option3" />
      <label>Option 3</label>
    </div>
  </GlassRadioGroup>
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
<GlassRadio size="sm" value="small" />

// Medium (default)
<GlassRadio size="md" value="medium" />

// Large
<GlassRadio size="lg" value="large" />`}
          vueCode={`<!-- Small -->
<GlassRadio size="sm" value="small" />

<!-- Medium (default) -->
<GlassRadio size="md" value="medium" />

<!-- Large -->
<GlassRadio size="lg" value="large" />`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 id="group-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassRadioGroup Props
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>defaultValue</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Default value (uncontrolled)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onValueChange</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(value: string) =&gt; void</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Change handler</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 id="item-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassRadio Props
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
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">required</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Radio item value</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Radio button size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>disabled</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Disable the radio</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
