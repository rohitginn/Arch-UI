import { CallToActionBanner } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function BlockCTABannerDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="cta-banner" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          CTA Banner
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A full-width call-to-action section block with scroll-reveal animation, glassmorphic surface, and optional background slot.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`<CallToActionBanner
  heading="Start building today"
  subheading="Join thousands of developers shipping beautiful products faster."
  primaryAction={<a href="/signup" className="rounded-lg bg-[var(--glass-accent)] px-6 py-2.5 text-sm font-semibold text-white">Get started free</a>}
  secondaryAction={<a href="/docs" className="text-sm font-medium underline-offset-4 hover:underline">Read the docs →</a>}
/>`}
          vueCode={`<CTABanner
  heading="Start building today"
  subheading="Join thousands of developers shipping beautiful products faster."
  :primary-cta="{ label: 'Get started free', href: '/signup' }"
  :secondary-cta="{ label: 'Read the docs →', href: '/docs' }"
/>`}
        >
          <CallToActionBanner
            heading="Start building today"
            subheading="Join thousands of developers shipping beautiful products faster."
            primaryAction={
              <a href="#" className="rounded-lg bg-[var(--glass-accent)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Get started free
              </a>
            }
            secondaryAction={
              <a href="#" className="text-sm font-medium text-[hsl(var(--muted-foreground))] underline-offset-4 hover:underline">
                Read the docs →
              </a>
            }
          />
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
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
          code={`import { CallToActionBanner } from '@archui/react';

export default function Page() {
  return (
    <CallToActionBanner
      heading="Ready to ship?"
      subheading="Start your free trial today."
      primaryAction={<a href="/signup">Get started</a>}
    />
  );
}`}
          vueCode={`<script setup lang="ts">
import { CTABanner } from '@archui/vue';
</script>

<template>
  <CTABanner
    heading="Ready to ship?"
    subheading="Start your free trial today."
    :primary-cta="{ label: 'Get started', href: '/signup' }"
  />
</template>`}
        />
      </div>

      {/* Left-aligned */}
      <div className="space-y-4">
        <h2 id="align" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Left-aligned
        </h2>
        <ComponentPreview
          code={`<CallToActionBanner
  align="left"
  heading="Ship your next idea."
  subheading="Components designed for speed and clarity."
  primaryAction={<a href="/signup">Get started free</a>}
/>`}
          vueCode={`<CTABanner
  align="left"
  heading="Ship your next idea."
  subheading="Components designed for speed and clarity."
  :primary-cta="{ label: 'Get started free', href: '/signup' }"
/>`}
        >
          <CallToActionBanner
            align="left"
            heading="Ship your next idea."
            subheading="Components designed for speed and clarity."
            primaryAction={
              <a href="#" className="rounded-lg bg-[var(--glass-accent)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Get started free
              </a>
            }
          />
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Default</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['heading', 'string', '—', 'Main heading text'],
                ['subheading', 'string', '—', 'Supporting description'],
                ['primaryAction', 'ReactNode', '—', 'Primary CTA element (button or link)'],
                ['secondaryAction', 'ReactNode', '—', 'Secondary CTA element'],
                ['background', 'ReactNode', '—', 'Background slot (gradient, pattern, image)'],
                ['align', '"center" | "left"', '"center"', 'Content alignment'],
                ['className', 'string', '—', 'Additional CSS classes'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="text-[hsl(var(--muted-foreground))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs">{type}</td>
                  <td className="px-4 py-3 font-mono text-xs">{def}</td>
                  <td className="px-4 py-3 text-xs">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
