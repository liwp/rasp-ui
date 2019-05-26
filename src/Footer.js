import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import {
  FiChevronsLeft as LeftLeft,
  FiChevronsRight as RightRight,
  FiChevronLeft as Left,
  FiChevronRight as Right,
  FiChevronUp as Up
} from 'react-icons/fi';

const FooterButton = ({ icon }) => (
  <Flexbox
    justifyContent="center"
    alignItems="center"
    height="100%"
    width="100%"
  >
    {icon}
  </Flexbox>
);

class Footer extends Component {
  render() {
    const { onDayBwd, onDayFwd, onToday, onTimeBwd, onTimeFwd } = this.props;

    return (
      <Flexbox
        justifyContent="space-around"
        flexDirection="row"
        height="100%"
        width="100%"
      >
        <FooterButton
          icon={
            <LeftLeft
              onClick={onDayBwd}
              size={36}
              style={{ cursor: 'pointer' }}
            />
          }
        />
        <FooterButton
          icon={
            <Left onClick={onTimeBwd} size={36} style={{ cursor: 'pointer' }} />
          }
        />
        <FooterButton
          icon={
            <Up onClick={onToday} size={36} style={{ cursor: 'pointer' }} />
          }
        />
        <FooterButton
          icon={
            <Right
              onClick={onTimeFwd}
              size={36}
              style={{ cursor: 'pointer' }}
            />
          }
        />
        <FooterButton
          icon={
            <RightRight
              onClick={onDayFwd}
              size={36}
              style={{ cursor: 'pointer' }}
            />
          }
        />
      </Flexbox>
    );
  }
}

export default Footer;
