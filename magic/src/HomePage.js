import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function HomePage() {
  return (
    <Container>
      <h1>Magic: The Gathering Elämäpiste Laskuri</h1>
      <Link to="/player-setup?mode=standard">Standardi peli</Link>
      <Link to="/player-setup?mode=commander">Commander</Link>
    </Container>
  );
}

export default HomePage;