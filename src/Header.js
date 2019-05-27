import React from "react";

import { dayNumberToName, timeNumberToTime } from "./time";

const style = {
  marginLeft: "46px",
  marginRight: "8px",
  textAlign: "center"
};

const Header = ({ day, layer, time }) => (
  <span style={style}>
    {dayNumberToName(day)} - {timeNumberToTime(time)} ({layer})
  </span>
);

export default Header;
