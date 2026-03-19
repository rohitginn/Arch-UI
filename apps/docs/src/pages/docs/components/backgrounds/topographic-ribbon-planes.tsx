import { TopographicRibbonPlanes } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../../components/component-preview';

export function TopographicRibbonPlanesDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="topographic-ribbon-planes" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Topographic Ribbon Planes
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    Layered iso-contour ribbons that flow and shift with subtle parallax and breathing animations.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<div className="relative h-[400px] rounded-xl overflow-hidden">
  <TopographicRibbonPlanes
    interactions={{ pointer: 'parallax' }}
  />
  <div className="absolute inset-0 flex items-center justify-center">
    <h2 className="text-4xl font-black">Your Content</h2>
  </div>
</div>`}
                >
                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                        <TopographicRibbonPlanes
                            className="!absolute inset-0"
                            interactions={{ pointer: 'parallax' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <span className="text-4xl font-black text-slate-800 dark:text-white drop-shadow-lg">
                                Topographic Ribbons
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
                    code={`import { TopographicRibbonPlanes } from '@archui/react';`}
                    vueCode={`import { TopographicRibbonPlanes } from '@archui/vue';`}
                />
            </div>

            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <CodeBlock
                    code={`<TopographicRibbonPlanes
  layers={6}
  speed={1}
  intensity={0.5}
  interactions={{ pointer: 'parallax' }}
  overlay={{ color: 'black', opacity: 0.3 }}
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
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">layers</td><td className="py-3 px-4">number</td><td className="py-3 px-4">6</td><td className="py-3 px-4">Number of ribbon layers</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">speed</td><td className="py-3 px-4">number</td><td className="py-3 px-4">1</td><td className="py-3 px-4">Animation speed multiplier</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">intensity</td><td className="py-3 px-4">number</td><td className="py-3 px-4">0.5</td><td className="py-3 px-4">Visual intensity (0–1)</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">seed</td><td className="py-3 px-4">number</td><td className="py-3 px-4">1234</td><td className="py-3 px-4">Deterministic randomness seed</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">interactions</td><td className="py-3 px-4">{`{ pointer }`}</td><td className="py-3 px-4">—</td><td className="py-3 px-4">Pointer interaction mode</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">overlay</td><td className="py-3 px-4">{`{ color, opacity }`}</td><td className="py-3 px-4">—</td><td className="py-3 px-4">Content overlay for readability</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
