import * as React from 'react';
import { GlassDatePicker } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassDatePickerDocs() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    const code = `const [date, setDate] = useState(new Date());

<GlassDatePicker 
  value={date} 
  onChange={setDate} 
  placeholder="Select expiry date" 
/>`;

    const vueCode = `<script setup>
import { ref } from 'vue';
import { GlassDatePicker } from '@archui/vue';

const date = ref(new Date());
</script>

<template>
  <GlassDatePicker 
    v-model="date" 
    placeholder="Select expiry date" 
  />
</template>`;

    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-date-picker" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Date Picker
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A premium date selection component with liquid glass blooming animations.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview code={code} vueCode={vueCode}>
                    <div className="w-full max-w-sm mx-auto">
                        <GlassDatePicker value={date} onChange={setDate} />
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
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>value / v-model</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">Date</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">undefined</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Selected date object</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>placeholder</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"Pick a date"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Input placeholder text</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
