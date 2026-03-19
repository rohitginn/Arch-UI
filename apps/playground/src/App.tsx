import { useState } from 'react';
import {
  GlassCard,
  GlassButton,
  GlassInput,
  GlassModal,
} from '@archui/react';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-gradient-mesh p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white">
            Arch<span className="text-blue-400">UI</span>
          </h1>
          <p className="text-xl text-white/60">
            Modern Glassmorphic UI Components for React
          </p>
        </header>

        {/* Glass Card Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Glass Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard variant="default" animated>
              <h3 className="text-lg font-semibold text-white mb-2">Default</h3>
              <p className="text-white/60 text-sm">
                Basic glass card with subtle hover effect.
              </p>
            </GlassCard>

            <GlassCard variant="elevated" animated>
              <h3 className="text-lg font-semibold text-white mb-2">Elevated</h3>
              <p className="text-white/60 text-sm">
                Glass card with elevated depth effect.
              </p>
            </GlassCard>

            <GlassCard variant="gradient" animated shine>
              <h3 className="text-lg font-semibold text-white mb-2">Gradient</h3>
              <p className="text-white/60 text-sm">
                Gradient glass with shine effect on hover.
              </p>
            </GlassCard>

            <GlassCard variant="glow" animated>
              <h3 className="text-lg font-semibold text-white mb-2">Glow</h3>
              <p className="text-white/60 text-sm">
                Glass card with ambient glow effect.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Glass Button Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Glass Button</h2>

          {/* Variants */}
          <div className="space-y-4">
            <h3 className="text-lg text-white/80">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <GlassButton variant="default">Default</GlassButton>
              <GlassButton variant="primary">Primary</GlassButton>
              <GlassButton variant="secondary">Secondary</GlassButton>
              <GlassButton variant="success">Success</GlassButton>
              <GlassButton variant="warning">Warning</GlassButton>
              <GlassButton variant="danger">Danger</GlassButton>
              <GlassButton variant="ghost">Ghost</GlassButton>
              <GlassButton variant="outline">Outline</GlassButton>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg text-white/80">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <GlassButton size="sm">Small</GlassButton>
              <GlassButton size="md">Medium</GlassButton>
              <GlassButton size="lg">Large</GlassButton>
              <GlassButton size="xl">Extra Large</GlassButton>
            </div>
          </div>

          {/* With Glow */}
          <div className="space-y-4">
            <h3 className="text-lg text-white/80">With Glow Effect</h3>
            <div className="flex flex-wrap gap-4">
              <GlassButton variant="primary" glow>Primary Glow</GlassButton>
              <GlassButton variant="success" glow>Success Glow</GlassButton>
              <GlassButton variant="danger" glow>Danger Glow</GlassButton>
            </div>
          </div>

          {/* States */}
          <div className="space-y-4">
            <h3 className="text-lg text-white/80">States</h3>
            <div className="flex flex-wrap gap-4">
              <GlassButton loading={loading} onClick={handleLoadingDemo}>
                {loading ? 'Loading...' : 'Click for Loading'}
              </GlassButton>
              <GlassButton disabled>Disabled</GlassButton>
              <GlassButton ripple variant="primary">
                With Ripple
              </GlassButton>
              <GlassButton magnetic variant="secondary">
                Magnetic Effect
              </GlassButton>
            </div>
          </div>
        </section>

        {/* Glass Input Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Glass Input</h2>

          <GlassCard className="max-w-md">
            <div className="space-y-4">
              <GlassInput
                label="Email"
                type="email"
                placeholder="Enter your email"
              />

              <GlassInput
                label="Password"
                type="password"
                variant="filled"
                placeholder="Enter your password"
              />

              <GlassInput
                label="Username"
                variant="glow"
                placeholder="Choose a username"
                helperText="This will be your public display name"
              />

              <GlassInput
                label="Bio"
                variant="outline"
                placeholder="Tell us about yourself"
                maxLength={100}
                showCount
              />

              <GlassInput
                label="Error Example"
                error="This field is required"
                placeholder="Required field"
              />
            </div>
          </GlassCard>
        </section>

        {/* Glass Modal Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Glass Modal</h2>

          <div className="flex gap-4">
            <GlassButton variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </GlassButton>
          </div>

          <GlassModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            title="Welcome to ArchUI"
            description="A modern glassmorphic UI component library"
            footer={
              <>
                <GlassButton variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </GlassButton>
                <GlassButton variant="primary" glow onClick={() => setIsModalOpen(false)}>
                  Continue
                </GlassButton>
              </>
            }
          >
            <div className="space-y-4">
              <p className="text-white/80">
                ArchUI provides beautiful glassmorphic components that work seamlessly
                with Tailwind CSS. All components are fully accessible and customizable.
              </p>
              <GlassInput
                label="Your Name"
                placeholder="Enter your name"
                variant="glow"
              />
            </div>
          </GlassModal>
        </section>

        {/* Feature Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard variant="gradient" animated shine>
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Premium Design
              </h3>
              <p className="text-white/60">
                World-class glassmorphic aesthetics inspired by top design agencies.
              </p>
            </GlassCard>

            <GlassCard variant="gradient" animated shine>
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Tailwind CSS
              </h3>
              <p className="text-white/60">
                Built entirely with Tailwind CSS for easy customization.
              </p>
            </GlassCard>

            <GlassCard variant="gradient" animated shine>
              <div className="text-3xl mb-4">♿</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Accessible
              </h3>
              <p className="text-white/60">
                WCAG 2.1 AA compliant with full keyboard navigation support.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-white/10">
          <p className="text-white/40">
            ArchUI v0.1.0 • Built with 💜 for the React community
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
