import { MicroEcosystem } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../../components/component-preview';

export function MicroEcosystemDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="micro-ecosystem" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Micro-Ecosystem
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    Tiny stylized flora/cell shapes that grow, shrink, and breathe in place using SVG sprite instancing.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<div className="relative h-[400px] rounded-xl overflow-hidden">
  <MicroEcosystem />
</div>`}
                >
                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                        <MicroEcosystem
                            className="!absolute inset-0"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <span className="text-4xl font-black text-emerald-800 dark:text-emerald-200 drop-shadow-lg">
                                Micro-Ecosystem
                            </span>
                        </div>
                    </div>
                </ComponentPreview>
            </div>

            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`import { MicroEcosystem } from '@archui/react';`}
                    vueCode={`import { MicroEcosystem } from '@archui/vue';`}
                />
            </div>

            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <CodeBlock
                    code={`<MicroEcosystem
  density={1}
  speed={1}
  seed={888}
/>`}
                />
            </div>

            <div className="space-y-4">
                <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Props
                </h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <th className="text-left py-3 px-4 font-medium text-[hsl(var(--foreground))]">Prop</th>
                                <th className="text-left py-3 px-4 font-medium text-[hsl(var(--foreground))]">Type</th>
                                <th className="text-left py-3 px-4 font-medium text-[hsl(var(--foreground))]">Default</th>
                                <th className="text-left py-3 px-4 font-medium text-[hsl(var(--foreground))]">Description</th>
                            </tr>
                        </thead>
                        <tbody className="text-[hsl(var(--muted-foreground))]">
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">density</td><td className="py-3 px-4">number</td><td className="py-3 px-4">1</td><td className="py-3 px-4">Multiplier for entity count</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">speed</td><td className="py-3 px-4">number</td><td className="py-3 px-4">1</td><td className="py-3 px-4">Animation speed multiplier</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">seed</td><td className="py-3 px-4">number</td><td className="py-3 px-4">888</td><td className="py-3 px-4">Deterministic randomness seed</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
