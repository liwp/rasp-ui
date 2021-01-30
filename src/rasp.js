const RESOLUTION_TO_BOUNDS = {
  2: [
    [49.438343, -10.7258911],
    [59.3545303, 2.7919922],
  ],
  // borked
  4: [
    [
      [49.3974648, -10.9672241],
      [59.603405, 2.7442017],
    ],
  ],
  // borked
  12: [
    [48.8365898, -11.6136475],
    [59.7539062, 3.2641602],
  ],
};

const DAY_OFFSET_TO_RESOLUTION = [
  2, // 0 - Today    - 2Km
  2, // 2 - Tomorrow - UK2
  4, // 4 - +2 days  - UK4
  12, // 5 - +3 days  - UK12
  12, // 6 - +4 days  - UK12
  12, // 7 - +5 days  - UK12
  12, // 8 - +6 days  - UK12
];

const DAY_OFFSET_TO_DIR = [
  "UK2",
  "UK2+1",
  "UK4+2",
  "UK12+3",
  "UK12+4",
  "UK12+5",
  "UK12+6",
];

export function raspBounds(time) {
  return RESOLUTION_TO_BOUNDS[DAY_OFFSET_TO_RESOLUTION[time.day]];
}

export function raspUrl(layer, time) {
  const dir = DAY_OFFSET_TO_DIR[time.day];
  const hour = time.hourToString();
  return `http://rasp.mrsap.org/${dir}/FCST/${layer}.curr.${hour}lst.d2.body.png`;
}
