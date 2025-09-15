import React, { useState } from 'react';
import { Container, Table, Form } from 'react-bootstrap';

function App() {
  const [numPlayers, setNumPlayers] = useState(1);
  const [playerNames, setPlayerNames] = useState([]);
  const [numRounds, setNumRounds] = useState(1);
  const [roundScores, setRoundScores] = useState([]);

  const handleNumPlayersChange = (e) => {
    const count = parseInt(e.target.value);
    setNumPlayers(count);
    setPlayerNames(Array(count).fill(''));
    setRoundScores(Array(count).fill(Array(numRounds).fill(0)));
  };

  const handlePlayerNameChange = (e, index) => {
    const names = [...playerNames];
    names[index] = e.target.value;
    setPlayerNames(names);
  };

  const handleNumRoundsChange = (e) => {
    const count = parseInt(e.target.value);
    setNumRounds(count);
    setRoundScores(playerNames.map(() => Array(count).fill(0)));
  };

  const handleRoundScoreChange = (e, playerIndex, roundIndex) => {
    const scores = [...roundScores];
    scores[playerIndex][roundIndex] = parseInt(e.target.value);
    setRoundScores(scores);
  };

  const getRoundScores = () => {
    const roundArray = Array(numRounds).fill(0).map((_, roundIndex) => roundIndex + 1);
    return roundArray;
  };

  const calculateTotalScore = (playerIndex) => {
    const scores = roundScores[playerIndex];
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    return totalScore;
  };

  return (
    <Container>
      <h1>Frisbee Golf Score Tracker</h1>
      <Form>
        <Form.Group controlId="numPlayers">
          <Form.Label>Number of Players</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={numPlayers}
            onChange={handleNumPlayersChange}
          />
        </Form.Group>
        <Form.Group controlId="playerNames">
          <Form.Label>Player Names</Form.Label>
          {playerNames.map((name, index) => (
            <Form.Control
              key={index}
              type="text"
              placeholder={`Player ${index + 1}`}
              value={name}
              onChange={(e) => handlePlayerNameChange(e, index)}
            />
          ))}
        </Form.Group>
        <Form.Group controlId="numRounds">
          <Form.Label>Number of Rounds</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={numRounds}
            onChange={handleNumRoundsChange}
          />
        </Form.Group>
      </Form>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Player</th>
            {getRoundScores().map((round) => (
              <th key={round}>Round {round}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {playerNames.map((name, playerIndex) => (
            <tr key={playerIndex}>
              <td>{name}</td>
              {getRoundScores().map((roundIndex) => (
                <td key={roundIndex}>
                  <Form.Control
                    type="number"
                    min="0"
                    value={roundScores[playerIndex][roundIndex - 1]}
                    onChange={(e) => handleRoundScoreChange(e, playerIndex, roundIndex - 1)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <Table bordered responsive>
        <thead>
          <tr>
            <th>Player</th>
            {getRoundScores().map((round) => (
              <th key={round}>Round {round}</th>
            ))}
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {playerNames.map((name, playerIndex) => (
            <tr key={playerIndex}>
              <td>{name}</td>
              {getRoundScores().map((roundIndex) => (
                <td key={roundIndex}>{roundScores[playerIndex][roundIndex - 1]}</td>
              ))}
              <td>{calculateTotalScore(playerIndex)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;