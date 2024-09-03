'use client';

import "@/app/globals.css";
import NextImage from "next/image";
import React, { useState, useEffect } from 'react';
import { Alliance, GridCell } from '../types/types'
import { FaRegCircle, FaCheckCircle, FaTimes } from 'react-icons/fa';
import MessageModal from './MessageModal';


export default function AllianceList({ mapId, selectedAlliance, setSelectedAlliance, grid, setGrid }: { mapId: string, selectedAlliance: Alliance | null, setSelectedAlliance: (alliance: Alliance | null) => void, grid: GridCell[][], setGrid: (grid: GridCell[][]) => void }) {
  const [alliances, setAlliances] = useState<Alliance[]>([]);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAllianceClick = (alliance: Alliance) => {
    setSelectedAlliance(selectedAlliance && selectedAlliance.id === alliance.id ? null : alliance);
  };

  const [currentMapId, setCurrentMapId] = useState(mapId);

  useEffect(() => {
    const savedMapId = localStorage.getItem('mapId');
    if (savedMapId) {
      setCurrentMapId(savedMapId);
    }
  }, []);

  const handleMapIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMapId(e.target.value);
    localStorage.setItem('mapId', e.target.value);
  };

  useEffect(() => {
    const fetchAlliances = async () => {
      try {
        const response = await fetch(`/api/alliances?mapId=${currentMapId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setAlliances(data);
          console.log('Loaded alliances:', data);
        } else {
          console.log('No alliances found, using defaults');
          setAlliances(getDefaultAlliances());
        }
      } catch (error) {
        console.error('Error fetching alliances:', error);
        setAlliances(getDefaultAlliances());
      }
    };
    fetchAlliances();
    console.log('Alliances state was updated');
  }, [mapId]);

  const handleLoad = async () => {
    try {
      const response = await fetch(`/api/alliances?mapId=${currentMapId}`);
      const data = await response.json();
      console.log('Setting alliances:', data);
      if (Array.isArray(data)) {
        setAlliances(data);
        console.log('Loaded alliances:', data);
      } else {
        console.log('No alliances found, using defaults');
        setAlliances(getDefaultAlliances());
      }
      
    } catch (error) {
      console.error('Error loading data:', error);
      setAlliances(getDefaultAlliances());
    }

    try {
      const gridresponse = await fetch(`/api/grid?mapId=${currentMapId}`);
      const griddata = await gridresponse.json();
      console.log('Setting grid:', griddata);
      if (Array.isArray(griddata)) {
        setGrid(griddata);
        console.log('Loaded grid:', griddata);
      } else {
        console.log('No grid found, using defaults');
        setGrid(createEmptyGrid());
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setGrid(createEmptyGrid());
    }
    setModalMessage('Data loaded successfully!');
    setIsModalOpen(true);
    
  };

  const handleSave = async () => {
    try {
      await fetch('/api/alliances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mapId: currentMapId,
          alliances,
        }),
      });
      
    } catch (error) {
      console.error('Error saving data:', error);
    }

    try {
      await fetch('/api/grid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mapId: currentMapId,
          grid,
        }),
      });
      
    } catch (error) {
      console.error('Error saving data:', error);
    }
    setModalMessage('Data saved successfully!');
    setIsModalOpen(true);
  };

  const removeAlliance = (id: number) => {
    setAlliances(alliances.filter(alliance => alliance.id !== id));
  };

  const addNewAlliance = () => {
    const newId = Math.max(...alliances.map(a => a.id)) + 1;
    const newAlliance: Alliance = {
      id: newId,
      name: `New Alliance ${newId}`,
      alias: `NA${newId}`,
      color: '#000000',
      opacity: 0.5
    };
    setAlliances([...alliances, newAlliance]);
  };

  const createEmptyGrid = () => {
    const rows = 13; // Adjust as needed
    const cols = 13; // Adjust as needed
    return Array(rows).fill(null).map(() => Array(cols).fill(null));
  };

  const getDefaultAlliances = (): Alliance[] => {
    return [
      { id: 1, name: 'N3RDS', alias: "N3R", color: '#044cdd', opacity: 0.5 },
      { id: 2, name: 'Reset All Troops', alias: "RAT", color: '#FF0000', opacity: 0.5 },
      { id: 3, name: 'Guns And Ammo', alias: "GnA", color: '#efe306', opacity: 0.5 },
      { id: 4, name: 'Stronger Together', alias: "UNX", color: '#2DD317', opacity: 0.5 },
      // Add more default alliances as needed
    ];
  };


  const handleAllianceChange = (id: number, field: keyof Alliance, value: string) => {
    setAlliances(alliances.map(alliance =>
      alliance.id === id ? { ...alliance, [field]: value } : alliance
    ));
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
      <p className="text-gray-700 mb-2">Map ID:</p>
  <div className="flex flex-col space-y-2">
    <input
      type="text"
      value={currentMapId}
      onChange={handleMapIdChange}
      placeholder="Enter Map ID"
      className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <div className="flex justify-between space-x-2">
      <button onClick={handleLoad} className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">Load</button>
      <button onClick={handleSave} className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">Save</button>
    </div>
  </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Alliances</h2>
      <button onClick={addNewAlliance} className="mb-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300">Add New Alliance</button>
      <ul className="space-y-3">
        {alliances.map(alliance => (
          <li
            key={alliance.id}
            className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow"
            onClick={() => handleAllianceClick(alliance)}
          >
            <div className="flex-shrink-0 mr-2">
              {selectedAlliance?.id === alliance.id ? (
                <FaCheckCircle size={20} color={alliance.color} />
              ) : (
                <FaRegCircle size={20} color={alliance.color} />
              )}
            </div>
            <input
              type="text"
              className="flex-grow min-w-0 px-2 py-1 text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={alliance.name}
              onChange={(e) => handleAllianceChange(alliance.id, 'name', e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <input
              type="text"
              className="w-16 px-2 py-1 text-sm text-gray-800 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={alliance.alias}
              onChange={(e) => handleAllianceChange(alliance.id, 'alias', e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <input
              type="color"
              className="w-8 h-8 rounded cursor-pointer"
              value={alliance.color}
              onChange={(e) => handleAllianceChange(alliance.id, 'color', e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            <FaTimes
              size={16}
              className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300 flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                removeAlliance(alliance.id);
              }}
            />
          </li>

        ))}
      </ul>
      <MessageModal
        message={modalMessage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}