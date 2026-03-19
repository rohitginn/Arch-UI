import { GlassCommandBar } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassCommandBarDocs() {
  const actions = [
    {
      id: 'delete',
      label: 'Delete',
      shortcut: ['Del'],
      onClick: () => console.log('delete'),
    },
    {
      id: 'copy',
      label: 'Copy',
      shortcut: ['⌘', 'C'],
      onClick: () => console.log('copy'),
    },
    {
      id: 'paste',
      label: 'Paste',
      shortcut: ['⌘', 'V'],
      onClick: () => console.log('paste'),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-command-bar" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Command Bar
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Persistent floating toolbar for power-user shortcuts and quick actions.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassCommandBar 
  context="3 items selected"
  actions={actions}
  position="bottom"
  onAction={(id) => console.log('Action:', id)}
/>`}
        >
          <div className="relative h-24">
            <GlassCommandBar 
              context="3 items selected"
              actions={actions}
              position="bottom"
            />
          </div>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassCommandBar } from '@archui/react';

export default function Example() {
  const actions = [
    {
      id: 'action1',
      label: 'Delete',
      shortcut: ['Del'],
    },
    {
      id: 'action2',
      label: 'Export',
      shortcut: ['⌘', 'E'],
    },
  ];

  return (
    <GlassCommandBar 
      context="2 items selected"
      actions={actions}
      onAction={(id) => {
        console.log('Clicked:', id);
      }}
    />
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="positions" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Positions
        </h2>
        <div className="space-y-2 text-sm">
          <div>
            <strong>bottom</strong> - Fixed to bottom of viewport (default)
          </div>
          <div>
            <strong>top</strong> - Fixed to top of viewport
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 id="action-structure" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Action Structure
        </h2>
        <div className="space-y-2 text-sm">
          <div>Each action includes:</div>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><strong>id</strong> - Unique identifier</li>
            <li><strong>label</strong> - Display text</li>
            <li><strong>shortcut</strong> (optional) - Array of shortcut keys</li>
            <li><strong>disabled</strong> (optional) - Disable action</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GlassCommandBarDocs;
