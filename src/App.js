import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import { slide as Menu } from 'react-burger-menu';
import { FiMenu } from 'react-icons/fi';

import Footer from './Footer';
import Header from './Header';
import Map from './Map';
import { decDay, decTime, incDay, incTime, today } from './time';

import './App.css';

const LAYER_NAME = {
  blwind: 'BL wind',
  zsfclclmask: 'Cu Cloudbase',
  stars: 'Star rating',
  wstar: 'Updraft velocity'
};

const DEFAULT_LAYER = 'stars';

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '30px',
    left: '8px',
    top: '8px'
  },
  bmBurgerBars: {
    background: '#373a47'
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
    height: 'default',
    margin: '0.8em'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false,
      layer: DEFAULT_LAYER,
      ...today()
    };

    this.onDayBwd = this.onDayBwd.bind(this);
    this.onTimeBwd = this.onTimeBwd.bind(this);
    this.onToday = this.onToday.bind(this);
    this.onTimeFwd = this.onTimeFwd.bind(this);
    this.onDayFwd = this.onDayFwd.bind(this);
    this.onSelectBlwind = this.onSelectBlwind.bind(this);
    this.onSelectStars = this.onSelectStars.bind(this);
    this.onSelectWstar = this.onSelectWstar.bind(this);
    this.onSelectZsfclclmask = this.onSelectZsfclclmask.bind(this);
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

  onSelectBlwind() {
    this.setState({ isMenuOpen: false, layer: 'blwind' });
  }

  onSelectStars() {
    this.setState({ isMenuOpen: false, layer: 'stars' });
  }

  onSelectWstar() {
    this.setState({ isMenuOpen: false, layer: 'wstar' });
  }

  onSelectZsfclclmask() {
    this.setState({ isMenuOpen: false, layer: 'zsfclclmask' });
  }

  onMenuStateChange({ isOpen }) {
    this.setState({ isMenuOpen: isOpen });
  }

  render() {
    const { day, isMenuOpen, layer, time } = this.state;

    return (
      <div className="App">
        <Menu
          customBurgerIcon={<FiMenu />}
          isOpen={isMenuOpen}
          onStateChange={this.onMenuStateChange}
          styles={styles}
          width={200}
        >
          <span
            style={{ cursor: 'pointer', margin: 10 }}
            onClick={this.onSelectBlwind}
          >
            {LAYER_NAME.blwind}
          </span>
          <span
            style={{ cursor: 'pointer', margin: 10 }}
            onClick={this.onSelectStars}
          >
            {LAYER_NAME.stars}
          </span>
          <span
            style={{ cursor: 'pointer', margin: 10 }}
            onClick={this.onSelectWstar}
          >
            {LAYER_NAME.wstar}
          </span>
          <span
            style={{ cursor: 'pointer', margin: 10 }}
            onClick={this.onSelectZsfclclmask}
          >
            {LAYER_NAME.zsfclclmask}
          </span>
        </Menu>
        <Flexbox flexDirection="column" minHeight="100vh" alignItems="center">
          <Flexbox alignItems="center" element="header" height="45px">
            <Header day={day} layer={LAYER_NAME[layer]} time={time} />
          </Flexbox>

          <Flexbox flexGrow={1} width="100%">
            <Map day={day} layer={layer} time={time} />
          </Flexbox>

          <Flexbox
            alignItems="center"
            element="footer"
            height="45px"
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
