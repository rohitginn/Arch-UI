import { GlassSignupForm } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassSignupFormDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-signup-form" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Sign Up Form
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A premium sign-up form component with glassmorphic styling, robust social login options, and integrated validation micro-interactions.
                </p>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<GlassSignupForm 
  title="Create an account"
  subtitle="Enter your details to get started"
  onSignIn={() => console.log('Sign in')}
  onSubmit={(data) => console.log(data)}
/>`}
                    vueCode={`<GlassSignupForm 
  title="Create an account"
  subtitle="Enter your details to get started"
  @sign-in="onSignIn"
  @submit="onSubmit"
/>`}
                >
                    <div className="w-full max-w-md mx-auto py-10 relative">
                        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
                        <GlassSignupForm
                            title="Create an account"
                            subtitle="Enter your details to get started"
                            onSignIn={() => console.log('Sign in')}
                            onSubmit={(data) => console.log(data)}
                            className="relative z-10"
                        />
                    </div>
                </ComponentPreview>
            </div>

            {/* Installation */}
            <div className="space-y-4">
                <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Installation
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                    Install the package via your preferred package manager:
                </p>
                <CodeBlock
                    code={`npm install @archui/react
# or
pnpm add @archui/react`}
                    vueCode={`npm install @archui/vue
# or
pnpm add @archui/vue`}
                />
            </div>

            {/* Usage */}
            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <CodeBlock
                    code={`import { GlassSignupForm } from '@archui/react';

export default function SignupPage() {
  const handleSignup = (data) => {
    console.log('Signup data:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassSignupForm 
        onSubmit={handleSignup}
        onSignIn={() => console.log('Sign in')}
      />
    </div>
  );
}`}
                    vueCode={`<script setup>
import { GlassSignupForm } from '@archui/vue';

const handleSignup = (data) => {
  console.log('Signup data:', data);
};
</script>

<template>
  <div className="min-h-screen flex items-center justify-center p-4">
    <GlassSignupForm 
      @submit="handleSignup"
      @sign-in="() => {}"
    />
  </div>
</template>`}
                />
            </div>

            {/* Variants */}
            <div className="space-y-4">
                <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Examples
                </h2>

                <h3 className="text-xl font-semibold mt-6 mb-2">Vertical Social Layout</h3>
                <ComponentPreview
                    code={`<GlassSignupForm 
  socialLayout="vertical"
  title="Join us today"
  subtitle="One step closer to greatness"
/>`}
                >
                    <div className="w-full max-w-md mx-auto py-10 relative">
                        <GlassSignupForm
                            socialLayout="vertical"
                            title="Join us today"
                            subtitle="One step closer to greatness"
                        />
                    </div>
                </ComponentPreview>

                <h3 className="text-xl font-semibold mt-6 mb-2">Loading State</h3>
                <ComponentPreview
                    code={`<GlassSignupForm 
  loading={true}
  title="Creating account..."
/>`}
                >
                    <div className="w-full max-w-md mx-auto py-10 relative">
                        <GlassSignupForm
                            loading={true}
                            title="Creating account..."
                        />
                    </div>
                </ComponentPreview>
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
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onSubmit</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>(data: any) ={'>'} void</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Callback when form is submitted</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onSignIn</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>() ={'>'} void</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Callback for sign in link</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>title</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>string</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"Create an account"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Form title</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>subtitle</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>string</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"Enter your details..."</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Form subtitle</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>socialLayout</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>'horizontal' | 'vertical'</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"horizontal"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Layout direction for social buttons</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>loading</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>boolean</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">false</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Show loading state on submit button</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
