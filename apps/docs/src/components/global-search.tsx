import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sidebarNav } from './docs-layout';

interface GlobalSearchProps {
    isOpen: boolean;
    onClose: () => void;
}

export function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Combine all items into a single flat array
    const allItems = sidebarNav.flatMap(section =>
        section.items.map(item => ({ ...item, section: section.title }))
    );

    // Filter based on query
    const filteredItems = query === ''
        ? allItems
        : allItems.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.section.toLowerCase().includes(query.toLowerCase())
        );

    useEffect(() => {
        setActiveIndex(0);
    }, [query]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery('');
            setActiveIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === 'Escape') {
                onClose();
                e.preventDefault();
            } else if (e.key === 'ArrowDown') {
                setActiveIndex(prev => (prev + 1) % filteredItems.length);
                e.preventDefault();
            } else if (e.key === 'ArrowUp') {
                setActiveIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
                e.preventDefault();
            } else if (e.key === 'Enter') {
                if (filteredItems[activeIndex]) {
                    navigate(filteredItems[activeIndex].href);
                    onClose();
                }
                e.preventDefault();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredItems, activeIndex, onClose, navigate]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm transition-opacity"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="fixed left-1/2 top-[15%] z-[101] w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-2xl backdrop-blur-3xl dark:border-white/10 dark:bg-slate-900/70"
                    >
                        <div className="flex items-center gap-3 border-b border-[hsl(var(--border))] px-4 py-4">
                            <Search className="h-5 w-5 text-slate-500 dark:text-slate-400 shrink-0" />
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search components, sections, and more..."
                                className="flex-1 bg-transparent text-base outline-none placeholder:text-slate-500 dark:text-slate-200 dark:placeholder:text-slate-400"
                            />
                            <button onClick={onClose} className="rounded-md p-1 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredItems.length === 0 ? (
                                <div className="py-10 text-center text-sm text-slate-500">
                                    No results found for "{query}"
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    {filteredItems.map((item, index) => {
                                        const isActive = index === activeIndex;
                                        return (
                                            <button
                                                key={item.href}
                                                onClick={() => {
                                                    navigate(item.href);
                                                    onClose();
                                                }}
                                                onMouseEnter={() => setActiveIndex(index)}
                                                className={`group relative flex items-center justify-between rounded-xl px-4 py-3 text-left transition-colors ${isActive
                                                    ? 'bg-blue-50/80 text-blue-900 dark:bg-blue-500/10 dark:text-blue-100'
                                                    : 'hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300'
                                                    }`}
                                            >
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-search-indicator"
                                                        className="absolute inset-0 z-0 rounded-xl bg-blue-50 dark:bg-blue-500/20 shadow-sm"
                                                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                                    />
                                                )}
                                                <span className="relative z-10 font-medium">
                                                    {item.title}
                                                </span>
                                                <div className="relative z-10 flex items-center gap-2 text-xs">
                                                    {item.badge && (
                                                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                    <span className={`px-2 py-1 rounded-md ${isActive
                                                        ? 'bg-blue-100/50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300'
                                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                                                        }`}>
                                                        {item.section}
                                                    </span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center justify-between border-t border-[hsl(var(--border))] bg-slate-50/50 px-4 py-3 text-xs text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                                <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-sans dark:border-slate-700 dark:bg-slate-800">↑↓</kbd> to navigate
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-sans dark:border-slate-700 dark:bg-slate-800">enter</kbd> to select
                            </span>
                            <span className="flex items-center gap-1">
                                <kbd className="rounded border border-slate-200 bg-white px-1.5 py-0.5 font-sans dark:border-slate-700 dark:bg-slate-800">esc</kbd> to close
                            </span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
