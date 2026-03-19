'use client';

import * as React from 'react';
import { cn } from '@archui/core';

export interface GlassTagInputProps {
    /** Controlled tags array */
    value?: string[];
    /** Callback on tags change */
    onChange?: (tags: string[]) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Maximum allowed tags */
    maxTags?: number;
    /** Keys that trigger tag creation (default: Enter, comma) */
    separator?: string[];
    /** Field label */
    label?: string;
    /** Error message */
    error?: string;
    /** Disabled state */
    disabled?: boolean;
    /** Additional CSS classes */
    className?: string;
}

/**
 * GlassTagInput — Multi-tag input with add/remove support.
 *
 * Type text and press Enter (or comma) to create a tag.
 * Tags are removable by clicking the X or pressing Backspace.
 * Supports paste.
 *
 * @example
 * ```tsx
 * const [tags, setTags] = useState<string[]>([]);
 * <GlassTagInput label="Skills" value={tags} onChange={setTags} maxTags={10} />
 * ```
 */
export function GlassTagInput({
    value: controlledValue,
    onChange,
    placeholder = 'Type and press Enter...',
    maxTags,
    separator = ['Enter', ','],
    label,
    error,
    disabled = false,
    className,
}: GlassTagInputProps) {
    const [tags, setTags] = React.useState<string[]>(controlledValue ?? []);
    const [input, setInput] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (controlledValue) setTags(controlledValue);
    }, [controlledValue]);

    const addTag = (tag: string) => {
        const trimmed = tag.trim();
        if (!trimmed || tags.includes(trimmed)) return;
        if (maxTags && tags.length >= maxTags) return;
        const next = [...tags, trimmed];
        setTags(next);
        onChange?.(next);
        setInput('');
    };

    const removeTag = (index: number) => {
        const next = tags.filter((_, i) => i !== index);
        setTags(next);
        onChange?.(next);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (separator.includes(e.key)) {
            e.preventDefault();
            addTag(input);
        }
        if (e.key === 'Backspace' && !input && tags.length > 0) {
            removeTag(tags.length - 1);
        }
    };

    return (
        <div className={cn('w-full', className)}>
            {label && (
                <label className="block text-sm font-medium text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)] mb-1.5">
                    {label}
                </label>
            )}
            <div
                onClick={() => inputRef.current?.focus()}
                className={cn(
                    'flex flex-wrap items-center gap-1.5 rounded-xl px-3 py-2 min-h-[42px]',
                    'transition-all duration-200',
                    // Light
                    'bg-[var(--form-bg,#ffffff)] border',
                    // Dark
                    'dark:bg-[var(--form-bg,rgba(255,255,255,0.03))]',
                    'dark:backdrop-blur-md',
                    // Border
                    error
                        ? 'border-[var(--glass-error,#ef4444)]'
                        : 'border-[var(--form-border,#e2e8f0)] dark:border-[var(--form-border,rgba(255,255,255,0.1))]',
                    // Focus-within
                    'focus-within:border-[var(--form-border-focus,#3b82f6)]',
                    'focus-within:ring-2 focus-within:ring-[var(--glass-accent,#3b82f6)]/20',
                    disabled && 'opacity-50 cursor-not-allowed',
                    'cursor-text',
                )}
            >
                {tags.map((tag, i) => (
                    <span
                        key={`${tag}-${i}`}
                        className={cn(
                            'inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-sm',
                            'bg-[var(--accent-subtle,rgba(245,158,11,0.10))]',
                            'text-[var(--glass-text,#0f172a)]',
                            'dark:text-[var(--glass-text,#f8fafc)]',
                            'border border-[var(--surface-border,#e2e8f0)]',
                            'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                        )}
                    >
                        {tag}
                        {!disabled && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeTag(i);
                                }}
                                className={cn(
                                    'rounded-sm p-0.5',
                                    'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
                                    'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.08))]',
                                    'transition-colors duration-100',
                                    'cursor-pointer',
                                )}
                                aria-label={`Remove ${tag}`}
                            >
                                <svg
                                    className="h-3 w-3"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </span>
                ))}
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? placeholder : ''}
                    disabled={disabled}
                    className={cn(
                        'flex-1 min-w-[80px] bg-transparent text-sm outline-none',
                        'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
                        'placeholder:text-[var(--glass-text-placeholder,#94a3b8)]',
                    )}
                />
            </div>
            {error && (
                <p className="mt-1.5 text-xs text-[var(--glass-error,#ef4444)]">{error}</p>
            )}
        </div>
    );
}
