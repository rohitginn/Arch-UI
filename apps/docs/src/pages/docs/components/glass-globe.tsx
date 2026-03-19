import { GlassGlobe } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassGlobeDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-globe" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Globe
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A lightweight, interactive 3D globe with glassmorphic styling, draggable rotation, and custom markers.
                </p>
            </div>

            {/* Ambient Mode (Playground) */}
            <div className="space-y-4">
                <h2 id="ambient-mode" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Ambient Mode
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                    A premium, minimal globe that automatically adapts to your theme (Light/Dark). It supports connections, markers, and smooth interaction.
                </p>
                <ComponentPreview
                    code={`<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background px-20 pb-20 pt-8 ">
  <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
    Globe
  </span>
  
  <GlassGlobe 
    variant="plain"
    className="top-20 z-10"
    markers={[
        { location: [40.7128, -74.0060], size: 0.1 }, // New York
        { location: [51.5074, -0.1278], size: 0.1 }, // London
    ]}
    connections={[
       { start: [40.7128, -74.0060], end: [51.5074, -0.1278] }
    ]}
  />
  
  <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
</div>`}
                    vueCode={`<div class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-background px-20 pb-20 pt-8 ">
  <span class="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
    Globe
  </span>
  
  <GlassGlobe 
    variant="plain"
    class="top-20 z-10"
    :markers="[
        { location: [40.7128, -74.0060], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.1 },
    ]"
    :connections="[
       { start: [40.7128, -74.0060], end: [51.5074, -0.1278] }
    ]"
  />
  
  <div class="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
</div>`}
                >
                    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-white dark:bg-slate-950 px-20 pb-20 pt-8 shadow-2xl border border-slate-200 dark:border-slate-800 transition-colors duration-500">
                        <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-slate-900 to-slate-500/80 dark:from-white dark:to-white/10 bg-clip-text text-center text-7xl font-bold leading-none text-transparent">
                            Ambient
                        </span>

                        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

                        <GlassGlobe
                            variant="plain"
                            className="translate-y-24 z-0 scale-125"
                            markers={[
                                { location: [40.7128, -74.0060], size: 0.05 }, // New York
                                { location: [51.5074, -0.1278], size: 0.05 }, // London
                            ]}
                            connections={[
                                { start: [40.7128, -74.0060], end: [51.5074, -0.1278] }
                            ]}
                        />
                    </div>
                </ComponentPreview>
            </div>

            {/* Installation */}
            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`npm install cobe`}
                    vueCode={`npm install cobe`}
                />
            </div>

            {/* Props */}
            <div className="space-y-4">
                <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Props
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th>
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th>
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Default</th>
                                <th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>markers</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">Marker[]</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">[]</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Array of markers {`{ location: [lat, long], size: number }`}</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>connections</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">Connection[]</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">[]</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Array of connections {`{ start: [lat, long], end: [lat, long] }`}</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>variant</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"glass" | "plain"</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"glass"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Container style variant. "plain" is for ambient embedding.</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>globeConfig</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">object</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">defaultConfig</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Configuration object for `cobe` (colors, size, etc.). Auto-adapts to theme if omitted.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
