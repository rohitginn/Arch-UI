import { GlassDock, GlassDockItem } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';
import { Home, Search, Bell, User } from 'lucide-react';

export function GlassDockDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-dock" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Dock
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A macOS-inspired floating dock with glassmorphic styling. Perfect for creating bottom navigation bars.
                </p>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<GlassDock className="w-fit">
  <GlassDockItem active>
    <Home className="h-5 w-5" />
  </GlassDockItem>
  <GlassDockItem>
    <Search className="h-5 w-5" />
  </GlassDockItem>
  <GlassDockItem>
    <Bell className="h-5 w-5" />
  </GlassDockItem>
  <GlassDockItem>
    <User className="h-5 w-5" />
  </GlassDockItem>
</GlassDock>`}
                    vueCode={`<GlassDock class="w-fit">
  <GlassDockItem :active="true">
    <HomeIcon class="h-5 w-5" />
  </GlassDockItem>
  <GlassDockItem>
    <SearchIcon class="h-5 w-5" />
  </GlassDockItem>
</GlassDock>`}
                >
                    <GlassDock className="w-fit">
                        <GlassDockItem active>
                            <Home className="h-5 w-5 text-slate-700 dark:text-white/90" />
                        </GlassDockItem>
                        <GlassDockItem>
                            <Search className="h-5 w-5 text-slate-700 dark:text-white/90" />
                        </GlassDockItem>
                        <GlassDockItem>
                            <Bell className="h-5 w-5 text-slate-700 dark:text-white/90" />
                        </GlassDockItem>
                        <GlassDockItem>
                            <User className="h-5 w-5 text-slate-700 dark:text-white/90" />
                        </GlassDockItem>
                    </GlassDock>
                </ComponentPreview>
            </div>

            {/* Installation */}
            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <CodeBlock
                    code={`import { GlassDock, GlassDockItem } from '@archui/react';`}
                    vueCode={`import { GlassDock, GlassDockItem } from '@archui/vue';`}
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
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Component</th>
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th>
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th>
                                <th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Default</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]">GlassDockItem</td>
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>active</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
