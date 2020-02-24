import React from 'react'
import { ReactComponent as XIcon } from './icons/X.svg'
import { ReactComponent as OIcon } from './icons/O.svg'

export const Square = props => {
  return (
    <div className='square'>
      <button
        className={
          props.winning ? 'winning ' + props.value : 'standard ' + props.value
        }
        data-testid='square_button'
        onClick={props.onClick}
      >
        {props.value === 'X' ? <XIcon /> : props.value === 'O' ? <OIcon /> : ''}
      </button>
    </div>
  )
}
