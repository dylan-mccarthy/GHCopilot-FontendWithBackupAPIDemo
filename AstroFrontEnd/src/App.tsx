import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Planets from './pages/Planets';
import Moons from './pages/Moons';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/planets" element={<Planets />} />
        <Route path="/moons" element={<Moons />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;