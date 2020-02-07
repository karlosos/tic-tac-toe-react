import React, { useState } from 'react';
import { Board } from './Board';

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
        ? 'Winner: ' + winner 
        : 'Next player: ' + (xIsNext ? 'X' : 'O');


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
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
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
        const threeInLine = squares[a] && squares[a] === squares[b]
            && squares[a] === squares[c];
        if (threeInLine) {
            return squares[a];
        }
    }
    return null;
}
