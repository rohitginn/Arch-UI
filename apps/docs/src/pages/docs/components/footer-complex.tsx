import { FooterComplex } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const footerData = {
  groups: [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Docs', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Community', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'License', href: '#' },
      ],
    },
  ],
  newsletterHeading: 'Stay updated',
  newsletterDescription: 'Get the latest news delivered to your inbox.',
  copyright: '© 2024 ZenLab. All rights reserved.',
};

export function FooterComplexDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="footer-complex" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Footer Complex
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Multi-column footer with logo, link groups, and newsletter subscription.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<FooterComplex {...footerData} />`}>
          <div className="border rounded-lg overflow-hidden">
            <FooterComplex {...footerData} />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock
          code={`import { FooterComplex } from '@archui/react';

export default function App() {
  return (
    <FooterComplex
      logo={{ text: 'Brand', href: '/' }}
      columns={[
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '/features' },
            { label: 'Pricing', href: '/pricing' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Blog', href: '/blog' },
          ],
        },
      ]}
      newsletter={{
        title: 'Subscribe',
        description: 'Get updates delivered to your inbox.',
        buttonText: 'Sign up',
      }}
      socialLinks={[
        { label: 'Twitter', href: '#' },
        { label: 'GitHub', href: '#' },
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
            <p className="text-sm text-gray-600 dark:text-gray-400">Logo text, href</p>
          </div>
          <div>
            <code className="text-sm font-semibold">columns</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Array of link column groups (title + links array)</p>
          </div>
          <div>
            <code className="text-sm font-semibold">newsletter</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Newsletter section (title, description, buttonText)</p>
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
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Features
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Multi-column layout with customizable link groups</li>
          <li>• Built-in newsletter subscription section</li>
          <li>• Social media links display</li>
          <li>• Responsive grid layout</li>
          <li>• Glass morphism styling with dark/light theme support</li>
        </ul>
      </div>
    </div>
  );
}

export default FooterComplexDocs;
