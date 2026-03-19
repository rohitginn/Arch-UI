'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface TabbedFeature {
  /** Tab label */
  label: string;
  /** Tab icon (optional) */
  icon?: React.ReactNode;
  /** Content title */
  title: string;
  /** Content description */
  description: string;
  /** Screenshot/image */
  image: { src: string; alt: string };
}

export interface FeaturesTabbedProps {
  heading?: string;
  subheading?: string;
  badge?: string;
  features: TabbedFeature[];
  background?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function FeaturesTabbed({
  heading,
  subheading,
  badge,
  features,
  background,
  className,
}: FeaturesTabbedProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = features[activeIndex];

  return (
    <SectionWrapper background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading!} subheading={subheading} badge={badge} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
        {/* Tab list */}
        <div
          role="tablist"
          className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible"
        >
          {features.map((f, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                'whitespace-nowrap cursor-pointer select-none',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                i === activeIndex
                  ? 'bg-blue-500/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400 border border-blue-500/20 dark:border-blue-400/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] border border-transparent'
              )}
            >
              {f.icon && (
                <span className="h-5 w-5 shrink-0">{f.icon}</span>
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Content panel */}
        <div
          role="tabpanel"
          className={cn(
            'flex flex-col gap-6',
            'animate-in fade-in-0 duration-300'
          )}
          key={activeIndex}
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
              {active.title}
            </h3>
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">
              {active.description}
            </p>
          </div>

          <div
            className={cn(
              'rounded-xl overflow-hidden',
              'border border-black/[0.06] dark:border-white/[0.08]',
              'shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)]',
              'dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.35)]',
              'bg-white/60 dark:bg-white/[0.04]'
            )}
          >
            <img
              src={active.image.src}
              alt={active.image.alt}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

FeaturesTabbed.displayName = 'FeaturesTabbed';

export { FeaturesTabbed };
