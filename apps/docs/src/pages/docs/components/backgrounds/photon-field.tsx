import { PhotonField } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../../components/component-preview';

export function PhotonFieldDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="photon-field" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Photon Field
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A drifting particle field with trails and emergent clustering, rendered on HTML Canvas.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<div className="relative h-[400px] rounded-xl overflow-hidden">
  <PhotonField interactions={{ pointer: 'repel' }} />
</div>`}
                >
                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-slate-950 dark:bg-slate-950">
                        <PhotonField
                            className="!absolute inset-0"
                            interactions={{ pointer: 'repel' }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <span className="text-4xl font-black text-white drop-shadow-lg">
                                Photon Field
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
                    code={`import { PhotonField } from '@archui/react';`}
                    vueCode={`import { PhotonField } from '@archui/vue';`}
                />
            </div>

            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <CodeBlock
                    code={`<PhotonField
  particleCount={200}
  speed={1}
  intensity={0.5}
  interactions={{ pointer: 'repel' }}
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
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">particleCount</td><td className="py-3 px-4">number</td><td className="py-3 px-4">200</td><td className="py-3 px-4">Number of particles</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">speed</td><td className="py-3 px-4">number</td><td className="py-3 px-4">1</td><td className="py-3 px-4">Animation speed multiplier</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">intensity</td><td className="py-3 px-4">number</td><td className="py-3 px-4">0.5</td><td className="py-3 px-4">Opacity/brightness (0–1)</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">seed</td><td className="py-3 px-4">number</td><td className="py-3 px-4">42</td><td className="py-3 px-4">Deterministic randomness seed</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">interactions</td><td className="py-3 px-4">{`{ pointer }`}</td><td className="py-3 px-4">—</td><td className="py-3 px-4">'repel' | 'attract' | 'none'</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
