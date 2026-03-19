'use client';

import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FAQCenteredItem {
  question: string;
  answer: string;
}

export interface FAQCenteredProps {
  heading?: string;
  subheading?: string;
  items: FAQCenteredItem[];
  background?: React.ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function FAQCentered({
  heading,
  subheading,
  items,
  background,
  className,
}: FAQCenteredProps) {
  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div className="mx-auto max-w-2xl space-y-10">
        {items.map((item, i) => (
          <div key={i} className="space-y-2">
            <h3 className="text-base font-semibold text-[var(--glass-text)]">
              {item.question}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--glass-text)]/70">
              {item.answer}
            </p>
            {i < items.length - 1 && (
              <div className="pt-8">
                <hr className="border-[var(--glass-edge)]/30" />
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

FAQCentered.displayName = 'FAQCentered';
export { FAQCentered };
