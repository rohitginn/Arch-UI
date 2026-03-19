import { B2bMarketingTemplate } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function WebsiteB2bMarketingDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          B2B Marketing Agency
        </h1>
        <p className="text-lg text-[hsl(var(--muted-foreground))] mt-2">
          A bold, results-obsessed website template for "Decimal Agency" — a performance marketing
          agency for B2B SaaS companies. Features an Iron (Zinc) + Amber palette, DM Mono metrics,
          count-up animations, service tabs, case study cards, and conversion-optimized CTAs. 
          Inspired by data-driven growth agencies.
        </p>
      </div>

      {/* Live Preview */}
      <section className="space-y-4">
        <h2
          id="preview"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Preview
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Full-page template with sticky navbar, metric marquee, hero with grid background,
          client logo strip, dark results wall with count-up metrics, expandable service tabs,
          detailed case studies, process timeline, transparent pricing cards, and a growth audit CTA.
        </p>
        <ComponentPreview
          code={`import { B2bMarketingTemplate } from '@archui/react';

export default function B2bMarketingPage() {
  return <B2bMarketingTemplate />;
}`}
        >
          <div className="w-full overflow-hidden rounded-xl border border-[hsl(var(--border))]">
            <div className="max-h-[700px] overflow-y-auto">
              <B2bMarketingTemplate />
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Design Tokens */}
      <section className="space-y-4">
        <h2
          id="design-tokens"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Design Tokens
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          The B2B Marketing template uses a stripped-down, confidence-forward palette:
        </p>

        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mt-6">Light Mode</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[hsl(var(--border))] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[hsl(var(--muted))]">
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Token</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Value</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['white', 'Page background', 'Main background'],
                ['zinc-50', 'Surface', 'Alternating section backgrounds'],
                ['zinc-950', 'Text primary', 'Headings, body text'],
                ['zinc-600', 'Text secondary', 'Supporting text'],
                ['zinc-950', 'Accent', 'Brand color (no color needed — confident in black)'],
                ['amber-500', 'CTA accent', 'Primary conversion buttons'],
                ['amber-400', 'Data highlight', 'Metric numbers, result badges'],
              ].map(([token, desc, usage]) => (
                <tr key={`${token}-${desc}`} className="border-t border-[hsl(var(--border))]">
                  <td className="px-4 py-2 font-mono text-xs text-[hsl(var(--foreground))]">{token}</td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{desc}</td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mt-6">Dark Sections</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[hsl(var(--border))] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[hsl(var(--muted))]">
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Token</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Value</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['zinc-950', 'Background', 'Results wall, dark sections'],
                ['zinc-50 / zinc-400', 'Text', 'Headings / body in dark sections'],
                ['amber-400', 'Metrics', 'Count-up numbers on dark backgrounds'],
                ['#111111', 'Card background', 'Result metric cards'],
                ['amber-400/20', 'Left border', 'Card accent border (brightens on hover)'],
              ].map(([token, desc, usage]) => (
                <tr key={`${token}-${desc}`} className="border-t border-[hsl(var(--border))]">
                  <td className="px-4 py-2 font-mono text-xs text-[hsl(var(--foreground))]">{token}</td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{desc}</td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-4">
        <h2
          id="typography"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Typography
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[hsl(var(--border))] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[hsl(var(--muted))]">
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Role</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Font</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Weight</th>
                <th className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">Usage</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Display headings', 'Space Grotesk', '800', 'Hero headline, section headings — wide, assertive'],
                ['Body text', 'Inter', '400', 'Descriptions, paragraphs, navigation links'],
                ['Metrics / ROI', 'DM Mono', '700', 'Result numbers, pricing figures — tabular-nums enabled'],
                ['Labels', 'Space Grotesk', '600', 'Section badges, industry labels (uppercase, tracking-wider)'],
              ].map(([role, font, weight, usage]) => (
                <tr key={role} className="border-t border-[hsl(var(--border))]">
                  <td className="px-4 py-2 text-[hsl(var(--foreground))]">{role}</td>
                  <td className="px-4 py-2 font-mono text-xs text-[hsl(var(--foreground))]">{font}</td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{weight}</td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sections overview */}
      <section className="space-y-4">
        <h2
          id="sections"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Sections
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          The template includes 9 distinct sections designed to optimize for conversion:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-[hsl(var(--muted-foreground))]">
          <li><strong>Navbar</strong> — Sticky nav with "Decimal×" branding, ghost CTA + amber primary CTA</li>
          <li><strong>Metric Marquee</strong> — Auto-scrolling strip of recent client results (pauses on hover)</li>
          <li><strong>Hero</strong> — Results-first design with grid background, shimmer CTA, and micro-badges</li>
          <li><strong>Proof Logos</strong> — Grayscale client logos with hover color reveal</li>
          <li><strong>Results Wall</strong> — Dark zinc-950 section with 8 metric cards featuring count-up animation</li>
          <li><strong>Services</strong> — Tab-based interface with 5 services, each showing includes + example results</li>
          <li><strong>Case Studies</strong> — 3 full-width cards with challenge narrative + DM Mono metric panels</li>
          <li><strong>Process Timeline</strong> — 5-step timeline showing "What Decimal does" vs "What you see"</li>
          <li><strong>Pricing</strong> — 3 transparent tiers (Starter / Scale / Growth) with feature comparison</li>
          <li><strong>Growth Audit CTA</strong> — Full-width conversion section with pulse-glow button animation</li>
          <li><strong>Footer</strong> — Multi-column layout with brand, service links, company & resource links</li>
        </ul>
      </section>

      {/* Micro-Interactions */}
      <section className="space-y-4">
        <h2
          id="interactions"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Micro-Interactions
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-[hsl(var(--muted-foreground))]">
          <li><strong>Marquee</strong> — Infinite horizontal scroll (25s), pauses on hover</li>
          <li><strong>Count-up</strong> — Result numbers count from 0 using easeOut (1200ms), staggered 80ms per card</li>
          <li><strong>Logo hover</strong> — Grayscale → full color with CSS filter transition</li>
          <li><strong>Service tabs</strong> — Active tab slides indicator, content fades (150ms)</li>
          <li><strong>CTA shimmer</strong> — Gradient sweep animation on hero primary button</li>
          <li><strong>Audit pulse</strong> — Every 15s idle, the CTA button does a single amber glow pulse</li>
          <li><strong>Card hover</strong> — amber-400 left border brightens (opacity 0.2 → 1.0)</li>
          <li><strong>Button press</strong> — scale(0.97) active state, -translate-y-[1px] hover</li>
        </ul>
      </section>

      {/* Installation */}
      <section className="space-y-4">
        <h2
          id="installation"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Installation
        </h2>
        <CodeBlock>{`# React
import { B2bMarketingTemplate } from '@archui/react';

# Vue
import { B2bMarketingTemplate } from '@archui/vue';`}</CodeBlock>
      </section>

      {/* Usage — React */}
      <section className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Usage
        </h2>

        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">React</h3>
        <CodeBlock>{`import { B2bMarketingTemplate } from '@archui/react';

export default function MarketingAgencyPage() {
  return <B2bMarketingTemplate className="min-h-screen" />;
}`}</CodeBlock>

        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mt-6">Vue</h3>
        <CodeBlock>{`<script setup>
import { B2bMarketingTemplate } from '@archui/vue';
</script>

<template>
  <B2bMarketingTemplate class="min-h-screen" />
</template>`}</CodeBlock>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2
          id="props"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Props
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-[hsl(var(--border))] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[hsl(var(--muted))]">
                {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                  <th key={h} className="px-4 py-2 text-left font-medium text-[hsl(var(--foreground))]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['className', 'string', '—', 'Additional CSS classes applied to the root container.'],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="border-t border-[hsl(var(--border))]">
                  <td className="px-4 py-2 font-mono text-xs text-[hsl(var(--foreground))]">{prop}</td>
                  <td className="px-4 py-2 font-mono text-xs text-[hsl(var(--muted-foreground))]">{type}</td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{def}</td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
