import React, { useState } from 'react'
import { Board } from './Board'
import { calculateWinner } from './helpers'

export const Game = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }])
  const [stepNumber, setStepNumber] = useState(0)
  const [xIsNext, setXIsNext] = useState(true)

  let current = history[stepNumber]
  const winner = calculateWinner(current.squares)
  const moves = history.map((step, move) => {
    const desc = move
      ? 'Go to move #' + move
      : 'Go to game start'
    return (
      <li key={move}>
        <button className='jump_to' onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })
  const status = winner
    ? 'Winner: ' + winner.winner
    : 'Move: ' + (xIsNext ? 'X' : 'O')

  let winningLine = null
  if (winner) {
    winningLine = winner.line
  }

  const handleClick = (i) => {
    let newHistory = history.slice(0, stepNumber + 1)
    current = newHistory[newHistory.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? 'X' : 'O'
    newHistory = newHistory.concat([{
      squares: squares
    }])
    setHistory(newHistory)
    setStepNumber(newHistory.length - 1)
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step) => {
    setStepNumber(step)
    setXIsNext((step % 2) === 0)
  }

  return (
    <div className='game' data-testid='game'>
      <div className='game-board'>
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          winningLine={winningLine}
        />
      </div>
      <div className='game-info'>
        <div><h2 data-testid='status'>{status}</h2></div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}
