'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface StatItem {
  /** Numeric target value for count-up, or a static string */
  value: number | string;
  /** Label below the number */
  label: string;
  /** Prefix (e.g. "$") */
  prefix?: string;
  /** Suffix (e.g. "+", "%", "K") */
  suffix?: string;
  /** Decimal places for count-up */
  decimals?: number;
}

export interface StatsSectionProps {
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** Stat items (3-4 recommended) */
  stats: StatItem[];
  /** Enable count-up animation on scroll */
  animated?: boolean;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Count-up hook (inline to avoid import issues)                       */
/* ------------------------------------------------------------------ */

function useCountUp(
  target: number,
  options: { duration?: number; decimals?: number; enabled?: boolean } = {}
) {
  const { duration = 2000, decimals = 0, enabled = true } = options;
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOut(progress);
            const current = eased * target;
            setValue(Number(current.toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals, enabled]);

  return { value, ref };
}

/* ------------------------------------------------------------------ */
/*  StatCard sub-component                                              */
/* ------------------------------------------------------------------ */

function StatCard({
  stat,
  animated,
  revealed,
  staggerIndex,
}: {
  stat: StatItem;
  animated: boolean;
  revealed: boolean;
  staggerIndex: number;
}) {
  const isNumber = typeof stat.value === 'number';
  const countUp = useCountUp(isNumber ? (stat.value as number) : 0, {
    enabled: animated && isNumber,
    decimals: stat.decimals ?? 0,
    duration: 2000,
  });

  return (
    <div
      ref={isNumber ? countUp.ref : undefined}
      style={{ transitionDelay: revealed ? `${staggerIndex * 80}ms` : '0ms' }}
      className={cn(
        'flex flex-col items-center rounded-2xl p-6 md:p-8',
        'border border-[var(--glass-edge)]',
        'bg-[var(--glass-surface)] backdrop-blur-md',
        /* Scroll-reveal */
        'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        'hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
      )}
    >
      <div className="text-4xl md:text-5xl font-bold text-[var(--glass-text)] mb-2">
        {stat.prefix}
        {isNumber ? countUp.value : stat.value}
        {stat.suffix}
      </div>
      <div className="text-sm text-[var(--glass-text)]/60 font-medium">
        {stat.label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function StatsSection({
  heading,
  subheading,
  stats,
  animated = true,
  background,
  className,
}: StatsSectionProps) {
  /* Scroll-reveal — one observer on the grid, stagger each card */
  const [revealed, setRevealed] = React.useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div
        ref={gridRef}
        className={cn(
          'grid gap-6 mx-auto max-w-5xl',
          stats.length <= 2 && 'md:grid-cols-2',
          stats.length === 3 && 'md:grid-cols-3',
          stats.length >= 4 && 'md:grid-cols-2 lg:grid-cols-4'
        )}
      >
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} animated={animated} revealed={revealed} staggerIndex={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

StatsSection.displayName = 'StatsSection';
export { StatsSection };
