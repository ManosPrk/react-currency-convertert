import React from "react";

export default function Button({ text, handleOnClick }) {
  return (
    <button className="btn btn-warning" onClick={handleOnClick}>
      {text}
    </button>
  );
}
