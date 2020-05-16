import React from "react";
import { ImageOverlay, Map, TileLayer } from "react-leaflet";
import { useQueryParam, useQueryParams, NumberParam } from "use-query-params";

import { HOURS } from "./time";

const RESOLUTION_TO_BOUNDS = {
  2: [
    [49.438343, -10.725891100000013],
    [59.3545303, 2.7919921999999815]
  ],
  4: [
    [49.3974648, -10.967224100000067],
    [59.603405, 2.7442016999999623]
  ],
  5: [
    [49.4039417, -10.952952800000048],
    [59.5960889, 2.7322388999999703]
  ],
  12: [
    [48.8365898, -11.61364750000007],
    [59.7539062, 3.264160199999992]
  ]
};

// TODO: this is pretty bad: we have no idea which elements should be
// (un)commented! Can we do some sort of map version of this?

const DAY_OFFSET_TO_RESOLUTION = [
  2, // 0 - Today    - 2Km
  // 4, // 1 - Today    - UK4
  2, // 2 - Tomorrow - UK2
  // 4, // 3 - Tomorrow - UK4
  4, // 4 - +2 days  - UK4
  12, // 5 - +3 days  - UK12
  12, // 6 - +4 days  - UK12
  12, // 7 - +5 days  - UK12
  12 // 8 - +6 days  - UK12
];

const DAY_OFFSET_TO_DIR = [
  "UK2",
  //"UK4",
  "UK2+1",
  //"UK4+1",
  "UK4+2",
  "UK12+3",
  "UK12+4",
  "UK12+5",
  "UK12+6"
];

function raspUrl(layer, day, time) {
  const dir = DAY_OFFSET_TO_DIR[day];
  const timeString = HOURS[time];
  return `http://rasp.mrsap.org/${dir}/FCST/${layer}.curr.${timeString}lst.d2.body.png`;
}

// TODO: move outside of map and pass in args?
const DEFAULT_ZOOM = 10;
const DEFAULT_LAT = 52.18572;
const DEFAULT_LNG = -0.14591;

// TODO: props?
const ATTRIBUTION =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export default function LeafletMap({ day, layer, time }) {
  // TODO: move these, and layer, outside of the component!
  // TODO: move overlay image outside?!
  const [{ lat = DEFAULT_LAT, lng = DEFAULT_LNG }, setCenter] = useQueryParams({
    lat: NumberParam,
    lng: NumberParam
  });
  const [zoom = DEFAULT_ZOOM, setZoom] = useQueryParam("zoom", NumberParam);

  return (
    <Map
      center={[lat, lng]}
      onMoveend={e => setCenter(e.target.getCenter())}
      onZoomend={e => setZoom(e.target.getZoom())}
      zoom={zoom}
    >
      <ImageOverlay
        bounds={RESOLUTION_TO_BOUNDS[DAY_OFFSET_TO_RESOLUTION[day]]}
        opacity="0.5"
        url={raspUrl(layer, day, time)}
      >
        <TileLayer attribution={ATTRIBUTION} url={URL} />
      </ImageOverlay>
    </Map>
  );
}

// TODO:
// - layer query param
// - image preloading
// - time class
// - move rasp URL somewhere
