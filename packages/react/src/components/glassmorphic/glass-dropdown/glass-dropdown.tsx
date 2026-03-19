'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@archui/core';

/**
 * Glass Dropdown Menu Variants
 */
const glassDropdownVariants = cva(
  [
    'absolute',
    'z-50',
    'min-w-[180px]',
    'rounded-xl',
    'overflow-hidden',
    'backdrop-blur-xl',
    'border',
    // Premium Glass
    'bg-white/80',
    'border-white/40',
    'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)_inset]',
    // Dark mode
    'dark:bg-black/60',
    'dark:border-white/10',
    'dark:shadow-[0_10px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)_inset]',
    'py-1',
    'transition-all',
    'duration-200',
    'ease-out',
  ],
  {
    variants: {
      align: {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
      },
    },
    defaultVariants: {
      align: 'start',
    },
  }
);

/**
 * Glass Dropdown Item Variants
 */
const glassDropdownItemVariants = cva(
  [
    'flex',
    'items-center',
    'gap-3',
    'w-full',
    'px-4',
    'py-2.5',
    'text-sm',
    // Semantic tokens
    'text-text-secondary',
    'transition-all',
    'duration-150',
    'cursor-pointer',
    'outline-none',
  ],
  {
    variants: {
      variant: {
        default: [
          'hover:bg-black/[0.04]',
          'dark:hover:bg-white/10',
          'hover:text-slate-900',
          'dark:hover:text-white',
          'focus:bg-black/[0.04]',
          'dark:focus:bg-white/10',
          'focus:text-slate-900',
          'dark:focus:text-white',
        ],
        danger: [
          'text-red-600 dark:text-red-400/80',
          'hover:bg-red-50 dark:hover:bg-red-500/10',
          'hover:text-red-700 dark:hover:text-red-400',
          'focus:bg-red-50 dark:focus:bg-red-500/10',
        ],
      },
      disabled: {
        true: [
          'opacity-50',
          'cursor-not-allowed',
          'pointer-events-none',
        ],
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      disabled: false,
    },
  }
);

// Context for dropdown state
interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null);

const useDropdown = () => {
  const context = React.useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be used within a GlassDropdown');
  }
  return context;
};

export interface GlassDropdownProps {
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
}

/**
 * GlassDropdown - Root component for dropdown menu
 */
function GlassDropdown({
  children,
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
}: GlassDropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = React.useCallback(
    (value: boolean) => {
      setUncontrolledOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange]
  );

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;

    const handleClick = (e: MouseEvent) => {
      if (triggerRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open, setOpen]);

  // Close on escape
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}

export interface GlassDropdownTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

/**
 * GlassDropdownTrigger - Button that toggles the dropdown
 */
const GlassDropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  GlassDropdownTriggerProps
>(({ className, children, onClick, ...props }, ref) => {
  const { open, setOpen, triggerRef } = useDropdown();

  // Merge refs
  React.useImperativeHandle(ref, () => triggerRef.current!);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(!open);
    onClick?.(e);
  };

  return (
    <button
      ref={triggerRef}
      className={className}
      onClick={handleClick}
      aria-expanded={open}
      aria-haspopup="menu"
      {...props}
    >
      {children}
    </button>
  );
});

GlassDropdownTrigger.displayName = 'GlassDropdownTrigger';

export interface GlassDropdownContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof glassDropdownVariants> {
  /** Portal to body */
  portal?: boolean;
  /** Offset from trigger */
  sideOffset?: number;
}

/**
 * GlassDropdownContent - The dropdown menu container
 */
const GlassDropdownContent = React.forwardRef<
  HTMLDivElement,
  GlassDropdownContentProps
>(
  (
    {
      className,
      align,
      portal = false,
      sideOffset = 8,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const { open, triggerRef } = useDropdown();
    const [position, setPosition] = React.useState({ top: 0, left: 0 });
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    // Calculate position for portal
    React.useEffect(() => {
      if (!open || !portal || !triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + sideOffset + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }, [open, portal, sideOffset, triggerRef]);

    if (!open) return null;

    const content = (
      <div
        ref={ref}
        className={cn(
          glassDropdownVariants({ align }),
          !portal && 'top-full mt-2',
          open
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none',
          className
        )}
        style={
          portal
            ? { position: 'absolute', top: position.top, left: position.left, ...style }
            : style
        }
        role="menu"
        {...props}
      >
        {children}
      </div>
    );

    if (portal && mounted) {
      return createPortal(content, document.body);
    }

    return content;
  }
);

GlassDropdownContent.displayName = 'GlassDropdownContent';

export interface GlassDropdownItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
  VariantProps<typeof glassDropdownItemVariants> {
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Shortcut key hint */
  shortcut?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * GlassDropdownItem - Individual menu item
 */
const GlassDropdownItem = React.forwardRef<
  HTMLButtonElement,
  GlassDropdownItemProps
>(
  (
    { className, variant, disabled, icon, shortcut, children, onClick, ...props },
    ref
  ) => {
    const { setOpen } = useDropdown();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;
      onClick?.(e);
      setOpen(false);
    };

    return (
      <button
        ref={ref}
        className={cn(glassDropdownItemVariants({ variant, disabled }), className)}
        role="menuitem"
        disabled={disabled || false}
        onClick={handleClick}
        {...props}
      >
        {icon && <span className="w-4 h-4 flex-shrink-0">{icon}</span>}
        <span className="flex-1 text-left">{children}</span>
        {shortcut && (
          <span className="text-xs text-[var(--glass-text-muted)] ml-auto font-mono">{shortcut}</span>
        )}
      </button>
    );
  }
);

GlassDropdownItem.displayName = 'GlassDropdownItem';

/**
 * GlassDropdownSeparator - Visual separator between items
 */
const GlassDropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('h-px my-1 bg-[var(--glass-divider)]', className)}
    role="separator"
    {...props}
  />
));

GlassDropdownSeparator.displayName = 'GlassDropdownSeparator';

/**
 * GlassDropdownLabel - Group label for menu items
 */
const GlassDropdownLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'px-4 py-2 text-xs font-semibold text-[var(--glass-text-muted)] uppercase tracking-wider',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

GlassDropdownLabel.displayName = 'GlassDropdownLabel';

export {
  GlassDropdown,
  GlassDropdownTrigger,
  GlassDropdownContent,
  GlassDropdownItem,
  GlassDropdownSeparator,
  GlassDropdownLabel,
  glassDropdownVariants,
  glassDropdownItemVariants,
};
