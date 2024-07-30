import { useState } from 'react';

export default function Player({ initialName, symbol, active, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [editing, setEditing] = useState(false);

  // Helper
  function handleEdit() {
    setEditing((editing) => !editing);

    if (editing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value.toUpperCase());
  }

  const handleFocus = (event) => event.target.select();

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      handleEdit();
    }
  }

  return (
    <li className={active ? 'active' : ''}>
      <span className="player">
        {editing ? (
          <input
            type="text"
            value={playerName}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            autoFocus
            required
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{editing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
