import { GlassTooltip, GlassButton } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

export function GlassTooltipDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Glass Tooltip</h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">A frosted glass tooltip with directional arrows and spring animations.</p>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Preview</h2>
                <ComponentPreview
                    code={`<GlassTooltip content="This is a tooltip">
  <GlassButton>Hover me</GlassButton>
</GlassTooltip>`}
                    vueCode={`<GlassTooltip content="This is a tooltip">
  <GlassButton>Hover me</GlassButton>
</GlassTooltip>`}
                >
                    <div className="flex items-center gap-4 flex-wrap">
                        <GlassTooltip content="Top tooltip" placement="top"><GlassButton>Top</GlassButton></GlassTooltip>
                        <GlassTooltip content="Bottom tooltip" placement="bottom"><GlassButton>Bottom</GlassButton></GlassTooltip>
                        <GlassTooltip content="Left tooltip" placement="left"><GlassButton>Left</GlassButton></GlassTooltip>
                        <GlassTooltip content="Right tooltip" placement="right"><GlassButton>Right</GlassButton></GlassTooltip>
                    </div>
                </ComponentPreview>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Default</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>content</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">ReactNode</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Tooltip content</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>placement</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">'top' | 'bottom' | 'left' | 'right'</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">'top'</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Placement relative to trigger</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>delay</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">number</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">200</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Show delay in ms</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>disabled</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Disable the tooltip</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
