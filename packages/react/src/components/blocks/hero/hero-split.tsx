'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface HeroSplitProps {
  /** Badge text above the heading */
  badge?: string;
  /** Main headline */
  heading: string;
  /** Supporting copy */
  subheading: string;
  /** Primary call-to-action */
  primaryCta: { label: string; href: string; onClick?: () => void };
  /** Secondary call-to-action */
  secondaryCta?: { label: string; href: string; onClick?: () => void };
  /** Hero image */
  image: { src: string; alt: string };
  /** Rotation angle for the image card (degrees, default 3) */
  imageRotation?: number;
  /** Background element (e.g. BackgroundGrid) */
  background?: React.ReactNode;
  /** Flip column order */
  reversed?: boolean;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function HeroSplit({
  badge,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  image,
  imageRotation = 3,
  background,
  reversed = false,
  className,
}: HeroSplitProps) {
  return (
    <SectionWrapper padding="hero" background={background} className={className}>
      <div
        className={cn(
          'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center',
          reversed && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
        )}
      >
        {/* Copy column */}
        <div className="flex flex-col gap-6">
          {badge && (
            <span
              className={cn(
                'inline-flex self-start items-center',
                'rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
                'bg-blue-500/10 text-blue-600 border border-blue-500/20',
                'dark:bg-blue-400/10 dark:text-blue-400 dark:border-blue-400/20'
              )}
            >
              {badge}
            </span>
          )}

          <h1
            className={cn(
              'text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.1]',
              'text-slate-900 dark:text-white'
            )}
          >
            {heading}
          </h1>

          <p
            className={cn(
              'text-lg lg:text-xl leading-relaxed max-w-lg',
              'text-slate-600 dark:text-slate-400'
            )}
          >
            {subheading}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            <a
              href={primaryCta.href}
              onClick={primaryCta.onClick}
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'rounded-xl px-6 py-3 text-sm font-medium',
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
                  'rounded-xl px-6 py-3 text-sm font-medium',
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

        {/* Image column */}
        <div className="flex justify-center lg:justify-end">
          <div
            className={cn(
              'relative rounded-2xl overflow-hidden',
              'border border-white/40 dark:border-white/10',
              'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]',
              'dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]',
              'bg-white/60 dark:bg-white/[0.06]',
              'backdrop-blur-sm',
              'transition-transform duration-500'
            )}
            style={{ transform: `rotate(${imageRotation}deg)` }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto max-w-md lg:max-w-lg object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

HeroSplit.displayName = 'HeroSplit';

export { HeroSplit };
