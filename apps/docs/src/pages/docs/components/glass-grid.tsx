import { GlassGrid, GlassGridItem } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassGridDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-grid" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Grid
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A CSS Grid-based layout component with responsive column support and item spanning.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassGrid cols={3} gap="md">
  <div className="p-4 bg-blue-500 rounded-lg">1</div>
  <div className="p-4 bg-blue-500 rounded-lg">2</div>
  <div className="p-4 bg-blue-500 rounded-lg">3</div>
  <div className="p-4 bg-blue-500 rounded-lg">4</div>
  <div className="p-4 bg-blue-500 rounded-lg">5</div>
  <div className="p-4 bg-blue-500 rounded-lg">6</div>
</GlassGrid>`}
          vueCode={`<template>
  <GlassGrid :cols="3" gap="md">
    <div class="p-4 bg-blue-500 rounded-lg">1</div>
    <!-- more items -->
  </GlassGrid>
</template>`}
        >
          <GlassGrid cols={3} gap="md" className="w-full">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="p-4 bg-blue-500 rounded-lg text-white font-bold text-center">
                {i}
              </div>
            ))}
          </GlassGrid>
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

      {/* Column Variants */}
      <div className="space-y-4">
        <h2 id="columns" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Columns
        </h2>
        <ComponentPreview 
          code={`<GlassGrid cols={2}>2 columns</GlassGrid>
<GlassGrid cols={3}>3 columns</GlassGrid>
<GlassGrid cols={4}>4 columns</GlassGrid>`}
          vueCode={`<GlassGrid :cols="3">3 columns</GlassGrid>`}
        >
          <div className="space-y-6 w-full">
            {[2, 3, 4].map((cols) => (
              <div key={cols}>
                <p className="text-xs text-slate-500 mb-2">cols={cols}</p>
                <GlassGrid cols={cols as 2 | 3 | 4} gap="sm">
                  {Array.from({ length: cols * 2 }).map((_, i) => (
                    <div key={i} className="p-3 bg-purple-500 rounded-lg text-white text-center text-sm font-medium">
                      {i + 1}
                    </div>
                  ))}
                </GlassGrid>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Spanning */}
      <div className="space-y-4">
        <h2 id="spanning" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Spanning Columns & Rows
        </h2>
        <ComponentPreview 
          code={`<GlassGrid cols={4} gap="md">
  <GlassGridItem colSpan={2}>Span 2 cols</GlassGridItem>
  <GlassGridItem>1</GlassGridItem>
  <GlassGridItem>2</GlassGridItem>
  <GlassGridItem rowSpan={2}>Span 2 rows</GlassGridItem>
  <GlassGridItem colSpan={3}>Span 3 cols</GlassGridItem>
</GlassGrid>`}
          vueCode={`<GlassGrid :cols="4" gap="md">
  <GlassGridItem :colSpan="2">Span 2</GlassGridItem>
</GlassGrid>`}
        >
          <GlassGrid cols={4} gap="md" className="w-full">
            <GlassGridItem colSpan={2} className="p-4 bg-emerald-500 rounded-lg text-white font-medium text-center">
              Span 2 cols
            </GlassGridItem>
            <GlassGridItem className="p-4 bg-emerald-600 rounded-lg text-white font-medium text-center">
              1
            </GlassGridItem>
            <GlassGridItem className="p-4 bg-emerald-600 rounded-lg text-white font-medium text-center">
              2
            </GlassGridItem>
            <GlassGridItem rowSpan={2} className="p-4 bg-amber-500 rounded-lg text-white font-medium text-center flex items-center justify-center">
              Span 2 rows
            </GlassGridItem>
            <GlassGridItem colSpan={3} className="p-4 bg-rose-500 rounded-lg text-white font-medium text-center">
              Span 3 cols
            </GlassGridItem>
          </GlassGrid>
        </ComponentPreview>
      </div>

      {/* Gap Sizes */}
      <div className="space-y-4">
        <h2 id="gap" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Gap Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassGrid cols={4} gap="xs">xs gap</GlassGrid>
<GlassGrid cols={4} gap="md">md gap</GlassGrid>
<GlassGrid cols={4} gap="xl">xl gap</GlassGrid>`}
          vueCode={`<GlassGrid :cols="4" gap="md">...</GlassGrid>`}
        >
          <div className="space-y-6 w-full">
            {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
              <div key={gap}>
                <p className="text-xs text-slate-500 mb-2">gap="{gap}"</p>
                <GlassGrid cols={6} gap={gap}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="p-2 bg-cyan-500 rounded text-white text-center text-xs font-medium">
                      {i}
                    </div>
                  ))}
                </GlassGrid>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Dashboard Example */}
      <div className="space-y-4">
        <h2 id="example" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Dashboard Example
        </h2>
        <ComponentPreview 
          code={`<GlassGrid cols={4} gap="lg">
  <GlassGridItem colSpan={2} rowSpan={2}>
    <Card>Large Widget</Card>
  </GlassGridItem>
  <GlassGridItem><Card>Small 1</Card></GlassGridItem>
  <GlassGridItem><Card>Small 2</Card></GlassGridItem>
  <GlassGridItem><Card>Small 3</Card></GlassGridItem>
  <GlassGridItem><Card>Small 4</Card></GlassGridItem>
</GlassGrid>`}
          vueCode={`<!-- Dashboard layout example -->`}
        >
          <GlassGrid cols={4} gap="lg" className="w-full">
            <GlassGridItem colSpan={2} rowSpan={2}>
              <div className="h-full min-h-[180px] p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white flex flex-col justify-between">
                <div className="text-sm opacity-80">Revenue</div>
                <div className="text-3xl font-bold">$24,500</div>
                <div className="text-sm opacity-80">+12.5% from last month</div>
              </div>
            </GlassGridItem>
            <GlassGridItem>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl h-full">
                <div className="text-xs text-slate-500">Users</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">1,234</div>
              </div>
            </GlassGridItem>
            <GlassGridItem>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl h-full">
                <div className="text-xs text-slate-500">Orders</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">456</div>
              </div>
            </GlassGridItem>
            <GlassGridItem>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl h-full">
                <div className="text-xs text-slate-500">Products</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">89</div>
              </div>
            </GlassGridItem>
            <GlassGridItem>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl h-full">
                <div className="text-xs text-slate-500">Reviews</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">234</div>
              </div>
            </GlassGridItem>
          </GlassGrid>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 className="font-semibold text-[hsl(var(--foreground))]">GlassGrid</h3>
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
                <td className="py-3 font-mono text-xs">cols</td>
                <td className="py-3 font-mono text-xs">1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'</td>
                <td className="py-3 font-mono text-xs">1</td>
                <td className="py-3">Number of columns</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">gap</td>
                <td className="py-3 font-mono text-xs">'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Gap between grid items</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">align</td>
                <td className="py-3 font-mono text-xs">'start' | 'center' | 'end' | 'stretch'</td>
                <td className="py-3 font-mono text-xs">'stretch'</td>
                <td className="py-3">Align items vertically</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-6">GlassGridItem</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">colSpan</td>
                <td className="py-3 font-mono text-xs">1-12 | 'full'</td>
                <td className="py-3">Number of columns to span</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">rowSpan</td>
                <td className="py-3 font-mono text-xs">1-6 | 'full'</td>
                <td className="py-3">Number of rows to span</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">colStart</td>
                <td className="py-3 font-mono text-xs">1-13 | 'auto'</td>
                <td className="py-3">Starting column position</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">rowStart</td>
                <td className="py-3 font-mono text-xs">1-7 | 'auto'</td>
                <td className="py-3">Starting row position</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
