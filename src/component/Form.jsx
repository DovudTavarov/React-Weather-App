import React from "react";

export default function Form(props) {
  const { inputVal, handleChange, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <input
        inputVal={inputVal}
        onChange={handleChange}
        placeholder="search for the city..."
      />
    </form>
  );
}
