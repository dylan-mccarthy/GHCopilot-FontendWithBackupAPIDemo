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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Moons</h1>
      <div className="grid gap-4">
        {moons.map((moon) => (
          <div key={moon.id} className="border p-4 rounded">
            <h2 className="font-bold">{moon.name}</h2>
            <p>Planet ID: {moon.planetId}</p>
            <p>Diameter: {moon.diameter}</p>
            <p>Distance from Planet: {moon.distanceFromPlanet}</p>
            <div className="mt-2">
              <button onClick={() => setEditingMoon(moon)}>Edit</button>
              <button onClick={() => handleDelete(moon.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moons;