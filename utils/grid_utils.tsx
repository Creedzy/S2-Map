import React from 'react';

// Migrate the utility functions
export function getCellWidth(index: number, totalWidth: number): number {
    const fractions = [0.0713, 0.0758, 0.0738, 0.0758, 0.0733, 0.0743, 0.1025, 0.0742, 0.0748, 0.0768, 0.0722, 0.0757, 0.0764];
    return totalWidth * fractions[index % fractions.length];
  }
  
export  function getCellHeight(index: number, totalHeight: number): number {
    const fractions = [0.0736, 0.0716, 0.0730, 0.0747, 0.0751, 0.0740, 0.1025, 0.0735, 0.0740, 0.0751, 0.0755, 0.0760, 0.0767];
    return totalHeight * fractions[index % fractions.length];
}