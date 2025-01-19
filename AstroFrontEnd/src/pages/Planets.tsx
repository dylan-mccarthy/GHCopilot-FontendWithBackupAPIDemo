import React, { useState, useEffect } from 'react';
import { getPlanets, createPlanet } from '../services/apiservice';
import { Planet } from '../services/interfaces';

const Planets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newPlanet, setNewPlanet] = useState<Omit<Planet, 'id'>>({
    name: '',
    description: '',
    distanceFromSun: 0
  });

  useEffect(() => {
    fetchPlanets();
  }, []);

  const fetchPlanets = async () => {
    try {
      setError(null);
      const response = await getPlanets();
      setPlanets(response.data);
    } catch (error) {
      setError('Failed to fetch planets. Please try again later.');
      console.error('Error fetching planets:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await createPlanet(newPlanet);
      setPlanets([...planets, response.data]);
      setNewPlanet({
        name: '',
        description: '',
        distanceFromSun: 0
      });
      setShowForm(false);
    } catch (error) {
      setError('Failed to create planet. Please try again.');
      console.error('Error adding planet:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-4">Planets</h1>
          <p className="text-xl text-gray-400">
            Explore the diverse worlds of our solar system
          </p>
        </div>

        {error && (
          <div className="max-w-3xl mx-auto mb-8">
            <div className="bg-red-900/50 border-2 border-red-700 text-red-100 px-6 py-4 rounded-lg">
              {error}
            </div>
          </div>
        )}

        <div className="max-w-5xl mx-auto mb-12">
          <div className="flex justify-end">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg 
                       text-lg font-semibold transition-all duration-300 flex items-center gap-2"
            >
              {showForm ? 'Cancel' : 'Add New Planet'}
              <span className="text-2xl">{showForm ? '−' : '+'}</span>
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-8 bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Planet Name"
                  value={newPlanet.name}
                  onChange={(e) => setNewPlanet({...newPlanet, name: e.target.value})}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
                />
                <textarea
                  placeholder="Description"
                  value={newPlanet.description}
                  onChange={(e) => setNewPlanet({...newPlanet, description: e.target.value})}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
                  rows={4}
                />
                <input
                  type="number"
                  placeholder="Distance from Sun (million km)"
                  value={newPlanet.distanceFromSun}
                  onChange={(e) => setNewPlanet({...newPlanet, distanceFromSun: Number(e.target.value)})}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                           font-semibold transition-all duration-300"
                >
                  Add Planet
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planets.map((planet) => (
            <div
              key={planet.id}
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 
                       hover:border-blue-500 transition-all duration-300 group"
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-4">{planet.name}</h2>
              <p className="text-gray-300 mb-6">{planet.description}</p>
              <div className="pt-4 border-t border-gray-800">
                <p className="text-gray-400">
                  Distance from Sun: {planet.distanceFromSun.toLocaleString()} million km
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planets;