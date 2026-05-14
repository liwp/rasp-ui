import React from "react";
import {
  FiChevronsLeft as LeftLeft,
  FiChevronsRight as RightRight,
  FiChevronLeft as Left,
  FiChevronRight as Right,
  FiChevronUp as Up,
} from "react-icons/fi";

import Time from "./time";

const Footer = ({ onTimeChange, time }) => (
  <footer className="footer">
    <button
      className="footer__button"
      onClick={() => onTimeChange(time.decDay())}
    >
      <LeftLeft size="42" />
    </button>
    <button
      className="footer__button"
      onClick={() => onTimeChange(time.decHour())}
    >
      <Left size="42" />
    </button>
    <button
      className="footer__button"
      onClick={() => onTimeChange(Time.today())}
    >
      <Up size="42" />
    </button>
    <button
      className="footer__button"
      onClick={() => onTimeChange(time.incHour())}
    >
      <Right size="42" />
    </button>
    <button
      className="footer__button"
      onClick={() => onTimeChange(time.incDay())}
    >
      <RightRight size="42" />
    </button>
  </footer>
);

export default Footer;
