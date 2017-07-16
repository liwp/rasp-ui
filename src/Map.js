import React, { Component } from 'react';
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
  4,   // 1 - Today    - UK4
  2,   // 2 - Tomorrow - UK2
  4,   // 3 - Tomorrow - UK4
  4,   // 4 - +2 days  - UK4
  12,  // 5 - +3 days  - UK12
  12,  // 6 - +4 days  - UK12
  12,  // 7 - +5 days  - UK12
  12,  // 8 - +6 days  - UK12
];

const DAY_OFFSET_TO_DIR = [
  "UK2",
  "UK4",
  "UK2+1",
  "UK4+1",
  "UK4+2",
  "UK12+3",
  "UK12+4",
  "UK12+5",
  "UK12+6",
];

// TODO: COMMIT TO GIT
// TODO: URL function

const DAY = 0;
const TIME = '0800';

const DEFAULT_CENTER = { lat: 50.3, lng: -5.5 };
const DEFAULT_ZOOM = 6;

const OverlayViewExampleGoogleMap = withGoogleMap(() => (
  <GoogleMap
      defaultZoom={DEFAULT_ZOOM}
      defaultCenter={DEFAULT_CENTER}
      options={{
        mapTypeControl: false,
        mapTypeId: 'terrain',
        streetViewControl: false,
        zoomControl: false,
      }}
  >
    <OverlayView
        bounds={RESOLUTION_TO_BOUNDS[DAY_OFFSET_TO_RESOLUTION[DAY]]}
        mapPaneName={OverlayView.OVERLAY_LAYER}>
      <img
          alt="map"
          src={`http://rasp.mrsap.org/${DAY_OFFSET_TO_DIR[DAY]}/FCST/wstar.curr.${TIME}lst.d2.body.png`}
          style={{
            width: '100%',
            height: '100%',
            opacity: '0.5',
          }}
      />
    </OverlayView>
  </GoogleMap>
));

class Map extends Component {
    render() {
        return (
            <OverlayViewExampleGoogleMap
                containerElement={
                    <div style={{ height: `100%` }} />
                                 }
                mapElement={
                    <div style={{ height: `100%` }} />
                           }
            />
        );
    }
}

export default Map;
