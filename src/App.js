import React, { useState } from "react";
import styled from "styled-components";
import { useQueryParam, StringParam } from "use-query-params";

import Footer from "./Footer";
import Header from "./Header";
import LeafletMap from "./LeafletMap";
import Menu from "./Menu";
import { decDay, decTime, incDay, incTime, today } from "./time";

const LAYER_NAME = {
  blwind: "BL wind",
  zsfclclmask: "Cu Cloudbase",
  stars: "Star rating",
  wstar: "Updraft velocity"
};

const DEFAULT_LAYER = "stars";
const TOOLBAR_HEIGHT = "52px";

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

// TODO: use history with query-params? https://github.com/pbeshai/use-query-params/blob/master/examples/no-router/src/history.js
// TODO: immutable Time class
// TODO: add more layers
// TODO: prefetch images
const App = () => {
  // TODO: having to use state and query-param is annoying…
  const [qpLayer = DEFAULT_LAYER, setQpLayer] = useQueryParam(
    "layer",
    StringParam
  );
  const [layer, setLayer] = useState(qpLayer);
  // TODO: day and hour?
  const [{ day, time }, setTime] = useState(today());

  return (
    <AppContainer>
      <Menu
        layer={layer}
        layers={LAYER_NAME}
        onSelectLayer={layer => {
          setQpLayer(layer);
          setLayer(layer);
        }}
      />

      <MainContainer>
        <HeaderContainer>
          <Header day={day} layer={LAYER_NAME[layer]} time={time} />
        </HeaderContainer>

        <MapContainer>
          <LeafletMap day={day} layer={layer} time={time} />
        </MapContainer>

        <FooterContainer>
          {/* TODO: just one onTimeChange callback, and let the Footer buttons work out which method to call? */}
          <Footer
            onDayBwd={() => setTime(decDay)}
            onDayFwd={() => setTime(incDay)}
            onToday={() => setTime(today)}
            onTimeBwd={() => setTime(decTime)}
            onTimeFwd={() => setTime(incTime)}
          />
        </FooterContainer>
      </MainContainer>
    </AppContainer>
  );
};

export default App;
