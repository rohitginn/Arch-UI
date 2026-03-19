import { GlassContainer } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassContainerDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-container" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Container
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A responsive container component with configurable max-width and padding variants for consistent layouts.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassContainer size="lg" padding="lg">
  <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
    Content within a container
  </div>
</GlassContainer>`}
          vueCode={`<template>
  <GlassContainer size="lg" padding="lg">
    <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
      Content within a container
    </div>
  </GlassContainer>
</template>`}
        >
          <div className="w-full">
            <GlassContainer size="lg" padding="lg">
              <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-slate-700 dark:text-slate-300">
                Content within a container (max-width: 1024px)
              </div>
            </GlassContainer>
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

      {/* Usage */}
      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassContainer } from '@archui/react';

export default function Page() {
  return (
    <GlassContainer size="xl" padding="md" center>
      <h1>Page Title</h1>
      <p>Page content goes here...</p>
    </GlassContainer>
  );
}`}
          vueCode={`<script setup>
import { GlassContainer } from '@archui/vue';
</script>

<template>
  <GlassContainer size="xl" padding="md" center>
    <h1>Page Title</h1>
    <p>Page content goes here...</p>
  </GlassContainer>
</template>`}
        />
      </div>

      {/* Size Variants */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Size Variants
        </h2>
        <ComponentPreview 
          code={`<GlassContainer size="sm">Small (640px)</GlassContainer>
<GlassContainer size="md">Medium (768px)</GlassContainer>
<GlassContainer size="lg">Large (1024px)</GlassContainer>
<GlassContainer size="xl">Extra Large (1280px)</GlassContainer>
<GlassContainer size="2xl">2XL (1536px)</GlassContainer>
<GlassContainer size="full">Full Width</GlassContainer>
<GlassContainer size="prose">Prose (65ch)</GlassContainer>`}
          vueCode={`<GlassContainer size="sm">Small (640px)</GlassContainer>
<GlassContainer size="md">Medium (768px)</GlassContainer>
<GlassContainer size="lg">Large (1024px)</GlassContainer>`}
        >
          <div className="w-full space-y-3">
            {(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((size) => (
              <GlassContainer key={size} size={size} center>
                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 p-3 rounded-lg text-sm text-center">
                  {size.toUpperCase()} Container
                </div>
              </GlassContainer>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Padding Variants */}
      <div className="space-y-4">
        <h2 id="padding" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Padding Variants
        </h2>
        <ComponentPreview 
          code={`<GlassContainer padding="none">No padding</GlassContainer>
<GlassContainer padding="sm">Small padding</GlassContainer>
<GlassContainer padding="md">Medium padding</GlassContainer>
<GlassContainer padding="lg">Large padding</GlassContainer>
<GlassContainer padding="xl">Extra large padding</GlassContainer>`}
          vueCode={`<GlassContainer padding="none">No padding</GlassContainer>
<GlassContainer padding="lg">Large padding</GlassContainer>`}
        >
          <div className="w-full space-y-3">
            {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((p) => (
              <GlassContainer key={p} size="full" padding={p}>
                <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 p-3 rounded-lg text-sm">
                  Padding: {p}
                </div>
              </GlassContainer>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Polymorphic */}
      <div className="space-y-4">
        <h2 id="polymorphic" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Polymorphic Rendering
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          The Container supports semantic HTML elements via the <code className="text-sm bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">as</code> prop.
        </p>
        <CodeBlock 
          code={`<GlassContainer as="main" size="xl">
  <h1>Main Content</h1>
</GlassContainer>

<GlassContainer as="section" size="lg">
  <h2>Section Content</h2>
</GlassContainer>

<GlassContainer as="article" size="prose">
  <p>Article content...</p>
</GlassContainer>`}
          vueCode={`<GlassContainer as="main" size="xl">
  <h1>Main Content</h1>
</GlassContainer>`}
        />
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
                <td className="py-3 font-mono text-xs">size</td>
                <td className="py-3 font-mono text-xs">'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'prose'</td>
                <td className="py-3 font-mono text-xs">'2xl'</td>
                <td className="py-3">Maximum width of the container</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">padding</td>
                <td className="py-3 font-mono text-xs">'none' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Horizontal padding</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">center</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">true</td>
                <td className="py-3">Center the container horizontally</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">as</td>
                <td className="py-3 font-mono text-xs">'div' | 'section' | 'main' | 'article'</td>
                <td className="py-3 font-mono text-xs">'div'</td>
                <td className="py-3">HTML element to render</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
