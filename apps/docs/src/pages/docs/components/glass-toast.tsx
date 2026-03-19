import { GlassToast, GlassToastContainer, useGlassToast } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassToastDocs() {
  const { toasts, toast, removeToast } = useGlassToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-toast" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Toast
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Toast notification component for displaying temporary messages with auto-dismiss and multiple variants.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`const { toast } = useGlassToast();

<button onClick={() => toast.success('Changes saved!')}>
  Show Toast
</button>`}
          vueCode={`<template>
  <button @click="showToast">Show Toast</button>
</template>`}
        >
          <div className="flex gap-3">
            <button 
              onClick={() => toast.success({ title: 'Success!', description: 'Your changes have been saved.' })}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Success Toast
            </button>
            <button 
              onClick={() => toast.error({ title: 'Error!', description: 'Something went wrong.' })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Error Toast
            </button>
            <button 
              onClick={() => toast.info('This is an info message')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Info Toast
            </button>
          </div>
          <GlassToastContainer toasts={toasts} onRemove={removeToast} position="bottom-right" />
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
          code={`import { GlassToastContainer, useGlassToast } from '@archui/react';

function App() {
  const { toasts, toast, removeToast } = useGlassToast();

  return (
    <div>
      <button onClick={() => toast.success('Saved!')}>
        Save
      </button>

      {/* Add container at root level */}
      <GlassToastContainer 
        toasts={toasts} 
        onRemove={removeToast}
        position="bottom-right"
      />
    </div>
  );
}`}
          vueCode={`<script setup>
import { GlassToastContainer, useGlassToast } from '@archui/vue';

const { toasts, toast, removeToast } = useGlassToast();
</script>

<template>
  <button @click="toast.success('Saved!')">Save</button>
  <GlassToastContainer :toasts="toasts" @remove="removeToast" />
</template>`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassToast variant="default" title="Default" />
<GlassToast variant="success" title="Success" />
<GlassToast variant="error" title="Error" />
<GlassToast variant="warning" title="Warning" />
<GlassToast variant="info" title="Info" />
<GlassToast variant="glass" title="Glass" />`}
          vueCode={`<GlassToast variant="success" title="Success" />`}
        >
          <div className="w-full max-w-sm space-y-3">
            <GlassToast variant="default" title="Default" description="This is a default notification." closable={false} />
            <GlassToast variant="success" title="Success" description="Your operation completed successfully." closable={false} />
            <GlassToast variant="error" title="Error" description="There was an error processing your request." closable={false} />
            <GlassToast variant="warning" title="Warning" description="Please review before continuing." closable={false} />
            <GlassToast variant="info" title="Info" description="Here's some information for you." closable={false} />
          </div>
        </ComponentPreview>
      </div>

      {/* Glass Variant */}
      <div className="space-y-4">
        <h2 id="glass-variant" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Glass Variant
        </h2>
        <ComponentPreview 
          code={`<GlassToast variant="glass" title="Glass Toast" />`}
          vueCode={`<GlassToast variant="glass" title="Glass Toast" />`}
        >
          <div className="w-full max-w-sm p-6 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
            <GlassToast 
              variant="glass" 
              title="Glass Style" 
              description="A beautiful glassmorphic toast."
              closable={false}
            />
          </div>
        </ComponentPreview>
      </div>

      {/* With Action */}
      <div className="space-y-4">
        <h2 id="with-action" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Action
        </h2>
        <ComponentPreview 
          code={`<GlassToast 
  variant="info"
  title="Update Available"
  description="A new version is ready to install."
  action={
    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded">
      Update Now
    </button>
  }
/>`}
          vueCode={`<GlassToast variant="info" title="Update Available">
  <template #action>
    <button>Update Now</button>
  </template>
</GlassToast>`}
        >
          <div className="w-full max-w-sm">
            <GlassToast 
              variant="info"
              title="Update Available"
              description="A new version is ready to install."
              closable={false}
              action={
                <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">
                  Update Now
                </button>
              }
            />
          </div>
        </ComponentPreview>
      </div>

      {/* Auto Dismiss */}
      <div className="space-y-4">
        <h2 id="auto-dismiss" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Auto Dismiss
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Toasts can automatically dismiss after a specified duration. A progress bar shows the remaining time.
        </p>
        <ComponentPreview 
          code={`// Auto dismiss after 5 seconds
toast.success({ 
  title: 'Saved!',
  description: 'Your changes have been saved.',
  duration: 5000 
});

// Default duration from useGlassToast options
const { toast } = useGlassToast({ defaultDuration: 3000 });`}
          vueCode={`toast.success({ title: 'Saved!', duration: 5000 })`}
        >
          <div className="flex gap-3">
            <button 
              onClick={() => toast.success({ title: 'Auto Dismiss', description: 'This will disappear in 3 seconds', duration: 3000 })}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              3s Toast
            </button>
            <button 
              onClick={() => toast.info({ title: 'Longer Toast', description: 'This stays for 8 seconds', duration: 8000 })}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              8s Toast
            </button>
          </div>
        </ComponentPreview>
      </div>

      {/* Hook API */}
      <div className="space-y-4">
        <h2 id="hook-api" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Hook API
        </h2>
        <CodeBlock 
          code={`const { toasts, toast, removeToast } = useGlassToast({
  maxToasts: 5,        // Maximum visible toasts
  defaultDuration: 5000 // Default auto-dismiss time
});

// Convenience methods
toast.show('Message');           // Default toast
toast.success('Success!');       // Success toast
toast.error('Error!');           // Error toast  
toast.warning('Warning!');       // Warning toast
toast.info('Info');              // Info toast

// With full options
toast.show({
  title: 'Title',
  description: 'Description',
  variant: 'success',
  duration: 3000,
  closable: true,
});

// Dismiss toasts
toast.dismiss(toastId);  // Dismiss specific toast
toast.dismissAll();      // Dismiss all toasts`}
          vueCode={`const { toast } = useGlassToast();

toast.success('Success!');
toast.error('Error!');
toast.dismissAll();`}
        />
      </div>

      {/* Positions */}
      <div className="space-y-4">
        <h2 id="positions" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Container Positions
        </h2>
        <CodeBlock 
          code={`<GlassToastContainer position="top-left" />
<GlassToastContainer position="top-center" />
<GlassToastContainer position="top-right" />
<GlassToastContainer position="bottom-left" />
<GlassToastContainer position="bottom-center" />
<GlassToastContainer position="bottom-right" />`}
          vueCode={`<GlassToastContainer position="top-right" />`}
        />
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Position the toast container in any corner or center of the viewport. Default is <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">bottom-right</code>.
        </p>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 className="font-semibold text-[hsl(var(--foreground))]">GlassToast</h3>
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
                <td className="py-3 font-mono text-xs">'default' | 'success' | 'error' | 'warning' | 'info' | 'glass'</td>
                <td className="py-3 font-mono text-xs">'default'</td>
                <td className="py-3">Toast color variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">title</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Toast title</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">description</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Toast description</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">icon</td>
                <td className="py-3 font-mono text-xs">ReactNode</td>
                <td className="py-3 font-mono text-xs">Auto by variant</td>
                <td className="py-3">Custom icon</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">action</td>
                <td className="py-3 font-mono text-xs">ReactNode</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Action button/element</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">duration</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Auto-dismiss time in ms</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">closable</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">true</td>
                <td className="py-3">Show close button</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">onClose</td>
                <td className="py-3 font-mono text-xs">() =&gt; void</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Close callback</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-6">GlassToastContainer</h3>
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
                <td className="py-3 font-mono text-xs">toasts</td>
                <td className="py-3 font-mono text-xs">ToastData[]</td>
                <td className="py-3 font-mono text-xs">required</td>
                <td className="py-3">Array of toast data</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">onRemove</td>
                <td className="py-3 font-mono text-xs">(id: string) =&gt; void</td>
                <td className="py-3 font-mono text-xs">required</td>
                <td className="py-3">Remove toast callback</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">position</td>
                <td className="py-3 font-mono text-xs">'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'</td>
                <td className="py-3 font-mono text-xs">'bottom-right'</td>
                <td className="py-3">Container position</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">maxVisible</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3 font-mono text-xs">5</td>
                <td className="py-3">Max visible toasts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
