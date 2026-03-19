import { TestimonialsCarousel } from '@archui/react';
import type { CarouselTestimonial } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const testimonials: CarouselTestimonial[] = [
  {
    quote: 'ArchUI has completely transformed how we build product pages. The glassmorphic components save us days of work every sprint.',
    name: 'Sarah Chen',
    role: 'Lead Designer',
    company: 'Vercel',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=sarah',
  },
  {
    quote: 'The TypeScript types are impeccable. We dropped in the blocks and they just worked — no edits, no overrides.',
    name: 'Marcus Williams',
    role: 'Staff Engineer',
    company: 'Linear',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=marcus',
  },
  {
    quote: "Pricing went live in 30 minutes. The scroll-reveal stagger on the cards is chef's kiss.",
    name: 'Priya Sharma',
    role: 'Frontend Eng',
    company: 'Loom',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=priya',
  },
];

export function BlockTestimonialsCarouselDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="testimonials-carousel" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Testimonials Carousel
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A direction-aware single-testimonial carousel. Navigating forward slides the next quote in from the right; navigating back slides it in from the left. Supports auto-play.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`import { TestimonialsCarousel } from '@archui/react';

const testimonials = [
  {
    quote: 'ArchUI transformed how we build product pages.',
    name: 'Sarah Chen',
    role: 'Lead Designer',
    company: 'Vercel',
  },
  // ...more testimonials
];

<TestimonialsCarousel
  heading="Loved by developers"
  subheading="See what teams are building with ArchUI."
  testimonials={testimonials}
  autoPlay={5000}
/>`}
          vueCode={`<script setup lang="ts">
import { TestimonialsCarousel } from '@archui/vue';

const testimonials = [
  {
    quote: 'ArchUI transformed how we build product pages.',
    name: 'Sarah Chen',
    role: 'Lead Designer',
    company: 'Vercel',
  },
];
</script>

<template>
  <TestimonialsCarousel
    heading="Loved by developers"
    subheading="See what teams are building with ArchUI."
    :testimonials="testimonials"
    :auto-play="5000"
  />
</template>`}
        >
          <TestimonialsCarousel
            heading="Loved by developers"
            subheading="See what teams are building with ArchUI."
            testimonials={testimonials}
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
          code={`import { TestimonialsCarousel } from '@archui/react';
import type { CarouselTestimonial } from '@archui/react';

const testimonials: CarouselTestimonial[] = [
  {
    quote: 'This component library is exactly what we needed.',
    name: 'Alex Kim',
    role: 'CTO',
    company: 'Startups Inc.',
    avatar: '/avatars/alex.jpg',
  },
];

export default function Page() {
  return (
    <TestimonialsCarousel
      heading="What our users say"
      testimonials={testimonials}
      autoPlay={4000}
    />
  );
}`}
          vueCode={`<script setup lang="ts">
import { TestimonialsCarousel } from '@archui/vue';

const testimonials = [
  {
    quote: 'This component library is exactly what we needed.',
    name: 'Alex Kim',
    role: 'CTO',
    company: 'Startups Inc.',
  },
];
</script>

<template>
  <TestimonialsCarousel
    heading="What our users say"
    :testimonials="testimonials"
    :auto-play="4000"
  />
</template>`}
        />
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
                ['testimonials', 'CarouselTestimonial[]', '—', 'Array of testimonial objects (required)'],
                ['heading', 'string', '—', 'Section heading'],
                ['subheading', 'string', '—', 'Section subheading'],
                ['autoPlay', 'number', '0', 'Auto-advance interval in ms (0 = disabled)'],
                ['background', 'ReactNode', '—', 'Background slot'],
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

        <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">CarouselTestimonial</h3>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['quote', 'string', 'The testimonial body text'],
                ['name', 'string', "Reviewer's full name"],
                ['role', 'string', "Reviewer's job title"],
                ['company', 'string', "Reviewer's company"],
                ['avatar', 'string', 'Avatar image URL'],
              ].map(([prop, type, desc]) => (
                <tr key={prop} className="text-[hsl(var(--muted-foreground))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs">{type}</td>
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
