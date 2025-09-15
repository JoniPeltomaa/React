import React from 'react';

function Scoreboard({ players, updateScore }) {
  const handleScoreChange = (index, score) => {
    updateScore(index, score);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr key={index}>
            <td>{player.name}</td>
            <td>
              <div className="score-buttons">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((score) => (
                  <button
                    key={score}
                    onClick={() => handleScoreChange(index, score)}
                  >
                    {score}
                  </button>
                ))}
              </div>
              Total Score: {player.score}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Scoreboard;