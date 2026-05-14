import React from "react";

const Burger = ({ isOpen, setOpen }) => {
  return (
    <button
      className={`burger${isOpen ? " burger--open" : ""}`}
      onClick={() => setOpen(!isOpen)}
    >
      <div />
      <div />
      <div />
    </button>
  );
};

export default Burger;
