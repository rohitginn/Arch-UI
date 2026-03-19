import { GlassSpinner, GlassLoadingOverlay, GlassButtonSpinner } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSpinnerDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-spinner" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Spinner
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Loading spinner components with multiple animation styles for indicating processing states.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassSpinner size="lg" color="primary" />`}
          vueCode={`<template>
  <GlassSpinner size="lg" color="primary" />
</template>`}
        >
          <GlassSpinner size="lg" color="primary" />
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
          Animation Variants
        </h2>
        <ComponentPreview 
          code={`<GlassSpinner variant="ring" />
<GlassSpinner variant="dots" />
<GlassSpinner variant="pulse" />
<GlassSpinner variant="bars" />
<GlassSpinner variant="orbit" />`}
          vueCode={`<GlassSpinner variant="ring" />`}
        >
          <div className="flex items-center gap-12">
            {(['ring', 'dots', 'pulse', 'bars'] as const).map((variant) => (
              <div key={variant} className="text-center">
                <div className="h-16 flex items-center justify-center">
                  <GlassSpinner variant={variant} size="lg" color="primary" />
                </div>
                <p className="text-xs text-slate-500 mt-2">{variant}</p>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassSpinner size="xs" />
<GlassSpinner size="sm" />
<GlassSpinner size="md" />
<GlassSpinner size="lg" />
<GlassSpinner size="xl" />`}
          vueCode={`<GlassSpinner size="lg" />`}
        >
          <div className="flex items-end gap-8">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size} className="text-center">
                <GlassSpinner size={size} color="primary" />
                <p className="text-xs text-slate-500 mt-2">{size}</p>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <h2 id="colors" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Colors
        </h2>
        <ComponentPreview 
          code={`<GlassSpinner color="default" />
<GlassSpinner color="primary" />
<GlassSpinner color="white" />
<GlassSpinner color="current" />`}
          vueCode={`<GlassSpinner color="primary" />`}
        >
          <div className="flex items-center gap-8">
            <div className="text-center">
              <GlassSpinner size="lg" color="default" />
              <p className="text-xs text-slate-500 mt-2">default</p>
            </div>
            <div className="text-center">
              <GlassSpinner size="lg" color="primary" />
              <p className="text-xs text-slate-500 mt-2">primary</p>
            </div>
            <div className="text-center p-4 bg-slate-800 rounded-lg">
              <GlassSpinner size="lg" color="white" />
              <p className="text-xs text-slate-400 mt-2">white</p>
            </div>
            <div className="text-center text-purple-500">
              <GlassSpinner size="lg" color="current" />
              <p className="text-xs text-slate-500 mt-2">current</p>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Button Spinner */}
      <div className="space-y-4">
        <h2 id="button-spinner" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Button Spinner
        </h2>
        <ComponentPreview 
          code={`<button disabled className="flex items-center gap-2">
  <GlassButtonSpinner />
  Loading...
</button>`}
          vueCode={`<button disabled class="flex items-center gap-2">
  <GlassButtonSpinner />
  Loading...
</button>`}
        >
          <div className="flex gap-4">
            <button 
              disabled 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg opacity-80 cursor-not-allowed"
            >
              <GlassButtonSpinner size="sm" />
              Loading...
            </button>
            <button 
              disabled 
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg opacity-80 cursor-not-allowed"
            >
              <GlassButtonSpinner size="sm" />
              Saving
            </button>
            <button 
              disabled 
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg opacity-80 cursor-not-allowed"
            >
              <GlassButtonSpinner size="sm" className="text-slate-600 dark:text-slate-400" />
              Processing
            </button>
          </div>
        </ComponentPreview>
      </div>

      {/* Loading Overlay */}
      <div className="space-y-4">
        <h2 id="loading-overlay" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Loading Overlay
        </h2>
        <ComponentPreview 
          code={`<div className="relative">
  <div>Content underneath</div>
  <GlassLoadingOverlay visible message="Loading data..." />
</div>`}
          vueCode={`<div class="relative">
  <div>Content underneath</div>
  <GlassLoadingOverlay visible message="Loading data..." />
</div>`}
        >
          <div className="relative w-full max-w-md h-48 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="p-4 space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
              <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
            <GlassLoadingOverlay visible message="Loading data..." />
          </div>
        </ComponentPreview>
      </div>

      {/* Overlay Variants */}
      <div className="space-y-4">
        <h2 id="overlay-variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Overlay Variants
        </h2>
        <ComponentPreview 
          code={`// With blur
<GlassLoadingOverlay visible blur />

// Without blur
<GlassLoadingOverlay visible blur={false} />`}
          vueCode={`<GlassLoadingOverlay visible :blur="true" />`}
        >
          <div className="flex gap-6">
            <div className="relative w-48 h-32 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <div className="p-3 text-sm text-slate-600 dark:text-slate-300">
                Content with blur overlay
              </div>
              <GlassLoadingOverlay visible blur />
            </div>
            <div className="relative w-48 h-32 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <div className="p-3 text-sm text-slate-600 dark:text-slate-300">
                Content without blur
              </div>
              <GlassLoadingOverlay visible blur={false} />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Accessibility
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          All spinners include proper ARIA attributes and screen reader text:
        </p>
        <CodeBlock 
          code={`// Custom screen reader label
<GlassSpinner label="Loading user profile..." />

// Default label is "Loading..."
<GlassSpinner />`}
          vueCode={`<GlassSpinner label="Loading user profile..." />`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 className="font-semibold text-[hsl(var(--foreground))]">GlassSpinner</h3>
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
                <td className="py-3 font-mono text-xs">variant</td>
                <td className="py-3 font-mono text-xs">'ring' | 'dots' | 'pulse' | 'bars' | 'orbit'</td>
                <td className="py-3 font-mono text-xs">'ring'</td>
                <td className="py-3">Animation style</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">size</td>
                <td className="py-3 font-mono text-xs">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Spinner size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">color</td>
                <td className="py-3 font-mono text-xs">'default' | 'primary' | 'white' | 'current'</td>
                <td className="py-3 font-mono text-xs">'primary'</td>
                <td className="py-3">Spinner color</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">label</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">'Loading...'</td>
                <td className="py-3">Screen reader text</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-6">GlassLoadingOverlay</h3>
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
                <td className="py-3 font-mono text-xs">visible</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">true</td>
                <td className="py-3">Show/hide overlay</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">blur</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">true</td>
                <td className="py-3">Apply backdrop blur</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">message</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Text below spinner</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">spinnerProps</td>
                <td className="py-3 font-mono text-xs">GlassSpinnerProps</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Props for inner spinner</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
