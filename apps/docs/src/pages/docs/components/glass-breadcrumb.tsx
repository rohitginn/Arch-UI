import { GlassBreadcrumb } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassBreadcrumbDocs() {
    const items = [
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/components' },
        { label: 'Breadcrumb', href: '/components/glass-breadcrumb' },
    ];

    const longItems = [
        { label: 'Home', href: '/' },
        { label: 'Projects', href: '/projects' },
        { label: 'ZenLab', href: '/projects/zenlab' },
        { label: 'Packages', href: '/projects/zenlab/packages' },
        { label: 'React', href: '/projects/zenlab/packages/react' },
        { label: 'Components', href: '/projects/zenlab/packages/react/components' },
        { label: 'Breadcrumb', href: '/projects/zenlab/packages/react/components/breadcrumb' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-breadcrumb" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Breadcrumb
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A responsive breadcrumb navigation component with glassmorphic styling and truncation support.
                </p>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`const items = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumb', href: '/components/glass-breadcrumb' },
];

<GlassBreadcrumb items={items} />`}
                    vueCode={`<script setup>
const items = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumb', href: '/components/glass-breadcrumb' },
];
</script>

<template>
  <GlassBreadcrumb :items="items" />
</template>`}
                >
                    <div className="flex flex-col gap-4">
                        <GlassBreadcrumb items={items} />
                    </div>
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
                    code={`import { GlassBreadcrumb } from '@archui/react';

export default function Example() {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile', href: '/settings/profile' },
  ];

  return (
    <GlassBreadcrumb items={items} separator="slash" />
  );
}`}
                    vueCode={`<script setup>
import { GlassBreadcrumb } from '@archui/vue';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Settings', href: '/settings' },
  { label: 'Profile', href: '/settings/profile' },
];
</script>

<template>
  <GlassBreadcrumb :items="items" separator="slash" />
</template>`}
                />
            </div>

            {/* Variants */}
            <div className="space-y-4">
                <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Variants
                </h2>
                <ComponentPreview
                    code={`<GlassBreadcrumb items={items} variant="default" />
<GlassBreadcrumb items={items} variant="glass" />
<GlassBreadcrumb items={items} variant="minimal" />`}
                    vueCode={`<GlassBreadcrumb :items="items" variant="default" />
<GlassBreadcrumb :items="items" variant="glass" />
<GlassBreadcrumb :items="items" variant="minimal" />`}
                >
                    <div className="flex flex-col gap-4">
                        <GlassBreadcrumb items={items} variant="default" />
                        <GlassBreadcrumb items={items} variant="glass" />
                        <GlassBreadcrumb items={items} variant="minimal" />
                    </div>
                </ComponentPreview>
            </div>

            {/* Separators */}
            <div className="space-y-4">
                <h2 id="separators" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Separators
                </h2>
                <ComponentPreview
                    code={`<GlassBreadcrumb items={items} separator="chevron" />
<GlassBreadcrumb items={items} separator="slash" />
<GlassBreadcrumb items={items} separator="arrow" />`}
                    vueCode={`<GlassBreadcrumb :items="items" separator="chevron" />
<GlassBreadcrumb :items="items" separator="slash" />
<GlassBreadcrumb :items="items" separator="arrow" />`}
                >
                    <div className="flex flex-col gap-4">
                        <GlassBreadcrumb items={items} separator="chevron" />
                        <GlassBreadcrumb items={items} separator="slash" />
                        <GlassBreadcrumb items={items} separator="arrow" />
                    </div>
                </ComponentPreview>
            </div>

            {/* Truncation */}
            <div className="space-y-4">
                <h2 id="truncation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Truncation
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                    Limit the number of visible items. The first item and last (N-2) items will be shown.
                </p>
                <ComponentPreview
                    code={`<GlassBreadcrumb items={longItems} maxItems={4} />`}
                    vueCode={`<GlassBreadcrumb :items="longItems" :max-items="4" />`}
                >
                    <div className="flex flex-col gap-4">
                        <GlassBreadcrumb items={longItems} maxItems={4} />
                    </div>
                </ComponentPreview>
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
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">BreadcrumbItem[]</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">required</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Array of items to display</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>variant</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default" | "glass" | "minimal"</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"default"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Visual style variant</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>separator</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"chevron" | "slash" | "arrow"</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"chevron"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Separator style</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>showHomeIcon</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">true</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Show home icon for the first item</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>maxItems</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">number</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">0</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Max items to show (0 = all)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
