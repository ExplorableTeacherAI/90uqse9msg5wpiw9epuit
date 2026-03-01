import React, { useMemo } from 'react';
import { useVar } from '@/stores';

/**
 * Generate Recamán sequence up to n terms
 */
function generateRecaman(n: number): number[] {
    const sequence: number[] = [0];
    const seen = new Set([0]);

    for (let i = 1; i < n; i++) {
        const prev = sequence[sequence.length - 1];
        const subtract = prev - i;

        if (subtract > 0 && !seen.has(subtract)) {
            sequence.push(subtract);
            seen.add(subtract);
        } else {
            const add = prev + i;
            sequence.push(add);
            seen.add(add);
        }
    }

    return sequence;
}

interface RecamanVisualizationProps {
    maxTerms?: number;
    width?: number;
    height?: number;
    arcColor?: string;
    pointColor?: string;
}

export const RecamanVisualization: React.FC<RecamanVisualizationProps> = ({
    maxTerms = 30,
    width = 800,
    height = 400,
    arcColor = '#3b82f6',
    pointColor = '#0f172a'
}) => {
    const numTerms = useVar('numTerms', 20) as number;
    const n = Math.min(Math.max(numTerms, 1), maxTerms);

    // Generate Recamán sequence
    const sequence = useMemo(() => generateRecaman(n), [n]);

    // Find the bounds of the sequence
    const min = Math.min(...sequence);
    const max = Math.max(...sequence);
    const range = max - min;

    // Calculate canvas dimensions
    const padding = 40;
    const availableWidth = width - 2 * padding;
    const availableHeight = height - 2 * padding;

    // Scale factors
    const xScale = availableWidth / (sequence.length - 1);
    const yScale = availableHeight / (range || 1);

    // Convert sequence value to canvas y position
    const getY = (val: number) => {
        return height - padding - (val - min) * yScale;
    };

    return (
        <svg width={width} height={height} className="border border-gray-200 rounded-lg bg-white">
            {/* Axes */}
            <line
                x1={padding}
                y1={height - padding}
                x2={width - padding}
                y2={height - padding}
                stroke="#d1d5db"
                strokeWidth="2"
            />
            <line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={height - padding}
                stroke="#d1d5db"
                strokeWidth="2"
            />

            {/* Grid lines */}
            {Array.from({ length: 5 }).map((_, i) => {
                const y = padding + (i * availableHeight) / 4;
                return (
                    <line
                        key={`grid-${i}`}
                        x1={padding}
                        y1={y}
                        x2={width - padding}
                        y2={y}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                    />
                );
            })}

            {/* Arcs connecting consecutive terms */}
            {sequence.map((val, i) => {
                if (i === sequence.length - 1) return null;

                const x1 = padding + i * xScale;
                const y1 = getY(val);
                const x2 = padding + (i + 1) * xScale;
                const y2 = getY(sequence[i + 1]);

                const midX = (x1 + x2) / 2;
                const midY = Math.min(y1, y2) - Math.abs(y2 - y1) / 2 - 30;

                // Quadratic bezier curve
                return (
                    <path
                        key={`arc-${i}`}
                        d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                        stroke={arcColor}
                        strokeWidth="2"
                        fill="none"
                        opacity="0.6"
                    />
                );
            })}

            {/* Points */}
            {sequence.map((val, i) => {
                const x = padding + i * xScale;
                const y = getY(val);
                return (
                    <g key={`point-${i}`}>
                        <circle cx={x} cy={y} r="4" fill={pointColor} />
                        <text
                            x={x}
                            y={y - 15}
                            textAnchor="middle"
                            fontSize="10"
                            fill={pointColor}
                            fontWeight="bold"
                        >
                            {val}
                        </text>
                    </g>
                );
            })}

            {/* Axis labels */}
            <text x={width / 2} y={height - 5} textAnchor="middle" fontSize="12" fill="#6b7280">
                Step (n)
            </text>
            <text
                x={10}
                y={height / 2}
                textAnchor="middle"
                fontSize="12"
                fill="#6b7280"
                transform={`rotate(-90, 10, ${height / 2})`}
            >
                Value
            </text>
        </svg>
    );
};

export default RecamanVisualization;
