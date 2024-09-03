'use client';

import React, { useRef, useEffect, useState } from 'react';
import NextImage from "next/image";
import Grid  from '@/components/grid';
import MessageModal  from '@/components/MessageModal';
import { GridCell, ImageSize, Alliance } from '../types/types';
import mapImage from '../public/map-hq-original.png';
import { getCellHeight, getCellWidth } from '@/utils/grid_utils';

export default function S2Map( {mapId, selectedAlliance, grid , setGrid} : { mapId: string, selectedAlliance: Alliance | null, grid: GridCell[][], setGrid: (grid: GridCell[][]) => void }) {
  const [imageSize, setImageSize] = useState<ImageSize>({ width: 0, height: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [currentGrid, setCurrentGrid] = useState<GridCell[][]>(grid);
  const [modalMessage, setModalMessage] = useState<string>('Please select an Alliance using the buttons on the right.');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateSize = () => {
      if (mapContainerRef.current) {
        setImageSize({
          width: mapContainerRef.current.offsetWidth,
          height: mapContainerRef.current.offsetHeight
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        let data = await fetch('/api/grid?mapId=' + mapId);
        let grid = await data.json();
        setGrid(grid.length > 0 ? grid : createEmptyGrid());
      } catch (error) {
        console.error('Error fetching grid:', error);
        setGrid(createEmptyGrid());
      }
    };
    fetchInitialData();
  }, [mapId]);
  
  const createEmptyGrid = () => {
    const rows = 13; // Adjust as needed
    const cols = 13; // Adjust as needed
    return Array(rows).fill(null).map(() => Array(cols).fill(null));
  };

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;

      const maxWidth = window.innerWidth * 0.8;
      const maxHeight = window.innerHeight * 0.8;
      const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);

      setImageSize({
        width: naturalWidth * scale,
        height: naturalHeight * scale
      });
    };
    img.src = mapImage.src;
  }, [mapImage]);
  
  const handleGridClick = (rowIndex: number, colIndex: number) => {
    if (selectedAlliance) {
      const newGrid = [...grid];
      if (newGrid[rowIndex][colIndex] && newGrid[rowIndex][colIndex]?.id === selectedAlliance.id) {
        newGrid[rowIndex][colIndex] = null;
      } else {
        newGrid[rowIndex][colIndex] = { ...selectedAlliance, opacity: 0.5 };
      }
      setGrid(newGrid);
    } else {
      setIsModalOpen(true);
    }
  };
  const gridSizes = (grid || []).map((row, rowIndex) => 
    (row || []).map((_, colIndex) => ({
      width: getCellWidth(colIndex, imageSize.width),
      height: getCellHeight(rowIndex, imageSize.height)
    }))
  );


  return (
    <>
    <div 
      ref={mapContainerRef}
      className="map-container" 
      style={{ 
        width: `${imageSize.width}px`, 
        height: `${imageSize.height}px`,
        position: 'relative'
      }}
    >
      <NextImage
        src={mapImage}
        alt="N3RDS S2 Map"
        layout="fill"
        objectFit="contain"
        priority
      />
      <Grid grid={grid} gridSizes={gridSizes} handleGridClick={handleGridClick} />
    </div>
    
    <MessageModal
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
    />
    </>
  );
}