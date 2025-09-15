import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Table, Button, Row, Col } from "react-bootstrap";

function LifeCounter() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState("");
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState([]);
  const [lifePoints, setLifePoints] = useState([]);
  const [poisonCounters, setPoisonCounters] = useState([]);
  const [energyCounters, setEnergyCounters] = useState([]);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode");
    const count = parseInt(queryParams.get("playerCount"));
    const names = JSON.parse(decodeURIComponent(queryParams.get("playerNames")));

    setMode(mode);
    setPlayerCount(count);
    setPlayerNames(names);
    setLifePoints(Array(count).fill(20));
    setPoisonCounters(Array(count).fill(0));
    setEnergyCounters(Array(count).fill(0));
  }, [location]);

  useEffect(() => {
    checkWinner();
  }, [lifePoints, poisonCounters]);

  const handleLifePointChange = (index, delta) => {
    const points = [...lifePoints];
    points[index] += delta;
    if (points[index] < 0) points[index] = 0;
    setLifePoints(points);
  };

  const handlePoisonCounterChange = (index, delta) => {
    const counters = [...poisonCounters];
    counters[index] += delta;
    if (counters[index] < 0) counters[index] = 0;
    if (counters[index] >= 10) {
      counters[index] = 10;
      setWinner(playerNames[index]);
    }
    setPoisonCounters(counters);
  };

  const handleEnergyCounterChange = (index, delta) => {
    const counters = [...energyCounters];
    counters[index] += delta;
    if (counters[index] < 0) counters[index] = 0;
    setEnergyCounters(counters);
  };

  const checkWinner = () => {
    const hasZeroLifePoints = lifePoints.some((points) => points === 0);
    const hasTenPoisonCounters = poisonCounters.some((counter) => counter >= 10);
    if (hasZeroLifePoints || hasTenPoisonCounters) {
      const remainingPlayers = lifePoints.filter((points, index) => points > 0 && poisonCounters[index] < 10);
      if (remainingPlayers.length === 1) {
        const winningPlayerIndex = lifePoints.findIndex((points, index) => points > 0 && poisonCounters[index] < 10);
        const winningPlayerName = playerNames[winningPlayerIndex];
        setWinner(winningPlayerName);
        navigate("/");
      }
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center vh-100">
      <div>
        <h2>Pistelaskuri</h2>
        <p>Pelimuoto: {mode}</p>
        <Table>
          <thead>
            <tr>
              <th>Pelaaja</th>
              <th>Elämäpisteet</th>
              <th>Myrkky</th>
              <th>Energia</th>
            </tr>
          </thead>
          <tbody>
            {playerNames.map((name, index) => (
              <tr key={index}>
                <td>{name}</td>
                <td>
                  <Button variant="danger" onClick={() => handleLifePointChange(index, -1)}>-</Button>
                  {lifePoints[index]}
                  <Button variant="success" onClick={() => handleLifePointChange(index, 1)}>+</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handlePoisonCounterChange(index, -1)}>-</Button>
                  {poisonCounters[index]}
                  <Button variant="success" onClick={() => handlePoisonCounterChange(index, 1)}>+</Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleEnergyCounterChange(index, -1)}>-</Button>
                  {energyCounters[index]}
                  <Button variant="success" onClick={() => handleEnergyCounterChange(index, 1)}>+</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {winner && <p>Onnittelut voittajalle: {winner}!</p>}
      </div>
    </Container>
  );
}

export default LifeCounter;