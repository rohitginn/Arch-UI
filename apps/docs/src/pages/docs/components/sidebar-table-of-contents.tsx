import { SidebarTableOfContents } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const headings = [
  { id: 'intro', label: 'Introduction', depth: 2 },
  { id: 'getting-started', label: 'Getting Started', depth: 2 },
  { id: 'installation', label: 'Installation', depth: 3 },
  { id: 'basic-setup', label: 'Basic Setup', depth: 3 },
  { id: 'advanced', label: 'Advanced Usage', depth: 2 },
  { id: 'api', label: 'API Reference', depth: 2 },
];

export function SidebarTableOfContentsDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="sidebar-toc" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Sidebar Table of Contents
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Sticky sidebar showing document heading hierarchy with active highlighting.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<SidebarTableOfContents headings={headings} />`}>
          <div className="border rounded-lg p-4 h-96 overflow-auto">
            <SidebarTableOfContents headings={headings} />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { SidebarTableOfContents } from '@archui/react';

export default function Article() {
  const headings = [
    { id: 'intro', label: 'Introduction', depth: 2 },
    { id: 'guide', label: 'Getting Started', depth: 2 },
    { id: 'install', label: 'Installation', depth: 3 },
  ];

  return (
    <div className="flex gap-8">
      <main className="flex-1">
        <h2 id="intro">Introduction</h2>
        {/* content */}
      </main>
      <aside>
        <SidebarTableOfContents headings={headings} />
      </aside>
    </div>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Features
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• IntersectionObserver-based active heading tracking</li>
          <li>• Smooth scroll to heading on click</li>
          <li>• Heading depth indentation</li>
          <li>• Sticky positioning</li>
        </ul>
      </div>
    </div>
  );
}

export default SidebarTableOfContentsDocs;
