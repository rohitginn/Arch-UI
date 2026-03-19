'use client';

import { cn } from '@archui/core';
import { HeroSplit } from '../blocks/hero';
import { MarqueeLogos, StatsSection, TestimonialsGrid } from '../blocks/social-proof';
import { FeaturesAlternating, FeaturesTabbed } from '../blocks/features';
import { BentoGrid, CallToActionBanner } from '../blocks/misc';
import { PricingCards } from '../blocks/pricing';
import { FAQAccordion } from '../blocks/faq';
import { FooterComplex } from '../blocks/footer';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const TRUST_LOGOS = [
  'https://placehold.co/120x36/f0fdf4/15803d?text=SOC+2',
  'https://placehold.co/120x36/f0fdf4/15803d?text=ISO+27001',
  'https://placehold.co/120x36/f0fdf4/15803d?text=PCI+DSS',
  'https://placehold.co/120x36/f0fdf4/15803d?text=GDPR',
  'https://placehold.co/120x36/f0fdf4/15803d?text=CCPA',
  'https://placehold.co/120x36/f0fdf4/15803d?text=FedRAMP',
];

const ALTERNATING_FEATURES = [
  {
    title: 'Every dollar, always working.',
    description: 'Idle cash earns yield automatically. Sweep rules push to high-yield accounts by end of day. Set policy once, watch it run every day without intervention.',
    image: { src: 'https://placehold.co/600x400/f0fdf4/16a34a?text=Cash+Dashboard', alt: 'Cash management dashboard' },
  },
  {
    title: 'Cards that follow your policies by design.',
    description: 'Issue virtual and physical cards with per-card spend limits, merchant category rules, and automatic receipt matching. No more manual expense reports.',
    image: { src: 'https://placehold.co/600x400/f0fdf4/16a34a?text=Card+Controls', alt: 'Card spend controls' },
  },
  {
    title: 'Domestic and international payments in one workflow.',
    description: 'ACH, wire, SWIFT, and real-time payments from a single API or dashboard. Batch payments, approval chains, and dual-control release — all included.',
    image: { src: 'https://placehold.co/600x400/f0fdf4/16a34a?text=Payments+Flow', alt: 'Payments flow' },
  },
  {
    title: 'Close your books faster every month.',
    description: 'Real-time transaction categorization, automatic reconciliation, and one-click export to your accounting system. Month-end in hours, not days.',
    image: { src: 'https://placehold.co/600x400/f0fdf4/16a34a?text=Reporting+Suite', alt: 'Reporting suite' },
  },
];

const FEATURES_TABBED = [
  {
    label: 'Banking API',
    title: 'Embed financial operations in your product.',
    description: 'REST API with webhooks for every financial event. SDKs for JavaScript, Python, Ruby, and Go. Sandbox environment with replays.',
    image: { src: 'https://placehold.co/640x420/f0fdf4/16a34a?text=Banking+API+Docs', alt: 'Banking API' },
  },
  {
    label: 'Integrations',
    title: 'Syncs with every tool your finance team uses.',
    description: 'Native integrations with QuickBooks, NetSuite, Xero, Workday, and Rippling. Webhooks for everything else.',
    image: { src: 'https://placehold.co/640x420/f0fdf4/16a34a?text=Integrations+Hub', alt: 'Integrations' },
  },
  {
    label: 'Permissions',
    title: 'Role-based access for every person on your team.',
    description: 'Granular permissions per account, payment type, and spend limit. SCIM provisioning from your IdP. Immutable audit log.',
    image: { src: 'https://placehold.co/640x420/f0fdf4/16a34a?text=Permissions+Manager', alt: 'Permissions' },
  },
];

const BENTO_ITEMS = [
  { title: '$2.4B', description: 'Monthly payment volume processed' },
  { title: '99.999%', description: 'API uptime over the last 24 months' },
  { title: '<400ms', description: 'Median ACH initiation time after approval' },
  { title: '120+', description: 'Currencies supported for international wire' },
];

const STATS = [
  { value: 4200, label: 'Finance teams running on Apex', suffix: '+' },
  { value: 6, label: 'Hours saved per finance employee per week', suffix: 'hrs' },
  { value: 99, label: 'Customer retention rate', suffix: '%' },
  { value: 2.4, label: 'Billion dollars processed monthly', suffix: 'B', decimals: 1 },
];

const TESTIMONIALS = [
  {
    quote: "We hit Series B and suddenly had 15 people with company cards, 3 bank accounts, and a finance team of one. Apex was the only platform that handled that complexity without needing an in-house CFO to manage it.",
    name: 'Tyler Reeves',
    role: 'COO',
    company: 'Formery',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=TR',
  },
  {
    quote: "Our previous bank made international wires a week-long process. With Apex, I initiate a wire, a second approver releases it, and it lands next day. The finance team reclaimed 10 hours per week immediately.",
    name: 'Amara Osei',
    role: 'VP Finance',
    company: 'Tandem Logistics',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=AO',
  },
  {
    quote: "The SOC 2 and ISO 27001 certifications were non-negotiable for our compliance team. Having a fintech that leads with security documentation rather than hiding it was genuinely refreshing.",
    name: 'Hiro Nakamura',
    role: 'Head of Finance',
    company: 'Nexfield',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=HN',
  },
  {
    quote: "QuickBooks sync alone probably saves us 20 hours of reconciliation work per month. Every transaction is categorized, matched, and ready to import by the time our accountant opens their laptop.",
    name: 'Priya Shah',
    role: 'Controller',
    company: 'Crestwave',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=PS',
  },
  {
    quote: "Spend policies that actually enforce themselves. I set the rules once — merchant categories, dollar limits, approval thresholds — and I don't think about it again. It just works.",
    name: 'Marcus Bell',
    role: 'CFO',
    company: 'Archway Capital',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=MB',
  },
  {
    quote: "We compared six platforms. Apex was the only one that could show us a production API, a working demo, and a reference customer in fintech in the same 30-minute call. Everyone else needed two more discovery sessions.",
    name: 'Elena Cruz',
    role: 'Director of Engineering',
    company: 'Plio',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=EC',
  },
];

const PRICING_PLANS = [
  {
    name: 'Startup',
    monthlyPrice: 0,
    description: 'For early-stage companies getting their financial operations in order.',
    features: [
      '2 bank accounts',
      '5 users',
      '10 cards',
      'ACH & domestic wire',
      'Accounting sync',
      'Email support (48h)',
    ],
    cta: { label: 'Get started free', href: '#' },
  },
  {
    name: 'Growth',
    monthlyPrice: 299,
    description: 'For funded companies scaling finance operations without headcount.',
    features: [
      'Unlimited bank accounts',
      'Unlimited users',
      'Unlimited cards',
      'ACH, wire & SWIFT',
      'International payments',
      'Accounting sync',
      'API access',
      'Slack + priority support',
    ],
    cta: { label: 'Start 30-day trial', href: '#' },
    recommended: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    description: 'For large teams with compliance, security, and automation requirements.',
    features: [
      'Everything in Growth',
      'Custom approval workflows',
      'SCIM provisioning',
      'SSO / SAML',
      'Dedicated bank relationship',
      'Custom SLA',
      'Dedicated CSM',
      'On-site onboarding',
    ],
    cta: { label: 'Contact sales', href: '#' },
  },
];

const FAQ_ITEMS = [
  {
    question: 'Is Apex a bank?',
    answer: 'Apex is a financial technology company, not a bank. Deposits are held with our FDIC-insured bank partners, giving your funds the same deposit insurance coverage as a traditional bank account (up to $250,000 per depositor).',
  },
  {
    question: 'How long does account opening take?',
    answer: 'Most accounts are opened in under 5 minutes with automated KYB verification. Complex structures (trusts, international entities) may take 1-2 business days with additional documentation.',
  },
  {
    question: 'What compliance certifications does Apex hold?',
    answer: 'We are SOC 2 Type II certified, ISO 27001 certified, PCI DSS Level 1 compliant, GDPR compliant, and CCPA compliant. Our full compliance documentation is available on request.',
  },
  {
    question: 'Can we use multiple approval levels for payments?',
    answer: 'Yes. You can configure approval chains with up to 4 levels, combine role-based and user-specific approvers, set thresholds at which approvals trigger, and require dual control (any 2 of N approvers) for large transactions.',
  },
  {
    question: 'What ERP and accounting integrations are available?',
    answer: 'Native integrations with QuickBooks Online, QuickBooks Desktop, Xero, NetSuite, Sage, Workday, and Rippling. We also support webhook-based integration with any system that can receive events.',
  },
  {
    question: 'What are the limits for international wire transfers?',
    answer: 'International wires are available to 180+ countries in 120+ currencies. Default per-transaction limit is $500,000, with higher limits available on request for Enterprise customers.',
  },
];

const FOOTER_GROUPS = [
  {
    title: 'Product',
    links: [
      { label: 'Cash management', href: '#' },
      { label: 'Corporate cards', href: '#' },
      { label: 'Payments', href: '#' },
      { label: 'API', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '#' },
      { label: 'Compliance', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface FintechSaasTemplateProps {
  className?: string;
}

/**
 * FintechSaaS — Finance B2B SaaS (Mercury / Brex / Ramp aesthetic).
 *
 * Accent: Sage / emerald. Default mode: Light (trust-driven).
 *
 * Sections:
 *   Nav → HeroSplit (compliance badges) → MarqueeLogos (certifications) →
 *   FeaturesAlternating (4) → BentoGrid → FeaturesTabbed → StatsSection →
 *   TestimonialsGrid (6) → PricingCards (3) → FAQAccordion → CTABanner → FooterComplex
 */
export function FintechSaasTemplate({ className }: FintechSaasTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-white dark:bg-neutral-950 antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        logo={
          <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
            Apex<span className="text-emerald-500">.</span>
          </span>
        }
        links={[
          { label: 'Product', href: '#' },
          { label: 'Integrations', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Security', href: '#' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Sign in
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
            >
              Open account
            </a>
          </div>
        }
      />

      {/* ── Hero ── */}
      <HeroSplit
        badge="Trusted by 4,200+ finance teams"
        heading="Modern banking for companies that move fast."
        subheading="Cash management, corporate cards, and global payments in one platform. Built with the security standards your board requires and the UX your team will actually use."
        primaryCta={{ label: 'Open account — free', href: '#' }}
        secondaryCta={{ label: 'See product tour', href: '#' }}
        image={{
          src: 'https://placehold.co/720x500/f0fdf4/16a34a?text=Apex+Finance+Dashboard',
          alt: 'Apex Finance Dashboard',
        }}
      />

      {/* ── Compliance logos ── */}
      <div className="bg-neutral-50 dark:bg-neutral-900">
        <MarqueeLogos
          heading="Certified, audited, and compliant"
          logos={TRUST_LOGOS.map((src, i) => ({ src, alt: `Certification ${i + 1}` }))}
          speed="slow"
          pauseOnHover
        />
      </div>

      {/* ── Feature alternating ── */}
      <FeaturesAlternating
        badge="Platform"
        heading="A platform built for every financial workflow."
        features={ALTERNATING_FEATURES}
      />

      {/* ── Scale metrics ── */}
      <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 mb-4">Scale</span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Infrastructure built for production finance.</h2>
          </div>
          <BentoGrid
            items={BENTO_ITEMS.map(i => ({ title: i.title, description: i.description }))}
            columns={4}
          />
        </div>
      </section>

      {/* ── Platform tabs ── */}
      <FeaturesTabbed
        badge="Platform"
        heading="A financial OS for every part of your company."
        subheading="From CFO to developer to office manager — one platform, different views."
        features={FEATURES_TABBED}
      />

      {/* ── Stats ── */}
      <StatsSection
        heading="Finance teams choose Apex for one reason"
        subheading="It makes their job easier. The numbers reflect that."
        stats={STATS}
        animated
      />

      {/* ── Testimonials ── */}
      <TestimonialsGrid
        heading="Finance teams, in their own words."
        subheading="From seed to Series D — the problems are the same. The solution is Apex."
        testimonials={TESTIMONIALS}
        columns={3}
      />

      {/* ── Pricing ── */}
      <PricingCards
        badge="Pricing"
        heading="Start free. Scale as you grow."
        subheading="No setup fees, no transaction fees on ACH, no hidden charges. Just a flat monthly fee."
        plans={PRICING_PLANS}
        currency="$"
        billingToggle
      />

      {/* ── FAQ ── */}
      <FAQAccordion
        heading="Frequently asked questions"
        subheading="Questions we hear from finance leaders before signing up."
        items={FAQ_ITEMS}
        singleOpen
      />

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <CallToActionBanner
            heading="Get your business account open today."
            subheading="Takes 5 minutes. No minimum balance. No account fees until you're ready to grow."
            align="center"
            primaryAction={
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
              >
                Open free account
              </a>
            }
            secondaryAction={
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
              >
                Talk to sales
              </a>
            }
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <FooterComplex
        logo={
          <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
            Apex<span className="text-emerald-500">.</span>
          </span>
        }
        tagline="Modern finance infrastructure for modern companies."
        groups={FOOTER_GROUPS}
        socials={[
          { label: 'LinkedIn', href: '#', icon: <IconLinkedIn /> },
          { label: 'Twitter', href: '#', icon: <IconTwitter /> },
        ]}
        newsletterHeading="Finance & product updates"
        newsletterDescription="Monthly newsletter covering product releases, fintech trends, and CFO insights."
        copyright={`© ${new Date().getFullYear()} Apex Financial Technologies, Inc.`}
        legalLinks={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Security', href: '#' },
          { label: 'Compliance', href: '#' },
        ]}
      />
    </div>
  );
}
