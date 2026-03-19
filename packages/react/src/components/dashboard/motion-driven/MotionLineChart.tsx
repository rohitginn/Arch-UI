'use client';

/**
 * MotionLineChart – Motion-Driven
 * SVG line chart with draw-on animation on mount.
 * Data points pop in after line completes.
 */

import * as React from 'react';
import { motion } from 'motion/react';
import type { ChartDataPoint } from '../shared/types';
import styles from './motion-driven.module.css';

interface MotionLineChartProps {
    data: ChartDataPoint[];
    title?: string;
}

export function MotionLineChart({ data, title = 'Revenue Trend' }: MotionLineChartProps) {
    const pathRef = React.useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = React.useState(0);

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
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingY + chartHeight} L ${points[0].x} ${paddingY + chartHeight} Z`;

    const gridLines = Array.from({ length: 5 }, (_, i) => {
        const y = paddingY + (i / 4) * chartHeight;
        const value = maxValue - (i / 4) * range;
        return { y, value: Math.round(value).toLocaleString() };
    });

    // Measure actual path length on mount
    React.useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, [data]);

    return (
        <motion.div
            className={styles.chartCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <h3 className={styles.chartTitle}>{title}</h3>
            <div className={styles.chartWrapper}>
                <svg
                    viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                    preserveAspectRatio="none"
                    width="100%"
                    height="100%"
                    role="img"
                    aria-label={`${title} chart showing data over time`}
                >
                    {/* Grid lines */}
                    {gridLines.map((line, i) => (
                        <motion.g
                            key={line.value}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.05 }}
                        >
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
                        </motion.g>
                    ))}

                    {/* X-axis labels */}
                    {points.map((p, i) =>
                        i % 2 === 0 ? (
                            <motion.text
                                key={p.label}
                                x={p.x}
                                y={viewBoxHeight - 4}
                                textAnchor="middle"
                                fill="var(--dash-text-muted)"
                                fontSize="9"
                                fontFamily="inherit"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.8 + i * 0.03 }}
                            >
                                {p.label}
                            </motion.text>
                        ) : null,
                    )}

                    {/* Area fill – fades in after line draws */}
                    <motion.path
                        d={areaPath}
                        fill="var(--dash-chart-fill)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.0 }}
                    />

                    {/* Animated line draw */}
                    <motion.path
                        ref={pathRef}
                        d={linePath}
                        fill="none"
                        stroke="var(--dash-chart-stroke)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                            pathLength: { duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 },
                            opacity: { duration: 0.1, delay: 0.3 },
                        }}
                    />

                    {/* Data points – pop in staggered after line */}
                    {points.map((p, i) => (
                        <motion.circle
                            key={p.label}
                            cx={p.x}
                            cy={p.y}
                            r="3.5"
                            fill="var(--dash-surface)"
                            stroke="var(--dash-chart-stroke)"
                            strokeWidth="2"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.25,
                                delay: 1.0 + i * 0.04,
                                ease: [0.34, 1.56, 0.64, 1],
                            }}
                            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                        />
                    ))}
                </svg>
            </div>
        </motion.div>
    );
}
