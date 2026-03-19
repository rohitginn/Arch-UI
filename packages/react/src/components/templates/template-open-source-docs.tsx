'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { HeroTerminal } from '../blocks/hero';
import { StatsSection, TestimonialsGrid } from '../blocks/social-proof';
import { FeaturesGrid, FeaturesAlternating } from '../blocks/features';
import { BentoGrid, MarqueeCards } from '../blocks/misc';
import { ContactMinimal } from '../blocks/contact';
import { FooterMinimal } from '../blocks/footer';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconPackage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconCode = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);
const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconAccessibility = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 14.14 14.14M12 8v4M8.46 8.46l3.54 3.54"/>
  </svg>
);
const IconGitHub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
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

const TERMINAL_LINES = [
  { text: '$ npm install @archui/react' },
  { text: '+ @archui/react@2.1.0', isOutput: true },
  { text: 'added 3 packages in 1.4s', isOutput: true },
  { text: "$ import { Button, Card, Modal } from '@archui/react'" },
  { text: '// Typed. Accessible. Composable.', isOutput: true },
  { text: '<Button variant="solid" size="md">Hello, ArchUI</Button>' },
  { text: '▶ Rendered in 0ms', isOutput: true },
];

const PRINCIPLES = [
  { icon: <IconPackage />, title: 'Zero config install', description: 'Works out of the box with any React 18+ project. One package, full tree-shaking, no peer dependency hell.' },
  { icon: <IconCode />, title: 'Fully typed', description: 'Comprehensive TypeScript types for every prop, variant, and compound component. IntelliSense that actually helps.' },
  { icon: <IconZap />, title: 'Tiny bundle', description: '14kB gzipped for the full library. Individual components import-as-needed. No runtime CSS-in-JS overhead.' },
  { icon: <IconLayers />, title: 'Composable', description: 'Headless primitives with styled defaults. Use the styled version, bring your own styles, or compose from scratch.' },
  { icon: <IconAccessibility />, title: 'Accessible by default', description: 'WCAG 2.1 AA. Every interactive component passes axe-core audit. Keyboard navigation and screen reader tested.' },
  { icon: <IconGitHub />, title: 'Open source forever', description: 'MIT licensed. No "community edition" vs paid tiers. Every feature ships to everyone — always.' },
];

const ALTERNATING_SECTIONS = [
  {
    title: 'Documentation that keeps up with the code.',
    description: 'Every component has live interactive examples, full prop tables, copy-paste snippets, and accessibility notes. Generated from source — never out of date.',
    image: { src: 'https://placehold.co/600x400/fafafa/374151?text=Interactive+Docs', alt: 'Interactive docs' },
  },
  {
    title: 'Your brand, not ours.',
    description: 'CSS custom properties for every design token. Drop-in theming with a single config object. Or go lower: override individual component classes without !important battles.',
    image: { src: 'https://placehold.co/600x400/fafafa/374151?text=Theming+System', alt: 'Theming system' },
  },
  {
    title: 'Framework-agnostic, not framework-ignorant.',
    description: 'The React package is first, and Native and Vue are in active development. Server components supported. Works with Remix, Next.js, Vite, and Astro without configuration.',
    image: { src: 'https://placehold.co/600x400/fafafa/374151?text=Framework+Support', alt: 'Framework support' },
  },
];

const COMMUNITY_CARDS = [
  { title: 'GitHub Discussions', description: 'Ask questions, share patterns, and vote on roadmap items directly with maintainers.', badge: 'Community' },
  { title: 'Discord Server', description: '4,200+ developers chatting about components, patterns, and accessibility implementation.', badge: 'Chat' },
  { title: 'Weekly Office Hours', description: 'Live video session with maintainers every Thursday. Bring your hardest component questions.', badge: 'Live' },
  { title: 'Component Cookbook', description: 'Community-contributed recipes for common patterns: auth forms, data tables, dashboards.', badge: 'Resource' },
];

const BENTO_ITEMS = [
  { title: '12k+', description: 'GitHub stars — and growing every week' },
  { title: '340+', description: 'Contributors who\'ve shipped a PR' },
  { title: '2.1M', description: 'npm downloads in the last 30 days' },
  { title: '47', description: 'Production-ready components, fully documented' },
];

const STATS = [
  { value: 12000, label: 'GitHub stars', suffix: '+' },
  { value: 340, label: 'Open source contributors', suffix: '+' },
  { value: 2.1, label: 'Monthly npm downloads (millions)', suffix: 'M', decimals: 1 },
  { value: 100, label: 'WCAG 2.1 AA compliant components', suffix: '%' },
];

const TESTIMONIALS = [
  {
    quote: "ArchUI is the first component library I've used where I don't eventually hit a wall. Need to customize deeply? The API is there. Need it to just work? That works too. No hidden ceiling.",
    name: 'Léa Moreau',
    role: 'Senior Frontend Engineer',
    company: 'Cascade',
    avatar: 'https://placehold.co/48x48/f3f4f6/374151?text=LM',
  },
  {
    quote: "I shipped a full design system on top of ArchUI in 6 weeks. The token system maps directly to our Figma variables. The accessibility primitives passed our audit first try. I'm not going back to building from scratch.",
    name: 'James Okafor',
    role: 'Staff Engineer',
    company: 'Vertice',
    avatar: 'https://placehold.co/48x48/f3f4f6/374151?text=JO',
  },
  {
    quote: "The bundle size was the deciding factor for us. We're on a performance budget and every kB counts. ArchUI at 14kB gzipped for the full library — other options weren't even in the conversation.",
    name: 'Yuki Takahashi',
    role: 'Performance Engineer',
    company: 'Meridian',
    avatar: 'https://placehold.co/48x48/f3f4f6/374151?text=YT',
  },
  {
    quote: "I've been contributing to ArchUI for eight months. The codebase is exceptionally well-structured, the maintainers review PRs thoughtfully, and the contributor guide actually works. Rare in OSS.",
    name: 'Priya Nair',
    role: 'Open Source Contributor',
    company: 'Independent',
    avatar: 'https://placehold.co/48x48/f3f4f6/374151?text=PN',
  },
  {
    quote: "Screen reader users on our platform have never had a better experience, and I can point directly to using ArchUI as the reason. The ARIA implementations are correct — which is more than I can say for most libraries.",
    name: 'Tom Erikson',
    role: 'Accessibility Lead',
    company: 'Clearview',
    avatar: 'https://placehold.co/48x48/f3f4f6/374151?text=TE',
  },
  {
    quote: "My team spent a week evaluating libraries. ArchUI won on TypeScript quality alone. Discriminated union variants, conditional required props, polymorphic `as` prop with correct inference — it's the only library that got it right.",
    name: 'Sara Novak',
    role: 'Frontend Architect',
    company: 'Stratum',
    avatar: 'https://placehold.co/48x48/f3f4f6/374151?text=SN',
  },
];

const FOOTER_LINKS = [
  { label: 'Docs', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Discord', href: '#' },
  { label: 'Changelog', href: '#' },
  { label: 'Roadmap', href: '#' },
  { label: 'Contributing', href: '#' },
  { label: 'License', href: '#' },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface OpenSourceDocsTemplateProps {
  className?: string;
}

/**
 * OpenSourceDocs — OSS library landing page (Tailwind / shadcn / Radix aesthetic).
 *
 * Accent: Graphite / Iron. Supports light and dark toggle from the nav.
 *
 * Sections:
 *   Nav (GitHub stars + dark toggle) → HeroTerminal (install cmd) →
 *   FeaturesGrid (6 principles) → BentoGrid (stats) → FeaturesAlternating →
 *   MarqueeCards (community) → StatsSection → TestimonialsGrid →
 *   ContactMinimal (contribute CTA) → FooterMinimal
 */
export function OpenSourceDocsTemplate({ className }: OpenSourceDocsTemplateProps) {
  const [dark, setDark] = React.useState(false);

  return (
    <div className={cn('min-h-screen bg-white antialiased', dark && 'dark bg-neutral-950', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        logo={
          <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-white">
            arch<span className="text-neutral-400 dark:text-neutral-500">ui</span>
          </span>
        }
        links={[
          { label: 'Docs', href: '#' },
          { label: 'Components', href: '#' },
          { label: 'Examples', href: '#' },
          { label: 'Changelog', href: '#' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <IconGitHub />
              <span>12.3k</span>
            </a>
            <button
              onClick={() => setDark(d => !d)}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
            >
              {dark ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-100 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
            >
              <IconGitHub />
              <span>Star on GitHub</span>
            </a>
          </div>
        }
      />

      {/* ── Hero ── */}
      <HeroTerminal
        badge="v2.1.0 released — 7 new components →"
        heading="Build faster with components that are actually yours."
        subheading="Open-source React component library. Fully typed, accessible by default, composable to the core. MIT license. No strings, no tiers, no hidden paywalls."
        lines={TERMINAL_LINES}
        primaryCta={{ label: 'Get started', href: '#' }}
      />

      {/* ── Principles ── */}
      <FeaturesGrid
        badge="Philosophy"
        heading="Six principles we don't compromise on."
        subheading="Every decision in the library traces back to at least one of these."
        features={PRINCIPLES}
        columns={3}
      />

      {/* ── Numbers ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700 mb-4">Community</span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Trusted at scale.</h2>
          </div>
          <BentoGrid
            items={BENTO_ITEMS.map(i => ({ title: i.title, description: i.description }))}
            columns={4}
          />
        </div>
      </section>

      {/* ── Alternating ── */}
      <FeaturesAlternating
        badge="Developer experience"
        heading="Everything you need to build a great product."
        features={ALTERNATING_SECTIONS}
      />

      {/* ── Community marquee ── */}
      <div className="bg-neutral-50 dark:bg-neutral-900 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm font-medium uppercase tracking-widest text-neutral-500 mb-10">
            Built in the open, for the community
          </p>
          <MarqueeCards
            topRow={COMMUNITY_CARDS.map(c => ({ title: c.title, description: c.description }))}
            speed="slow"
          />
        </div>
      </div>

      {/* ── Stats ── */}
      <StatsSection
        heading="Growing every week."
        subheading="Open source momentum, measured by the community."
        stats={STATS}
        animated
      />

      {/* ── Testimonials ── */}
      <TestimonialsGrid
        heading="What developers are saying."
        subheading="Real feedback from engineers using ArchUI in production."
        testimonials={TESTIMONIALS}
        columns={3}
      />

      {/* ── Contribute CTA ── */}
      <ContactMinimal
        heading="Want to improve ArchUI?"
        description="We'd love your help — whether it's a bug report, a new component idea, or a full PR. Reach the maintainer team at the email below."
        email="contribute@archui.dev"
        ctaLabel="Open an issue on GitHub"
      />

      {/* ── Footer ── */}
      <FooterMinimal
        logo={
          <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
            arch<span className="text-neutral-400 dark:text-neutral-500">ui</span>
          </span>
        }
        links={FOOTER_LINKS}
        copyright={`© ${new Date().getFullYear()} ArchUI Contributors — MIT License`}
        socials={[
          { label: 'GitHub', href: '#', icon: <IconGitHub /> },
          { label: 'Twitter', href: '#', icon: <IconTwitter /> },
        ]}
      />
    </div>
  );
}
