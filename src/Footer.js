import React from "react";
import {
  FiChevronsLeft as LeftLeft,
  FiChevronsRight as RightRight,
  FiChevronLeft as Left,
  FiChevronRight as Right,
  FiChevronUp as Up,
} from "react-icons/fi";
import styled from "styled-components";

// TODO: button-outline: none?
const Button = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.primaryLight};
  cursor: pointer;
  display: block;
  height: 100%;
  width: 90%;
`;

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 100%;
  place-items: center;
  width: 100%;
`;

const Footer = ({ onDayBwd, onDayFwd, onToday, onTimeBwd, onTimeFwd }) => (
  <StyledFooter>
    <Button onClick={onDayBwd}>
      <LeftLeft size="42" />
    </Button>
    <Button onClick={onTimeBwd}>
      <Left size="42" />
    </Button>
    <Button onClick={onToday}>
      <Up size="42" />
    </Button>
    <Button onClick={onTimeFwd}>
      <Right size="42" />
    </Button>
    <Button onClick={onDayFwd}>
      <RightRight size="42" />
    </Button>
  </StyledFooter>
);

export default Footer;
