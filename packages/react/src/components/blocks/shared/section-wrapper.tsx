'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export type SectionPadding = 'none' | 'compact' | 'default' | 'hero';

export interface SectionWrapperProps {
  /** Content to render inside the constrained container */
  children: React.ReactNode;
  /** Optional background element rendered behind content (e.g. BackgroundGrid) */
  background?: React.ReactNode;
  /** Remove the max-width container, allow full bleed */
  fullWidth?: boolean;
  /** Vertical padding preset */
  padding?: SectionPadding;
  /** HTML id for scroll-to anchoring */
  id?: string;
  /** Additional CSS classes on the <section> element */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Padding map                                                         */
/* ------------------------------------------------------------------ */

const paddingClasses: Record<SectionPadding, string> = {
  none: '',
  compact: 'py-10 lg:py-16',
  default: 'py-16 lg:py-24',
  hero: 'py-20 lg:py-32',
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * SectionWrapper — consistent padding, background, and container max-width
 * for every block section.
 *
 * @example
 * <SectionWrapper padding="hero" background={<BackgroundBeams />}>
 *   <HeroCentered ... />
 * </SectionWrapper>
 */
const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  (
    {
      children,
      background,
      fullWidth = false,
      padding = 'default',
      id,
      className,
    },
    ref
  ) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          'relative w-full overflow-hidden',
          paddingClasses[padding],
          className
        )}
      >
        {/* Background layer */}
        {background && (
          <div className="absolute inset-0 z-0" aria-hidden="true">
            {background}
          </div>
        )}

        {/* Content layer */}
        <div
          className={cn(
            'relative z-10',
            !fullWidth && 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
          )}
        >
          {children}
        </div>
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';

export { SectionWrapper };
