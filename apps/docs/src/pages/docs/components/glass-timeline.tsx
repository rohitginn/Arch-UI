import { GlassTimeline } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

const events = [
    { id: '1', title: 'Project Created', description: 'Repository initialized with base configuration.', timestamp: 'Jan 10', status: 'completed' as const },
    { id: '2', title: 'Design System Setup', description: 'Token system and core components established.', timestamp: 'Jan 15', status: 'completed' as const },
    { id: '3', title: 'Component Development', description: 'Building glassmorphic component library.', timestamp: 'Jan 20', status: 'active' as const },
    { id: '4', title: 'Testing & QA', description: 'Comprehensive testing and quality assurance.', timestamp: 'Jan 25', status: 'pending' as const },
    { id: '5', title: 'Production Release', description: 'Deploy to npm registry.', timestamp: 'Feb 1', status: 'pending' as const },
];

export function GlassTimelineDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Glass Timeline</h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">A chronological event timeline with frosted glass cards, glowing connectors, and status-aware indicators.</p>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Preview</h2>
                <ComponentPreview
                    code={`<GlassTimeline events={events} />`}
                    vueCode={`<GlassTimeline :events="events" />`}
                >
                    <div className="max-w-md w-full"><GlassTimeline events={events} /></div>
                </ComponentPreview>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>events</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">TimelineEvent[]</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Array of timeline events</td></tr>
                        </tbody>
                    </table>
                </div>
                <h3 className="scroll-m-20 text-lg font-semibold tracking-tight text-[hsl(var(--foreground))]">TimelineEvent Type</h3>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Field</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>id</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Unique identifier</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>title</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Event title</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>status</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">'completed' | 'active' | 'pending' | 'error'</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Event status</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>timestamp</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">string</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Timestamp label</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
