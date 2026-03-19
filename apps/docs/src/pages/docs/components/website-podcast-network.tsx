import { PodcastNetworkTemplate } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function WebsitePodcastNetworkDocs() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Podcast & Media Network
        </h1>
        <p className="text-lg text-[hsl(var(--muted-foreground))] mt-2">
          A dark-editorial website template for podcast networks and audio media brands.
          Features an amber + stone palette, per-show accent colors, persistent mini player,
          filterable show grid, and episode feed. Inspired by Wondery / Radiotopia aesthetics.
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
          Full-page template with navbar, hero (show artwork stack), featured show, filterable
          shows grid, latest episodes feed, newsletter / membership CTA, about section with host
          grid, footer, and a persistent mini audio player.
        </p>
        <ComponentPreview
          code={`import { PodcastNetworkTemplate } from '@archui/react';

export default function PodcastNetworkPage() {
  return <PodcastNetworkTemplate />;
}`}
        >
          <div className="w-full overflow-hidden rounded-xl border border-[hsl(var(--border))]">
            <div className="max-h-[700px] overflow-y-auto">
              <PodcastNetworkTemplate />
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
          The Podcast Network template uses the following bespoke design tokens:
        </p>
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
                ['#0f0d0b', 'Dark editorial black', 'Page background'],
                ['#f0ebe3', 'Warm cream', 'Primary text (dark mode)'],
                ['#8a7e72', 'Stone mid', 'Secondary text'],
                ['#524840', 'Stone dark', 'Tertiary text'],
                ['amber-400', 'Amber brand', 'CTAs, highlights, mini player'],
                ['#60a5fa', 'Blue accent', 'Technology shows'],
                ['#fb923c', 'Orange accent', 'Design shows'],
                ['#a78bfa', 'Purple accent', 'Culture shows'],
                ['#34d399', 'Green accent', 'Business shows'],
              ].map(([token, desc, usage]) => (
                <tr key={token} className="border-t border-[hsl(var(--border))]">
                  <td className="px-4 py-2 font-mono text-xs text-[hsl(var(--foreground))]">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-white/20"
                        style={{ backgroundColor: token.startsWith('#') ? token : undefined }}
                      />
                      {token}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-[hsl(var(--muted-foreground))]">{desc}</td>
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
          The template includes 8 composable sections that form a complete podcast network landing
          page:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-[hsl(var(--muted-foreground))]">
          <li><strong>Navbar</strong> — Sticky nav with search, Spotify follow, and subscribe CTA</li>
          <li><strong>Hero</strong> — Network showcase with animated show artwork stack</li>
          <li><strong>Featured Show</strong> — Spotlight with artwork, latest episode card, and play button</li>
          <li><strong>Show Grid</strong> — Filterable grid of all shows with category pills</li>
          <li><strong>Episodes Feed</strong> — Latest releases with inline play controls and waveform</li>
          <li><strong>Newsletter</strong> — Email capture with member benefit pills</li>
          <li><strong>About</strong> — Network manifesto, stats, and host avatar grid</li>
          <li><strong>Footer</strong> — Multi-column links and copyright</li>
          <li><strong>Mini Player</strong> — Persistent bottom bar with controls, waveform, and volume</li>
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
import { PodcastNetworkTemplate } from '@archui/react';

# Vue
import { PodcastNetworkTemplate } from '@archui/vue';`}</CodeBlock>
      </section>

      {/* Usage */}
      <section className="space-y-4">
        <h2
          id="usage"
          className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
        >
          Usage
        </h2>
        <CodeBlock>{`import { PodcastNetworkTemplate } from '@archui/react';

export default function PodcastPage() {
  return (
    <PodcastNetworkTemplate className="min-h-screen" />
  );
}`}</CodeBlock>
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
