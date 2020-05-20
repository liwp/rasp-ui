import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { StringParam } from "use-query-params";

import Footer from "./Footer";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import LeafletMap from "./LeafletMap";
import Menu from "./Menu";
import { useStatefulQueryParam, useVhHack } from "./hooks";
import theme from "./theme";
import { decDay, decTime, incDay, incTime, today } from "./time";

const LAYER_NAME = {
  blwind: "BL wind",
  zsfclclmask: "Cu Cloudbase",
  stars: "Star rating",
  wstar: "Updraft velocity",
};

const DEFAULT_LAYER = "stars";

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: ${({ theme }) => theme.toolbarHeight} auto ${({
      theme,
    }) => theme.toolbarHeight};
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
`;

// TODO: use history with query-params? https://github.com/pbeshai/use-query-params/blob/master/examples/no-router/src/history.js
// TODO: immutable Time class
// TODO: add more layers
// TODO: prefetch images
const App = () => {
  useVhHack();
  const [layer = DEFAULT_LAYER, setLayer] = useStatefulQueryParam(
    "layer",
    StringParam
  );
  const [{ day, time }, setTime] = useState(today());

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Menu layer={layer} layers={LAYER_NAME} onLayerChange={setLayer} />

      <StyledApp>
        <Header day={day} layer={LAYER_NAME[layer]} time={time} />

        <LeafletMap day={day} layer={layer} time={time} />

        {/* TODO: just one onTimeChange callback, and let the Footer buttons work out which method to call? */}
        <Footer
          onDayBwd={() => setTime(decDay)}
          onDayFwd={() => setTime(incDay)}
          onToday={() => setTime(today)}
          onTimeBwd={() => setTime(decTime)}
          onTimeFwd={() => setTime(incTime)}
        />
      </StyledApp>
    </ThemeProvider>
  );
};

export default App;
