'use client';

import * as React from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';

/**
 * AnimatedSection — Scroll-triggered section reveal
 * Uses whileInView for performant scroll-based entrance animations.
 * Automatically disables motion when prefers-reduced-motion is set.
 */

interface AnimatedSectionProps {
    children: React.ReactNode;
    className?: string;
    /** Direction to animate from */
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    /** Delay in seconds before animation starts */
    delay?: number;
    /** Distance in pixels to travel */
    distance?: number;
    /** viewport threshold before triggering */
    threshold?: number;
    /** Only animate once */
    once?: boolean;
    /** HTML tag to render */
    as?: 'div' | 'section' | 'article' | 'header' | 'footer';
}

const directionMap = {
    up: { y: 1, x: 0 },
    down: { y: -1, x: 0 },
    left: { x: 1, y: 0 },
    right: { x: -1, y: 0 },
    none: { x: 0, y: 0 },
};

export function AnimatedSection({
    children,
    className,
    direction = 'up',
    delay = 0,
    distance = 40,
    threshold = 0.2,
    once = true,
    as = 'div',
}: AnimatedSectionProps) {
    const shouldReduceMotion = useReducedMotion();

    const dir = directionMap[direction];

    const variants: Variants = {
        hidden: shouldReduceMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: dir.y * distance,
                x: dir.x * distance,
            },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const Component = motion[as] as typeof motion.div;

    return (
        <Component
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: threshold }}
            variants={variants}
        >
            {children}
        </Component>
    );
}

/**
 * Stagger container — wraps children with staggered entrance delays
 */
interface StaggerContainerProps {
    children: React.ReactNode;
    className?: string;
    /** Delay between each child */
    staggerDelay?: number;
    /** Initial delay before stagger starts */
    delay?: number;
    /** HTML tag to render */
    as?: 'div' | 'ul' | 'section';
}

export function StaggerContainer({
    children,
    className,
    staggerDelay = 0.1,
    delay = 0,
    as = 'div',
}: StaggerContainerProps) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay,
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const Component = motion[as] as typeof motion.div;

    return (
        <Component
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={containerVariants}
        >
            {children}
        </Component>
    );
}

/**
 * StaggerItem — Individual child within a StaggerContainer
 */
interface StaggerItemProps {
    children: React.ReactNode;
    className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
    const shouldReduceMotion = useReducedMotion();

    const itemVariants: Variants = {
        hidden: shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 24, scale: 0.97 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.div className={className} variants={itemVariants}>
            {children}
        </motion.div>
    );
}
