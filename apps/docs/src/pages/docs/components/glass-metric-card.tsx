import { GlassMetricCard } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

export function GlassMetricCardDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Glass Metric Card</h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">A dashboard KPI card with animated number transitions, trend indicators, and parallax tilt.</p>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Preview</h2>
                <ComponentPreview
                    code={`<GlassMetricCard value={12847} label="Total Users" trend="up" trendValue="+12.5%" />`}
                    vueCode={`<GlassMetricCard :value="12847" label="Total Users" trend="up" trend-value="+12.5%" />`}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                        <GlassMetricCard value={12847} label="Total Users" trend="up" trendValue="+12.5%" />
                        <GlassMetricCard value={3420} label="Revenue" trend="up" trendValue="+8.2%" />
                        <GlassMetricCard value={94.2} label="Uptime %" trend="neutral" trendValue="Stable" />
                    </div>
                </ComponentPreview>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>value</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string | number</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Primary metric value</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>label</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Metric label</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>trend</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">'up' | 'down' | 'neutral'</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Trend direction</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>trendValue</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Trend percentage or text</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
