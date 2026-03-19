'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FAQTwoColumnItem {
  question: string;
  answer: string;
}

export interface FAQTwoColumnProps {
  heading?: string;
  subheading?: string;
  items: FAQTwoColumnItem[];
  background?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function FAQTwoColumn({
  heading,
  subheading,
  items,
  background,
  className,
}: FAQTwoColumnProps) {
  // Split items into two columns
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  const renderCard = (item: FAQTwoColumnItem, i: number) => (
    <div
      key={i}
      className={cn(
        'rounded-xl border border-[var(--glass-edge)] p-6',
        'bg-[var(--glass-surface)] backdrop-blur-md',
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'
      )}
    >
      <h3 className="text-sm font-semibold text-[var(--glass-text)] mb-2">
        {item.question}
      </h3>
      <p className="text-sm leading-relaxed text-[var(--glass-text)]/70">
        {item.answer}
      </p>
    </div>
  );

  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-6">
        <div className="space-y-6">{left.map(renderCard)}</div>
        <div className="space-y-6">{right.map((item, i) => renderCard(item, i + mid))}</div>
      </div>
    </SectionWrapper>
  );
}

FAQTwoColumn.displayName = 'FAQTwoColumn';
export { FAQTwoColumn };
