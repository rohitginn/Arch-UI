'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface PricingTablePlan {
  /** Plan name shown in header */
  name: string;
  /** Monthly price */
  monthlyPrice: number | string;
  /** Annual price */
  annualPrice?: number | string;
  /** CTA button */
  cta: { label: string; href: string };
  /** Highlighted plan */
  recommended?: boolean;
}

export interface PricingTableFeature {
  /** Feature name shown in the first column */
  name: string;
  /** Category grouping label (renders as a section header row) */
  category?: string;
  /**
   * Value per plan, keyed by plan name.
   * `true` = check, `false` = cross, `string` = text value.
   */
  values: Record<string, boolean | string>;
}

export interface PricingTableProps {
  /** Badge pill text above the heading */
  badge?: string;
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** Show billing toggle */
  billingToggle?: boolean;
  /** Plans (columns) */
  plans: PricingTablePlan[];
  /** Feature rows */
  features: PricingTableFeature[];
  /** Currency symbol */
  currency?: string;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-emerald-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="h-5 w-5 text-[var(--glass-text)]/30"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function PricingTable({
  badge,
  heading,
  subheading,
  billingToggle = false,
  plans,
  features,
  currency = '$',
  background,
  className,
}: PricingTableProps) {
  const [annual, setAnnual] = React.useState(false);

  // Group features by category for section separators
  let lastCategory: string | undefined;

  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading badge={badge} heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      {/* Billing toggle */}
      {billingToggle && (
        <div className="flex items-center justify-center gap-3 mb-10">
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              !annual ? 'text-[var(--glass-text)]' : 'text-[var(--glass-text)]/50'
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
              annual ? 'bg-[var(--glass-accent)]' : 'bg-[var(--glass-surface)]'
            )}
          >
            <span
              className={cn(
                'pointer-events-none inline-block h-[22px] w-[22px] rounded-full',
                'bg-white shadow-md transition-transform duration-200',
                annual ? 'translate-x-5' : 'translate-x-0.5',
                'mt-[1px]'
              )}
            />
          </button>
          <span
            className={cn(
              'text-sm font-medium transition-colors',
              annual ? 'text-[var(--glass-text)]' : 'text-[var(--glass-text)]/50'
            )}
          >
            Annual
          </span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          {/* Header */}
          <thead>
            <tr>
              {/* Feature column header */}
              <th className="sticky left-0 z-10 bg-[var(--glass-bg,transparent)] p-4 text-left font-medium text-[var(--glass-text)]/60 min-w-[200px]">
                Features
              </th>
              {plans.map((plan, i) => {
                const price =
                  annual && plan.annualPrice !== undefined
                    ? plan.annualPrice
                    : plan.monthlyPrice;
                const isNumber = typeof price === 'number';

                return (
                  <th
                    key={i}
                    className={cn(
                      'p-4 text-center min-w-[160px]',
                      plan.recommended && 'bg-[var(--glass-accent)]/5 rounded-t-xl'
                    )}
                  >
                    <div className="space-y-1">
                      <div
                        className={cn(
                          'text-base font-semibold',
                          plan.recommended
                            ? 'text-[var(--glass-accent)]'
                            : 'text-[var(--glass-text)]'
                        )}
                      >
                        {plan.name}
                      </div>
                      <div className="text-2xl font-bold text-[var(--glass-text)]">
                        {isNumber ? `${currency}${price}` : price}
                        {isNumber && (
                          <span className="text-xs font-normal text-[var(--glass-text)]/50 ml-1">
                            /{annual ? 'yr' : 'mo'}
                          </span>
                        )}
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {features.map((feature, fi) => {
              const showCategory =
                feature.category && feature.category !== lastCategory;
              if (feature.category) lastCategory = feature.category;

              return (
                <React.Fragment key={fi}>
                  {/* Category separator row */}
                  {showCategory && (
                    <tr>
                      <td
                        colSpan={plans.length + 1}
                        className="pt-6 pb-2 px-4 text-xs font-semibold uppercase tracking-wider text-[var(--glass-text)]/40"
                      >
                        {feature.category}
                      </td>
                    </tr>
                  )}

                  {/* Feature row */}
                  <tr
                    className={cn(
                      'border-b border-[var(--glass-edge)]/30',
                      'transition-colors hover:bg-[var(--glass-surface)]/50'
                    )}
                  >
                    <td className="sticky left-0 z-10 bg-[var(--glass-bg,transparent)] p-4 text-[var(--glass-text)]/80 font-medium">
                      {feature.name}
                    </td>
                    {plans.map((plan, pi) => {
                      const val = feature.values[plan.name];
                      return (
                        <td
                          key={pi}
                          className={cn(
                            'p-4 text-center',
                            plan.recommended && 'bg-[var(--glass-accent)]/5'
                          )}
                        >
                          {val === true && <CheckIcon />}
                          {val === false && <CrossIcon />}
                          {typeof val === 'string' && (
                            <span className="text-[var(--glass-text)]/70">{val}</span>
                          )}
                          {val === undefined && (
                            <span className="text-[var(--glass-text)]/20">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>

          {/* CTA Footer */}
          <tfoot>
            <tr>
              <td className="p-4" />
              {plans.map((plan, i) => (
                <td key={i} className={cn('p-4 text-center', plan.recommended && 'bg-[var(--glass-accent)]/5 rounded-b-xl')}>
                  <a
                    href={plan.cta.href}
                    className={cn(
                      'inline-flex items-center justify-center rounded-xl px-5 py-2.5',
                      'text-sm font-semibold transition-all duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      'active:scale-[0.97]',
                      plan.recommended
                        ? 'bg-[var(--glass-accent)] text-white hover:brightness-110'
                        : 'border border-[var(--glass-edge)] text-[var(--glass-text)] hover:bg-[var(--glass-accent)]/10'
                    )}
                  >
                    {plan.cta.label}
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </SectionWrapper>
  );
}

PricingTable.displayName = 'PricingTable';
export { PricingTable };
