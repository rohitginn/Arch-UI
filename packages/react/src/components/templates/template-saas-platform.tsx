'use client';

import { cn } from '@archui/core';
import { HeroCentered } from '../blocks/hero';
import { MarqueeLogos } from '../blocks/social-proof';
import { FeaturesAlternating, FeaturesTabbed } from '../blocks/features';
import { BentoGrid } from '../blocks/misc';
import { StatsSection, TestimonialsGrid } from '../blocks/social-proof';
import { PricingCards } from '../blocks/pricing';
import { FAQAccordion } from '../blocks/faq';
import { CallToActionBanner } from '../blocks/misc';
import { FooterComplex } from '../blocks/footer';
import { KineticTessellation } from '../backgrounds';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG)                                                  */
/* ------------------------------------------------------------------ */

const IconRocket = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.5-3 2.5-4.5 3 0 0 1.5-2 3-4.5m8.5-12.5C13.5 1.5 20.5 1.5 22.5 3.5S22.5 10.5 21 12l-9 9-7-7 9-9z"/>
    <circle cx="15" cy="9" r="1"/>
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Section Data                                                        */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: 'Product', href: '#product' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Blog', href: '#blog' },
];

const LOGO_URLS = [
  'https://placehold.co/120x40/f4f4f5/71717a?text=Stripe',
  'https://placehold.co/120x40/f4f4f5/71717a?text=Shopify',
  'https://placehold.co/120x40/f4f4f5/71717a?text=Vercel',
  'https://placehold.co/120x40/f4f4f5/71717a?text=Figma',
  'https://placehold.co/120x40/f4f4f5/71717a?text=Linear',
  'https://placehold.co/120x40/f4f4f5/71717a?text=Notion',
];

const FEATURES_ALTERNATING = [
  {
    title: 'Deploy in one command',
    description:
      'Push to production in seconds, not hours. Our zero-config deployment pipeline handles everything from build to global distribution automatically.',
    image: { src: 'https://placehold.co/700x460/f4f4f5/18181b?text=Deploy+CLI', alt: 'Deploy CLI interface' },
    bullets: [
      'Instant rollbacks to any previous version',
      'Blue-green zero-downtime deployments',
      'Preview environments for every pull request',
    ],
  },
  {
    title: 'Observe everything in real time',
    description:
      'Live metrics, distributed traces, and structured logs — all in one place. Understand your system\'s behavior the moment something changes.',
    image: { src: 'https://placehold.co/700x460/f4f4f5/18181b?text=Observability+Dashboard', alt: 'Observability dashboard' },
    bullets: [
      'P50 / P95 / P99 latency breakdowns',
      'Automatic anomaly detection and alerting',
      'Full-stack trace correlation across services',
    ],
  },
  {
    title: 'Scale without the ops burden',
    description:
      'Elastic infrastructure that grows with you. Scale from zero to millions of requests without touching a config file or waking up at 3am.',
    image: { src: 'https://placehold.co/700x460/f4f4f5/18181b?text=Auto+Scale+Graph', alt: 'Auto scaling graph' },
    bullets: [
      'Automatic horizontal scaling based on load',
      'Edge caching in 150+ global regions',
      'Dedicated resources at Enterprise tier',
    ],
  },
];

const FEATURES_TABBED = [
  {
    label: 'CLI',
    icon: <IconCode />,
    title: 'Ship from your terminal',
    description:
      'The ArchUI CLI is your control plane. Deploy, inspect logs, manage secrets, and roll back — all without leaving your editor.',
    image: { src: 'https://placehold.co/700x420/18181b/a1a1aa?text=CLI+Screenshot', alt: 'CLI screenshot' },
  },
  {
    label: 'REST API',
    icon: <IconZap />,
    title: 'Integrate with anything',
    description:
      'Our RESTful API gives you programmatic access to every feature. Automate deployments, pull metrics, or build internal tooling on top.',
    image: { src: 'https://placehold.co/700x420/18181b/a1a1aa?text=API+Docs', alt: 'API documentation' },
  },
  {
    label: 'Dashboard',
    icon: <IconGlobe />,
    title: 'Your team\'s mission control',
    description:
      'A unified view of every deployment, every service, every team. Collaborate in real time without losing context.',
    image: { src: 'https://placehold.co/700x420/18181b/a1a1aa?text=Dashboard', alt: 'Dashboard screenshot' },
  },
];

const BENTO_ITEMS = [
  {
    title: '99.99% SLA uptime',
    description: 'Rock-solid infrastructure with automatic failover and redundancy across every tier.',
    icon: <span className="text-2xl">⬛</span>,
    span: { cols: 1 as const, rows: 1 as const },
  },
  {
    title: '150+ Edge Regions',
    description: 'Your code runs close to every user on the planet — latency measured in milliseconds.',
    icon: <span className="text-2xl">🌐</span>,
    span: { cols: 1 as const, rows: 1 as const },
  },
  {
    title: '10,000+ Teams',
    description: 'From bootstrapped startups to public companies, teams trust ArchUI to ship.',
    icon: <span className="text-2xl">👥</span>,
    span: { cols: 1 as const, rows: 1 as const },
  },
  {
    title: '40 integrations',
    description: 'Connect to GitHub, GitLab, Bitbucket, and 37 more tools in your workflow.',
    icon: <span className="text-2xl">🔌</span>,
    span: { cols: 1 as const, rows: 1 as const },
  },
];

const STATS = [
  { value: 99.99, label: 'SLA uptime', suffix: '%' },
  { value: 150, label: 'Edge regions', suffix: '+' },
  { value: 10, label: 'Teams worldwide', suffix: 'K+' },
  { value: 2.8, label: 'Average deploy time', suffix: 's', decimals: 1 },
];

const TESTIMONIALS = [
  {
    quote: "ArchUI cut our deploy time from 12 minutes to under 3. The preview environments alone saved our team thousands of hours this year.",
    name: 'Priya Mehta',
    role: 'VP of Engineering',
    company: 'Stripe',
    rating: 5,
  },
  {
    quote: "We moved our entire monolith to microservices with zero downtime. The observability features made it possible to catch issues before they hit production.",
    name: 'James Crawford',
    role: 'CTO',
    company: 'Scale AI',
    rating: 5,
  },
  {
    quote: "The CLI UX is the best I've used in 15 years of infrastructure work. Someone clearly cared deeply about developer experience.",
    name: 'Sofia Andersen',
    role: 'Platform Engineer',
    company: 'Shopify',
    rating: 5,
  },
  {
    quote: "ArchUI's support team is exceptional. We had a P0 incident at 2am and an engineer was on a call with us in 8 minutes.",
    name: 'Marcus Wu',
    role: 'DevOps Lead',
    company: 'Figma',
    rating: 5,
  },
  {
    quote: "Auto-scaling used to be our biggest operational challenge. Now it just works. We haven't touched a scaling config in 8 months.",
    name: 'Ines Fontaine',
    role: 'Site Reliability Engineer',
    company: 'Notion',
    rating: 5,
  },
  {
    quote: "The pricing is transparent and the value is undeniable. We replaced three separate tools — observability, deployment, and CDN — with one platform.",
    name: 'David Park',
    role: 'Head of Infrastructure',
    company: 'Vercel',
    rating: 5,
  },
];

const PRICING_PLANS = [
  {
    name: 'Hobby',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Perfect for side projects and personal sites.',
    features: [
      '3 projects',
      '100GB bandwidth/month',
      '2 collaborators',
      'Preview deployments',
      'Community support',
    ],
    cta: { label: 'Start for free', href: '#' },
  },
  {
    name: 'Pro',
    monthlyPrice: 49,
    annualPrice: 39,
    description: 'For professional teams shipping real products.',
    features: [
      'Unlimited projects',
      '1TB bandwidth/month',
      '20 team members',
      'All Hobby features',
      'Advanced analytics',
      'Priority support (24h SLA)',
      'Custom domains',
    ],
    cta: { label: 'Start free trial', href: '#' },
    recommended: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    description: 'Dedicated resources for regulated industries and large teams.',
    features: [
      'Everything in Pro',
      'Dedicated infrastructure',
      'SOC 2 Type II & HIPAA',
      '99.99% SLA guarantee',
      'SSO / SAML',
      'Custom contracts',
      '24/7 dedicated support',
    ],
    cta: { label: 'Talk to sales', href: '#' },
  },
];

const FAQ_ITEMS = [
  {
    question: "How does the free tier work?",
    answer: "The Hobby plan is permanently free — no credit card required. You get 3 projects, 100GB bandwidth, and 2 collaborators. When you're ready to scale, upgrade anytime.",
  },
  {
    question: "Can I deploy multiple services from a single repo?",
    answer: "Yes! We natively support monorepos and multi-service architectures. Each service gets its own preview URL, deployment history, and metrics dashboard.",
  },
  {
    question: "What frameworks and runtimes are supported?",
    answer: "We support Next.js, Nuxt, SvelteKit, Remix, Astro, Node.js, Python/FastAPI, Go, Rust, and any Dockerized workload. New runtimes are added every quarter.",
  },
  {
    question: "Do you offer on-premise or private cloud deployment?",
    answer: "Enterprise customers can deploy ArchUI infrastructure into their own AWS, GCP, or Azure account via our private cloud offering. Contact sales for details.",
  },
  {
    question: "How are bandwidth and requests billed?",
    answer: "Bandwidth is billed per GB after the plan limit. There are no per-request fees. Overage pricing is transparent — you'll always see the exact bill before it's charged.",
  },
  {
    question: "What does the 99.99% SLA cover?",
    answer: "The SLA covers uptime of the control plane and edge network. In the event of a breach, we issue service credits automatically — no need to file a claim.",
  },
];

const FOOTER_GROUPS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Roadmap', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'CLI Reference', href: '#' },
      { label: 'Status', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface SaasPlatformTemplateProps {
  /** Additional className for the page wrapper */
  className?: string;
}

/**
 * SaasPlatform — B2B SaaS template (Linear / Vercel / Raycast aesthetic).
 *
 * Accent: Graphite (zinc). Default mode: Light with polished dark-mode support.
 *
 * Sections:
 *   Nav → HeroCentered → MarqueeLogos → FeaturesAlternating →
 *   FeaturesTabbed → BentoGrid → StatsSection → TestimonialsGrid →
 *   PricingCards → FAQAccordion → CallToActionBanner → FooterComplex
 */
export function SaasPlatformTemplate({ className }: SaasPlatformTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-white dark:bg-zinc-950 antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        logo={
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            arch<span className="text-zinc-400">ui</span>
          </span>
        }
        links={NAV_LINKS}
        actions={
          <>
            <a
              href="#"
              className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors duration-150"
            >
              Sign in
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-slate-700 dark:hover:bg-zinc-100 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200 shadow-sm"
            >
              Start free
            </a>
          </>
        }
      />

      {/* ── Hero ── */}
      <HeroCentered
        badge="Now generally available"
        heading="Build software that scales without friction"
        subheading="The platform engineering teams at Stripe, Figma, and Shopify use to ship faster, sleep better, and scale without limits."
        primaryCta={{ label: 'Start building free', href: '#' }}
        secondaryCta={{ label: 'View documentation', href: '#' }}
        background={
          <KineticTessellation
            tileSize={72}
            overlay={{ color: '#000000', opacity: 0.96 }}
          />
        }
      />

      {/* ── Product screenshot ── */}
      <div className="mx-auto max-w-5xl px-6 -mt-8 mb-24">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border',
            'border-zinc-200 dark:border-zinc-800',
            'shadow-[0_24px_80px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.5)]',
            'transition-transform duration-700 hover:-translate-y-1',
          )}
        >
          <img
            src="https://placehold.co/1200x700/f4f4f5/18181b?text=ArchUI+Dashboard+Preview"
            alt="ArchUI platform dashboard"
            className="w-full block"
          />
        </div>
      </div>

      {/* ── Trusted by ── */}
      <MarqueeLogos
        heading="Trusted by engineering teams at"
        logos={LOGO_URLS.map((src, i) => ({ src, alt: `Customer ${i + 1}` }))}
        speed="slow"
        pauseOnHover
      />

      {/* ── Features alternating ── */}
      <FeaturesAlternating
        badge="Product"
        heading="Everything your team needs to ship"
        subheading="From your first commit to your millionth user — ArchUI handles the infrastructure so your team can focus on the product."
        features={FEATURES_ALTERNATING}
      />

      {/* ── Features tabbed ── */}
      <FeaturesTabbed
        badge="Workflow"
        heading="Built for every part of your team"
        subheading="Whether you live in the terminal or prefer a GUI, ArchUI fits into your existing workflow without friction."
        features={FEATURES_TABBED}
      />

      {/* ── Bento metrics ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 mb-4">
              Infrastructure
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Numbers that matter to engineers
            </h2>
          </div>
          <BentoGrid items={BENTO_ITEMS} columns={4} gap="md" />
        </div>
      </section>

      {/* ── Stats ── */}
      <StatsSection
        heading="The numbers speak for themselves"
        subheading="Thousands of teams rely on ArchUI every day to ship critical software."
        stats={STATS}
        animated
      />

      {/* ── Testimonials ── */}
      <TestimonialsGrid
        heading="What engineering teams say"
        subheading="From startups to Fortune 500s — here's what the people who ship every day have to say."
        testimonials={TESTIMONIALS}
        columns={3}
      />

      {/* ── Pricing ── */}
      <PricingCards
        id="pricing"
        heading="Simple, transparent pricing"
        subheading="No hidden fees, no surprise bills. Change plans or cancel anytime."
        billingToggle
        plans={PRICING_PLANS}
        currency="$"
      />

      {/* ── FAQ ── */}
      <FAQAccordion
        heading="Common questions"
        subheading="Everything you need to know before you start building."
        items={FAQ_ITEMS}
        singleOpen
      />

      {/* ── CTA Banner ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <CallToActionBanner
            heading="Deploy your first project in 60 seconds"
            subheading="No credit card required. Free forever on the Hobby plan."
            align="center"
            primaryAction={
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-sm font-semibold bg-slate-900 dark:bg-white text-white dark:text-zinc-950 hover:bg-slate-700 dark:hover:bg-zinc-100 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200 shadow-sm"
              >
                <IconRocket />
                Start for free
              </a>
            }
            secondaryAction={
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-medium border border-zinc-300 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
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
          <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            arch<span className="text-zinc-400">ui</span>
          </span>
        }
        tagline="The platform that gets out of your way."
        groups={FOOTER_GROUPS}
        socials={[
          { label: 'Twitter', href: '#', icon: <IconTwitter /> },
          { label: 'GitHub', href: '#', icon: <IconGithub /> },
        ]}
        newsletterHeading="Stay in the loop"
        newsletterDescription="Product updates, engineering blog posts, and the occasional announcement."
        copyright={`© ${new Date().getFullYear()} ArchUI, Inc.`}
        legalLinks={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Security', href: '#' },
        ]}
      />
    </div>
  );
}
