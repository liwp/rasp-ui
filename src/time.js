export const HOURS = [
  '0800',
  '0900',
  '1000',
  '1100',
  '1200',
  '1300',
  '1400',
  '1500',
  '1600',
  '1700',
  '1800',
  '1900'
];

export function dayNumberToName(day) {
  const d = new Date(Date.now());
  d.setDate(d.getDate() + day);
  return d.toLocaleDateString('en-GB', {
    weekday: 'short',
    month: 'long',
    day: 'numeric'
  });
}

export function timeNumberToTime(time) {
  return HOURS[time];
}

export function decDay({ day }) {
  day = (day + 6) % 7;
  return { day, time: HOURS.indexOf('1200') };
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
  return { day, time: HOURS.indexOf('1200') };
}

export function today() {
  const d = new Date(Date.now());
  const hour = d.getHours();
  if (hour < 8) {
    return { day: 0, time: HOURS.indexOf('0800') };
  }
  if (hour <= 12) {
    return { day: 0, time: HOURS.indexOf('1200') };
  }
  if (hour > 19) {
    return { day: 1, time: HOURS.indexOf('1200') };
  }
  return { day: 0, time: HOURS.indexOf(hour + '00') };
}
