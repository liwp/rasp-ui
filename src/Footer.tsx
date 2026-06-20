import {
  FiChevronLeft as Left,
  FiChevronsLeft as LeftLeft,
  FiChevronRight as Right,
  FiChevronsRight as RightRight,
  FiChevronUp as Up,
} from "react-icons/fi";

import Time from "./time";

const Footer = ({
  onTimeChange,
  time,
}: {
  onTimeChange: (time: Time) => void;
  time: Time;
}) => (
  <footer className="footer">
    <button
      type="button"
      aria-label="Previous day"
      className="footer__button"
      onClick={() => onTimeChange(time.decDay())}
    >
      <LeftLeft size="42" />
    </button>
    <button
      type="button"
      aria-label="Previous hour"
      className="footer__button"
      onClick={() => onTimeChange(time.decHour())}
    >
      <Left size="42" />
    </button>
    <button
      type="button"
      aria-label="Today"
      className="footer__button"
      onClick={() => onTimeChange(Time.today())}
    >
      <Up size="42" />
    </button>
    <button
      type="button"
      aria-label="Next hour"
      className="footer__button"
      onClick={() => onTimeChange(time.incHour())}
    >
      <Right size="42" />
    </button>
    <button
      type="button"
      aria-label="Next day"
      className="footer__button"
      onClick={() => onTimeChange(time.incDay())}
    >
      <RightRight size="42" />
    </button>
  </footer>
);

export default Footer;
