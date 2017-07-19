import React from 'react';
import { withGoogleMap, GoogleMap, OverlayView } from 'react-google-maps';

const RESOLUTION_TO_BOUNDS = {
  2: {
    ne: {lat: 49.438343, lng: -10.725891100000013,},
    sw: {lat: 59.3545303, lng: 2.7919921999999815,},
  },
  4: {
    ne: {lat: 49.3974648, lng: -10.967224100000067,},
    sw: {lat: 59.603405, lng: 2.7442016999999623,},
  },
  5: {
    ne: {lat: 49.4039417, lng: -10.952952800000048,},
    sw: {lat: 59.5960889,lng: 2.7322388999999703,},
  },
  12: {
    ne: {lat: 48.8365898, lng: -11.61364750000007,},
    sw: {lat: 59.7539062, lng: 3.264160199999992,},
  },
};

const DAY_OFFSET_TO_RESOLUTION = [
  2,   // 0 - Today    - 2Km
  /* 4,   // 1 - Today    - UK4*/
  2,   // 2 - Tomorrow - UK2
  /* 4,   // 3 - Tomorrow - UK4*/
  4,   // 4 - +2 days  - UK4
  12,  // 5 - +3 days  - UK12
  12,  // 6 - +4 days  - UK12
  12,  // 7 - +5 days  - UK12
  12,  // 8 - +6 days  - UK12
];

const DAY_OFFSET_TO_DIR = [
  "UK2",
  /* "UK4",*/
  "UK2+1",
  /* "UK4+1",*/
  "UK4+2",
  "UK12+3",
  "UK12+4",
  "UK12+5",
  "UK12+6",
];

function raspUrl(day, time) {
  const dir = DAY_OFFSET_TO_DIR[day];
  // TODO: what is this 'lst', or 'd2'? Anything to worry about with DST?
  return `http://rasp.mrsap.org/${dir}/FCST/wstar.curr.${time}lst.d2.body.png`
  //return `https://rasp-image-proxy-wwrxjzolka.now.sh/${dir}/FCST/wstar.curr.${time}lst.d2.body.png`
}

// TODO: prop types for day and time
const OverlayViewExampleGoogleMap = withGoogleMap(({center, day, defaultZoom, time}) => (
  <GoogleMap
      center={center}
      defaultZoom={defaultZoom}
      options={{
        mapTypeControl: false,
        mapTypeId: 'terrain',
        streetViewControl: false,
        zoomControl: false,
      }}
  >
    <OverlayView
        bounds={RESOLUTION_TO_BOUNDS[DAY_OFFSET_TO_RESOLUTION[day]]}
        mapPaneName={OverlayView.OVERLAY_LAYER}>
      <img
          alt="map"
          src={raspUrl(day, time)}
          style={{
            width: '100%',
            height: '100%',
            opacity: '0.5',
          }}
      />
    </OverlayView>
  </GoogleMap>
));

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  map: {
    flexGrow: 1
  },
};

const Map = (props) => (
            <OverlayViewExampleGoogleMap
                containerElement={<div style={styles.container} />}
                mapElement={<div style={styles.map} />}
                {...props}
            />
        );

export default Map;
