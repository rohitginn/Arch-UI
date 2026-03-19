import { useState } from 'react';
import { GlassModal, GlassButton } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassModalDocs() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-modal" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Modal
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A modal dialog component with glassmorphic overlay and smooth animations.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`const [open, setOpen] = useState(false);

<GlassButton onClick={() => setOpen(true)}>Open Modal</GlassButton>

<GlassModal 
  open={open} 
  onOpenChange={setOpen}
  title="Modal Title"
  description="This is a modal description"
  footer={
    <div className="flex gap-2">
      <GlassButton variant="ghost" onClick={() => setOpen(false)}>Cancel</GlassButton>
      <GlassButton variant="primary" onClick={() => setOpen(false)}>Confirm</GlassButton>
    </div>
  }
>
  <p>This is the modal content.</p>
</GlassModal>`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassButton, GlassModal } from '@archui/vue';

const open = ref(false);
</script>

<template>
  <GlassButton @click="open = true">Open Modal</GlassButton>

  <GlassModal 
    :open="open" 
    @update:open="open = $event"
    title="Modal Title"
    description="This is a modal description"
  >
    <p>This is the modal content.</p>
    
    <template #footer>
      <div class="flex gap-2">
        <GlassButton variant="ghost" @click="open = false">Cancel</GlassButton>
        <GlassButton variant="primary" @click="open = false">Confirm</GlassButton>
      </div>
    </template>
  </GlassModal>
</template>`}
        >
          <div>
            <GlassButton onClick={() => setOpen(true)}>Open Modal</GlassButton>
            <GlassModal 
              open={open} 
              onOpenChange={setOpen}
              title="Modal Title"
              description="This is a modal description"
              footer={
                <div className="flex gap-2 justify-end">
                  <GlassButton variant="ghost" onClick={() => setOpen(false)}>Cancel</GlassButton>
                  <GlassButton variant="primary" onClick={() => setOpen(false)}>Confirm</GlassButton>
                </div>
              }
            >
              <p className="text-white/80">
                This is the modal content. You can put any content here.
              </p>
            </GlassModal>
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
          code={`import { GlassModal, GlassModalContent, GlassModalHeader, GlassModalFooter } from '@archui/react';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      
      <GlassModal open={open} onOpenChange={setOpen}>
        <GlassModalContent>
          <GlassModalHeader>
            <h2>Modal Title</h2>
            <p>Modal description goes here</p>
          </GlassModalHeader>
          
          <div>Modal content...</div>
          
          <GlassModalFooter>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button>Confirm</button>
          </GlassModalFooter>
        </GlassModalContent>
      </GlassModal>
    </>
  );
}`}
          vueCode={`<script setup>
import { ref } from 'vue';
import { GlassModal, GlassModalContent, GlassModalHeader, GlassModalFooter } from '@archui/vue';

const open = ref(false);
</script>

<template>
  <button @click="open = true">Open Modal</button>
  
  <GlassModal :open="open" @update:open="open = $event">
    <GlassModalContent>
      <GlassModalHeader>
        <h2>Modal Title</h2>
        <p>Modal description goes here</p>
      </GlassModalHeader>
      
      <div>Modal content...</div>
      
      <GlassModalFooter>
        <button @click="open = false">Cancel</button>
        <button>Confirm</button>
      </GlassModalFooter>
    </GlassModalContent>
  </GlassModal>
</template>`}
        />
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <CodeBlock 
          code={`// Small modal
<GlassModalContent size="sm">...</GlassModalContent>

// Medium modal (default)
<GlassModalContent size="md">...</GlassModalContent>

// Large modal
<GlassModalContent size="lg">...</GlassModalContent>

// Extra large modal
<GlassModalContent size="xl">...</GlassModalContent>

// Full screen modal
<GlassModalContent size="full">...</GlassModalContent>`}
          vueCode={`<!-- Small modal -->
<GlassModalContent size="sm">...</GlassModalContent>

<!-- Medium modal (default) -->
<GlassModalContent size="md">...</GlassModalContent>

<!-- Large modal -->
<GlassModalContent size="lg">...</GlassModalContent>

<!-- Extra large modal -->
<GlassModalContent size="xl">...</GlassModalContent>

<!-- Full screen modal -->
<GlassModalContent size="full">...</GlassModalContent>`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 id="modal-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassModal Props
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
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Callback when open state changes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 id="content-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassModalContent Props
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>size</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg" | "xl" | "full"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Modal size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>blur</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg" | "xl"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"lg"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Backdrop blur intensity</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Accessibility
        </h2>
        <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))]">
          <li>Focus is trapped within the modal when open</li>
          <li>Pressing <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">Escape</code> closes the modal</li>
          <li>Clicking outside the modal closes it</li>
          <li>Screen readers announce the modal content</li>
        </ul>
      </div>
    </div>
  );
}
