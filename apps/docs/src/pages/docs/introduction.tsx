import { Link } from 'react-router-dom';
import {
  Layers, Palette, Shield, Zap, Code2, Box,
  ArrowRight, CheckCircle2,
} from 'lucide-react';
import { CodeBlock } from '../../components/component-preview';

/* ── Small highlighted callout ──────────────────────────── */
function Callout({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 p-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--background))] border border-[hsl(var(--border))]">
        <Icon className="h-4 w-4 text-[hsl(var(--foreground))]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{title}</p>
        <p className="mt-0.5 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{children}</p>
      </div>
    </div>
  );
}

function Badge({ children, color = 'default' }: { children: React.ReactNode; color?: 'blue' | 'emerald' | 'violet' | 'default' }) {
  const styles = {
    default: 'bg-[hsl(var(--muted))] text-[hsl(var(--foreground))]',
    blue: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  };
  return (
    <span className={`inline-flex items-center rounded-md border border-[hsl(var(--border))] px-2 py-0.5 text-xs font-medium ${styles[color]}`}>
      {children}
    </span>
  );
}

const PRINCIPLES = [
  { icon: Layers, title: 'System-level layering', desc: 'The EffectContainer primitive enforces a strict separation between decorative overlays and content. No more z-index battles or glass effects bleeding over clickable elements.' },
  { icon: Palette, title: 'Token-driven design', desc: 'Every color, spacing value, radius, and shadow comes from semantic design tokens. Swap themes without touching a component.' },
  { icon: Shield, title: 'Accessibility-first', desc: 'WCAG AA contrast on every variant, full keyboard navigation, focus-visible rings, and automatic prefers-reduced-motion support throughout.' },
  { icon: Zap, title: 'Performance defaults', desc: 'All built-in transitions stay under 200 ms. Motion effects respect the user\'s OS setting via useReducedMotion, not a feature flag.' },
  { icon: Code2, title: 'Framework parity', desc: 'The React and Vue packages share the same component API surface. Migrate between frameworks without relearning prop names.' },
  { icon: Box, title: 'Composable primitives', desc: 'GlassCard, GlassPanel, GlassContainer — build complex layouts from small, well-defined building blocks that compose predictably.' },
];

const QUICK_START = `# React
npm install @archui/react

# Vue
npm install @archui/vue`;

const REACT_USAGE = `import { GlassCard, GlassButton, GlassInput } from '@archui/react';

export function LoginCard() {
  return (
    <GlassCard className="p-6 max-w-sm">
      <h2 className="text-lg font-semibold">Welcome back</h2>
      <GlassInput placeholder="Email" className="mt-4" />
      <GlassButton className="mt-3 w-full">Sign in</GlassButton>
    </GlassCard>
  );
}`;

export function Introduction() {
  return (
    <div className="space-y-10">
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          <Badge color="violet">Architecture-first</Badge>
          <Badge color="blue">React + Vue</Badge>
          <Badge color="emerald">TypeScript</Badge>
        </div>
        <h1 id="introduction" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Introduction
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-[hsl(var(--muted-foreground))]">
          ArchUI is a glassmorphic component library built on <strong className="text-[hsl(var(--foreground))]">architectural primitives</strong> — not
          patches. It gives you a system where glass effects, layering, theming, and
          accessibility work correctly by design, not by convention.
        </p>
      </div>

      {/* What makes it different */}
      <div className="space-y-4">
        <h2 id="what-is-archui" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          What makes ArchUI different?
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Most component libraries give you beautiful defaults but leave you to solve
          problems yourself when layouts break, glass overlays hide content, or themes
          look wrong in edge cases. ArchUI eliminates entire categories of problems
          before they reach your code.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <Callout key={p.title} icon={p.icon} title={p.title}>
              {p.desc}
            </Callout>
          ))}
        </div>
      </div>

      {/* EffectContainer highlight */}
      <div className="space-y-4">
        <h2 id="effect-container" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          The EffectContainer pattern
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Glassmorphism creates a classic problem: the frosted overlay hides the content it
          decorates. ArchUI solves this with a dedicated rendering contract enforced by
          <code className="mx-1 rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 font-mono text-xs">EffectContainer</code>.
          Decorations paint on a guaranteed lower layer; content always renders on top.
        </p>
        <div className="rounded-xl overflow-hidden border border-[hsl(var(--border))] shadow-sm">
          <div className="flex items-center gap-2 border-b border-[hsl(var(--border))] bg-[#161b22] px-4 py-2.5">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/50" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
              <div className="h-3 w-3 rounded-full bg-green-500/50" />
            </div>
            <span className="ml-1 font-mono text-xs text-slate-400">EffectContainer.tsx</span>
          </div>
          <div className="bg-[#0d1117] overflow-x-auto">
            <pre className="p-5 text-sm font-mono leading-relaxed text-slate-300">{`<EffectContainer
  effects={<ShimmerOverlay />}   {/* renders below content */}
  className="rounded-xl"
>
  {/* ✅ Your content always renders above effects */}
  <CardContent />
</EffectContainer>`}</pre>
          </div>
        </div>
      </div>

      {/* Quick start */}
      <div className="space-y-4">
        <h2 id="quick-start" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Quick start
        </h2>
        <CodeBlock code={QUICK_START} />
        <CodeBlock
          code={REACT_USAGE}
          vueCode={`<script setup>
import { GlassCard, GlassButton, GlassInput } from '@archui/vue';
</script>

<template>
  <GlassCard class="p-6 max-w-sm">
    <h2 class="text-lg font-semibold">Welcome back</h2>
    <GlassInput placeholder="Email" class="mt-4" />
    <GlassButton class="mt-3 w-full">Sign in</GlassButton>
  </GlassCard>
</template>`}
        />
      </div>

      {/* What's included */}
      <div className="space-y-4">
        <h2 id="whats-included" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          What's included
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          ArchUI ships <strong className="text-[hsl(var(--foreground))]">80+ components</strong> across seven categories, plus
          animated backgrounds and production-ready blocks.
        </p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: 'Forms', count: '14' },
            { label: 'Data Display', count: '8' },
            { label: 'Feedback', count: '5' },
            { label: 'Navigation', count: '7' },
            { label: 'Overlay', count: '3' },
            { label: 'Interactive', count: '10' },
            { label: 'Special Effects', count: '4' },
            { label: 'Backgrounds', count: '6' },
            { label: 'Blocks', count: '8' },
          ].map(({ label, count }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 px-3.5 py-2.5"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-sm text-[hsl(var(--foreground))]">{label}</span>
              </div>
              <span className="text-xs font-mono text-[hsl(var(--muted-foreground))]">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="space-y-4">
        <h2 id="tech-stack" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Tech stack
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: 'React 18+ / Vue 3', detail: 'Full Composition API and hooks support' },
            { name: 'TypeScript', detail: 'Complete type safety, no any casts' },
            { name: 'Tailwind CSS 4.1', detail: 'Utility-first with semantic token preset' },
            { name: 'class-variance-authority', detail: 'Type-safe variant system per component' },
            { name: 'Radix UI (React)', detail: 'Headless primitives for complex patterns' },
            { name: 'motion/react', detail: 'Fluid animations with reduced-motion support' },
          ].map(({ name, detail }) => (
            <div key={name} className="flex flex-col gap-0.5 rounded-lg border border-[hsl(var(--border))] px-3.5 py-3">
              <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{name}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))]">{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6">
        <h2 id="faq" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FAQ
        </h2>
        {[
          { id: 'nextjs', q: 'Does it work with Next.js App Router?', a: 'Yes. All interactive components include the "use client" directive. Server components can import the non-interactive primitives directly.' },
          { id: 'accessible', q: 'Is it accessible?', a: 'Every component targets WCAG 2.1 AA. That means correct contrast ratios in both light and dark modes, focus-visible rings, ARIA attributes, and reduced-motion animations built in — not added as afterthoughts.' },
          { id: 'customize', q: 'Can I customize the design tokens?', a: 'Yes. ArchUI ships a Tailwind preset (@archui/core/tailwind.preset) that you can extend. Override any CSS variable to retheme the entire system in seconds.' },
          { id: 'dark', q: 'How does dark mode work?', a: 'ArchUI uses a CSS variable token system. Adding the .dark class to your root element flips all tokens automatically. No separate dark: variants to maintain.' },
        ].map(({ id, q, a }) => (
          <div key={id} className="space-y-2">
            <h3 id={id} className="scroll-m-20 text-base font-semibold text-[hsl(var(--foreground))]">{q}</h3>
            <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{a}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/30 p-6">
        <h3 className="font-semibold text-[hsl(var(--foreground))]">Ready to install?</h3>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Follow the installation guide to add ArchUI to your project in under five minutes.
        </p>
        <Link
          to="/docs/installation"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--foreground))] underline underline-offset-4 transition-colors hover:text-[hsl(var(--muted-foreground))]"
        >
          View installation guide
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
