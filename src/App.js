import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import styled, { ThemeProvider } from "styled-components";
import { StringParam } from "use-query-params";

import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import LeafletMap from "./LeafletMap";
import Menu from "./Menu";
import { useStatefulQueryParam } from "./hooks";
import { raspBounds, raspUrl } from "./rasp";
import theme from "./theme";
import Time, { DAYS } from "./time";

const LAYER_NAME = {
  zsfclclmask: "Cu Cloudbase",
  rain1: "Rain",
  stars: "Star rating",
  wstar: "Updraft velocity",
  sfcwind: "Wind - 10m",
  blwind: "Wind - BL",
};

const DEFAULT_LAYER = "stars";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const App = ({ isGaEnabled }) => {
  const [layer = DEFAULT_LAYER, setLayer] = useStatefulQueryParam(
    "layer",
    StringParam
  );
  useEffect(() => {
    // Pre-fetch current layer overlays for 12pm
    for (let i = 0; i < DAYS; i++) {
      const image = new Image();
      image.src = raspUrl(layer, new Time(i));
    }
    // Record a page view
    if (isGaEnabled) {
      ReactGA.pageview(layer);
    }
  }, [isGaEnabled, layer]);
  const [time, setTime] = useState(Time.today());

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Menu layer={layer} layers={LAYER_NAME} onLayerChange={setLayer} />

      <StyledApp>
        <Header layer={LAYER_NAME[layer]} time={time} />
        <LeafletMap bounds={raspBounds(time)} url={raspUrl(layer, time)} />
        <Footer onTimeChange={setTime} time={time} />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
