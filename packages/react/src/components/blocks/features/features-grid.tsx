'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FeatureItem {
  /** Icon element */
  icon: React.ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

export interface FeaturesGridProps {
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** Optional badge */
  badge?: string;
  /** Feature items */
  features: FeatureItem[];
  /** Number of columns */
  columns?: 2 | 3 | 4;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

const colClasses = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

function FeaturesGrid({
  heading,
  subheading,
  badge,
  features,
  columns = 3,
  background,
  className,
}: FeaturesGridProps) {
  return (
    <SectionWrapper background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading!} subheading={subheading} badge={badge} />
      )}

      <div className={cn('grid grid-cols-1 gap-6', colClasses[columns])}>
        {features.map((feature, i) => (
          <div
            key={i}
            className={cn(
              'group relative flex flex-col gap-4 p-6 rounded-xl',
              'border border-black/[0.06] bg-white/60 backdrop-blur-sm',
              'dark:border-white/[0.08] dark:bg-white/[0.04]',
              'transition-all duration-300',
              'hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)]',
              'hover:-translate-y-[2px]',
              'dark:hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.3)]',
              'dark:hover:border-white/[0.15]'
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'flex items-center justify-center w-10 h-10 rounded-lg',
                'bg-blue-500/10 text-blue-600',
                'dark:bg-blue-400/10 dark:text-blue-400',
                'transition-colors duration-200',
                'group-hover:bg-blue-500/15 dark:group-hover:bg-blue-400/15'
              )}
            >
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

FeaturesGrid.displayName = 'FeaturesGrid';

export { FeaturesGrid };
