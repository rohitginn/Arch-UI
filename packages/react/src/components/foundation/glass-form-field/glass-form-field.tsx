'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassFormFieldProps {
    /** Field label */
    label: string;
    /** HTML for attribute for the label (auto-generated if omitted) */
    htmlFor?: string;
    /** Error message to display */
    error?: string;
    /** Helper text below the input */
    helperText?: string;
    /** Mark as required */
    required?: boolean;
    /** The form control to render */
    children: React.ReactNode;
    /** Additional CSS classes */
    className?: string;
}

/**
 * GlassFormField — Label + control + helper/error wrapper.
 *
 * Wraps any form input to provide consistent label, error, and helper
 * text presentation. Automatically wires `htmlFor`, `aria-describedby`,
 * and `aria-invalid` into the child input.
 *
 * @example
 * ```tsx
 * <GlassFormField label="Email" error={errors.email} required>
 *   <GlassInput placeholder="you@example.com" />
 * </GlassFormField>
 * ```
 */
export function GlassFormField({
    label,
    htmlFor,
    error,
    helperText,
    required,
    children,
    className,
}: GlassFormFieldProps) {
    const autoId = React.useId();
    const id = htmlFor ?? autoId;

    return (
        <div className={cn('w-full space-y-1.5', className)}>
            <label
                htmlFor={id}
                className={cn(
                    'block text-sm font-medium',
                    'text-[var(--text-primary,#0f172a)]',
                    'dark:text-[var(--text-primary,#f8fafc)]',
                    'transition-colors duration-200',
                )}
            >
                {label}
                {required && <span className="ml-0.5 text-[var(--glass-error,#ef4444)]">*</span>}
            </label>
            {React.isValidElement(children)
                ? React.cloneElement(children as React.ReactElement, {
                      id,
                      'aria-describedby': error
                          ? `${id}-error`
                          : helperText
                            ? `${id}-helper`
                            : undefined,
                      'aria-invalid': error ? true : undefined,
                  } as React.HTMLAttributes<HTMLElement>)
                : children}
            {error && (
                <p
                    id={`${id}-error`}
                    className="text-xs text-[var(--glass-error,#ef4444)]"
                    role="alert"
                >
                    {error}
                </p>
            )}
            {helperText && !error && (
                <p
                    id={`${id}-helper`}
                    className="text-xs text-[var(--glass-text-muted,#64748b)]"
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}
