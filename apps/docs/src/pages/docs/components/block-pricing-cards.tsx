import { PricingCards } from '@archui/react';
import type { PricingPlan } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const plans: PricingPlan[] = [
  {
    name: 'Hobby',
    monthlyPrice: 0,
    description: 'Perfect for side projects and personal experiments.',
    features: ['Up to 3 projects', '5 GB storage', 'Community support', 'Public repos'],
    cta: { label: 'Get started free', href: '#' },
  },
  {
    name: 'Pro',
    monthlyPrice: 19,
    annualPrice: 15,
    description: 'For professionals shipping production-grade products.',
    features: ['Unlimited projects', '50 GB storage', 'Priority support', 'Private repos', 'Analytics'],
    cta: { label: 'Start free trial', href: '#' },
    recommended: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    description: 'For teams that need advanced security and compliance.',
    features: ['Everything in Pro', 'SSO / SAML', 'SLA guarantee', 'Dedicated support', 'Custom contracts'],
    cta: { label: 'Contact sales', href: '#' },
  },
];

export function BlockPricingCardsDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="pricing-cards" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Pricing Cards
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A set of 2–3 pricing tier cards with optional monthly/annual billing toggle, scroll-reveal stagger animation, and a highlighted recommended plan.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview
          code={`import { PricingCards } from '@archui/react';

const plans = [
  {
    name: 'Hobby',
    monthlyPrice: 0,
    description: 'Perfect for side projects.',
    features: ['3 projects', '5 GB storage'],
    cta: { label: 'Get started free', href: '/signup' },
  },
  {
    name: 'Pro',
    monthlyPrice: 19,
    annualPrice: 15,
    description: 'For professionals shipping.',
    features: ['Unlimited projects', 'Analytics'],
    cta: { label: 'Start free trial', href: '/signup' },
    recommended: true,
    badge: 'Most popular',
  },
];

<PricingCards
  heading="Simple, transparent pricing"
  subheading="No hidden fees. Cancel anytime."
  plans={plans}
  billingToggle
/>`}
          vueCode={`<script setup lang="ts">
import { PricingCards } from '@archui/vue';

const plans = [
  { name: 'Hobby', monthlyPrice: 0, features: ['3 projects'], cta: { label: 'Start free', href: '/signup' } },
  { name: 'Pro', monthlyPrice: 19, features: ['Unlimited'], cta: { label: 'Try free', href: '/signup' }, recommended: true },
];
</script>

<template>
  <PricingCards
    heading="Simple, transparent pricing"
    :plans="plans"
    :billing-toggle="true"
  />
</template>`}
        >
          <PricingCards
            heading="Simple, transparent pricing"
            subheading="No hidden fees. Cancel anytime."
            plans={plans}
            billingToggle
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
          code={`import { PricingCards } from '@archui/react';
import type { PricingPlan } from '@archui/react';

const plans: PricingPlan[] = [
  {
    name: 'Starter',
    monthlyPrice: 9,
    annualPrice: 7,
    description: 'Great for getting started.',
    features: ['5 projects', '10 GB storage', 'Email support'],
    cta: { label: 'Get started', href: '/signup' },
  },
  {
    name: 'Growth',
    monthlyPrice: 29,
    annualPrice: 24,
    description: 'For growing teams.',
    features: ['Unlimited projects', '100 GB storage', 'Priority support'],
    cta: { label: 'Start trial', href: '/signup' },
    recommended: true,
    badge: 'Best value',
  },
];

export default function Page() {
  return (
    <PricingCards
      heading="Choose your plan"
      plans={plans}
      billingToggle
      currency="$"
    />
  );
}`}
          vueCode={`<script setup lang="ts">
import { PricingCards } from '@archui/vue';

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 9,
    description: 'Great for getting started.',
    features: ['5 projects', '10 GB'],
    cta: { label: 'Get started', href: '/signup' },
  },
];
</script>

<template>
  <PricingCards
    heading="Choose your plan"
    :plans="plans"
    :billing-toggle="true"
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
                ['plans', 'PricingPlan[]', '—', 'Array of 2–3 pricing tier objects (required)'],
                ['heading', 'string', '—', 'Section heading'],
                ['subheading', 'string', '—', 'Section subheading'],
                ['billingToggle', 'boolean', 'false', 'Show monthly/annual billing toggle'],
                ['currency', 'string', '"$"', 'Currency symbol prepended to prices'],
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

        <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">PricingPlan</h3>
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
                ['name', 'string', 'Plan display name'],
                ['monthlyPrice', 'number | string', 'Monthly price (use "Custom" for enterprise)'],
                ['annualPrice', 'number | string', 'Annual price shown when billing toggle is active'],
                ['description', 'string', 'Short plan description'],
                ['features', 'string[]', 'List of included features'],
                ['cta', '{ label: string; href: string }', 'CTA button label and link'],
                ['recommended', 'boolean', 'Visually promotes this plan'],
                ['badge', 'string', 'Badge text shown above the card'],
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
