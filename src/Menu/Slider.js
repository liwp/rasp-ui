import React from "react";
import styled from "styled-components";

const SliderItem = styled.span`
  color: ${({ theme }) => theme.primaryDark};
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.3rem;
  margin: 1rem 0;
  padding: 1rem 0;
  text-decoration: ${({ active }) => (active ? "underline" : "none")};
  text-transform: uppercase;
  transition: color 0.3s linear;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    text-align: center;
  }

  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`;

const SliderLink = styled.a`
  color: ${({ theme }) => theme.primaryDark};
  font-weight: normal;
  letter-spacing: normal;
  text-decoration: none;
  text-transform: none;
`;

const StyledSlider = styled.nav`
  background: ${({ theme }) => theme.primaryLight};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
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
`;

const SliderSpacer = styled.span`
  flex-grow: 1;
`;

const MAILTO = "mailto:lauri.pesonen@iki.fi?subject=RASP%20feedback";

const Slider = ({ isOpen, layer, layers, onSelectLayer }) => (
  <StyledSlider isOpen={isOpen}>
    {Object.entries(layers).map(([key, name]) => (
      <SliderItem
        active={layer === key}
        key={key}
        onClick={() => onSelectLayer(key)}
      >
        {name}
      </SliderItem>
    ))}

    <SliderSpacer />

    <SliderItem>
      <SliderLink href={MAILTO}>&copy; Lauri Pesonen</SliderLink>
    </SliderItem>
  </StyledSlider>
);

export default Slider;
