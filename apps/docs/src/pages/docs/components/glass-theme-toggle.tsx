import { GlassThemeToggle } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassThemeToggleDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-theme-toggle" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Theme Toggle
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    An animated sun/moon theme switcher with glassmorphic styling.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview code={`<GlassThemeToggle />`} vueCode={`<GlassThemeToggle />`}>
                    <GlassThemeToggle />
                </ComponentPreview>
            </div>

            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`import { GlassThemeToggle } from '@archui/react';`}
                    vueCode={`import { GlassThemeToggle } from '@archui/vue';`}
                />
            </div>
        </div>
    );
}
