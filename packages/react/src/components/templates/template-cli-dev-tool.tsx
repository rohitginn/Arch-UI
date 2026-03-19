'use client';

import { cn } from '@archui/core';
import { HeroTerminal } from '../blocks/hero';
import { BentoGrid } from '../blocks/misc';
import { StatsSection } from '../blocks/social-proof';
import { FeaturesGrid, FeaturesAlternating } from '../blocks/features';
import { ContactMinimal } from '../blocks/contact';
import { FooterDark } from '../blocks/footer';
import { KineticTessellation } from '../backgrounds';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconTerminal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
  </svg>
);
const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconPackage = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconCpu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);
const IconGlobe = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);
const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconGitHub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Hero terminal lines                                                 */
/* ------------------------------------------------------------------ */

const TERMINAL_LINES = [
  { text: '$ npm install -g forge-cli' },
  { text: '✔ forge-cli@3.4.1 installed globally', isOutput: true },
  { text: '$ forge init my-project --template=api' },
  { text: 'Scaffolding project...', isOutput: true },
  { text: '✔ Created my-project/', isOutput: true },
  { text: '✔ Installed 24 dependencies in 2.3s', isOutput: true },
  { text: '$ cd my-project && forge dev' },
  { text: '▶ API server running on http://localhost:4000', isOutput: true },
  { text: '▶ Hot-reload active. Watching for changes...', isOutput: true },
];

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: <IconTerminal />,
    title: 'forge init',
    description: 'Scaffold any project type in seconds. Pass --template for instant boilerplate. Works with API, CLI, worker, and full-stack presets.',
  },
  {
    icon: <IconZap />,
    title: 'forge dev',
    description: 'Incremental builds with sub-100ms HMR. Pass --turbo for parallel execution across monorepo packages.',
  },
  {
    icon: <IconPackage />,
    title: 'forge build',
    description: 'Optimised production bundles with treeshaking and minification. Pass --analyze to open the bundle explorer.',
  },
  {
    icon: <IconCpu />,
    title: 'forge run',
    description: 'Execute any script in the project context with automatic env file loading. Pass --watch to auto-restart on file changes.',
  },
  {
    icon: <IconGlobe />,
    title: 'forge deploy',
    description: 'One command to build, verify, and ship to any provider. Pass --dry-run to preview the deployment manifest first.',
  },
  {
    icon: <IconLock />,
    title: 'forge secrets',
    description: 'Encrypted secret management synced to your team vault. Pass --env prod to target specific environment tiers.',
  },
];

const ALTERNATING_FEATURES = [
  {
    title: 'From zero to running in under 60 seconds.',
    description: 'One command to initialize, install, and start your development server. Templates for APIs, CLIs, workers, and full-stack apps included out of the box.',
    image: { src: 'https://placehold.co/600x400/171717/404040?text=forge+init+demo', alt: 'forge init' },
  },
  {
    title: "Builds that don't break your flow.",
    description: 'Incremental compilation means only changed files are rebuilt. Cold build on a 300k-line monorepo: 4.1s. Rebuild after a single file change: 80ms.',
    image: { src: 'https://placehold.co/600x400/171717/404040?text=Build+Benchmarks', alt: 'Build performance' },
  },
  {
    title: 'Consistent environments across every machine.',
    description: 'forge.lock and the env management system ensure every developer, CI runner, and production server runs the exact same configuration.',
    image: { src: 'https://placehold.co/600x400/171717/404040?text=Team+Config+Sync', alt: 'Team environments' },
  },
];

const BENTO_ITEMS = [
  { title: '80ms', description: 'Median rebuild time after a single file change' },
  { title: '4.1s', description: 'Cold build on a 300k-line TypeScript monorepo' },
  { title: '12x', description: 'Faster than webpack on equivalent benchmark projects' },
  { title: '14MB', description: 'Total install size — no bloated dependency chains' },
];

const STATS = [
  { value: 80000, label: 'Developers using Forge in production', suffix: '+' },
  { value: 2.4, label: 'Billion builds executed this year', suffix: 'B', decimals: 1 },
  { value: 4.9, label: 'Average rating on npm', suffix: '/5', decimals: 1 },
  { value: 98, label: 'Of users report faster CI than previous tooling', suffix: '%' },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface CliDevToolTemplateProps {
  className?: string;
}

/**
 * CLIDevTool — Developer CLI tool landing page (Warp / Railway / Depot aesthetic).
 *
 * Accent: Iron / neutral. Forced dark mode.
 *
 * Sections:
 *   Nav → HeroTerminal (KineticTessellation bg) → FeaturesGrid (kbd shortcuts) →
 *   FeaturesAlternating (3 workflow demos) → BentoGrid (benchmark metrics) →
 *   StatsSection → ContactMinimal → FooterDark
 */
export function CliDevToolTemplate({ className }: CliDevToolTemplateProps) {
  return (
    <div className={cn('dark min-h-screen bg-neutral-950 antialiased', className)}>
      {/* ── Navigation ── */}
      <TemplateNav
        dark
        logo={
          <span className="flex items-center gap-1.5 text-base font-bold tracking-tight text-white font-mono">
            <span className="text-neutral-500">$</span> forge
          </span>
        }
        links={[
          { label: 'Docs', href: '#' },
          { label: 'Commands', href: '#' },
          { label: 'Changelog', href: '#' },
          { label: 'GitHub', href: '#' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              <IconGitHub />
              <span>7.2k</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold font-mono bg-white text-neutral-950 hover:bg-neutral-200 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
            >
              npm i -g forge-cli
            </a>
          </div>
        }
      />

      {/* ── Hero ── */}
      <div className="relative">
        <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
          <KineticTessellation />
        </div>
        <HeroTerminal
          badge="v3.4 — Now with Turbo mode →"
          heading="The CLI that gets out of your way."
          subheading="Initialize, develop, build, and deploy any project with a single consistent tool. No config needed. No plugin chaos. Just flow."
          lines={TERMINAL_LINES}
          primaryCta={{ label: 'Get started', href: '#' }}
        />
      </div>

      {/* ── Commands / Features ── */}
      <FeaturesGrid
        badge="Commands"
        heading="Six commands. Every workflow covered."
        subheading="A small, orthogonal API. Learn once, use on every project."
        features={FEATURES}
        columns={3}
      />

      {/* ── Alternating workflow demos ── */}
      <FeaturesAlternating
        badge="Workflow"
        heading="Three workflows. One tool."
        features={ALTERNATING_FEATURES}
      />

      {/* ── Benchmark bento ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-neutral-800 text-neutral-400 mb-4">Benchmarks</span>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">Benchmarked. Verified. Reproducible.</h2>
          </div>
          <BentoGrid
            items={BENTO_ITEMS.map(i => ({ title: i.title, description: i.description }))}
            columns={4}
          />
        </div>
      </section>

      {/* ── Community stats ── */}
      <StatsSection
        heading="Adopted by developers worldwide"
        subheading="Numbers from the last 30 days."
        stats={STATS}
        animated
      />

      {/* ── Contact / enterprise ── */}
      <ContactMinimal
        heading="Need SSO, audit logs, or on-prem?"
        description="We support enterprise teams with dedicated onboarding, custom SLAs, and air-gapped installs. Email us and an engineer will get back to you."
        email="enterprise@forge-cli.dev"
        ctaLabel="Email enterprise team"
      />

      {/* ── Footer ── */}
      <FooterDark
        logo={
          <span className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-white font-mono">
            <span className="text-neutral-500">$</span> forge
          </span>
        }
        tagline="Built for developers who value their time."
        groups={[
          {
            title: 'Docs',
            links: [
              { label: 'Getting started', href: '#' },
              { label: 'CLI reference', href: '#' },
              { label: 'Plugins', href: '#' },
              { label: 'Changelog', href: '#' },
            ],
          },
          {
            title: 'Community',
            links: [
              { label: 'GitHub', href: '#' },
              { label: 'Discord', href: '#' },
              { label: 'Twitter', href: '#' },
              { label: 'Newsletter', href: '#' },
            ],
          },
        ]}
        copyright={`© ${new Date().getFullYear()} Forge CLI Project`}
        legalLinks={[
          { label: 'MIT License', href: '#' },
          { label: 'Privacy', href: '#' },
        ]}
      />
    </div>
  );
}
