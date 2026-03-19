import { GlassSearch } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

const suggestions = [
    { id: '1', label: 'GlassButton', description: 'Premium glassmorphic button' },
    { id: '2', label: 'GlassCard', description: 'Frosted glass container' },
    { id: '3', label: 'GlassModal', description: 'Overlay dialog component' },
    { id: '4', label: 'GlassInput', description: 'Text input with glass styling' },
];

export function GlassSearchDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Glass Search</h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">A glassmorphic search bar with expandable suggestion dropdown and keyboard navigation.</p>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Preview</h2>
                <ComponentPreview
                    code={`<GlassSearch suggestions={suggestions} onSelect={handleSelect} placeholder="Search components…" />`}
                    vueCode={`<GlassSearch v-model="query" :suggestions="suggestions" @select="handleSelect" placeholder="Search components…" />`}
                >
                    <div className="max-w-md w-full">
                        <GlassSearch
                            suggestions={suggestions}
                            onSelect={(s) => console.log('Selected:', s.label)}
                            placeholder="Search components…"
                        />
                    </div>
                </ComponentPreview>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>value</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Controlled search query</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>suggestions</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">SearchSuggestion[]</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Suggestion items to display</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onSelect</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(item) =&gt; void</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Called when a suggestion is selected</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onSubmit</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(query: string) =&gt; void</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Called on Enter key</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>placeholder</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Input placeholder text</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
