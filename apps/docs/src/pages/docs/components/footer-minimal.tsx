import { FooterMinimal } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const minimalFooterData = {
  links: [
    { label: 'Docs', href: '#' },
    { label: 'API', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Status', href: '#' },
  ],
  copyright: '© 2024 ZenLab. All rights reserved.',
};

export function FooterMinimalDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="footer-minimal" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Footer Minimal
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Compact single-row footer with logo, navigation, and social links.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<FooterMinimal {...footerData} />`}>
          <div className="border rounded-lg overflow-hidden">
            <FooterMinimal {...minimalFooterData} />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock
          code={`import { FooterMinimal } from '@archui/react';

export default function App() {
  return (
    <FooterMinimal
      logo={{ text: 'Brand', href: '/' }}
      links={[
        { label: 'Docs', href: '/docs' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ]}
      socialLinks={[
        { label: 'Twitter', href: 'https://twitter.com' },
        { label: 'GitHub', href: 'https://github.com' },
      ]}
      copyright="© 2024 Brand. All rights reserved."
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
            <code className="text-sm font-semibold">logo</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Logo text and href</p>
          </div>
          <div>
            <code className="text-sm font-semibold">links</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Array of navigation links (label, href)</p>
          </div>
          <div>
            <code className="text-sm font-semibold">socialLinks</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Array of social media links</p>
          </div>
          <div>
            <code className="text-sm font-semibold">copyright</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Copyright notice text</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="use-cases" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Use Cases
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• SaaS dashboards and admin panels</li>
          <li>• Web applications with minimal footer needs</li>
          <li>• Documentation sites</li>
          <li>• Internal tools and platforms</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Features
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Horizontal single-row layout</li>
          <li>• Logo positioned left</li>
          <li>• Navigation links centered</li>
          <li>• Social links aligned right</li>
          <li>• Responsive design</li>
          <li>• Glass morphism styling</li>
        </ul>
      </div>
    </div>
  );
}

export default FooterMinimalDocs;
