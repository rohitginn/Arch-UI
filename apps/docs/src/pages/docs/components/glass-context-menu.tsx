import { GlassContextMenu } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const menuItems = [
    { id: 'cut', label: 'Cut', shortcut: '⌘X' },
    { id: 'copy', label: 'Copy', shortcut: '⌘C' },
    { id: 'paste', label: 'Paste', shortcut: '⌘V' },
    { id: 'div1', label: '', divider: true },
    { id: 'rename', label: 'Rename', shortcut: 'F2' },
    { id: 'duplicate', label: 'Duplicate', shortcut: '⌘D' },
    { id: 'div2', label: '', divider: true },
    { id: 'delete', label: 'Delete', shortcut: '⌫', danger: true },
];

export function GlassContextMenuDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-context-menu" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Context Menu
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A glassmorphic right-click context menu with staggered animations, nested submenus, and keyboard shortcut hints.
                </p>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<GlassContextMenu
  items={menuItems}
  onSelect={(item) => console.log(item)}
>
  <div className="p-12 border-2 border-dashed rounded-xl text-center">
    Right-click here
  </div>
</GlassContextMenu>`}
                    vueCode={`<script setup>
import { GlassContextMenu } from '@archui/vue';

const menuItems = [
  { id: 'cut', label: 'Cut', shortcut: '⌘X' },
  { id: 'copy', label: 'Copy', shortcut: '⌘C' },
  { id: 'paste', label: 'Paste', shortcut: '⌘V' },
  { id: 'delete', label: 'Delete', danger: true },
];
</script>

<template>
  <GlassContextMenu :items="menuItems" @select="(item) => console.log(item)">
    <div class="p-12 border-2 border-dashed rounded-xl text-center">
      Right-click here
    </div>
  </GlassContextMenu>
</template>`}
                >
                    <GlassContextMenu
                        items={menuItems}
                        onSelect={(item) => console.log('Selected:', item.label)}
                    >
                        <div className="p-12 border-2 border-dashed border-black/10 dark:border-white/10 rounded-xl text-center text-sm text-slate-500 dark:text-white/50 cursor-default select-none">
                            Right-click anywhere in this area
                        </div>
                    </GlassContextMenu>
                </ComponentPreview>
            </div>

            {/* Installation */}
            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`npm install @archui/react
# or
pnpm add @archui/react`}
                    vueCode={`npm install @archui/vue
# or
pnpm add @archui/vue`}
                />
            </div>

            {/* Usage */}
            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <CodeBlock
                    code={`import { GlassContextMenu } from '@archui/react';

const items = [
  { id: 'cut', label: 'Cut', shortcut: '⌘X' },
  { id: 'copy', label: 'Copy', shortcut: '⌘C' },
  { id: 'paste', label: 'Paste', shortcut: '⌘V' },
  { id: 'div', label: '', divider: true },
  { id: 'delete', label: 'Delete', danger: true },
];

<GlassContextMenu items={items} onSelect={handleSelect}>
  <YourContent />
</GlassContextMenu>`}
                    vueCode={`<script setup>
import { GlassContextMenu } from '@archui/vue';

const items = [
  { id: 'cut', label: 'Cut', shortcut: '⌘X' },
  { id: 'copy', label: 'Copy', shortcut: '⌘C' },
  { id: 'paste', label: 'Paste', shortcut: '⌘V' },
  { id: 'div', label: '', divider: true },
  { id: 'delete', label: 'Delete', danger: true },
];
</script>

<template>
  <GlassContextMenu :items="items" @select="handleSelect">
    <YourContent />
  </GlassContextMenu>
</template>`}
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
                                <th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>items</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">ContextMenuItem[]</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">[]</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Menu items to display</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onSelect</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(item) =&gt; void</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Called when an item is selected</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="item-type" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    ContextMenuItem Type
                </h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Field</th>
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th>
                                <th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>id</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Unique identifier</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>label</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Display label</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>shortcut</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Keyboard shortcut hint</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>danger</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Red/destructive styling</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>divider</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Render as divider line</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>children</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">ContextMenuItem[]</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Nested submenu items</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
