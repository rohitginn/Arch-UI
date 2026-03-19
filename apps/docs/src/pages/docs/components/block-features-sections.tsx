import { FeaturesGrid, FeaturesAlternating, FeaturesTabbed, FeaturesCompare } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { Zap, Shield, BarChart3, Globe, Lock, Layers } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Sample data                                                         */
/* ------------------------------------------------------------------ */

const gridFeatures = [
  { icon: <Zap className="h-5 w-5" />, title: 'Lightning Fast', description: 'Optimised for performance with zero-runtime overhead. Ships minimal JavaScript.' },
  { icon: <Shield className="h-5 w-5" />, title: 'Enterprise Security', description: 'SOC 2 Type II certified. End-to-end encryption across every data flow.' },
  { icon: <BarChart3 className="h-5 w-5" />, title: 'Real-time Analytics', description: 'Dashboards refresh in under 100 ms. Powered by streaming data pipelines.' },
  { icon: <Globe className="h-5 w-5" />, title: 'Global CDN', description: 'Deployed to 35 edge locations worldwide. p99 latency under 50 ms.' },
  { icon: <Lock className="h-5 w-5" />, title: 'Access Control', description: 'Granular RBAC with SSO, audit logs, and per-resource permissions.' },
  { icon: <Layers className="h-5 w-5" />, title: 'Composable API', description: 'Pick exactly what you need. Every module ships independently.' },
];

const alternatingFeatures = [
  {
    title: 'Visual workflow builder',
    description: 'Drag, connect, and configure every step of your pipeline with a canvas that feels natural. No YAML. No context-switching.',
    image: { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=500&fit=crop', alt: 'Workflow builder' },
    badge: 'Core feature',
  },
  {
    title: 'One-click integrations',
    description: 'Connect to 100+ services in seconds. OAuth flows handled automatically. Credentials stored encrypted at rest.',
    image: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop', alt: 'Integrations' },
    badge: 'Ecosystem',
  },
];

const tabbedFeatures = [
  {
    label: 'Automation',
    title: 'Automate any workflow',
    description: 'Build event-driven pipelines that run on schedule, webhook, or condition. Zero DevOps required.',
    image: { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&h=440&fit=crop', alt: 'Automation' },
  },
  {
    label: 'Analytics',
    title: 'Metrics that matter',
    description: 'Live dashboards with drill-down filters. Export to CSV, connect to BI tools, or embed directly.',
    image: { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&h=440&fit=crop', alt: 'Analytics' },
  },
  {
    label: 'Collaboration',
    title: 'Work together in real time',
    description: 'Multiplayer editing, inline comments, change history, and role-based access — all included.',
    image: { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&h=440&fit=crop', alt: 'Collaboration' },
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function BlockFeaturesSectionsDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 id="features-sections" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Feature Sections
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Four feature-section layouts — grid cards, alternating rows, tabbed panels, and a before/after compare slider — all themed with CSS design tokens.
        </p>
      </div>

      {/* ── FeaturesGrid ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="features-grid" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FeaturesGrid
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          A responsive grid of glass cards — each with an icon, title, and description. Supports 2, 3, or 4 columns.
        </p>
        <ComponentPreview
          code={`import { FeaturesGrid } from '@archui/react';
import { Zap, Shield, BarChart3 } from 'lucide-react';

<FeaturesGrid
  heading="Everything you need"
  subheading="A complete feature set, ready to ship from day one."
  features={[
    { icon: <Zap className="h-5 w-5" />, title: 'Lightning Fast', description: 'Zero-runtime overhead...' },
    { icon: <Shield className="h-5 w-5" />, title: 'Enterprise Security', description: 'SOC 2 Type II certified...' },
    { icon: <BarChart3 className="h-5 w-5" />, title: 'Real-time Analytics', description: 'Dashboards refresh in under 100 ms.' },
  ]}
  columns={3}
/>`}
        >
          <FeaturesGrid
            heading="Everything you need"
            subheading="A complete feature set, ready to ship from day one."
            features={gridFeatures}
            columns={3}
          />
        </ComponentPreview>

        <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">4 Columns</h3>
        <ComponentPreview
          code={`<FeaturesGrid features={features} columns={4} />`}
        >
          <FeaturesGrid
            heading="Built for scale"
            features={gridFeatures}
            columns={4}
          />
        </ComponentPreview>
      </section>

      {/* ── FeaturesAlternating ──────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="features-alternating" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FeaturesAlternating
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          Large alternating rows — screenshot on one side, copy on the other. Ideal for deep product storytelling.
        </p>
        <ComponentPreview
          code={`import { FeaturesAlternating } from '@archui/react';

<FeaturesAlternating
  heading="Everything you need to move faster"
  features={[
    {
      title: 'Visual workflow builder',
      description: 'Drag, connect, and configure...',
      image: { src: '/screenshot-1.png', alt: 'Workflow builder' },
      badge: 'Core feature',
    },
    {
      title: 'One-click integrations',
      description: 'Connect to 100+ services...',
      image: { src: '/screenshot-2.png', alt: 'Integrations' },
      badge: 'Ecosystem',
    },
  ]}
/>`}
        >
          <FeaturesAlternating
            heading="Everything you need to move faster"
            features={alternatingFeatures}
          />
        </ComponentPreview>
      </section>

      {/* ── FeaturesTabbed ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="features-tabbed" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FeaturesTabbed
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          A single large panel with a tab list on one side. Selecting a tab animates in the corresponding screenshot with a crossfade.
        </p>
        <ComponentPreview
          code={`import { FeaturesTabbed } from '@archui/react';

<FeaturesTabbed
  heading="One platform. Every capability."
  features={[
    {
      label: 'Automation',
      title: 'Automate any workflow',
      description: 'Build event-driven pipelines...',
      image: { src: '/auto.png', alt: 'Automation' },
    },
    // ...
  ]}
/>`}
        >
          <FeaturesTabbed
            heading="One platform. Every capability."
            features={tabbedFeatures}
          />
        </ComponentPreview>
      </section>

      {/* ── FeaturesCompare ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="features-compare" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          FeaturesCompare
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] text-sm">
          A before/after drag slider. Reveal two states side-by-side to show the transformation your product enables.
        </p>
        <ComponentPreview
          code={`import { FeaturesCompare } from '@archui/react';

<FeaturesCompare
  heading="See the difference"
  subheading="From cluttered to crystal-clear in one step."
  before={{ label: 'Before', image: { src: '/before.png', alt: 'Before' } }}
  after={{ label: 'After', image: { src: '/after.png', alt: 'After' } }}
/>`}
        >
          <FeaturesCompare
            heading="See the difference"
            subheading="From cluttered to crystal-clear in one step."
            before={{ label: 'Before', image: { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&h=520&fit=crop', alt: 'Before' } }}
            after={{ label: 'After', image: { src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&h=520&fit=crop', alt: 'After' } }}
          />
        </ComponentPreview>
      </section>

      {/* ── Installation ────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock code={`npm install @archui/react\n# or\npnpm add @archui/react`} />
      </section>

      {/* ── Props ────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props — FeaturesGrid
        </h2>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Default</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['heading', 'string', '—', 'Section headline'],
                ['subheading', 'string', '—', 'Section subheading below the headline'],
                ['badge', 'string', '—', 'Small pill above the heading'],
                ['features', 'FeatureItem[]', '—', 'Array of { icon, title, description } items'],
                ['columns', '2 | 3 | 4', '3', 'Number of columns in the grid'],
                ['background', 'ReactNode', '—', 'Optional background component'],
                ['className', 'string', '—', 'Additional Tailwind classes'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="bg-[hsl(var(--background))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{type}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{def}</td>
                  <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
