'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';
import { ChevronRight, Home } from 'lucide-react';

/**
 * GlassBreadcrumb variants with premium shiny borders
 */
const glassBreadcrumbVariants = cva(
  [
    'inline-flex',
    'items-center',
    'gap-1',
  ],
  {
    variants: {
      variant: {
        default: [
          'px-4',
          'py-2',
          'rounded-2xl',
          'bg-white/60',
          'dark:bg-white/[0.04]',
          'backdrop-blur-md',
          // 3D Border Effect
          'border',
          'border-t-white/60',
          'border-l-white/40',
          'border-r-white/30',
          'border-b-black/[0.06]',
          'dark:border-t-white/20',
          'dark:border-l-white/10',
          'dark:border-r-white/10',
          'dark:border-b-white/[0.02]',
          // Deep 3D Shadow
          'shadow-[0_4px_16px_-4px_rgba(0,0,0,0.05),0_2px_4px_-2px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,0.5)]',
          'dark:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]',
          // Hover Lift
          'transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
          'hover:-translate-y-0.5',
          'hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.08),0_4px_8px_-4px_rgba(0,0,0,0.05),inset_0_1px_0_rgba(255,255,255,0.7)]',
          'dark:hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]',
        ],
        glass: [
          'px-5',
          'py-2.5',
          'rounded-full',
          'bg-white/60',
          'dark:bg-black/20',
          'backdrop-blur-2xl',
          // Premium shiny border
          'border',
          'border-t-white/90',
          'border-x-white/50',
          'border-b-white/30',
          'dark:border-white/10',
          'group',
          // Glow
          'shadow-[0_0_20px_-5px_rgba(255,255,255,0.3),inset_0_0_20px_-10px_rgba(255,255,255,0.5)]',
          'hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5),inset_0_0_25px_-5px_rgba(255,255,255,0.6)]',
        ],
        minimal: [],
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface GlassBreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof glassBreadcrumbVariants> {
  /** Breadcrumb items */
  items: BreadcrumbItem[];
  /** Separator type */
  separator?: 'chevron' | 'slash' | 'arrow';
  /** Show home icon for first item */
  showHomeIcon?: boolean;
  /** Maximum items to show (rest will be collapsed) */
  maxItems?: number;
  /** Callback when item is clicked */
  onNavigate?: (item: BreadcrumbItem, index: number) => void;
}

/**
 * GlassBreadcrumb - Premium glassmorphic breadcrumb navigation
 */
const GlassBreadcrumb: React.FC<GlassBreadcrumbProps> = (
  {
    className,
    variant,
    items,
    separator = 'chevron',
    showHomeIcon = true,
    maxItems = 0,
    onNavigate,
    ...props
  }
) => {
  // Compute visible items with truncation
  const visibleItems = React.useMemo(() => {
    if (maxItems <= 0 || items.length <= maxItems) {
      return items.map((item, index) => ({ item, index, isEllipsis: false }));
    }

    const first = { item: items[0], index: 0, isEllipsis: false };
    const ellipsis = { item: { label: '...', href: undefined as string | undefined }, index: -1, isEllipsis: true };
    const visibleCount = Math.max(0, maxItems - 2);
    const lastItems = visibleCount > 0 ? items.slice(-visibleCount).map((item, i) => ({
      item,
      index: items.length - visibleCount + i,
      isEllipsis: false,
    })) : [];

    return [first, ellipsis, ...lastItems];
  }, [items, maxItems]);

  const handleClick = (item: BreadcrumbItem, index: number) => {
    if (index >= 0 && onNavigate) {
      onNavigate(item, index);
    }
  };

  const getSeparator = () => {
    switch (separator) {
      case 'slash':
        return <span className="text-slate-400 dark:text-white/30 mx-0.5">/</span>;
      case 'arrow':
        return <span className="text-slate-400 dark:text-white/30 mx-0.5">→</span>;
      case 'chevron':
      default:
        return <ChevronRight className="w-4 h-4 text-slate-400 dark:text-white/30 mx-0.5" />;
    }
  };

  const getItemClasses = (isLast: boolean) => {
    return cn(
      'px-2',
      'py-1',
      'rounded-lg',
      'text-sm',
      'font-medium',
      'transition-all',
      'duration-200',
      'flex',
      'items-center',
      'gap-1',
      isLast
        ? [
          // Current/last item with 3D effect
          'text-slate-900',
          'dark:text-white',
          'bg-white/50',
          'dark:bg-white/[0.08]',
          'shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),inset_0_-1px_1px_rgba(0,0,0,0.05)]',
          'dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_1px_rgba(0,0,0,0.2)]',
        ]
        : [
          // Clickable items
          'text-slate-600',
          'dark:text-white/70',
          'hover:text-slate-900',
          'dark:hover:text-white',
          'hover:bg-white/60',
          'dark:hover:bg-white/[0.1]',
          'cursor-pointer',
        ]
    );
  };

  return (
    <nav
      className={cn(glassBreadcrumbVariants({ variant }), className)}
      aria-label="Breadcrumb"
      {...props}
    >
      {visibleItems.map((entry, i) => (
        <React.Fragment key={i}>
          {/* Separator */}
          {i > 0 && getSeparator()}

          {/* Breadcrumb item */}
          {entry.isEllipsis ? (
            <span className="px-2 py-1 text-slate-400 dark:text-white/40">...</span>
          ) : entry.item.href && entry.index < items.length - 1 ? (
            <a
              href={entry.item.href}
              className={getItemClasses(entry.index === items.length - 1)}
              onClick={(e) => {
                e.preventDefault();
                handleClick(entry.item, entry.index);
              }}
            >
              {showHomeIcon && entry.index === 0 && (
                <Home className="w-4 h-4" />
              )}
              {entry.item.label}
            </a>
          ) : (
            <span className={getItemClasses(entry.index === items.length - 1)}>
              {showHomeIcon && entry.index === 0 && (
                <Home className="w-4 h-4" />
              )}
              {entry.item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export { GlassBreadcrumb, glassBreadcrumbVariants };
