import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaAngleUp from 'react-icons/lib/fa/angle-up';

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
            <FaAngleDoubleLeft
              size={48}
              onClick={onDayBwd}
              style={{ cursor: 'pointer' }}
            />
          }
        />
        <FooterButton
          icon={
            <FaAngleLeft
              size={48}
              onClick={onTimeBwd}
              style={{ cursor: 'pointer' }}
            />
          }
        />
        <FooterButton
          icon={
            <FaAngleUp
              size={48}
              onClick={onToday}
              style={{ cursor: 'pointer' }}
            />
          }
        />
        <FooterButton
          icon={
            <FaAngleRight
              size={48}
              onClick={onTimeFwd}
              style={{ cursor: 'pointer' }}
            />
          }
        />
        <FooterButton
          icon={
            <FaAngleDoubleRight
              size={48}
              onClick={onDayFwd}
              style={{ cursor: 'pointer' }}
            />
          }
        />
      </Flexbox>
    );
  }
}

export default Footer;
