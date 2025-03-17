import { useState, useEffect } from 'react';
import { getMoons, createMoon, updateMoon, deleteMoon } from '../services/apiservice';
import { Moon } from '../services/interfaces';
import React from 'react';

const Moons = () => {
  const [moons, setMoons] = useState<Moon[]>([]);
  const [editingMoon, setEditingMoon] = useState<Moon | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newMoon, setNewMoon] = useState<Omit<Moon, 'id'>>({
    name: '',
    planetId: 0,
    diameter: 0,
    distanceFromPlanet: 0
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleCreate(newMoon);
      setNewMoon({
        name: '',
        planetId: 0,
        diameter: 0,
        distanceFromPlanet: 0
      });
      setShowForm(false);
    } catch (error) {
      console.error('Error adding moon:', error);
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

        <div className="flex justify-end mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                     text-lg font-semibold transition-all duration-300 flex items-center gap-2"
          >
            {showForm ? 'Cancel' : 'Add New Moon'}
            <span className="text-2xl">{showForm ? '−' : '+'}</span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-8 bg-gray-900 rounded-xl p-8 border border-gray-800">
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Moon Name"
                value={newMoon.name}
                onChange={(e) => setNewMoon({...newMoon, name: e.target.value})}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
              />
              <input
                type="number"
                placeholder="Planet ID"
                value={newMoon.planetId}
                onChange={(e) => setNewMoon({...newMoon, planetId: Number(e.target.value)})}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
              />
              <input
                type="number"
                placeholder="Diameter (km)"
                value={newMoon.diameter}
                onChange={(e) => setNewMoon({...newMoon, diameter: Number(e.target.value)})}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
              />
              <input
                type="number"
                placeholder="Distance from Planet (km)"
                value={newMoon.distanceFromPlanet}
                onChange={(e) => setNewMoon({...newMoon, distanceFromPlanet: Number(e.target.value)})}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                         font-semibold transition-all duration-300"
              >
                Add Moon
              </button>
            </div>
          </form>
        )}

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
