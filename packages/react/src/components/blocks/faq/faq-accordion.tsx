'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** FAQ items */
  items: FAQItem[];
  /** Only allow one item open at a time */
  singleOpen?: boolean;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  AccordionItem — height measured via ref, not max-h hack            */
/* ------------------------------------------------------------------ */

interface AccordionItemProps {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
  inView: boolean;
}

function AccordionItem({ item, index, isOpen, onToggle, inView }: AccordionItemProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  /* Measure real content height so transition is exact — not a max-h guess */
  React.useEffect(() => {
    if (!contentRef.current) return;
    const measure = () => setHeight(contentRef.current!.scrollHeight);
    measure();
    /* Re-measure on resize (dynamic content) */
    const ro = new ResizeObserver(measure);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [item.answer]);

  return (
    <div
      className={cn(
        'rounded-xl border overflow-hidden',
        /* Translate from below on scroll-reveal — not a fade */
        'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        isOpen
          ? 'border-[var(--glass-accent,theme(colors.amber.500))]/30 shadow-[0_4px_24px_rgba(0,0,0,0.06)]'
          : 'border-[var(--glass-edge,theme(colors.zinc.200))] dark:border-zinc-800 hover:border-[var(--glass-edge,theme(colors.zinc.300))] dark:hover:border-zinc-700',
        'bg-[var(--glass-surface,white)] dark:bg-zinc-900 backdrop-blur-md',
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Trigger */}
      <button
        type="button"
        id={`faq-trigger-${index}`}
        aria-controls={`faq-panel-${index}`}
        aria-expanded={isOpen}
        onClick={() => onToggle(index)}
        className={cn(
          'flex w-full items-center justify-between gap-4 px-5 py-5 text-left',
          'text-sm font-semibold text-[var(--glass-text,theme(colors.zinc.900))] dark:text-zinc-100',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
          'focus-visible:ring-[var(--glass-accent,theme(colors.amber.500))]',
          'transition-colors duration-150',
          isOpen && 'text-[var(--glass-accent,theme(colors.amber.500))]',
        )}
      >
        <span className="flex-1">{item.question}</span>

        {/* Plus/minus indicator — cleaner than chevron for FAQ */}
        <span
          className={cn(
            'relative flex h-5 w-5 shrink-0 items-center justify-center',
            'rounded-full border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
            isOpen
              ? 'border-[var(--glass-accent,theme(colors.amber.500))]/40 bg-[var(--glass-accent,theme(colors.amber.500))]/8 rotate-45'
              : 'border-[var(--glass-edge,theme(colors.zinc.300))] dark:border-zinc-700 bg-transparent rotate-0',
          )}
          aria-hidden="true"
        >
          {/* Horizontal bar */}
          <span className="absolute h-px w-2.5 bg-current rounded-full" />
          {/* Vertical bar — scales to 0 when open (becomes X becomes minus) */}
          <span
            className={cn(
              'absolute h-2.5 w-px bg-current rounded-full',
              'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
              isOpen ? 'scale-y-0' : 'scale-y-100',
            )}
          />
        </span>
      </button>

      {/* Content — real height transition, not max-h */}
      <div
        id={`faq-panel-${index}`}
        role="region"
        aria-labelledby={`faq-trigger-${index}`}
        style={{
          height: isOpen ? height : 0,
          transition: 'height 280ms cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={contentRef}
          className={cn(
            'px-5 pb-5 pt-0 text-sm leading-relaxed',
            'text-[var(--glass-text,theme(colors.zinc.600))]/80 dark:text-zinc-400',
          )}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

function FAQAccordion({
  heading,
  subheading,
  items,
  singleOpen = true,
  background,
  className,
}: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = React.useState<Set<number>>(new Set());
  const [inView, setInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  /* Scroll-reveal observer */
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: '0px 0px -80px 0px', threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const toggle = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(singleOpen ? [] : prev);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="center" className="mb-12" />
      )}

      <div ref={containerRef} className="mx-auto max-w-3xl space-y-3">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            item={item}
            index={i}
            isOpen={openIndexes.has(i)}
            onToggle={toggle}
            inView={inView}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}

FAQAccordion.displayName = 'FAQAccordion';
export { FAQAccordion };
