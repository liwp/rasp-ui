import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import Footer from './Footer';
import Header from './Header';
import Map from './Map';
import { HOURS } from './timeFormat';

import './App.css';

const DEFAULT_CENTER = { lat: 52.18572, lng: -0.14591 };
const DEFAULT_ZOOM = 11;

function getTodaysTime() {
  const hour = new Date().getHours();
  return HOURS.indexOf(hour < 12 ? '1200' : hour + '00');
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: DEFAULT_CENTER,
      day: 0,
      time: getTodaysTime()
    };

    this.onDayBwd = this.onDayBwd.bind(this);
    this.onDayFwd = this.onDayFwd.bind(this);
    this.onToday = this.onToday.bind(this);
    this.onTimeBwd = this.onTimeBwd.bind(this);
    this.onTimeFwd = this.onTimeFwd.bind(this);
  }

  onDayBwd() {
    let { day } = this.state;
    day = (day + 6) % 7;
    this.setState({ day, time: HOURS.indexOf('1200') });
  }

  onDayFwd() {
    let { day } = this.state;
    day = (day + 1) % 7;
    this.setState({ day, time: HOURS.indexOf('1200') });
  }

  onToday() {
    this.setState({ day: 0, time: getTodaysTime() });
  }

  onTimeBwd() {
    let { day, time } = this.state;
    time--;
    if (time < 0) {
      day = (day + 6) % 7;
    }
    time = (time + HOURS.length) % HOURS.length;
    this.setState({ day, time });
  }

  onTimeFwd() {
    let { day, time } = this.state;
    time++;
    if (time >= HOURS.length) {
      day = (day + 1) % 7;
    }
    time = time % HOURS.length;
    this.setState({ day, time });
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
              time={time}
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
              onToday={this.onToday}
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
