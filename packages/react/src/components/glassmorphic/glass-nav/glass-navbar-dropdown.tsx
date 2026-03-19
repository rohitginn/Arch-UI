'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { ChevronDown } from 'lucide-react';

// Reusing base nav styles
import { GlassNav, GlassNavProps } from '../glass-nav/glass-nav';

export interface DropdownItem {
    title: string;
    href: string;
    description?: string;
}

export interface NavItem {
    label: string;
    href?: string;
    dropdown?: DropdownItem[];
}

export interface GlassNavbarDropdownProps extends Omit<GlassNavProps, 'children'> {
    items: NavItem[];
}

export function GlassNavbarDropdown({ items, className, ...props }: GlassNavbarDropdownProps) {
    const [activeDropdown, setActiveDropdown] = React.useState<number | null>(null);

    return (
        <GlassNav className={cn("overflow-visible", className)} {...props}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => setActiveDropdown(index)}
                    onMouseLeave={() => setActiveDropdown(null)}
                >
                    {/* Main Link */}
                    <a
                        href={item.href || '#'}
                        className={cn(
                            "flex items-center gap-1 px-3.5 py-2 text-[13px] font-medium rounded-full transition-all duration-200",
                            "text-slate-900 dark:text-white/90",
                            "hover:bg-black/[0.04] dark:hover:bg-white/[0.1]",
                            activeDropdown === index && "bg-black/[0.04] dark:bg-white/[0.1]"
                        )}
                    >
                        {item.label}
                        {item.dropdown && (
                            <ChevronDown className={cn(
                                "h-3 w-3 transition-transform duration-200",
                                activeDropdown === index && "rotate-180"
                            )} />
                        )}
                    </a>

                    {/* Dropdown Menu */}
                    {item.dropdown && (
                        <div
                            className={cn(
                                "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-2 rounded-2xl",
                                "bg-white/80 dark:bg-black/80 backdrop-blur-2xl", // Apple-style materials
                                "border border-white/20 dark:border-white/10",
                                "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)]",
                                "transition-all duration-200 origin-top",
                                activeDropdown === index
                                    ? "opacity-100 translate-y-0 visible"
                                    : "opacity-0 -translate-y-2 invisible pointer-events-none"
                            )}
                        >
                            <div className="grid gap-1">
                                {item.dropdown.map((subItem, subIndex) => (
                                    <a
                                        key={subIndex}
                                        href={subItem.href}
                                        className="block p-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/10 transition-colors"
                                    >
                                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                                            {subItem.title}
                                        </div>
                                        {subItem.description && (
                                            <p className="text-xs text-slate-500 dark:text-white/60 mt-0.5 line-clamp-2">
                                                {subItem.description}
                                            </p>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </GlassNav>
    );
}
