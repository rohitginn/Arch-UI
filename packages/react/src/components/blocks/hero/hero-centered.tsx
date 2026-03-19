'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface HeroCenteredProps {
  /** Badge text above the heading */
  badge?: string;
  /** Main headline */
  heading: string;
  /** Supporting copy */
  subheading?: string;
  /** Primary call-to-action */
  primaryCta: { label: string; href: string; onClick?: () => void };
  /** Secondary call-to-action */
  secondaryCta?: { label: string; href: string; onClick?: () => void };
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function HeroCentered({
  badge,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  background,
  className,
}: HeroCenteredProps) {
  return (
    <SectionWrapper padding="hero" background={background} className={className}>
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {badge && (
          <span
            className={cn(
              'inline-flex items-center mb-6',
              'rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase',
              'bg-blue-500/10 text-blue-600 border border-blue-500/20',
              'dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20'
            )}
          >
            {badge}
          </span>
        )}

        <h1
          className={cn(
            'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.08]',
            'text-slate-900 dark:text-white'
          )}
        >
          {heading}
        </h1>

        {subheading && (
          <p
            className={cn(
              'mt-6 text-lg lg:text-xl leading-relaxed max-w-2xl',
              'text-slate-600 dark:text-slate-400'
            )}
          >
            {subheading}
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href={primaryCta.href}
            onClick={primaryCta.onClick}
            className={cn(
              'inline-flex items-center justify-center gap-2',
              'rounded-xl px-8 py-3.5 text-sm font-medium',
              'bg-blue-600 text-white border border-blue-700',
              'hover:bg-blue-700 hover:-translate-y-[1px]',
              'active:scale-[0.97] active:transition-transform active:duration-75',
              'shadow-[0_2px_8px_-2px_rgba(59,130,246,0.5)]',
              'transition-all duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
              'dark:bg-blue-500 dark:border-blue-400/30 dark:hover:bg-blue-400'
            )}
          >
            {primaryCta.label}
          </a>

          {secondaryCta && (
            <a
              href={secondaryCta.href}
              onClick={secondaryCta.onClick}
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'rounded-xl px-8 py-3.5 text-sm font-medium',
                'bg-transparent border border-slate-300 text-slate-700',
                'hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-[1px]',
                'active:scale-[0.97] active:transition-transform active:duration-75',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2',
                'dark:border-white/20 dark:text-white dark:hover:bg-white/[0.06] dark:hover:border-white/30'
              )}
            >
              {secondaryCta.label}
            </a>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}

HeroCentered.displayName = 'HeroCentered';

export { HeroCentered };
