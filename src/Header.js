import React from "react";

import { dayNumberToName, timeNumberToTime } from "./time";

const Header = ({ day, layer, time }) => (
  <span>
    {dayNumberToName(day)} - {timeNumberToTime(time)} ({layer})
  </span>
);

export default Header;
