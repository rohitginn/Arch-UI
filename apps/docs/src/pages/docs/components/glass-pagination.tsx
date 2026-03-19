import { useState } from 'react';
import { 
  GlassPagination,
  GlassPaginationContent,
  GlassPaginationItem,
  GlassPaginationLink,
  GlassPaginationPrevious,
  GlassPaginationNext,
  GlassPaginationEllipsis
} from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassPaginationDocs() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="space-y-6">
      <div>
        <h1 id="glass-pagination" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
          Glass Pagination
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          A navigation component for paginating through content with multiple pages.
        </p>
      </div>

      {/* Preview */}
      <div className="space-y-4">
        <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Preview
        </h2>
        <ComponentPreview 
          code={`<GlassPagination>
  <GlassPaginationContent>
    <GlassPaginationItem>
      <GlassPaginationPrevious href="#" />
    </GlassPaginationItem>
    <GlassPaginationItem>
      <GlassPaginationLink href="#" isActive>1</GlassPaginationLink>
    </GlassPaginationItem>
    <GlassPaginationItem>
      <GlassPaginationLink href="#">2</GlassPaginationLink>
    </GlassPaginationItem>
    <GlassPaginationItem>
      <GlassPaginationLink href="#">3</GlassPaginationLink>
    </GlassPaginationItem>
    <GlassPaginationItem>
      <GlassPaginationEllipsis />
    </GlassPaginationItem>
    <GlassPaginationItem>
      <GlassPaginationNext href="#" />
    </GlassPaginationItem>
  </GlassPaginationContent>
</GlassPagination>`}
          vueCode={`<template>
  <GlassPagination>
    <GlassPaginationContent>
      <GlassPaginationPrevious href="#" />
      <GlassPaginationLink href="#" :isActive="true">1</GlassPaginationLink>
      <GlassPaginationLink href="#">2</GlassPaginationLink>
      <GlassPaginationNext href="#" />
    </GlassPaginationContent>
  </GlassPagination>
</template>`}
        >
          <GlassPagination>
            <GlassPaginationContent>
              <GlassPaginationItem>
                <GlassPaginationPrevious href="#" />
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#" isActive>1</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#">2</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#">3</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationEllipsis />
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#">10</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationNext href="#" />
              </GlassPaginationItem>
            </GlassPaginationContent>
          </GlassPagination>
        </ComponentPreview>
      </div>

      {/* Installation */}
      <div className="space-y-4">
        <h2 id="installation" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Installation
        </h2>
        <CodeBlock 
          code={`npm install @archui/react`}
          vueCode={`npm install @archui/vue`}
        />
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h2 id="variants" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Variants
        </h2>
        <ComponentPreview 
          code={`<GlassPagination variant="default">...</GlassPagination>
<GlassPagination variant="outline">...</GlassPagination>
<GlassPagination variant="ghost">...</GlassPagination>
<GlassPagination variant="glass">...</GlassPagination>`}
          vueCode={`<GlassPagination variant="glass">...</GlassPagination>`}
        >
          <div className="w-full space-y-6">
            {(['default', 'outline', 'ghost', 'glass'] as const).map((variant) => (
              <div key={variant}>
                <p className="text-xs text-slate-500 mb-2">variant="{variant}"</p>
                <GlassPagination variant={variant}>
                  <GlassPaginationContent>
                    <GlassPaginationItem>
                      <GlassPaginationPrevious href="#" />
                    </GlassPaginationItem>
                    <GlassPaginationItem>
                      <GlassPaginationLink href="#" isActive>1</GlassPaginationLink>
                    </GlassPaginationItem>
                    <GlassPaginationItem>
                      <GlassPaginationLink href="#">2</GlassPaginationLink>
                    </GlassPaginationItem>
                    <GlassPaginationItem>
                      <GlassPaginationLink href="#">3</GlassPaginationLink>
                    </GlassPaginationItem>
                    <GlassPaginationItem>
                      <GlassPaginationNext href="#" />
                    </GlassPaginationItem>
                  </GlassPaginationContent>
                </GlassPagination>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h2 id="sizes" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Sizes
        </h2>
        <ComponentPreview 
          code={`<GlassPagination size="sm">...</GlassPagination>
<GlassPagination size="md">...</GlassPagination>
<GlassPagination size="lg">...</GlassPagination>`}
          vueCode={`<GlassPagination size="lg">...</GlassPagination>`}
        >
          <div className="w-full space-y-6">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <div key={size}>
                <p className="text-xs text-slate-500 mb-2">size="{size}"</p>
                <GlassPagination size={size}>
                  <GlassPaginationContent>
                    <GlassPaginationItem>
                      <GlassPaginationPrevious href="#" />
                    </GlassPaginationItem>
                    <GlassPaginationItem>
                      <GlassPaginationLink href="#" isActive>1</GlassPaginationLink>
                    </GlassPaginationItem>
                    <GlassPaginationItem>
                      <GlassPaginationLink href="#">2</GlassPaginationLink>
                    </GlassPaginationItem>
                    <GlassPaginationItem>
                      <GlassPaginationLink href="#">3</GlassPaginationLink>
                    </GlassPaginationItem>
                    <GlassPaginationItem>
                      <GlassPaginationNext href="#" />
                    </GlassPaginationItem>
                  </GlassPaginationContent>
                </GlassPagination>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </div>

      {/* With Ellipsis */}
      <div className="space-y-4">
        <h2 id="with-ellipsis" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          With Ellipsis
        </h2>
        <ComponentPreview 
          code={`<GlassPagination>
  <GlassPaginationContent>
    <GlassPaginationPrevious href="#" />
    <GlassPaginationLink href="#">1</GlassPaginationLink>
    <GlassPaginationEllipsis />
    <GlassPaginationLink href="#">4</GlassPaginationLink>
    <GlassPaginationLink href="#" isActive>5</GlassPaginationLink>
    <GlassPaginationLink href="#">6</GlassPaginationLink>
    <GlassPaginationEllipsis />
    <GlassPaginationLink href="#">10</GlassPaginationLink>
    <GlassPaginationNext href="#" />
  </GlassPaginationContent>
</GlassPagination>`}
          vueCode={`<GlassPaginationEllipsis />`}
        >
          <GlassPagination>
            <GlassPaginationContent>
              <GlassPaginationItem>
                <GlassPaginationPrevious href="#" />
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#">1</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationEllipsis />
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#">4</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#" isActive>5</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#">6</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationEllipsis />
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationLink href="#">10</GlassPaginationLink>
              </GlassPaginationItem>
              <GlassPaginationItem>
                <GlassPaginationNext href="#" />
              </GlassPaginationItem>
            </GlassPaginationContent>
          </GlassPagination>
        </ComponentPreview>
      </div>

      {/* usePagination Hook */}
      <div className="space-y-4">
        <h2 id="use-pagination" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          usePagination Hook
        </h2>
        <p className="text-[hsl(var(--muted-foreground))]">
          The <code>usePagination</code> hook provides computed pagination state including page ranges with ellipsis.
        </p>
        <CodeBlock 
          code={`const {
  currentPage,
  totalPages,
  setPage,
  nextPage,
  prevPage,
  canGoNext,
  canGoPrev,
  pageRange,  // Array of page numbers with ellipsis markers
} = usePagination({
  total: 100,      // Total items
  pageSize: 10,    // Items per page
  initialPage: 1,  // Starting page
  siblingCount: 1  // Pages shown around current
});

// pageRange example: [1, '...', 4, 5, 6, '...', 10]`}
          vueCode={`const { currentPage, setPage, pageRange } = usePagination({
  total: 100,
  pageSize: 10
});`}
        />
      </div>

      {/* Interactive Example */}
      <div className="space-y-4">
        <h2 id="interactive" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Interactive Example
        </h2>
        <ComponentPreview 
          code={`const [page, setPage] = useState(1);
const totalPages = 10;

<GlassPagination variant="glass">
  <GlassPaginationContent>
    <GlassPaginationItem>
      <GlassPaginationPrevious 
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
      />
    </GlassPaginationItem>
    
    {/* Generate page links */}
    {[1, 2, 3, '...', totalPages].map((p, i) => (
      <GlassPaginationItem key={i}>
        {p === '...' ? (
          <GlassPaginationEllipsis />
        ) : (
          <GlassPaginationLink 
            isActive={page === p}
            onClick={() => setPage(p)}
          >
            {p}
          </GlassPaginationLink>
        )}
      </GlassPaginationItem>
    ))}
    
    <GlassPaginationItem>
      <GlassPaginationNext 
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      />
    </GlassPaginationItem>
  </GlassPaginationContent>
</GlassPagination>`}
          vueCode={`<GlassPagination @page-change="handlePageChange">...</GlassPagination>`}
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-500">
              Current page: <span className="font-semibold text-slate-900 dark:text-white">{currentPage}</span> / {totalPages}
            </p>
            <GlassPagination variant="glass">
              <GlassPaginationContent>
                <GlassPaginationItem>
                  <GlassPaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </GlassPaginationItem>
                
                <GlassPaginationItem>
                  <GlassPaginationLink 
                    isActive={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </GlassPaginationLink>
                </GlassPaginationItem>
                
                {currentPage > 3 && (
                  <GlassPaginationItem>
                    <GlassPaginationEllipsis />
                  </GlassPaginationItem>
                )}
                
                {[currentPage - 1, currentPage, currentPage + 1]
                  .filter(p => p > 1 && p < totalPages)
                  .map(p => (
                    <GlassPaginationItem key={p}>
                      <GlassPaginationLink 
                        isActive={currentPage === p}
                        onClick={() => setCurrentPage(p)}
                      >
                        {p}
                      </GlassPaginationLink>
                    </GlassPaginationItem>
                  ))
                }
                
                {currentPage < totalPages - 2 && (
                  <GlassPaginationItem>
                    <GlassPaginationEllipsis />
                  </GlassPaginationItem>
                )}
                
                <GlassPaginationItem>
                  <GlassPaginationLink 
                    isActive={currentPage === totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </GlassPaginationLink>
                </GlassPaginationItem>
                
                <GlassPaginationItem>
                  <GlassPaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </GlassPaginationItem>
              </GlassPaginationContent>
            </GlassPagination>
          </div>
        </ComponentPreview>
      </div>

      {/* Props */}
      <div className="space-y-4">
        <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Props
        </h2>
        
        <h3 className="font-semibold text-[hsl(var(--foreground))]">GlassPagination</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Default</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">variant</td>
                <td className="py-3 font-mono text-xs">'default' | 'outline' | 'ghost' | 'glass'</td>
                <td className="py-3 font-mono text-xs">'default'</td>
                <td className="py-3">Visual style</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">size</td>
                <td className="py-3 font-mono text-xs">'sm' | 'md' | 'lg'</td>
                <td className="py-3 font-mono text-xs">'md'</td>
                <td className="py-3">Button size</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-6">GlassPaginationLink</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Prop</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">href</td>
                <td className="py-3 font-mono text-xs">string</td>
                <td className="py-3">Page URL</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">isActive</td>
                <td className="py-3 font-mono text-xs">boolean</td>
                <td className="py-3">Current page indicator</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">onClick</td>
                <td className="py-3 font-mono text-xs">() =&gt; void</td>
                <td className="py-3">Click handler (for SPA)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold text-[hsl(var(--foreground))] mt-6">usePagination</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Option</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Type</th>
                <th className="pb-3 font-semibold text-[hsl(var(--foreground))]">Description</th>
              </tr>
            </thead>
            <tbody className="text-[hsl(var(--muted-foreground))]">
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">total</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3">Total number of items</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">pageSize</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3">Items per page</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">initialPage</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3">Starting page number</td>
              </tr>
              <tr className="border-b border-[hsl(var(--border))]">
                <td className="py-3 font-mono text-xs">siblingCount</td>
                <td className="py-3 font-mono text-xs">number</td>
                <td className="py-3">Pages shown around current</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility */}
      <div className="space-y-4">
        <h2 id="accessibility" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
          Accessibility
        </h2>
        <ul className="list-disc list-inside space-y-2 text-[hsl(var(--muted-foreground))]">
          <li>Uses <code>nav</code> element with <code>aria-label="pagination"</code></li>
          <li>Active page marked with <code>aria-current="page"</code></li>
          <li>Previous/Next buttons have descriptive <code>aria-label</code></li>
          <li>Disabled buttons use <code>aria-disabled</code></li>
          <li>Keyboard navigation supported</li>
        </ul>
      </div>
    </div>
  );
}
