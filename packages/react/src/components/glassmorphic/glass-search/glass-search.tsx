'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import {
    type GlassVariant,
    glassVariant,
    glassText,
    glassHighlight,
} from '../glass-interactive-variants';

/* ─── Types ─────────────────────────────────────────────── */

export interface SearchSuggestion {
    id: string;
    label: string;
    description?: string;
    icon?: React.ReactNode;
}

export interface GlassSearchProps {
    /** Search query (controlled) */
    value?: string;
    /** Default value (uncontrolled) */
    defaultValue?: string;
    /** Called when query changes */
    onValueChange?: (value: string) => void;
    /** Search suggestions */
    suggestions?: SearchSuggestion[];
    /** Called when a suggestion is selected */
    onSelect?: (suggestion: SearchSuggestion) => void;
    /** Called on form submit (Enter) */
    onSubmit?: (query: string) => void;
    /** Placeholder text */
    placeholder?: string;
    /** Visual variant */
    variant?: GlassVariant;
    /** Additional CSS classes */
    className?: string;
}

/**
 * GlassSearch — Glassmorphic search bar with suggestion dropdown
 */
const GlassSearch = React.forwardRef<HTMLDivElement, GlassSearchProps>(
    (
        {
            value: controlledValue,
            defaultValue = '',
            onValueChange,
            suggestions = [],
            onSelect,
            onSubmit,
            placeholder = 'Search…',
            variant = 'default',
            className,
        },
        ref,
    ) => {
        const [internalValue, setInternalValue] = React.useState(defaultValue);
        const query = controlledValue ?? internalValue;
        const [focused, setFocused] = React.useState(false);
        const [focusIndex, setFocusIndex] = React.useState(-1);
        const inputRef = React.useRef<HTMLInputElement>(null);
        const containerRef = React.useRef<HTMLDivElement>(null);

        const v = glassVariant[variant];
        const showSuggestions = focused && suggestions.length > 0 && query.length > 0;

        const handleChange = (val: string) => {
            if (controlledValue === undefined) setInternalValue(val);
            onValueChange?.(val);
            setFocusIndex(-1);
        };

        const handleSelect = (suggestion: SearchSuggestion) => {
            handleChange(suggestion.label);
            onSelect?.(suggestion);
            setFocused(false);
            inputRef.current?.blur();
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (!showSuggestions) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    onSubmit?.(query);
                }
                return;
            }

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setFocusIndex((prev) => (prev + 1) % suggestions.length);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setFocusIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (focusIndex >= 0 && suggestions[focusIndex]) {
                        handleSelect(suggestions[focusIndex]);
                    } else {
                        onSubmit?.(query);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    setFocused(false);
                    inputRef.current?.blur();
                    break;
            }
        };

        React.useEffect(() => {
            const handler = (e: MouseEvent) => {
                if (!containerRef.current?.contains(e.target as Node)) setFocused(false);
            };
            document.addEventListener('mousedown', handler);
            return () => document.removeEventListener('mousedown', handler);
        }, []);

        return (
            <div ref={containerRef} className={cn('relative', className)}>
                <div
                    ref={ref}
                    className={cn(
                        'relative flex items-center gap-2.5 px-4',
                        'h-11 rounded-xl',
                        'transition-all duration-250 ease-out',
                        v.surface, v.border, glassHighlight,
                        focused && [
                            'ring-2 ring-[var(--glass-accent)]/20',
                            'border-[var(--glass-accent)]/30',
                            'shadow-[var(--glass-depth-md)]',
                        ],
                    )}
                >
                    <svg
                        className={cn('h-4 w-4 shrink-0', glassText.muted)}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>

                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => handleChange(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className={cn(
                            'flex-1 bg-transparent text-sm outline-none',
                            glassText.primary,
                            'placeholder:text-[var(--glass-text-placeholder)]',
                        )}
                        role="combobox"
                        aria-expanded={showSuggestions}
                        aria-haspopup="listbox"
                        aria-autocomplete="list"
                    />

                    {query && (
                        <button
                            type="button"
                            className={cn(
                                'shrink-0 p-0.5 rounded transition-colors',
                                glassText.muted,
                                'hover:text-[var(--glass-text)]',
                            )}
                            onClick={() => {
                                handleChange('');
                                inputRef.current?.focus();
                            }}
                            aria-label="Clear"
                        >
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6 6 18M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Suggestions dropdown */}
                {showSuggestions && (
                    <div
                        className={cn(
                            'absolute z-50 left-0 right-0 mt-1.5',
                            'p-1.5 rounded-xl',
                            v.surface, v.border, glassHighlight,
                            'animate-in fade-in slide-in-from-top-1 duration-150 ease-out',
                        )}
                        role="listbox"
                    >
                        {suggestions.map((suggestion, index) => (
                            <button
                                key={suggestion.id}
                                type="button"
                                role="option"
                                aria-selected={index === focusIndex}
                                className={cn(
                                    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm',
                                    'transition-all duration-150',
                                    'outline-none',
                                    index === focusIndex
                                        ? ['bg-[var(--glass-surface-active)]', glassText.primary].join(' ')
                                        : [glassText.secondary, 'hover:bg-[var(--glass-surface-hover)]'].join(' '),
                                )}
                                style={{
                                    animationDelay: `${index * 30}ms`,
                                    animationFillMode: 'both',
                                }}
                                onClick={() => handleSelect(suggestion)}
                                onMouseEnter={() => setFocusIndex(index)}
                            >
                                {suggestion.icon && (
                                    <span className={cn('shrink-0', glassText.muted)}>{suggestion.icon}</span>
                                )}
                                <div className="min-w-0">
                                    <p className="truncate font-medium">{suggestion.label}</p>
                                    {suggestion.description && (
                                        <p className={cn('truncate text-xs mt-0.5', glassText.muted)}>{suggestion.description}</p>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        );
    },
);

GlassSearch.displayName = 'GlassSearch';

export { GlassSearch };
