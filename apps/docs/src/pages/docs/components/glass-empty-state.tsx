import { GlassEmptyState, GlassButton } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

export function GlassEmptyStateDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Glass Empty State</h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">A frosted empty-state container with a gentle floating animation and optional call-to-action.</p>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Preview</h2>
                <ComponentPreview
                    code={`<GlassEmptyState title="No results" description="Try adjusting your search or filters." action={<GlassButton>Clear filters</GlassButton>} />`}
                    vueCode={`<GlassEmptyState title="No results" description="Try adjusting your search or filters.">
  <template #action><GlassButton>Clear filters</GlassButton></template>
</GlassEmptyState>`}
                >
                    <GlassEmptyState
                        title="No results found"
                        description="Try adjusting your search or filters to find what you're looking for."
                        action={<GlassButton>Clear filters</GlassButton>}
                    />
                </ComponentPreview>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>title</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Heading text</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>description</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Body text</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>icon</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">ReactNode</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Custom icon or illustration</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>action</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">ReactNode</td><td className="py-3 text-[hsl(var(--muted-foreground))]">CTA button or link</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
