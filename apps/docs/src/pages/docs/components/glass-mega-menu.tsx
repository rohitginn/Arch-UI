import { GlassMegaMenu } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassMegaMenuDocs() {
  const sections = [
    {
      label: 'Products',
      columns: [
        {
          title: 'Platform',
          items: [
            { label: 'Overview', href: '#overview' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'Features', href: '#features' },
          ],
        },
        {
          title: 'Resources',
          items: [
            { label: 'Documentation', href: '#docs' },
            { label: 'API Reference', href: '#api' },
          ],
        },
      ],
      featured: {
        title: 'New: AI Agents',
        description: 'Automate your workflows',
        href: '#agents',
      },
    },
    {
      label: 'Solutions',
      columns: [
        {
          title: 'For Enterprise',
          items: [
            { label: 'Large Teams', href: '#teams' },
            { label: 'Security', href: '#security' },
          ],
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-mega-menu" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Mega Menu
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Wide dropdown navigation panel for marketing sites with link columns and featured cards.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassMegaMenu sections={sections} />`}
        >
          <div className="w-full">
            <GlassMegaMenu sections={sections} />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassMegaMenu } from '@archui/react';

const sections = [
  {
    label: 'Products',
    columns: [
      {
        title: 'Platform',
        items: [
          { label: 'Overview', href: '/overview' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
    ],
    featured: {
      title: 'New Feature',
      description: 'Check it out',
      href: '/new',
    },
  },
];

export default function Example() {
  return <GlassMegaMenu sections={sections} />;
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="structure" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Menu Structure
        </h2>
        <div className="space-y-2 text-sm">
          <div>Each section has:</div>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>label</strong> - Trigger text</li>
            <li><strong>columns</strong> - Array of link columns</li>
            <li><strong>featured</strong> (optional) - Featured card on the right</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GlassMegaMenuDocs;
