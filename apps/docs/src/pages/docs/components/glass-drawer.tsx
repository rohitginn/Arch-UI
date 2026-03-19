import * as React from 'react';
import { GlassDrawer, GlassButton } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassDrawerDocs() {
    const [isOpen, setIsOpen] = React.useState(false);

    const code = `const [isOpen, setIsOpen] = useState(false);

<GlassDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <h2 className="text-2xl font-bold mb-4">Sidebar Title</h2>
  <p>Your side panel content here.</p>
</GlassDrawer>`;

    const vueCode = `<script setup>
import { ref } from 'vue';
import { GlassDrawer } from '@archui/vue';

const isOpen = ref(false);
</script>

<template>
  <GlassDrawer :isOpen="isOpen" @onClose="isOpen = false">
    <h2 class="text-2xl font-bold mb-4">Sidebar Title</h2>
    <p>Your side panel content here.</p>
  </GlassDrawer>
</template>`;

    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-drawer" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Drawer
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A side-sliding overlay with liquid glass motion and deep backdrop blur.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview code={code} vueCode={vueCode}>
                    <div className="flex justify-center">
                        <GlassButton variant="primary" onClick={() => setIsOpen(true)}>Open Drawer</GlassButton>
                        <GlassDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-text-primary">Premium Sidebar</h2>
                                <p className="text-text-primary/60">
                                    This side panel uses active spring physics for a liquid feel.
                                </p>
                                <div className="space-y-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                                            Item {i}
                                        </div>
                                    ))}
                                </div>
                                <GlassButton onClick={() => setIsOpen(false)} className="w-full">Close Panel</GlassButton>
                            </div>
                        </GlassDrawer>
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
