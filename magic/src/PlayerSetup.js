import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function PlayerSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const gameMode = queryParams.get("mode");

  const handlePlayerCountChange = (event) => {
    const count = parseInt(event.target.value);
    setPlayerCount(count);
    setPlayerNames(Array(count).fill(""));
  };

  const handlePlayerNameChange = (event, index) => {
    const names = [...playerNames];
    names[index] = event.target.value;
    setPlayerNames(names);
  };

  const handleStartGame = () => {
    navigate(`/life-counter?mode=${gameMode}&playerCount=${playerCount}&playerNames=${encodeURIComponent(JSON.stringify(playerNames))}`);
  };

  return (
    <div>
      <h2>Pelaajien asetus</h2>
      <label>
        Pelaajien määrä:
        <input
          type="number"
          min="2"
          value={playerCount}
          onChange={handlePlayerCountChange}
        />
      </label>
      <ul>
        {playerNames.map((name, index) => (
          <li key={index}>
            <input
              type="text"
              placeholder={`Pelaaja ${index + 1}`}
              value={name}
              onChange={(event) => handlePlayerNameChange(event, index)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleStartGame}>Aloita peli</button>
    </div>
  );
}

export default PlayerSetup;