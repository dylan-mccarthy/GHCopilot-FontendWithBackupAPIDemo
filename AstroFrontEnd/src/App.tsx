import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Planets from './pages/Planets';
import Moons from './pages/Moons';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Planets />} />
        <Route path="/moons" element={<Moons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;