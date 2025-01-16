import { useState, useEffect } from 'react';
import { getPlanets, createPlanet, updatePlanet, deletePlanet } from '../services/apiservice';
import { Planet } from '../services/interfaces';
import React from 'react';

const Planets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [editingPlanet, setEditingPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      const response = await getPlanets();
      setPlanets(response.data);
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const handleCreate = async (planet: Omit<Planet, 'id'>) => {
    try {
      await createPlanet(planet);
      fetchPlanets();
    } catch (error) {
      console.error('Error creating planet:', error);
    }
  };

  const handleUpdate = async (id: number, planet: Planet) => {
    try {
      await updatePlanet(id, planet);
      fetchPlanets();
      setEditingPlanet(null);
    } catch (error) {
      console.error('Error updating planet:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePlanet(id);
      fetchPlanets();
    } catch (error) {
      console.error('Error deleting planet:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Planets</h1>
      <div className="grid gap-4">
        {planets.map((planet) => (
          <div key={planet.id} className="border p-4 rounded">
            <h2 className="font-bold">{planet.name}</h2>
            <p>Type: {planet.type}</p>
            <p>Distance from Sun: {planet.distanceFromSun}</p>
            <p>Has Rings: {planet.hasRings ? 'Yes' : 'No'}</p>
            <div className="mt-2">
              <button onClick={() => setEditingPlanet(planet)}>Edit</button>
              <button onClick={() => handleDelete(planet.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;