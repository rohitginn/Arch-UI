'use client';

import * as React from 'react';
import { cn } from '@archui/core';

const AccordionContext = React.createContext<{
    value: string | string[];
    onValueChange: (value: string) => void;
    type: 'single' | 'multiple';
    collapsible: boolean;
    variant: 'default' | 'separated';
} | null>(null);

function useAccordionContext() {
    const context = React.useContext(AccordionContext);
    if (!context) {
        throw new Error('Accordion components must be used within a GlassAccordion');
    }
    return context;
}

export interface GlassAccordionProps {
    type?: 'single' | 'multiple';
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    collapsible?: boolean;
    className?: string;
    variant?: 'default' | 'separated';
    children: React.ReactNode;
}

const GlassAccordion = React.forwardRef<HTMLDivElement, GlassAccordionProps>(
    (
        {
            type = 'single',
            value: controlledValue,
            defaultValue,
            onValueChange,
            collapsible = true,
            className,
            variant = 'default',
            children,
            ...props
        },
        ref
    ) => {
        const isControlled = controlledValue !== undefined;
        const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[]>(
            defaultValue !== undefined ? defaultValue : type === 'multiple' ? [] : ''
        );

        const value = isControlled ? controlledValue : uncontrolledValue;

        const handleValueChange = React.useCallback(
            (itemValue: string) => {
                let newValue: string | string[];

                if (type === 'multiple') {
                    const arrValue = Array.isArray(value) ? value : [];
                    if (arrValue.includes(itemValue)) {
                        newValue = arrValue.filter((v) => v !== itemValue);
                    } else {
                        newValue = [...arrValue, itemValue];
                    }
                } else {
                    const strValue = typeof value === 'string' ? value : '';
                    if (strValue === itemValue) {
                        newValue = collapsible ? '' : strValue;
                    } else {
                        newValue = itemValue;
                    }
                }

                if (!isControlled) {
                    setUncontrolledValue(newValue);
                }
                onValueChange?.(newValue);
            },
            [type, value, isControlled, collapsible, onValueChange]
        );

        return (
            <AccordionContext.Provider
                value={{ value, onValueChange: handleValueChange, type, collapsible, variant }}
            >
                <div
                    ref={ref}
                    className={cn(
                        'flex flex-col',
                        variant === 'separated' ? 'gap-4' : 'rounded-2xl border border-surface-border bg-surface-bg-subtle/50 backdrop-blur-md dark:bg-surface-bg-subtle/10 overflow-hidden',
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </AccordionContext.Provider>
        );
    }
);
GlassAccordion.displayName = 'GlassAccordion';

export interface GlassAccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
}

const AccordionItemContext = React.createContext<{
    value: string;
    disabled: boolean;
} | null>(null);

function useAccordionItemContext() {
    const context = React.useContext(AccordionItemContext);
    if (!context) {
        throw new Error('Accordion components must be used within a GlassAccordionItem');
    }
    return context;
}

const GlassAccordionItem = React.forwardRef<HTMLDivElement, GlassAccordionItemProps>(
    ({ className, value, disabled = false, children, ...props }, ref) => {
        const { variant } = useAccordionContext();

        return (
            <AccordionItemContext.Provider value={{ value, disabled }}>
                <div
                    ref={ref}
                    className={cn(
                        'group relative',
                        variant === 'default' && 'border-b border-surface-border last:border-b-0',
                        variant === 'separated' && 'rounded-2xl border border-surface-border bg-surface-bg-subtle/50 backdrop-blur-md dark:bg-surface-bg-subtle/10',
                        disabled && 'opacity-50 pointer-events-none',
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </AccordionItemContext.Provider>
        );
    }
);
GlassAccordionItem.displayName = 'GlassAccordionItem';

export interface GlassAccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
}

const ChevronDownIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const GlassAccordionTrigger = React.forwardRef<HTMLButtonElement, GlassAccordionTriggerProps>(
    ({ className, children, icon, ...props }, ref) => {
        const { value: ctxValue, onValueChange } = useAccordionContext();
        const { value: itemValue, disabled } = useAccordionItemContext();

        const isOpen = Array.isArray(ctxValue)
            ? ctxValue.includes(itemValue)
            : ctxValue === itemValue;

        return (
            <button
                ref={ref}
                type="button"
                disabled={disabled}
                aria-expanded={isOpen}
                onClick={() => onValueChange(itemValue)}
                className={cn(
                    'flex w-full items-center justify-between py-4 px-5 text-left transition-all',
                    'text-text-primary font-medium hover:text-text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-bg',
                    className
                )}
                {...props}
            >
                <div className="flex items-center gap-3 w-full">
                    {children}
                </div>

                {icon || (
                    <ChevronDownIcon
                        className={cn(
                            'h-4 w-4 shrink-0 transition-transform duration-300 text-text-muted',
                            isOpen && 'rotate-180 text-text-primary'
                        )}
                    />
                )}
            </button>
        );
    }
);
GlassAccordionTrigger.displayName = 'GlassAccordionTrigger';

export interface GlassAccordionContentProps extends React.HTMLAttributes<HTMLDivElement> { }

const GlassAccordionContent = React.forwardRef<HTMLDivElement, GlassAccordionContentProps>(
    ({ className, children, ...props }, ref) => {
        const { value: ctxValue } = useAccordionContext();
        const { value: itemValue } = useAccordionItemContext();

        const isOpen = Array.isArray(ctxValue)
            ? ctxValue.includes(itemValue)
            : ctxValue === itemValue;

        return (
            <div
                ref={ref}
                className={cn(
                    'overflow-hidden text-sm transition-all duration-300 ease-[cubic-bezier(0.87,0,0.13,1)]',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
                style={{ display: 'grid' }}
            >
                <div
                    className={cn(
                        'overflow-hidden pb-4 px-5 text-text-secondary leading-relaxed',
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </div>
        );
    }
);
GlassAccordionContent.displayName = 'GlassAccordionContent';

export {
    GlassAccordion,
    GlassAccordionItem,
    GlassAccordionTrigger,
    GlassAccordionContent,
};
