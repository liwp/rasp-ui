import type { Dispatch, SetStateAction } from "react";

const Burger = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <button
      type="button"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
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
