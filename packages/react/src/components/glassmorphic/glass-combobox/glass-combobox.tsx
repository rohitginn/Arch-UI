'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@archui/core';
import { Search, ChevronDown, Check } from 'lucide-react';
import { EffectContainer } from '../../../base/effect-container';

interface ComboboxOption {
    label: string;
    value: string;
}

interface GlassComboboxProps {
    options: ComboboxOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const GlassCombobox = ({ options, value, onChange, placeholder = 'Select...', className }: GlassComboboxProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listboxId = React.useId();
    const comboboxId = React.useId();

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = options.find(opt => opt.value === value);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
                setHighlightedIndex(-1);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset highlighted index when filtered options change
    React.useEffect(() => {
        if (isOpen && filteredOptions.length > 0) {
            setHighlightedIndex(0);
        }
    }, [searchTerm, isOpen]);

    // Keyboard navigation handler
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex(prev => 
                    prev < filteredOptions.length - 1 ? prev + 1 : 0
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex(prev => 
                    prev > 0 ? prev - 1 : filteredOptions.length - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
                    onChange(filteredOptions[highlightedIndex].value);
                    setIsOpen(false);
                    setSearchTerm('');
                    setHighlightedIndex(-1);
                }
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                setSearchTerm('');
                setHighlightedIndex(-1);
                break;
            case 'Home':
                e.preventDefault();
                setHighlightedIndex(0);
                break;
            case 'End':
                e.preventDefault();
                setHighlightedIndex(filteredOptions.length - 1);
                break;
        }
    };

    return (
        <div ref={containerRef} className={cn('relative w-full', className)}>
            <button
                type="button"
                onClick={() => {
                    setIsOpen(!isOpen);
                    if (!isOpen) {
                        setTimeout(() => inputRef.current?.focus(), 0);
                    }
                }}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={listboxId}
                aria-labelledby={comboboxId}
                className={cn(
                    'flex items-center justify-between px-4 py-2.5 rounded-xl transition-all cursor-pointer w-full',
                    'bg-surface-primary/10 border border-surface-border/50 hover:bg-surface-primary/20',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                    isOpen && 'ring-2 ring-blue-500/20 border-blue-500/50'
                )}
            >
                <span id={comboboxId} className={cn('text-sm', !selectedOption && 'text-text-primary/40')}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            y: 8,
                            scale: 1,
                            transition: { type: 'spring', stiffness: 400, damping: 30 }
                        }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        className="absolute z-50 w-full overflow-hidden"
                    >
                        <EffectContainer
                            className="border border-surface-border bg-surface-primary/80 backdrop-blur-2xl rounded-2xl shadow-2xl p-2"
                            effects={<div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />}
                        >
                            <div className="flex items-center px-3 py-2 mb-2 rounded-lg bg-text-primary/5">
                                <Search className="w-4 h-4 mr-2 text-text-primary/40" />
                                <input
                                    ref={inputRef}
                                    autoFocus
                                    role="combobox"
                                    aria-autocomplete="list"
                                    aria-controls={listboxId}
                                    aria-expanded={isOpen}
                                    aria-activedescendant={
                                        highlightedIndex >= 0 && filteredOptions[highlightedIndex]
                                            ? `${listboxId}-option-${highlightedIndex}`
                                            : undefined
                                    }
                                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-text-primary/30"
                                    placeholder="Filter..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            <div 
                                id={listboxId}
                                role="listbox"
                                aria-label="Options list"
                                className="max-h-60 overflow-y-auto space-y-1"
                            >
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((opt, index) => (
                                        <div
                                            key={opt.value}
                                            id={`${listboxId}-option-${index}`}
                                            role="option"
                                            aria-selected={value === opt.value}
                                            onClick={() => {
                                                onChange(opt.value);
                                                setIsOpen(false);
                                                setSearchTerm('');
                                                setHighlightedIndex(-1);
                                            }}
                                            onMouseEnter={() => setHighlightedIndex(index)}
                                            className={cn(
                                                'flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer',
                                                'hover:bg-blue-500/10 hover:text-blue-500',
                                                highlightedIndex === index && 'bg-blue-500/10',
                                                value === opt.value ? 'bg-blue-500/20 text-blue-500' : 'text-text-primary/80'
                                            )}
                                        >
                                            {opt.label}
                                            {value === opt.value && <Check className="w-4 h-4" />}
                                        </div>
                                    ))
                                ) : (
                                    <div 
                                        role="status"
                                        aria-live="polite"
                                        className="px-3 py-8 text-center text-xs text-text-primary/40 italic"
                                    >
                                        No results found
                                    </div>
                                )}
                            </div>
                        </EffectContainer>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export { GlassCombobox };
