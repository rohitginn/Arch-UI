import { GlassMeteors } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassMeteorsDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-meteors" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Meteors
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    Falling meteor animation effect for backgrounds. Perfect for dark mode hero sections.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900">
  <GlassMeteors number={20} />
  <div className="relative z-10 flex h-full items-center justify-center">
    <h3 className="text-2xl font-bold text-white">Meteor Effect</h3>
  </div>
</div>`}
                    vueCode={`<div class="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900">
  <GlassMeteors :number="20" />
  <div class="relative z-10 flex h-full items-center justify-center">
    <h3 class="text-2xl font-bold text-white">Meteor Effect</h3>
  </div>
</div>`}
                >
                    <div className="relative h-64 w-full overflow-hidden rounded-xl bg-slate-900">
                        <GlassMeteors number={20} />
                        <div className="relative z-10 flex h-full items-center justify-center">
                            <h3 className="text-2xl font-bold text-white">Meteor Effect</h3>
                        </div>
                    </div>
                </ComponentPreview>
            </div>

            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`import { GlassMeteors } from '@archui/react';`}
                    vueCode={`import { GlassMeteors } from '@archui/vue';`}
                />
            </div>
        </div>
    );
}
