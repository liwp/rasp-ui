import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: grid;
  place-items: center;
  width: 100%;
`;

const Header = ({ layer, time }) => (
  <StyledHeader>
    <span>
      {time.dayToString()} - {time.hourToString()} ({layer})
    </span>
  </StyledHeader>
);

export default Header;
