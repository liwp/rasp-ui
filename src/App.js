import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import FaAngleDoubleLeft from 'react-icons/lib/fa/angle-double-left';
import FaAngleDoubleRight from 'react-icons/lib/fa/angle-double-right';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaCircleO from 'react-icons/lib/fa/circle-o';

import Map from './Map';
import './App.css';

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

function dayNumberToName(day) {
  const d = new Date();
  d.setDate(d.getDate() + day);
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    month: 'long',
    day: 'numeric'
  });
}

const HOURS = [
  '0800',
  '0900',
  '1000',
  '1100',
  '1200',
  '1300',
  '1400',
  '1500',
  '1600',
  '1700',
  '1800',
  '1900'
];

function timeNumberToTime(time) {
  return HOURS[time];
}

const Header = ({ day, time }) => (
  <span>
    {dayNumberToName(day)} - {timeNumberToTime(time)}
  </span>
);

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
    const { onDayBwd, onDayFwd, onNow, onTimeBwd, onTimeFwd } = this.props;

    return (
      <Flexbox
        justifyContent="space-around"
        flexDirection="row"
        height="100%"
        width="100%"
      >
        <FooterButton icon={<FaAngleDoubleLeft />} onClick={onDayBwd} />
        <FooterButton icon={<FaAngleLeft />} onClick={onTimeBwd} />
        <FooterButton icon={<FaCircleO />} onClick={onNow} />
        <FooterButton icon={<FaAngleRight />} onClick={onTimeFwd} />
        <FooterButton icon={<FaAngleDoubleRight />} onClick={onDayFwd} />
      </Flexbox>
    );
  }
}

const DEFAULT_CENTER = { lat: 52.18572, lng: -0.14591 };
const DEFAULT_ZOOM = 11;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: DEFAULT_CENTER,
      day: 0,
      time: 4
    };

    this.onDayBwd = this.onDayBwd.bind(this);
    this.onDayFwd = this.onDayFwd.bind(this);
    this.onNow = this.onNow.bind(this);
    this.onTimeBwd = this.onTimeBwd.bind(this);
    this.onTimeFwd = this.onTimeFwd.bind(this);
  }

  onDayBwd() {
    let { day } = this.state;
    day = (day + WEEKDAYS.length - 1) % WEEKDAYS.length;
    this.setState({ day, time: 4 });
  }

  onDayFwd() {
    let { day } = this.state;
    day = (day + 1) % WEEKDAYS.length;
    this.setState({ day, time: 4 });
  }

  // TODO: badly names since we move to today, noon. We could move
  // to noon or the current hour, which ever is later.
  onNow() {
    this.setState({ day: 0, time: 4 });
  }

  onTimeBwd() {
    let { time } = this.state;
    time = (time + HOURS.length - 1) % HOURS.length;
    this.setState({ time });
  }

  onTimeFwd() {
    let { time } = this.state;
    time = (time + 1) % HOURS.length;
    this.setState({ time });
  }

  render() {
    const { center, day, time } = this.state;

    return (
      <div className="App">
        <Flexbox flexDirection="column" minHeight="100vh" alignItems="center">
          <Flexbox alignItems="center" element="header" height="60px">
            <Header day={day} time={time} />
          </Flexbox>

          <Flexbox flexGrow={1} width="100%">
            <Map
              center={center}
              day={day}
              defaultZoom={DEFAULT_ZOOM}
              time={timeNumberToTime(time)}
            />
          </Flexbox>

          <Flexbox
            alignItems="center"
            element="footer"
            height="60px"
            width="100%"
          >
            <Footer
              onDayBwd={this.onDayBwd}
              onDayFwd={this.onDayFwd}
              onHome={this.onHome}
              onNow={this.onNow}
              onTimeBwd={this.onTimeBwd}
              onTimeFwd={this.onTimeFwd}
            />
          </Flexbox>
        </Flexbox>
      </div>
    );
  }
}

export default App;
