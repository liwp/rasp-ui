import React from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.primaryDark},
    5%,
    transparent
  );
  display: grid;
  height: ${({ theme }) => theme.toolbarHeight};
  place-items: center;
  position: absolute;
  text-shadow: 1px 1px ${({ theme }) => theme.primaryDark};
  width: 100%;
  z-index: 500;
`;

const Header = ({ layer, time }) => (
  <StyledHeader>
    <span>
      {time.dayToString()} - {time.hourToString()} ({layer})
    </span>
  </StyledHeader>
);

export default Header;
