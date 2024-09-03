'use client';

import React, { useState, useEffect } from 'react';
import S2Map from './map';
import AllianceList from './alliance_list';
import { Alliance, GridCell } from '../types/types';



export default function App() {
  const [selectedAlliance, setSelectedAlliance] = useState<Alliance | null>(null);
  const [mapId, setMapId] = useState<string>("Default");
  const [grid, setGrid] = useState<GridCell[][]>([]);


  return (
    <div className="App bg-white shadow-xl rounded-lg overflow-hidden"> {/* Increased shadow */}
      <header className="bg-amber-600 text-white py-6 px-8"> {/* Adjusted header color and padding */}
        <h1 className="text-4xl font-bold">N3RDS S2 Map</h1> {/* Increased font size */}
      </header>
      <main className="flex flex-col lg:flex-row"> {/* Changed breakpoint to lg */}
        <div className="w-full lg:w-2/3 p-6"> {/* Increased padding */}
          <S2Map 
            mapId={mapId}
            selectedAlliance={selectedAlliance}
            grid={grid}
            setGrid={setGrid}
          />
        </div>
        <div className="w-full lg:w-1/3 p-6 bg-amber-50"> {/* Adjusted background color and padding */}
          <AllianceList 
            mapId={mapId}
            selectedAlliance={selectedAlliance}
            setSelectedAlliance={setSelectedAlliance}
            grid={grid}
            setGrid={setGrid}
          />
        </div>
      </main>
    </div>
  );
}