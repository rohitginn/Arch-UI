import { FooterDark } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const darkFooterData = {
  groups: [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
      ],
    },
  ],
  copyright: '© 2024 ZenLab. All rights reserved.',
};

export function FooterDarkDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="footer-dark" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Footer Dark
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Dark-themed footer that maintains dark appearance regardless of theme setting.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<FooterDark {...footerData} />`}>
          <div className="border rounded-lg overflow-hidden">
            <FooterDark {...darkFooterData} />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock
          code={`import { FooterDark } from '@archui/react';

export default function App() {
  return (
    <FooterDark
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
            <code className="text-sm font-semibold">columns</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Array of link column groups</p>
          </div>
          <div>
            <code className="text-sm font-semibold">copyright</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Copyright notice text</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="notes" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Notes
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          FooterDark forces a dark background (bg-zinc-950) with light text, regardless of the current theme setting. 
          Use this variant when you need a footer that always appears dark, such as on a light-themed page or as a design accent.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Features
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Forced dark background (bg-zinc-950)</li>
          <li>• High contrast light text</li>
          <li>• Multi-column layout</li>
          <li>• Theme-independent appearance</li>
          <li>• Glass morphism styling overlay</li>
        </ul>
      </div>
    </div>
  );
}

export default FooterDarkDocs;
