import { GlassSeparator } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSeparatorDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-separator" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Separator
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A visual divider component with multiple style variants for separating content sections.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<div>
  <p>Content above</p>
  <GlassSeparator />
  <p>Content below</p>
</div>`}
          vueCode={`<template>
  <div>
    <p>Content above</p>
    <GlassSeparator />
    <p>Content below</p>
  </div>
</template>`}
        >
          <div className="w-full max-w-md space-y-4">
            <p className="text-slate-700 dark:text-slate-300">Content above the separator</p>
            <GlassSeparator />
            <p className="text-slate-700 dark:text-slate-300">Content below the separator</p>
          </div>
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock 
          code={`npm install @archui/react`}
          vueCode={`npm install @archui/vue`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassSeparator variant="solid" />
<GlassSeparator variant="dashed" />
<GlassSeparator variant="dotted" />
<GlassSeparator variant="gradient" />
<GlassSeparator variant="glow" />`}
          vueCode={`<GlassSeparator variant="solid" />
<GlassSeparator variant="gradient" />`}
        >
          <div className="w-full max-w-md space-y-6">
            {(['solid', 'dashed', 'dotted', 'gradient', 'glow'] as const).map((variant) => (
              <div key={variant}>
                <p className="text-xs text-slate-500 mb-2">variant="{variant}"</p>
                <GlassSeparator variant={variant} />
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Vertical Orientation */}
      <div className="space-y-4">
        <h2 id="orientation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Orientation
        </h2>
        <ComponentPreview 
          code={`<div className="flex items-center gap-4 h-10">
  <span>Item 1</span>
  <GlassSeparator orientation="vertical" />
  <span>Item 2</span>
  <GlassSeparator orientation="vertical" />
  <span>Item 3</span>
</div>`}
          vueCode={`<div class="flex items-center gap-4 h-10">
  <span>Item 1</span>
  <GlassSeparator orientation="vertical" />
  <span>Item 2</span>
</div>`}
        >
          <div className="flex items-center gap-4 h-10">
            <span className="text-slate-700 dark:text-slate-300">Item 1</span>
            <GlassSeparator orientation="vertical" />
            <span className="text-slate-700 dark:text-slate-300">Item 2</span>
            <GlassSeparator orientation="vertical" />
            <span className="text-slate-700 dark:text-slate-300">Item 3</span>
          </div>
        </ComponentPreview>
      </div>

      {/* With Label */}
      <div className="space-y-4">
        <h2 id="labeled" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Label
        </h2>
        <ComponentPreview 
          code={`<GlassSeparator label="OR" />
<GlassSeparator label="Continue with" />`}
          vueCode={`<GlassSeparator label="OR" />`}
        >
          <div className="w-full max-w-md space-y-6">
            <GlassSeparator label="OR" />
            <GlassSeparator label="Continue with" />
          </div>
        </ComponentPreview>
      </div>

      {/* Spacing */}
      <div className="space-y-4">
        <h2 id="spacing" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Spacing
        </h2>
        <ComponentPreview 
          code={`<GlassSeparator spacing="none" />
<GlassSeparator spacing="sm" />
<GlassSeparator spacing="md" />
<GlassSeparator spacing="lg" />
<GlassSeparator spacing="xl" />`}
          vueCode={`<GlassSeparator spacing="lg" />`}
        >
          <div className="w-full max-w-md">
            {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((spacing) => (
              <div key={spacing} className="bg-slate-100 dark:bg-slate-800 rounded p-2 mb-3">
                <p className="text-xs text-slate-500 mb-1">spacing="{spacing}"</p>
                <GlassSeparator spacing={spacing} />
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Default</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">orientation</td>
                <td className="py-3 font-mono text-xs">'horizontal' | 'vertical'</td>
                <td className="py-3 font-mono text-xs">'horizontal'</td>
                <td className="py-3">Separator direction</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">variant</td>
                <td className="py-3 font-mono text-xs">'solid' | 'dashed' | 'dotted' | 'gradient' | 'glow'</td>
                <td className="py-3 font-mono text-xs">'solid'</td>
                <td className="py-3">Visual style</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">spacing</td>
                <td className="py-3 font-mono text-xs">'none' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Margin around separator</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">label</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Centered text label</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
