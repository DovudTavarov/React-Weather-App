import React from "react";

export default function Button({ btnName, className }) {
  return (
    <>
      <button className={className && ""}>{btnName}</button>
    </>
  );
}
