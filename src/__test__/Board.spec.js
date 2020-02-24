import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Board } from '../Board'

describe('<Board />', () => {
  test('should render <Board />', () => {
    const squares = Array(9).fill(null)
    const { queryByTestId } = render(<Board squares={squares} />)
    expect(queryByTestId('board')).toBeTruthy()
  })

  test('should render <Board /> with winning line', () => {
    const squares = Array(9).fill(null)
    squares[0] = 'X'
    squares[4] = 'X'
    squares[8] = 'X'
    const winningLine = [0, 4, 8]
    const { queryByTestId } = render(<Board squares={squares} winningLine={winningLine} />)
    expect(queryByTestId('board')).toBeTruthy()
  })

  test('should fire event on click', () => {
    const clickFn = jest.fn()
    const squares = Array(9).fill(null)
    squares[0] = 'X'
    const { queryByTestId } = render(<Board squares={squares} onClick={clickFn} />)
    const container = queryByTestId('board')
    expect(container).toBeTruthy()
    const squareButton = container.getElementsByTagName('button')[0]
    fireEvent.click(squareButton)
    expect(clickFn).toHaveBeenCalled()
  })
})
