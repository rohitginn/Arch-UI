import { FAQTwoColumn, FAQCentered } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Sample data                                                         */
/* ------------------------------------------------------------------ */

const faqItems = [
  { question: 'Is there a free plan?', answer: 'Yes — the Starter plan is free forever with 3 projects and 5 GB storage. No credit card required.' },
  { question: 'Can I cancel anytime?', answer: 'Absolutely. Cancel from your account settings with one click. Your data is exportable at any time.' },
  { question: 'How does billing work?', answer: 'We charge monthly or annually (save 20%). A receipt is emailed on each billing cycle.' },
  { question: 'Do you offer discounts for non-profits?', answer: 'Yes — we offer 50% off Pro for verified non-profit organisations. Contact support to apply.' },
  { question: 'What payment methods do you accept?', answer: 'All major credit cards (Visa, Mastercard, Amex), as well as PayPal and bank transfers for Enterprise plans.' },
  { question: 'Is there an enterprise SLA?', answer: 'Enterprise plans include a 99.99% uptime SLA, dedicated support, and a named customer success manager.' },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function BlockFAQVariantsDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 id="faq-variants" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          FAQ Variants
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Two additional FAQ layouts alongside the standard accordion — a two-column card grid and a centered editorial stack.
        </p>
      </div>

      {/* ── FAQTwoColumn ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="faq-two-column" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FAQTwoColumn
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          Non-collapsing card grid split into two equal columns. Best when you have many short questions and want them all visible at once.
        </p>
        <ComponentPreview
          code={`import { FAQTwoColumn } from '@archui/react';

<FAQTwoColumn
  heading="Frequently asked questions"
  subheading="Everything you need to know about pricing and billing."
  items={[
    { question: 'Is there a free plan?', answer: 'Yes — the Starter plan is free forever...' },
    { question: 'Can I cancel anytime?', answer: 'Absolutely. Cancel from your account settings...' },
    // ...
  ]}
/>`}
        >
          <FAQTwoColumn
            heading="Frequently asked questions"
            subheading="Everything you need to know about pricing and billing."
            items={faqItems}
          />
        </ComponentPreview>
      </section>

      {/* ── FAQCentered ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="faq-centered" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FAQCentered
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          Full-width centered Q&A in a narrow reading column. Each answer is separated by a divider. Editorial-feeling — used in brand-forward sites.
        </p>
        <ComponentPreview
          code={`import { FAQCentered } from '@archui/react';

<FAQCentered
  heading="Got questions?"
  subheading="We have answers."
  items={[
    { question: 'Is there a free plan?', answer: 'Yes — the Starter plan is free forever...' },
    { question: 'Can I cancel anytime?', answer: 'Absolutely...' },
    // ...
  ]}
/>`}
        >
          <FAQCentered
            heading="Got questions?"
            subheading="We have answers."
            items={faqItems.slice(0, 4)}
          />
        </ComponentPreview>
      </section>

      {/* ── Installation ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock code={`npm install @archui/react\n# or\npnpm add @archui/react`} />
      </section>

      {/* ── Usage ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Usage
        </h2>
        <CodeBlock
          code={`import { FAQTwoColumn, FAQCentered } from '@archui/react';

const items = [
  { question: 'Is there a free plan?', answer: 'Yes, free forever.' },
  { question: 'Can I cancel anytime?', answer: 'Yes, with one click.' },
];

// Two-column card grid
export function FAQSection() {
  return <FAQTwoColumn heading="FAQ" items={items} />;
}

// Centered editorial stack
export function FAQEditorial() {
  return <FAQCentered heading="Got questions?" items={items} />;
}`}
        />
      </section>

      {/* ── Props ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props (both components share the same API)
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
                ['heading', 'string', '—', 'Section headline'],
                ['subheading', 'string', '—', 'Supporting paragraph beneath the headline'],
                ['items', 'FAQItem[]', '—', 'Array of { question, answer } objects (required)'],
                ['background', 'ReactNode', '—', 'Optional background component'],
                ['className', 'string', '—', 'Additional Tailwind classes'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="bg-[hsl(var(--background))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{def}</td>
                  <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
