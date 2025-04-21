
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import BattleshipGame from './pages/BattleshipGame';
import ArtGallery from './pages/ArtGallery';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/battleship" element={<BattleshipGame />} />
        <Route path="/art-gallery" element={<ArtGallery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
