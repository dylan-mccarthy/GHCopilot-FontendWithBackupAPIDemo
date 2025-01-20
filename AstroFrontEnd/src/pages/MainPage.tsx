import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-white mb-4 tracking-tight">
            Astronomy Explorer
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover the wonders of our solar system
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto px-4">
          <Link 
            to="/planets" 
            className="group p-8 rounded-2xl bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 mb-3">
              Planets
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Explore the fascinating planets in our solar system and learn about their unique characteristics
            </p>
          </Link>
          <Link 
            to="/moons" 
            className="group p-8 rounded-2xl bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 mb-3">
              Moons
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Discover the diverse moons that orbit our planets and their incredible features
            </p>
          </Link>
          <Link 
            to="/asteroids" 
            className="group p-8 rounded-2xl bg-gray-800 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 mb-3">
              Asteroids
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Learn about the fascinating asteroids that orbit in our solar system
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainPage;