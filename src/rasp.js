import { latLngBounds } from "leaflet";

const RASP_BASE_URL = "https://cdn10.mrsap.org";

const RESOLUTION_TO_BOUNDS = {
  2: latLngBounds([
    [49.438343, -10.7258911],
    [59.3545303, 2.7919922],
  ]),
  4: latLngBounds([
    [49.3974648, -10.9672241],
    [59.603405, 2.7442017],
  ]),
  12: latLngBounds([
    [48.8365898, -11.6136475],
    [59.7539062, 3.2641602],
  ]),
};

const DAY_OFFSET_TO_RESOLUTION = [
  2, //  0 - Today    - 2Km
  2, //  1 - Tomorrow - UK4
  12, // 2 - +2 days  - UK12
  12, // 3 - +3 days  - UK12
  12, // 4 - +4 days  - UK12
  12, // 5 - +5 days  - UK12
  12, // 6 - +6 days  - UK12
];

export function dayOffsetToDir(time) {
  const day = time.day;
  const resolution = DAY_OFFSET_TO_RESOLUTION[day];
  const suffix = day === 0 ? "" : `+${day}`;
  return `UK${resolution}${suffix}`;
}

export function raspBounds(time) {
  return RESOLUTION_TO_BOUNDS[DAY_OFFSET_TO_RESOLUTION[time.day]];
}

export function raspUrl(layer, time) {
  const dir = dayOffsetToDir(time);
  const hour = time.hourToString();
  return `${RASP_BASE_URL}/${dir}/FCST/${layer}.curr.${hour}lst.d2.body.png`;
}
