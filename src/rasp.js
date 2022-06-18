import { latLngBounds } from "leaflet";

const RESOLUTION_TO_BOUNDS = {
  2: latLngBounds([
    [49.438343, -10.7258911],
    [59.3545303, 2.7919922]
  ]),
  4: latLngBounds([
    [49.3974648, -10.9672241],
    [59.603405, 2.7442017]
  ]),
  12: latLngBounds([
    [48.8365898, -11.6136475],
    [59.7539062, 3.2641602]
  ])
};

const DAY_OFFSET_TO_RESOLUTION = [
  2, // 0 - Today    - 2Km
  2, // 2 - Tomorrow - UK2
  4, // 4 - +2 days  - UK4
  12, // 5 - +3 days  - UK12
  12, // 6 - +4 days  - UK12
  12, // 7 - +5 days  - UK12
  12 // 8 - +6 days  - UK12
];

const DAY_OFFSET_TO_DIR = [
  "UK2",
  "UK2+1",
  "UK4+2",
  "UK12+3",
  "UK12+4",
  "UK12+5",
  "UK12+6"
];

export function raspBounds(time) {
  return RESOLUTION_TO_BOUNDS[DAY_OFFSET_TO_RESOLUTION[time.day]];
}

// We're trying to return a cache key for the image proxy that we use such that
// the key stays the same when RASP has finalised the renderings for a given
// day, AND the key keeps changing before this has happened. BUT we also still
// want to do some caching for perf reasons.
//
// According to RASP they start their run at 4AM BST, and should be finished by
// noon BST. So we return an ISO date as the key after noon BST. And before that
// we return ISO timestamps that have been truncated to `resolution` minutes, eg
// at 09:58 with a 10min resolution we would truncate the time to 09:50.
//
// Finally, it's possible to pass in a cacheResolution query param, and to force
// the cache resolution to 1min regardless of the time of day by setting
// `cacheResolution=0`. This should help with debugging.
export function cacheKey(now, resolution) {
  const date = now.toISOString().split("T")[0];
  // const noonBst = new Date(`${date}T12:00:00.000+01:00`);
  // After noon the resolution is always 60 min
  // if (now >= noonBst && resolution > 0) {
  //   return date;
  // }
  if (resolution < 1) {
    resolution = 1;
  }

  now.setMinutes(Math.trunc(now.getMinutes() / resolution) * resolution);
  now.setSeconds(0);
  now.setMilliseconds(0);
  return now.toISOString();
}

export function raspUrl(layer, time, cacheResolution) {
  const dir = DAY_OFFSET_TO_DIR[time.day];
  const hour = time.hourToString();
  const key = cacheKey(new Date(), cacheResolution);
  return `https://cdn19.mrsap.org/${dir}/FCST/${layer}.curr.${hour}lst.d2.body.png`;
}
