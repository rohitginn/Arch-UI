import { useState } from 'react';
import { GlassStepper } from '@archui/react';
import { ComponentPreview } from '../../../components/component-preview';

const steps = [
    { label: 'Account', description: 'Create your account' },
    { label: 'Profile', description: 'Set up your profile' },
    { label: 'Preferences', description: 'Configure settings' },
    { label: 'Complete', description: 'Ready to go' },
];

export function GlassStepperDocs() {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">Glass Stepper</h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">A multi-step progress flow with translucent nodes, glowing accents, and animated connector lines.</p>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Preview</h2>
                <ComponentPreview
                    code={`<GlassStepper steps={steps} activeStep={1} onStepClick={setActiveStep} />`}
                    vueCode={`<GlassStepper :steps="steps" :active-step="1" @step-click="setActiveStep" />`}
                >
                    <div className="w-full space-y-6">
                        <GlassStepper steps={steps} activeStep={activeStep} onStepClick={setActiveStep} />
                        <div className="flex items-center justify-center gap-2">
                            <button
                                className="px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-white/60 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors disabled:opacity-30"
                                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                                disabled={activeStep <= 0}
                            >
                                Previous
                            </button>
                            <button
                                className="px-3 py-1.5 rounded-lg text-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors disabled:opacity-30"
                                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                                disabled={activeStep >= steps.length - 1}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </ComponentPreview>
            </div>
            <div className="space-y-4">
                <h2 className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">Props</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm">
                        <thead><tr className="border-b border-[hsl(var(--border))]"><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Prop</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Type</th><th className="py-3 pr-4 text-left font-semibold text-[hsl(var(--foreground))]">Default</th><th className="py-3 text-left font-semibold text-[hsl(var(--foreground))]">Description</th></tr></thead>
                        <tbody>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>steps</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">StepItem[]</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Step definitions</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>activeStep</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">number</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">0</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Currently active step (0-indexed)</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>orientation</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">'horizontal' | 'vertical'</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">'horizontal'</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Layout orientation</td></tr>
                            <tr className="border-b border-[hsl(var(--border))]"><td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onStepClick</code></td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">(index: number) =&gt; void</td><td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">—</td><td className="py-3 text-[hsl(var(--muted-foreground))]">Click-to-navigate callback</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
