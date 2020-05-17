import React, { Component } from "react";
import cn from "classnames";
import { slide as Menu } from "react-burger-menu";
import { FiMenu } from "react-icons/fi";
import styled from "styled-components";

import Footer from "./Footer";
import Header from "./Header";
import LeafletMap from "./LeafletMap";
import { decDay, decTime, incDay, incTime, today } from "./time";

const LAYER_NAME = {
  blwind: "BL wind",
  zsfclclmask: "Cu Cloudbase",
  stars: "Star rating",
  wstar: "Updraft velocity"
};

const DEFAULT_LAYER = "stars";

const styles = {
  menu: {
    bmBurgerButton: {
      position: "fixed",
      width: "30px",
      height: "30px",
      left: "8px",
      top: "8px"
    },
    bmBurgerBars: {
      background: "#373a47"
    },
    bmMenu: {
      background: "#FFFFFF",
      fontSize: "1.15em"
    },
    bmMorphShape: {
      fill: "#373a47"
    },
    bmItemList: {
      color: "#b8b7ad",
      height: "default",
      margin: "0.8em"
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)"
    }
  },
  menuItem: {
    ":focus": { outline: "none" },
    cursor: "pointer",
    margin: 10
  }
};

const TOOLBAR_HEIGHT = '52px'

// TODO: how to fix the mobile issues? Two articles:
// - https://dev.to/admitkard/mobile-issue-with-100vh-height-100-100vh-3-solutions-3nae
const AppContainer = styled.div`
  height: 100vh;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-rows: ${TOOLBAR_HEIGHT} auto ${TOOLBAR_HEIGHT};
  height: 100%;
`;

// TODO: remove the header block and let if 'float' over the map. The tricky bit
// is how to make sure the text is legible! And where to put the menu button.
const HeaderContainer = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
`;

const MapContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
`;

const FooterContainer = styled.footer`
  width: 100%;
`;

// TODO: use one layer callback with an argument
// TODO: move menu to its own component with a layer change callback
// TODO: convert to function component
// TODO: store layer in query param
// TODO: immutable Time class
// TODO: add more layers
// TODO: prefetch images
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
    this.setState({ isMenuOpen: false, layer: "blwind" });
  }

  onSelectStars() {
    this.setState({ isMenuOpen: false, layer: "stars" });
  }

  onSelectWstar() {
    this.setState({ isMenuOpen: false, layer: "wstar" });
  }

  onSelectZsfclclmask() {
    this.setState({ isMenuOpen: false, layer: "zsfclclmask" });
  }

  onMenuStateChange({ isOpen }) {
    this.setState({ isMenuOpen: isOpen });
  }

  render() {
    const { day, isMenuOpen, layer, time } = this.state;

    return (
      <AppContainer>
        <Menu
          customBurgerIcon={<FiMenu />}
          isOpen={isMenuOpen}
          onStateChange={this.onMenuStateChange}
          styles={styles.menu}
          width={200}
        >
          <span
            className={cn({ active: layer === "blwind" })}
            style={styles.menuItem}
            onClick={this.onSelectBlwind}
          >
            {LAYER_NAME.blwind}
          </span>
          <span
            className={cn({ active: layer === "stars" })}
            style={styles.menuItem}
            onClick={this.onSelectStars}
          >
            {LAYER_NAME.stars}
          </span>
          <span
            className={cn({ active: layer === "wstar" })}
            style={styles.menuItem}
            onClick={this.onSelectWstar}
          >
            {LAYER_NAME.wstar}
          </span>
          <span
            className={cn({ active: layer === "zsfclclmask" })}
            style={styles.menuItem}
            onClick={this.onSelectZsfclclmask}
          >
            {LAYER_NAME.zsfclclmask}
          </span>
        </Menu>

        <MainContainer>
          <HeaderContainer>
            <Header day={day} layer={LAYER_NAME[layer]} time={time} />
          </HeaderContainer>

          <MapContainer>
            <LeafletMap day={day} layer={layer} time={time} />
          </MapContainer>

          <FooterContainer>
            <Footer
              onDayBwd={this.onDayBwd}
              onDayFwd={this.onDayFwd}
              onToday={this.onToday}
              onTimeBwd={this.onTimeBwd}
              onTimeFwd={this.onTimeFwd}
            />
          </FooterContainer>
        </MainContainer>
      </AppContainer>
    );
  }
}

export default App;
