import { PricingTable } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Sample data                                                         */
/* ------------------------------------------------------------------ */

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: { label: 'Get started free', href: '#' },
  },
  {
    name: 'Pro',
    monthlyPrice: 29,
    annualPrice: 23,
    cta: { label: 'Start Pro trial', href: '#' },
    recommended: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    annualPrice: 'Custom',
    cta: { label: 'Contact sales', href: '#' },
  },
];

const features = [
  { category: 'Usage', name: 'Projects', values: { Starter: '3', Pro: 'Unlimited', Enterprise: 'Unlimited' } },
  { name: 'Team members', values: { Starter: '1', Pro: '10', Enterprise: 'Unlimited' } },
  { name: 'Storage', values: { Starter: '5 GB', Pro: '100 GB', Enterprise: 'Unlimited' } },
  { category: 'Features', name: 'Custom domains', values: { Starter: false, Pro: true, Enterprise: true } },
  { name: 'Analytics', values: { Starter: false, Pro: true, Enterprise: true } },
  { name: 'Priority support', values: { Starter: false, Pro: false, Enterprise: true } },
  { name: 'SSO / SAML', values: { Starter: false, Pro: false, Enterprise: true } },
  { category: 'Compliance', name: 'SOC 2 Type II', values: { Starter: false, Pro: false, Enterprise: true } },
  { name: 'Audit logs', values: { Starter: false, Pro: true, Enterprise: true } },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function BlockPricingTableDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 id="pricing-table" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Pricing Table
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A full feature-comparison table showing all plans across columns. Supports billing toggle, category grouping, checkmarks, and highlighted recommended plans.
        </p>
      </div>

      {/* ── Default ─────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`import { PricingTable } from '@archui/react';

<PricingTable
  heading="Compare plans"
  subheading="All plans include a 14-day free trial. No credit card required."
  billingToggle
  plans={plans}
  features={features}
/>`}
        >
          <PricingTable
            heading="Compare plans"
            subheading="All plans include a 14-day free trial. No credit card required."
            billingToggle
            plans={plans}
            features={features}
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
          code={`import { PricingTable } from '@archui/react';

const plans = [
  { name: 'Starter', monthlyPrice: 0, annualPrice: 0, cta: { label: 'Get started', href: '/signup' } },
  { name: 'Pro', monthlyPrice: 29, annualPrice: 23, cta: { label: 'Start trial', href: '/signup' }, recommended: true },
  { name: 'Enterprise', monthlyPrice: 'Custom', cta: { label: 'Contact sales', href: '/contact' } },
];

const features = [
  { category: 'Usage', name: 'Projects', values: { Starter: '3', Pro: 'Unlimited', Enterprise: 'Unlimited' } },
  { name: 'Team members', values: { Starter: '1', Pro: '10', Enterprise: 'Unlimited' } },
  { name: 'Custom domains', values: { Starter: false, Pro: true, Enterprise: true } },
];

export default function Pricing() {
  return (
    <PricingTable
      heading="Compare plans"
      billingToggle
      plans={plans}
      features={features}
    />
  );
}`}
        />
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
                ['badge', 'string', '—', 'Small pill above the heading'],
                ['billingToggle', 'boolean', 'false', 'Show monthly / annual billing toggle'],
                ['plans', 'PricingTablePlan[]', '—', 'Plan columns (required)'],
                ['features', 'PricingTableFeature[]', '—', 'Feature rows (required)'],
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

        <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mt-6">PricingTablePlan</h3>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Key</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['name', 'string', 'Plan name — used as the column header and as the key in feature values'],
                ['monthlyPrice', 'number | string', 'Monthly price (number for "$X" display, string for "Custom")'],
                ['annualPrice', 'number | string', 'Annual per-month price shown when billing toggle is set to annual'],
                ['cta', '{ label: string; href: string }', 'CTA button shown below the price'],
                ['recommended', 'boolean', 'Highlights this plan with an accent border and elevated styling'],
              ].map(([key, type, desc]) => (
                <tr key={key} className="bg-[hsl(var(--background))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{key}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{type}</td>
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
