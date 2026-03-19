'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface CallToActionBannerProps {
  /** Main heading */
  heading: string;
  /** Sub-heading / description */
  subheading?: string;
  /** Primary CTA */
  primaryAction?: React.ReactNode;
  /** Secondary CTA */
  secondaryAction?: React.ReactNode;
  /** Background slot (e.g., gradient, pattern, illustration) */
  background?: React.ReactNode;
  /** Layout alignment */
  align?: 'center' | 'left';
  /** Additional className */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export const CallToActionBanner = React.forwardRef<HTMLElement, CallToActionBannerProps>(
  (
    {
      heading,
      subheading,
      primaryAction,
      secondaryAction,
      background,
      align = 'center',
      className,
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl',
          'border border-[var(--glass-edge)]',
          'bg-[var(--glass-surface)] backdrop-blur-xl',
          'px-6 py-16 sm:px-12 sm:py-20',
          className,
        )}
      >
        {/* Background */}
        {background && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {background}
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            'relative z-10 mx-auto max-w-3xl',
            align === 'center' ? 'text-center' : 'text-left',
          )}
        >
          <h2 className="text-2xl font-bold tracking-tight text-[var(--glass-text)] sm:text-3xl lg:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mt-4 text-base text-[var(--glass-text)]/60 sm:text-lg">
              {subheading}
            </p>
          )}
          {(primaryAction || secondaryAction) && (
            <div
              className={cn(
                'mt-8 flex flex-wrap gap-4',
                align === 'center' ? 'justify-center' : 'justify-start',
              )}
            >
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </div>
      </section>
    );
  },
);

CallToActionBanner.displayName = 'CallToActionBanner';
