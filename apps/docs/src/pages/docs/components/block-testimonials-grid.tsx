import { TestimonialsGrid } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

/* ------------------------------------------------------------------ */
/*  Sample data                                                         */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    quote: "ArchUI cut our design-to-code time in half. The glass aesthetic is exactly what we needed for our SaaS dashboard.",
    name: 'Sarah Chen',
    role: 'Lead Designer',
    company: 'Verve AI',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&h=48&fit=crop',
    rating: 5,
  },
  {
    quote: "The token system is genius. We swapped our entire accent color for a product launch in under 60 seconds.",
    name: 'Marcus Obi',
    role: 'Staff Engineer',
    company: 'Nodus',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop',
    rating: 5,
  },
  {
    quote: "Finally a component library that doesn't look like every other purple-gradient AI startup. Refreshing restraint.",
    name: 'Elena Vasquez',
    role: 'Founder',
    company: 'Agenlabs',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop',
    rating: 5,
  },
  {
    quote: "Accessibility is first-class. Every component passes our WCAG 2.1 AA audit without modifications.",
    name: 'Jordan Lee',
    role: 'Accessibility Lead',
    company: 'Clarity Health',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop',
    rating: 5,
  },
  {
    quote: "Our design team ships production components now. ArchUI bridged the gap between Figma and code.",
    name: 'Priya Nair',
    role: 'Product Manager',
    company: 'AgentForce',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=48&h=48&fit=crop',
    rating: 4,
  },
  {
    quote: "The dark mode token system is thoughtful. It's not just inverted colors — it actually feels right.",
    name: 'Tom Keller',
    role: 'Frontend Architect',
    company: 'Proactiv Tech',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=48&h=48&fit=crop',
    rating: 5,
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export function BlockTestimonialsGridDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 id="testimonials-grid" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Testimonials Grid
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A masonry-style or equal-height grid of glassmorphic testimonial cards. Each card shows a quote, star rating, avatar, name, role, and company.
        </p>
      </div>

      {/* ── 3-column ────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="three-columns" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          3 columns (default)
        </h2>
        <ComponentPreview
          code={`import { TestimonialsGrid } from '@archui/react';

<TestimonialsGrid
  heading="Loved by teams everywhere"
  subheading="Join thousands of designers and engineers who ship faster with ArchUI."
  testimonials={testimonials}
  columns={3}
/>`}
        >
          <TestimonialsGrid
            heading="Loved by teams everywhere"
            subheading="Join thousands of designers and engineers who ship faster with ArchUI."
            testimonials={testimonials}
            columns={3}
          />
        </ComponentPreview>
      </section>

      {/* ── 2-column ────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="two-columns" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          2 columns
        </h2>
        <ComponentPreview
          code={`<TestimonialsGrid
  heading="What our customers say"
  testimonials={testimonials}
  columns={2}
/>`}
        >
          <TestimonialsGrid
            heading="What our customers say"
            testimonials={testimonials.slice(0, 4)}
            columns={2}
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

      {/* ── Props ───────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
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
                ['subheading', 'string', '—', 'Supporting paragraph'],
                ['testimonials', 'Testimonial[]', '—', 'Array of testimonial objects (required)'],
                ['columns', '2 | 3', '3', 'Number of grid columns'],
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

        <h3 className="text-base font-semibold text-[hsl(var(--foreground))] mt-4">Testimonial</h3>
        <div className="overflow-x-auto rounded-lg border border-[hsl(var(--border))]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.4)]">
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Key</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Type</th>
                <th className="px-4 py-3 text-left font-medium text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {[
                ['quote', 'string', 'The quoted testimonial text (required)'],
                ['name', 'string', 'Person\'s full name (required)'],
                ['role', 'string', 'Job title or role'],
                ['company', 'string', 'Company or organisation name'],
                ['avatar', 'string', 'URL of the person\'s avatar image'],
                ['rating', 'number', 'Star rating (1–5)'],
              ].map(([key, type, desc]) => (
                <tr key={key} className="bg-[hsl(var(--background))]">
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--foreground))]">{key}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{type}</td>
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
