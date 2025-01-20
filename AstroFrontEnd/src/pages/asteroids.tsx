import React, { useState, useEffect } from 'react';
import { getAsteroids, createAsteroid } from '../services/apiservice';
import { Asteroid } from '../services/interfaces';

const Asteroids = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newAsteroid, setNewAsteroid] = useState<Omit<Asteroid, 'id'>>({
    name: '',
    diameterInKm: 0,
    isPotentiallyHazardous: false,
    composition: ''
  });

  useEffect(() => {
    fetchAsteroids();
  }, []);

  const fetchAsteroids = async () => {
    try {
      setError(null);
      const response = await getAsteroids();
      setAsteroids(response.data);
    } catch (error) {
      setError('Failed to fetch asteroids. Please try again later.');
      console.error('Error fetching asteroids:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const response = await createAsteroid(newAsteroid);
      setAsteroids([...asteroids, response.data]);
      setNewAsteroid({
        name: '',
        diameterInKm: 0,
        isPotentiallyHazardous: false,
        composition: ''
      });
      setShowForm(false);
    } catch (error) {
      setError('Failed to create asteroid. Please try again.');
      console.error('Error adding asteroid:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-4">Asteroids</h1>
          <p className="text-xl text-gray-400">
            Discover the fascinating asteroids in our solar system
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
              {showForm ? 'Cancel' : 'Add New Asteroid'}
              <span className="text-2xl">{showForm ? '−' : '+'}</span>
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mt-8 bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Asteroid Name"
                  value={newAsteroid.name}
                  onChange={(e) => setNewAsteroid({...newAsteroid, name: e.target.value})}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
                />
                <input
                  type="number"
                  placeholder="Diameter (km)"
                  value={newAsteroid.diameterInKm}
                  onChange={(e) => setNewAsteroid({...newAsteroid, diameterInKm: Number(e.target.value)})}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
                />
                <input
                  type="text"
                  placeholder="Composition"
                  value={newAsteroid.composition}
                  onChange={(e) => setNewAsteroid({...newAsteroid, composition: e.target.value})}
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3"
                />
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={newAsteroid.isPotentiallyHazardous}
                    onChange={(e) => setNewAsteroid({...newAsteroid, isPotentiallyHazardous: e.target.checked})}
                    className="w-5 h-5"
                  />
                  <label>Potentially Hazardous</label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg 
                           font-semibold transition-all duration-300"
                >
                  Add Asteroid
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {asteroids.map((asteroid) => (
            <div
              key={asteroid.id}
              className="bg-gray-900 rounded-xl p-8 border border-gray-800 
                       hover:border-blue-500 transition-all duration-300 group"
            >
              <h2 className="text-3xl font-bold text-blue-400 mb-4">{asteroid.name}</h2>
              <div className="space-y-3 text-gray-300">
                <p>Diameter: {asteroid.diameterInKm} km</p>
                <p>Composition: {asteroid.composition}</p>
                <p className={asteroid.isPotentiallyHazardous ? "text-red-400" : "text-green-400"}>
                  {asteroid.isPotentiallyHazardous ? "⚠️ Potentially Hazardous" : "✓ Not Hazardous"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Asteroids;
