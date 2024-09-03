'use client'

import React, { useState, useEffect } from 'react';
import Map from './map';
import { GridCell } from '../types/types';
import { getInitialGrid, updateGrid } from '../utils/data_utils.server';
import mapImage from '../public/map-hq-original.png';
import { getCellHeight, getCellWidth } from '../utils/grid_utils';

interface MapContainerProps {
  mapId: string;
}

export default function MapContainer({ mapId }: MapContainerProps) {
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const fetchInitialGrid = async () => {
      const initialGrid = await getInitialGrid(mapId);
      setGrid(initialGrid);
    };
    fetchInitialGrid();
  }, [mapId]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;
      const scale = Math.min(maxWidth / img.naturalWidth, maxHeight / img.naturalHeight);
      setImageSize({
        width: img.naturalWidth * scale,
        height: img.naturalHeight * scale
      });
    };
    img.src = mapImage.src;
  }, []);

  const gridSizes = grid.map((row, rowIndex) => 
    row.map((_, colIndex) => ({
      width: getCellWidth(colIndex, imageSize.width),
      height: getCellHeight(rowIndex, imageSize.height)
    }))
  );

  const handleGridClick = async (rowIndex: number, colIndex: number) => {
    const newGrid = [...grid];
    // Your update logic here
    setGrid(newGrid);
    await updateGrid(mapId, newGrid);
  };

  return (
    <Map
      mapImage={mapImage.src}
      grid={grid}
      gridSizes={gridSizes}
      handleGridClick={handleGridClick}
    />
  );
}
