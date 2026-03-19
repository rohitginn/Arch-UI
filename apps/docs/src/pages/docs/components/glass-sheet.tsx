import * as React from 'react';
import { GlassSheet, GlassButton } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSheetDocs() {
    const [isOpen, setIsOpen] = React.useState(false);

    const code = `const [isOpen, setIsOpen] = useState(false);

<GlassSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2 className="text-2xl font-bold mb-4">Bottom Sheet</h2>
  <p>Your bottom panel content here.</p>
</GlassSheet>`;

    const vueCode = `<script setup>
import { ref } from 'vue';
import { GlassSheet } from '@archui/vue';

const isOpen = ref(false);
</script>

<template>
  <GlassSheet :isOpen="isOpen" @onClose="isOpen = false">
    <h2 class="text-2xl font-bold mb-4">Bottom Sheet</h2>
    <p>Your bottom panel content here.</p>
  </GlassSheet>
</template>`;

    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-sheet" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Sheet
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A mobile-friendly bottom sheet with liquid motion and drag indicators.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview code={code} vueCode={vueCode}>
                    <div className="flex justify-center">
                        <GlassButton variant="primary" onClick={() => setIsOpen(true)}>Open Sheet</GlassButton>
                        <GlassSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                            <div className="space-y-4 max-w-xl mx-auto text-center">
                                <h2 className="text-2xl font-bold text-text-primary">Fluid Sheet</h2>
                                <p className="text-text-primary/60">
                                    Optimized for mobile-first interaction with a premium "blooming" spring entrance.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 text-2xl">
                                            📦
                                        </div>
                                    ))}
                                </div>
                                <GlassButton onClick={() => setIsOpen(false)} variant="ghost">Dismiss</GlassButton>
                            </div>
                        </GlassSheet>
                    </div>
                </ComponentPreview>
            </div>

            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <CodeBlock code={code} vueCode={vueCode} />
            </div>
        </div>
    );
}
