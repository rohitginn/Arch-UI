'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface AlternatingFeature {
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Image source */
  image: { src: string; alt: string };
  /** Optional bullet points */
  bullets?: string[];
}

export interface FeaturesAlternatingProps {
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** Badge */
  badge?: string;
  /** Feature rows */
  features: AlternatingFeature[];
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function FeaturesAlternating({
  heading,
  subheading,
  badge,
  features,
  background,
  className,
}: FeaturesAlternatingProps) {
  return (
    <SectionWrapper background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading!} subheading={subheading} badge={badge} />
      )}

      <div className="flex flex-col gap-20 lg:gap-28">
        {features.map((feature, i) => {
          const isEven = i % 2 === 0;
          return (
            <div
              key={i}
              className={cn(
                'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
                !isEven && 'lg:[direction:rtl] lg:[&>*]:[direction:ltr]'
              )}
            >
              {/* Copy */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
                {feature.bullets && feature.bullets.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-3">
                    {feature.bullets.map((bullet, bi) => (
                      <li
                        key={bi}
                        className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                      >
                        <svg
                          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500 dark:text-emerald-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Image */}
              <div
                className={cn(
                  'rounded-2xl overflow-hidden',
                  'border border-black/[0.06] dark:border-white/[0.08]',
                  'shadow-[0_16px_50px_-12px_rgba(0,0,0,0.12)]',
                  'dark:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.4)]',
                  'bg-white/60 dark:bg-white/[0.04]'
                )}
              >
                <img
                  src={feature.image.src}
                  alt={feature.image.alt}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

FeaturesAlternating.displayName = 'FeaturesAlternating';

export { FeaturesAlternating };
