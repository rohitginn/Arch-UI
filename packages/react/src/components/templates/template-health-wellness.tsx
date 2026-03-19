'use client';

import { cn } from '@archui/core';
import { HeroCentered } from '../blocks/hero';
import { MarqueeLogos, StatsSection, TestimonialsGrid } from '../blocks/social-proof';
import { FeaturesGrid, FeaturesAlternating } from '../blocks/features';
import { PricingCards } from '../blocks/pricing';
import { FAQAccordion } from '../blocks/faq';
import { CallToActionBanner } from '../blocks/misc';
import { FooterComplex } from '../blocks/footer';
import { FluidLightscape } from '../backgrounds';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconHeart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconActivity = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconMoon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
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

const PARTNER_LOGOS = [
  'https://placehold.co/120x36/f0fdf4/15803d?text=Google',
  'https://placehold.co/120x36/f0fdf4/15803d?text=Spotify',
  'https://placehold.co/120x36/f0fdf4/15803d?text=Notion',
  'https://placehold.co/120x36/f0fdf4/15803d?text=Figma',
  'https://placehold.co/120x36/f0fdf4/15803d?text=Stripe',
  'https://placehold.co/120x36/f0fdf4/15803d?text=Shopify',
];

const PILLAR_FEATURES = [
  {
    icon: <IconHeart />,
    title: 'Mental wellbeing',
    description: 'Guided meditation, stress tracking, and therapist-backed cognitive tools tailored to each person\'s baseline and goals.',
  },
  {
    icon: <IconActivity />,
    title: 'Physical health',
    description: 'Movement goals, ergonomic check-ins, and integration with Apple Health and Garmin to surface burnout signals early.',
  },
  {
    icon: <IconMoon />,
    title: 'Sleep quality',
    description: 'Personalized sleep hygiene programs based on schedule, role, and wearable data. Correlate sleep with productivity and mood.',
  },
  {
    icon: <IconUsers />,
    title: 'Social connection',
    description: 'Team rituals, peer recognition, and connection scores that flag isolation before it becomes a retention risk.',
  },
];

const ALTERNATING_SECTIONS = [
  {
    title: 'Give managers the signals they can act on.',
    description: 'Aggregate wellbeing scores at the team level — not individual, never invasive. Managers see trends, not private data, so they can have better conversations earlier.',
    image: { src: 'https://placehold.co/600x400/f0fdf4/16a34a?text=Manager+Dashboard', alt: 'Manager wellbeing dashboard' },
  },
  {
    title: 'Benefits your employees will actually use.',
    description: 'Seamless SSO, Slack-native nudges, and a mobile app with a 74% weekly active user rate. This is not another platform that sits unused after onboarding.',
    image: { src: 'https://placehold.co/600x400/f0fdf4/16a34a?text=Employee+App', alt: 'Employee wellness app' },
  },
  {
    title: 'ROI you can present to your CFO.',
    description: 'Track wellbeing program impact against eNPS, retention, and absenteeism. Pre-built reports for board decks and executive reviews, with correlations that tell a story.',
    image: { src: 'https://placehold.co/600x400/f0fdf4/16a34a?text=Wellbeing+ROI+Analytics', alt: 'ROI analytics' },
  },
];

const STATS = [
  { value: 74, label: 'Weekly active user rate among enrolled employees', suffix: '%' },
  { value: 32, label: 'Reduction in voluntary turnover after 12 months', suffix: '%' },
  { value: 18, label: 'Improvement in eNPS within 6 months of launch', suffix: 'pts' },
  { value: 4.1, label: 'ROI for every dollar invested', suffix: 'x', decimals: 1 },
];

const TESTIMONIALS = [
  {
    quote: "We'd tried three wellness benefits before Flourish. Utilization was always under 15%. Six months in, we're at 71%. The difference is they built a product people actually want to use daily — not just when they're in crisis.",
    name: 'Keiko Tanaka',
    role: 'Chief People Officer',
    company: 'Meridian Labs',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=KT',
  },
  {
    quote: "Our eNPS went from 18 to 54 in one year. I can't attribute all of that to Flourish, but the qualitative feedback consistently mentions wellbeing support as a reason people feel valued here.",
    name: 'Daniel Park',
    role: 'VP People',
    company: 'Tangent Commerce',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=DP',
  },
  {
    quote: "The manager-facing analytics changed how our team leads prepare for 1-1s. They're not guessing anymore — they have signals. And because the data is aggregated, trust hasn't been an issue.",
    name: 'Nadia Kowalski',
    role: 'Head of HR',
    company: 'Solvex',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=NK',
  },
  {
    quote: "We calculated 4.2x ROI in year one by factoring in reduced turnover alone. When you're spending $40k per engineering hire to replace someone, preventive investment in wellbeing is an obvious financial decision.",
    name: 'Rohan Mehta',
    role: 'CFO',
    company: 'Pulsar AI',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=RM',
  },
  {
    quote: "The Slack integration is the secret weapon. Nudges appear where employees already live — no new app to remember. Participation rates doubled just from switching entry point from email to Slack.",
    name: 'Sofia Berglund',
    role: 'People Experience Lead',
    company: 'Kestrel Systems',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=SB',
  },
  {
    quote: "Setup took one afternoon. Their implementation team handled SSO, Slack integration, and the employee communication templates. We were live and getting engagement within the first 48 hours.",
    name: 'Leon Obi',
    role: 'HR Director',
    company: 'Brightpath',
    avatar: 'https://placehold.co/48x48/d1fae5/065f46?text=LO',
  },
];

const PRICING_PLANS = [
  {
    name: 'Essentials',
    monthlyPrice: 6,
    description: 'Per employee per month. For companies starting their wellbeing program.',
    features: [
      'Mental wellbeing module',
      'Physical health tracking',
      'Slack integration',
      'Team-level analytics (aggregated)',
      'SSO (Google, Okta)',
      'Email support',
    ],
    cta: { label: 'Start pilot', href: '#' },
    badge: 'Min. 50 seats',
  },
  {
    name: 'Professional',
    monthlyPrice: 12,
    description: 'The full platform for people-first companies.',
    features: [
      'Everything in Essentials',
      'Sleep quality module',
      'Social connection module',
      'Manager coaching tools',
      'ROI & board-ready reports',
      'Wearable integrations',
      'Priority support',
    ],
    cta: { label: 'Start pilot', href: '#' },
    recommended: true,
    badge: 'Most popular',
  },
  {
    name: 'Enterprise',
    monthlyPrice: 'Custom',
    description: 'Custom pricing for 500+ employees with advanced requirements.',
    features: [
      'Everything in Professional',
      'Custom content library',
      'Dedicated wellness consultant',
      'Custom integrations (HRIS)',
      'Data residency options',
      'Custom SLA',
      'Executive sponsor reviews',
    ],
    cta: { label: 'Talk to sales', href: '#' },
  },
];

const FAQ_ITEMS = [
  {
    question: 'How is employee privacy protected?',
    answer: 'All individual data is private by default. Managers and HR only see team-level aggregates (minimum group size: 5). We are GDPR and HIPAA compliant. Employees explicitly consent to each integration and can delete their data at any time.',
  },
  {
    question: 'How do you deal with "wellness washing"?',
    answer: 'Great question. We measure actual behavior change and outcomes — not usage for its own sake. Our platform surfaces when programs aren\'t working and recommends adjustments. Low utilization triggers a diagnosis process, not just a push notification.',
  },
  {
    question: 'What does implementation look like?',
    answer: 'Standard implementation takes 2-4 weeks: SSO setup, Slack/Teams integration, communication templates, and a manager readiness session. For enterprise customers, we assign a dedicated implementation manager.',
  },
  {
    question: 'How do you handle employees in different countries?',
    answer: 'Flourish is available in 23 languages and configured for regional compliance (GDPR, LGPD, PIPL). Employee data can be stored in-region. Content is reviewed by local clinical experts.',
  },
  {
    question: 'Can we integrate with our HRIS?',
    answer: 'Yes. Native integrations with Workday, BambooHR, Rippling, Personio, and HiBob. Automatic provisioning/de-provisioning syncs with employee lifecycle events.',
  },
];

const FOOTER_GROUPS = [
  {
    title: 'Product',
    links: [
      { label: 'Mental wellbeing', href: '#' },
      { label: 'Physical health', href: '#' },
      { label: 'Manager tools', href: '#' },
      { label: 'Analytics', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'The Case for Wellbeing', href: '#' },
      { label: 'ROI Calculator', href: '#' },
      { label: 'Help centre', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface HealthWellnessTemplateProps {
  className?: string;
}

/**
 * HealthWellness — B2B employee wellness SaaS (Headspace for Work / Calm Business aesthetic).
 *
 * Accent: Sage / emerald with Dusk tone secondary. Default mode: Light.
 *
 * Sections:
 *   Nav → HeroCentered (FluidLightscape bg) → MarqueeLogos → FeaturesGrid (4 pillars) →
 *   FeaturesAlternating (platform modules) → StatsSection → TestimonialsGrid →
 *   PricingCards (per-seat) → FAQAccordion → CTABanner → FooterComplex
 */
export function HealthWellnessTemplate({ className }: HealthWellnessTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-white dark:bg-neutral-950 antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        logo={
          <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
            flourish<span className="text-emerald-500">.</span>
          </span>
        }
        links={[
          { label: 'Platform', href: '#' },
          { label: 'Science', href: '#' },
          { label: 'Pricing', href: '#' },
          { label: 'Customers', href: '#' },
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
              Start pilot
            </a>
          </div>
        }
      />

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none select-none">
          <FluidLightscape colors={{ a: '#bbf7d0', b: '#d1fae5', c: '#ecfdf5' }} speed={0.3} />
        </div>
        <HeroCentered
          badge="Science-backed employee wellbeing"
          heading="Healthy teams build better companies."
          subheading="Flourish gives your people personalised mental, physical, and social wellbeing support — and gives People leaders the data to measure what's working."
          primaryCta={{ label: 'Start a 60-day pilot', href: '#' }}
          secondaryCta={{ label: 'See how it works', href: '#' }}
        />
      </div>

      {/* ── Logos ── */}
      <div className="bg-neutral-50 dark:bg-neutral-900">
        <MarqueeLogos
          heading="Trusted by people-first teams at"
          logos={PARTNER_LOGOS.map((src, i) => ({ src, alt: `Company ${i + 1}` }))}
          speed="normal"
          pauseOnHover
        />
      </div>

      {/* ── Pillars ── */}
      <FeaturesGrid
        badge="Platform"
        heading="Wellbeing across every dimension."
        subheading="Mental, physical, sleep, and social — four pillars of a whole-person approach. Employees engage with what they need, when they need it."
        features={PILLAR_FEATURES}
        columns={2}
      />

      {/* ── Platform modules ── */}
      <FeaturesAlternating
        badge="Platform"
        heading="A platform built for every dimension of employee health."
        features={ALTERNATING_SECTIONS}
      />

      {/* ── Stats ── */}
      <StatsSection
        heading="The results speak clearly."
        subheading="Measured outcomes from Flourish customers after 12 months of active deployment."
        stats={STATS}
        animated
      />

      {/* ── Testimonials ── */}
      <TestimonialsGrid
        heading="People leaders who made wellbeing a strategy."
        subheading="Not a perk — a competitive advantage."
        testimonials={TESTIMONIALS}
        columns={3}
      />

      {/* ── Pricing ── */}
      <PricingCards
        badge="Pricing"
        heading="Per-seat pricing. Volume discounts available."
        subheading="Start with a 60-day pilot for up to 100 employees — full platform, no credit card."
        plans={PRICING_PLANS}
        currency="$"
        billingToggle
      />

      {/* ── FAQ ── */}
      <FAQAccordion
        heading="Questions we answer before every pilot"
        subheading="Candid answers for HR, legal, and finance."
        items={FAQ_ITEMS}
        singleOpen
      />

      {/* ── CTA ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <CallToActionBanner
            heading="Your team's wellbeing is a strategy, not a benefit."
            subheading="Start a 60-day pilot for up to 100 employees. Full platform, no charge, no commitment."
            align="center"
            primaryAction={
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
              >
                Start free pilot
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
            flourish<span className="text-emerald-500">.</span>
          </span>
        }
        tagline="Employee wellbeing that actually works."
        groups={FOOTER_GROUPS}
        socials={[
          { label: 'LinkedIn', href: '#', icon: <IconLinkedIn /> },
          { label: 'Twitter', href: '#', icon: <IconTwitter /> },
        ]}
        newsletterHeading="People & wellbeing insights"
        newsletterDescription="Research, case studies, and practical guides for HR leaders building healthier workplaces."
        copyright={`© ${new Date().getFullYear()} Flourish Wellbeing, Inc.`}
        legalLinks={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'HIPAA', href: '#' },
          { label: 'Security', href: '#' },
        ]}
      />
    </div>
  );
}
