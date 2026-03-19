import { useState } from 'react';
import { GlassAlertDialog, GlassButton } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassAlertDialogDocs() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-alert-dialog" className="scroll-m-20 text-4xl font-bold tracking-tight">
          Glass Alert Dialog
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Blocking confirmation dialog for destructive actions.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Preview
        </h2>
        <ComponentPreview 
          code={`<>
  <GlassButton onClick={() => setOpen(true)} variant="destructive">
    Delete
  </GlassButton>
  <GlassAlertDialog
    open={open}
    title="Delete project?"
    description="This action cannot be undone."
    confirmLabel="Delete"
    cancelLabel="Cancel"
    variant="danger"
    onConfirm={() => setOpen(false)}
    onCancel={() => setOpen(false)}
  />
</>`}
        >
          <>
            <GlassButton onClick={() => setOpen(true)} variant="danger">
              Delete
            </GlassButton>
            <GlassAlertDialog
              open={open}
              title="Delete project?"
              description="This action cannot be undone."
              confirmLabel="Delete"
              cancelLabel="Cancel"
              variant="danger"
              onConfirm={() => setOpen(false)}
              onCancel={() => setOpen(false)}
            />
          </>
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 id="usage" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Usage
        </h2>
        <CodeBlock 
          code={`import { GlassAlertDialog, GlassButton } from '@archui/react';
import { useState } from 'react';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlassButton onClick={() => setOpen(true)}>Confirm</GlassButton>
      <GlassAlertDialog
        open={open}
        title="Are you sure?"
        description="This cannot be undone."
        onConfirm={() => {
          // handle confirm
          setOpen(false);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
}`}
        />
      </div>

      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b pb-2 text-2xl font-semibold">
          Variants
        </h2>
        <div className="space-y-2 text-sm">
          <div>
            <strong>danger</strong> - Red button for destructive actions (default)
          </div>
          <div>
            <strong>warning</strong> - Amber button for warning actions
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlassAlertDialogDocs;
