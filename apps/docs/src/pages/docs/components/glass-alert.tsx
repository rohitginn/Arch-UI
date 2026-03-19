import { GlassAlert } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { Rocket, Shield, Zap } from 'lucide-react';

export function GlassAlertDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-alert" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Alert
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          An alert component for displaying important messages with color-coded variants and dismissible functionality.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassAlert variant="info" title="Information">
  This is an informational alert message.
</GlassAlert>`}
          vueCode={`<template>
  <GlassAlert variant="info" title="Information">
    This is an informational alert message.
  </GlassAlert>
</template>`}
        >
          <div className="w-full space-y-4">
            <GlassAlert variant="info" title="Information">
              This is an informational alert message.
            </GlassAlert>
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
          code={`<GlassAlert variant="default">Default alert</GlassAlert>
<GlassAlert variant="info">Info alert</GlassAlert>
<GlassAlert variant="success">Success alert</GlassAlert>
<GlassAlert variant="warning">Warning alert</GlassAlert>
<GlassAlert variant="error">Error alert</GlassAlert>
<GlassAlert variant="glass">Glass alert</GlassAlert>`}
          vueCode={`<GlassAlert variant="success">Success alert</GlassAlert>`}
        >
          <div className="w-full space-y-4">
            <GlassAlert variant="default" title="Default">
              This is a default alert message.
            </GlassAlert>
            <GlassAlert variant="info" title="Information">
              Your account settings have been updated.
            </GlassAlert>
            <GlassAlert variant="success" title="Success">
              Your changes have been saved successfully.
            </GlassAlert>
            <GlassAlert variant="warning" title="Warning">
              Your subscription will expire in 3 days.
            </GlassAlert>
            <GlassAlert variant="error" title="Error">
              There was a problem processing your request.
            </GlassAlert>
            <GlassAlert variant="glass" title="Glass">
              A glassmorphic styled alert.
            </GlassAlert>
          </div>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassAlert size="sm">Small alert</GlassAlert>
<GlassAlert size="md">Medium alert</GlassAlert>
<GlassAlert size="lg">Large alert</GlassAlert>`}
          vueCode={`<GlassAlert size="lg">Large alert</GlassAlert>`}
        >
          <div className="w-full space-y-4">
            <GlassAlert variant="info" size="sm" title="Small">
              A compact alert for tight spaces.
            </GlassAlert>
            <GlassAlert variant="info" size="md" title="Medium">
              The default medium-sized alert.
            </GlassAlert>
            <GlassAlert variant="info" size="lg" title="Large">
              A larger alert with more padding and text.
            </GlassAlert>
          </div>
        </ComponentPreview>
      </div>

      {/* Custom Icon */}
      <div className="space-y-4">
        <h2 id="custom-icon" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Custom Icon
        </h2>
        <ComponentPreview 
          code={`<GlassAlert 
  variant="success" 
  icon={<Rocket className="w-5 h-5" />}
  title="Launch Ready"
>
  Your application is ready to deploy!
</GlassAlert>`}
          vueCode={`<GlassAlert variant="success" :icon="RocketIcon">
  Your application is ready to deploy!
</GlassAlert>`}
        >
          <div className="w-full space-y-4">
            <GlassAlert 
              variant="success" 
              icon={<Rocket className="w-5 h-5" />}
              title="Launch Ready"
            >
              Your application is ready to deploy!
            </GlassAlert>
            <GlassAlert 
              variant="warning" 
              icon={<Shield className="w-5 h-5" />}
              title="Security Notice"
            >
              Please enable two-factor authentication.
            </GlassAlert>
            <GlassAlert 
              variant="info" 
              icon={<Zap className="w-5 h-5" />}
              title="Performance Tip"
            >
              Enable caching for faster load times.
            </GlassAlert>
          </div>
        </ComponentPreview>
      </div>

      {/* Dismissible */}
      <div className="space-y-4">
        <h2 id="dismissible" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Dismissible
        </h2>
        <ComponentPreview 
          code={`<GlassAlert 
  variant="info" 
  dismissible 
  onDismiss={() => console.log('Dismissed')}
  title="Dismissible Alert"
>
  Click the X button to dismiss this alert.
</GlassAlert>`}
          vueCode={`<GlassAlert 
  variant="info" 
  dismissible 
  @dismiss="handleDismiss"
>
  Click the X to dismiss.
</GlassAlert>`}
        >
          <div className="w-full space-y-4">
            <GlassAlert 
              variant="success" 
              dismissible
              title="Welcome!"
            >
              Thanks for signing up. You can dismiss this message.
            </GlassAlert>
            <GlassAlert 
              variant="warning" 
              dismissible
              title="Cookie Notice"
            >
              We use cookies to enhance your experience.
            </GlassAlert>
          </div>
        </ComponentPreview>
      </div>

      {/* Without Title */}
      <div className="space-y-4">
        <h2 id="no-title" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Without Title
        </h2>
        <ComponentPreview 
          code={`<GlassAlert variant="info">
  Simple alert without a title.
</GlassAlert>`}
          vueCode={`<GlassAlert variant="info">
  Simple alert without a title.
</GlassAlert>`}
        >
          <div className="w-full space-y-4">
            <GlassAlert variant="info">
              Your session will expire in 5 minutes.
            </GlassAlert>
            <GlassAlert variant="success">
              Settings saved successfully!
            </GlassAlert>
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
                <td className="py-3 font-mono text-xs">variant</td>
                <td className="py-3 font-mono text-xs">'default' | 'info' | 'success' | 'warning' | 'error' | 'glass'</td>
                <td className="py-3 font-mono text-xs">'default'</td>
                <td className="py-3">Alert color variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">size</td>
                <td className="py-3 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Alert size</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">title</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Alert title (optional)</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">icon</td>
                <td className="py-3 font-mono text-xs">ReactNode</td>
                <td className="py-3 font-mono text-xs">Auto by variant</td>
                <td className="py-3">Custom icon element</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">dismissible</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3 font-mono text-xs">false</td>
                <td className="py-3">Show dismiss button</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">onDismiss</td>
                <td className="py-3 font-mono text-xs">() =&gt; void</td>
                <td className="py-3 font-mono text-xs">-</td>
                <td className="py-3">Callback when dismissed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
