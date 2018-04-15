import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaCircleO from 'react-icons/lib/fa/circle-o';

const FooterButton = ({ icon, onClick }) => (
  <Flexbox
    justifyContent="center"
    alignItems="center"
    height="100%"
    width="100%"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
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
        <FooterButton icon={<FaAngleDoubleLeft />} onClick={onDayBwd} />
        <FooterButton icon={<FaAngleLeft />} onClick={onTimeBwd} />
        <FooterButton icon={<FaCircleO />} onClick={onToday} />
        <FooterButton icon={<FaAngleRight />} onClick={onTimeFwd} />
        <FooterButton icon={<FaAngleDoubleRight />} onClick={onDayFwd} />
      </Flexbox>
    );
  }
}

export default Footer;
