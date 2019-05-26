import React, { Component, useRef } from "react";
import {
  GoogleMap,
  OverlayView,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { useQueryParam, NumberParam } from "use-query-params";

import { HOURS, timeNumberToTime } from "./time";

const RESOLUTION_TO_BOUNDS = {
  2: {
    ne: { lat: 49.438343, lng: -10.725891100000013 },
    sw: { lat: 59.3545303, lng: 2.7919921999999815 }
  },
  4: {
    ne: { lat: 49.3974648, lng: -10.967224100000067 },
    sw: { lat: 59.603405, lng: 2.7442016999999623 }
  },
  5: {
    ne: { lat: 49.4039417, lng: -10.952952800000048 },
    sw: { lat: 59.5960889, lng: 2.7322388999999703 }
  },
  12: {
    ne: { lat: 48.8365898, lng: -11.61364750000007 },
    sw: { lat: 59.7539062, lng: 3.264160199999992 }
  }
};

const DAY_OFFSET_TO_RESOLUTION = [
  // 2, // 0 - Today    - 2Km
  4, // 1 - Today    - UK4
  // 2, // 2 - Tomorrow - UK2
  4, // 3 - Tomorrow - UK4
  4, // 4 - +2 days  - UK4
  12, // 5 - +3 days  - UK12
  12, // 6 - +4 days  - UK12
  12, // 7 - +5 days  - UK12
  12 // 8 - +6 days  - UK12
];

const DAY_OFFSET_TO_DIR = [
  //'UK2',
  "UK4",
  //'UK2+1',
  "UK4+1",
  "UK4+2",
  "UK12+3",
  "UK12+4",
  "UK12+5",
  "UK12+6"
];

function raspUrl(layer, day, time) {
  const dir = DAY_OFFSET_TO_DIR[day];
  const timeString = timeNumberToTime(time);
  return `http://rasp.mrsap.org/${dir}/FCST/${layer}.curr.${timeString}lst.d2.body.png`;
}

class OverlayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps({ layer }, prevState) {
    // Force image preloading:
    //
    // First load noon for all days
    DAY_OFFSET_TO_DIR.forEach((_, day) => {
      const image = new Image();
      image.src = raspUrl(layer, day, HOURS.indexOf("1200"));
    });
    // Then load all other times starting from today
    DAY_OFFSET_TO_DIR.forEach((_, day) => {
      HOURS.forEach((_, time) => {
        const image = new Image();
        image.src = raspUrl(layer, day, time);
      });
    });

    return null;
  }

  render() {
    const { day, layer, time } = this.props;
    return (
      <img
        alt="map"
        src={raspUrl(layer, day, time)}
        style={{
          width: "100%",
          height: "100%",
          opacity: "0.5"
        }}
      />
    );
  }
}

const DEFAULT_ZOOM = 10;
const DEFAULT_LAT = 52.18572;
const DEFAULT_LNG = -0.14591;

const RaspMap = withScriptjs(
  withGoogleMap(({ center, day, layer, time }) => {
    const map = useRef(null);
    const [lat = DEFAULT_LAT, setLat] = useQueryParam("lat", NumberParam);
    const [lng = DEFAULT_LNG, setLng] = useQueryParam("lng", NumberParam);
    const [zoom = DEFAULT_ZOOM, setZoom] = useQueryParam("zoom", NumberParam);

    return (
      <GoogleMap
        center={new window.google.maps.LatLng(lat, lng)}
        defaultZoom={zoom}
        onCenterChanged={() => {
          const center = map.current.getCenter();
          setLat(center.lat());
          setLng(center.lng());
        }}
        onZoomChanged={() => setZoom(map.current.getZoom())}
        options={{
          fullscreenControl: false,
          mapTypeControl: false,
          mapTypeId: "terrain",
          streetViewControl: false,
          zoomControl: true
        }}
        ref={map}
      >
        <OverlayView
          bounds={RESOLUTION_TO_BOUNDS[DAY_OFFSET_TO_RESOLUTION[day]]}
          mapPaneName={OverlayView.OVERLAY_LAYER}
        >
          <OverlayImage day={day} layer={layer} time={time} />
        </OverlayView>
      </GoogleMap>
    );
  })
);

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  map: {
    flexGrow: 1
  }
};

// TODO: would be nice pull out the API key…
const Map = props => (
  <RaspMap
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1pc2KO5U0drWWHDygRYWygS_GQ8F4uwg"
    containerElement={<div style={styles.container} />}
    loadingElement={<div style={{ height: `100%` }} />}
    mapElement={<div style={styles.map} />}
    {...props}
  />
);

export default Map;
