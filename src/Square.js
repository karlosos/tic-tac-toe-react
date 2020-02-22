import React from "react";
import SVG from "react-inlinesvg";

const XIcon = () => <SVG src="X.svg" />;
const OIcon = () => <SVG src="O.svg" />;

export const Square = props => {
  return (
    <div className="square">
      <button
        className={
          props.winning ? "winning " + props.value : "standard " + props.value
        }
        onClick={props.onClick}
      >
        {props.value === "X" ? <XIcon /> : props.value === "O" ? <OIcon /> : ""}
      </button>
    </div>
  );
};
