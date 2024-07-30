import { useState } from 'react';
import GameBoard from './components/GameBoard';
import Player from './components/Player';
import Log from './components/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver';

const INITIAL_GAME_BOARD = Array(3)
  .fill(null)
  .map(() => Array(3).fill(null));

const PLAYERS = {
  X: 'PLAYER 1',
  O: 'PLAYER 2',
};

function getActivePlayer(turns) {
  let activePlayer = 'X';
  if (turns.length > 0 && turns[0].player === 'X') {
    activePlayer = 'O';
  }

  return activePlayer;
}

function getGameBoard(turns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function getWinner(board, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = board[combination[0].row][combination[0].col];
    const secondSymbol = board[combination[1].row][combination[1].col];
    const thirdSymbol = board[combination[2].row][combination[2].col];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}

export default function App() {
  // State
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);

  // Derived
  const activePlayer = getActivePlayer(gameTurns);
  const gameBoard = getGameBoard(gameTurns);
  const winner = getWinner(gameBoard, players);
  const draw = gameTurns.length === 9 && !winner;

  // Helper (Handler)
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const activePlayer = getActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: activePlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handleChangeName(symbol, newName) {
    setPlayers((players) => {
      return {
        ...players,
        [symbol]: newName,
      };
    });
  }

  // Render
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            active={activePlayer === 'X'}
            onChangeName={handleChangeName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            active={activePlayer === 'O'}
            onChangeName={handleChangeName}
          />
        </ol>
        {(winner || draw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
