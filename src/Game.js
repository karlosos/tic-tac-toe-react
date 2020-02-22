import React, { useState } from 'react';
import { Board } from './Board';
import { calculateWinner } from './helpers';

export const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    let current = history[stepNumber];
    let winner = calculateWinner(current.squares);
    let moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        )
    });
    let status = winner 
        ? 'Winner: ' + winner.winner
        : 'Next player: ' + (xIsNext ? 'X' : 'O');

    let winningLine = null;
    if (winner) {
        winningLine = winner.line;
    }

    const handleClick = (i) => {
        let newHistory = history.slice(0, stepNumber + 1);
        current = newHistory[newHistory.length - 1];
        let squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        newHistory = newHistory.concat([{
            squares: squares,
        }]);
        setHistory(newHistory);
        setStepNumber(newHistory.length-1);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0)
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                    winningLine={winningLine}
                />
            </div>
            <div className="game-info">
                <div><h2>{status}</h2></div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
