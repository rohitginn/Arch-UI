import { CallToActionBanner } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function CallToActionBannerDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="cta-banner" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Call to Action Banner
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Full-width promotional banner with heading, description, and action buttons.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<CallToActionBanner heading="Ready to get started?" description="Join thousands of users today" buttons={[...]} />`}>
          <div className="border rounded-lg overflow-hidden">
            <CallToActionBanner
              heading="Ready to get started?"
              subheading="Join thousands of users today with our powerful tools"
              primaryAction={
                <a href="#" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-white text-neutral-900 font-semibold text-sm hover:bg-neutral-100 transition-colors">
                  Get Started
                </a>
              }
              secondaryAction={
                <a href="#" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors">
                  Learn More
                </a>
              }
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock
          code={`import { CallToActionBanner } from '@archui/react';

export default function App() {
  return (
    <CallToActionBanner
      heading="Transform Your Workflow"
      description="Experience the power of modern tools designed for teams"
      buttons={[
        { label: 'Start Free Trial', href: '/signup', variant: 'default' },
        { label: 'View Pricing', href: '/pricing', variant: 'outline' },
      ]}
      backgroundImage="url('/banner-bg.jpg')"
    />
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="api" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          API
        </h2>
        <div className="border rounded-lg p-4 space-y-3">
          <div>
            <code className="text-sm font-semibold">heading</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Main banner heading text</p>
          </div>
          <div>
            <code className="text-sm font-semibold">description</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Supporting description text</p>
          </div>
          <div>
            <code className="text-sm font-semibold">buttons</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Array of CTA buttons (label, href, variant)</p>
          </div>
          <div>
            <code className="text-sm font-semibold">backgroundImage</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Optional background image URL</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Features
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Full-width responsive layout</li>
          <li>• Multiple action buttons</li>
          <li>• Optional background image or gradient</li>
          <li>• Centered text alignment</li>
          <li>• Glass morphism styling</li>
          <li>• Dark/light theme support</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 id="use-cases" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Use Cases
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Marketing landing pages</li>
          <li>• End-of-page conversions</li>
          <li>• Newsletter signup prompts</li>
          <li>• Feature announcements</li>
          <li>• Time-limited offers</li>
        </ul>
      </div>
    </div>
  );
}

export default CallToActionBannerDocs;
