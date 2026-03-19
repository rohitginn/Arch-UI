'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@archui/core';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const glassPaginationVariants = cva(
  [
    'flex items-center',
  ],
  {
    variants: {
      size: {
        sm: 'gap-1',
        md: 'gap-1.5',
        lg: 'gap-2',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const glassPaginationItemVariants = cva(
  [
    'inline-flex items-center justify-center',
    'font-medium transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'rounded-lg',
          'text-slate-600 dark:text-slate-400',
          'hover:bg-slate-100 dark:hover:bg-slate-800',
          'hover:text-slate-900 dark:hover:text-white',
          'data-[active=true]:bg-slate-900 dark:data-[active=true]:bg-white',
          'data-[active=true]:text-white dark:data-[active=true]:text-slate-900',
        ],
        outline: [
          'rounded-lg border',
          'border-slate-200 dark:border-slate-700',
          'text-slate-600 dark:text-slate-400',
          'hover:bg-slate-50 dark:hover:bg-slate-800',
          'hover:text-slate-900 dark:hover:text-white',
          'hover:border-slate-300 dark:hover:border-slate-600',
          'data-[active=true]:bg-slate-900 dark:data-[active=true]:bg-white',
          'data-[active=true]:text-white dark:data-[active=true]:text-slate-900',
          'data-[active=true]:border-slate-900 dark:data-[active=true]:border-white',
        ],
        ghost: [
          'rounded-lg',
          'text-slate-600 dark:text-slate-400',
          'hover:bg-slate-100 dark:hover:bg-slate-800',
          'hover:text-slate-900 dark:hover:text-white',
          'data-[active=true]:text-blue-600 dark:data-[active=true]:text-blue-400',
          'data-[active=true]:font-semibold',
        ],
        glass: [
          'rounded-lg',
          'bg-white/50 dark:bg-white/5',
          'text-slate-700 dark:text-slate-300',
          'hover:bg-white/80 dark:hover:bg-white/10',
          'hover:text-slate-900 dark:hover:text-white',
          'data-[active=true]:bg-white dark:data-[active=true]:bg-white/20',
          'data-[active=true]:text-slate-900 dark:data-[active=true]:text-white',
          'data-[active=true]:shadow-sm',
          'backdrop-blur-sm',
        ],
      },
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Context
type PaginationVariant = 'default' | 'outline' | 'ghost' | 'glass';
type PaginationSize = 'sm' | 'md' | 'lg';

interface PaginationContextValue {
  variant: PaginationVariant;
  size: PaginationSize;
}

const PaginationContext = React.createContext<PaginationContextValue>({
  variant: 'default',
  size: 'md',
});

// Pagination Root
export interface GlassPaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'size'> {
  variant?: PaginationVariant;
  size?: PaginationSize;
}

const GlassPagination = React.forwardRef<HTMLElement, GlassPaginationProps>(
  ({ className, size = 'md', variant = 'default', children, ...props }, ref) => {
    const contextSize: PaginationSize = size ?? 'md';
    const contextVariant: PaginationVariant = variant ?? 'default';
    return (
      <PaginationContext.Provider value={{ variant: contextVariant, size: contextSize }}>
        <nav
          ref={ref}
          role="navigation"
          aria-label="Pagination"
          className={cn(glassPaginationVariants({ size: contextSize }), className)}
          {...props}
        >
          {children}
        </nav>
      </PaginationContext.Provider>
    );
  }
);

GlassPagination.displayName = 'GlassPagination';

// Pagination Content (list wrapper)
const GlassPaginationContent = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => {
    const { size } = React.useContext(PaginationContext);
    return (
      <ul
        ref={ref}
        className={cn(
          'flex items-center',
          size === 'sm' ? 'gap-1' : size === 'lg' ? 'gap-2' : 'gap-1.5',
          className
        )}
        {...props}
      />
    );
  }
);

GlassPaginationContent.displayName = 'GlassPaginationContent';

// Pagination Item (li wrapper)
const GlassPaginationItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => {
    return <li ref={ref} className={cn('', className)} {...props} />;
  }
);

GlassPaginationItem.displayName = 'GlassPaginationItem';

// Pagination Link/Button
export interface GlassPaginationLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  href?: string;
}

const GlassPaginationLink = React.forwardRef<HTMLButtonElement, GlassPaginationLinkProps>(
  ({ className, isActive, children, href, ...props }, ref) => {
    const { variant, size } = React.useContext(PaginationContext);

    if (href) {
      return (
        <a
          href={href}
          aria-current={isActive ? 'page' : undefined}
          data-active={isActive}
          className={cn(
            glassPaginationItemVariants({ variant, size }),
            className
          )}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        aria-current={isActive ? 'page' : undefined}
        data-active={isActive}
        className={cn(
          glassPaginationItemVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlassPaginationLink.displayName = 'GlassPaginationLink';

// Pagination Previous Button
export interface GlassPaginationPreviousProps extends GlassPaginationLinkProps {
  iconOnly?: boolean;
}

const GlassPaginationPrevious = React.forwardRef<HTMLButtonElement, GlassPaginationPreviousProps>(
  ({ className, iconOnly = false, children, ...props }, ref) => {
    const { size } = React.useContext(PaginationContext);
    const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

    return (
      <GlassPaginationLink
        ref={ref}
        aria-label="Go to previous page"
        className={cn(!iconOnly && 'w-auto px-3', className)}
        {...props}
      >
        <ChevronLeft className={iconSize} />
        {!iconOnly && <span className="ml-1">{children || 'Previous'}</span>}
      </GlassPaginationLink>
    );
  }
);

GlassPaginationPrevious.displayName = 'GlassPaginationPrevious';

// Pagination Next Button
export interface GlassPaginationNextProps extends GlassPaginationLinkProps {
  iconOnly?: boolean;
}

const GlassPaginationNext = React.forwardRef<HTMLButtonElement, GlassPaginationNextProps>(
  ({ className, iconOnly = false, children, ...props }, ref) => {
    const { size } = React.useContext(PaginationContext);
    const iconSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';

    return (
      <GlassPaginationLink
        ref={ref}
        aria-label="Go to next page"
        className={cn(!iconOnly && 'w-auto px-3', className)}
        {...props}
      >
        {!iconOnly && <span className="mr-1">{children || 'Next'}</span>}
        <ChevronRight className={iconSize} />
      </GlassPaginationLink>
    );
  }
);

GlassPaginationNext.displayName = 'GlassPaginationNext';

// Pagination Ellipsis
const GlassPaginationEllipsis = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    const { size } = React.useContext(PaginationContext);
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          'flex items-center justify-center',
          sizeClasses[size],
          'text-slate-400 dark:text-slate-500',
          className
        )}
        {...props}
      >
        <MoreHorizontal className="w-4 h-4" />
        <span className="sr-only">More pages</span>
      </span>
    );
  }
);

GlassPaginationEllipsis.displayName = 'GlassPaginationEllipsis';

// Helper hook for pagination logic
export interface UsePaginationOptions {
  totalPages: number;
  currentPage: number;
  siblingCount?: number;
  boundaryCount?: number;
}

export function usePagination({
  totalPages,
  currentPage,
  siblingCount = 1,
  boundaryCount = 1,
}: UsePaginationOptions) {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  return React.useMemo(() => {
    const totalNumbers = siblingCount * 2 + 3 + boundaryCount * 2;

    if (totalNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, boundaryCount + 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - boundaryCount);

    const showLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - boundaryCount - 1;

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, 'ellipsis', ...range(totalPages - boundaryCount + 1, totalPages)];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [...range(1, boundaryCount), 'ellipsis', ...rightRange];
    }

    return [
      ...range(1, boundaryCount),
      'ellipsis',
      ...range(leftSiblingIndex, rightSiblingIndex),
      'ellipsis',
      ...range(totalPages - boundaryCount + 1, totalPages),
    ];
  }, [totalPages, currentPage, siblingCount, boundaryCount]);
}

export {
  GlassPagination,
  GlassPaginationContent,
  GlassPaginationItem,
  GlassPaginationLink,
  GlassPaginationPrevious,
  GlassPaginationNext,
  GlassPaginationEllipsis,
  glassPaginationVariants,
  glassPaginationItemVariants,
};
