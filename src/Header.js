import React from "react";
import styled from "styled-components";

import { dayNumberToName, timeNumberToTime } from "./time";

// TODO: remove the header block and let if 'float' over the map. The tricky bit
// is how to make sure the text is legible! And where to put the menu button.
//
// TODO: I think the answer is to use a transparent gradient. That'll provide
// some contrast for the text. The menu button can remain where it is. The
// downside is that it prevents interaction with the map on that area of the
// screen.
const StyledHeader = styled.header`
  display: grid;
  place-items: center;
  width: 100%;
`;

const Header = ({ day, layer, time }) => (
  <StyledHeader>
    <span>
      {dayNumberToName(day)} - {timeNumberToTime(time)} ({layer})
    </span>
  </StyledHeader>
);

export default Header;
