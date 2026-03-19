import { GlassSpotlightCard } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSpotlightCardDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-spotlight-card" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Spotlight Card
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A premium card component with a mouse-following gradient spotlight effect, useful for highlighting features or pricing tiers.
                </p>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<GlassSpotlightCard className="max-w-sm p-8 text-center bg-white/50 dark:bg-black/40">
  <div className="text-4xl mb-4">✨</div>
  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Premium Feature</h3>
  <p className="mt-2 text-slate-500 dark:text-white/60">
    Hover over this card to see the beautiful gradient spotlight effect that follows your cursor.
  </p>
</GlassSpotlightCard>`}
                    vueCode={`<GlassSpotlightCard class="max-w-sm p-8 text-center bg-white/50 dark:bg-black/40">
  <div class="text-4xl mb-4">✨</div>
  <h3 class="text-xl font-bold text-slate-900 dark:text-white">Premium Feature</h3>
  <p class="mt-2 text-slate-500 dark:text-white/60">
    Hover over this card to see the beautiful gradient spotlight effect that follows your cursor.
  </p>
</GlassSpotlightCard>`}
                >
                    <GlassSpotlightCard className="max-w-sm p-8 text-center bg-white/50 dark:bg-black/40">
                        <div className="text-4xl mb-4">✨</div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Premium Feature</h3>
                        <p className="mt-2 text-slate-500 dark:text-white/60">
                            Hover over this card to see the beautiful gradient spotlight effect that follows your cursor.
                        </p>
                    </GlassSpotlightCard>
                </ComponentPreview>
            </div>

            {/* Installation */}
            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`import { GlassSpotlightCard } from '@archui/react';`}
                    vueCode={`import { GlassSpotlightCard } from '@archui/vue';`}
                />
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
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>from</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"rgba(255,255,255,0.2)"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Color of the spotlight gradient</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">number</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">300</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Size of the spotlight in pixels</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>mode</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"before" | "after"</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"before"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Positioning mode of the effect layer</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
