'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { FeaturesGrid } from '../blocks/features';
import { StatsSection, TestimonialsGrid } from '../blocks/social-proof';
import { FAQAccordion } from '../blocks/faq';
import { CallToActionBanner } from '../blocks/misc';
import { FooterMinimal } from '../blocks/footer';
import { FluidLightscape } from '../backgrounds';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconBolt = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconUsers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const IconSpark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.88 5.76L19.64 9l-4.64 3.38L16.88 18 12 14.88 7.12 18l1.88-5.62L4.36 9l5.76-.24z"/>
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

const FEATURES = [
  {
    icon: <IconBolt />,
    title: 'Blazing fast',
    description:
      'Built on a next-generation architecture that processes tasks in milliseconds, not seconds. Speed is a feature, not an afterthought.',
  },
  {
    icon: <IconUsers />,
    title: 'Built for teams',
    description:
      'Real-time multiplayer collaboration baked in from day one. See live cursors, edits, and comments from your whole team simultaneously.',
  },
  {
    icon: <IconSpark />,
    title: 'Beautifully crafted',
    description:
      'Every pixel deliberate. Every interaction feels right. We obsess over the details so you can focus on the work that matters.',
  },
];

const STATS = [
  { value: 12847, label: 'On waitlist', suffix: '' },
  { value: 847, label: 'Accepted this week', suffix: '' },
  { value: 4.9, label: 'Beta user rating', suffix: '/5', decimals: 1 },
  { value: 94, label: 'Would recommend', suffix: '%' },
];

const TESTIMONIALS = [
  {
    quote: "I've been waiting for something like this for years. The early access version already replaced three tools I was paying for. This is the real deal.",
    name: 'Alex Rivera',
    role: 'Indie maker',
    rating: 5,
  },
  {
    quote: "The beta UX is better than most finished products. If this is what early access looks like, I can't imagine how good launch day will be.",
    name: 'Sarah Kim',
    role: 'Product Designer',
    company: 'Freelance',
    rating: 5,
  },
  {
    quote: "Went from skeptic to daily user in one session. The speed is insane and it just gets out of the way.",
    name: 'Tom Okonkwo',
    role: 'Full-stack developer',
    rating: 5,
  },
];

const FAQ_ITEMS = [
  {
    question: "What exactly is this product?",
    answer: "It's a productivity platform that combines project management, collaboration, and automation into one fluid workspace. Think of it as the tool you always wished existed — finally built properly.",
  },
  {
    question: "When does it officially launch?",
    answer: "We're rolling out beta access in batches every week. Waitlist members get priority access. Full public launch is planned for Q2 2026.",
  },
  {
    question: "How do I get faster access?",
    answer: "Refer friends using your personal waitlist link. Each confirmed referral moves you up significantly. Power referrers have gotten access within 24 hours.",
  },
  {
    question: "Will there be a free plan?",
    answer: "Yes — we're committed to a generous free tier forever. We believe the best tool you actually use beats the expensive tool you don't.",
  },
  {
    question: "Is my data safe?",
    answer: "Absolutely. We're SOC 2 Type I certified (Type II in progress), data is encrypted in transit and at rest, and you own your data completely — always.",
  },
];

/* ------------------------------------------------------------------ */
/*  Waitlist Hero (custom — not a standard block)                       */
/* ------------------------------------------------------------------ */

function WaitlistHero() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [count] = React.useState(12847);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden py-24">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <FluidLightscape grain={0.04} overlay={{ color: '#000000', opacity: 0.88 }} />
      </div>

      {/* Social proof counter */}
      <div className="relative mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        {count.toLocaleString()} people on the waitlist
      </div>

      {/* Headline */}
      <h1 className="relative text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.04] text-white max-w-4xl">
        The tool you've{' '}
        <span className="text-amber-400">been waiting for.</span>{' '}
        Now in beta.
      </h1>

      {/* Sub-copy */}
      <p className="relative mt-8 text-lg lg:text-xl text-zinc-400 max-w-xl leading-relaxed">
        Join {count.toLocaleString()} people on the waitlist. Limited access opens every week — the sooner you're in, the sooner you're building.
      </p>

      {/* Waitlist form */}
      <div className="relative mt-10 w-full max-w-md">
        {submitted ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-white font-semibold text-lg">You're on the list!</p>
            <p className="text-zinc-400 text-sm">We'll email you when your access is ready. Refer friends to move up.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className={cn(
                'flex-1 h-12 px-4 rounded-xl text-sm',
                'bg-white/[0.07] border border-white/10',
                'text-white placeholder:text-zinc-500',
                'focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.1]',
                'transition-all duration-200',
              )}
            />
            <button
              type="submit"
              className={cn(
                'h-12 px-6 rounded-xl text-sm font-semibold whitespace-nowrap',
                'bg-amber-500 hover:bg-amber-400 text-zinc-950',
                'hover:-translate-y-[1px] active:scale-[0.97]',
                'transition-all duration-200',
                'shadow-[0_4px_20px_-4px_rgba(245,158,11,0.5)]',
              )}
            >
              Join waitlist
            </button>
          </form>
        )}
        <p className="mt-3 text-xs text-zinc-600">No spam. Unsubscribe anytime. 847 people accepted this week.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface StartupLaunchTemplateProps {
  className?: string;
}

/**
 * StartupLaunch — Pre-launch waitlist template.
 *
 * Accent: Ember (amber). Default mode: Dark-dominant.
 *
 * Sections:
 *   Nav (minimal) → WaitlistHero → FeaturesGrid → StatsSection →
 *   TestimonialsGrid → FAQAccordion → CallToActionBanner → FooterMinimal
 */
export function StartupLaunchTemplate({ className }: StartupLaunchTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-zinc-950 dark antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        dark
        logo={
          <span className="text-base font-bold tracking-tight text-white">
            launch<span className="text-amber-400">.</span>
          </span>
        }
        links={[]}
        actions={
          <>
            <a href="#" className="hidden md:inline-block text-sm text-zinc-400 hover:text-white transition-colors">
              We're hiring
            </a>
            <div className="w-px h-4 bg-white/10 hidden md:block" />
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-amber-400 transition-colors"
            >
              <IconTwitter />
              <span className="hidden sm:inline">Follow updates</span>
            </a>
          </>
        }
      />

      {/* ── Waitlist Hero ── */}
      <WaitlistHero />

      {/* ── Features ── */}
      <FeaturesGrid
        badge="Why it's different"
        heading="We rethought everything"
        subheading="Not another feature-bloated SaaS. We started from the problem and built backwards."
        features={FEATURES}
        columns={3}
      />

      {/* ── Stats ── */}
      <StatsSection
        heading="Early traction"
        subheading="Real numbers from real beta users. No inflated vanity metrics."
        stats={STATS}
        animated
      />

      {/* ── Testimonials ── */}
      <TestimonialsGrid
        heading="Beta users are saying"
        subheading="Unedited quotes from people who got early access and actually used it."
        testimonials={TESTIMONIALS}
        columns={3}
      />

      {/* ── FAQ ── */}
      <FAQAccordion
        heading="Good questions"
        subheading="Things people ask before getting on the list."
        items={FAQ_ITEMS}
        singleOpen
      />

      {/* ── Second CTA ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <CallToActionBanner
            heading="Still thinking about it?"
            subheading="Your spot is reserved for 48 hours after receiving your invite. Don't miss it."
            align="center"
            primaryAction={
              <a
                href="#"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold bg-amber-500 hover:bg-amber-400 text-zinc-950 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200 shadow-[0_4px_20px_-4px_rgba(245,158,11,0.4)]"
              >
                Claim your spot
              </a>
            }
          />
        </div>
      </section>

      {/* ── Footer ── */}
      <FooterMinimal
        logo={
          <span className="text-sm font-bold text-white">
            launch<span className="text-amber-400">.</span>
          </span>
        }
        links={[
          { label: 'Privacy', href: '#' },
          { label: 'Terms', href: '#' },
          { label: 'Contact', href: '#' },
        ]}
        copyright={`© ${new Date().getFullYear()} Launch Inc.`}
      />
    </div>
  );
}
