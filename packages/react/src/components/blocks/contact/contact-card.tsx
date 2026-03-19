'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface ContactCardProps {
  /** Heading inside card */
  heading?: string;
  /** Subheading */
  subheading?: string;
  /** Form fields */
  fields?: Array<{
    name: string;
    label: string;
    type?: 'text' | 'email' | 'textarea';
    placeholder?: string;
    required?: boolean;
  }>;
  /** Submit button label */
  submitLabel?: string;
  /** Submit handler */
  onSubmit?: (data: Record<string, string>) => void;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

const defaultFields = [
  { name: 'name', label: 'Name', type: 'text' as const, placeholder: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'you@example.com', required: true },
  { name: 'message', label: 'Message', type: 'textarea' as const, placeholder: 'Your message...', required: true },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function ContactCard({
  heading = 'Contact us',
  subheading,
  fields = defaultFields,
  submitLabel = 'Send',
  onSubmit,
  background,
  className,
}: ContactCardProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSubmit) return;
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((val, key) => {
      data[key] = val.toString();
    });
    onSubmit(data);
  };

  const inputClasses = cn(
    'w-full rounded-xl border border-[var(--glass-edge)] px-4 py-3',
    'bg-[var(--glass-surface)] text-sm text-[var(--glass-text)]',
    'placeholder:text-[var(--glass-text)]/40',
    'focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] focus:border-transparent',
    'transition-all duration-200'
  );

  return (
    <SectionWrapper padding="default" background={background} className={className}>
      <div className="mx-auto max-w-lg">
        <div
          className={cn(
            'rounded-2xl border border-[var(--glass-edge)] p-8 md:p-10',
            'bg-[var(--glass-surface)] backdrop-blur-md shadow-lg'
          )}
        >
          {(heading || subheading) && (
            <div className="mb-8 text-center">
              {heading && (
                <h2 className="text-2xl font-bold text-[var(--glass-text)] mb-2">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-sm text-[var(--glass-text)]/60">{subheading}</p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) =>
              field.type === 'textarea' ? (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-medium text-[var(--glass-text)]/60 mb-1.5 uppercase tracking-wider"
                  >
                    {field.label}
                    {field.required && <span className="text-red-400 ml-0.5">*</span>}
                  </label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    rows={4}
                    className={cn(inputClasses, 'resize-none')}
                  />
                </div>
              ) : (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-xs font-medium text-[var(--glass-text)]/60 mb-1.5 uppercase tracking-wider"
                  >
                    {field.label}
                    {field.required && <span className="text-red-400 ml-0.5">*</span>}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type ?? 'text'}
                    placeholder={field.placeholder}
                    required={field.required}
                    className={inputClasses}
                  />
                </div>
              )
            )}

            <button
              type="submit"
              className={cn(
                'w-full rounded-xl px-6 py-3',
                'bg-[var(--glass-accent)] text-white text-sm font-semibold',
                'transition-all duration-200 hover:brightness-110',
                'active:scale-[0.97] active:transition-transform active:duration-75',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--glass-accent)]'
              )}
            >
              {submitLabel}
            </button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}

ContactCard.displayName = 'ContactCard';
export { ContactCard };
