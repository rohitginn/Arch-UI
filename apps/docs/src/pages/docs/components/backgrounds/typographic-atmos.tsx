import { TypographicAtmos } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../../components/component-preview';

export function TypographicAtmosDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="typographic-atmos" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Typographic Atmos
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    Very large, semi-transparent letterforms arranged to form shifting textures across the background.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<div className="relative h-[400px] rounded-xl overflow-hidden">
  <TypographicAtmos
    words={['ARCH', 'UI', 'GLASS', 'DEPTH']}
  />
</div>`}
                >
                    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
                        <TypographicAtmos
                            className="!absolute inset-0"
                            words={['ARCH', 'UI', 'GLASS', 'DEPTH', 'MOTION', 'ZEN']}
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                            <span className="text-4xl font-black text-slate-800 dark:text-white drop-shadow-lg">
                                Typographic Atmos
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
                    code={`import { TypographicAtmos } from '@archui/react';`}
                    vueCode={`import { TypographicAtmos } from '@archui/vue';`}
                />
            </div>

            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <CodeBlock
                    code={`<TypographicAtmos
  words={['BRAND', 'UI', 'MODERN']}
  speed={1}
  density={1}
  interactions={{ pointer: 'parallax' }}
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
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">words</td><td className="py-3 px-4">string[]</td><td className="py-3 px-4">['UI', 'AESTHETIC', ...]</td><td className="py-3 px-4">Words to render as textures</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">density</td><td className="py-3 px-4">number</td><td className="py-3 px-4">1</td><td className="py-3 px-4">Multiplier for word count</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">speed</td><td className="py-3 px-4">number</td><td className="py-3 px-4">1</td><td className="py-3 px-4">Animation speed multiplier</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">seed</td><td className="py-3 px-4">number</td><td className="py-3 px-4">101</td><td className="py-3 px-4">Deterministic randomness seed</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 px-4 font-mono text-xs">interactions</td><td className="py-3 px-4">{`{ pointer }`}</td><td className="py-3 px-4">—</td><td className="py-3 px-4">'parallax' pointer interaction</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
