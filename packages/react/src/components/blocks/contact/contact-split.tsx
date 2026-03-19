'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { SectionWrapper } from '../shared/section-wrapper';
import { SectionHeading } from '../shared/section-heading';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

export interface ContactSplitProps {
  /** Section heading */
  heading?: string;
  /** Section subheading */
  subheading?: string;
  /** Company info items (icon + text) */
  contactInfo?: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
  }>;
  /** Social links */
  socials?: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;
  /** Slot for map embed or extra content on the left */
  aside?: React.ReactNode;
  /** Form field config */
  fields?: Array<{
    name: string;
    label: string;
    type?: 'text' | 'email' | 'textarea';
    placeholder?: string;
    required?: boolean;
  }>;
  /** Submit button label */
  submitLabel?: string;
  /** Called on form submit with form data */
  onSubmit?: (data: Record<string, string>) => void;
  /** Background element */
  background?: React.ReactNode;
  /** Additional classes */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default fields                                                      */
/* ------------------------------------------------------------------ */

const defaultFields = [
  { name: 'name', label: 'Name', type: 'text' as const, placeholder: 'Your name', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'you@example.com', required: true },
  { name: 'subject', label: 'Subject', type: 'text' as const, placeholder: 'How can we help?' },
  { name: 'message', label: 'Message', type: 'textarea' as const, placeholder: 'Tell us more...', required: true },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

function ContactSplit({
  heading = 'Get in touch',
  subheading,
  contactInfo,
  socials,
  aside,
  fields = defaultFields,
  submitLabel = 'Send message',
  onSubmit,
  background,
  className,
}: ContactSplitProps) {
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
    'bg-[var(--glass-surface)] backdrop-blur-md text-sm text-[var(--glass-text)]',
    'placeholder:text-[var(--glass-text)]/40',
    'focus:outline-none focus:ring-2 focus:ring-[var(--glass-accent)] focus:border-transparent',
    'transition-all duration-200'
  );

  return (
    <SectionWrapper padding="default" background={background} className={className}>
      {(heading || subheading) && (
        <SectionHeading heading={heading} subheading={subheading} align="left" className="mb-12" />
      )}

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Left — Info */}
        <div className="space-y-8">
          {contactInfo && contactInfo.length > 0 && (
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--glass-accent)]/10 text-[var(--glass-accent)]">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[var(--glass-text)]/50 uppercase tracking-wider">
                      {info.label}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm text-[var(--glass-text)] hover:text-[var(--glass-accent)] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-sm text-[var(--glass-text)]">{info.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {socials && socials.length > 0 && (
            <div className="flex gap-3">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg',
                    'border border-[var(--glass-edge)] bg-[var(--glass-surface)]',
                    'text-[var(--glass-text)]/60 hover:text-[var(--glass-accent)]',
                    'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
                  )}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}

          {aside}
        </div>

        {/* Right — Form */}
        <form
          onSubmit={handleSubmit}
          className={cn(
            'rounded-2xl border border-[var(--glass-edge)] p-6 md:p-8',
            'bg-[var(--glass-surface)] backdrop-blur-md'
          )}
        >
          <div className="space-y-5">
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
          </div>

          <button
            type="submit"
            className={cn(
              'mt-6 w-full rounded-xl px-6 py-3',
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
    </SectionWrapper>
  );
}

ContactSplit.displayName = 'ContactSplit';
export { ContactSplit };
