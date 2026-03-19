import { HStack, VStack } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';


export function GlassStackDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-stack" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Stack
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A flexible layout component for arranging items in a row or column with configurable spacing and alignment.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`<HStack gap="md">
  <div className="p-4 bg-blue-500 rounded-lg text-white">Item 1</div>
  <div className="p-4 bg-blue-500 rounded-lg text-white">Item 2</div>
  <div className="p-4 bg-blue-500 rounded-lg text-white">Item 3</div>
</HStack>`}
          vueCode={`<template>
  <HStack gap="md">
    <div class="p-4 bg-blue-500 rounded-lg text-white">Item 1</div>
    <div class="p-4 bg-blue-500 rounded-lg text-white">Item 2</div>
    <div class="p-4 bg-blue-500 rounded-lg text-white">Item 3</div>
  </HStack>
</template>`}
        >
          <HStack gap="md">
            <div className="p-4 bg-blue-500 rounded-lg text-white font-medium">Item 1</div>
            <div className="p-4 bg-blue-500 rounded-lg text-white font-medium">Item 2</div>
            <div className="p-4 bg-blue-500 rounded-lg text-white font-medium">Item 3</div>
          </HStack>
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
          code={`import { GlassStack, HStack, VStack } from '@archui/react';

// Use GlassStack with direction
<GlassStack direction="row" gap="lg">
  <Button>First</Button>
  <Button>Second</Button>
</GlassStack>

// Or use convenience components
<HStack gap="md">...</HStack>
<VStack gap="md">...</VStack>`}
          vueCode={`<script setup>
import { GlassStack, HStack, VStack } from '@archui/vue';
</script>

<template>
  <HStack gap="md">
    <Button>First</Button>
    <Button>Second</Button>
  </HStack>
</template>`}
        />
      </div>

      {/* Direction */}
      <div className="space-y-4">
        <h2 id="direction" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Direction
        </h2>
        <ComponentPreview
          code={`// Horizontal (HStack)
<HStack gap="md">
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</HStack>

// Vertical (VStack)
<VStack gap="md">
  <Box>1</Box>
  <Box>2</Box>
  <Box>3</Box>
</VStack>`}
          vueCode={`<HStack gap="md">...</HStack>
<VStack gap="md">...</VStack>`}
        >
          <div className="flex gap-12">
            <div>
              <p className="text-sm text-slate-500 mb-3">HStack (Horizontal)</p>
              <HStack gap="md">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">2</div>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">3</div>
              </HStack>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-3">VStack (Vertical)</p>
              <VStack gap="md">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">2</div>
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-bold">3</div>
              </VStack>
            </div>
          </div>
        </ComponentPreview>
      </div>

      {/* Gap Sizes */}
      <div className="space-y-4">
        <h2 id="gap" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Gap Sizes
        </h2>
        <ComponentPreview
          code={`<HStack gap="xs">...</HStack>
<HStack gap="sm">...</HStack>
<HStack gap="md">...</HStack>
<HStack gap="lg">...</HStack>
<HStack gap="xl">...</HStack>`}
          vueCode={`<HStack gap="xs">...</HStack>
<HStack gap="lg">...</HStack>`}
        >
          <VStack gap="lg" align="stretch" className="w-full">
            {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((gap) => (
              <div key={gap}>
                <p className="text-xs text-slate-500 mb-2">gap="{gap}"</p>
                <HStack gap={gap}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-amber-500 rounded" />
                  ))}
                </HStack>
              </div>
            ))}
          </VStack>
        </ComponentPreview>
      </div>

      {/* Alignment */}
      <div className="space-y-4">
        <h2 id="alignment" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Alignment
        </h2>
        <ComponentPreview
          code={`<HStack align="start">...</HStack>
<HStack align="center">...</HStack>
<HStack align="end">...</HStack>
<HStack justify="between">...</HStack>`}
          vueCode={`<HStack align="center" justify="between">...</HStack>`}
        >
          <VStack gap="lg" className="w-full">
            {(['start', 'center', 'end'] as const).map((align) => (
              <div key={align} className="w-full">
                <p className="text-xs text-slate-500 mb-2">align="{align}"</p>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 h-20">
                  <HStack gap="md" align={align} className="h-full">
                    <div className="w-8 h-8 bg-rose-500 rounded" />
                    <div className="w-8 h-12 bg-rose-500 rounded" />
                    <div className="w-8 h-6 bg-rose-500 rounded" />
                  </HStack>
                </div>
              </div>
            ))}
          </VStack>
        </ComponentPreview>
      </div>

      {/* With Divider */}
      <div className="space-y-4">
        <h2 id="divider" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Divider
        </h2>
        <ComponentPreview
          code={`<HStack 
  gap="md" 
  divider={<div className="w-px h-4 bg-slate-300" />}
>
  <span>Home</span>
  <span>About</span>
  <span>Contact</span>
</HStack>`}
          vueCode={`<HStack gap="md" :divider="DividerComponent">
  <span>Home</span>
  <span>About</span>
</HStack>`}
        >
          <HStack
            gap="md"
            align="center"
            divider={<div className="w-px h-4 bg-slate-300 dark:bg-slate-600" />}
          >
            <span className="text-slate-700 dark:text-slate-300">Home</span>
            <span className="text-slate-700 dark:text-slate-300">About</span>
            <span className="text-slate-700 dark:text-slate-300">Contact</span>
          </HStack>
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
                <td className="py-3 font-mono text-xs">direction</td>
                <td className="py-3 font-mono text-xs">'row' | 'column' | 'row-reverse' | 'column-reverse'</td>
                <td className="py-3 font-mono text-xs">'row'</td>
                <td className="py-3">Stack direction</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">gap</td>
                <td className="py-3 font-mono text-xs">'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Gap between items</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">align</td>
                <td className="py-3 font-mono text-xs">'start' | 'center' | 'end' | 'stretch' | 'baseline'</td>
                <td className="py-3 font-mono text-xs">'stretch'</td>
                <td className="py-3">Align items on cross axis</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">justify</td>
                <td className="py-3 font-mono text-xs">'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'</td>
                <td className="py-3 font-mono text-xs">'start'</td>
                <td className="py-3">Justify content on main axis</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">wrap</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">false</td>
                <td className="py-3">Allow items to wrap</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">divider</td>
                <td className="py-3 font-mono text-xs">ReactNode</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Element to insert between children</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
