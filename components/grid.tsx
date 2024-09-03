import React from 'react';
import { GridCell, GridSize } from '../types/types'

type GridProps = {
    grid: GridCell[][];
    gridSizes: GridSize[][];
    handleGridClick: (rowIndex: number, colIndex: number) => void;
};

export default function Grid({ grid, gridSizes, handleGridClick }: GridProps) {
    return (
        <div className="grid-overlay" style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            height: '100%',
        }}>
            {(grid || []).map((row, rowIndex) => (
                <div key={rowIndex} className="grid-row">
                    {row.map((cell, colIndex) => {
                        const left = row.slice(0, colIndex).reduce((sum, _, i) => sum + gridSizes[rowIndex][i].width, 0);
                        const top = grid.slice(0, rowIndex).reduce((sum, _, i) => sum + gridSizes[i][0].height, 0);
                        return (
                            <div
                                key={colIndex}
                                className="grid-cell"
                                style={{ 
                                    backgroundColor: cell ? `${cell.color}${Math.round(cell.opacity * 255).toString(16).padStart(2, '0')}` : 'transparent',
                                    width: `${gridSizes[rowIndex][colIndex].width}px`,
                                    height: `${gridSizes[rowIndex][colIndex].height}px`,
                                    border: '1px solid black',
                                    position: 'absolute',
                                    left: `${left}px`,
                                    top: `${top}px`,
                                }}
                                onClick={() => handleGridClick(rowIndex, colIndex)}
                            >
                                {cell && cell.alias}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}