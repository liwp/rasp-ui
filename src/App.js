import { useEffect, useState } from "react";
import { StringParam } from "use-query-params";

import Footer from "./Footer";
import Header from "./Header";
import LeafletMap from "./LeafletMap";
import Menu from "./Menu";
import { useStatefulQueryParam } from "./hooks";
import { raspBounds, raspUrl } from "./rasp";
import Time, { DAYS, HOURS } from "./time";

const LAYER_NAME = {
  zsfclclmask: "Cu Cloudbase",
  rain1: "Rain",
  stars: "Star rating",
  wstar: "Updraft velocity",
  sfcwind: "Wind - 10m",
  blwind: "Wind - BL",
};

const DEFAULT_LAYER = "stars";

const App = () => {
  const [layer = DEFAULT_LAYER, setLayer] = useStatefulQueryParam(
    "layer",
    StringParam,
  );
  const [time, setTime] = useState(Time.today());
  const day = time.day;

  // Pre-fetch current layer for all hours of this day
  useEffect(() => {
    for (let hour in HOURS) {
      const image = new Image();
      image.src = raspUrl(layer, new Time(day, hour));
    }
  }, [layer, day]);

  // Pre-fetch current layer for all days for 12pm
  useEffect(() => {
    for (let i = 0; i < DAYS; i++) {
      const image = new Image();
      image.src = raspUrl(layer, new Time(i));
    }
  }, [layer]);

  return (
    <>
      <Menu layer={layer} layers={LAYER_NAME} onLayerChange={setLayer} />

      <div className="app">
        <Header layer={LAYER_NAME[layer]} time={time} />
        <LeafletMap bounds={raspBounds(time)} url={raspUrl(layer, time)} />
        <Footer onTimeChange={setTime} time={time} />
      </div>
    </>
  );
};

export default App;
