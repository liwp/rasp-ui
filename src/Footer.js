import React, { Component } from "react";
import {
  FiChevronsLeft as LeftLeft,
  FiChevronsRight as RightRight,
  FiChevronLeft as Left,
  FiChevronRight as Right,
  FiChevronUp as Up
} from "react-icons/fi";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  display: block;
  height: 100%;
  width: 90%;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  height: 100%;
  place-items: center;
  width: 100%;
`;

class Footer extends Component {
  render() {
    const { onDayBwd, onDayFwd, onToday, onTimeBwd, onTimeFwd } = this.props;

    return (
      <ButtonContainer>
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
      </ButtonContainer>
    );
  }
}

export default Footer;
