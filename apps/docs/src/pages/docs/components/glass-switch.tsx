import { useState } from 'react';
import { GlassSwitch } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSwitchDocs() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-switch" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Switch
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A toggle switch component with glassmorphic styling for on/off states.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`const [enabled, setEnabled] = useState(false);

<div className="flex items-center gap-2">
  <GlassSwitch 
    checked={enabled} 
    onCheckedChange={setEnabled}
  />
  <label>Airplane Mode</label>
</div>`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassSwitch } from '@archui/vue';

const enabled = ref(false);
</script>

<template>
  <div class="flex items-center gap-2">
    <GlassSwitch 
      v-model:checked="enabled"
    />
    <label>Airplane Mode</label>
  </div>
</template>`}
        >
          <div className="flex items-center gap-3">
            <GlassSwitch 
              checked={enabled} 
              onChange={(e) => setEnabled(e.target.checked)}
              label={`Airplane Mode ${enabled ? '(On)' : '(Off)'}`}
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
          code={`import { GlassSwitch } from '@archui/react';

export default function Example() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <div className="flex items-center gap-2">
      <GlassSwitch 
        checked={enabled}
        onCheckedChange={setEnabled}
      />
      <label>Airplane Mode</label>
    </div>
  );
}`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassSwitch } from '@archui/vue';

const enabled = ref(false);
</script>

<template>
  <div class="flex items-center gap-2">
    <GlassSwitch 
      v-model:checked="enabled"
    />
    <label>Airplane Mode</label>
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
          code={`<GlassSwitch size="sm" />
<GlassSwitch size="md" />
<GlassSwitch size="lg" />`}
          vueCode={`<GlassSwitch size="sm" />
<GlassSwitch size="md" />
<GlassSwitch size="lg" />`}
        >
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <GlassSwitch size="sm" checked />
              <span className="text-white text-sm">Small</span>
            </div>
            <div className="flex items-center gap-2">
              <GlassSwitch size="md" checked />
              <span className="text-white">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <GlassSwitch size="lg" checked />
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
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Switch size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>disabled</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Disable the switch</td>
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
          <li>Uses <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">role="switch"</code> for proper semantics</li>
          <li>Supports <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">Space</code> and <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">Enter</code> keys to toggle</li>
          <li>Announces state changes to screen readers</li>
        </ul>
      </div>
    </div>
  );
}
