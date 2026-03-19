import { FAQAccordion } from '@archui/react';
import type { FAQItem } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const faqs: FAQItem[] = [
  {
    question: 'What is ArchUI?',
    answer:
      'ArchUI is a glassmorphic component library for React and Vue. It provides ready-to-use, accessible, and highly customisable UI components styled with CSS design tokens.',
  },
  {
    question: 'Do I need Tailwind CSS?',
    answer:
      'Yes. ArchUI is built on Tailwind CSS v4. You will need Tailwind configured in your project to use the components. We provide a preset that wires up our design tokens automatically.',
  },
  {
    question: 'Is it framework-agnostic?',
    answer:
      'We currently ship official packages for React (@archui/react) and Vue 3 (@archui/vue). The core design token package (@archui/core) can be used with any framework.',
  },
  {
    question: 'Can I use it with Next.js or Nuxt?',
    answer:
      'Yes. Both packages are SSR-compatible. React Server Components are supported — components that require client interactivity are marked with "use client".',
  },
  {
    question: 'Is there a free tier?',
    answer:
      'ArchUI is open source under the MIT licence. All components are free to use in personal and commercial projects.',
  },
];

export function BlockFAQAccordionDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="faq-accordion" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          FAQ Accordion
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          An accessible accordion for FAQ sections. Height transitions are real CSS pixel values (no max-height hack). Supports optional single-open mode and scroll-reveal stagger.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`import { FAQAccordion } from '@archui/react';

const faqs = [
  { question: 'What is ArchUI?', answer: 'A glassmorphic component library for React and Vue.' },
  { question: 'Do I need Tailwind CSS?', answer: 'Yes — Tailwind v4 is required.' },
];

<FAQAccordion
  heading="Frequently asked questions"
  subheading="Everything you need to know about the product."
  items={faqs}
  singleOpen
/>`}
          vueCode={`<script setup lang="ts">
import { FAQAccordion } from '@archui/vue';

const faqs = [
  { question: 'What is ArchUI?', answer: 'A glassmorphic component library.' },
  { question: 'Do I need Tailwind?', answer: 'Yes — Tailwind v4 is required.' },
];
</script>

<template>
  <FAQAccordion
    heading="Frequently asked questions"
    :items="faqs"
    :single-open="true"
  />
</template>`}
        >
          <FAQAccordion
            heading="Frequently asked questions"
            subheading="Everything you need to know about the product."
            items={faqs}
            singleOpen
          />
        </ComponentPreview>
      </div>

      {/* Multiple open */}
      <div className="space-y-4">
        <h2 id="multi-open" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Multiple items open
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Omit <code className="rounded bg-[hsl(var(--muted))] px-1 text-sm">singleOpen</code> (or set it to <code className="rounded bg-[hsl(var(--muted))] px-1 text-sm">false</code>) to allow multiple items to be open simultaneously.
        </p>
        <ComponentPreview
          code={`<FAQAccordion items={faqs} />`}
          vueCode={`<FAQAccordion :items="faqs" />`}
        >
          <FAQAccordion items={faqs.slice(0, 3)} />
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
          code={`import { FAQAccordion } from '@archui/react';
import type { FAQItem } from '@archui/react';

const faqs: FAQItem[] = [
  {
    question: 'How do I get started?',
    answer: 'Install the package and import any component you need.',
  },
  {
    question: 'Is SSR supported?',
    answer: 'Yes. All components are SSR-compatible.',
  },
];

export default function Page() {
  return (
    <FAQAccordion
      heading="FAQ"
      items={faqs}
      singleOpen
    />
  );
}`}
          vueCode={`<script setup lang="ts">
import { FAQAccordion } from '@archui/vue';

const faqs = [
  { question: 'How do I get started?', answer: 'Install and import.' },
  { question: 'Is SSR supported?', answer: 'Yes, fully compatible.' },
];
</script>

<template>
  <FAQAccordion
    heading="FAQ"
    :items="faqs"
    :single-open="true"
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
                ['items', 'FAQItem[]', '—', 'Array of question/answer pairs (required)'],
                ['heading', 'string', '—', 'Section heading'],
                ['subheading', 'string', '—', 'Section subheading'],
                ['singleOpen', 'boolean', 'false', 'Allow only one item open at a time (accordion mode)'],
                ['background', 'ReactNode', '—', 'Background element'],
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

        <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">FAQItem</h3>
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
                ['question', 'string', 'The question / trigger text'],
                ['answer', 'string', 'The answer / panel text'],
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
