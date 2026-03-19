export default function ChangelogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 id="changelog" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Changelog
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Latest updates and announcements for ArchUI.
        </p>
      </div>

      <div className="space-y-8 mt-8">
        {/* Version 1.0.0 */}
        <div className="relative pl-6 border-l-2 border-[hsl(var(--border))]">
          <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-blue-500" />
          <div className="space-y-4">
            <div>
              <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                v1.0.0
              </span>
              <time className="ml-2 text-sm text-[hsl(var(--muted-foreground))]">
                January 2025
              </time>
            </div>
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Initial Release
            </h3>
            <ul className="list-disc list-inside space-y-2 text-[hsl(var(--muted-foreground))]">
              <li>13 glassmorphic UI components</li>
              <li>Full light and dark theme support</li>
              <li>TypeScript support with comprehensive types</li>
              <li>Tailwind CSS v4.1 integration</li>
              <li>CVA (class-variance-authority) for variants</li>
              <li>Monorepo structure with pnpm workspaces</li>
              <li>Tree-shakeable ESM and CJS builds</li>
            </ul>
          </div>
        </div>

        {/* Components Released */}
        <div className="relative pl-6 border-l-2 border-[hsl(var(--border))]">
          <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-[hsl(var(--muted))]" />
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
              Components Included
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-[hsl(var(--muted-foreground))]">
              <div>• Glass Card</div>
              <div>• Glass Button</div>
              <div>• Glass Input</div>
              <div>• Glass Modal</div>
              <div>• Glass Navigation</div>
              <div>• Glass Panel</div>
              <div>• Glass Dropdown</div>
              <div>• Glass Sidebar</div>
              <div>• Glass Textarea</div>
              <div>• Glass Select</div>
              <div>• Glass Checkbox</div>
              <div>• Glass Radio</div>
              <div>• Glass Switch</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
