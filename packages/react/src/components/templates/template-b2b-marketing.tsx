'use client';

import { cn } from '@archui/core';
import React, { useState, useEffect, useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Icons — inline SVG, no icon library                                */
/* ------------------------------------------------------------------ */

const IconTrendingUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);
const IconTarget = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);
const IconBarChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
  </svg>
);
const IconZap = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const IconPenTool = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
  </svg>
);
const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconMinus = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const MARQUEE_RESULTS = [
  '🔺 347% MQL growth for Dataform',
  '🔺 $4.2M ARR added for CloudSync',
  '🔺 2.8x pipeline at same CAC for Aptible',
  '🔺 62% lower CPA for Nuvio',
  '🔺 $1.7M pipeline in 90 days for Stackflow',
];

const CLIENT_LOGOS = [
  'https://placehold.co/120x36/fafafa/18181b?text=Dataform',
  'https://placehold.co/120x36/fafafa/18181b?text=CloudSync',
  'https://placehold.co/120x36/fafafa/18181b?text=Aptible',
  'https://placehold.co/120x36/fafafa/18181b?text=Nuvio',
  'https://placehold.co/120x36/fafafa/18181b?text=Stackflow',
  'https://placehold.co/120x36/fafafa/18181b?text=RevOps',
];

const RESULT_CARDS = [
  { industry: 'Series B SaaS', metric: '347%', label: 'pipeline growth', timeframe: 'in 90 days' },
  { industry: 'Series A DevTool', metric: '2.8x', label: 'leads at same CAC', timeframe: 'in 6 months' },
  { industry: 'Series C Fintech', metric: '$4.2M', label: 'ARR added', timeframe: 'in 12 months' },
  { industry: 'Seed-stage B2B', metric: '62%', label: 'lower CPA', timeframe: 'in 60 days' },
  { industry: 'Series B MarTech', metric: '4.1x', label: 'ROAS improvement', timeframe: 'in 4 months' },
  { industry: 'Series A PLG', metric: '189%', label: 'demo requests', timeframe: 'in 90 days' },
  { industry: 'Series C Data', metric: '$1.7M', label: 'pipeline generated', timeframe: 'in 90 days' },
  { industry: 'Series B Infra', metric: '41%', label: 'shorter sales cycle', timeframe: 'in 6 months' },
];

interface ServiceItem {
  title: string;
  description: string;
  includes: string[];
  result: string;
  price: string;
}

const SERVICES: ServiceItem[] = [
  {
    title: 'Paid Acquisition',
    description: 'Full-funnel paid campaigns across Google, LinkedIn, Meta, and programmatic. We build, test, and scale the channels that drive pipeline — not vanity impressions.',
    includes: ['Campaign architecture & strategy', 'Creative production (static + video)', 'Landing page optimization', 'Bid management & budget allocation', 'Weekly reporting & iteration'],
    result: 'Avg. 2.4x ROAS improvement in 90 days',
    price: 'From $4K/mo',
  },
  {
    title: 'Content & SEO',
    description: 'Bottom-funnel content that ranks, converts, and builds topical authority. We research, write, optimize, and distribute — your team reviews.',
    includes: ['Keyword research & content strategy', 'Long-form articles & guides', 'Technical SEO audits', 'Link building & digital PR', 'Content performance analytics'],
    result: 'Avg. 189% organic traffic growth in 6 months',
    price: 'From $5K/mo',
  },
  {
    title: 'CRO & Experimentation',
    description: 'Data-driven experimentation across your funnel. We audit, hypothesis-test, and iterate to turn more visitors into qualified pipeline.',
    includes: ['Funnel audit & heatmap analysis', 'A/B test design & execution', 'Landing page redesign', 'Form & checkout optimization', 'Statistical significance reporting'],
    result: 'Avg. 60% higher conversion rates',
    price: 'From $3K/mo',
  },
  {
    title: 'Marketing Ops',
    description: 'Build the infrastructure that makes marketing predictable. Attribution, automation, and reporting you can actually trust.',
    includes: ['HubSpot / Salesforce setup', 'Multi-touch attribution', 'Marketing automation workflows', 'Dashboard & reporting setup', 'Data hygiene & enrichment'],
    result: 'Avg. 30% better lead-to-close rates',
    price: 'From $4K/mo',
  },
  {
    title: 'Brand & Creative',
    description: 'Strategic brand positioning and creative systems for SaaS companies ready to look as good as their product works.',
    includes: ['Brand strategy & positioning', 'Visual identity system', 'Website design & development', 'Pitch deck & sales collateral', 'Brand guidelines'],
    result: '3x increase in brand recall metrics',
    price: 'From $8K/mo',
  },
];

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  description: string;
  metrics: { value: string; label: string }[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    company: 'Dataform',
    industry: 'Series B · Data Infrastructure',
    challenge: 'Growing pipeline beyond organic',
    description: 'Dataform had strong organic traction but was stuck at ~$2M ARR with no paid engine. Their sales team was closing but starved for leads. We built a full-funnel paid acquisition system across Google and LinkedIn, combined with CRO on their demo flow.',
    metrics: [
      { value: '347%', label: 'Pipeline growth' },
      { value: '$1.2M', label: 'New ARR in 6 months' },
      { value: '2.8x', label: 'ROAS on paid spend' },
    ],
  },
  {
    company: 'Nuvio',
    industry: 'Series A · Workflow Automation',
    challenge: 'Reducing CAC while scaling spend',
    description: 'Nuvio was spending $80K/mo on ads with a $420 CAC that made unit economics marginal. We restructured their campaign architecture, rebuilt landing pages, and introduced an experimentation cadence that cut waste.',
    metrics: [
      { value: '62%', label: 'Lower CPA' },
      { value: '$160', label: 'New CAC (from $420)' },
      { value: '3.1x', label: 'More demos at same budget' },
    ],
  },
  {
    company: 'Stackflow',
    industry: 'Series C · Developer Platform',
    challenge: 'Building enterprise pipeline from scratch',
    description: 'Stackflow had a PLG motion for individual developers but zero enterprise pipeline. We designed and executed a multi-channel ABM strategy targeting VP Engineering at F500 companies, paired with long-form content and LinkedIn ads.',
    metrics: [
      { value: '$1.7M', label: 'Enterprise pipeline in 90 days' },
      { value: '23', label: 'Enterprise demos booked' },
      { value: '4', label: 'Closed deals (avg. $180K ACV)' },
    ],
  },
];

interface ProcessStep {
  week: string;
  title: string;
  decimalDoes: string;
  clientSees: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    week: 'Week 1–2',
    title: 'Growth audit + strategy',
    decimalDoes: 'Deep-dive into your funnel, analytics, competitors, and positioning. Identify the 3 highest-leverage growth opportunities.',
    clientSees: 'A 30-page growth audit with benchmarks, quick wins, and a 90-day roadmap.',
  },
  {
    week: 'Week 3–4',
    title: 'Infrastructure & tracking',
    decimalDoes: 'Set up attribution, event tracking, CRM integrations, and reporting dashboards. Fix any data gaps.',
    clientSees: 'A live dashboard showing funnel metrics, CAC, and pipeline by channel.',
  },
  {
    week: 'Week 5–6',
    title: 'Launch & calibrate',
    decimalDoes: 'Launch initial campaigns, landing pages, and experiments. Monitor performance daily and make rapid adjustments.',
    clientSees: 'First leads flowing. Weekly performance summaries with clear next steps.',
  },
  {
    week: 'Week 7–12',
    title: 'Scale & optimize',
    decimalDoes: 'Double down on winning channels, kill underperformers. Expand creative, scale budgets, and layer in new experiments.',
    clientSees: 'Predictable pipeline growth. CAC improving week over week. Monthly exec report.',
  },
  {
    week: 'Ongoing',
    title: 'Report, test, compound',
    decimalDoes: 'Continuous optimization, new channel testing, and strategic planning. Quarterly business reviews.',
    clientSees: 'Compounding growth. Transparent reporting. A marketing team that just works.',
  },
];

interface PricingPlan {
  name: string;
  price: string;
  adSpend: string;
  features: string[];
  highlighted?: boolean;
}

const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$8K',
    adSpend: 'Up to $50K ad spend',
    features: [
      'Up to 2 channels',
      'Campaign management',
      'Landing page optimization',
      'Monthly reporting',
      'Slack channel access',
      'Bi-weekly strategy calls',
    ],
  },
  {
    name: 'Scale',
    price: '$18K',
    adSpend: 'Up to $250K ad spend',
    features: [
      'Up to 4 channels',
      'Full creative production',
      'CRO & experimentation',
      'Marketing ops setup',
      'Weekly reporting',
      'Weekly strategy calls',
      'Dedicated growth lead',
    ],
    highlighted: true,
  },
  {
    name: 'Growth',
    price: '$35K+',
    adSpend: 'Unlimited ad spend',
    features: [
      'All channels',
      'Brand & creative',
      'ABM campaigns',
      'Custom attribution',
      'Real-time dashboards',
      'Daily Slack updates',
      'Dedicated team (3–5 people)',
      'Quarterly business reviews',
    ],
  },
];

const AUDIT_INCLUDES = [
  'Current funnel analysis',
  'CAC benchmarks vs. industry',
  '3 quick wins you can implement this week',
  '90-day growth roadmap',
];

const FOOTER_GROUPS = [
  {
    title: 'Services',
    links: [
      { label: 'Paid Acquisition', href: '#' },
      { label: 'Content & SEO', href: '#' },
      { label: 'CRO', href: '#' },
      { label: 'Marketing Ops', href: '#' },
      { label: 'Brand & Creative', href: '#' },
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
  {
    title: 'Resources',
    links: [
      { label: 'Case Studies', href: '#' },
      { label: 'Growth Playbook', href: '#' },
      { label: 'ROI Calculator', href: '#' },
      { label: 'Newsletter', href: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Animated count-up hook                                              */
/* ------------------------------------------------------------------ */

function useCountUp(target: string, duration = 1200, triggerRef: React.RefObject<HTMLElement | null>) {
  const [value, setValue] = useState('0');
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericMatch = target.match(/[\d.]+/);
          if (!numericMatch) { setValue(target); return; }
          const end = parseFloat(numericMatch[0]);
          const prefix = target.slice(0, target.indexOf(numericMatch[0]));
          const suffix = target.slice(target.indexOf(numericMatch[0]) + numericMatch[0].length);
          const isDecimal = numericMatch[0].includes('.');
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * end;
            setValue(prefix + (isDecimal ? current.toFixed(1) : Math.round(current).toString()) + suffix);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, triggerRef]);

  return value;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

/** Metric marquee strip */
function MetricMarquee() {
  const doubled = [...MARQUEE_RESULTS, ...MARQUEE_RESULTS];
  return (
    <div className="relative overflow-hidden w-full bg-zinc-100 dark:bg-zinc-800 py-2.5 group">
      <div className="flex animate-[marquee_25s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap">
        {doubled.map((txt, i) => (
          <React.Fragment key={i}>
            <span className="mx-4 text-xs tracking-wide text-zinc-600 dark:text-zinc-400" style={{ fontFamily: '"DM Mono", monospace' }}>
              {txt}
            </span>
            <span className="text-amber-500 mx-2">|</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/** Single result card with count-up animation */
function ResultCard({ card, index }: { card: typeof RESULT_CARDS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const animatedValue = useCountUp(card.metric, 1200, ref);

  return (
    <div
      ref={ref}
      className={cn(
        'relative p-6 rounded-xl border border-zinc-800 bg-[#111111]',
        'border-l-2 border-l-amber-400/20 hover:border-l-amber-400 transition-all duration-300',
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
        {card.industry}
      </p>
      <p className="text-4xl lg:text-5xl font-bold text-amber-400 mb-2" style={{ fontFamily: '"DM Mono", monospace', fontVariantNumeric: 'tabular-nums' }}>
        {animatedValue}
      </p>
      <p className="text-sm text-zinc-300">{card.label}</p>
      <p className="text-xs text-zinc-600 mt-1">{card.timeframe}</p>
    </div>
  );
}

/** Service tab content */
function ServiceTabContent({ service }: { service: ServiceItem }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 p-6 lg:p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mt-1">
      <div>
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">{service.description}</p>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
          What&apos;s included
        </p>
        <ul className="space-y-2">
          {service.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-amber-500 mt-0.5"><IconCheck /></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col justify-between">
        <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
            Example result
          </p>
          <p className="text-lg font-bold text-zinc-950 dark:text-white" style={{ fontFamily: '"DM Mono", monospace' }}>
            {service.result}
          </p>
        </div>
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-4">{service.price}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface B2bMarketingTemplateProps {
  className?: string;
}

/**
 * B2bMarketing — "Decimal Agency" performance marketing website for B2B SaaS.
 *
 * Palette: Iron (Zinc) + Amber accent. Default mode: Light-bold.
 * Typography: Space Grotesk 800 headings, Inter body, DM Mono for metrics.
 *
 * Sections:
 *   Nav → Metric Marquee → Hero (grid bg) → Proof Logos → Results Wall (dark) →
 *   Services (tabs) → Case Studies → Process Timeline → Pricing →
 *   Growth Audit CTA → Footer
 */
export function B2bMarketingTemplate({ className }: B2bMarketingTemplateProps) {
  const [activeService, setActiveService] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('min-h-screen bg-white dark:bg-zinc-950 antialiased', className)}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700&display=swap');
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
          50% { box-shadow: 0 0 20px 4px rgba(245, 158, 11, 0.3); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800'
            : 'bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800'
        )}
      >
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0.5">
            <span className="text-lg font-extrabold tracking-tight text-zinc-950 dark:text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Decimal
            </span>
            <sup className="text-amber-500 text-xs font-bold ml-0.5">×</sup>
          </a>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-8">
            {['Work', 'Services', 'Process', 'Results', 'Pricing'].map((label) => (
              <a
                key={label}
                href="#"
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              See our work <IconArrowRight />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-semibold bg-amber-500 text-zinc-950 hover:bg-amber-400 active:scale-[0.97] transition-all duration-200"
            >
              Get a growth audit
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* ══════════════════ METRIC MARQUEE ══════════════════ */}
      <MetricMarquee />

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        {/* Background grid */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <div
            className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(to right, #a1a1aa 1px, transparent 1px), linear-gradient(to bottom, #a1a1aa 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Amber orb */}
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <h1
            className="text-zinc-950 dark:text-white leading-[1.05]"
            style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 800 }}
          >
            <span className="block text-5xl sm:text-6xl lg:text-7xl">More pipeline.</span>
            <span className="block text-4xl sm:text-5xl lg:text-6xl mt-2">Lower CAC.</span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2">
              Faster<span className="text-amber-500">.</span>
            </span>
          </h1>

          <p className="mt-8 text-lg lg:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: '"Inter", sans-serif' }}>
            Decimal builds and runs full-funnel marketing systems for B2B SaaS companies. We own the strategy, the creative, and the media — so your team can focus on closing.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-sm font-semibold bg-amber-500 text-zinc-950 hover:bg-amber-400 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
              style={{
                backgroundImage: 'linear-gradient(110deg, transparent 33%, rgba(255,255,255,0.3) 50%, transparent 67%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s linear infinite',
              }}
            >
              Get a free growth audit
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              <img src="https://placehold.co/20x20/fafafa/18181b?text=D" alt="" className="w-5 h-5 rounded-full" />
              See how we grew Dataform by 347% <IconArrowRight />
            </a>
          </div>

          {/* Micro-badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {['2–4x more leads', '30% lower CAC', '60% higher conversion'].map((badge) => (
              <span
                key={badge}
                className="inline-flex px-3 py-1 text-xs font-medium bg-zinc-950 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
                style={{ fontFamily: '"DM Mono", monospace' }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 1 — PROOF LOGOS ══════════════════ */}
      <section className="py-12 border-y border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mb-8" style={{ fontFamily: '"Inter", sans-serif' }}>
            B2B SaaS companies that trust Decimal with their growth.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {CLIENT_LOGOS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Client ${i + 1}`}
                className="h-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 2 — RESULTS WALL ══════════════════ */}
      <section className="py-20 lg:py-28 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            The numbers don&apos;t lie.
          </h2>
          <p className="text-zinc-400 text-lg mb-12 max-w-xl">
            Real results from real B2B SaaS companies. No vanity metrics.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESULT_CARDS.map((card, i) => (
              <ResultCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 3 — SERVICES ══════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Services
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Everything you need to grow.
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-1 mb-0 relative">
            {SERVICES.map((svc, i) => (
              <button
                key={svc.title}
                onClick={() => setActiveService(i)}
                className={cn(
                  'relative px-5 py-3 text-sm font-medium rounded-t-lg transition-all duration-200',
                  activeService === i
                    ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                )}
                style={{ fontFamily: '"Inter", sans-serif' }}
              >
                {svc.title}
              </button>
            ))}
          </div>

          <ServiceTabContent service={SERVICES[activeService]} />
        </div>
      </section>

      {/* ══════════════════ SECTION 4 — CASE STUDIES ══════════════════ */}
      <section className="py-20 lg:py-28 bg-zinc-50 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Case Studies
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              How we did it.
            </h2>
          </div>

          <div className="space-y-6">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.company}
                className="grid md:grid-cols-2 gap-8 p-6 lg:p-8 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-lg font-bold text-zinc-950 dark:text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                      {cs.company}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{cs.industry}</span>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-2" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                    {cs.challenge}
                  </p>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{cs.description}</p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-zinc-950 dark:text-white hover:text-amber-500 transition-colors"
                  >
                    Read how we did it <IconArrowRight />
                  </a>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
                      <p
                        className="text-3xl lg:text-4xl font-bold text-amber-500"
                        style={{ fontFamily: '"DM Mono", monospace', fontVariantNumeric: 'tabular-nums' }}
                      >
                        {m.value}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 5 — PROCESS ══════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Process
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              How we build your growth engine.
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 lg:left-6 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />

            <div className="space-y-8">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.week} className="relative pl-12 lg:pl-16">
                  {/* Timeline dot */}
                  <div className={cn(
                    'absolute left-2.5 lg:left-4.5 top-1 w-3 h-3 rounded-full border-2',
                    i === PROCESS_STEPS.length - 1
                      ? 'bg-amber-500 border-amber-500'
                      : 'bg-white dark:bg-zinc-950 border-zinc-300 dark:border-zinc-600'
                  )} />

                  <div className="grid md:grid-cols-[140px_1fr_1fr] gap-4 lg:gap-8">
                    <div>
                      <span
                        className="text-sm font-bold text-amber-500"
                        style={{ fontFamily: '"DM Mono", monospace' }}
                      >
                        {step.week}
                      </span>
                      <p className="text-sm font-semibold text-zinc-950 dark:text-white mt-1" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                        {step.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">What Decimal does</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.decimalDoes}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">What you see</p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{step.clientSees}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SECTION 6 — PRICING ══════════════════ */}
      <section className="py-20 lg:py-28 bg-zinc-50 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-500 mb-3" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
              Pricing
            </p>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white"
              style={{ fontFamily: '"Space Grotesk", sans-serif' }}
            >
              Transparent pricing. No surprises.
            </h2>
            <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
              Every plan includes strategy, execution, and reporting. Pick the scale that matches your growth stage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'relative flex flex-col p-6 lg:p-8 rounded-xl border',
                  plan.highlighted
                    ? 'bg-zinc-950 border-amber-500/30 text-white dark:bg-zinc-50 dark:text-zinc-950'
                    : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800'
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 px-3 py-1 text-xs font-semibold bg-amber-500 text-zinc-950 rounded-full">
                    Most popular
                  </span>
                )}
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: '"Space Grotesk", sans-serif' }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-4xl font-bold mb-1"
                  style={{ fontFamily: '"DM Mono", monospace', fontVariantNumeric: 'tabular-nums' }}
                >
                  {plan.price}<span className="text-base font-normal opacity-60">/mo</span>
                </p>
                <p className={cn(
                  'text-xs mb-6',
                  plan.highlighted ? 'text-zinc-400 dark:text-zinc-500' : 'text-zinc-500 dark:text-zinc-400'
                )}>
                  {plan.adSpend}
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className={cn(
                        'mt-0.5',
                        plan.highlighted ? 'text-amber-400' : 'text-amber-500'
                      )}>
                        <IconCheck />
                      </span>
                      <span className={plan.highlighted ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-600 dark:text-zinc-400'}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#"
                  className={cn(
                    'inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.97]',
                    plan.highlighted
                      ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400'
                      : 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200'
                  )}
                >
                  {plan.name === 'Growth' ? 'Talk to sales' : 'Get started'}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-8">
            Not sure which plan? <a href="#" className="text-amber-500 hover:underline">Get a free growth audit</a> and we&apos;ll recommend the right fit.
          </p>
        </div>
      </section>

      {/* ══════════════════ SECTION 7 — GROWTH AUDIT CTA ══════════════════ */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 dark:text-white mb-6"
            style={{ fontFamily: '"Space Grotesk", sans-serif' }}
          >
            Get your free growth audit.
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl mx-auto">
            30 minutes. No pitch. Just a clear picture of where your growth is leaking and how to fix it.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {AUDIT_INCLUDES.map((item) => (
              <div key={item} className="flex items-start gap-2 p-4 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
                <span className="text-amber-500 mt-0.5 shrink-0"><IconCheck /></span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300 text-left">{item}</span>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-base font-semibold bg-amber-500 text-zinc-950 hover:bg-amber-400 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
            style={{ animation: 'pulse-glow 15s ease-in-out infinite' }}
          >
            <IconCalendar />
            Book a 30-minute call
          </a>
          <p className="mt-4 text-xs text-zinc-400">
            No credit card. No commitment. Just growth insight.
          </p>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="flex items-center gap-0.5">
                <span className="text-lg font-extrabold tracking-tight text-zinc-950 dark:text-white" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  Decimal
                </span>
                <sup className="text-amber-500 text-xs font-bold ml-0.5">×</sup>
              </a>
              <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Full-funnel marketing for B2B SaaS. Strategy, creative, and media — under one roof.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">
                  <IconLinkedIn />
                </a>
                <a href="#" className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors">
                  <IconTwitter />
                </a>
              </div>
            </div>

            {/* Link groups */}
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-zinc-950 dark:text-white mb-4" style={{ fontFamily: '"Space Grotesk", sans-serif' }}>
                  {group.title}
                </h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-400">
              © {new Date().getFullYear()} Decimal Agency, Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((label) => (
                <a key={label} href="#" className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
