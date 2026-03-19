import { useState } from 'react';
import { GlassProgress } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassProgressDocs() {
  const [progress, setProgress] = useState(45);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-progress" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Progress
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A progress bar component with multiple styles, colors, and animations for indicating completion status.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassProgress value={45} label="Progress" showValue />`}
          vueCode={`<template>
  <GlassProgress :value="45" label="Progress" showValue />
</template>`}
        >
          <div className="w-full max-w-md">
            <GlassProgress value={45} label="Progress" showValue />
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

      {/* Colors */}
      <div className="space-y-4">
        <h2 id="colors" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Colors
        </h2>
        <ComponentPreview 
          code={`<GlassProgress value={60} color="default" />
<GlassProgress value={60} color="primary" />
<GlassProgress value={60} color="success" />
<GlassProgress value={60} color="warning" />
<GlassProgress value={60} color="error" />
<GlassProgress value={60} color="gradient" />`}
          vueCode={`<GlassProgress :value="60" color="success" />`}
        >
          <div className="w-full max-w-md space-y-4">
            {(['default', 'primary', 'success', 'warning', 'error', 'gradient'] as const).map((color) => (
              <div key={color}>
                <p className="text-xs text-slate-500 mb-1.5">color="{color}"</p>
                <GlassProgress value={60} color={color} />
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
          code={`<GlassProgress value={70} size="xs" />
<GlassProgress value={70} size="sm" />
<GlassProgress value={70} size="md" />
<GlassProgress value={70} size="lg" />
<GlassProgress value={70} size="xl" />`}
          vueCode={`<GlassProgress :value="70" size="lg" />`}
        >
          <div className="w-full max-w-md space-y-4">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size}>
                <p className="text-xs text-slate-500 mb-1.5">size="{size}"</p>
                <GlassProgress value={70} size={size} color="primary" />
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Striped & Animated */}
      <div className="space-y-4">
        <h2 id="striped" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Striped & Animated
        </h2>
        <ComponentPreview 
          code={`<GlassProgress value={65} striped />
<GlassProgress value={65} striped animated />`}
          vueCode={`<GlassProgress :value="65" striped animated />`}
        >
          <div className="w-full max-w-md space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-1.5">striped</p>
              <GlassProgress value={65} color="primary" striped size="lg" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1.5">striped + animated</p>
              <GlassProgress value={65} color="success" striped animated size="lg" />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Indeterminate */}
      <div className="space-y-4">
        <h2 id="indeterminate" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Indeterminate
        </h2>
        <ComponentPreview 
          code={`<GlassProgress indeterminate label="Loading..." />`}
          vueCode={`<GlassProgress indeterminate label="Loading..." />`}
        >
          <div className="w-full max-w-md space-y-4">
            <GlassProgress indeterminate color="primary" label="Loading..." />
            <GlassProgress indeterminate color="gradient" />
          </div>
        </ComponentPreview>
      </div>

      {/* With Label */}
      <div className="space-y-4">
        <h2 id="label" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Label & Value
        </h2>
        <ComponentPreview 
          code={`<GlassProgress 
  value={75} 
  label="Upload Progress" 
  showValue 
/>`}
          vueCode={`<GlassProgress 
  :value="75" 
  label="Upload Progress" 
  showValue 
/>`}
        >
          <div className="w-full max-w-md space-y-4">
            <GlassProgress value={75} color="primary" label="Upload Progress" showValue />
            <GlassProgress value={42} color="success" label="Processing Files" showValue />
            <GlassProgress value={100} color="success" label="Download Complete" showValue />
          </div>
        </ComponentPreview>
      </div>

      {/* Glass Variant */}
      <div className="space-y-4">
        <h2 id="glass-variant" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Glass Variant
        </h2>
        <ComponentPreview 
          code={`<GlassProgress value={55} variant="glass" />`}
          vueCode={`<GlassProgress :value="55" variant="glass" />`}
        >
          <div className="w-full max-w-md p-6 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600">
            <GlassProgress value={55} variant="glass" color="default" label="Glass Style" showValue size="lg" />
          </div>
        </ComponentPreview>
      </div>

      {/* Interactive */}
      <div className="space-y-4">
        <h2 id="interactive" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Interactive Example
        </h2>
        <ComponentPreview 
          code={`const [progress, setProgress] = useState(0);

<GlassProgress value={progress} showValue />
<button onClick={() => setProgress(p => Math.min(100, p + 10))}>
  Increase
</button>`}
          vueCode={`<GlassProgress :value="progress" showValue />`}
        >
          <div className="w-full max-w-md space-y-4">
            <GlassProgress value={progress} color="gradient" animated label="Progress" showValue size="lg" />
            <div className="flex gap-2">
              <button 
                onClick={() => setProgress(p => Math.max(0, p - 10))}
                className="px-3 py-1.5 text-sm bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                -10%
              </button>
              <button 
                onClick={() => setProgress(p => Math.min(100, p + 10))}
                className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                +10%
              </button>
              <button 
                onClick={() => setProgress(0)}
                className="px-3 py-1.5 text-sm bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
              >
                Reset
              </button>
            </div>
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
                <td className="py-3 font-mono text-xs">value</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3 font-mono text-xs">0</td>
                <td className="py-3">Current progress value</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">max</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3 font-mono text-xs">100</td>
                <td className="py-3">Maximum value</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">color</td>
                <td className="py-3 font-mono text-xs">'default' | 'primary' | 'success' | 'warning' | 'error' | 'gradient'</td>
                <td className="py-3 font-mono text-xs">'primary'</td>
                <td className="py-3">Progress bar color</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">size</td>
                <td className="py-3 font-mono text-xs">'xs' | 'sm' | 'md' | 'lg' | 'xl'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Height of progress bar</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">variant</td>
                <td className="py-3 font-mono text-xs">'default' | 'glass'</td>
                <td className="py-3 font-mono text-xs">'default'</td>
                <td className="py-3">Visual style variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">striped</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">false</td>
                <td className="py-3">Show stripe pattern</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">animated</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">false</td>
                <td className="py-3">Animate stripes/gradient</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">indeterminate</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">false</td>
                <td className="py-3">Show indeterminate animation</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">label</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Label text above bar</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">showValue</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">false</td>
                <td className="py-3">Show percentage value</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
