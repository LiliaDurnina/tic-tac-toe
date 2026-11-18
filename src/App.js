import { useState } from 'react';

function Square({ square, onSquareClick, isWinning }) {

  return (
    <button
      className={`square ${isWinning ? 'winner' : ""}`}
      onClick={onSquareClick}
    >
      {square}
    </button >
  );
}

function Board({ squares, isXNext, onPlay }) {

  function handleClick(i) {
    let step = '';
    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }
    else {
      step = isXNext ? 'X' : "O";
    }
    const newArr = squares.slice();
    newArr[i] = step;
    onPlay(newArr);
  }

  const winner = calculateWinner(squares);
  let status = '';
  if (squares[winner[0]]) {
    status = `Победитель ${squares[winner[0]]}`
  }
  else if (!squares.includes(null)) {
    status = `НИЧЬЯ`

  }

  else {
    status = `Следующий игрок ${isXNext ? 'X' : "O"}`;
  }



  return (
    <>
      <div> Status: {status} </div>
      <div className="board-row">
        <Square square={squares[0]} onSquareClick={() => handleClick(0)} isWinning={winner.includes(0)} />
        <Square square={squares[1]} onSquareClick={() => handleClick(1)} isWinning={winner.includes(1)} />
        <Square square={squares[2]} onSquareClick={() => handleClick(2)} isWinning={winner.includes(2)} />
      </div>
      <div className="board-row">
        <Square square={squares[3]} onSquareClick={() => handleClick(3)} isWinning={winner.includes(3)} />
        <Square square={squares[4]} onSquareClick={() => handleClick(4)} isWinning={winner.includes(4)} />
        <Square square={squares[5]} onSquareClick={() => handleClick(5)} isWinning={winner.includes(5)} />
      </div>
      <div className="board-row">
        <Square square={squares[6]} onSquareClick={() => handleClick(6)} isWinning={winner.includes(6)} />
        <Square square={squares[7]} onSquareClick={() => handleClick(7)} isWinning={winner.includes(7)} />
        <Square square={squares[8]} onSquareClick={() => handleClick(8)} isWinning={winner.includes(8)} />
      </div>
    </>
  );
}




export default function Game() {

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];

  function hundleHistory(newSquare) {
    const newHistory = [...history, newSquare];
    setHistory(newHistory);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move) {
    const newHistory = history.slice(0, move + 1);
    setHistory(newHistory);
    setXIsNext((move % 2 == 0) ? true : false)
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = `Вернуться к ходу ${move}`;
    }

    else {
      description = `Вернуться к началу`;
    }

    return (<li key={move}>
      <button onClick={() => jumpTo(move)}> {description}</button>
    </li>)


  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} isXNext={xIsNext} onPlay={hundleHistory} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }

  }
  return [null];
}





