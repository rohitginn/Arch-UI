import { PricingMinimal } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Sample data                                                         */
/* ------------------------------------------------------------------ */

const twoPlanData = [
  {
    name: 'Starter',
    price: 0,
    billingLabel: '/month',
    description: 'Everything you need to get started.',
    features: ['Up to 3 projects', '1 team member', '5 GB storage', 'Community support'],
    cta: { label: 'Get started free', href: '#' },
  },
  {
    name: 'Pro',
    price: 29,
    billingLabel: '/month',
    description: 'For teams that need more power.',
    features: ['Unlimited projects', '10 team members', '100 GB storage', 'Priority support', 'Custom domains'],
    cta: { label: 'Start free trial', href: '#' },
    highlighted: true,
  },
];

const singlePlanData = [
  {
    name: 'All-inclusive Kit',
    price: 99,
    billingLabel: ' one-time',
    description: 'Everything in one package. No subscriptions.',
    features: ['Full component library', 'Figma source file', 'Lifetime updates', '6 months of email support'],
    cta: { label: 'Buy now', href: '#' },
    highlighted: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function BlockPricingMinimalDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 id="pricing-minimal" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Pricing Minimal
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A clean 1–2 plan pricing layout without a comparison table. Ideal for simple SaaS or one-time purchase products.
        </p>
      </div>

      {/* ── Two plans ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="two-plans" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Two plans
        </h2>
        <ComponentPreview
          code={`import { PricingMinimal } from '@archui/react';

<PricingMinimal
  heading="Simple, honest pricing"
  subheading="14-day free trial. No credit card required."
  plans={[
    {
      name: 'Starter',
      price: 0,
      billingLabel: '/month',
      description: 'Everything you need to get started.',
      features: ['Up to 3 projects', '1 team member', '5 GB storage'],
      cta: { label: 'Get started free', href: '/signup' },
    },
    {
      name: 'Pro',
      price: 29,
      billingLabel: '/month',
      description: 'For teams that need more power.',
      features: ['Unlimited projects', '10 team members', '100 GB storage', 'Priority support'],
      cta: { label: 'Start free trial', href: '/signup' },
      highlighted: true,
    },
  ]}
/>`}
        >
          <PricingMinimal
            heading="Simple, honest pricing"
            subheading="14-day free trial. No credit card required."
            plans={twoPlanData}
          />
        </ComponentPreview>
      </section>

      {/* ── Single plan ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="single-plan" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Single plan / one-time purchase
        </h2>
        <ComponentPreview
          code={`<PricingMinimal
  heading="One kit, everything included"
  plans={[
    {
      name: 'All-inclusive Kit',
      price: 99,
      billingLabel: ' one-time',
      features: ['Full component library', 'Figma source file', 'Lifetime updates'],
      cta: { label: 'Buy now', href: '/checkout' },
      highlighted: true,
    },
  ]}
/>`}
        >
          <PricingMinimal
            heading="One kit, everything included"
            plans={singlePlanData}
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

      {/* ── Props ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
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
                ['heading', 'string', '—', 'Section headline'],
                ['subheading', 'string', '—', 'Supporting paragraph'],
                ['plans', 'PricingMinimalPlan[]', '—', '1 or 2 plan definitions (required)'],
                ['currency', 'string', '$', 'Currency symbol for price display'],
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
