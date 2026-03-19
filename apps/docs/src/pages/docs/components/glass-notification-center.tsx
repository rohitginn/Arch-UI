import { useState } from 'react';
import { GlassNotificationCenter, GlassButton } from '@archui/react';
import type { Notification } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

const sampleNotifications: Notification[] = [
    { id: '1', title: 'Deployment Complete', message: 'v2.4.1 deployed to production successfully.', timestamp: '2 min ago', type: 'success' },
    { id: '2', title: 'New Comment', message: 'Sarah left a comment on your pull request #421.', timestamp: '15 min ago', type: 'info' },
    { id: '3', title: 'Build Failed', message: 'CI pipeline failed on branch feature/auth.', timestamp: '1 hour ago', type: 'error', read: true },
    { id: '4', title: 'API Rate Limit', message: 'You are approaching your API rate limit (90%).', timestamp: '3 hours ago', type: 'warning', read: true },
];

export function GlassNotificationCenterDocs() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState(sampleNotifications);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Glass Notification Center</h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">A slide-in notification panel with glass layering, unread indicators, and mark-as-read interactions.</p>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Preview</h2>
                <ComponentPreview
                    code={`<GlassButton onClick={() => setOpen(true)}>Open Notifications</GlassButton>
<GlassNotificationCenter open={open} onOpenChange={setOpen} notifications={notifications} />`}
                    vueCode={`<GlassNotificationCenter v-model:open="open" :notifications="notifications" />`}
                >
                    <GlassButton onClick={() => setOpen(true)}>Open Notifications</GlassButton>
                    <GlassNotificationCenter
                        open={open}
                        onOpenChange={setOpen}
                        notifications={notifications}
                        onMarkRead={(id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))}
                        onDismiss={(id) => setNotifications((prev) => prev.filter((n) => n.id !== id))}
                        onMarkAllRead={() => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))}
                    />
                </ComponentPreview>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>open</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">boolean</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Controlled open state</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>notifications</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">Notification[]</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Array of notification objects</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onMarkRead</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(id: string) =&gt; void</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Called when a notification is read</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onDismiss</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(id: string) =&gt; void</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Called when a notification is dismissed</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onMarkAllRead</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">() =&gt; void</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Mark all notifications as read</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
