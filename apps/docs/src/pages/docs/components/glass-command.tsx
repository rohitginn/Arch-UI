import { useState } from 'react';
import { GlassCommand, GlassButton } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const sampleCommands = [
    { id: '1', label: 'New File', shortcut: '⌘ + N', group: 'File' },
    { id: '2', label: 'Open File', shortcut: '⌘ + O', group: 'File' },
    { id: '3', label: 'Save', shortcut: '⌘ + S', group: 'File' },
    { id: '4', label: 'Search Project', shortcut: '⌘ + ⇧ + F', group: 'Search' },
    { id: '5', label: 'Find and Replace', shortcut: '⌘ + H', group: 'Search' },
    { id: '6', label: 'Toggle Terminal', shortcut: '⌃ + `', group: 'View' },
    { id: '7', label: 'Toggle Sidebar', shortcut: '⌘ + B', group: 'View' },
    { id: '8', label: 'Format Document', shortcut: '⌥ + ⇧ + F', group: 'Editor' },
    { id: '9', label: 'Go to Line', shortcut: '⌃ + G', group: 'Editor' },
    { id: '10', label: 'Quick Fix', shortcut: '⌘ + .', group: 'Editor' },
];

export function GlassCommandDocs() {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-command" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Command
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A glassmorphic command palette with keyboard-first UX, searchable commands, and shortcut hints.
                    Inspired by VS Code, Linear, and Raycast.
                </p>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`const [open, setOpen] = useState(false);

<GlassButton onClick={() => setOpen(true)}>
  Open Command Palette (⌘K)
</GlassButton>

<GlassCommand
  open={open}
  onOpenChange={setOpen}
  items={commands}
  onSelect={(item) => console.log(item)}
/>`}
                    vueCode={`<script setup>
import { ref } from 'vue';
import { GlassCommand, GlassButton } from '@archui/vue';

const open = ref(false);
const commands = [
  { id: '1', label: 'New File', shortcut: '⌘ + N', group: 'File' },
  { id: '2', label: 'Save', shortcut: '⌘ + S', group: 'File' },
];
</script>

<template>
  <GlassButton @click="open = true">
    Open Command Palette (⌘K)
  </GlassButton>

  <GlassCommand
    v-model:open="open"
    :items="commands"
    @select="(item) => console.log(item)"
  />
</template>`}
                >
                    <GlassButton onClick={() => setOpen(true)}>
                        Open Command Palette (⌘K)
                    </GlassButton>
                    <GlassCommand
                        open={open}
                        onOpenChange={setOpen}
                        items={sampleCommands}
                        onSelect={(item) => console.log('Selected:', item.label)}
                    />
                </ComponentPreview>
            </div>

            {/* Installation */}
            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                    Install the package via your preferred package manager:
                </p>
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
                    code={`import { useState } from 'react';
import { GlassCommand } from '@archui/react';

const commands = [
  { id: '1', label: 'New File', shortcut: '⌘ + N', group: 'File' },
  { id: '2', label: 'Save', shortcut: '⌘ + S', group: 'File' },
  { id: '3', label: 'Search', shortcut: '⌘ + ⇧ + F', group: 'Search' },
];

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <GlassCommand
      open={open}
      onOpenChange={setOpen}
      items={commands}
      onSelect={(item) => console.log(item)}
    />
  );
}`}
                    vueCode={`<script setup>
import { ref } from 'vue';
import { GlassCommand } from '@archui/vue';

const open = ref(false);
const commands = [
  { id: '1', label: 'New File', shortcut: '⌘ + N', group: 'File' },
  { id: '2', label: 'Save', shortcut: '⌘ + S', group: 'File' },
  { id: '3', label: 'Search', shortcut: '⌘ + ⇧ + F', group: 'Search' },
];

const handleSelect = (item) => console.log(item);
</script>

<template>
  <GlassCommand
    v-model:open="open"
    :items="commands"
    @select="handleSelect"
  />
</template>`}
                />
            </div>

            {/* Props */}
            <div className="space-y-4">
                <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Props
                </h2>

                <h3 id="command-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    GlassCommand Props
                </h3>
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
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>open</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Controlled open state</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onOpenChange</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(open: boolean) =&gt; void</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Callback when open state changes</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>items</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">CommandItem[]</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">[]</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Array of command items</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onSelect</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(item: CommandItem) =&gt; void</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Called when a command is selected</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>placeholder</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"Type a command or search…"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Search input placeholder</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>emptyMessage</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"No results found."</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Message when no items match</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 id="item-type" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    CommandItem Type
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
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Keyboard shortcut (use + to separate keys)</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>group</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Group heading for categorization</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>disabled</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Disable the command</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onSelect</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">() =&gt; void</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Item-level select callback</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="space-y-4">
                <h2 id="keyboard" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Keyboard Shortcuts
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Key</th>
                                <th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>⌘K / Ctrl+K</code></td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Toggle command palette</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>↑ / ↓</code></td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Navigate items</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>Enter</code></td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Select focused item</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>Escape</code></td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Close palette</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
