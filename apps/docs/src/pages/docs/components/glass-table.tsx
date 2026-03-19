import { GlassTable, GlassTableHeader, GlassTableBody, GlassTableRow, GlassTableCell, GlassTableHeadCell } from '@archui/react';
import { ComponentPreview, CodeBlock } from '../../../components/component-preview';

export function GlassTableDocs() {
    const data = [
        { id: 1, name: 'Alice Johnson', role: 'Designer', status: 'Active' },
        { id: 2, name: 'Bob Smith', role: 'Developer', status: 'Away' },
        { id: 3, name: 'Charlie Brown', role: 'Manager', status: 'Active' },
    ];

    const tableCode = `<GlassTable>
  <GlassTableHeader className="grid-cols-[1fr,1fr,1fr]">
    <GlassTableHeadCell>Name</GlassTableHeadCell>
    <GlassTableHeadCell>Role</GlassTableHeadCell>
    <GlassTableHeadCell>Status</GlassTableHeadCell>
  </GlassTableHeader>
  <GlassTableBody>
    {data.map(item => (
      <GlassTableRow key={item.id} className="grid-cols-[1fr,1fr,1fr]">
        <GlassTableCell>{item.name}</GlassTableCell>
        <GlassTableCell>{item.role}</GlassTableCell>
        <GlassTableCell>{item.status}</GlassTableCell>
      </GlassTableRow>
    ))}
  </GlassTableBody>
</GlassTable>`;

    const vueTableCode = `<GlassTable>
  <GlassTableHeader class="grid-cols-[1fr,1fr,1fr]">
    <GlassTableHeadCell>Name</GlassTableHeadCell>
    <GlassTableHeadCell>Role</GlassTableHeadCell>
    <GlassTableHeadCell>Status</GlassTableHeadCell>
  </GlassTableHeader>
  <GlassTableBody>
    <GlassTableRow v-for="item in data" :key="item.id" class="grid-cols-[1fr,1fr,1fr]">
      <GlassTableCell>{{ item.name }}</GlassTableCell>
      <GlassTableCell>{{ item.role }}</GlassTableCell>
      <GlassTableCell>{{ item.status }}</GlassTableCell>
    </GlassTableRow>
  </GlassTableBody>
</GlassTable>`;

    return (
        <div className="space-y-6">
            <div>
                <h1 id="glass-table" className="scroll-m-20 text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                    Glass Table
                </h1>
                <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
                    A flexible, logic-agnostic table system built with CSS Grid and glassmorphic styling.
                </p>
            </div>

            <div className="space-y-4">
                <h2 id="preview" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Preview
                </h2>
                <ComponentPreview code={tableCode} vueCode={vueTableCode}>
                    <div className="w-full max-w-2xl mx-auto border border-surface-border/50 rounded-xl overflow-hidden glass-card">
                        <GlassTable>
                            <GlassTableHeader className="grid-cols-[1fr,1fr,1fr]">
                                <GlassTableHeadCell>Name</GlassTableHeadCell>
                                <GlassTableHeadCell>Role</GlassTableHeadCell>
                                <GlassTableHeadCell>Status</GlassTableHeadCell>
                            </GlassTableHeader>
                            <GlassTableBody>
                                {data.map((item) => (
                                    <GlassTableRow key={item.id} className="grid-cols-[1fr,1fr,1fr]">
                                        <GlassTableCell className="font-medium">{item.name}</GlassTableCell>
                                        <GlassTableCell>{item.role}</GlassTableCell>
                                        <GlassTableCell>
                                            <span className={item.status === 'Active' ? 'text-green-500' : 'text-amber-500'}>
                                                {item.status}
                                            </span>
                                        </GlassTableCell>
                                    </GlassTableRow>
                                ))}
                            </GlassTableBody>
                        </GlassTable>
                    </div>
                </ComponentPreview>
            </div>

            <div className="space-y-4">
                <h2 id="usage" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Usage
                </h2>
                <p className="text-[hsl(var(--muted-foreground))]">
                    The table uses <code>grid-template-columns</code> logic. You must apply matching grid-cols classes or styles to both the Header and the Rows.
                </p>
                <CodeBlock code={tableCode} vueCode={vueTableCode} />
            </div>

            <div className="space-y-4">
                <h2 id="props" className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Primitives
                </h2>
                <ul className="list-disc list-inside space-y-2 text-[hsl(var(--muted-foreground))]">
                    <li><code>GlassTable</code>: The main container. Supports <code>variant="subtle"</code> and <code>compact</code>.</li>
                    <li><code>GlassTableHeader</code>: Sticky header container with backdrop blur.</li>
                    <li><code>GlassTableBody</code>: Scrollable body area.</li>
                    <li><code>GlassTableRow</code>: Grid row container (uses <code>display: contents</code>).</li>
                    <li><code>GlassTableCell</code>: Standard cell with padding and hover effects.</li>
                    <li><code>GlassTableHeadCell</code>: Header cell with bold typography.</li>
                </ul>
            </div>
        </div>
    );
}
