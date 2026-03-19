'use client';

/**
 * MiniLineChart – Ultra-Minimal
 * Pure SVG line chart — no external chart library.
 * Renders a clean, Apple-style trend line.
 */

import * as React from 'react';
import type { ChartDataPoint } from '../shared/types';
import styles from './ultra-minimal.module.css';

interface MiniLineChartProps {
    data: ChartDataPoint[];
    title?: string;
}

export function MiniLineChart({ data, title = 'Revenue Trend' }: MiniLineChartProps) {
    const svgRef = React.useRef<SVGSVGElement>(null);

    // Build SVG path from data
    const viewBoxWidth = 600;
    const viewBoxHeight = 240;
    const paddingX = 40;
    const paddingY = 24;
    const chartWidth = viewBoxWidth - paddingX * 2;
    const chartHeight = viewBoxHeight - paddingY * 2;

    const maxValue = Math.max(...data.map((d) => d.value));
    const minValue = Math.min(...data.map((d) => d.value));
    const range = maxValue - minValue || 1;

    const points = data.map((d, i) => {
        const x = paddingX + (i / (data.length - 1)) * chartWidth;
        const y = paddingY + chartHeight - ((d.value - minValue) / range) * chartHeight;
        return { x, y, label: d.name, value: d.value };
    });

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    // Filled area path
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingY + chartHeight} L ${points[0].x} ${paddingY + chartHeight} Z`;

    // Horizontal grid lines (4 lines)
    const gridLines = Array.from({ length: 5 }, (_, i) => {
        const y = paddingY + (i / 4) * chartHeight;
        const value = maxValue - (i / 4) * range;
        return { y, value: Math.round(value).toLocaleString() };
    });

    return (
        <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>{title}</h3>
            <div className={styles.chartWrapper}>
                <svg
                    ref={svgRef}
                    viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                    role="img"
                    aria-label={`${title} chart showing data over time`}
                >
                    {/* Grid lines */}
                    {gridLines.map((line) => (
                        <g key={line.value}>
                            <line
                                x1={paddingX}
                                y1={line.y}
                                x2={viewBoxWidth - paddingX}
                                y2={line.y}
                                stroke="var(--dash-chart-grid)"
                                strokeWidth="1"
                            />
                            <text
                                x={paddingX - 8}
                                y={line.y + 3}
                                textAnchor="end"
                                fill="var(--dash-text-muted)"
                                fontSize="9"
                                fontFamily="inherit"
                            >
                                {line.value}
                            </text>
                        </g>
                    ))}

                    {/* X-axis labels */}
                    {points.map((p, i) =>
                        i % 2 === 0 ? (
                            <text
                                key={p.label}
                                x={p.x}
                                y={viewBoxHeight - 4}
                                textAnchor="middle"
                                fill="var(--dash-text-muted)"
                                fontSize="9"
                                fontFamily="inherit"
                            >
                                {p.label}
                            </text>
                        ) : null,
                    )}

                    {/* Area fill */}
                    <path d={areaPath} fill="var(--dash-chart-fill)" />

                    {/* Line */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke="var(--dash-chart-stroke)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Data points */}
                    {points.map((p) => (
                        <circle
                            key={p.label}
                            cx={p.x}
                            cy={p.y}
                            r="3"
                            fill="var(--dash-surface)"
                            stroke="var(--dash-chart-stroke)"
                            strokeWidth="2"
                        />
                    ))}
                </svg>
            </div>
        </div>
    );
}
