const Spinner = ({ size }: { size: string }) => (
  <svg
    className="spinner"
    style={{ width: size, height: size }}
    viewBox="0 0 50 50"
  >
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </svg>
);

export default Spinner;
