import { GlassSkeleton, GlassSkeletonText, GlassSkeletonAvatar, GlassSkeletonCard } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSkeletonDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-skeleton" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Skeleton
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Loading placeholder components with shimmer animations for content loading states.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassSkeleton width={200} height={20} />
<GlassSkeleton width="100%" height={100} rounded="lg" />`}
          vueCode={`<template>
  <GlassSkeleton :width="200" :height="20" />
</template>`}
        >
          <div className="w-full max-w-md space-y-4">
            <GlassSkeleton width={200} height={20} />
            <GlassSkeleton width="100%" height={100} rounded="lg" />
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

      {/* Animation Types */}
      <div className="space-y-4">
        <h2 id="animations" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Animation Types
        </h2>
        <ComponentPreview 
          code={`<GlassSkeleton animation="shimmer" />
<GlassSkeleton animation="pulse" />
<GlassSkeleton animation="wave" />
<GlassSkeleton animation="none" />`}
          vueCode={`<GlassSkeleton animation="shimmer" />`}
        >
          <div className="w-full max-w-md space-y-4">
            {(['shimmer', 'pulse', 'wave', 'none'] as const).map((animation) => (
              <div key={animation}>
                <p className="text-xs text-slate-500 mb-1.5">animation="{animation}"</p>
                <GlassSkeleton width="100%" height={40} animation={animation} rounded="lg" />
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Rounded Variants */}
      <div className="space-y-4">
        <h2 id="rounded" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Rounded Variants
        </h2>
        <ComponentPreview 
          code={`<GlassSkeleton rounded="none" />
<GlassSkeleton rounded="sm" />
<GlassSkeleton rounded="md" />
<GlassSkeleton rounded="lg" />
<GlassSkeleton rounded="xl" />
<GlassSkeleton rounded="full" />`}
          vueCode={`<GlassSkeleton rounded="full" />`}
        >
          <div className="flex gap-4 flex-wrap">
            {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((rounded) => (
              <div key={rounded} className="text-center">
                <GlassSkeleton 
                  width={rounded === 'full' ? 48 : 80} 
                  height={48} 
                  rounded={rounded} 
                />
                <p className="text-xs text-slate-500 mt-1">{rounded}</p>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Skeleton Text */}
      <div className="space-y-4">
        <h2 id="text" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Skeleton Text
        </h2>
        <ComponentPreview 
          code={`<GlassSkeletonText lines={3} />
<GlassSkeletonText lines={4} lastLineWidth="50%" />
<GlassSkeletonText lines={2} spacing="tight" />`}
          vueCode={`<GlassSkeletonText :lines="3" />`}
        >
          <div className="w-full max-w-md space-y-6">
            <div>
              <p className="text-xs text-slate-500 mb-2">3 lines (default)</p>
              <GlassSkeletonText lines={3} />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">4 lines, lastLineWidth="50%"</p>
              <GlassSkeletonText lines={4} lastLineWidth="50%" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">spacing="relaxed"</p>
              <GlassSkeletonText lines={3} spacing="relaxed" />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Skeleton Avatar */}
      <div className="space-y-4">
        <h2 id="avatar" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Skeleton Avatar
        </h2>
        <ComponentPreview 
          code={`<GlassSkeletonAvatar size="xs" />
<GlassSkeletonAvatar size="sm" />
<GlassSkeletonAvatar size="md" />
<GlassSkeletonAvatar size="lg" />
<GlassSkeletonAvatar size="xl" />`}
          vueCode={`<GlassSkeletonAvatar size="lg" />`}
        >
          <div className="flex items-center gap-4">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
              <div key={size} className="text-center">
                <GlassSkeletonAvatar size={size} />
                <p className="text-xs text-slate-500 mt-1">{size}</p>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Skeleton Card */}
      <div className="space-y-4">
        <h2 id="card" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Skeleton Card
        </h2>
        <ComponentPreview 
          code={`<GlassSkeletonCard />
<GlassSkeletonCard hasImage={false} />
<GlassSkeletonCard hasFooter />`}
          vueCode={`<GlassSkeletonCard :hasImage="true" :hasFooter="true" />`}
        >
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <p className="text-xs text-slate-500 mb-2">Default</p>
              <GlassSkeletonCard />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">With Footer</p>
              <GlassSkeletonCard hasFooter />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Practical Example */}
      <div className="space-y-4">
        <h2 id="example" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Practical Example
        </h2>
        <ComponentPreview 
          code={`// User Profile Skeleton
<div className="flex items-center gap-4">
  <GlassSkeletonAvatar size="lg" />
  <div className="flex-1">
    <GlassSkeleton height={20} width={150} />
    <GlassSkeleton height={16} width={100} className="mt-2" />
  </div>
</div>`}
          vueCode={`<!-- User Profile Skeleton -->`}
        >
          <div className="w-full max-w-md space-y-6">
            {/* User profile skeleton */}
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
              <p className="text-xs text-slate-500 mb-3">User Profile Loading</p>
              <div className="flex items-center gap-4">
                <GlassSkeletonAvatar size="lg" />
                <div className="flex-1">
                  <GlassSkeleton height={20} width={150} rounded="sm" />
                  <GlassSkeleton height={16} width={100} rounded="sm" className="mt-2" />
                </div>
              </div>
            </div>

            {/* Article skeleton */}
            <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
              <p className="text-xs text-slate-500 mb-3">Article Loading</p>
              <GlassSkeleton height={32} width="80%" rounded="sm" className="mb-4" />
              <div className="flex items-center gap-2 mb-4">
                <GlassSkeletonAvatar size="sm" />
                <GlassSkeleton height={14} width={100} rounded="sm" />
                <GlassSkeleton height={14} width={60} rounded="sm" />
              </div>
              <GlassSkeletonText lines={4} />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Glass Variant */}
      <div className="space-y-4">
        <h2 id="glass-variant" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Glass Variant
        </h2>
        <ComponentPreview 
          code={`<GlassSkeleton variant="glass" />`}
          vueCode={`<GlassSkeleton variant="glass" />`}
        >
          <div className="w-full p-6 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500">
            <div className="space-y-3">
              <GlassSkeleton variant="glass" width="60%" height={28} rounded="md" />
              <GlassSkeleton variant="glass" width="100%" height={16} rounded="sm" />
              <GlassSkeleton variant="glass" width="100%" height={16} rounded="sm" />
              <GlassSkeleton variant="glass" width="80%" height={16} rounded="sm" />
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 className="font-semibold text-[hsl(var(--foreground))]">GlassSkeleton</h3>
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
                <td className="py-3 font-mono text-xs">width</td>
                <td className="py-3 font-mono text-xs">string | number</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Width of skeleton</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">height</td>
                <td className="py-3 font-mono text-xs">string | number</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Height of skeleton</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">animation</td>
                <td className="py-3 font-mono text-xs">'pulse' | 'shimmer' | 'wave' | 'none'</td>
                <td className="py-3 font-mono text-xs">'shimmer'</td>
                <td className="py-3">Animation type</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">rounded</td>
                <td className="py-3 font-mono text-xs">'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Border radius</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">variant</td>
                <td className="py-3 font-mono text-xs">'default' | 'glass'</td>
                <td className="py-3 font-mono text-xs">'default'</td>
                <td className="py-3">Visual style variant</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-6">GlassSkeletonText</h3>
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
                <td className="py-3 font-mono text-xs">lines</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3 font-mono text-xs">3</td>
                <td className="py-3">Number of text lines</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">lastLineWidth</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">'70%'</td>
                <td className="py-3">Width of last line</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">spacing</td>
                <td className="py-3 font-mono text-xs">'tight' | 'normal' | 'relaxed'</td>
                <td className="py-3 font-mono text-xs">'normal'</td>
                <td className="py-3">Line spacing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
