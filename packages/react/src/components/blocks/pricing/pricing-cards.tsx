'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface PricingPlan {
  /** Plan name */
  name: string;
  /** Monthly price (number or arbitrary string like "Custom") */
  monthlyPrice: number | string;
  /** Annual price — used when billing toggle is active */
  annualPrice?: number | string;
  /** Short description */
  description: string;
  /** Features included in this plan */
  features: string[];
  /** CTA button */
  cta: { label: string; href: string };
  /** Whether this plan is visually promoted */
  recommended?: boolean;
  /** Optional badge shown above the card */
  badge?: string;
}

export interface PricingCardsProps {
  /** Badge pill text above the heading */
  badge?: string;
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** Show monthly / annual toggle */
  billingToggle?: boolean;
  /** Array of 2–3 plans */
  plans: PricingPlan[];
  /** Currency symbol */
  currency?: string;
  /** Background element */
  background?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** HTML id for anchor links */
  id?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function PricingCards({
  badge,
  heading,
  subheading,
  billingToggle = false,
  plans,
  currency = '$',
  background,
  className,
  id,
}: PricingCardsProps) {
  const [annual, setAnnual] = React.useState(false);

  /* Scroll-reveal — trigger once when the grid enters the viewport */
  const [revealed, setRevealed] = React.useState(false);
  const gridRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRevealed(true); obs.disconnect(); } },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <SectionWrapper padding="default" background={background} className={className} id={id}>
      {/* Heading */}
      {(heading || subheading) && (
        <SectionHeading
          badge={badge}
          heading={heading}
          subheading={subheading}
          align="center"
          className="mb-12"
        />
      )}

      {/* Billing toggle */}
      {billingToggle && (
        <div className="flex items-center justify-center gap-3 mb-10">
          <span
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              !annual
                ? 'text-[var(--glass-text)]'
                : 'text-[var(--glass-text)]/50'
            )}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual((a) => !a)}
            className={cn(
              'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full',
              'border-2 border-transparent transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--glass-accent)] focus-visible:ring-offset-2',
              annual
                ? 'bg-[var(--glass-accent)]'
                : 'bg-[var(--glass-surface)]'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-[22px] w-[22px] rounded-full',
                'bg-white shadow-md ring-0 transition-transform duration-200',
                annual ? 'translate-x-5' : 'translate-x-0.5',
                'mt-[1px]'
              )}
            />
          </button>
          <span
            className={cn(
              'text-sm font-medium transition-colors duration-200',
              annual
                ? 'text-[var(--glass-text)]'
                : 'text-[var(--glass-text)]/50'
            )}
          >
            Annual
          </span>
        </div>
      )}

      {/* Cards */}
      <div
        ref={gridRef}
        className={cn(
          'grid gap-6 lg:gap-8 items-stretch',
          plans.length === 1 && 'max-w-md mx-auto',
          plans.length === 2 && 'md:grid-cols-2 max-w-4xl mx-auto',
          plans.length >= 3 && 'md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto'
        )}
      >
        {plans.map((plan, i) => {
          const price =
            annual && plan.annualPrice !== undefined
              ? plan.annualPrice
              : plan.monthlyPrice;
          const isNumber = typeof price === 'number';

          return (
            <div
              key={i}
              style={{ transitionDelay: revealed ? `${i * 80}ms` : '0ms' }}
              className={cn(
                'relative flex flex-col rounded-2xl p-8',
                'border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                /* Scroll-reveal: slide up from below */
                revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                // Glassmorphic surface
                'bg-[var(--glass-surface)] backdrop-blur-md',
                plan.recommended
                  ? [
                      'border-[var(--glass-accent)] shadow-xl',
                      'scale-[1.03] z-10',
                    ]
                  : [
                      'border-[var(--glass-edge)]',
                      'hover:-translate-y-1.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)]',
                    ]
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={cn(
                      'inline-block rounded-full px-4 py-1 text-xs font-semibold',
                      'bg-[var(--glass-accent)] text-white'
                    )}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-lg font-semibold text-[var(--glass-text)] mb-2">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-[var(--glass-text)]/60 mb-6">
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-[var(--glass-text)]">
                  {isNumber ? `${currency}${price}` : price}
                </span>
                {isNumber && (
                  <span className="text-sm text-[var(--glass-text)]/50 ml-1">
                    /{annual ? 'yr' : 'mo'}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature, fi) => (
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
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
                  plan.recommended
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

PricingCards.displayName = 'PricingCards';
export { PricingCards };
