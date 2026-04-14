'use client';

import * as React from 'react';
import { cn } from '@archui/core';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlassButton } from '../glass-button';
import { GlassInput } from '../glass-input';
import { EffectContainer } from '../../../base/effect-container';

// ============================================================================
// TYPES
// ============================================================================

export interface DataTableColumn<T = any> {
    /** Unique field identifier */
    field: string;
    /** Display header text */
    header: string;
    /** Enable column sorting */
    sortable?: boolean;
    /** Enable column filtering */
    filterable?: boolean;
    /** Column width (CSS value) */
    width?: string;
    /** Custom cell renderer */
    render?: (value: any, row: T, index: number) => React.ReactNode;
    /** Custom filter function */
    filterFn?: (row: T, filterValue: string) => boolean;
    /** Sort comparison function */
    sortFn?: (a: T, b: T) => number;
}

export interface DataTablePaginationConfig {
    /** Items per page */
    pageSize?: number;
    /** Current page (1-indexed) */
    currentPage?: number;
    /** Show page size selector */
    showPageSize?: boolean;
    /** Page size options */
    pageSizeOptions?: number[];
}

export interface GlassDataTableProps<T = any> {
    /** Table data */
    data: T[];
    /** Column definitions */
    columns: DataTableColumn<T>[];
    /** Enable row selection */
    selectable?: boolean;
    /** Enable single or multiple selection */
    selectionMode?: 'single' | 'multiple';
    /** Selected row keys */
    selectedRows?: string[];
    /** Row key field (for selection) */
    rowKey?: string;
    /** Selection change callback */
    onSelectionChange?: (selectedKeys: string[]) => void;
    /** Enable expandable rows */
    expandable?: boolean;
    /** Render expanded content */
    renderExpandedRow?: (row: T, index: number) => React.ReactNode;
    /** Pagination configuration */
    pagination?: DataTablePaginationConfig | false;
    /** Loading state */
    loading?: boolean;
    /** Empty state message */
    emptyMessage?: string;
    /** Table density */
    density?: 'compact' | 'normal' | 'comfortable';
    /** Custom className */
    className?: string;
    /** Enable sticky header */
    stickyHeader?: boolean;
    /** Max height (for sticky header) */
    maxHeight?: string;
}

interface SortState {
    field: string | null;
    direction: 'asc' | 'desc' | null;
}

interface FilterState {
    [field: string]: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export const GlassDataTable = <T extends Record<string, any>>({
    data,
    columns,
    selectable = false,
    selectionMode = 'multiple',
    selectedRows = [],
    rowKey = 'id',
    onSelectionChange,
    expandable = false,
    renderExpandedRow,
    pagination = { pageSize: 10, currentPage: 1 },
    loading = false,
    emptyMessage = 'No data available',
    density = 'normal',
    className,
    stickyHeader = false,
    maxHeight = '600px',
}: GlassDataTableProps<T>) => {
    // ========================================================================
    // STATE
    // ========================================================================
    const [sortState, setSortState] = React.useState<SortState>({
        field: null,
        direction: null,
    });
    const [filterState, setFilterState] = React.useState<FilterState>({});
    const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());
    const [internalSelectedRows, setInternalSelectedRows] = React.useState<string[]>(selectedRows);
    const [currentPage, setCurrentPage] = React.useState(
        pagination ? pagination.currentPage || 1 : 1
    );
    const [pageSize, setPageSize] = React.useState(
        pagination ? pagination.pageSize || 10 : 10
    );

    // Sync external selection with internal state
    React.useEffect(() => {
        setInternalSelectedRows(selectedRows);
    }, [selectedRows]);

    // ========================================================================
    // COMPUTED DATA
    // ========================================================================

    // Apply filtering
    const filteredData = React.useMemo(() => {
        let result = [...data];

        Object.entries(filterState).forEach(([field, filterValue]) => {
            if (filterValue.trim() === '') return;

            const column = columns.find((col) => col.field === field);
            result = result.filter((row) => {
                if (column?.filterFn) {
                    return column.filterFn(row, filterValue);
                }
                const cellValue = String(row[field] ?? '').toLowerCase();
                return cellValue.includes(filterValue.toLowerCase());
            });
        });

        return result;
    }, [data, filterState, columns]);

    // Apply sorting
    const sortedData = React.useMemo(() => {
        if (!sortState.field || !sortState.direction) return filteredData;

        const column = columns.find((col) => col.field === sortState.field);
        const sorted = [...filteredData];

        sorted.sort((a, b) => {
            if (column?.sortFn) {
                return column.sortFn(a, b);
            }

            const aVal = a[sortState.field!];
            const bVal = b[sortState.field!];

            if (aVal === bVal) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return aVal - bVal;
            }

            return String(aVal).localeCompare(String(bVal));
        });

        if (sortState.direction === 'desc') {
            sorted.reverse();
        }

        return sorted;
    }, [filteredData, sortState, columns]);

    // Apply pagination
    const paginatedData = React.useMemo(() => {
        if (!pagination) return sortedData;

        const startIndex = (currentPage - 1) * pageSize;
        return sortedData.slice(startIndex, startIndex + pageSize);
    }, [sortedData, currentPage, pageSize, pagination]);

    const totalPages = pagination ? Math.ceil(sortedData.length / pageSize) : 1;

    // ========================================================================
    // HANDLERS
    // ========================================================================

    const handleSort = (field: string) => {
        setSortState((prev) => {
            if (prev.field === field) {
                // Cycle: asc -> desc -> null
                if (prev.direction === 'asc') return { field, direction: 'desc' };
                if (prev.direction === 'desc') return { field: null, direction: null };
            }
            return { field, direction: 'asc' };
        });
    };

    const handleFilter = (field: string, value: string) => {
        setFilterState((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1); // Reset to first page on filter
    };

    const handleSelectRow = (key: string) => {
        let newSelection: string[];

        if (selectionMode === 'single') {
            newSelection = internalSelectedRows.includes(key) ? [] : [key];
        } else {
            newSelection = internalSelectedRows.includes(key)
                ? internalSelectedRows.filter((k) => k !== key)
                : [...internalSelectedRows, key];
        }

        setInternalSelectedRows(newSelection);
        onSelectionChange?.(newSelection);
    };

    const handleSelectAll = () => {
        const allKeys = paginatedData.map((row) => String(row[rowKey]));
        const allSelected = allKeys.every((key) => internalSelectedRows.includes(key));

        const newSelection = allSelected
            ? internalSelectedRows.filter((key) => !allKeys.includes(key))
            : [...new Set([...internalSelectedRows, ...allKeys])];

        setInternalSelectedRows(newSelection);
        onSelectionChange?.(newSelection);
    };

    const handleToggleExpand = (key: string) => {
        setExpandedRows((prev) => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    };

    // ========================================================================
    // DENSITY STYLES
    // ========================================================================

    const densityClasses = {
        compact: 'py-1.5 px-3 text-xs',
        normal: 'py-2.5 px-4 text-sm',
        comfortable: 'py-4 px-5 text-sm',
    };

    const cellClass = densityClasses[density];

    // ========================================================================
    // RENDER HELPERS
    // ========================================================================

    const getSortIcon = (field: string) => {
        if (sortState.field !== field) {
            return <ChevronsUpDown className="w-3.5 h-3.5 text-text-primary/30" />;
        }
        return sortState.direction === 'asc' ? (
            <ChevronUp className="w-3.5 h-3.5 text-blue-500" />
        ) : (
            <ChevronDown className="w-3.5 h-3.5 text-blue-500" />
        );
    };

    const getSortDirection = (field: string): 'ascending' | 'descending' | 'none' => {
        if (sortState.field !== field) return 'none';
        return sortState.direction === 'asc' ? 'ascending' : 'descending';
    };

    // ========================================================================
    // RENDER
    // ========================================================================

    return (
        <div className={cn('w-full space-y-4', className)}>
            {/* Filter Row */}
            <div className="flex gap-2 flex-wrap">
                {columns
                    .filter((col) => col.filterable)
                    .map((col) => (
                        <div key={col.field} className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-primary/40" />
                                <GlassInput
                                    placeholder={`Filter ${col.header}...`}
                                    value={filterState[col.field] || ''}
                                    onChange={(e) => handleFilter(col.field, e.target.value)}
                                    className="pl-10 pr-8"
                                />
                                {filterState[col.field] && (
                                    <button
                                        onClick={() => handleFilter(col.field, '')}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-primary/40 hover:text-text-primary"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>

            {/* Table Container */}
            <EffectContainer
                className="rounded-2xl border border-surface-border bg-surface-primary/80 backdrop-blur-xl overflow-hidden"
                effects={
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                }
            >
                <div
                    className={cn('overflow-auto', stickyHeader && 'relative')}
                    style={stickyHeader ? { maxHeight } : undefined}
                >
                    <table className="w-full border-collapse">
                        {/* Header */}
                        <thead
                            className={cn(
                                'bg-surface-primary/50 backdrop-blur-md border-b border-surface-border',
                                stickyHeader && 'sticky top-0 z-10'
                            )}
                        >
                            <tr>
                                {selectable && (
                                    <th className={cn('text-left', cellClass)} style={{ width: '40px' }}>
                                        {selectionMode === 'multiple' && (
                                            <input
                                                type="checkbox"
                                                checked={
                                                    paginatedData.length > 0 &&
                                                    paginatedData.every((row) =>
                                                        internalSelectedRows.includes(String(row[rowKey]))
                                                    )
                                                }
                                                onChange={handleSelectAll}
                                                className="rounded border-surface-border/50 bg-surface-primary/20"
                                            />
                                        )}
                                    </th>
                                )}
                                {expandable && (
                                    <th className={cn('text-left', cellClass)} style={{ width: '40px' }} />
                                )}
                                {columns.map((col) => (
                                    <th
                                        key={col.field}
                                        className={cn(
                                            'text-left font-semibold text-text-primary/70',
                                            cellClass,
                                            col.sortable && 'cursor-pointer select-none hover:text-text-primary'
                                        )}
                                        style={{ width: col.width }}
                                        onClick={col.sortable ? () => handleSort(col.field) : undefined}
                                        role="columnheader"
                                        aria-sort={col.sortable ? getSortDirection(col.field) : undefined}
                                    >
                                        <div className="flex items-center gap-2">
                                            {col.header}
                                            {col.sortable && getSortIcon(col.field)}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody className="divide-y divide-surface-border/50">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={
                                            columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)
                                        }
                                        className="text-center py-12"
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                            <span className="text-sm text-text-primary/60">Loading...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginatedData.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={
                                            columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)
                                        }
                                        className="text-center py-12"
                                    >
                                        <span className="text-sm text-text-primary/40 italic">
                                            {emptyMessage}
                                        </span>
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((row, rowIndex) => {
                                    const key = String(row[rowKey]);
                                    const isSelected = internalSelectedRows.includes(key);
                                    const isExpanded = expandedRows.has(key);

                                    return (
                                        <React.Fragment key={key}>
                                            <tr
                                                className={cn(
                                                    'transition-colors',
                                                    'hover:bg-surface-primary/10',
                                                    isSelected && 'bg-blue-500/10'
                                                )}
                                            >
                                                {selectable && (
                                                    <td className={cellClass}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleSelectRow(key)}
                                                            className="rounded border-surface-border/50 bg-surface-primary/20"
                                                        />
                                                    </td>
                                                )}
                                                {expandable && (
                                                    <td className={cellClass}>
                                                        <button
                                                            onClick={() => handleToggleExpand(key)}
                                                            className="text-text-primary/60 hover:text-text-primary transition-colors"
                                                        >
                                                            {isExpanded ? (
                                                                <ChevronDown className="w-4 h-4" />
                                                            ) : (
                                                                <ChevronRight className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    </td>
                                                )}
                                                {columns.map((col) => (
                                                    <td
                                                        key={col.field}
                                                        className={cn(cellClass, 'text-text-primary/80')}
                                                    >
                                                        {col.render
                                                            ? col.render(row[col.field], row, rowIndex)
                                                            : row[col.field]}
                                                    </td>
                                                ))}
                                            </tr>
                                            {expandable && isExpanded && renderExpandedRow && (
                                                <tr>
                                                    <td
                                                        colSpan={
                                                            columns.length +
                                                            (selectable ? 1 : 0) +
                                                            (expandable ? 1 : 0)
                                                        }
                                                        className="bg-surface-primary/5 p-4"
                                                    >
                                                        {renderExpandedRow(row, rowIndex)}
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination && !loading && sortedData.length > 0 && (
                    <div className="border-t border-surface-border bg-surface-primary/30 px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-text-primary/60">
                                Showing {(currentPage - 1) * pageSize + 1} to{' '}
                                {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length}{' '}
                                results
                            </div>

                            <div className="flex items-center gap-2">
                                <GlassButton
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </GlassButton>

                                <div className="flex gap-1">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum: number;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <GlassButton
                                                key={pageNum}
                                                size="sm"
                                                variant={currentPage === pageNum ? 'default' : 'ghost'}
                                                onClick={() => handlePageChange(pageNum)}
                                            >
                                                {pageNum}
                                            </GlassButton>
                                        );
                                    })}
                                </div>

                                <GlassButton
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </GlassButton>
                            </div>
                        </div>
                    </div>
                )}
            </EffectContainer>
        </div>
    );
};

GlassDataTable.displayName = 'GlassDataTable';
