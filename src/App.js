import React, { useState } from 'react';
import './App.css';

function App() {
  const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (!gameBoard[index] && !winner) {
      const newGameBoard = [...gameBoard];
      newGameBoard[index] = currentPlayer;
      setGameBoard(newGameBoard);
      checkWinner(newGameBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('tie');
    }
  };

  const handleReset = () => {
    setGameBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="container">
      <h1>Крестики-нолики</h1>
      <div className="game-board">
        {gameBoard.map((cell, index) => (
          <div
            key={index}
            className="cell"
            data-index={index}
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="result">
        {winner === 'tie' ? (
          <h2>Ничья!</h2>
        ) : winner ? (
          <h2>Победил игрок "{winner}"!</h2>
        ) : (
          <h2>Ход игрока "{currentPlayer}"</h2>
        )}
      </div>
      <button className="reset-button" onClick={handleReset}>
        Новая игра
      </button>
    </div>
  );
}

export default App;