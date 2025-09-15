import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PlayerSetup from "./PlayerSetup";
import LifeCounter from "./LifeCounter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/player-setup" element={<PlayerSetup />} />
        <Route path="/life-counter" element={<LifeCounter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;