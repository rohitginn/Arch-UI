/**
 * PropsTable – reusable styled props table for component documentation pages.
 *
 * Features:
 * - Type-aware coloring: boolean=violet, string=emerald, number=amber, ReactNode=sky
 * - Monospace prop/type/default cells with subtle pill backgrounds
 * - Required indicator (red dot) when no default is provided and required=true
 * - Hover highlight per row
 * - Responsive scroll wrapper
 */

/* ─────────────────────────────────────────────────────────
   Types
   ───────────────────────────────────────────────────────── */
export interface PropRow {
    /** The prop name, e.g. "variant" */
    prop: string;
    /** TypeScript type string, e.g. `"default" | "gradient"` or `boolean` */
    type: string;
    /** Default value string. Use `undefined` or omit for required props. */
    default?: string;
    /** Human-readable description shown in the last column */
    description: string;
    /** If true, shows a required indicator and leaves default column empty */
    required?: boolean;
}

export interface PropsTableProps {
    rows: PropRow[];
    /** Optional heading rendered above the table */
    title?: string;
    /** id attribute placed on the heading element for anchor links */
    id?: string;
}

/* ─────────────────────────────────────────────────────────
   Helpers
   ───────────────────────────────────────────────────────── */

/**
 * Detect a "base type" from the raw type string so we can colour it.
 * Handles unions like `"default" | "large"` (string literal → string),
 * plain primitives, and React-specific types.
 */
function detectBaseType(
    type: string,
): 'boolean' | 'string' | 'number' | 'react' | 'function' | 'other' {
    const t = type.trim();
    if (t === 'boolean' || t === 'true' || t === 'false') return 'boolean';
    if (t === 'number') return 'number';
    if (t === 'string') return 'string';
    // All-string-literal unions: `"a" | "b" | "c"`
    if (/^"[^"]*"(\s*\|\s*"[^"]*")*$/.test(t)) return 'string';
    if (/ReactNode|ReactElement|JSX\.Element/.test(t)) return 'react';
    if (/^\(.*\)\s*=>/.test(t) || t.startsWith('() =>') || t.includes('=>'))
        return 'function';
    return 'other';
}

const TYPE_CLASSES: Record<ReturnType<typeof detectBaseType>, string> = {
    boolean: 'bg-violet-500/8 text-violet-600 dark:text-violet-400',
    string: 'bg-emerald-500/8 text-emerald-600 dark:text-emerald-400',
    number: 'bg-amber-500/8 text-amber-600 dark:text-amber-400',
    react: 'bg-sky-500/8 text-sky-600 dark:text-sky-400',
    function: 'bg-pink-500/8 text-pink-600 dark:text-pink-400',
    other: 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]',
};

/* ─────────────────────────────────────────────────────────
   Component
   ───────────────────────────────────────────────────────── */
export function PropsTable({ rows, title, id }: PropsTableProps) {
    return (
        <div className="space-y-4">
            {title && (
                <h2
                    id={id}
                    className="scroll-m-20 border-b border-[hsl(var(--border))] pb-2 text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]"
                >
                    {title}
                </h2>
            )}

            {/* Scrollable wrapper */}
            <div className="overflow-x-auto rounded-xl border border-[hsl(var(--border))]">
                <table className="w-full border-collapse text-sm">
                    {/* ── Header ── */}
                    <thead>
                        <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40">
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                                Prop
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                                Type
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                                Default
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                                Description
                            </th>
                        </tr>
                    </thead>

                    {/* ── Rows ── */}
                    <tbody className="divide-y divide-[hsl(var(--border))]">
                        {rows.map((row) => {
                            const baseType = detectBaseType(row.type);
                            const typeClass = TYPE_CLASSES[baseType];
                            const isRequired =
                                row.required === true ||
                                (!row.default && row.default !== '—');

                            return (
                                <tr
                                    key={row.prop}
                                    className="group/row bg-[hsl(var(--background))] transition-colors duration-100 hover:bg-[hsl(var(--muted))]/30"
                                >
                                    {/* Prop name */}
                                    <td className="px-4 py-3 align-top">
                                        <div className="flex items-center gap-2">
                                            <code className="rounded bg-violet-500/8 px-1.5 py-0.5 font-mono text-xs font-medium text-violet-600 dark:text-violet-400">
                                                {row.prop}
                                            </code>
                                            {isRequired && (
                                                <span
                                                    title="Required"
                                                    className="flex h-4 items-center rounded-full bg-red-500/10 px-1.5 text-[10px] font-semibold text-red-500"
                                                >
                                                    req
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Type */}
                                    <td className="px-4 py-3 align-top">
                                        <code
                                            className={`block max-w-[220px] break-words rounded px-1.5 py-0.5 font-mono text-xs leading-relaxed ${typeClass}`}
                                        >
                                            {row.type}
                                        </code>
                                    </td>

                                    {/* Default */}
                                    <td className="px-4 py-3 align-top">
                                        {row.default ? (
                                            <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 font-mono text-xs text-[hsl(var(--foreground))]">
                                                {row.default}
                                            </code>
                                        ) : (
                                            <span className="text-xs text-[hsl(var(--muted-foreground))]/50">
                                                —
                                            </span>
                                        )}
                                    </td>

                                    {/* Description */}
                                    <td className="px-4 py-3 align-top text-xs leading-relaxed text-[hsl(var(--muted-foreground))]">
                                        {row.description}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
