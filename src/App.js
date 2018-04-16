import React, { Component } from 'react';
import Flexbox from 'flexbox-react';

import Footer from './Footer';
import Header from './Header';
import Map from './Map';
import { decDay, decTime, incDay, incTime, today } from './time';

import './App.css';

const DEFAULT_CENTER = { lat: 52.18572, lng: -0.14591 };
const DEFAULT_ZOOM = 11;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: DEFAULT_CENTER,
      ...today()
    };

    this.onDayBwd = this.onDayBwd.bind(this);
    this.onTimeBwd = this.onTimeBwd.bind(this);
    this.onToday = this.onToday.bind(this);
    this.onTimeFwd = this.onTimeFwd.bind(this);
    this.onDayFwd = this.onDayFwd.bind(this);
  }

  onDayBwd() {
    this.setState(decDay);
  }

  onTimeBwd() {
    this.setState(decTime);
  }

  onToday() {
    this.setState(today);
  }

  onTimeFwd() {
    this.setState(incTime);
  }

  onDayFwd() {
    this.setState(incDay);
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
