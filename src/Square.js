import React from 'react';

export const Square = (props) => {
    return (
        <button className={props.winning ? 'square winning' : 'square standard'} onClick={props.onClick}>
            {props.value}
        </button>
    );
}