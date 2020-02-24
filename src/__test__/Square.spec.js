import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Square } from '../Square'

describe('<Square />', () => {
  test('render with X icon', () => {
    const { queryByTestId } = render(<Square value='X' winning={false} />)
    expect(queryByTestId('square_button')).toBeTruthy()
    const classList = queryByTestId('square_button').classList
    expect(classList.contains('X')).toBeTruthy()
    expect(classList.contains('winning')).toBeFalsy()
  })

  test('render with O icon', () => {
    const { queryByTestId } = render(<Square value='O' winning={false} />)
    expect(queryByTestId('square_button')).toBeTruthy()
    const classList = queryByTestId('square_button').classList
    expect(classList.contains('O')).toBeTruthy()
    expect(classList.contains('winning')).toBeFalsy()
  })

  test('render with winning class', () => {
    const { queryByTestId } = render(<Square value='O' winning />)
    expect(queryByTestId('square_button')).toBeTruthy()
    const classList = queryByTestId('square_button').classList
    expect(classList.contains('winning')).toBeTruthy()
  })

  test('render empty square', () => {
    const { queryByTestId } = render(<Square value='' winning={false} />)
    expect(queryByTestId('square_button')).toBeTruthy()
    const classList = queryByTestId('square_button').classList
    expect(classList.contains('O')).toBeFalsy()
    expect(classList.contains('X')).toBeFalsy()
  })

  test('should fire event on click', () => {
    const clickFn = jest.fn()
    const { queryByTestId } = render(
      <Square value='' winning={false} onClick={clickFn} />
    )
    fireEvent.click(queryByTestId('square_button'))
    expect(clickFn).toHaveBeenCalled()
  })
})
