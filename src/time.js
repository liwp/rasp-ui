// TODO: we should stick this all in a class that we can instantiate with the
// current time...

export function generateHours(dst) {
  const start = 7 + (dst ? 0 : -1);
  console.log({ start, dst });
  const ret = [];
  for (let i = 0; i < 13; i++) {
    ret.push(("0" + (start + i)).slice(-2) + "00");
  }

  return ret;
}

// RASP seems to think in UTC, but the file names are in GMT/BST. So during BST
// we're supposed to request 0800-1900, and during GMT 0700-1800.

export function isDst() {
  const date = new Date(Date.now());
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  return (
    date.getTimezoneOffset() <
    Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
  );
}

export const HOURS = generateHours(isDst());

export function dayNumberToName(day) {
  // This is so we can stub it out in tests
  const d = new Date(Date.now());
  d.setDate(d.getDate() + day);
  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
}

export function timeNumberToTime(time) {
  return HOURS[time];
}

export function decDay({ day }) {
  day = (day + 6) % 7;
  return { day, time: HOURS.indexOf("1200") };
}

export function decTime({ day, time }) {
  time--;
  if (time < 0) {
    day = (day + 6) % 7;
  }
  time = (time + HOURS.length) % HOURS.length;
  return { day, time };
}

export function incTime({ day, time }) {
  time++;
  if (time >= HOURS.length) {
    day = (day + 1) % 7;
  }
  time = time % HOURS.length;
  return { day, time };
}

export function incDay({ day }) {
  day = (day + 1) % 7;
  return { day, time: HOURS.indexOf("1200") };
}

export function today() {
  const d = new Date(Date.now());
  const hour = d.getHours();
  if (hour < 8) {
    return { day: 0, time: 0 };
  }
  if (hour <= 12) {
    return { day: 0, time: HOURS.indexOf("1200") };
  }
  if (hour > 19) {
    return { day: 1, time: HOURS.indexOf("1200") };
  }
  return { day: 0, time: HOURS.indexOf(hour + "00") };
}
