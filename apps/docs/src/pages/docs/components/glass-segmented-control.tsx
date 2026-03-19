import { useState } from 'react';
import { GlassSegmentedControl } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

const items = [
    { value: 'overview', label: 'Overview' },
    { value: 'analytics', label: 'Analytics' },
    { value: 'reports', label: 'Reports' },
    { value: 'settings', label: 'Settings' },
];

export function GlassSegmentedControlDocs() {
    const [selected, setSelected] = useState('overview');

    return (
        <div className="space-y-6">
            <div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Glass Segmented Control</h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">A pill-shaped toggle group with a smooth sliding glass indicator and spring animation.</p>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Preview</h2>
                <ComponentPreview
                    code={`<GlassSegmentedControl items={items} value={selected} onValueChange={setSelected} />`}
                    vueCode={`<GlassSegmentedControl v-model="selected" :items="items" />`}
                >
                    <div className="space-y-4">
                        <GlassSegmentedControl items={items} value={selected} onValueChange={setSelected} />
                        <p className="text-sm text-slate-500 dark:text-white/40">Selected: <strong className="text-slate-900 dark:text-white">{selected}</strong></p>
                    </div>
                </ComponentPreview>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Default</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>items</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">SegmentItem[]</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Segment options</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>value</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Controlled value</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onValueChange</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(val: string) =&gt; void</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Called when value changes</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">'sm' | 'md' | 'lg'</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">'md'</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Size variant</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>fullWidth</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Fill container width</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
