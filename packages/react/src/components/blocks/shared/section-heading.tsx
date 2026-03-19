'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface SectionHeadingProps {
  /** Main heading text */
  heading?: string;
  /** Optional subheading / description */
  subheading?: string;
  /** Optional badge pill text above the heading */
  badge?: string;
  /** Text alignment */
  align?: 'center' | 'left';
  /** Additional CSS classes on the container <div> */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * SectionHeading — A reusable heading + subheading pair for section tops.
 *
 * Optionally renders a subtle badge pill above the heading.
 *
 * @example
 * <SectionHeading
 *   badge="New"
 *   heading="Powerful Features"
 *   subheading="Everything you need to build beautiful interfaces."
 * />
 */
const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ heading, subheading, badge, align = 'center', className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mb-12 lg:mb-16',
          align === 'center' && 'text-center',
          align === 'left' && 'text-left',
          className
        )}
      >
        {/* Badge pill */}
        {badge && (
          <span
            className={cn(
              'inline-flex items-center mb-4',
              'rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase',
              'bg-[var(--glass-accent,theme(colors.blue.500))]/10',
              'text-[var(--glass-accent,theme(colors.blue.600))]',
              'border border-[var(--glass-accent,theme(colors.blue.500))]/20',
              'dark:bg-[var(--glass-accent,theme(colors.blue.400))]/10',
              'dark:text-[var(--glass-accent,theme(colors.blue.400))]',
              'dark:border-[var(--glass-accent,theme(colors.blue.400))]/20'
            )}
          >
            {badge}
          </span>
        )}

        {/* Heading */}
        <h2
          className={cn(
            'text-3xl lg:text-4xl font-bold tracking-tight',
            'text-slate-900 dark:text-white'
          )}
        >
          {heading}
        </h2>

        {/* Subheading */}
        {subheading && (
          <p
            className={cn(
              'mt-4 text-lg leading-relaxed',
              'text-slate-600 dark:text-slate-400',
              'max-w-2xl',
              align === 'center' && 'mx-auto'
            )}
          >
            {subheading}
          </p>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = 'SectionHeading';

export { SectionHeading };
