'use client';

import * as React from 'react';
import { cn } from '@archui/core';

/* -------------------------------------------------------------------------- */
/*  GlassMegaMenu                                                             */
/* -------------------------------------------------------------------------- */

export interface MegaMenuColumn {
    /** Column heading */
    title: string;
    /** Links in this column */
    items: MegaMenuItem[];
}

export interface MegaMenuItem {
    label: string;
    href?: string;
    description?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export interface MegaMenuSection {
    /** Trigger label */
    label: string;
    /** Columns of links */
    columns: MegaMenuColumn[];
    /** Optional featured card on the right */
    featured?: {
        title: string;
        description: string;
        href?: string;
        image?: string;
    };
}

export interface GlassMegaMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Menu sections (each trigger → panel) */
    sections: MegaMenuSection[];
}

/**
 * GlassMegaMenu — Wide dropdown navigation panel for marketing sites.
 *
 * Opens a full-width glass overlay under the navbar with grouped
 * link columns and an optional featured card.
 *
 * @example
 * ```tsx
 * <GlassMegaMenu
 *   sections={[
 *     {
 *       label: 'Products',
 *       columns: [
 *         { title: 'Platform', items: [{ label: 'Overview', href: '/platform' }] },
 *       ],
 *       featured: { title: 'New: AI Agents', description: 'Learn more', href: '/agents' },
 *     },
 *   ]}
 * />
 * ```
 */
export const GlassMegaMenu = React.forwardRef<HTMLDivElement, GlassMegaMenuProps>(
    ({ sections, className, ...rest }, ref) => {
        const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
        const closeTimeout = React.useRef<ReturnType<typeof setTimeout>>();
        const containerRef = React.useRef<HTMLDivElement>(null);

        const open = (idx: number) => {
            clearTimeout(closeTimeout.current);
            setActiveIndex(idx);
        };

        const startClose = () => {
            closeTimeout.current = setTimeout(() => setActiveIndex(null), 200);
        };

        const cancelClose = () => clearTimeout(closeTimeout.current);

        // Close on Escape
        React.useEffect(() => {
            const handler = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setActiveIndex(null);
            };
            document.addEventListener('keydown', handler);
            return () => document.removeEventListener('keydown', handler);
        }, []);

        // Click outside
        React.useEffect(() => {
            if (activeIndex === null) return;
            const handler = (e: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                    setActiveIndex(null);
                }
            };
            document.addEventListener('mousedown', handler);
            return () => document.removeEventListener('mousedown', handler);
        }, [activeIndex]);

        return (
            <div ref={ref} className={cn('relative', className)} {...rest}>
                <div ref={containerRef}>
                    {/* Trigger bar */}
                    <nav className="flex items-center gap-1" role="menubar">
                        {sections.map((section, idx) => (
                            <button
                                key={section.label}
                                type="button"
                                role="menuitem"
                                aria-expanded={activeIndex === idx}
                                aria-haspopup="true"
                                className={cn(
                                    'px-3 py-2 text-sm font-medium rounded-lg cursor-pointer transition-colors duration-200',
                                    'text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]',
                                    'hover:bg-[var(--surface-bg-hover,#f1f5f9)]',
                                    'dark:hover:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
                                    activeIndex === idx && [
                                        'bg-[var(--surface-bg-hover,#f1f5f9)]',
                                        'dark:bg-[var(--glass-bg-dark-hover,rgba(255,255,255,0.06))]',
                                    ],
                                )}
                                onMouseEnter={() => open(idx)}
                                onMouseLeave={startClose}
                                onFocus={() => open(idx)}
                                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                            >
                                {section.label}
                                <svg
                                    className={cn(
                                        'ml-1 inline h-3 w-3 transition-transform duration-200',
                                        activeIndex === idx && 'rotate-180',
                                    )}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        ))}
                    </nav>

                    {/* Panel */}
                    {activeIndex !== null && (
                        <div
                            role="menu"
                            className={cn(
                                'absolute left-0 top-full mt-2 w-full min-w-[600px] rounded-2xl p-6 z-50',
                                // Glass surface
                                'bg-[var(--surface-bg,#ffffff)]/95 backdrop-blur-xl',
                                'dark:bg-[var(--surface-bg-hover,rgba(20,20,20,0.95))]',
                                'border border-[var(--surface-border,#e2e8f0)]',
                                'dark:border-[var(--surface-border,rgba(255,255,255,0.1))]',
                                'shadow-2xl dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)]',
                            )}
                            onMouseEnter={cancelClose}
                            onMouseLeave={startClose}
                        >
                            <div className="flex gap-8">
                                {/* Link columns */}
                                <div className="flex flex-1 gap-8">
                                    {sections[activeIndex].columns.map((col) => (
                                        <div key={col.title} className="flex-1">
                                            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]">
                                                {col.title}
                                            </h3>
                                            <ul className="space-y-1">
                                                {col.items.map((item) => (
                                                    <li key={item.label}>
                                                        <a
                                                            href={item.href ?? '#'}
                                                            onClick={(e) => {
                                                                if (item.onClick) {
                                                                    e.preventDefault();
                                                                    item.onClick();
                                                                }
                                                                setActiveIndex(null);
                                                            }}
                                                            className={cn(
                                                                'flex items-start gap-3 rounded-lg px-3 py-2 -mx-3',
                                                                'transition-colors duration-200',
                                                                'hover:bg-[var(--accent-subtle,#dbeafe)]',
                                                                'dark:hover:bg-[var(--accent-subtle,rgba(59,130,246,0.1))]',
                                                            )}
                                                        >
                                                            {item.icon && (
                                                                <span className="mt-0.5 flex-shrink-0 text-[var(--accent-primary,#3b82f6)]">
                                                                    {item.icon}
                                                                </span>
                                                            )}
                                                            <div>
                                                                <span className="block text-sm font-medium text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]">
                                                                    {item.label}
                                                                </span>
                                                                {item.description && (
                                                                    <span className="block text-xs text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)] mt-0.5">
                                                                        {item.description}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                {/* Featured card */}
                                {sections[activeIndex].featured && (
                                    <div
                                        className={cn(
                                            'w-64 flex-shrink-0 rounded-xl p-4',
                                            'bg-[var(--accent-subtle,#dbeafe)]',
                                            'dark:bg-[var(--accent-subtle,rgba(59,130,246,0.1))]',
                                        )}
                                    >
                                        {sections[activeIndex].featured!.image && (
                                            <img
                                                src={sections[activeIndex].featured!.image}
                                                alt=""
                                                className="mb-3 h-32 w-full rounded-lg object-cover"
                                            />
                                        )}
                                        <h4 className="text-sm font-semibold text-[var(--glass-text,#0f172a)] dark:text-[var(--glass-text,#f8fafc)]">
                                            {sections[activeIndex].featured!.title}
                                        </h4>
                                        <p className="mt-1 text-xs text-[var(--glass-text-secondary,#475569)] dark:text-[var(--glass-text-secondary,#94a3b8)]">
                                            {sections[activeIndex].featured!.description}
                                        </p>
                                        {sections[activeIndex].featured!.href && (
                                            <a
                                                href={sections[activeIndex].featured!.href}
                                                className="mt-3 inline-block text-xs font-medium text-[var(--accent-primary,#3b82f6)] hover:underline"
                                            >
                                                Learn more →
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    },
);

GlassMegaMenu.displayName = 'GlassMegaMenu';
