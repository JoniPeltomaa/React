import React, { useState } from 'react';

function PlayerForm({ addPlayer }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      addPlayer(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Player</button>
    </form>
  );
}

export default PlayerForm;