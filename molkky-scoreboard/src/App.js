import React, { useState } from 'react';
import PlayerForm from './PlayerForm';
import Scoreboard from './Scoreboard';

function App() {
  const [players, setPlayers] = useState([]);

  const addPlayer = (name) => {
    const newPlayer = { name, score: 0 };
    setPlayers([...players, newPlayer]);
  };

  const updateScore = (index, score) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].score += score;
    if (updatedPlayers[index].score > 50) {
      updatedPlayers[index].score = 25;
    }
    setPlayers(updatedPlayers);
  };

  const checkGameEnd = () => {
    for (const player of players) {
      if (player.score >= 50) {
        return true;
      }
    }
    return false;
  };

  const checkSecondLastPlayer = () => {
    if (players.length >= 2) {
      return players[players.length - 2].score >= 50;
    }
    return false;
  };

  return (
    <div>
      <h1>Mölkky Scoreboard</h1>
      <PlayerForm addPlayer={addPlayer} />
      <Scoreboard players={players} updateScore={updateScore} />
      {checkGameEnd() && <h2>Game Over!</h2>}
      {checkSecondLastPlayer() && <h2>Second last player reached 50 points!</h2>}
    </div>
  );
}

export default App;
