import React from "react";
import {
  FiChevronsLeft as LeftLeft,
  FiChevronsRight as RightRight,
  FiChevronLeft as Left,
  FiChevronRight as Right,
  FiChevronUp as Up,
} from "react-icons/fi";
import styled from "styled-components";

import Time from "./time";

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primaryLight};
  cursor: pointer;
  display: block;
  height: 100%;
  outline: none;
  width: 90%;
`;

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: ${({ theme }) => theme.toolbarHeight};
  place-items: center;
  width: 100%;
  z-index: 500;
`;

const Footer = ({ onTimeChange, time }) => (
  <StyledFooter>
    <Button onClick={() => onTimeChange(time.decDay())}>
      <LeftLeft size="42" />
    </Button>
    <Button onClick={() => onTimeChange(time.decHour())}>
      <Left size="42" />
    </Button>
    <Button onClick={() => onTimeChange(Time.today())}>
      <Up size="42" />
    </Button>
    <Button onClick={() => onTimeChange(time.incHour())}>
      <Right size="42" />
    </Button>
    <Button onClick={() => onTimeChange(time.incDay())}>
      <RightRight size="42" />
    </Button>
  </StyledFooter>
);

export default Footer;
