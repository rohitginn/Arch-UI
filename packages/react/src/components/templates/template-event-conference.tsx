'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconCalendar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconUsers = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconStar = ({ filled = false }: { filled?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconClock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconWifi = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);
const IconCoffee = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);
const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconLinkedIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconTwitter = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Countdown Hook                                                      */
/* ------------------------------------------------------------------ */

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = React.useState(getTimeLeft(targetDate));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function getTimeLeft(target: Date) {
  const now = new Date();
  const diff = Math.max(target.getTime() - now.getTime(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/* ------------------------------------------------------------------ */
/*  Animated Counter                                                    */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ value, suffix = '', label }: { value: number; suffix?: string; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = React.useState(0);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const duration = 1500;
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayed(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-mono text-4xl lg:text-5xl font-bold text-amber-500 dark:text-amber-400 tabular-nums">
        {displayed.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Countdown Banner                                                    */
/* ------------------------------------------------------------------ */

function CountdownBanner() {
  const target = new Date('2026-03-14T09:00:00-08:00');
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <div className="w-full bg-zinc-950 dark:bg-zinc-900 text-zinc-50 py-2.5 px-4">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-xs sm:text-sm font-medium tracking-wide">
          Summit 2026: March 14–15, San Francisco
        </p>
        <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm tabular-nums">
          <span className="text-amber-400 font-bold">{String(days).padStart(2, '0')}</span>
          <span className="text-zinc-500">d</span>
          <span className="text-amber-400 font-bold">{String(hours).padStart(2, '0')}</span>
          <span className="text-zinc-500">h</span>
          <span className="text-amber-400 font-bold">{String(minutes).padStart(2, '0')}</span>
          <span className="text-zinc-500">m</span>
          <span className="text-amber-400 font-bold">{String(seconds).padStart(2, '0')}</span>
          <span className="text-zinc-500">s</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                        */
/* ------------------------------------------------------------------ */

function SummitHero() {
  const ticketsClaimed = 600;
  const totalEarlyBird = 1000;
  const pct = (ticketsClaimed / totalEarlyBird) * 100;

  return (
    <section className="relative overflow-hidden">
      {/* Zone 1 — Dark headline hero */}
      <div className="relative bg-zinc-950 dark:bg-zinc-950 pt-20 pb-16 lg:pt-28 lg:pb-24">
        {/* Grid background pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(161,161,170,0.06) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          {/* Date line */}
          <p className="font-mono text-xs sm:text-sm text-amber-400 dark:text-amber-400 tracking-[0.2em] uppercase mb-6">
            March 14–15, 2026 · San Francisco, CA
          </p>
          {/* SUMMIT — enormous display */}
          <h1
            className="text-[clamp(6rem,18vw,14rem)] font-black leading-[0.9] tracking-tighter text-white select-none"
            style={{ fontFamily: '"Bebas Neue", "Impact", "Arial Narrow", sans-serif' }}
          >
            SUMMIT
          </h1>
          {/* Subtitle */}
          <p className="mt-2 text-sm sm:text-base text-zinc-400 dark:text-zinc-400 tracking-[0.2em] uppercase">
            The conference for product builders
          </p>
          {/* CTA */}
          <div className="mt-10 flex flex-col items-center gap-4">
            <a
              href="#tickets"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-sm sm:text-base font-bold bg-amber-500 text-white hover:bg-amber-600 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              Get early bird tickets — Save $200
            </a>
            <p className="font-mono text-xs text-zinc-500 dark:text-zinc-500">
              $849 Early Bird · Only {totalEarlyBird - ticketsClaimed} tickets left at this price
            </p>
          </div>
          {/* Ticket progress bar */}
          <div className="mt-6 mx-auto max-w-xs">
            <div className="h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-[10px] text-zinc-600 dark:text-zinc-600">
              {ticketsClaimed}/{totalEarlyBird} early bird tickets claimed
            </p>
          </div>
        </div>
      </div>

      {/* Zone 2 — Speaker company logos */}
      <div className="bg-white dark:bg-zinc-900 py-8 lg:py-10 border-t border-zinc-100 dark:border-zinc-800">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mb-6">
            80+ speakers from:
          </p>
          <div className="flex items-center justify-center gap-8 lg:gap-12 flex-wrap opacity-60 dark:opacity-40">
            {['Google', 'Figma', 'Vercel', 'Stripe', 'Linear', 'Notion', 'Shopify', 'GitHub'].map((co) => (
              <span
                key={co}
                className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase select-none"
              >
                {co}
              </span>
            ))}
          </div>
          <p className="text-center mt-5">
            <a href="#speakers" className="text-sm font-medium text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors">
              View all speakers →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

interface Speaker {
  name: string;
  role: string;
  company: string;
  talk: string;
  keynote: boolean;
  avatar: string;
}

const SPEAKERS: Speaker[] = [
  {
    name: 'Elena Rodriguez',
    role: 'VP of Product',
    company: 'Figma',
    talk: 'Designing at the speed of thought',
    keynote: true,
    avatar: 'https://placehold.co/200x200/18181b/fafafa?text=ER',
  },
  {
    name: 'James Chen',
    role: 'CTO',
    company: 'Vercel',
    talk: 'The future of frontend infrastructure',
    keynote: true,
    avatar: 'https://placehold.co/200x200/18181b/fafafa?text=JC',
  },
  {
    name: 'Ava Patel',
    role: 'Director of Engineering',
    company: 'Stripe',
    talk: 'Building reliable payment systems at scale',
    keynote: false,
    avatar: 'https://placehold.co/200x200/18181b/fafafa?text=AP',
  },
  {
    name: 'Marcus Kim',
    role: 'Head of Design',
    company: 'Linear',
    talk: 'Opinionated design systems that ship faster',
    keynote: false,
    avatar: 'https://placehold.co/200x200/18181b/fafafa?text=MK',
  },
  {
    name: 'Sophie Laurent',
    role: 'CPO',
    company: 'Notion',
    talk: 'From tool to platform: product evolution',
    keynote: false,
    avatar: 'https://placehold.co/200x200/18181b/fafafa?text=SL',
  },
  {
    name: 'David Okafor',
    role: 'Staff Engineer',
    company: 'GitHub',
    talk: 'Developer experience as a competitive moat',
    keynote: false,
    avatar: 'https://placehold.co/200x200/18181b/fafafa?text=DO',
  },
];

interface Session {
  time: string;
  title: string;
  speaker: string;
  stage: string;
  duration: string;
  avatar: string;
}

const DAY1_SESSIONS: Session[] = [
  { time: '09:00', title: 'Designing at the speed of thought', speaker: 'Elena Rodriguez', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=ER' },
  { time: '09:00', title: 'CSS architecture for scale', speaker: 'Mark Evans', stage: 'DESIGN', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=ME' },
  { time: '10:00', title: 'The future of frontend infrastructure', speaker: 'James Chen', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=JC' },
  { time: '10:00', title: 'Building reliable payment systems', speaker: 'Ava Patel', stage: 'ENGINEERING', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=AP' },
  { time: '10:00', title: 'Product metrics that matter', speaker: 'Lisa Wang', stage: 'PRODUCT', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=LW' },
  { time: '11:00', title: 'Opinionated design systems', speaker: 'Marcus Kim', stage: 'DESIGN', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=MK' },
  { time: '11:00', title: 'From tool to platform', speaker: 'Sophie Laurent', stage: 'PRODUCT', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=SL' },
  { time: '14:00', title: 'Developer experience as a competitive moat', speaker: 'David Okafor', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=DO' },
  { time: '14:00', title: 'Scaling teams without losing culture', speaker: 'Nina Brooks', stage: 'PRODUCT', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=NB' },
  { time: '15:00', title: 'Zero-downtime deployments at any scale', speaker: 'Tom Harris', stage: 'ENGINEERING', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=TH' },
];

const DAY2_SESSIONS: Session[] = [
  { time: '09:00', title: 'The next decade of design tools', speaker: 'Elena Rodriguez', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=ER' },
  { time: '09:00', title: 'Accessibility as a first-class feature', speaker: 'Kim Delgado', stage: 'DESIGN', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=KD' },
  { time: '10:00', title: 'AI-assisted product development', speaker: 'James Chen', stage: 'MAIN STAGE', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=JC' },
  { time: '10:00', title: 'Component architecture patterns', speaker: 'Sarah Lee', stage: 'ENGINEERING', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=SL' },
  { time: '11:00', title: 'Measuring design impact', speaker: 'Marcus Kim', stage: 'DESIGN', duration: '30m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=MK' },
  { time: '11:00', title: 'Growth without growth hacking', speaker: 'Sophie Laurent', stage: 'PRODUCT', duration: '45m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=SL' },
  { time: '14:00', title: 'Closing keynote: What we build next', speaker: 'David Okafor', stage: 'MAIN STAGE', duration: '60m', avatar: 'https://placehold.co/30x30/18181b/fafafa?text=DO' },
];

interface Workshop {
  title: string;
  facilitator: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  seatsRemaining: number;
  totalSeats: number;
}

const WORKSHOPS: Workshop[] = [
  { title: 'Design System Architecture', facilitator: 'Marcus Kim', duration: '3 hours', level: 'Intermediate', seatsRemaining: 12, totalSeats: 30 },
  { title: 'Building with AI APIs', facilitator: 'James Chen', duration: '2 hours', level: 'Advanced', seatsRemaining: 3, totalSeats: 30 },
  { title: 'Product Strategy Frameworks', facilitator: 'Sophie Laurent', duration: '2 hours', level: 'Beginner', seatsRemaining: 18, totalSeats: 30 },
  { title: 'Performance Engineering', facilitator: 'Tom Harris', duration: '3 hours', level: 'Advanced', seatsRemaining: 8, totalSeats: 30 },
  { title: 'Figma to Code Pipeline', facilitator: 'Elena Rodriguez', duration: '2 hours', level: 'Intermediate', seatsRemaining: 2, totalSeats: 30 },
  { title: 'Growth Metrics Workshop', facilitator: 'Lisa Wang', duration: '2 hours', level: 'Beginner', seatsRemaining: 22, totalSeats: 30 },
];

interface Ticket {
  name: string;
  price: number;
  features: string[];
  badge?: string;
  urgent?: boolean;
}

const TICKETS: Ticket[] = [
  {
    name: 'Early Bird',
    price: 849,
    badge: 'Save $200',
    urgent: true,
    features: [
      'Full 2-day conference access',
      'All 4 stages',
      'Networking events',
      'Lunch & refreshments',
      'Conference swag bag',
      'Session recordings (30-day access)',
    ],
  },
  {
    name: 'General',
    price: 1199,
    features: [
      'Full 2-day conference access',
      'All 4 stages',
      'Networking events',
      'Lunch & refreshments',
      'Conference swag bag',
      'Session recordings (90-day access)',
      'Workshop priority registration',
    ],
  },
  {
    name: 'VIP',
    price: 2499,
    badge: 'All-inclusive',
    features: [
      'Full 2-day conference access',
      'All 4 stages + VIP lounge',
      'Speaker dinner invitation',
      'Priority front-row seating',
      'Premium catering & bar',
      'Lifetime session recordings',
      'Workshop access (2 included)',
      '1-on-1 speaker meet & greet',
    ],
  },
];

interface Sponsor {
  name: string;
  tier: 'platinum' | 'gold' | 'silver';
}

const SPONSORS: Sponsor[] = [
  { name: 'Vercel', tier: 'platinum' },
  { name: 'Figma', tier: 'platinum' },
  { name: 'Stripe', tier: 'gold' },
  { name: 'Linear', tier: 'gold' },
  { name: 'Notion', tier: 'gold' },
  { name: 'GitHub', tier: 'gold' },
  { name: 'Supabase', tier: 'silver' },
  { name: 'Prisma', tier: 'silver' },
  { name: 'Tailwind', tier: 'silver' },
  { name: 'Planetscale', tier: 'silver' },
  { name: 'Railway', tier: 'silver' },
  { name: 'Resend', tier: 'silver' },
];

const VENUE_AMENITIES = [
  { icon: <IconUsers />, label: '4 stages' },
  { icon: <IconWifi />, label: 'High-speed Wi-Fi' },
  { icon: <IconCoffee />, label: 'Full catering' },
  { icon: <IconHome />, label: 'Hotel blocks' },
];

const STAGE_COLORS: Record<string, string> = {
  'MAIN STAGE': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'PRODUCT': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'ENGINEERING': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'DESIGN': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
};

const LEVEL_COLORS: Record<string, string> = {
  'Beginner': 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400',
  'Intermediate': 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  'Advanced': 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

const FOOTER_GROUPS = [
  {
    title: 'Conference',
    links: [
      { label: 'Speakers', href: '#speakers' },
      { label: 'Schedule', href: '#schedule' },
      { label: 'Workshops', href: '#workshops' },
      { label: 'Venue', href: '#venue' },
    ],
  },
  {
    title: 'Attend',
    links: [
      { label: 'Tickets', href: '#tickets' },
      { label: 'Travel & Hotels', href: '#' },
      { label: 'Scholarships', href: '#' },
      { label: 'Group Discounts', href: '#' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Code of Conduct', href: '#' },
      { label: 'Accessibility', href: '#' },
      { label: 'Become a Sponsor', href: '#sponsors' },
      { label: 'Contact', href: '#' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Speakers Section                                                    */
/* ------------------------------------------------------------------ */

function SpeakersSection() {
  return (
    <section id="speakers" className="py-20 lg:py-28 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-4">
          This year&apos;s speakers.
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12 max-w-xl">
          80+ speakers across 4 stages. Here are a few of the headliners.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPEAKERS.map((speaker, i) => (
            <div
              key={speaker.name}
              className={cn(
                'group relative rounded-2xl border overflow-hidden transition-all duration-300',
                'border-zinc-200 dark:border-zinc-800',
                'hover:border-amber-400 dark:hover:border-amber-500',
                'bg-white dark:bg-zinc-900',
                i < 2 ? 'sm:col-span-1 lg:col-span-1' : ''
              )}
            >
              {/* Speaker avatar */}
              <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={speaker.avatar}
                  alt={speaker.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {speaker.keynote && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-white">
                    Keynote
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="p-5">
                <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
                  {speaker.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {speaker.role}, {speaker.company}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 italic mt-2">
                  &ldquo;{speaker.talk}&rdquo;
                </p>
                {/* View session link - hidden until hover */}
                <p className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <a href="#schedule" className="text-xs font-medium text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 flex items-center gap-1">
                    View session <IconArrowRight />
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            View all 80+ speakers <IconArrowRight />
          </a>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Schedule Section                                                    */
/* ------------------------------------------------------------------ */

function ScheduleSection() {
  const [activeDay, setActiveDay] = React.useState<1 | 2>(1);
  const [savedSessions, setSavedSessions] = React.useState<Set<string>>(new Set());

  const sessions = activeDay === 1 ? DAY1_SESSIONS : DAY2_SESSIONS;
  const stages = ['MAIN STAGE', 'PRODUCT', 'ENGINEERING', 'DESIGN'];

  const toggleSave = (sessionTitle: string) => {
    setSavedSessions((prev) => {
      const next = new Set(prev);
      if (next.has(sessionTitle)) next.delete(sessionTitle);
      else next.add(sessionTitle);
      return next;
    });
  };

  return (
    <section id="schedule" className="py-20 lg:py-28 bg-zinc-950 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <h2
          className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-4"
          style={{ fontFamily: '"Bebas Neue", "Impact", "Arial Narrow", sans-serif' }}
        >
          THE PROGRAMME
        </h2>
        <p className="text-zinc-400 mb-8 max-w-xl">
          Two days of talks, panels, and deep dives across 4 stages.
        </p>

        {/* Day tabs */}
        <div className="flex gap-2 mb-10">
          {[1, 2].map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day as 1 | 2)}
              className={cn(
                'px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
                activeDay === day
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200'
              )}
            >
              Day {day} — March {day === 1 ? '14' : '15'}
            </button>
          ))}
        </div>

        {/* Stage column headers — desktop only */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-3 mb-4">
          {stages.map((stage) => (
            <div
              key={stage}
              className={cn(
                'px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-center border',
                STAGE_COLORS[stage]
              )}
            >
              {stage}
            </div>
          ))}
        </div>

        {/* Sessions */}
        <div className="space-y-3">
          {/* Group by time */}
          {Array.from(new Set(sessions.map((s) => s.time))).map((time) => {
            const timeSessions = sessions.filter((s) => s.time === time);
            return (
              <div key={time} className="flex flex-col lg:flex-row gap-3">
                {/* Time label */}
                <div className="lg:hidden font-mono text-xs text-amber-400 mb-1 mt-4">{time}</div>
                {stages.map((stage) => {
                  const session = timeSessions.find((s) => s.stage === stage);
                  if (!session) {
                    return <div key={stage} className="hidden lg:block flex-1" />;
                  }
                  const isSaved = savedSessions.has(session.title);
                  return (
                    <div
                      key={stage + time}
                      className={cn(
                        'flex-1 rounded-xl p-4 border transition-all duration-200',
                        'bg-zinc-900 border-zinc-800 hover:border-zinc-700',
                        isSaved && 'ring-1 ring-amber-500/50'
                      )}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-xs text-amber-400 hidden lg:inline">{session.time}</span>
                            <span className={cn(
                              'lg:hidden inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border',
                              STAGE_COLORS[session.stage]
                            )}>
                              {session.stage}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-600">{session.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <img src={session.avatar} alt="" className="w-6 h-6 rounded-full flex-shrink-0" />
                            <span className="text-xs text-zinc-400 truncate">{session.speaker}</span>
                          </div>
                          <h4 className="text-sm font-semibold text-white leading-snug">{session.title}</h4>
                        </div>
                        <button
                          onClick={() => toggleSave(session.title)}
                          className={cn(
                            'mt-1 p-1.5 rounded-lg transition-all duration-200 flex-shrink-0',
                            isSaved
                              ? 'text-amber-400 bg-amber-400/10'
                              : 'text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800'
                          )}
                          title={isSaved ? 'Saved' : 'Save to schedule'}
                          style={isSaved ? { transform: 'scale(1.1)' } : {}}
                        >
                          <IconStar filled={isSaved} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Saved sessions count */}
        {savedSessions.size > 0 && (
          <div className="mt-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-400 text-sm font-medium border border-amber-500/20">
              <IconStar filled /> {savedSessions.size} session{savedSessions.size > 1 ? 's' : ''} saved to your schedule
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Workshops Section                                                   */
/* ------------------------------------------------------------------ */

function WorkshopsSection() {
  return (
    <section id="workshops" className="py-20 lg:py-28 bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">
              Hands-on workshops
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Limited to 30 per session · Deep-dive, practical, and expert-led.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WORKSHOPS.map((ws) => {
            const isUrgent = ws.seatsRemaining < 5;
            return (
              <div
                key={ws.title}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className={cn(
                    'inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider',
                    LEVEL_COLORS[ws.level],
                  )}>
                    {ws.level}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <IconClock />
                    <span className="font-mono">{ws.duration}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-1.5">{ws.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">by {ws.facilitator}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className={cn(
                    'text-xs font-mono',
                    isUrgent ? 'text-red-500 dark:text-red-400 font-bold' : 'text-zinc-500 dark:text-zinc-400'
                  )}>
                    {ws.seatsRemaining}/{ws.totalSeats} seats left
                  </span>
                  <button className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Venue Section                                                       */
/* ------------------------------------------------------------------ */

function VenueSection() {
  const [activeStage, setActiveStage] = React.useState<string | null>(null);
  const stages = ['MAIN STAGE', 'PRODUCT', 'ENGINEERING', 'DESIGN'];

  return (
    <section id="venue" className="py-20 lg:py-28 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Venue info */}
          <div className="lg:w-1/2">
            <p className="text-xs font-mono text-amber-500 dark:text-amber-400 tracking-wider uppercase mb-3">Venue</p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2">
              Moscone Center
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6 flex items-center gap-1.5">
              <IconMapPin /> San Francisco, CA
            </p>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
              Two days of sessions across 4 purpose-built stages, with dedicated networking areas,
              a sponsor expo hall, and VIP lounges. The venue is located in the heart of SoMa,
              walking distance from transit and partner hotels.
            </p>
            {/* Amenities */}
            <div className="grid grid-cols-2 gap-4">
              {VENUE_AMENITIES.map((a) => (
                <div key={a.label} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {a.icon}
                  </span>
                  {a.label}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive floor plan */}
          <div className="lg:w-1/2">
            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Floor Plan</p>
              <svg viewBox="0 0 400 300" className="w-full h-auto">
                {/* Background */}
                <rect x="0" y="0" width="400" height="300" rx="12" fill="currentColor" className="text-zinc-100 dark:text-zinc-800" />
                {/* Stages */}
                {[
                  { name: 'MAIN STAGE', x: 40, y: 30, w: 150, h: 100 },
                  { name: 'PRODUCT', x: 210, y: 30, w: 150, h: 100 },
                  { name: 'ENGINEERING', x: 40, y: 160, w: 150, h: 100 },
                  { name: 'DESIGN', x: 210, y: 160, w: 150, h: 100 },
                ].map((st) => {
                  const isActive = activeStage === st.name;
                  const colorClass = STAGE_COLORS[st.name];
                  return (
                    <g
                      key={st.name}
                      onMouseEnter={() => setActiveStage(st.name)}
                      onMouseLeave={() => setActiveStage(null)}
                      className="cursor-pointer"
                    >
                      <rect
                        x={st.x} y={st.y} width={st.w} height={st.h} rx="8"
                        fill={isActive ? 'rgba(245,158,11,0.15)' : 'currentColor'}
                        stroke={isActive ? 'rgba(245,158,11,0.6)' : 'currentColor'}
                        strokeWidth={isActive ? 2 : 1}
                        className={cn(
                          'transition-all duration-200',
                          isActive ? '' : 'text-zinc-200 dark:text-zinc-700 stroke-zinc-300 dark:stroke-zinc-600'
                        )}
                      />
                      <text
                        x={st.x + st.w / 2} y={st.y + st.h / 2}
                        textAnchor="middle" dominantBaseline="middle"
                        className={cn(
                          'text-[10px] font-bold uppercase tracking-wider fill-current pointer-events-none',
                          isActive ? 'text-amber-500 dark:text-amber-400' : 'text-zinc-500 dark:text-zinc-400'
                        )}
                      >
                        {st.name}
                      </text>
                      <text
                        x={st.x + st.w / 2} y={st.y + st.h / 2 + 16}
                        textAnchor="middle" dominantBaseline="middle"
                        className={cn(
                          'text-[9px] fill-current pointer-events-none',
                          isActive ? 'text-amber-400/70 dark:text-amber-300/70' : 'text-zinc-400 dark:text-zinc-500'
                        )}
                      >
                        {isActive ? `${DAY1_SESSIONS.filter(s => s.stage === st.name).length}+ sessions` : ''}
                      </text>
                    </g>
                  );
                })}
                {/* Labels for common areas */}
                <text x="200" y="147" textAnchor="middle" className="text-[8px] fill-current text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                  Networking Hall
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Tickets Section                                                     */
/* ------------------------------------------------------------------ */

function TicketsSection() {
  return (
    <section id="tickets" className="py-20 lg:py-28 bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-3">
            Get your ticket
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
            Two days of sessions, workshops, networking, and inspiration. Choose the experience that works for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {TICKETS.map((ticket, idx) => (
            <div
              key={ticket.name}
              className={cn(
                'relative rounded-2xl border p-6 lg:p-8 flex flex-col',
                idx === 2
                  ? 'border-amber-400 dark:border-amber-500 bg-white dark:bg-zinc-950 ring-1 ring-amber-400/30 dark:ring-amber-500/30'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950'
              )}
            >
              {ticket.badge && (
                <span className={cn(
                  'absolute -top-3 left-6 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider',
                  idx === 2
                    ? 'bg-amber-500 text-white'
                    : 'bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950'
                )}>
                  {ticket.badge}
                </span>
              )}
              <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-1">{ticket.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-mono text-4xl font-bold text-zinc-950 dark:text-zinc-50 tabular-nums">${ticket.price.toLocaleString()}</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">/ticket</span>
              </div>

              {/* Early bird progress */}
              {ticket.urgent && (
                <div className="mb-5">
                  <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                    <div className="h-full rounded-full bg-amber-400 w-3/5 animate-pulse" />
                  </div>
                  <p className="mt-1.5 text-[10px] font-mono text-amber-500 dark:text-amber-400">
                    400 tickets remaining at this price
                  </p>
                </div>
              )}

              <ul className="space-y-3 mb-8 flex-1">
                {ticket.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300">
                    <span className="mt-0.5 text-amber-500 dark:text-amber-400 flex-shrink-0"><IconCheck /></span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={cn(
                  'inline-flex items-center justify-center w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-[1px] active:scale-[0.97]',
                  idx === 2
                    ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20'
                    : 'bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200'
                )}
              >
                Get {ticket.name} ticket
              </a>
            </div>
          ))}
        </div>

        {/* Group discount */}
        <div className="mt-10 text-center">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            <span className="font-semibold text-zinc-700 dark:text-zinc-300">Bring your team</span> — 20% off groups of 5+.{' '}
            <a href="#" className="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-medium">
              Contact for group pricing →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sponsors Section                                                    */
/* ------------------------------------------------------------------ */

function SponsorsSection() {
  const platinum = SPONSORS.filter((s) => s.tier === 'platinum');
  const gold = SPONSORS.filter((s) => s.tier === 'gold');
  const silver = SPONSORS.filter((s) => s.tier === 'silver');

  const TierGroup = ({ title, sponsors, size }: { title: string; sponsors: Sponsor[]; size: 'lg' | 'md' | 'sm' }) => (
    <div className="mb-10">
      <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-5 text-center">{title}</p>
      <div className="flex items-center justify-center flex-wrap gap-6 lg:gap-10">
        {sponsors.map((s) => (
          <span
            key={s.name}
            className={cn(
              'font-bold tracking-wide uppercase select-none',
              size === 'lg'
                ? 'text-2xl lg:text-3xl text-zinc-300 dark:text-zinc-600'
                : size === 'md'
                  ? 'text-lg lg:text-xl text-zinc-400 dark:text-zinc-600'
                  : 'text-sm text-zinc-400 dark:text-zinc-600'
            )}
          >
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="sponsors" className="py-20 lg:py-28 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 mb-2 text-center">
          Our sponsors
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-center mb-14">
          Summit is made possible by these incredible partners.
        </p>

        <TierGroup title="Platinum" sponsors={platinum} size="lg" />
        <TierGroup title="Gold" sponsors={gold} size="md" />
        <TierGroup title="Silver" sponsors={silver} size="sm" />

        <p className="text-center mt-10">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            Become a sponsor <IconArrowRight />
          </a>
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats Section                                                       */
/* ------------------------------------------------------------------ */

function ConferenceStats() {
  return (
    <section className="py-16 lg:py-20 bg-zinc-950 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          <AnimatedCounter value={2000} suffix="+" label="Attendees" />
          <AnimatedCounter value={80} suffix="+" label="Speakers" />
          <AnimatedCounter value={4} label="Stages" />
          <AnimatedCounter value={2} label="Days" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */

function SummitFooter() {
  return (
    <footer className="bg-zinc-950 dark:bg-zinc-950 border-t border-zinc-800 dark:border-zinc-800 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <span
              className="text-2xl font-black text-white tracking-tight"
              style={{ fontFamily: '"Bebas Neue", "Impact", "Arial Narrow", sans-serif' }}
            >
              SUMMIT
            </span>
            <span className="ml-1 font-mono text-xs text-zinc-500">2026</span>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed max-w-xs">
              The conference for product builders. March 14–15, San Francisco.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><IconTwitter /></a>
              <a href="#" className="text-zinc-500 hover:text-white transition-colors"><IconLinkedIn /></a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Summit Conference. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              <IconDownload /> Schedule PDF
            </a>
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Code of Conduct
            </a>
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Accessibility
            </a>
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
              Privacy
            </a>
          </div>
        </div>

        {/* Past years */}
        <div className="mt-6 flex items-center justify-center gap-4">
          {['Summit 2025', 'Summit 2024', 'Summit 2023'].map((year) => (
            <a key={year} href="#" className="text-[10px] font-mono text-zinc-600 hover:text-zinc-400 uppercase tracking-wider transition-colors">
              {year}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface EventConferenceTemplateProps {
  className?: string;
}

/**
 * EventConference (Summit) — Tech Conference & Event Platform website.
 *
 * Accent: Amber-500 for CTAs and highlights, zinc-based neutrals.
 * Modes: Light (primary, daytime energy) + Dark (dramatic, for schedule/keynote).
 *
 * Sections:
 *   Countdown Banner → Nav → Hero (split dark/light) → Speakers →
 *   Schedule (dark, multi-track) → Workshops → Venue (floor plan SVG) →
 *   Stats → Tickets (3-tier) → Sponsors (tiered) → Footer
 */
export function EventConferenceTemplate({ className }: EventConferenceTemplateProps) {
  return (
    <div className={cn('min-h-screen bg-white dark:bg-zinc-950 antialiased', className)}>
      {/* ── Countdown Banner ── */}
      <CountdownBanner />

      {/* ── Navigation ── */}
      <TemplateNav
        logo={
          <div className="flex items-baseline gap-1">
            <span
              className="text-xl font-black tracking-tight text-zinc-950 dark:text-white"
              style={{ fontFamily: '"Bebas Neue", "Impact", "Arial Narrow", sans-serif' }}
            >
              SUMMIT
            </span>
            <span className="font-mono text-[10px] text-zinc-400">2026</span>
          </div>
        }
        links={[
          { label: 'Speakers', href: '#speakers' },
          { label: 'Schedule', href: '#schedule' },
          { label: 'Workshops', href: '#workshops' },
          { label: 'Venue', href: '#venue' },
          { label: 'Sponsors', href: '#sponsors' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <a href="#" className="hidden sm:inline-flex text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Sign in
            </a>
            <a
              href="#tickets"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 hover:-translate-y-[1px] active:scale-[0.97] transition-all duration-200"
            >
              Get tickets
            </a>
          </div>
        }
      />

      {/* ── Hero ── */}
      <SummitHero />

      {/* ── Speakers ── */}
      <SpeakersSection />

      {/* ── Stats ── */}
      <ConferenceStats />

      {/* ── Schedule ── */}
      <ScheduleSection />

      {/* ── Workshops ── */}
      <WorkshopsSection />

      {/* ── Venue ── */}
      <VenueSection />

      {/* ── Tickets ── */}
      <TicketsSection />

      {/* ── Sponsors ── */}
      <SponsorsSection />

      {/* ── Footer ── */}
      <SummitFooter />
    </div>
  );
}
