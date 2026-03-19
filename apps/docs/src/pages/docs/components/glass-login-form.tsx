import { GlassLoginForm } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassLoginFormDocs() {
    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-login-form" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Login Form
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A premium login form component with glassmorphic styling, social login support, and integrated validation.
                </p>
            </div>

            {/* Preview */}
            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview
                    code={`<GlassLoginForm 
  title="Welcome Back"
  subtitle="Sign in to your account"
  onForgotPassword={() => console.log('Forgot password')}
  onSignUp={() => console.log('Sign up')}
  onSubmit={(data) => console.log(data)}
/>`}
                    vueCode={`<GlassLoginForm 
  title="Welcome Back"
  subtitle="Sign in to your account"
  @forgot-password="onForgotPassword"
  @sign-up="onSignUp"
  @submit="onSubmit"
/>`}
                >
                    <div className="w-full max-w-md mx-auto py-10">
                        <GlassLoginForm
                            title="Welcome Back"
                            subtitle="Sign in to your account"
                            onForgotPassword={() => console.log('Forgot password')}
                            onSignUp={() => console.log('Sign up')}
                            onSubmit={(data) => console.log(data)}
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
                    code={`import { GlassLoginForm } from '@archui/react';

export default function LoginPage() {
  const handleLogin = (data) => {
    console.log('Login data:', data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <GlassLoginForm 
        onSubmit={handleLogin}
        onForgotPassword={() => console.log('Forgot password')}
        onSignUp={() => console.log('Sign up')}
      />
    </div>
  );
}`}
                    vueCode={`<script setup>
import { GlassLoginForm } from '@archui/vue';

const handleLogin = (data) => {
  console.log('Login data:', data);
};
</script>

<template>
  <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
    <GlassLoginForm 
      @submit="handleLogin"
      @forgot-password="() => {}"
      @sign-up="() => {}"
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
                    code={`<GlassLoginForm 
  socialLayout="vertical"
  title="Sign In"
  subtitle="Access your dashboard"
  variant="glow"
/>`}
                >
                    <div className="w-full max-w-md mx-auto py-10">
                        <GlassLoginForm
                            socialLayout="vertical"
                        />
                    </div>
                </ComponentPreview>

                <h3 className="text-xl font-semibold mt-6 mb-2">Loading State</h3>
                <ComponentPreview
                    code={`<GlassLoginForm 
  loading={true}
  title="Signing In..."
/>`}
                >
                    <div className="w-full max-w-md mx-auto py-10">
                        <GlassLoginForm
                            loading={true}
                            title="Signing In..."
                        />
                    </div>
                </ComponentPreview>

                <h3 className="text-xl font-semibold mt-6 mb-2">Split Screen Layout</h3>
                <ComponentPreview
                    code={`<div className="grid lg:grid-cols-2 min-h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
  <div className="relative hidden lg:flex flex-col justify-center items-center bg-zinc-900 p-10 overflow-hidden text-center">
    <div className="absolute top-0 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl mix-blend-screen pointer-events-none"></div>
    <div className="relative z-10 space-y-4">
      <h2 className="text-4xl font-bold text-white tracking-tight">ArchUI Design System</h2>
      <p className="text-lg text-zinc-400 max-w-md mx-auto">Build premium, glassmorphic interfaces that wow your users instantly.</p>
    </div>
  </div>
  <div className="flex items-center justify-center p-8 bg-black/5 backdrop-blur-3xl dark:bg-black/40">
    <GlassLoginForm 
      title="Welcome Back"
      subtitle="Sign in to your workspace"
      className="border-none shadow-none bg-transparent dark:bg-transparent"
    />
  </div>
</div>`}
                >
                    <div className="grid lg:grid-cols-2 min-h-[600px] w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                        <div className="relative hidden lg:flex flex-col justify-center items-center bg-zinc-900 p-10 overflow-hidden text-center">
                            <div className="absolute top-0 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl mix-blend-screen pointer-events-none"></div>
                            <div className="relative z-10 space-y-4">
                                <h2 className="text-4xl font-bold text-white tracking-tight">ArchUI Design System</h2>
                                <p className="text-lg text-zinc-400 max-w-md mx-auto">Build premium, glassmorphic interfaces that wow your users instantly.</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-8 bg-black/5 backdrop-blur-3xl dark:bg-black/40 relative">
                            {/* Micro-interaction ambient background */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50 pointer-events-none"></div>
                            <div className="relative z-10 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                                <GlassLoginForm
                                    title="Welcome Back"
                                    subtitle="Sign in to your workspace"
                                    className="border-none shadow-none bg-transparent dark:bg-transparent"
                                />
                            </div>
                        </div>
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
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onForgotPassword</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>() ={'>'} void</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Callback for forgot password link</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>onSignUp</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>() ={'>'} void</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">-</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Callback for sign up link</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>title</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>string</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"Welcome Back"</td>
                                <td className="py-3 text-[hsl(var(--muted-foreground))]">Form title</td>
                            </tr>
                            <tr className="border-b border-[hsl(var(--border))]">
                                <td className="py-3 pr-4 text-[hsl(var(--foreground))]"><code>subtitle</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]"><code>string</code></td>
                                <td className="py-3 pr-4 text-[hsl(var(--muted-foreground))]">"Sign in..."</td>
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
