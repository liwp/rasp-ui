import React from 'react';

import { dayNumberToName, timeNumberToTime } from './time';

const Header = ({ day, time }) => (
  <span>
    {dayNumberToName(day)} - {timeNumberToTime(time)}
  </span>
);

export default Header;
