import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

function CodeBlock({ code, language: _language = 'bash' }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4">
        <code className="text-sm text-[hsl(var(--foreground))]">{code}</code>
      </pre>
      <button
        onClick={copyCode}
        className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))]"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function Installation() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="installation" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          How to install dependencies and structure your app.
        </p>
      </div>

      <div className="space-y-4">
        <h2 id="requirements" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Requirements
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Before you begin, make sure you have the following installed:
        </p>
        <ul className="list-disc pl-6 text-[hsl(var(--muted-foreground))]">
          <li>Node.js 18+</li>
          <li>React 18+</li>
          <li>Tailwind CSS 4.0+ (or 3.4+)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 id="tailwind-setup" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Tailwind CSS Setup
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          First, install Tailwind CSS in your project:
        </p>
        <CodeBlock code="npm install -D tailwindcss @tailwindcss/vite" />
        <p className="mt-4 text-[hsl(var(--muted-foreground))]">
          Add Tailwind to your CSS file:
        </p>
        <CodeBlock code={`/* src/index.css */
@import "tailwindcss";`} language="css" />
      </div>

      <div className="space-y-4">
        <h2 id="dependencies" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Install Dependencies
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          ArchUI components use a few helper utilities. Install them:
        </p>
        <CodeBlock code="npm install class-variance-authority clsx tailwind-merge" />
      </div>

      <div className="space-y-4">
        <h2 id="token-styles" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Import Token Styles
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Add this one-time import in your app entrypoint so glass tokens resolve in light and dark themes:
        </p>
        <CodeBlock code={`// src/main.tsx (or src/main.js)
import '@archui/core/styles';`} language="typescript" />
      </div>

      <div className="space-y-4">
        <h2 id="utils" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Add Utility Functions
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Create a utility file for merging Tailwind classes:
        </p>
        <CodeBlock code={`// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`} language="typescript" />
      </div>

      <div className="space-y-4">
        <h2 id="adding-components" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Adding Components
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          Now you're ready to add components. Simply:
        </p>
        <ol className="list-decimal pl-6 text-[hsl(var(--muted-foreground))]">
          <li>Browse the components in the sidebar</li>
          <li>Copy the component code</li>
          <li>Paste it into your project (e.g., <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-sm">src/components/ui/</code>)</li>
          <li>Import and use the component</li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 id="project-structure" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Recommended Structure
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          We recommend organizing your components like this:
        </p>
        <CodeBlock code={`src/
├── components/
│   └── ui/
│       ├── glass-card.tsx
│       ├── glass-button.tsx
│       ├── glass-input.tsx
│       └── ...
├── lib/
│   └── utils.ts
└── ...`} language="text" />
      </div>
    </div>
  );
}
