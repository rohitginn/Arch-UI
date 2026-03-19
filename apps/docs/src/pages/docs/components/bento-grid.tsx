import { BentoGrid } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

const bentoItems = [
  { title: 'Analytics', span: { cols: 1, rows: 1 } as const },
  { title: 'Dashboard', span: { cols: 2, rows: 1 } as const },
  { title: 'Performance', span: { cols: 1, rows: 2 } as const },
  { title: 'Reports' },
  { title: 'Insights' },
  { title: 'Integration', span: { cols: 2, rows: 2 } as const },
];

export function BentoGridDocs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="bento-grid" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Bento Grid
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          CSS Grid-based layout component with dynamic card sizing and positioning.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview code={`<BentoGrid items={items} />`}>
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
            <BentoGrid items={bentoItems} />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock
          code={`import { BentoGrid } from '@archui/react';

export default function Dashboard() {
  const items = [
    { id: 1, title: 'Analytics', span: '1x1' },
    { id: 2, title: 'Dashboard', span: '2x1' },
    { id: 3, title: 'Performance', span: '1x2' },
    { id: 4, title: 'Reports', span: '1x1' },
  ];

  return (
    <BentoGrid 
      items={items}
      columns={4}
      gap="medium"
      renderCard={(item) => (
        <div className="p-6 rounded-lg border">
          <h3>{item.title}</h3>
        </div>
      )}
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
            <code className="text-sm font-semibold">items</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Array of grid items with id, title, and span</p>
          </div>
          <div>
            <code className="text-sm font-semibold">columns</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Number of grid columns (default: 4)</p>
          </div>
          <div>
            <code className="text-sm font-semibold">gap</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Grid gap size: 'small' | 'medium' | 'large'</p>
          </div>
          <div>
            <code className="text-sm font-semibold">renderCard</code>
            <p className="text-sm text-gray-600 dark:text-gray-400">Custom render function for each card</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="span-sizes" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Grid Span Sizes
        </h2>
        <div className="border rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">Size</span>
            <span>Description</span>
          </div>
          <div className="flex justify-between text-sm border-t pt-2">
            <code>1x1</code>
            <span>Single column × single row</span>
          </div>
          <div className="flex justify-between text-sm">
            <code>2x1</code>
            <span>Two columns × single row (wide)</span>
          </div>
          <div className="flex justify-between text-sm">
            <code>1x2</code>
            <span>Single column × two rows (tall)</span>
          </div>
          <div className="flex justify-between text-sm">
            <code>2x2</code>
            <span>Two columns × two rows (large)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="features" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Features
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• CSS Grid-based layout</li>
          <li>• Flexible span positioning</li>
          <li>• Responsive column count</li>
          <li>• Customizable gap spacing</li>
          <li>• Custom card rendering</li>
          <li>• Glass morphism styling</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 id="use-cases" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Use Cases
        </h2>
        <ul className="space-y-1 text-sm">
          <li>• Dashboard layouts</li>
          <li>• Portfolio galleries</li>
          <li>• Product showcases</li>
          <li>• Feature highlights</li>
          <li>• Content masonry</li>
        </ul>
      </div>
    </div>
  );
}

export default BentoGridDocs;
