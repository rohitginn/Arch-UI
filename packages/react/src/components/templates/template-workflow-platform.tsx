'use client';

import { cn } from '@archui/core';
import { HeroSplit } from '../blocks/hero';
import { MarqueeCards, BentoGrid } from '../blocks/misc';
import { StatsSection, TestimonialsCarousel } from '../blocks/social-proof';
import { FeaturesGrid, FeaturesTabbed } from '../blocks/features';
import { PricingTable } from '../blocks/pricing';
import { FAQTwoColumn } from '../blocks/faq';
import { FooterMinimal } from '../blocks/footer';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconBranch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconBarChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconGitMerge = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/>
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

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Customers', href: '#customers' },
];

const HERO_PROPS = {
  badge: 'Now with AI Copilot →',
  heading: 'Build workflows without writing a line of code.',
  subheading: 'Connect every app your team uses, automate the boring parts, and focus on work that actually matters. Set up in minutes, not months.',
  primaryCta: { label: 'Start free trial', href: '#' },
  secondaryCta: { label: 'Watch demo', href: '#' },
  image: {
    src: 'https://placehold.co/720x500/ecfdf5/059669?text=Workflow+Builder',
    alt: 'WorkflowOS drag-and-drop builder',
  },
};

const INTEGRATION_CARDS = [
  { title: 'Slack', description: 'Send alerts, messages, and approvals directly to any channel.', badge: 'Messaging' },
  { title: 'Salesforce', description: 'Trigger flows from CRM events and push data back automatically.', badge: 'CRM' },
  { title: 'GitHub', description: 'Automate issue triage, PR labeling, and deployment gates.', badge: 'Dev' },
  { title: 'HubSpot', description: 'Sync leads, contacts, and deal stages without manual entry.', badge: 'Marketing' },
  { title: 'Jira', description: 'Create, update, and transition tickets from any trigger.', badge: 'Project' },
  { title: 'Stripe', description: 'Automate dunning, receipts, and subscription lifecycle events.', badge: 'Payments' },
  { title: 'Notion', description: 'Keep databases in sync and generate documents from templates.', badge: 'Docs' },
  { title: 'Airtable', description: 'Read, write, and search records across any base automatically.', badge: 'Data' },
];

const FEATURES = [
  { icon: <IconZap />, title: 'Trigger anything', description: 'Start workflows from webhooks, schedules, email events, form submissions, or any API.' },
  { icon: <IconBranch />, title: 'Branch & filter logic', description: 'If/then branches, loops, and merge paths let you model any real-world process exactly.' },
  { icon: <IconShield />, title: 'Built-in error handling', description: 'Automatic retries with exponential backoff. Dead-letter queues and full execution history.' },
  { icon: <IconClock />, title: 'Human-in-the-loop', description: 'Pause any workflow to wait for approval, input, or file review before continuing.' },
  { icon: <IconBarChart />, title: 'Execution analytics', description: 'Real-time dashboards showing workflow health, step durations, and failure rates.' },
  { icon: <IconGitMerge />, title: 'Version control', description: 'Every workflow has a full version history. Roll back to any previous state in one click.' },
];

const TABS = [
  {
    label: 'Build',
    title: 'Drag, drop, connect.',
    description: 'The visual builder is powerful enough for complex multi-step flows and simple enough for non-technical ops teams. No YAML, no boilerplate.',
    image: { src: 'https://placehold.co/640x420/f0fdf4/16a34a?text=Visual+Builder', alt: 'Visual builder' },
  },
  {
    label: 'Test',
    title: 'Test with real data, safely.',
    description: 'Replay past executions, mock API responses, and step through logic in a sandboxed environment before shipping to production.',
    image: { src: 'https://placehold.co/640x420/f0fdf4/16a34a?text=Test+Runner', alt: 'Test runner' },
  },
  {
    label: 'Monitor',
    title: 'Full observability, zero setup.',
    description: 'Every execution is logged with full input/output at each step. Search by workflow, status, or time range. No external logging tools needed.',
    image: { src: 'https://placehold.co/640x420/f0fdf4/16a34a?text=Monitoring+Dashboard', alt: 'Monitoring' },
  },
];

const BENTO_ITEMS = [
  { title: '3,200+', description: 'App integrations available out of the box' },
  { title: '99.98%', description: 'Workflow execution reliability over the last 12 months' },
  { title: '<40ms', description: 'Median trigger-to-action latency for synchronous flows' },
  { title: '1M+', description: 'Workflows running in production this month' },
];

const STATS = [
  { value: 8, label: 'Hours saved per employee per week', suffix: 'hrs' },
  { value: 62, label: 'Reduction in manual data entry errors', suffix: '%' },
  { value: 11, label: 'Minutes to build and ship your first workflow', suffix: 'min' },
  { value: 3200, label: 'Native integrations, no code required', suffix: '+' },
];

const PRICING_FEATURES = [
  { name: 'Active workflows', values: { Starter: '5', Growth: 'Unlimited', Enterprise: 'Unlimited' } },
  { name: 'Monthly executions', values: { Starter: '5,000', Growth: 'Unlimited', Enterprise: 'Unlimited' } },
  { name: 'Steps per workflow', values: { Starter: '20', Growth: 'Unlimited', Enterprise: 'Unlimited' } },
  { name: 'Connected apps', values: { Starter: '10', Growth: 'Unlimited', Enterprise: 'Unlimited' } },
  { name: 'Version history', values: { Starter: '7 days', Growth: '90 days', Enterprise: 'Unlimited' } },
  { name: 'Human-in-the-loop', values: { Starter: false, Growth: true, Enterprise: true } },
  { name: 'Custom code steps', values: { Starter: false, Growth: true, Enterprise: true } },
  { name: 'Execution analytics', values: { Starter: false, Growth: true, Enterprise: true } },
  { name: 'SSO / SAML', values: { Starter: false, Growth: false, Enterprise: true } },
  { name: 'SLA guarantee', values: { Starter: false, Growth: false, Enterprise: true } },
  { name: 'Dedicated CSM', values: { Starter: false, Growth: false, Enterprise: true } },
  { name: 'On-prem deploy', values: { Starter: false, Growth: false, Enterprise: true } },
];

const PRICING_PLANS = [
  {
    name: 'Starter',
    monthlyPrice: 29,
    annualPrice: 23,
    cta: { label: 'Start free trial', href: '#' },
  },
  {
    name: 'Growth',
    monthlyPrice: 99,
    annualPrice: 79,
    cta: { label: 'Start free trial', href: '#' },
    recommended: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 0,
    annualPrice: 0,
    cta: { label: 'Contact sales', href: '#' },
  },
];

const TESTIMONIALS = [
  {
    quote: "We replaced seven different tools — Zapier, Make, custom Python scripts, a whole mess — with WorkflowOS. Our ops team went from spending 30% of their time on manual work to under 5%. That's not an exaggeration.",
    name: 'Jordan Lee',
    role: 'VP Operations',
    company: 'Cascade Commerce',
  },
  {
    quote: "The human-in-the-loop feature alone sold me. Being able to pause a workflow for a manager approval and then continue automatically is exactly what our compliance process needed.",
    name: 'Sasha Petrov',
    role: 'Head of Engineering',
    company: 'Forkwise',
  },
  {
    quote: "I'm not technical. At all. I built our entire onboarding and billing automation in a weekend using the visual builder. My engineering team couldn't believe I'd done it without them.",
    name: 'Carmen Obi',
    role: 'Founder',
    company: 'Orbit Studio',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How does pricing work for executions?',
    answer: 'An execution is one complete run of a workflow from trigger to final step. Partial executions (e.g., workflows that error before completing) still count. You can monitor usage in real time from your dashboard.',
  },
  {
    question: 'Can I connect to APIs that aren\'t in your integration library?',
    answer: 'Absolutely. Our HTTP action lets you call any REST or GraphQL API with full header and body customization. For more complex scenarios, the custom code step (JavaScript) lets you write arbitrary logic.',
  },
  {
    question: 'How do you handle failures and retries?',
    answer: 'All workflows retry automatically on transient failures with exponential backoff (3 attempts by default, configurable per step). Failed runs are logged in full and can be individually re-triggered from the dashboard.',
  },
  {
    question: 'Is data encrypted in transit and at rest?',
    answer: 'Yes. All data is encrypted with TLS 1.3 in transit and AES-256 at rest. We\'re SOC 2 Type II certified. Enterprise customers can also enable data residency to keep execution data in a specific region.',
  },
  {
    question: 'Can I self-host WorkflowOS?',
    answer: 'On-premise deployment is available on Enterprise plans. It runs as a set of Docker containers on your own infrastructure, with the same feature set as the cloud version.',
  },
  {
    question: 'Does WorkflowOS have an API?',
    answer: 'Yes. You can trigger workflows, fetch execution history, and manage configurations programmatically via our REST API. SDKs are available for JavaScript, Python, Go, and Ruby.',
  },
];

const FOOTER_LINKS = [
  { label: 'Features', href: '#' },
  { label: 'Integrations', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Docs', href: '#' },
  { label: 'Status', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface WorkflowPlatformTemplateProps {
  className?: string;
}

/**
 * WorkflowPlatform — No-code automation platform (Zapier / Make.com aesthetic).
 *
 * Accent: Sage / emerald. Default mode: Light.
 *
 * Sections:
 *   Nav → HeroSplit → MarqueeCards (integrations) → FeaturesGrid →
 *   FeaturesTabbed → BentoGrid → StatsSection → PricingTable →
 *   TestimonialsCarousel → FAQTwoColumn → FooterMinimal
 */
export function WorkflowPlatformTemplate({ className }: WorkflowPlatformTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-white dark:bg-neutral-950 antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        logo={
          <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
            Workflow<span className="text-emerald-500">OS</span>
          </span>
        }
        links={NAV_LINKS}
        actions={
          <div className="flex items-center gap-3">
            <a href="#" className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">
              Sign in
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
            >
              Start free trial
            </a>
          </div>
        }
      />

      {/* ── Hero ── */}
      <HeroSplit {...HERO_PROPS} />

      {/* ── Integrations marquee ── */}
      <div id="integrations" className="bg-neutral-50 dark:bg-neutral-900 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-neutral-500 mb-10">
            3,200+ integrations ready to connect
          </p>
          <MarqueeCards
            topRow={INTEGRATION_CARDS.map(card => ({
              title: card.title,
              description: card.description,
            }))}
            speed="normal"
          />
        </div>
      </div>

      {/* ── Features grid ── */}
      <div id="features">
        <FeaturesGrid
          badge="Platform"
          heading="Everything you need to automate anything."
          subheading="From simple two-step automations to complex multi-path enterprise workflows — one platform handles it all."
          features={FEATURES}
          columns={3}
        />
      </div>

      {/* ── Tabbed feature walkthrough ── */}
      <FeaturesTabbed
        badge="How it works"
        heading="Build. Test. Ship. Monitor."
        subheading="A complete workflow lifecycle in one tool. No context switching, no extra dashboards."
        features={TABS}
      />

      {/* ── Bento stats ── */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <BentoGrid
          items={BENTO_ITEMS.map(i => ({
            title: i.title,
            description: i.description,
          }))}
          columns={4}
        />
      </div>

      {/* ── Stats ── */}
      <StatsSection
        heading="The return on automation"
        subheading="Average results reported by customers after 90 days of active use."
        stats={STATS}
        animated
      />

      {/* ── Pricing ── */}
      <div id="pricing">
        <PricingTable
          heading="Simple, predictable pricing."
          subheading="Start free. Upgrade when you're ready. Cancel anytime."
          features={PRICING_FEATURES}
          plans={PRICING_PLANS}
          currency="$"
          billingToggle
        />
      </div>

      {/* ── Testimonials ── */}
      <div id="customers">
        <TestimonialsCarousel
          heading="Teams who stopped drowning in manual work"
          subheading="From one-person startups to 10,000-person enterprises."
          testimonials={TESTIMONIALS}
          autoPlay={8000}
        />
      </div>

      {/* ── FAQ ── */}
      <FAQTwoColumn
        heading="Common questions"
        subheading="Can't find what you're looking for? Email us at support@workflowos.com"
        items={FAQ_ITEMS}
      />

      {/* ── Footer ── */}
      <FooterMinimal
        logo={
          <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
            Workflow<span className="text-emerald-500">OS</span>
          </span>
        }
        links={FOOTER_LINKS}
        copyright={`© ${new Date().getFullYear()} WorkflowOS, Inc.`}
        socials={[
          { label: 'Twitter', href: '#', icon: <IconTwitter /> },
        ]}
      />
    </div>
  );
}
