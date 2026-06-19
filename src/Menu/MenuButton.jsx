const Burger = ({ isOpen, setOpen }) => {
  return (
    <button
      type="button"
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
