import React from "react";
import cn from "classnames";
import styled from "styled-components";

export const StyledMenu = styled.nav`
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  left: 0;
  padding: 2rem;
  position: absolute;
  text-align: left;
  top: 0;
  transform: ${({ isOpen }) =>
    isOpen ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.3s ease-in-out;
  z-index: 1100;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  span {
    color: ${({ theme }) => theme.primaryDark};
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 0.3rem;
    margin: 1rem 0;
    padding: 1rem 0;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

const Menu = ({ isOpen, layer, layers, onSelectLayer }) => (
  <StyledMenu isOpen={isOpen}>
    {Object.entries(layers).map(([key, name]) => (
      <span
        className={cn({ active: layer === key })}
        key={key}
        onClick={() => onSelectLayer(key)}
      >
        {name}
      </span>
    ))}
  </StyledMenu>
);

export default Menu;
