import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { slide as Menu } from 'react-burger-menu';
import FaBars from 'react-icons/lib/fa/bars';

import Footer from './Footer';
import Header from './Header';
import Map from './Map';
import { decDay, decTime, incDay, incTime, today } from './time';

import './App.css';

const DEFAULT_CENTER = { lat: 52.18572, lng: -0.14591 };
const DEFAULT_ZOOM = 11;

const LAYER_NAME = {
  wstar: 'Updraft velocity',
  stars: 'Star rating'
};

// TODO: move styling to CSS file?
const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '15px',
    top: '15px'
  },
  bmBurgerBars: {
    background: '#373a47'
  },
  bmCross: {
    background: '#bdc3c7',
    height: '30px'
  },
  bmCrossButton: {
    height: '36px',
    right: '14px',
    top: '8px',
    width: '36px'
  },
  bmMenu: {
    background: '#FFFFFF',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: DEFAULT_CENTER,
      isMenuOpen: false,
      layer: 'wstar',
      ...today()
    };

    this.onDayBwd = this.onDayBwd.bind(this);
    this.onTimeBwd = this.onTimeBwd.bind(this);
    this.onToday = this.onToday.bind(this);
    this.onTimeFwd = this.onTimeFwd.bind(this);
    this.onDayFwd = this.onDayFwd.bind(this);
    this.onSelectWstar = this.onSelectWstar.bind(this);
    this.onSelectStars = this.onSelectStars.bind(this);
    this.onMenuStateChange = this.onMenuStateChange.bind(this);
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

  onSelectWstar() {
    this.setState({ isMenuOpen: false, layer: 'wstar' });
  }

  onSelectStars() {
    this.setState({ isMenuOpen: false, layer: 'stars' });
  }

  onMenuStateChange({ isOpen }) {
    this.setState({ isMenuOpen: isOpen });
  }

  render() {
    const { center, day, isMenuOpen, layer, time } = this.state;

    return (
      <div className="App">
        <Menu
          customBurgerIcon={<FaBars />}
          isOpen={isMenuOpen}
          onStateChange={this.onMenuStateChange}
          styles={styles}
          width={200}
        >
          <span
            style={{ cursor: 'pointer', margin: 20 }}
            onClick={this.onSelectWstar}
          >
            {LAYER_NAME.wstar}
          </span>
          <span
            style={{ cursor: 'pointer', margin: 20 }}
            onClick={this.onSelectStars}
          >
            {LAYER_NAME.stars}
          </span>
        </Menu>
        <Flexbox flexDirection="column" minHeight="100vh" alignItems="center">
          <Flexbox alignItems="center" element="header" height="60px">
            <Header day={day} layer={LAYER_NAME[layer]} time={time} />
          </Flexbox>

          <Flexbox flexGrow={1} width="100%">
            <Map
              center={center}
              day={day}
              defaultZoom={DEFAULT_ZOOM}
              layer={layer}
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
