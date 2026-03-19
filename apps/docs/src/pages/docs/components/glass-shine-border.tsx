import { GlassShineBorder } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassShineBorderDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-shine-border" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Shine Border
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A container with an animated rotating light border effect. Perfect for highlighting premium content.
                </p>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<GlassShineBorder className="p-8 text-center">
  <div className="text-4xl mb-2">✨</div>
  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Premium Feature</h3>
  <p className="text-slate-500 dark:text-white/60">With animated border shine</p>
</GlassShineBorder>`}
                    vueCode={`<GlassShineBorder class="p-8 text-center">
  <div class="text-4xl mb-2">✨</div>
  <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Premium Feature</h3>
</GlassShineBorder>`}
                >
                    <GlassShineBorder className="p-8 text-center">
                        <div className="text-4xl mb-2">✨</div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Premium Feature</h3>
                        <p className="text-slate-500 dark:text-white/60">With animated border shine</p>
                    </GlassShineBorder>
                </ComponentPreview>
            </div>

            {/* Installation */}
            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`import { GlassShineBorder } from '@archui/react';`}
                    vueCode={`import { GlassShineBorder } from '@archui/vue';`}
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>shineColor</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string | string[]</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"#3b82f6"</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>duration</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">number</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">8</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>borderRadius</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">number</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">12</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
