import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Copy,
    Check,
    Layers,
    Shield,
    Zap,
    Palette,
    Code2,
    Box,
    Sparkles,
    Github,
} from 'lucide-react';
import { useState, useRef } from 'react';
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
    useMotionValue,
    useSpring,
} from 'motion/react';
import { GlassButton, Logo } from '@archui/react';
import { GlassInput } from '@archui/react';
import { GlassCard } from '@archui/react';
import {
    AnimatedSection,
    StaggerContainer,
    StaggerItem,
} from '../components/animated-section';

/* ──────────────────────────────────────────────
   Animation helpers — returns inline initial/animate props
   ────────────────────────────────────────────── */
const fadeUpInitial = { opacity: 0, y: 32 };
function fadeUpAnimate(delay: number = 0) {
    return {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
    };
}

const scaleInInitial = { opacity: 0, scale: 0.92 };
function scaleInAnimate(delay: number = 0) {
    return {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, delay, ease: [0.34, 1.56, 0.64, 1] as const },
    };
}

/* ──────────────────────────────────────────────
   Feature card hover spring config
   ────────────────────────────────────────────── */
const cardSpring = { type: 'spring' as const, stiffness: 400, damping: 25 };

/* ──────────────────────────────────────────────
   Feature data
   ────────────────────────────────────────────── */
const differentiators = [
    {
        icon: Layers,
        title: 'System-Level Layering',
        desc: 'EffectContainer primitive prevents decoration/content conflicts.',
    },
    {
        icon: Palette,
        title: 'Token-Driven Design',
        desc: 'Every color, spacing, and shadow from semantic tokens.',
    },
    {
        icon: Shield,
        title: 'Accessibility-First',
        desc: 'WCAG AA contrast, focus management, reduced-motion support.',
    },
    {
        icon: Code2,
        title: 'React + Vue Parity',
        desc: 'Same API, same behavior, both frameworks.',
    },
];

const features = [
    {
        icon: Box,
        title: 'Glass Without Bugs',
        desc: 'Overlays that never hide your content. EffectContainer enforces correct stacking order.',
    },
    {
        icon: Palette,
        title: 'Predictable Theming',
        desc: 'Light and dark modes that actually work. Semantic tokens, not magic values.',
    },
    {
        icon: Zap,
        title: 'Production-Safe Animations',
        desc: 'All transitions under 200ms. Respects prefers-reduced-motion automatically.',
    },
    {
        icon: Layers,
        title: 'Zero Overlay Conflicts',
        desc: 'Modals, dropdowns, tooltips—all coordinated via a single layering contract.',
    },
    {
        icon: Shield,
        title: 'Designed for Scale',
        desc: 'From prototypes to enterprise dashboards. Component contracts that don\'t break.',
    },
];

const quotes = [
    {
        text: '"We don\'t patch. We design primitives."',
        note: 'Every component is built on foundational abstractions that compose correctly.',
    },
    {
        text: '"Invariants beat workarounds."',
        note: 'Layering contracts are enforced by the system, not by developer discipline.',
    },
    {
        text: '"Glass effects are beautiful when they\'re correct."',
        note: 'Glassmorphism without visual bugs, in both light and dark themes.',
    },
];

/* ──────────────────────────────────────────────
   Floating Gradient Orb (Hero background)
   ────────────────────────────────────────────── */
function FloatingOrb({
    className,
    delay = 0,
}: {
    className: string;
    delay?: number;
}) {
    const shouldReduce = useReducedMotion();
    return (
        <motion.div
            className={`absolute rounded-full blur-3xl ${className}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
                shouldReduce
                    ? { opacity: 0.15 }
                    : {
                        opacity: [0.08, 0.18, 0.08],
                        scale: [1, 1.15, 1],
                        x: [0, 30, -20, 0],
                        y: [0, -25, 15, 0],
                    }
            }
            transition={{
                duration: 12,
                delay,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
            aria-hidden="true"
        />
    );
}

/* ──────────────────────────────────────────────
   Magnetic CTA Button
   ────────────────────────────────────────────── */
function MagneticButton({
    children,
    to,
    variant = 'primary',
}: {
    children: React.ReactNode;
    to: string;
    variant?: 'primary' | 'outline';
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });
    const shouldReduce = useReducedMotion();

    const handleMouseMove = (e: React.MouseEvent) => {
        if (shouldReduce || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.12);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isPrimary = variant === 'primary';
    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileTap={{ scale: 0.97 }}
        >
            <Link
                to={to}
                className={`inline-flex h-12 items-center justify-center rounded-xl px-8 text-sm font-semibold shadow-sm transition-all duration-200 ${isPrimary
                    ? 'bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:shadow-lg hover:shadow-[hsl(var(--foreground))]/10'
                    : 'border border-[hsl(var(--border))] bg-transparent text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'
                    }`}
            >
                {children}
            </Link>
        </motion.div>
    );
}

/* ──────────────────────────────────────────────
   LANDING PAGE
   ────────────────────────────────────────────── */
export function LandingPage() {
    const [copied, setCopied] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const heroRef = useRef<HTMLElement>(null);

    // Parallax for hero grid
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const gridOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const copyCommand = () => {
        navigator.clipboard.writeText('npm install @archui/react');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="flex-1 overflow-x-hidden">
            {/* ============================================
          HERO SECTION
          Purpose: Value proposition + primary conversion
      ============================================ */}
            <section ref={heroRef} className="relative overflow-hidden">
                {/* Floating gradient orbs */}
                <FloatingOrb
                    className="h-[500px] w-[500px] -top-20 -left-40 bg-blue-500/20 dark:bg-blue-400/10"
                    delay={0}
                />
                <FloatingOrb
                    className="h-[400px] w-[400px] top-40 -right-32 bg-violet-500/15 dark:bg-violet-400/10"
                    delay={3}
                />
                <FloatingOrb
                    className="h-[300px] w-[300px] bottom-0 left-1/3 bg-emerald-500/10 dark:bg-emerald-400/5"
                    delay={6}
                />

                {/* Subtle grid background with parallax */}
                <motion.div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: `
              linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
            `,
                        backgroundSize: '4rem 4rem',
                        y: shouldReduceMotion ? 0 : gridY,
                        opacity: shouldReduceMotion ? 0.03 : gridOpacity,
                    }}
                />
                {/* Radial fade mask */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 70%)',
                    }}
                />

                <div className="container relative mx-auto px-4 py-28 md:py-36 lg:py-44">
                    <div className="mx-auto max-w-[840px] text-center">
                        {/* Version badge */}
                        <motion.div
                            initial={scaleInInitial}
                            animate={scaleInAnimate(0)}
                            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/50 px-4 py-1.5 text-xs font-medium text-[hsl(var(--muted-foreground))] backdrop-blur-sm"
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>v0.1.0 — Now with Motion</span>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={fadeUpInitial}
                            animate={fadeUpAnimate(0.15)}
                            className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-5xl md:text-6xl lg:text-7xl"
                        >
                            Components that compose.
                            <br />
                            <span className="bg-gradient-to-r from-[hsl(var(--muted-foreground))] via-[hsl(var(--muted-foreground))] to-[hsl(var(--foreground))] bg-clip-text text-transparent">
                                Systems that scale.
                            </span>
                        </motion.h1>

                        {/* Subline */}
                        <motion.p
                            initial={fadeUpInitial}
                            animate={fadeUpAnimate(0.3)}
                            className="mx-auto mt-6 max-w-[600px] text-lg text-[hsl(var(--muted-foreground))] md:text-xl leading-relaxed"
                        >
                            Architecture-first React + Vue components with token-driven
                            theming, predictable layering, and zero decoration bugs.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={fadeUpInitial}
                            animate={fadeUpAnimate(0.45)}
                            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
                        >
                            <MagneticButton to="/docs" variant="primary">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </MagneticButton>
                            <MagneticButton to="/docs/introduction" variant="outline">
                                View Docs
                            </MagneticButton>
                        </motion.div>

                        {/* Install command */}
                        <motion.div
                            initial={fadeUpInitial}
                            animate={fadeUpAnimate(0.6)}
                            className="mt-10 flex items-center justify-center"
                        >
                            <div className="flex items-center rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]/80 px-5 py-3 backdrop-blur-sm">
                                <code className="text-sm font-mono text-[hsl(var(--foreground))]">
                                    npm install @archui/react
                                </code>
                                <motion.button
                                    onClick={copyCommand}
                                    className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-[hsl(var(--muted-foreground))] transition-colors hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                                    aria-label="Copy install command"
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {copied ? (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                        >
                                            <Check className="h-4 w-4 text-emerald-500" />
                                        </motion.div>
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============================================
          STATS STRIP
          Purpose: Quick credibility signal
      ============================================ */}
            <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 py-6">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
                        {[
                            { value: '80+', label: 'Components' },
                            { value: '2', label: 'Frameworks' },
                            { value: '100%', label: 'TypeScript' },
                            { value: 'WCAG AA', label: 'Accessible' },
                        ].map(({ value, label }) => (
                            <motion.div
                                key={label}
                                className="text-center"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">{value}</p>
                                <p className="mt-0.5 text-sm text-[hsl(var(--muted-foreground))]">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          STATS STRIP
          Purpose: Quick credibility signal
      ============================================ */}
            <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]/20 py-6">
                <div className="container mx-auto px-4">
                    <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
                        {[
                            { value: '80+', label: 'Components' },
                            { value: '2', label: 'Frameworks' },
                            { value: '100%', label: 'TypeScript' },
                            { value: 'WCAG AA', label: 'Accessible' },
                        ].map(({ value, label }) => (
                            <motion.div
                                key={label}
                                className="text-center"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">{value}</p>
                                <p className="mt-0.5 text-sm text-[hsl(var(--muted-foreground))]">{label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
          WHY ARCHUI SECTION
          Purpose: Architectural differentiators
      ============================================ */}
            <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-[900px]">
                        <AnimatedSection className="text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-3xl">
                                Why ArchUI
                            </h2>
                            <p className="mx-auto mt-4 max-w-[600px] text-[hsl(var(--muted-foreground))]">
                                Built on architectural primitives, not patches.
                            </p>
                        </AnimatedSection>

                        <StaggerContainer className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4" staggerDelay={0.12}>
                            {differentiators.map((item) => (
                                <StaggerItem key={item.title}>
                                    <motion.div
                                        className="text-center group"
                                        whileHover={shouldReduceMotion ? {} : { y: -4, transition: cardSpring }}
                                    >
                                        <motion.div
                                            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] transition-shadow duration-200 group-hover:shadow-md"
                                            whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
                                            transition={cardSpring}
                                        >
                                            <item.icon className="h-5 w-5 text-[hsl(var(--foreground))]" />
                                        </motion.div>
                                        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                                            {item.desc}
                                        </p>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* ============================================
          FEATURES SECTION
          Purpose: Key capabilities (5 features)
      ============================================ */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-[900px]">
                        <AnimatedSection className="text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-3xl">
                                Features
                            </h2>
                            <p className="mx-auto mt-4 max-w-[600px] text-[hsl(var(--muted-foreground))]">
                                Production-grade primitives for real applications.
                            </p>
                        </AnimatedSection>

                        <StaggerContainer className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
                            {features.map((feature, index) => (
                                <StaggerItem
                                    key={feature.title}
                                    className={
                                        index === features.length - 1
                                            ? 'md:col-span-2 lg:col-span-1'
                                            : ''
                                    }
                                >
                                    <motion.div
                                        className="h-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-colors duration-200 hover:border-[hsl(var(--foreground))]/20"
                                        whileHover={
                                            shouldReduceMotion
                                                ? {}
                                                : {
                                                    y: -6,
                                                    boxShadow:
                                                        '0 20px 40px -12px rgba(0,0,0,0.1)',
                                                }
                                        }
                                        transition={cardSpring}
                                    >
                                        <motion.div
                                            className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[hsl(var(--muted))]"
                                            whileHover={shouldReduceMotion ? {} : { rotate: 5, scale: 1.1 }}
                                            transition={cardSpring}
                                        >
                                            <feature.icon className="h-5 w-5 text-[hsl(var(--foreground))]" />
                                        </motion.div>
                                        <h3 className="text-base font-semibold text-[hsl(var(--foreground))]">
                                            {feature.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* ============================================
          DESIGN PHILOSOPHY SECTION
          Purpose: Engineering depth communication
      ============================================ */}
            <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-[700px]">
                        <AnimatedSection className="text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-3xl">
                                Design Philosophy
                            </h2>
                        </AnimatedSection>

                        <div className="mt-12 space-y-8">
                            {quotes.map((quote, i) => (
                                <AnimatedSection
                                    key={i}
                                    direction="left"
                                    delay={i * 0.15}
                                    distance={32}
                                >
                                    <motion.blockquote
                                        className="border-l-2 border-[hsl(var(--foreground))]/30 pl-6 transition-all duration-200"
                                        whileHover={
                                            shouldReduceMotion
                                                ? {}
                                                : { x: 8, borderColor: 'hsl(var(--foreground))' }
                                        }
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-lg font-medium text-[hsl(var(--foreground))] md:text-xl">
                                            {quote.text}
                                        </p>
                                        <footer className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">
                                            {quote.note}
                                        </footer>
                                    </motion.blockquote>
                                </AnimatedSection>
                            ))}
                        </div>

                        {/* Code example */}
                        <AnimatedSection delay={0.3} className="mt-12">
                            <motion.div
                                className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm"
                                whileHover={
                                    shouldReduceMotion
                                        ? {}
                                        : {
                                            y: -3,
                                            boxShadow:
                                                '0 12px 24px -8px rgba(0,0,0,0.08)',
                                        }
                                }
                                transition={cardSpring}
                            >
                                <div className="border-b border-[hsl(var(--border))] px-4 py-2.5 flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                                    </div>
                                    <span className="text-xs font-medium text-[hsl(var(--muted-foreground))] ml-2">
                                        The EffectContainer Pattern
                                    </span>
                                </div>
                                <pre className="overflow-x-auto p-4 text-sm">
                                    <code className="text-[hsl(var(--foreground))]">{`<EffectContainer
  effects={<ShimmerOverlay />}
  className="rounded-xl"
>
  {/* Content always renders above effects */}
  <CardContent />
</EffectContainer>`}</code>
                                </pre>
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ============================================
          COMPONENTS SHOWCASE — BENTO GRID
          Purpose: Visual proof of component quality
      ============================================ */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-[1000px]">
                        <AnimatedSection className="text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-3xl">
                                Beautiful components.{' '}
                                <span className="text-[hsl(var(--muted-foreground))]">Ready to ship.</span>
                            </h2>
                            <p className="mx-auto mt-4 max-w-[600px] text-[hsl(var(--muted-foreground))]">
                                80+ glassmorphic primitives. Everything composes cleanly.
                            </p>
                        </AnimatedSection>

                        {/* Bento grid */}
                        <StaggerContainer className="mt-12 grid gap-4 lg:grid-cols-3" staggerDelay={0.1}>

                            {/* TALL LEFT: Buttons + Inputs */}
                            <StaggerItem className="lg:row-span-2">
                                <motion.div
                                    className="h-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 flex flex-col gap-5"
                                    whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' }}
                                    transition={cardSpring}
                                >
                                    <div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--muted))] px-2.5 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                                            Forms
                                        </span>
                                        <h3 className="mt-3 text-base font-semibold text-[hsl(var(--foreground))]">Buttons &amp; Inputs</h3>
                                        <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">Every variant, typed and composable.</p>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex flex-wrap gap-2">
                                            <GlassButton variant="default" size="sm">Primary</GlassButton>
                                            <GlassButton variant="secondary" size="sm">Secondary</GlassButton>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <GlassButton variant="ghost" size="sm">Ghost</GlassButton>
                                            <GlassButton variant="outline" size="sm">Outline</GlassButton>
                                        </div>
                                        <GlassInput placeholder="glass-input@archui.dev" />
                                        <GlassInput placeholder="Disabled" disabled />
                                    </div>
                                </motion.div>
                            </StaggerItem>

                            {/* TOP MIDDLE: Glass Card */}
                            <StaggerItem>
                                <motion.div
                                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
                                    whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' }}
                                    transition={cardSpring}
                                >
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--muted))] px-2.5 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                                        Glass Card
                                    </span>
                                    <div className="mt-4">
                                        <GlassCard className="p-4 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-blue-500" />
                                                <div>
                                                    <p className="text-xs font-semibold text-[hsl(var(--foreground))]">EffectContainer</p>
                                                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Layering guaranteed</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                                                Frosted glass — content always above decoration.
                                            </p>
                                        </GlassCard>
                                    </div>
                                </motion.div>
                            </StaggerItem>

                            {/* TOP RIGHT: Design Tokens */}
                            <StaggerItem>
                                <motion.div
                                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
                                    whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' }}
                                    transition={cardSpring}
                                >
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--muted))] px-2.5 py-1 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                                        Design Tokens
                                    </span>
                                    <div className="mt-4 grid grid-cols-4 gap-2">
                                        {[
                                            'bg-violet-500', 'bg-sky-500', 'bg-emerald-500', 'bg-amber-500',
                                            'bg-violet-300', 'bg-sky-300', 'bg-emerald-300', 'bg-amber-300',
                                            'bg-violet-900', 'bg-sky-900', 'bg-emerald-900', 'bg-amber-900',
                                        ].map((c, i) => (
                                            <motion.div key={i} className={`h-7 rounded-lg ${c}`}
                                                whileHover={shouldReduceMotion ? {} : { scale: 1.12 }}
                                                transition={cardSpring}
                                            />
                                        ))}
                                    </div>
                                    <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
                                        One CSS variable override. System-wide change.
                                    </p>
                                </motion.div>
                            </StaggerItem>

                            {/* BOTTOM MIDDLE: Accessibility */}
                            <StaggerItem>
                                <motion.div
                                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
                                    whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' }}
                                    transition={cardSpring}
                                >
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        WCAG AA
                                    </span>
                                    <div className="mt-4 space-y-2">
                                        {[
                                            'Keyboard navigation',
                                            'Focus-visible rings',
                                            'Reduced-motion support',
                                            'ARIA attributes',
                                        ].map((label) => (
                                            <div key={label} className="flex items-center gap-2 text-xs">
                                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 text-[10px] font-bold">✓</div>
                                                <span className="text-[hsl(var(--foreground))]">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </StaggerItem>

                            {/* BOTTOM RIGHT: Animation */}
                            <StaggerItem>
                                <motion.div
                                    className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6"
                                    whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.1)' }}
                                    transition={cardSpring}
                                >
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-2.5 py-1 text-xs font-medium text-sky-600 dark:text-sky-400">
                                        Motion
                                    </span>
                                    <div className="mt-4 flex flex-col gap-3">
                                        {[0, 0.12, 0.24].map((delay, i) => (
                                            <motion.div
                                                key={i}
                                                className="h-2 rounded-full bg-gradient-to-r from-sky-500/30 to-violet-500/30"
                                                style={{ width: `${100 - i * 20}%` }}
                                                animate={shouldReduceMotion ? {} : {
                                                    scaleX: [1, 0.85, 1],
                                                    opacity: [0.4, 0.9, 0.4],
                                                }}
                                                transition={{ duration: 2.4, delay, repeat: Infinity, ease: 'easeInOut' }}
                                            />
                                        ))}
                                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                                            All transitions under 200 ms. Respects prefers-reduced-motion.
                                        </p>
                                    </div>
                                </motion.div>
                            </StaggerItem>

                        </StaggerContainer>

                        <AnimatedSection delay={0.3} className="mt-8 text-center">
                            <Link
                                to="/docs/components/glass-button"
                                className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--foreground))] underline underline-offset-4 transition-colors hover:text-[hsl(var(--muted-foreground))]"
                            >
                                Browse all 80+ components
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ============================================
          DEVELOPER EXPERIENCE SECTION
          Purpose: API quality communication
      ============================================ */}
            <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 py-20 md:py-28">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-[900px]">
                        <AnimatedSection className="text-center">
                            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-3xl">
                                Developer Experience
                            </h2>
                            <p className="mx-auto mt-4 max-w-[600px] text-[hsl(var(--muted-foreground))]">
                                Clean APIs. Typed variants. Predictable behavior.
                            </p>
                        </AnimatedSection>

                        <StaggerContainer className="mt-14 grid gap-6 lg:grid-cols-2" staggerDelay={0.2}>
                            {/* React Example */}
                            <StaggerItem>
                                <motion.div
                                    className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm"
                                    whileHover={
                                        shouldReduceMotion
                                            ? {}
                                            : {
                                                y: -3,
                                                boxShadow:
                                                    '0 12px 24px -8px rgba(0,0,0,0.08)',
                                            }
                                    }
                                    transition={cardSpring}
                                >
                                    <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] px-4 py-3">
                                        <div className="flex h-6 items-center rounded bg-blue-500/10 px-2.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                            React
                                        </div>
                                    </div>
                                    <pre className="overflow-x-auto p-4 text-sm">
                                        <code className="text-[hsl(var(--foreground))]">{`import { GlassButton } from '@archui/react';

export function App() {
  return (
    <GlassButton 
      variant="default"
      size="md"
      onClick={() => console.log('clicked')}
    >
      Click me
    </GlassButton>
  );
}`}</code>
                                    </pre>
                                </motion.div>
                            </StaggerItem>

                            {/* Vue Example */}
                            <StaggerItem>
                                <motion.div
                                    className="overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm"
                                    whileHover={
                                        shouldReduceMotion
                                            ? {}
                                            : {
                                                y: -3,
                                                boxShadow:
                                                    '0 12px 24px -8px rgba(0,0,0,0.08)',
                                            }
                                    }
                                    transition={cardSpring}
                                >
                                    <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] px-4 py-3">
                                        <div className="flex h-6 items-center rounded bg-emerald-500/10 px-2.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                            Vue
                                        </div>
                                    </div>
                                    <pre className="overflow-x-auto p-4 text-sm">
                                        <code className="text-[hsl(var(--foreground))]">{`<script setup>
import { GlassButton } from '@archui/vue';
</script>

<template>
  <GlassButton 
    variant="default"
    size="md"
    @click="handleClick"
  >
    Click me
  </GlassButton>
</template>`}</code>
                                    </pre>
                                </motion.div>
                            </StaggerItem>
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* ============================================
          STACK / TECH STRIP
          Purpose: Credibility and ecosystem signal
      ============================================ */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-[800px]">
                        <AnimatedSection className="text-center">
                            <p className="text-xs font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                                Built on the modern stack
                            </p>
                        </AnimatedSection>
                        <StaggerContainer className="mt-6 flex flex-wrap items-center justify-center gap-3" staggerDelay={0.06}>
                            {[
                                { label: 'React 18+', color: 'text-sky-500' },
                                { label: 'Vue 3', color: 'text-emerald-500' },
                                { label: 'TypeScript', color: 'text-blue-500' },
                                { label: 'Tailwind CSS 4', color: 'text-cyan-500' },
                                { label: 'Radix UI', color: 'text-violet-500' },
                                { label: 'motion/react', color: 'text-pink-500' },
                                { label: 'CVA', color: 'text-orange-500' },
                                { label: 'WCAG AA', color: 'text-emerald-500' },
                            ].map(({ label, color }) => (
                                <StaggerItem key={label}>
                                    <motion.div
                                        className="flex h-8 items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 text-xs font-medium"
                                        whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                                        transition={cardSpring}
                                    >
                                        <span className={`mr-1.5 text-base leading-none ${color}`}>·</span>
                                        <span className="text-[hsl(var(--foreground))]">{label}</span>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            {/* ============================================
          CTA SECTION
          Purpose: Final conversion
      ============================================ */}
            <section className="border-t border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 py-20 md:py-28 relative overflow-hidden">
                {/* Background glow */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    aria-hidden="true"
                >
                    <motion.div
                        className="h-[300px] w-[600px] rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl"
                        animate={
                            shouldReduceMotion
                                ? {}
                                : { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }
                        }
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </motion.div>

                <div className="container relative mx-auto px-4">
                    <div className="mx-auto max-w-[500px] text-center">
                        <AnimatedSection>
                            <h2 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-3xl">
                                Start Building with ArchUI
                            </h2>
                            <p className="mt-4 text-[hsl(var(--muted-foreground))]">
                                Read the documentation to get started. It takes less than 5
                                minutes.
                            </p>
                        </AnimatedSection>
                        <AnimatedSection delay={0.2}>
                            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                                <MagneticButton to="/docs" variant="primary">
                                    Read the Documentation
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </MagneticButton>
                                <motion.a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex h-12 items-center justify-center rounded-xl border border-[hsl(var(--border))] bg-transparent px-6 text-sm font-medium text-[hsl(var(--foreground))] transition-colors hover:bg-[hsl(var(--muted))]"
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <Github className="mr-2 h-4 w-4" />
                                    GitHub
                                </motion.a>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* ============================================
          FOOTER
      ============================================ */}
            <footer className="border-t border-[hsl(var(--border))] py-8">
                <div className="container mx-auto px-4">
                    <AnimatedSection once={true} distance={16}>
                        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Built by the ArchUI team. Open source and free to use.
                            </p>
                            <div className="flex items-center gap-6">
                                <Link
                                    to="/docs/changelog"
                                    className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                                >
                                    Changelog
                                </Link>
                                <a
                                    href="https://github.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]"
                                >
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </footer>
        </main>
    );
}
