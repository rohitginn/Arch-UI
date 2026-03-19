'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@archui/core';
import { EffectContainer } from '../../../base/effect-container';

interface GlassDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const GlassDrawer = ({ isOpen, onClose, children, className }: GlassDrawerProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                    />

                    {/* Liquid Side Panel */}
                    <motion.div
                        initial={{ x: '100%', scaleX: 0.8, opacity: 0.5 }}
                        animate={{
                            x: 0,
                            scaleX: 1,
                            opacity: 1,
                            transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 32,
                                mass: 1.2
                            }
                        }}
                        exit={{
                            x: '100%',
                            scaleX: 0.9,
                            opacity: 0,
                            transition: { duration: 0.3, ease: 'circIn' }
                        }}
                        className={cn(
                            'fixed right-0 top-0 z-50 h-full w-full max-w-md shadow-2xl origin-right',
                            className
                        )}
                    >
                        <EffectContainer
                            className="h-full border-l border-surface-border bg-surface-primary/60 backdrop-blur-3xl"
                            effects={
                                <div className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
                            }
                        >
                            <div className="flex flex-col h-full p-6 overflow-y-auto">
                                {children}
                            </div>
                        </EffectContainer>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export { GlassDrawer };
