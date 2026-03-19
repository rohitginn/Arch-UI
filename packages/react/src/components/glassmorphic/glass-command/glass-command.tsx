'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import {
    type GlassVariant,
    glassVariant,
    glassText,
    glassDivider,
    glassHighlight,
} from '../glass-interactive-variants';

/* ─── Types ─────────────────────────────────────────────── */

export interface CommandItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    group?: string;
    disabled?: boolean;
    onSelect?: () => void;
}

export interface GlassCommandProps {
    /** Controlled open state */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Placeholder for the search input */
    placeholder?: string;
    /** Command items to display */
    items?: CommandItem[];
    /** Called when an item is selected */
    onSelect?: (item: CommandItem) => void;
    /** Empty state message */
    emptyMessage?: string;
    /** Visual variant */
    variant?: GlassVariant;
    /** Additional CSS classes */
    className?: string;
    /** Children (alternative to items prop) */
    children?: React.ReactNode;
}

/* ─── Sub-components ────────────────────────────────────── */

export interface GlassCommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Optional icon before input */
    icon?: React.ReactNode;
}

export const GlassCommandInput = React.forwardRef<HTMLInputElement, GlassCommandInputProps>(
    ({ className, icon, ...props }, ref) => (
        <div
            className={cn(
                'flex items-center gap-3 px-4 py-3',
                'border-b',
                glassDivider,
            )}
        >
            {icon || (
                <svg
                    className={cn('h-4 w-4 shrink-0', glassText.muted)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            )}
            <input
                ref={ref}
                className={cn(
                    'flex-1 bg-transparent text-sm outline-none',
                    glassText.primary,
                    'placeholder:text-[var(--glass-text-placeholder)]',
                    className,
                )}
                {...props}
            />
        </div>
    ),
);
GlassCommandInput.displayName = 'GlassCommandInput';

export interface GlassCommandGroupProps {
    heading?: string;
    children: React.ReactNode;
    className?: string;
}

export const GlassCommandGroup: React.FC<GlassCommandGroupProps> = ({
    heading,
    children,
    className,
}) => (
    <div className={cn('px-1.5 py-1.5', className)}>
        {heading && (
            <div className={cn('px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider', glassText.muted)}>
                {heading}
            </div>
        )}
        <div className="space-y-0.5">{children}</div>
    </div>
);
GlassCommandGroup.displayName = 'GlassCommandGroup';

export interface GlassCommandItemProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    active?: boolean;
    onSelect?: () => void;
    className?: string;
}

export const GlassCommandItemComponent = React.forwardRef<HTMLButtonElement, GlassCommandItemProps>(
    ({ children, icon, shortcut, disabled, active, onSelect, className }, ref) => (
        <button
            ref={ref}
            type="button"
            disabled={disabled}
            onClick={onSelect}
            className={cn(
                'group relative flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm',
                'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
                'outline-none',
                glassText.secondary,
                !disabled && [
                    'hover:bg-[var(--glass-surface-hover)]',
                    'hover:text-[var(--glass-text)]',
                    'hover:-translate-y-[0.5px]',
                    'hover:shadow-[var(--glass-depth-sm)]',
                ],
                active && [
                    'bg-[var(--glass-surface-active)]',
                    glassText.primary,
                    'shadow-[var(--glass-depth-sm)]',
                ],
                disabled && 'opacity-40 pointer-events-none',
                className,
            )}
        >
            {icon && (
                <span className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center transition-colors duration-150',
                    glassText.muted,
                    'group-hover:text-[var(--glass-text-secondary)]',
                )}>
                    {icon}
                </span>
            )}
            <span className="flex-1 truncate">{children}</span>
            {shortcut && (
                <span className="ml-auto flex items-center gap-1">
                    {shortcut.split('+').map((key, i) => (
                        <kbd
                            key={i}
                            className={cn(
                                'inline-flex h-5 min-w-[20px] items-center justify-center rounded px-1',
                                'text-[10px] font-medium leading-none',
                                'bg-[var(--glass-surface-hover)]',
                                glassText.muted,
                                'border border-[var(--glass-divider)]',
                            )}
                        >
                            {key.trim()}
                        </kbd>
                    ))}
                </span>
            )}
        </button>
    ),
);
GlassCommandItemComponent.displayName = 'GlassCommandItem';

export const GlassCommandSeparator: React.FC<{ className?: string }> = ({ className }) => (
    <div className={cn('mx-2 my-1 h-px bg-[var(--glass-divider)]', className)} />
);
GlassCommandSeparator.displayName = 'GlassCommandSeparator';

export const GlassCommandEmpty: React.FC<{ children?: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => (
    <div className={cn('py-8 text-center text-sm', glassText.muted, className)}>
        {children || 'No results found.'}
    </div>
);
GlassCommandEmpty.displayName = 'GlassCommandEmpty';

/* ─── Main Component ────────────────────────────────────── */

const GlassCommand = React.forwardRef<HTMLDivElement, GlassCommandProps>(
    (
        {
            open = false,
            onOpenChange,
            placeholder = 'Type a command or search…',
            items = [],
            onSelect,
            emptyMessage = 'No results found.',
            variant = 'default',
            className,
            children,
        },
        ref,
    ) => {
        const [query, setQuery] = React.useState('');
        const [focusIndex, setFocusIndex] = React.useState(0);
        const inputRef = React.useRef<HTMLInputElement>(null);
        const listRef = React.useRef<HTMLDivElement>(null);

        const v = glassVariant[variant];

        const filtered = React.useMemo(() => {
            if (!query.trim()) return items;
            const q = query.toLowerCase();
            return items.filter(
                (item) =>
                    item.label.toLowerCase().includes(q) ||
                    item.group?.toLowerCase().includes(q),
            );
        }, [items, query]);

        const grouped = React.useMemo(() => {
            const groups = new Map<string, CommandItem[]>();
            filtered.forEach((item) => {
                const key = item.group || '';
                if (!groups.has(key)) groups.set(key, []);
                groups.get(key)!.push(item);
            });
            return groups;
        }, [filtered]);

        const flatItems = React.useMemo(
            () => filtered.filter((i) => !i.disabled),
            [filtered],
        );

        React.useEffect(() => { setFocusIndex(0); }, [query]);

        React.useEffect(() => {
            if (open) {
                setQuery('');
                setFocusIndex(0);
                const t = setTimeout(() => inputRef.current?.focus(), 50);
                return () => clearTimeout(t);
            }
        }, [open]);

        React.useEffect(() => {
            const handler = (e: KeyboardEvent) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                    e.preventDefault();
                    onOpenChange?.(!open);
                }
            };
            document.addEventListener('keydown', handler);
            return () => document.removeEventListener('keydown', handler);
        }, [open, onOpenChange]);

        const handleKeyDown = (e: React.KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setFocusIndex((prev) => (prev + 1) % Math.max(flatItems.length, 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setFocusIndex((prev) =>
                        prev <= 0 ? Math.max(flatItems.length - 1, 0) : prev - 1,
                    );
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (flatItems[focusIndex]) {
                        const item = flatItems[focusIndex];
                        item.onSelect?.();
                        onSelect?.(item);
                        onOpenChange?.(false);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onOpenChange?.(false);
                    break;
            }
        };

        React.useEffect(() => {
            if (!listRef.current) return;
            const el = listRef.current.querySelector('[data-active="true"]');
            el?.scrollIntoView({ block: 'nearest' });
        }, [focusIndex]);

        const handleOverlayClick = (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) onOpenChange?.(false);
        };

        if (!open) return null;

        let flatIdx = -1;

        const kbdClass = cn(
            'inline-flex h-4 min-w-[16px] items-center justify-center rounded px-1 text-[10px]',
            'bg-[var(--glass-surface-hover)]',
            'border border-[var(--glass-divider)]',
            glassText.muted,
        );

        return (
            <div
                className={cn(
                    'fixed inset-0 z-50 flex items-start justify-center pt-[20vh]',
                    'bg-black/20 dark:bg-black/40',
                    'backdrop-blur-[2px]',
                    'animate-in fade-in duration-150',
                )}
                onClick={handleOverlayClick}
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
            >
                <div
                    ref={ref}
                    className={cn(
                        'w-full max-w-[520px] mx-4',
                        'rounded-2xl overflow-hidden',
                        v.surface, v.border,
                        glassHighlight,
                        'animate-in zoom-in-95 slide-in-from-top-2 duration-200 ease-out',
                        className,
                    )}
                    onKeyDown={handleKeyDown}
                    style={{ animationTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                >
                    <GlassCommandInput
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                    />

                    {children ? (
                        <div ref={listRef} className="max-h-[320px] overflow-y-auto overscroll-contain py-1">
                            {children}
                        </div>
                    ) : (
                        <div ref={listRef} className="max-h-[320px] overflow-y-auto overscroll-contain py-1">
                            {filtered.length === 0 ? (
                                <GlassCommandEmpty>{emptyMessage}</GlassCommandEmpty>
                            ) : (
                                Array.from(grouped.entries()).map(([group, groupItems]) => (
                                    <GlassCommandGroup key={group || '__default'} heading={group || undefined}>
                                        {groupItems.map((item) => {
                                            if (!item.disabled) flatIdx++;
                                            const isActive = flatIdx === focusIndex;
                                            return (
                                                <GlassCommandItemComponent
                                                    key={item.id}
                                                    icon={item.icon}
                                                    shortcut={item.shortcut}
                                                    disabled={item.disabled}
                                                    active={isActive}
                                                    data-active={isActive || undefined}
                                                    onSelect={() => {
                                                        item.onSelect?.();
                                                        onSelect?.(item);
                                                        onOpenChange?.(false);
                                                    }}
                                                >
                                                    {item.label}
                                                </GlassCommandItemComponent>
                                            );
                                        })}
                                    </GlassCommandGroup>
                                ))
                            )}
                        </div>
                    )}

                    {/* Footer hint */}
                    <div className={cn(
                        'flex items-center justify-between px-4 py-2',
                        'border-t', glassDivider,
                        'text-[11px]', glassText.muted,
                    )}>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <kbd className={kbdClass}>↑</kbd>
                                <kbd className={kbdClass}>↓</kbd>
                                <span>navigate</span>
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className={kbdClass}>↵</kbd>
                                <span>select</span>
                            </span>
                        </div>
                        <span className="flex items-center gap-1">
                            <kbd className={kbdClass}>esc</kbd>
                            <span>close</span>
                        </span>
                    </div>
                </div>
            </div>
        );
    },
);

GlassCommand.displayName = 'GlassCommand';

export { GlassCommand };
