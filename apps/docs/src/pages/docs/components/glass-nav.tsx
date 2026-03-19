import { GlassNav, GlassNavLink, GlassNavbarDropdown } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassNavDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-nav" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Navigation
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A premium navigation component with Apple-style glassmorphism, heavier blurs, and pill-shaped active states.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`<GlassNav>
  <GlassNavLink href="#" active>Home</GlassNavLink>
  <GlassNavLink href="#">Products</GlassNavLink>
  <GlassNavLink href="#">Resources</GlassNavLink>
  <GlassNavLink href="#">Pricing</GlassNavLink>
</GlassNav>`}
          vueCode={`<GlassNav>
  <GlassNavLink href="#" active>Home</GlassNavLink>
  <GlassNavLink href="#">Products</GlassNavLink>
  <GlassNavLink href="#">Resources</GlassNavLink>
  <GlassNavLink href="#">Pricing</GlassNavLink>
</GlassNav>`}
        >
          <GlassNav className="w-full">
            <GlassNavLink href="#" active>Home</GlassNavLink>
            <GlassNavLink href="#">Products</GlassNavLink>
            <GlassNavLink href="#">Resources</GlassNavLink>
            <GlassNavLink href="#">Pricing</GlassNavLink>
          </GlassNav>
        </ComponentPreview>
      </div>

      {/* Dropdown Variant */}
      <div className="space-y-4">
        <h2 id="dropdown" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Dropdown / Mega Menu
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          A variant that supports nested dropdown menus with complex content.
        </p>
        <ComponentPreview
          code={`<GlassNavbarDropdown 
  items={[
    { label: 'Home', href: '/' },
    { 
      label: 'Products', 
      dropdown: [
        { title: 'Analytics', href: '#', description: 'Get insights into your data' },
        { title: 'Automation', href: '#', description: 'Automate your workflow' }
      ]
    },
    { label: 'Pricing', href: '/pricing' }
  ]} 
/>`}
          vueCode={`<GlassNavbarDropdown 
  :items="[
    { label: 'Home', href: '/' },
    { 
      label: 'Products', 
      dropdown: [
        { title: 'Analytics', href: '#', description: 'Get insights into your data' },
        { title: 'Automation', href: '#', description: 'Automate your workflow' }
      ]
    },
    { label: 'Pricing', href: '/pricing' }
  ]" 
/>`}
        >
          <GlassNavbarDropdown
            className="w-full relative z-20"
            items={[
              { label: 'Home', href: '#' },
              {
                label: 'Products',
                dropdown: [
                  { title: 'Analytics', href: '#', description: 'Get insights into your data' },
                  { title: 'Automation', href: '#', description: 'Automate your workflow' },
                  { title: 'Security', href: '#', description: 'Enterprise-grade protection' }
                ]
              },
              { label: 'Pricing', href: '#' }
            ]}
          />
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
          code={`import { GlassNav, GlassNavLink } from '@archui/react';

export default function Example() {
  return (
    <GlassNav>
      <GlassNavLink href="/" active>Home</GlassNavLink>
      <GlassNavLink href="/about">About</GlassNavLink>
      <GlassNavLink href="/services">Services</GlassNavLink>
      <GlassNavLink href="/contact">Contact</GlassNavLink>
    </GlassNav>
  );
}`}
          vueCode={`<script setup>
import { GlassNav, GlassNavLink } from '@archui/vue';
</script>

<template>
  <GlassNav>
    <GlassNavLink href="/" active>Home</GlassNavLink>
    <GlassNavLink href="/about">About</GlassNavLink>
    <GlassNavLink href="/services">Services</GlassNavLink>
    <GlassNavLink href="/contact">Contact</GlassNavLink>
  </GlassNav>
</template>`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <CodeBlock
          code={`// Transparent (default)
<GlassNav variant="transparent">...</GlassNav>

// Floating with shadows
<GlassNav variant="floating">...</GlassNav>

// Solid background
<GlassNav variant="solid">...</GlassNav>`}
          vueCode={`<!-- Transparent (default) -->
<GlassNav variant="transparent">...</GlassNav>

<!-- Floating with shadows -->
<GlassNav variant="floating">...</GlassNav>

<!-- Solid background -->
<GlassNav variant="solid">...</GlassNav>`}
        />
      </div>

      {/* Sticky */}
      <div className="space-y-4">
        <h2 id="sticky" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sticky Navigation
        </h2>
        <CodeBlock
          code={`<GlassNav sticky>
  <GlassNavLink href="/">Home</GlassNavLink>
  <GlassNavLink href="/about">About</GlassNavLink>
</GlassNav>`}
          vueCode={`<GlassNav sticky>
  <GlassNavLink href="/">Home</GlassNavLink>
  <GlassNavLink href="/about">About</GlassNavLink>
</GlassNav>`}
        />
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>

        <h3 id="nav-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassNav Props
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>variant</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"transparent" | "floating" | "solid"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"transparent"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Navigation style variant</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>sticky</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Stick to top on scroll</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>blur</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"sm" | "md" | "lg" | "xl"</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"md"</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Backdrop blur intensity</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 id="link-props" className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">
          GlassNavLink Props
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
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>href</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Navigation link URL</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>active</code></td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                <td className="py-3 text-[hsl(var(--muted-foreground))]">Active state indicator</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
