import React from "react"
import ReactDOM from "react-dom"
import Confetti from 'react-confetti'


// Steps:-
// 1. Create Square component
// 2. Create Board Component
// 3. Display X or O letters Dynamically
// 4. Calculate the Game Winner
// 5. Display Player Letter During Truns
// 6. Restart Game
// 7. Refactor JSX

function Square ({onClick, value}){
  return (
    <button className="square" onClick={onClick} > {value} </button>
  )
}

function Board () {
  const [squares, setSquares] = React.useState(Array(9).fill(null))
  const [isX, setIsX] = React.useState(true)
  
  const handleClick = (i) => {
    if (winnerGame(squares)){
      return
    }
    squares[i] = isX ? '😊' : '😒'
    setSquares(squares)
    setIsX(!isX)
  }

  let status
  if(winnerGame(squares)) {
    <Confetti />
    status = `Winner of the game is: ${winnerGame(squares)}`
  } else( 
    status = `Next Player is ${isX ? '😊' : '😒'}`
  )
  
  function handleRestart () {
      setIsX(true)
      setSquares(Array(9).fill(null))
  }
  
  return (
    <div className="board">
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
      <div className="status">{status}</div>
      <div>{winnerGame(squares) && <Confetti />}</div>
      <button className="restart" onClick={handleRestart}>Restart Game!</button>
    </div>
  )
}

function winnerGame(squares) {
  const winnerPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]  
  for (let i = 0; i < winnerPatterns.length; i++){
    const [a, b, c] = winnerPatterns[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a]
    }
  }
  return null
}

ReactDOM.render(<Board />, document.getElementById("root"))