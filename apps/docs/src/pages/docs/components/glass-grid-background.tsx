import { GlassGridBackground } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassGridBackgroundDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-grid-background" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Grid Background
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A subtle grid or dot pattern background for landing pages and hero sections.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<GlassGridBackground className="h-64">
  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Content Here</h3>
</GlassGridBackground>`}
                    vueCode={`<GlassGridBackground class="h-64">
  <h3 class="text-2xl font-bold text-slate-900 dark:text-white">Content Here</h3>
</GlassGridBackground>`}
                >
                    <GlassGridBackground className="h-64">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Grid Background</h3>
                    </GlassGridBackground>
                </ComponentPreview>
            </div>

            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`import { GlassGridBackground } from '@archui/react';`}
                    vueCode={`import { GlassGridBackground } from '@archui/vue';`}
                />
            </div>
        </div>
    );
}
