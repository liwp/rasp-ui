const MAILTO = "mailto:lauri.pesonen@iki.fi?subject=RASP%20feedback";

const Slider = ({ isOpen, layer, layers, onSelectLayer }) => (
  <nav className={`slider${isOpen ? " slider--open" : ""}`}>
    {Object.entries(layers).map(([key, name]) => (
      <button
        type="button"
        className={`slider__item${layer === key ? " slider__item--active" : ""}`}
        key={key}
        onClick={() => onSelectLayer(key)}
      >
        {name}
      </button>
    ))}

    <span className="slider__spacer" />

    <span className="slider__item">
      <a className="slider__link" href={MAILTO}>
        &copy; Lauri Pesonen
      </a>
    </span>
  </nav>
);

export default Slider;
