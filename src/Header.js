import React from 'react';

import { dayNumberToName, timeNumberToTime } from './timeFormat';

const Header = ({ day, time }) => (
  <span>
    {dayNumberToName(day)} - {timeNumberToTime(time)}
  </span>
);

export default Header;
