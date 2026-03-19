'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface PricingMinimalPlan {
  /** Plan name */
  name: string;
  /** Price display */
  price: number | string;
  /** Billing label (e.g. "/month") */
  billingLabel?: string;
  /** Short description */
  description?: string;
  /** Feature list */
  features: string[];
  /** CTA button */
  cta: { label: string; href: string };
  /** Highlighted plan */
  highlighted?: boolean;
}

export interface PricingMinimalProps {
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** 1 or 2 plans */
  plans: PricingMinimalPlan[];
  /** Currency symbol */
  currency?: string;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function PricingMinimal({
  heading,
  subheading,
  plans,
  currency = '$',
  background,
  className,
}: PricingMinimalProps) {
  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div
        className={cn(
          'mx-auto flex flex-col items-stretch gap-8',
          plans.length === 1 && 'max-w-lg',
          plans.length >= 2 && 'md:flex-row md:items-center md:justify-center max-w-4xl'
        )}
      >
        {plans.map((plan, i) => {
          const isNumber = typeof plan.price === 'number';

          return (
            <div
              key={i}
              className={cn(
                'flex flex-col rounded-2xl p-8 md:p-10 flex-1',
                'border transition-all duration-300',
                'bg-[var(--glass-surface)] backdrop-blur-md',
                plan.highlighted
                  ? 'border-[var(--glass-accent)] shadow-xl'
                  : 'border-[var(--glass-edge)] hover:-translate-y-1 hover:shadow-lg'
              )}
            >
              {/* Name */}
              <h3 className="text-lg font-semibold text-[var(--glass-text)] mb-1">
                {plan.name}
              </h3>

              {/* Description */}
              {plan.description && (
                <p className="text-sm text-[var(--glass-text)]/60 mb-6">
                  {plan.description}
                </p>
              )}

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold text-[var(--glass-text)]">
                  {isNumber ? `${currency}${plan.price}` : plan.price}
                </span>
                {plan.billingLabel && (
                  <span className="text-sm text-[var(--glass-text)]/50 ml-1">
                    {plan.billingLabel}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f, fi) => (
                  <li
                    key={fi}
                    className="flex items-start gap-2 text-sm text-[var(--glass-text)]/80"
                  >
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--glass-accent)]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.cta.href}
                className={cn(
                  'inline-flex items-center justify-center rounded-xl px-6 py-3',
                  'text-sm font-semibold transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'active:scale-[0.97] active:transition-transform active:duration-75',
                  plan.highlighted
                    ? 'bg-[var(--glass-accent)] text-white hover:brightness-110'
                    : [
                        'border border-[var(--glass-edge)]',
                        'bg-[var(--glass-surface)] text-[var(--glass-text)]',
                        'hover:bg-[var(--glass-accent)]/10',
                      ]
                )}
              >
                {plan.cta.label}
              </a>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

PricingMinimal.displayName = 'PricingMinimal';
export { PricingMinimal };
