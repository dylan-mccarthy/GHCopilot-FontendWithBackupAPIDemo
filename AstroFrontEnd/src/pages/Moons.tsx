import { useState, useEffect } from 'react';
import { getMoons, createMoon, updateMoon, deleteMoon } from '../services/apiservice';
import { Moon } from '../services/interfaces';
import React from 'react';

const Moons = () => {
  const [moons, setMoons] = useState<Moon[]>([]);
  const [editingMoon, setEditingMoon] = useState<Moon | null>(null);

  useEffect(() => {
    fetchMoons();
  }, []);

  const fetchMoons = async () => {
    try {
      const response = await getMoons();
      setMoons(response.data);
    } catch (error) {
      console.error('Error fetching moons:', error);
    }
  };

  const handleCreate = async (moon: Omit<Moon, 'id'>) => {
    try {
      await createMoon(moon);
      fetchMoons();
    } catch (error) {
      console.error('Error creating moon:', error);
    }
  };

  const handleUpdate = async (id: number, moon: Moon) => {
    try {
      await updateMoon(id, moon);
      fetchMoons();
      setEditingMoon(null);
    } catch (error) {
      console.error('Error updating moon:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMoon(id);
      fetchMoons();
    } catch (error) {
      console.error('Error deleting moon:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">Moons</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the natural satellites orbiting our planets
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {moons.map((moon) => (
            <div 
              key={moon.id} 
              className="rounded-xl p-8 bg-gray-800/50 backdrop-blur border border-gray-700 transition-all duration-300 hover:border-blue-500 shadow-xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-blue-400 mb-4">{moon.name}</h2>
                  <div className="space-y-3 text-lg">
                    <p className="text-gray-300">Planet ID: {moon.planetId}</p>
                    <p className="text-gray-300">Diameter: {moon.diameter.toLocaleString()} km</p>
                    <p className="text-gray-300">Distance from Planet: {moon.distanceFromPlanet.toLocaleString()} km</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setEditingMoon(moon)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(moon.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Moons;