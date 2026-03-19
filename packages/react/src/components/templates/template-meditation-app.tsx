'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { TemplateNav } from './template-nav';

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */

const IconMoon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);
const IconWind = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.7 7.7A2.5 2.5 0 0 1 17 13H3" /><path d="M9.6 4.6A2 2 0 0 1 11 8H3" /><path d="M12.6 19.4A2 2 0 0 0 14 16H3" />
  </svg>
);
const IconHeadphones = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconPlay = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
const IconPause = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconExternalLink = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Breathing Circle Component                                          */
/* ------------------------------------------------------------------ */

function BreathingCircle() {
  return (
    <div className="relative flex items-center justify-center w-20 h-20 mx-auto mb-10">
      {/* Pulsing ripple rings */}
      <span className="absolute inset-0 rounded-full border-2 border-[#4a8c6f]/30 dark:border-[#6aad8c]/30 animate-[breathe_4s_ease-in-out_infinite]" />
      <span className="absolute inset-0 rounded-full border-2 border-[#4a8c6f]/20 dark:border-[#6aad8c]/20 animate-[breathe_4s_ease-in-out_infinite_2s]" />
      {/* Center dot */}
      <span className="w-3 h-3 rounded-full bg-[#4a8c6f] dark:bg-[#6aad8c]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive Breathing Exercise Component                            */
/* ------------------------------------------------------------------ */

function BreathingExercise() {
  const [active, setActive] = React.useState(false);
  const [phase, setPhase] = React.useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    // 4-7-8 pattern: 4s inhale, 7s hold, 8s exhale
    const phases = [
      { name: 'inhale' as const, duration: 4000 },
      { name: 'hold' as const, duration: 7000 },
      { name: 'exhale' as const, duration: 8000 },
    ];
    let phaseIdx = 0;
    let start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const currentPhase = phases[phaseIdx];
      const pct = Math.min(elapsed / currentPhase.duration, 1);
      setPhase(currentPhase.name);
      setProgress(pct);

      if (elapsed >= currentPhase.duration) {
        phaseIdx = (phaseIdx + 1) % phases.length;
        start = Date.now();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [active]);

  const circleScale = active
    ? phase === 'inhale'
      ? 1 + progress * 0.6
      : phase === 'hold'
        ? 1.6
        : 1.6 - progress * 0.6
    : 1;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center w-48 h-48">
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 192 192">
          <circle cx="96" cy="96" r="88" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#4a8c6f]/10 dark:text-[#6aad8c]/10" />
          {active && (
            <circle
              cx="96" cy="96" r="88"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="text-[#4a8c6f] dark:text-[#6aad8c]"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - progress)}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 50ms linear' }}
            />
          )}
        </svg>
        {/* Breathing circle */}
        <div
          className="w-28 h-28 rounded-full bg-[#4a8c6f]/10 dark:bg-[#6aad8c]/10 flex items-center justify-center"
          style={{
            transform: `scale(${circleScale})`,
            transition: 'transform 200ms ease-out',
          }}
        >
          <span className="text-sm font-medium text-[#4a8c6f] dark:text-[#6aad8c] capitalize select-none">
            {active ? phase : 'Ready'}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          setActive(!active);
          setProgress(0);
          setPhase('inhale');
        }}
        className="px-6 py-2.5 rounded-full text-sm font-medium bg-[#4a8c6f] dark:bg-[#6aad8c] text-white hover:bg-[#3d7860] dark:hover:bg-[#5a9d7c] transition-colors duration-200"
      >
        {active ? 'Stop' : 'Start breathing'}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Audio Player Mockup                                                 */
/* ------------------------------------------------------------------ */

function AudioPlayerMockup() {
  const [playing, setPlaying] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);
  const duration = 480; // 8 minutes

  React.useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setElapsed((prev) => (prev >= duration ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [playing]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="bg-white dark:bg-[#2c2820] rounded-3xl p-6 shadow-sm border border-[#e8e4dc] dark:border-[#3a3428] max-w-sm mx-auto">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-[#4a8c6f]/10 dark:bg-[#6aad8c]/10 flex items-center justify-center flex-shrink-0">
          <IconHeadphones />
        </div>
        <div>
          <p className="text-sm font-medium text-[#2d2926] dark:text-[#e8e2d8]">Morning Clarity</p>
          <p className="text-xs text-[#7a6e62] dark:text-[#8a8076]">Sarah Chen · 8 min</p>
        </div>
      </div>
      {/* Waveform */}
      <div className="flex items-end gap-[3px] h-10 mb-4">
        {Array.from({ length: 40 }).map((_, i) => {
          const pct = elapsed / duration;
          const isActive = i / 40 <= pct;
          const h = 10 + Math.sin(i * 0.8) * 12 + Math.cos(i * 1.2) * 8;
          return (
            <div
              key={i}
              className={cn(
                'w-[3px] rounded-full transition-colors duration-150',
                isActive
                  ? 'bg-[#4a8c6f] dark:bg-[#6aad8c]'
                  : 'bg-[#e8e4dc] dark:bg-[#3a3428]'
              )}
              style={{ height: `${h}px` }}
            />
          );
        })}
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-[#7a6e62] dark:text-[#8a8076]">{formatTime(elapsed)}</span>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-[#4a8c6f] dark:bg-[#6aad8c] text-white flex items-center justify-center hover:bg-[#3d7860] dark:hover:bg-[#5a9d7c] transition-colors"
        >
          {playing ? <IconPause /> : <IconPlay />}
        </button>
        <span className="text-xs font-mono text-[#7a6e62] dark:text-[#8a8076]">{formatTime(duration)}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats counter with count-up animation                               */
/* ------------------------------------------------------------------ */

function AnimatedStat({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = React.useState('0');
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numericValue = parseFloat(value.replace(/,/g, ''));
          const startTime = performance.now();
          const duration = 2000;
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out
            const current = numericValue * eased;
            if (value.includes('.')) {
              setDisplayed(current.toFixed(1));
            } else if (numericValue >= 1000000) {
              setDisplayed((current / 1000000).toFixed(0) + ' million');
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
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center px-6 py-4">
      <p className="font-serif text-5xl font-light text-[#4a8c6f] dark:text-[#6aad8c] mb-2">
        {displayed}{suffix}
      </p>
      <p className="text-sm font-light text-[#7a6e62] dark:text-[#8a8076]">{label}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const STATS = [
  { value: '7000000', display: '7 million', label: 'users', suffix: '' },
  { value: '91', label: 'feel less stressed after 2 weeks', suffix: '%' },
  { value: '4.8', label: 'average app rating', suffix: ' ★' },
];

const FEATURES = [
  {
    icon: <IconMoon />,
    title: 'Sleep stories that work.',
    headline: 'Fall asleep in 8 minutes or less.',
    description: 'Our sleep stories use evidence-based narrative pacing and progressive muscle relaxation cues, calibrated to your sleep onset latency. Over 200 stories narrated by certified sleep specialists.',
    bullets: ['Adaptive story pacing based on your sleep data', 'New stories every week', 'Offline downloads for travel'],
  },
  {
    icon: <IconWind />,
    title: 'Breathing exercises for any moment.',
    headline: 'Calm your nervous system in 60 seconds.',
    description: 'From the 4-7-8 technique to box breathing, choose from 12 clinically-validated patterns. Each exercise includes guided audio and visual feedback.',
    bullets: ['12 scientifically-validated patterns', 'Wearable integration for biofeedback', 'Emergency calm mode for acute stress'],
  },
  {
    icon: <IconHeadphones />,
    title: 'Guided meditations by certified instructors.',
    headline: 'Over 500 guided sessions, from 3 to 60 minutes.',
    description: 'Every instructor holds a clinical or research-backed meditation credential. Sessions span mindfulness, body scan, loving-kindness, and more — from 3-minute resets to 60-minute deep practices.',
    bullets: ['Personalized session recommendations', 'Progress tracking across 8 dimensions', 'Daily streak and milestone rewards'],
  },
];

const SCIENCE_CLAIMS = [
  {
    stat: '32%',
    claim: 'reduction in cortisol levels',
    source: 'Randomized controlled trial, n=1,200, published in Journal of Behavioral Medicine, 2023.',
    explanation: 'Participants who used Zura for 10 minutes daily showed statistically significant decreases in salivary cortisol over 8 weeks.',
  },
  {
    stat: '47%',
    claim: 'improvement in sleep quality',
    source: 'Longitudinal study, n=3,400, University of Oxford Sleep & Circadian Neuroscience Institute, 2024.',
    explanation: 'PSQI scores improved by an average of 47% among users who engaged with sleep stories at least 4 nights per week.',
  },
  {
    stat: '2.1x',
    claim: 'faster anxiety recovery',
    source: 'Meta-analysis of Zura-supported interventions, published in Frontiers in Psychology, 2024.',
    explanation: 'Users recovered from acute anxiety episodes 2.1x faster when combining breathwork exercises with guided meditation.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sarah',
    role: 'Product Designer',
    quote: "I've struggled with insomnia for years. After two weeks with Zura's sleep stories, I'm falling asleep in under 10 minutes consistently. My sleep tracker confirms it — my deep sleep has increased by 40%.",
    avatar: 'https://placehold.co/48x48/f0ebe3/4a8c6f?text=S',
  },
  {
    name: 'Marcus',
    role: 'Software Engineer',
    quote: "The breathing exercises are a game changer during high-pressure sprints. I use the 4-7-8 technique before stand-ups and my team has noticed I'm calmer and more focused. It's measurable — my HRV is up 15%.",
    avatar: 'https://placehold.co/48x48/f0ebe3/4a8c6f?text=M',
  },
  {
    name: 'Priya',
    role: 'Clinical Psychologist',
    quote: "As a therapist, I recommend Zura to clients as a daily practice complement. The secular, science-backed approach means it works across cultural backgrounds. The anxiety recovery data is genuinely impressive.",
    avatar: 'https://placehold.co/48x48/f0ebe3/4a8c6f?text=P',
  },
];

const PRICING_FEATURES_FREE = [
  'Core meditation library (50+ sessions)',
  '2 sleep stories',
  'Basic breathwork (3 patterns)',
  'Daily mindfulness reminders',
];

const PRICING_FEATURES_PREMIUM = [
  'Everything in Free',
  '500+ guided meditations',
  '200+ sleep stories',
  '12 breathwork patterns',
  'Offline downloads',
  'Personalized recommendations',
  'Progress analytics',
  'Wearable integration',
];

const FOOTER_LINKS = [
  {
    title: 'Product',
    links: ['Sleep', 'Meditate', 'Breathe', 'For Teams'],
  },
  {
    title: 'Science',
    links: ['Research', 'Clinical Advisors', 'Methodology', 'Publications'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Blog'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Privacy', 'Terms', 'Contact'],
  },
];

/* ------------------------------------------------------------------ */
/*  Template                                                            */
/* ------------------------------------------------------------------ */

export interface MeditationAppTemplateProps {
  className?: string;
}

/**
 * MeditationApp (Zura) — Consumer mindfulness / meditation app website.
 *
 * Accent: Sage green (#4a8c6f) with warm cream backgrounds.
 * Modes: Light (airy, warm, organic) + Dark (soft, candlelit).
 *
 * Sections:
 *   Floating Pill Nav → Hero (breathing circle + organic orbs) → Stats →
 *   Product Features (alternating) → Science Backing → Pricing (2-tier) →
 *   Testimonials → Mental Health Resources → Footer
 */
export function MeditationAppTemplate({ className }: MeditationAppTemplateProps) {
  const [billingAnnual, setBillingAnnual] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div
      className={cn(
        'min-h-screen antialiased font-sans',
        'bg-[#faf8f4] text-[#2d2926]',
        'dark:bg-[#1a1814] dark:text-[#e8e2d8]',
        className
      )}
      style={
        {
          '--zura-sage': '#4a8c6f',
          '--zura-sage-dark': '#6aad8c',
        } as React.CSSProperties
      }
    >
      {/* ── Floating Pill Navbar ── */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className={cn(
          'flex items-center gap-2 sm:gap-6 px-4 sm:px-8 py-3 rounded-full',
          'bg-white/85 dark:bg-[#232018]/85 backdrop-blur-xl',
          'shadow-md shadow-black/5 dark:shadow-black/20',
          'border border-[#e8e4dc]/50 dark:border-[#3a3428]/50',
          'transition-all duration-300'
        )}>
          {/* Logo */}
          <span className="font-serif italic font-light text-lg text-[#4a8c6f] dark:text-[#6aad8c] select-none">
            zura
          </span>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {['Sleep', 'Meditate', 'Breathe', 'Science'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-3 py-1.5 text-sm text-[#7a6e62] dark:text-[#8a8076] hover:text-[#2d2926] dark:hover:text-[#e8e2d8] transition-colors duration-150"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-3 ml-2">
            <a href="#" className="text-sm text-[#7a6e62] dark:text-[#8a8076] hover:text-[#2d2926] dark:hover:text-[#e8e2d8] transition-colors duration-150">
              Sign in
            </a>
            <a
              href="#"
              className="inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-[#4a8c6f] dark:bg-[#6aad8c] text-white hover:bg-[#3d7860] dark:hover:bg-[#5a9d7c] transition-colors duration-200"
            >
              Try free for 7 days
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#7a6e62] dark:text-[#8a8076] text-lg px-2"
            aria-label="Menu"
          >
            ≡
          </button>
        </div>
      </nav>

      {/* ── Mobile Bottom Sheet ── */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/30 dark:bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-[#232018] rounded-t-3xl p-6 pt-3 animate-[slideUp_0.3s_ease-out]">
            <div className="w-10 h-1 rounded-full bg-[#e8e4dc] dark:bg-[#3a3428] mx-auto mb-6" />
            <div className="flex flex-col gap-4">
              {['Sleep', 'Meditate', 'Breathe', 'Science'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base text-[#2d2926] dark:text-[#e8e2d8] py-2"
                >
                  {link}
                </a>
              ))}
              <hr className="border-[#e8e4dc] dark:border-[#3a3428]" />
              <a href="#" className="text-base text-[#7a6e62] dark:text-[#8a8076] py-2">Sign in</a>
              <a
                href="#"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-[#4a8c6f] dark:bg-[#6aad8c] text-white"
              >
                Try free for 7 days
              </a>
            </div>
          </div>
        </>
      )}

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Organic background orbs */}
        <div className="absolute top-[30%] right-[-10%] w-[900px] h-[900px] rounded-full bg-[#4a8c6f]/[0.06] dark:bg-[#6aad8c]/[0.06] blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#d4b896]/[0.12] dark:bg-[#d4b896]/[0.06] blur-3xl pointer-events-none animate-[float_6s_ease-in-out_infinite]" />

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
          {/* Breathing circle */}
          <BreathingCircle />

          {/* Headline */}
          <h1 className="font-serif font-light text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.2] mb-6">
            <span className="italic">Rest</span> more.{' '}
            Stress <span className="italic">less</span>.{' '}
            Live <span className="italic">better</span>.
          </h1>

          {/* Subheadline */}
          <p className="text-lg font-light text-[#7a6e62] dark:text-[#8a8076] max-w-xl mx-auto leading-[1.9] mb-10">
            Zura guides you through daily meditations, sleep stories, and breathing exercises — built on decades of neuroscience research.
          </p>

          {/* CTA */}
          <a
            href="#"
            className="inline-flex items-center px-10 py-4 rounded-full text-base font-medium bg-[#4a8c6f] dark:bg-[#6aad8c] text-white hover:bg-[#3d7860] dark:hover:bg-[#5a9d7c] transition-colors duration-200 mb-4"
          >
            Start your free week
          </a>

          {/* Trust line */}
          <p className="text-xs text-[#b0a89a] dark:text-[#8a8076]">
            No credit card · Cancel anytime · 4.8 ⭐ on App Store
          </p>

          {/* App store badges */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2d2926] dark:bg-[#e8e2d8] text-white dark:text-[#2d2926]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
              <div className="text-left">
                <p className="text-[8px] leading-none opacity-70">Download on the</p>
                <p className="text-xs font-medium leading-tight">App Store</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2d2926] dark:bg-[#e8e2d8] text-white dark:text-[#2d2926]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.69L14.32 12.55 3.18.31c-.13.21-.18.47-.18.74v22.2c0 .16.03.31.07.45l.11-.01zm1.67 1.17l12.4-6.96-3.12-3.12L4.85 24.86zm-.15-24.52l9.28 9.28 3.12-3.12L4.7.34zM21.54 11.12L18.36 9.33l-3.41 3.41 3.41 3.41 3.18-1.79c.81-.48.81-1.76 0-2.24z" /></svg>
              <div className="text-left">
                <p className="text-[8px] leading-none opacity-70">Get it on</p>
                <p className="text-xs font-medium leading-tight">Google Play</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats / Trust ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-center md:divide-x divide-[#e8e4dc] dark:divide-[#3a3428]">
            {STATS.map((stat, i) => (
              <AnimatedStat
                key={i}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
          <p className="text-center text-xs text-[#b0a89a] dark:text-[#6a6258] mt-6">
            Source: Zura internal study, 2024, n=8,400
          </p>
        </div>
      </section>

      {/* ── Product Features ── */}
      <section id="meditate" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl text-center mb-16 lg:mb-24">
            Everything your <span className="text-[#4a8c6f] dark:text-[#6aad8c] italic">mind</span> needs.
          </h2>

          {/* Feature 1: Sleep */}
          <div id="sleep" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 lg:mb-32 bg-[#f0ebe3] dark:bg-[#232018] rounded-3xl p-8 lg:p-12">
            <div className="flex items-center justify-center">
              <div className="w-64 h-[460px] rounded-[2.5rem] bg-[#1a1814] border-4 border-[#2c2820] shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#2c2820] to-[#1a1814] p-5 pt-12">
                  <div className="w-8 h-1 rounded-full bg-white/20 mx-auto mb-8" />
                  <p className="text-[#d4b896] text-xs font-medium tracking-wider uppercase mb-2">Now Playing</p>
                  <p className="text-white/90 text-lg font-serif mb-1">Midnight Garden</p>
                  <p className="text-white/40 text-xs mb-8">Sleep Story · 32 min</p>
                  <div className="w-full h-1 rounded-full bg-white/10 mb-2">
                    <div className="w-1/3 h-full rounded-full bg-[#d4b896]" />
                  </div>
                  <div className="flex justify-between text-white/30 text-[10px] font-mono">
                    <span>11:24</span><span>32:00</span>
                  </div>
                  <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-8">
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M19 20L9 12l10-8v16z" /><rect x="5" y="4" width="2" height="16" fill="white" /></svg>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-[#d4b896] flex items-center justify-center">
                      <IconPause />
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M5 4l10 8-10 8V4z" /><rect x="17" y="4" width="2" height="16" fill="white" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-[#4a8c6f] dark:text-[#6aad8c] mb-4">
                <IconMoon /> <span className="text-sm font-medium">Sleep</span>
              </span>
              <h3 className="font-serif font-light text-2xl sm:text-3xl mb-4">{FEATURES[0].headline}</h3>
              <p className="text-[#7a6e62] dark:text-[#8a8076] leading-[1.9] font-light mb-6">{FEATURES[0].description}</p>
              <ul className="space-y-3">
                {FEATURES[0].bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#7a6e62] dark:text-[#8a8076]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a8c6f] dark:bg-[#6aad8c] mt-1.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2: Breathwork */}
          <div id="breathe" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24 lg:mb-32">
            <div className="order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 text-[#4a8c6f] dark:text-[#6aad8c] mb-4">
                <IconWind /> <span className="text-sm font-medium">Breathwork</span>
              </span>
              <h3 className="font-serif font-light text-2xl sm:text-3xl mb-4">{FEATURES[1].headline}</h3>
              <p className="text-[#7a6e62] dark:text-[#8a8076] leading-[1.9] font-light mb-6">{FEATURES[1].description}</p>
              <ul className="space-y-3">
                {FEATURES[1].bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#7a6e62] dark:text-[#8a8076]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a8c6f] dark:bg-[#6aad8c] mt-1.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <BreathingExercise />
            </div>
          </div>

          {/* Feature 3: Guided Meditations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <AudioPlayerMockup />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 text-[#4a8c6f] dark:text-[#6aad8c] mb-4">
                <IconHeadphones /> <span className="text-sm font-medium">Meditation</span>
              </span>
              <h3 className="font-serif font-light text-2xl sm:text-3xl mb-4">{FEATURES[2].headline}</h3>
              <p className="text-[#7a6e62] dark:text-[#8a8076] leading-[1.9] font-light mb-6">{FEATURES[2].description}</p>
              <ul className="space-y-3">
                {FEATURES[2].bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#7a6e62] dark:text-[#8a8076]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4a8c6f] dark:bg-[#6aad8c] mt-1.5 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Science Backing ── */}
      <section id="science" className="py-16 lg:py-24 bg-[#f0ebe3] dark:bg-[#232018]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl text-center mb-4">
            The science of <span className="italic">stillness</span>.
          </h2>
          <p className="text-center text-[#7a6e62] dark:text-[#8a8076] font-light max-w-xl mx-auto mb-16">
            Every feature in Zura is grounded in peer-reviewed research. Here's what the data shows.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {SCIENCE_CLAIMS.map((claim, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#2c2820] rounded-3xl p-8 shadow-sm"
              >
                <p className="font-serif text-4xl font-light text-[#4a8c6f] dark:text-[#6aad8c] mb-2">{claim.stat}</p>
                <p className="text-lg font-light text-[#2d2926] dark:text-[#e8e2d8] mb-4">{claim.claim}</p>
                <p className="text-sm text-[#7a6e62] dark:text-[#8a8076] leading-[1.8] mb-4">{claim.explanation}</p>
                <p className="text-xs italic text-[#b0a89a] dark:text-[#6a6258]">{claim.source}</p>
              </div>
            ))}
          </div>

          {/* Advisor quote */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#4a8c6f]/10 dark:bg-[#6aad8c]/10 mx-auto mb-4 flex items-center justify-center">
              <IconHeart />
            </div>
            <blockquote className="font-serif font-light text-xl italic text-[#2d2926] dark:text-[#e8e2d8] leading-[1.8] mb-4">
              "The evidence for daily mindfulness practice as a cortisol reducer is now overwhelming. What Zura does exceptionally well is make that practice accessible and sustainable."
            </blockquote>
            <p className="text-sm text-[#7a6e62] dark:text-[#8a8076]">
              <span className="font-medium text-[#2d2926] dark:text-[#e8e2d8]">Dr. Elena Vasquez, PhD</span>
              <br />
              Clinical Neuroscientist, Stanford Stress & Health Lab
            </p>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl text-center mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-center text-[#7a6e62] dark:text-[#8a8076] font-light max-w-lg mx-auto mb-10">
            Start with everything you need for free. Upgrade when you're ready.
          </p>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={cn('text-sm transition-colors duration-200', !billingAnnual ? 'text-[#2d2926] dark:text-[#e8e2d8]' : 'text-[#b0a89a] dark:text-[#6a6258]')}>Monthly</span>
            <button
              onClick={() => setBillingAnnual(!billingAnnual)}
              className={cn(
                'relative w-14 h-7 rounded-full transition-colors duration-200',
                billingAnnual ? 'bg-[#4a8c6f] dark:bg-[#6aad8c]' : 'bg-[#e8e4dc] dark:bg-[#3a3428]'
              )}
            >
              <span className={cn(
                'absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform duration-200',
                billingAnnual ? 'translate-x-7' : 'translate-x-0.5'
              )} />
            </button>
            <span className={cn('text-sm transition-colors duration-200', billingAnnual ? 'text-[#2d2926] dark:text-[#e8e2d8]' : 'text-[#b0a89a] dark:text-[#6a6258]')}>
              Annual <span className="text-[#4a8c6f] dark:text-[#6aad8c] font-medium">(save 55%)</span>
            </span>
          </div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free */}
            <div className="rounded-3xl p-8 bg-white dark:bg-[#232018] border border-[#e8e4dc] dark:border-[#3a3428]">
              <h3 className="font-serif font-light text-2xl mb-2">Free</h3>
              <p className="text-sm text-[#7a6e62] dark:text-[#8a8076] mb-6">Everything you need to get started.</p>
              <p className="font-serif text-4xl font-light text-[#2d2926] dark:text-[#e8e2d8] mb-8">$0</p>
              <ul className="space-y-3 mb-8">
                {PRICING_FEATURES_FREE.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#7a6e62] dark:text-[#8a8076]">
                    <span className="text-[#4a8c6f] dark:text-[#6aad8c] mt-0.5"><IconCheck /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="block text-center px-6 py-3 rounded-full text-sm font-medium border border-[#e8e4dc] dark:border-[#3a3428] text-[#2d2926] dark:text-[#e8e2d8] hover:bg-[#f0ebe3] dark:hover:bg-[#2c2820] transition-colors duration-200"
              >
                Get started free
              </a>
            </div>

            {/* Premium */}
            <div className="rounded-3xl p-8 bg-white dark:bg-[#232018] border-2 border-[#4a8c6f] dark:border-[#6aad8c] relative">
              <span className="absolute -top-3 left-8 px-3 py-1 rounded-full text-xs font-medium bg-[#4a8c6f] dark:bg-[#6aad8c] text-white">
                Most popular
              </span>
              <h3 className="font-serif font-light text-2xl mb-2">Premium</h3>
              <p className="text-sm text-[#7a6e62] dark:text-[#8a8076] mb-6">The full Zura experience, unlimited.</p>
              <div className="mb-8">
                <p className="font-serif text-4xl font-light text-[#2d2926] dark:text-[#e8e2d8]">
                  {billingAnnual ? '$5.83' : '$12.99'}
                  <span className="text-lg text-[#7a6e62] dark:text-[#8a8076]">/mo</span>
                </p>
                {billingAnnual && (
                  <p className="text-xs text-[#b0a89a] dark:text-[#6a6258] mt-1">Billed $69.99/year</p>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {PRICING_FEATURES_PREMIUM.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#7a6e62] dark:text-[#8a8076]">
                    <span className="text-[#4a8c6f] dark:text-[#6aad8c] mt-0.5"><IconCheck /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="block text-center px-6 py-3 rounded-full text-sm font-medium bg-[#4a8c6f] dark:bg-[#6aad8c] text-white hover:bg-[#3d7860] dark:hover:bg-[#5a9d7c] transition-colors duration-200"
              >
                Start free trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 lg:py-24 bg-[#f0ebe3] dark:bg-[#232018]">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="font-serif font-light text-3xl sm:text-4xl lg:text-5xl text-center mb-16">
            Real <span className="italic">stories</span>.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white dark:bg-[#2c2820] rounded-3xl p-8 shadow-sm">
                {/* Star rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className="w-2 h-2 rounded-full bg-[#4a8c6f] dark:bg-[#6aad8c]" />
                  ))}
                </div>
                <p className="text-sm text-[#7a6e62] dark:text-[#8a8076] leading-[1.9] font-light mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-[#2d2926] dark:text-[#e8e2d8]">{t.name}</p>
                    <p className="text-xs text-[#b0a89a] dark:text-[#6a6258]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mental Health Resources ── */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="border-t-2 border-[#4a8c6f]/20 dark:border-[#6aad8c]/20 pt-10">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#4a8c6f]/10 dark:bg-[#6aad8c]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <IconHeart />
              </div>
              <div>
                <h3 className="font-serif font-light text-xl mb-3">Important note</h3>
                <p className="text-sm text-[#7a6e62] dark:text-[#8a8076] leading-[1.9]">
                  Zura is a wellness support tool, not a substitute for professional mental health care. If you or someone you know is experiencing a mental health crisis, please reach out to qualified professionals.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ml-14">
              <a
                href="https://988lifeline.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#f0ebe3] dark:bg-[#2c2820] text-sm text-[#2d2926] dark:text-[#e8e2d8] hover:bg-[#e8e4dc] dark:hover:bg-[#3a3428] transition-colors duration-200"
              >
                988 Suicide & Crisis Lifeline
                <IconExternalLink />
              </a>
              <a
                href="https://www.samhsa.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#f0ebe3] dark:bg-[#2c2820] text-sm text-[#2d2926] dark:text-[#e8e2d8] hover:bg-[#e8e4dc] dark:hover:bg-[#3a3428] transition-colors duration-200"
              >
                SAMHSA Helpline
                <IconExternalLink />
              </a>
              <a
                href="https://www.psychologytoday.com/us/therapists"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#f0ebe3] dark:bg-[#2c2820] text-sm text-[#2d2926] dark:text-[#e8e2d8] hover:bg-[#e8e4dc] dark:hover:bg-[#3a3428] transition-colors duration-200"
              >
                Find a Therapist
                <IconExternalLink />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-16 border-t border-[#e8e4dc] dark:border-[#3a3428]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-1">
              <span className="font-serif italic font-light text-xl text-[#4a8c6f] dark:text-[#6aad8c]">zura</span>
              <p className="text-sm text-[#7a6e62] dark:text-[#8a8076] mt-3 leading-[1.8]">
                Rest more. Stress less.<br />Live better.
              </p>
            </div>
            {/* Link columns */}
            {FOOTER_LINKS.map((group, i) => (
              <div key={i}>
                <h4 className="text-sm font-medium text-[#2d2926] dark:text-[#e8e2d8] mb-4">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-sm text-[#7a6e62] dark:text-[#8a8076] hover:text-[#2d2926] dark:hover:text-[#e8e2d8] transition-colors duration-150">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="pt-8 border-t border-[#e8e4dc] dark:border-[#3a3428] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#b0a89a] dark:text-[#6a6258]">© {new Date().getFullYear()} Zura Wellness, Inc. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-[#b0a89a] dark:text-[#6a6258] hover:text-[#7a6e62] dark:hover:text-[#8a8076] transition-colors">Privacy</a>
              <a href="#" className="text-xs text-[#b0a89a] dark:text-[#6a6258] hover:text-[#7a6e62] dark:hover:text-[#8a8076] transition-colors">Terms</a>
              <a href="#" className="text-xs text-[#b0a89a] dark:text-[#6a6258] hover:text-[#7a6e62] dark:hover:text-[#8a8076] transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── CSS Keyframes ── */}
      <style>{`
        @keyframes breathe {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
