import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
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
  const today = new Date().getDay();
  return WEEKDAYS[(today + day) % 7];
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

class Header extends Component {
  render() {
    const { day, loading, time } = this.props;
    return loading ? (
      <span>Loading…</span>
    ) : (
      <span>
        {dayNumberToName(day)} - {timeNumberToTime(time)}
      </span>
    );
  }
}

class Footer extends Component {
  render() {
    const {
      onDayBwd,
      onDayFwd,
      onHome,
      onNow,
      onTimeBwd,
      onTimeFwd
    } = this.props;

    return (
      <Flexbox justifyContent="space-around" flexDirection="row" width="100%">
        <span onClick={onDayBwd}>&lt;&lt;</span>
        <span onClick={onTimeBwd}>&lt;</span>
        <span onClick={onNow}>O</span>
        <span onClick={onTimeFwd}>&gt;</span>
        <span onClick={onDayFwd}>&gt;&gt;</span>
        <span style={{ textTransform: 'uppercase' }} onClick={onHome}>
          Home
        </span>
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
    this.onHome = this.onHome.bind(this);
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

  onHome() {
    this.setState({ loading: true });
    window.navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        loading: false
      });
    });
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
    const { center, day, loading, time } = this.state;

    return (
      <div className="App">
        <Flexbox flexDirection="column" minHeight="100vh" alignItems="center">
          <Flexbox alignItems="center" element="header" height="60px">
            <Header day={day} loading={loading} time={time} />
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
