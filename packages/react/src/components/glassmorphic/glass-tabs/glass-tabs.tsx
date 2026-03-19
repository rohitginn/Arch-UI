'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@archui/core';
import { motion, AnimatePresence } from 'motion/react';

// Tabs Root Context
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: 'default' | 'pills' | 'underline' | 'glass' | 'bordered';
  size: 'sm' | 'md' | 'lg';
  orientation: 'horizontal' | 'vertical';
  id: string; // Accessibility: Shared ID for linking
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a GlassTabs component');
  }
  return context;
}

// Tabs List Variants
const glassTabsListVariants = cva(
  [
    'flex',
    'transition-all duration-200',
  ],
  {
    variants: {
      variant: {
        default: [
          'bg-interactive-bg',
          'p-1 rounded-xl gap-1 backdrop-blur-sm',
        ],
        pills: [
          'gap-2',
        ],
        underline: [
          'gap-1',
          'border-b border-surface-border',
        ],
        glass: [
          'bg-white/40 backdrop-blur-xl',
          'border border-white/40',
          'dark:bg-white/[0.05] dark:border-white/10',
          'p-1 rounded-xl gap-1',
          'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]',
        ],
        bordered: [
          'border border-surface-border-strong',
          'p-1 rounded-lg gap-1',
        ],
      },
      orientation: {
        horizontal: 'flex-row items-center',
        vertical: 'flex-col items-stretch',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      orientation: 'horizontal',
      size: 'md',
    },
  }
);

// Tab Trigger Variants
const glassTabsTriggerVariants = cva(
  [
    'relative inline-flex items-center justify-center gap-2',
    'font-medium whitespace-nowrap',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: [
          'rounded-lg',
          'text-text-secondary',
          'hover:text-text-primary',
          'data-[state=active]:text-text-primary',
        ],
        pills: [
          'rounded-full',
          'text-text-secondary',
          'hover:bg-interactive-bg-hover',
          'hover:text-text-primary',
          'data-[state=active]:text-white dark:data-[state=active]:text-slate-900',
        ],
        underline: [
          'rounded-sm pb-3 -mb-px',
          'text-text-secondary',
          'hover:text-text-primary',
          'data-[state=active]:text-text-primary',
        ],
        glass: [
          'rounded-lg',
          'text-text-secondary',
          'hover:bg-interactive-bg-hover',
          'data-[state=active]:text-text-primary',
        ],
        bordered: [
          'rounded-md',
          'text-text-secondary',
          'hover:text-text-primary',
          'hover:bg-interactive-bg',
          'data-[state=active]:text-text-primary',
        ],
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-6 py-2.5 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Tabs Root Component
export interface GlassTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'glass' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

const GlassTabs = React.forwardRef<HTMLDivElement, GlassTabsProps>(
  ({
    children,
    className,
    value: controlledValue,
    defaultValue,
    onValueChange,
    variant = 'default',
    size = 'md',
    orientation = 'horizontal',
    ...props
  }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || '');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : uncontrolledValue;

    const handleValueChange = React.useCallback((newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    }, [isControlled, onValueChange]);

    const id = React.useId();

    return (
      <TabsContext.Provider value={{ value, onValueChange: handleValueChange, variant, size, orientation, id }}>
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal' ? 'flex-col' : 'flex-row gap-4',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

GlassTabs.displayName = 'GlassTabs';

// Tabs List Component
export interface GlassTabsListProps extends React.HTMLAttributes<HTMLDivElement> { }

const GlassTabsList = React.forwardRef<HTMLDivElement, GlassTabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { variant, size, orientation, value, onValueChange } = useTabsContext();
    const listRef = React.useRef<HTMLDivElement>(null);

    // Handle Keyboard Navigation (Roving TabIndex)
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const list = listRef.current;
      if (!list) return;

      const triggers = Array.from(list.querySelectorAll('[role="tab"]:not([disabled])')) as HTMLElement[];
      const index = triggers.findIndex((trigger) => trigger.getAttribute('data-value') === value);

      let nextIndex = index;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIndex = index + 1;
          if (nextIndex >= triggers.length) nextIndex = 0;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIndex = index - 1;
          if (nextIndex < 0) nextIndex = triggers.length - 1;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = triggers.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      const nextTrigger = triggers[nextIndex];
      if (nextTrigger) {
        nextTrigger.focus();
        // Setup automatic activation or manual? Standard is manual for tabs, but accessible pattern often activates on focus for simple tabs.
        // Let's stick to manual activation (enter/space) OR click, but focus moves. 
        // Actually WAI-ARIA best practice:
        // - "Selection follows focus" is optional.
        // Let's implement "Selection follows focus" for smoother UX as most modern tabs do.
        const nextValue = nextTrigger.getAttribute('data-value');
        if (nextValue) onValueChange(nextValue);
      }
    };

    return (
      <div
        ref={(node) => {
          // Maintain both refs
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        role="tablist"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        className={cn(
          glassTabsListVariants({ variant, size, orientation }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassTabsList.displayName = 'GlassTabsList';

// Tab Trigger Component
export interface GlassTabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

const GlassTabsTrigger = React.forwardRef<HTMLButtonElement, GlassTabsTriggerProps>(
  ({ className, value, children, icon, badge, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange, variant, size, id } = useTabsContext();
    const isActive = selectedValue === value;
    const triggerId = `${id}-trigger-${value}`;
    const contentId = `${id}-content-${value}`;
    const getActiveIndicatorClasses = () => {
      switch (variant) {
        case 'default': return 'bg-surface-bg shadow-sm rounded-lg inset-0';
        case 'pills': return 'bg-slate-900 dark:bg-white shadow-sm rounded-full inset-0';
        case 'underline': return 'h-0.5 bg-slate-900 dark:bg-white bottom-0 left-0 right-0';
        case 'glass': return 'bg-surface-bg shadow-md rounded-lg inset-0';
        case 'bordered': return 'bg-surface-bg border border-surface-border-strong rounded-md inset-0';
        default: return 'inset-0';
      }
    };

    return (
      <button
        ref={ref}
        id={triggerId}
        role="tab"
        type="button"
        aria-selected={isActive}
        aria-controls={contentId}
        data-state={isActive ? 'active' : 'inactive'}
        data-value={value}
        tabIndex={isActive ? 0 : -1} // Roving TabIndex
        disabled={disabled}
        onClick={() => onValueChange(value)}
        className={cn(
          glassTabsTriggerVariants({ variant, size }),
          // Fix layout shift on bold hover/active
          "before:block before:content-[attr(data-text)] before:font-bold before:h-0 before:invisible before:overflow-hidden",
          className
        )}
        data-text={typeof children === 'string' ? children : undefined}
        {...props}
      >
        {isActive && (
          <motion.div
            layoutId={`${id}-active-tab-indicator`}
            className={cn("absolute pointer-events-none z-0", getActiveIndicatorClasses())}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            initial={false}
          />
        )}
        {icon && <span className="flex-shrink-0 relative z-10">{icon}</span>}
        <span className="relative z-10 truncate">{children}</span>
        {badge && <span className="flex-shrink-0 relative z-10">{badge}</span>}
      </button>
    );
  }
);

GlassTabsTrigger.displayName = 'GlassTabsTrigger';

// Tab Content Component
export interface GlassTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  forceMount?: boolean;
}

const GlassTabsContent = React.forwardRef<HTMLDivElement, GlassTabsContentProps>(
  ({ className, value, children, forceMount, ...props }, ref) => {
    const { value: selectedValue, orientation, id } = useTabsContext();
    const isActive = selectedValue === value;
    const triggerId = `${id}-trigger-${value}`;
    const contentId = `${id}-content-${value}`;

    if (!forceMount && !isActive) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={contentId}
        role="tabpanel"
        aria-labelledby={triggerId}
        data-state={isActive ? 'active' : 'inactive'}
        hidden={!isActive}
        tabIndex={0}
        className={cn(
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          orientation === 'horizontal' ? 'mt-3' : '',
          className
        )}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isActive && (
            <motion.div
              key={value}
              initial={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 4, filter: 'blur(4px)' }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassTabsContent.displayName = 'GlassTabsContent';

export {
  GlassTabs,
  GlassTabsList,
  GlassTabsTrigger,
  GlassTabsContent,
  glassTabsListVariants,
  glassTabsTriggerVariants,
};
