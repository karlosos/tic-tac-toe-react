import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Game } from '../Game'

describe('<Game />', () => {
  test('should render <Game />', () => {
    const { queryByTestId } = render(<Game />)
    expect(queryByTestId('game')).toBeTruthy()
  })

  test('clicked first square', () => {
    const { queryByTestId } = render(<Game />)
    const container = queryByTestId('game')
    const squareButton = container.getElementsByTagName('button')[0]
    fireEvent.click(squareButton)
    expect(squareButton.classList.contains('X')).toBe(true)
  })

  test('clicked jumpTo button', () => {
    const { queryByTestId } = render(<Game />)
    const container = queryByTestId('game')
    const squareButton = container.getElementsByTagName('button')[0]
    fireEvent.click(squareButton)
    expect(squareButton.classList.contains('X')).toBe(true)
    fireEvent.click(container.getElementsByClassName('jump_to')[0])
  })

  test('have winner', () => {
    const { queryByTestId } = render(<Game />)
    const container = queryByTestId('game')
    const squares = container.getElementsByTagName('button')
    fireEvent.click(squares[0]) // X
    fireEvent.click(squares[1]) // O
    fireEvent.click(squares[3])
    fireEvent.click(squares[4])
    fireEvent.click(squares[6])
    const status = queryByTestId('status')
    expect(status.textContent).toBe('Winner: X')
  })

  test('click same square two times', () => {
    const { queryByTestId } = render(<Game />)
    const container = queryByTestId('game')
    const squares = container.getElementsByTagName('button')
    fireEvent.click(squares[0]) // X
    fireEvent.click(squares[0]) // O
    const status = queryByTestId('status')
    expect(status.textContent).toBe('Move: O')
    expect(squares[0].classList.contains('X')).toBe(true)
  })
})
