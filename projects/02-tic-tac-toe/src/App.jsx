import { useState } from 'react';
import confetti from 'canvas-confetti';

import { Square } from './components/Square.jsx';
import { TURNS } from './constants';
import { checkWinnerFrom, checkEndGame } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import {
  saveGameToStorage,
  saveWinnerToStorage,
  resetGameStorage,
} from './logic/storage/index.js';

function App() {
  //inicializacion del estado del tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if (boardFromStorage) {
      return JSON.parse(boardFromStorage);
    }
    return Array(9).fill(null);
  });
  // crear el estado del turno, empieza X
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    if (turnFromStorage) {
      return turnFromStorage;
    }
    return TURNS.X;
  });
  // crear el estado del ganador, null es que no hay ganador,
  // false es que hay un empate
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner');
    if (winnerFromStorage) {
      return winnerFromStorage;
    }
    return null;
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  };

  // función para actualizar el tablero
  const updateBoard = index => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return;
    // copiar el tablero, para no mutar el estado de la propiedad
    const newBoard = [...board];
    // cambiar el valor de la posición
    newBoard[index] = turn;
    // actualizar el tablero
    setBoard(newBoard);
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    //guardar la partida en el local storage
    saveGameToStorage({ board: newBoard, turn: newTurn });
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      saveWinnerToStorage(newWinner);
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      // hay empate
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}

export default App;
