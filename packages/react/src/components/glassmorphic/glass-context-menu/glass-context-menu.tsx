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

export interface ContextMenuItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    shortcut?: string;
    disabled?: boolean;
    danger?: boolean;
    divider?: boolean;
    children?: ContextMenuItem[];
    onSelect?: () => void;
}

export interface GlassContextMenuProps {
    /** Menu items */
    items: ContextMenuItem[];
    /** Called when an item is selected */
    onSelect?: (item: ContextMenuItem) => void;
    /** Visual variant */
    variant?: GlassVariant;
    /** CSS class for the trigger wrapper */
    className?: string;
    /** Trigger element */
    children: React.ReactNode;
}

/* ─── Sub-Menu Component ────────────────────────────────── */

const SubMenu: React.FC<{
    items: ContextMenuItem[];
    variant: GlassVariant;
    onSelect?: (item: ContextMenuItem) => void;
    onClose: () => void;
}> = ({ items, variant, onSelect, onClose }) => {
    const [hoveredId, setHoveredId] = React.useState<string | null>(null);
    const v = glassVariant[variant];

    return (
        <div
            className={cn(
                'absolute left-full top-0 ml-1',
                'min-w-[180px] p-1.5 rounded-xl',
                v.surface, v.border, glassHighlight,
                'animate-in slide-in-from-left-1 fade-in duration-150 ease-out',
            )}
        >
            {items.map((item, index) => {
                if (item.divider) {
                    return <div key={`divider-${index}`} className="mx-2 my-1 h-px bg-[var(--glass-divider)]" />;
                }
                return (
                    <button
                        key={item.id}
                        type="button"
                        disabled={item.disabled}
                        className={cn(
                            'group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left text-[13px]',
                            'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
                            'outline-none',
                            item.danger
                                ? 'text-[var(--glass-error)] hover:bg-red-500/10'
                                : [glassText.secondary, 'hover:bg-[var(--glass-surface-hover)]', 'hover:text-[var(--glass-text)]'].join(' '),
                            item.disabled && 'opacity-40 pointer-events-none',
                        )}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!item.children) {
                                item.onSelect?.();
                                onSelect?.(item);
                                onClose();
                            }
                        }}
                    >
                        {item.icon && (
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                                {item.icon}
                            </span>
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.shortcut && (
                            <span className={cn('ml-auto text-[11px]', glassText.muted)}>{item.shortcut}</span>
                        )}
                        {item.children && (
                            <svg className={cn('h-3 w-3 shrink-0', glassText.muted)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        )}
                        {item.children && hoveredId === item.id && (
                            <SubMenu items={item.children} variant={variant} onSelect={onSelect} onClose={onClose} />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

/* ─── Main Component ────────────────────────────────────── */

const GlassContextMenu = React.forwardRef<HTMLDivElement, GlassContextMenuProps>(
    ({ items, onSelect, variant = 'default', className, children }, ref) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const [position, setPosition] = React.useState({ x: 0, y: 0 });
        const [hoveredId, setHoveredId] = React.useState<string | null>(null);
        const menuRef = React.useRef<HTMLDivElement>(null);

        const v = glassVariant[variant];

        const handleContextMenu = (e: React.MouseEvent) => {
            e.preventDefault();
            const x = Math.min(e.clientX, window.innerWidth - 220);
            const y = Math.min(e.clientY, window.innerHeight - 300);
            setPosition({ x, y });
            setIsOpen(true);
        };

        const close = React.useCallback(() => {
            setIsOpen(false);
            setHoveredId(null);
        }, []);

        React.useEffect(() => {
            if (!isOpen) return;
            const handleClick = () => close();
            const handleScroll = () => close();
            const handleKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') close();
            };
            document.addEventListener('click', handleClick);
            document.addEventListener('scroll', handleScroll, true);
            document.addEventListener('keydown', handleKey);
            return () => {
                document.removeEventListener('click', handleClick);
                document.removeEventListener('scroll', handleScroll, true);
                document.removeEventListener('keydown', handleKey);
            };
        }, [isOpen, close]);

        return (
            <>
                <div ref={ref} className={className} onContextMenu={handleContextMenu}>
                    {children}
                </div>

                {isOpen && (
                    <div
                        ref={menuRef}
                        className={cn(
                            'fixed z-50',
                            'min-w-[200px] p-1.5 rounded-xl',
                            v.surface, v.border, glassHighlight,
                            'animate-in fade-in slide-in-from-bottom-1 zoom-in-95 duration-150 ease-out',
                        )}
                        style={{ left: position.x, top: position.y }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {items.map((item, index) => {
                            if (item.divider) {
                                return (
                                    <div
                                        key={`divider-${index}`}
                                        className="mx-2 my-1 h-px bg-[var(--glass-divider)]"
                                    />
                                );
                            }

                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    disabled={item.disabled}
                                    className={cn(
                                        'group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left text-[13px]',
                                        'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
                                        'outline-none',
                                        item.danger
                                            ? 'text-[var(--glass-error)] hover:bg-red-500/10'
                                            : [glassText.secondary, 'hover:bg-[var(--glass-surface-hover)]', 'hover:text-[var(--glass-text)]'].join(' '),
                                        item.disabled && 'opacity-40 pointer-events-none',
                                    )}
                                    style={{
                                        animationDelay: `${index * 25}ms`,
                                        animationFillMode: 'both',
                                    }}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (!item.children) {
                                            item.onSelect?.();
                                            onSelect?.(item);
                                            close();
                                        }
                                    }}
                                >
                                    {item.icon && (
                                        <span className="flex h-4 w-4 shrink-0 items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity duration-150">
                                            {item.icon}
                                        </span>
                                    )}
                                    <span className="flex-1 truncate">{item.label}</span>
                                    {item.shortcut && (
                                        <span className={cn('ml-auto text-[11px] font-medium', glassText.muted)}>
                                            {item.shortcut}
                                        </span>
                                    )}
                                    {item.children && (
                                        <svg className={cn('h-3 w-3 shrink-0', glassText.muted)} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
                                    )}
                                    {item.children && hoveredId === item.id && (
                                        <SubMenu items={item.children} variant={variant} onSelect={onSelect} onClose={close} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </>
        );
    },
);

GlassContextMenu.displayName = 'GlassContextMenu';

export { GlassContextMenu };
