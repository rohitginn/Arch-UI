'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG)                                                  */
/* ------------------------------------------------------------------ */

const IconActivity = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconHeart = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconTrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconZap = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconTarget = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const IconBrain = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z" />
  </svg>
);

const IconWatch = ({ className }: { className?: string }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="7" /><polyline points="12 9 12 12 13.5 13.5" />
    <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
  </svg>
);

const IconPlay = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const IconCheck = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconChevronRight = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconMoon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Animated Count-Up Component                                         */
/* ------------------------------------------------------------------ */

function CountUp({ value, suffix = '', prefix = '', duration = 1500 }: { value: number; suffix?: string; prefix?: string; duration?: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = React.useState('0');
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = value * eased;
            if (value % 1 !== 0) {
              setDisplayed(current.toFixed(1));
            } else {
              setDisplayed(Math.round(current).toLocaleString());
            }
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return <span ref={ref}>{prefix}{displayed}{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/*  SVG Chart Draw-on-Scroll Component                                  */
/* ------------------------------------------------------------------ */

function SVGLineChart({ data, color, width = 200, height = 60, className }: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const ref = React.useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDrawn(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  }).join(' ');

  const pathLength = 1000;

  return (
    <svg ref={ref} viewBox={`0 0 ${width} ${height}`} className={className} fill="none" preserveAspectRatio="none">
      <polyline
        points={points}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={pathLength}
        strokeDashoffset={drawn ? 0 : pathLength}
        style={{ transition: `stroke-dashoffset 1500ms ease-out` }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Chat Typewriter Component                                        */
/* ------------------------------------------------------------------ */

function AIChatDemo() {
  const chatRef = React.useRef<HTMLDivElement>(null);
  const [visibleChars, setVisibleChars] = React.useState(0);
  const [hasStarted, setHasStarted] = React.useState(false);

  const athleteMessage = "I have a marathon in 12 weeks and my long run pace feels slow.";
  const aiResponse = "Based on your recent training data, your aerobic base is strong but your lactate threshold pace needs work. I've added 2 threshold sessions per week for the next 4 weeks. Here's your updated plan:";

  React.useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !hasStarted) setHasStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  React.useEffect(() => {
    if (!hasStarted) return;
    const total = aiResponse.length;
    if (visibleChars >= total) return;
    const timer = setTimeout(() => {
      setVisibleChars((v) => v + 1);
    }, 25);
    return () => clearTimeout(timer);
  }, [hasStarted, visibleChars, aiResponse.length]);

  return (
    <div ref={chatRef} className="max-w-lg mx-auto space-y-4">
      {/* Athlete message */}
      <div className="flex justify-end">
        <div className="bg-[#dc2626]/10 dark:bg-[#dc2626]/10 border border-[#dc2626]/20 rounded-2xl rounded-br-md px-4 py-3 max-w-[85%]">
          <p className="text-sm text-[#f5f5f5] dark:text-[#f5f5f5] light:text-[#1a1a1a]">{athleteMessage}</p>
        </div>
      </div>
      {/* AI response */}
      <div className="flex justify-start">
        <div className="bg-[#181818] dark:bg-[#181818] border border-[#242424] rounded-2xl rounded-bl-md px-4 py-3 max-w-[85%]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-[#dc2626] flex items-center justify-center">
              <IconBrain className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#888888] font-mono">Apex AI</span>
          </div>
          <p className="text-sm text-[#f5f5f5]">
            {aiResponse.substring(0, visibleChars)}
            {visibleChars < aiResponse.length && <span className="animate-pulse">▊</span>}
          </p>
          {visibleChars >= aiResponse.length && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['Tempo run — 6mi', 'Threshold intervals', 'Long run — 16mi', 'Recovery — 4mi'].map((workout) => (
                <div key={workout} className="px-3 py-2 rounded-lg bg-[#111111] border border-[#242424] text-xs text-[#888888] font-mono">
                  {workout}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="text-[10px] text-[#4a4a4a] text-center font-mono">Based on your last 47 runs · 12-week marathon plan</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const WORKOUT_TYPES = [
  { name: 'Easy Run', color: '#3b82f6', duration: '45 min', intensity: 'Zone 2', day: 'Mon' },
  { name: 'Strength', color: '#dc2626', duration: '60 min', intensity: 'Zone 3-4', day: 'Tue' },
  { name: 'Tempo Run', color: '#f59e0b', duration: '50 min', intensity: 'Zone 3', day: 'Wed' },
  { name: 'Rest', color: '#4a4a4a', duration: '—', intensity: 'Recovery', day: 'Thu' },
  { name: 'Intervals', color: '#dc2626', duration: '55 min', intensity: 'Zone 4-5', day: 'Fri' },
  { name: 'Easy Run', color: '#3b82f6', duration: '40 min', intensity: 'Zone 2', day: 'Sat' },
  { name: 'Long Run', color: '#10b981', duration: '90 min', intensity: 'Zone 2-3', day: 'Sun' },
];

const METRICS = [
  {
    title: 'VO₂ Max',
    value: '52.4',
    unit: 'ml/kg/min',
    trend: '+2.1',
    data: [42, 43, 44, 44.5, 46, 47, 48, 49, 50, 51, 51.5, 52.4],
    color: '#10b981',
  },
  {
    title: 'Resting HR',
    value: '52',
    unit: 'bpm',
    trend: '-4',
    data: [58, 57, 56, 55, 56, 55, 54, 53, 53, 52, 52, 52],
    color: '#dc2626',
  },
  {
    title: 'HRV',
    value: '67',
    unit: 'ms',
    trend: '+8',
    data: [48, 50, 52, 54, 55, 58, 60, 62, 63, 64, 66, 67],
    color: '#3b82f6',
  },
  {
    title: 'Training Load',
    value: '847',
    unit: 'TSS/wk',
    trend: '+12%',
    data: [620, 650, 700, 730, 760, 780, 790, 800, 810, 820, 835, 847],
    color: '#f59e0b',
  },
  {
    title: 'Sleep Score',
    value: '89',
    unit: '/100',
    trend: '+5',
    data: [72, 75, 78, 80, 82, 84, 85, 86, 87, 88, 88, 89],
    color: '#8b5cf6',
  },
  {
    title: 'Power Output',
    value: '285',
    unit: 'watts FTP',
    trend: '+15',
    data: [240, 245, 250, 255, 260, 265, 270, 273, 277, 280, 283, 285],
    color: '#ec4899',
  },
];

const INTEGRATIONS = [
  { name: 'Garmin', connections: '280K+' },
  { name: 'Wahoo', connections: '120K+' },
  { name: 'Apple Watch', connections: '340K+' },
  { name: 'WHOOP', connections: '95K+' },
  { name: 'Oura', connections: '88K+' },
  { name: 'Strava', connections: '390K+' },
  { name: 'Zwift', connections: '75K+' },
  { name: 'Polar', connections: '60K+' },
];

const TESTIMONIALS = [
  {
    name: 'Jake Thornton',
    sport: 'Marathon Runner',
    avatar: 'https://placehold.co/64x64/181818/dc2626?text=JT',
    quote: "Dropped my marathon time by 18 minutes in 6 months. Apex's AI coach identified that I was overtraining on tempo runs and undertraining my aerobic base. The data-driven adjustment changed everything.",
    pr: '2:47:12',
    prLabel: 'Marathon PR',
    improvement: '18 min improvement',
  },
  {
    name: 'Maria Santos',
    sport: 'Triathlete',
    avatar: 'https://placehold.co/64x64/181818/dc2626?text=MS',
    quote: "My VO₂ Max went from 44 to 52 in 8 months. The recovery monitoring prevented me from burning out during Ironman training. I finished my first 70.3 feeling strong, not destroyed.",
    pr: '4:52:30',
    prLabel: '70.3 Finish',
    improvement: '+8 VO₂ Max points',
  },
  {
    name: 'Ryan Chen',
    sport: 'Cyclist',
    avatar: 'https://placehold.co/64x64/181818/dc2626?text=RC',
    quote: "My FTP jumped 40 watts in 4 months. The power curve analysis showed I was ignoring sweet spot training entirely. Apex rebuilt my plan around it and the gains were immediate.",
    pr: '310W',
    prLabel: 'FTP Record',
    improvement: '+40W in 4 months',
  },
];

const PRICING_FREE = [
  'Basic workout tracking',
  'Weekly training summary',
  '3 standard training plans',
  'Community forums',
  'Strava sync',
];

const PRICING_ATHLETE = [
  'Everything in Free',
  'AI-powered training plans',
  'Advanced performance analytics',
  'HRV & recovery monitoring',
  'Sleep quality tracking',
  'Unlimited device syncs',
  'Race-day pacing strategy',
  'Monthly progress reports',
];

const PRICING_ELITE = [
  'Everything in Athlete',
  '1:1 certified coach access',
  'Custom periodization',
  'Nutrition planning',
  'Race strategy sessions',
  'Priority support',
  'Video form analysis',
  'Unlimited plan revisions',
];

const FOOTER_LINKS = [
  { title: 'Training', links: ['Plans', 'Workouts', 'Coaching', 'Race Calendar'] },
  { title: 'Analytics', links: ['Performance', 'Recovery', 'Sleep', 'Trends'] },
  { title: 'Community', links: ['Forums', 'Challenges', 'Leaderboards', 'Athletes'] },
  { title: 'Company', links: ['About', 'Careers', 'Press', 'Contact'] },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface FitnessAppTemplateProps {
  className?: string;
}

/**
 * FitnessApp (Apex) — Athletic performance / workout tracking app website.
 *
 * Palette: Crimson (Red) #dc2626 + Iron (Zinc).
 * Mode: Dark-performance primary with light mode support.
 *
 * Typography:
 *   Display/Headings: System sans (font-sans), weight 900, uppercase, athletic
 *   Body: Inter / system sans weight 400
 *   Metrics: DM Mono / monospace, tabular-nums
 *
 * Sections:
 *   Nav → Hero (athlete status + action shot) → Training Dashboard →
 *   Performance Metrics (6-panel bento) → AI Coaching → Device Integrations →
 *   Athlete Stories → Pricing → Footer
 */
export function FitnessAppTemplate({ className }: FitnessAppTemplateProps) {
  const [billingAnnual, setBillingAnnual] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [heroHRV, setHeroHRV] = React.useState(67);

  // Simulate live HRV flicker
  React.useEffect(() => {
    const interval = setInterval(() => {
      setHeroHRV(67 + Math.floor(Math.random() * 3) - 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        'min-h-screen antialiased font-sans',
        'bg-[#080808] text-[#f5f5f5]',
        'dark:bg-[#080808] dark:text-[#f5f5f5]',
        // Light mode overrides
        'light:bg-zinc-50 light:text-zinc-900',
        className
      )}
    >
      {/* ── Navbar ── */}
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'bg-[#080808]/90 dark:bg-[#080808]/90 backdrop-blur-xl',
        'border-b border-white/5 dark:border-white/5',
      )}>
        <div className="mx-auto max-w-7xl flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-[#dc2626] font-bold text-lg select-none">/</span>
            <span className="font-black text-lg tracking-[0.1em] uppercase select-none">
              APEX
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {['Training', 'Analytics', 'Recovery', 'Community', 'Coaches'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-3 py-1.5 text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3">
            <a href="#" className="text-sm text-[#888888] hover:text-[#f5f5f5] transition-colors duration-150">
              Log in
            </a>
            <a
              href="#pricing"
              className="inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors duration-200"
            >
              Start free trial
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#888888] hover:text-[#f5f5f5] transition-colors"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#080808] px-6 py-6 space-y-4 animate-[slideDown_0.2s_ease-out]">
            {['Training', 'Analytics', 'Recovery', 'Community', 'Coaches'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base text-[#f5f5f5] py-2"
              >
                {link}
              </a>
            ))}
            <hr className="border-white/10" />
            <a href="#" className="block text-base text-[#888888] py-2">Log in</a>
            <a
              href="#pricing"
              className="block text-center px-6 py-3 rounded-lg text-sm font-semibold bg-[#dc2626] text-white"
            >
              Start free trial
            </a>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Noise background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }}
        />

        {/* Right side athlete image area */}
        <div className="absolute right-0 top-0 bottom-0 w-[60%] hidden lg:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/60 to-transparent z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=900&fit=crop)' }}
          />
        </div>

        <div className="relative z-20 mx-auto max-w-7xl px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8">
            {/* Athlete status display */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#111111] border border-[#242424]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#888888] font-mono">Athlete Status: Training Peak</span>
            </div>

            {/* Live metrics */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <span className="text-xs text-[#888888] font-mono uppercase tracking-wider">HRV</span>
                <p className="text-xl font-mono font-bold text-[#f5f5f5] tabular-nums">{heroHRV}</p>
              </div>
              <div className="w-px h-8 bg-[#242424]" />
              <div className="text-center">
                <span className="text-xs text-[#888888] font-mono uppercase tracking-wider">Recovery</span>
                <p className="text-xl font-mono font-bold text-[#10b981] tabular-nums">89%</p>
              </div>
              <div className="w-px h-8 bg-[#242424]" />
              <div className="text-center">
                <span className="text-xs text-[#888888] font-mono uppercase tracking-wider">Readiness</span>
                <p className="text-xl font-mono font-bold text-[#10b981] tabular-nums">HIGH</p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tight">
              TRAIN<br />
              <span className="text-[#dc2626]">SMARTER.</span><br />
              PERFORM<br />
              <span className="text-[#dc2626]">BETTER.</span>
            </h1>

            {/* Sub */}
            <p className="text-lg text-[#888888] max-w-md leading-relaxed">
              Apex delivers elite-level programming, real-time analytics, and AI-powered recovery guidance — so you can train harder and stay healthier.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center px-8 py-4 rounded-lg text-base font-bold bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors duration-200"
              >
                Start your free 14-day trial
              </a>
              <a
                href="#dashboard"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-lg text-base font-medium border border-[#242424] text-[#f5f5f5] hover:border-[#888888] transition-colors duration-200"
              >
                <IconPlay className="w-4 h-4" /> See the app
              </a>
            </div>

            {/* Social proof */}
            <p className="text-sm text-[#4a4a4a]">
              Used by <span className="text-[#888888]">400,000+</span> serious athletes · Avg <span className="text-[#dc2626]">12%</span> performance improvement in 8 weeks
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 1: Training Dashboard ── */}
      <section id="dashboard" className="py-24 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Your Weekly Plan</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">
              TRAINING DASHBOARD
            </h2>
          </div>

          {/* Weekly calendar grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            {WORKOUT_TYPES.map((workout, i) => (
              <div
                key={workout.day}
                className={cn(
                  'group rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02]',
                  i === 4
                    ? 'bg-[#dc2626]/10 border-[#dc2626]/30 ring-1 ring-[#dc2626]/20'
                    : 'bg-[#181818] border-[#242424] hover:border-[#888888]/30'
                )}
              >
                <span className="text-[10px] uppercase tracking-wider text-[#4a4a4a] font-mono">{workout.day}</span>
                <p className="mt-2 text-sm font-semibold text-[#f5f5f5]">{workout.name}</p>
                <p className="mt-1 text-xs font-mono text-[#888888]">{workout.duration}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: workout.color }} />
                  <span className="text-[10px] text-[#4a4a4a] font-mono">{workout.intensity}</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI insight */}
          <div className="flex items-start gap-4 p-4 rounded-xl bg-[#181818] border border-[#242424]">
            <div className="w-8 h-8 rounded-lg bg-[#dc2626]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <IconBrain className="w-4 h-4 text-[#dc2626]" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[#dc2626] font-mono mb-1">AI Insight</p>
              <p className="text-sm text-[#888888]">
                Based on your HRV trend, consider an easy day tomorrow. Your training load has been elevated for 3 consecutive days. Recovery quality will determine Thursday's session intensity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Performance Metrics (Bento Grid) ── */}
      <section id="analytics" className="py-24 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Performance Analytics</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">
              KNOW YOUR NUMBERS.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {METRICS.map((metric) => (
              <div
                key={metric.title}
                className="group rounded-2xl bg-[#111111] border border-[#242424] p-6 hover:border-[#dc2626]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs text-[#4a4a4a] uppercase tracking-wider font-mono">{metric.title}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-mono font-bold text-[#f5f5f5] tabular-nums">{metric.value}</span>
                      <span className="text-xs text-[#4a4a4a] font-mono">{metric.unit}</span>
                    </div>
                  </div>
                  <span className={cn(
                    'text-xs font-mono px-2 py-1 rounded-md',
                    metric.trend.startsWith('+') || metric.trend.startsWith('-') && metric.title === 'Resting HR'
                      ? 'text-[#10b981] bg-[#10b981]/10'
                      : 'text-[#10b981] bg-[#10b981]/10'
                  )}>
                    {metric.trend}
                  </span>
                </div>
                <SVGLineChart
                  data={metric.data}
                  color={metric.color}
                  className="w-full h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: AI Coaching ── */}
      <section className="py-24 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">AI Coach</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">
                YOUR AI COACH<br />
                <span className="text-[#dc2626]">NEVER SLEEPS.</span>
              </h2>
              <p className="mt-6 text-lg text-[#888888] leading-relaxed max-w-md">
                Get personalized training adjustments based on your biometric data, performance history, and goals. Apex AI analyzes every session and adapts your plan in real-time.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Adapts to your daily readiness score',
                  'Race-specific periodization',
                  'Overtraining prevention alerts',
                  'Data-backed recovery recommendations',
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#dc2626]/10 flex items-center justify-center">
                      <IconCheck className="w-3 h-3 text-[#dc2626]" />
                    </div>
                    <span className="text-sm text-[#888888]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <AIChatDemo />
          </div>
        </div>
      </section>

      {/* ── Section 4: Device Integrations ── */}
      <section className="py-24 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Ecosystem</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">
              SYNCS WITH EVERYTHING.
            </h2>
            <p className="mt-4 text-[#888888] max-w-md mx-auto">
              Connect your favorite devices and platforms. Apex works with the gear you already use.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INTEGRATIONS.map((device) => (
              <div
                key={device.name}
                className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-[#111111] border border-[#242424] hover:border-[#888888]/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#181818] border border-[#242424] flex items-center justify-center group-hover:border-[#dc2626]/30 transition-colors">
                  <IconWatch className="w-5 h-5 text-[#888888] group-hover:text-[#f5f5f5] transition-colors" />
                </div>
                <span className="text-sm font-semibold text-[#f5f5f5]">{device.name}</span>
                <span className="text-[10px] text-[#4a4a4a] font-mono uppercase tracking-wider">{device.connections} synced</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 5: Athlete Stories ── */}
      <section className="py-24 bg-[#111111]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Real Results</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">
              ATHLETE STORIES.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-[#181818] border border-[#242424] p-6 hover:border-[#dc2626]/20 transition-colors duration-300"
              >
                {/* PR highlight */}
                <div className="mb-6 p-4 rounded-xl bg-[#111111] border border-[#242424] text-center">
                  <span className="text-3xl font-mono font-black text-[#dc2626] tabular-nums">
                    <CountUp value={parseFloat(t.pr.replace(/[^0-9.]/g, ''))} suffix={t.pr.includes('W') ? 'W' : t.pr.includes(':') ? '' : ''} />
                  </span>
                  <p className="text-[10px] uppercase tracking-widest text-[#4a4a4a] font-mono mt-1">{t.prLabel}</p>
                  <p className="text-xs text-[#10b981] font-mono mt-1">{t.improvement}</p>
                </div>

                {/* Quote */}
                <p className="text-sm text-[#888888] leading-relaxed mb-6">"{t.quote}"</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-sm font-semibold text-[#f5f5f5]">{t.name}</p>
                    <p className="text-xs text-[#4a4a4a]">{t.sport}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 6: Pricing ── */}
      <section id="pricing" className="py-24 bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#dc2626] font-mono">Pricing</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-black uppercase tracking-tight">
              CHOOSE YOUR PLAN.
            </h2>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={cn('text-sm transition-colors', !billingAnnual ? 'text-[#f5f5f5]' : 'text-[#4a4a4a]')}>Monthly</span>
            <button
              onClick={() => setBillingAnnual(!billingAnnual)}
              className={cn(
                'relative w-12 h-6 rounded-full transition-colors duration-200',
                billingAnnual ? 'bg-[#dc2626]' : 'bg-[#242424]'
              )}
            >
              <span
                className={cn(
                  'absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200',
                  billingAnnual && 'translate-x-6'
                )}
              />
            </button>
            <span className={cn('text-sm transition-colors', billingAnnual ? 'text-[#f5f5f5]' : 'text-[#4a4a4a]')}>
              Annual <span className="text-[#dc2626] font-mono text-xs">Save 30%</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Free */}
            <div className="rounded-2xl bg-[#111111] border border-[#242424] p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#888888]">Free</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-mono font-black text-[#f5f5f5]">$0</span>
                <span className="text-sm text-[#4a4a4a] font-mono">/mo</span>
              </div>
              <p className="mt-2 text-sm text-[#4a4a4a]">Get started with the basics.</p>
              <a href="#" className="mt-6 block text-center py-3 rounded-lg border border-[#242424] text-sm font-semibold text-[#f5f5f5] hover:border-[#888888] transition-colors">
                Get started
              </a>
              <ul className="mt-8 space-y-3">
                {PRICING_FREE.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#888888]">
                    <IconCheck className="w-4 h-4 text-[#4a4a4a] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Athlete — highlighted */}
            <div className="rounded-2xl bg-[#181818] border-2 border-[#dc2626] p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#dc2626] text-[10px] uppercase tracking-wider font-bold text-white">
                Most Popular
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#dc2626]">Athlete</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-mono font-black text-[#f5f5f5]">
                  ${billingAnnual ? '10' : '14'}<span className="text-2xl">.{billingAnnual ? '49' : '99'}</span>
                </span>
                <span className="text-sm text-[#4a4a4a] font-mono">/mo</span>
              </div>
              <p className="mt-2 text-sm text-[#4a4a4a]">For dedicated athletes.</p>
              <a href="#" className="mt-6 block text-center py-3 rounded-lg bg-[#dc2626] text-sm font-bold text-white hover:bg-[#b91c1c] transition-colors">
                Start free trial
              </a>
              <ul className="mt-8 space-y-3">
                {PRICING_ATHLETE.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#888888]">
                    <IconCheck className="w-4 h-4 text-[#dc2626] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Elite */}
            <div className="rounded-2xl bg-[#111111] border border-[#242424] p-8">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#888888]">Elite</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-mono font-black text-[#f5f5f5]">
                  ${billingAnnual ? '20' : '29'}<span className="text-2xl">.{billingAnnual ? '99' : '99'}</span>
                </span>
                <span className="text-sm text-[#4a4a4a] font-mono">/mo</span>
              </div>
              <p className="mt-2 text-sm text-[#4a4a4a]">With personal coaching.</p>
              <a href="#" className="mt-6 block text-center py-3 rounded-lg border border-[#242424] text-sm font-semibold text-[#f5f5f5] hover:border-[#888888] transition-colors">
                Start free trial
              </a>
              <ul className="mt-8 space-y-3">
                {PRICING_ELITE.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-[#888888]">
                    <IconCheck className="w-4 h-4 text-[#4a4a4a] mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-16 border-t border-[#242424]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#dc2626] font-bold text-lg">/</span>
                <span className="font-black text-lg tracking-[0.1em] uppercase">APEX</span>
              </div>
              <p className="text-sm text-[#4a4a4a] leading-relaxed">
                Train smarter.<br />Perform better.
              </p>
            </div>
            {/* Link columns */}
            {FOOTER_LINKS.map((group) => (
              <div key={group.title}>
                <h4 className="text-sm font-semibold text-[#f5f5f5] uppercase tracking-wider mb-4">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-[#4a4a4a] hover:text-[#888888] transition-colors duration-150">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-[#242424] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#4a4a4a]">© {new Date().getFullYear()} Apex Sports Technology, Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-[#4a4a4a] hover:text-[#888888] transition-colors">Privacy</a>
              <a href="#" className="text-xs text-[#4a4a4a] hover:text-[#888888] transition-colors">Terms</a>
              <a href="#" className="text-xs text-[#4a4a4a] hover:text-[#888888] transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── CSS Keyframes ── */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
