import * as React from 'react';
import { GlassCombobox } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassComboboxDocs() {
    const [value, setValue] = React.useState<string | undefined>('react');

    const options = [
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
        { label: 'Angular', value: 'angular' },
        { label: 'Solid', value: 'solid' },
        { label: 'Qwik', value: 'qwik' },
    ];

    const code = `const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
];

<GlassCombobox 
  options={options} 
  value={value} 
  onChange={setValue} 
  placeholder="Select framework" 
/>`;

    const vueCode = `<script setup>
import { ref } from 'vue';
import { GlassCombobox } from '@archui/vue';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
];

const value = ref('react');
</script>

<template>
  <GlassCombobox 
    v-model="value" 
    :options="options"
    placeholder="Select framework" 
  />
</template>`;

    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-combobox" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Combobox
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A premium searchable select component with liquid transition effects.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview code={code} vueCode={vueCode}>
                    <div className="w-full max-w-sm mx-auto">
                        <GlassCombobox options={options} value={value} onChange={setValue} />
                    </div>
                </ComponentPreview>
            </div>

            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <CodeBlock code={code} vueCode={vueCode} />
            </div>

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
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>options</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">{"{ label: string; value: string }[]"}</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">[]</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">List of selectable options</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>value / v-model</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">undefined</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Value of the selected option</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
