import { Square } from './Square';

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;
  else if (window.localStorage.getItem('winner')) {
    return (
      <section className="winner">
        <div className="text">
          <h2>{winner ? 'Ganó' : 'Empate'}</h2>

          <header className="win">{winner && <Square>{winner}</Square>}</header>

          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    );
  } else {
    return (
      <section className="winner">
        <div className="text">
          <h2>{winner ? 'Ganó' : 'Empate'}</h2>

          <header className="win">{winner && <Square>{winner}</Square>}</header>

          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    );
  }
}
