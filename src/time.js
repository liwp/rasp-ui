export const DAYS = 7;

export function generateHours(dst) {
  const start = 7 + (dst ? 0 : -1);
  const ret = [];
  for (let i = 0; i < 13; i++) {
    ret.push(("0" + (start + i)).slice(-2) + "00");
  }

  return ret;
}

// RASP seems to think in UTC, but the file names are in GMT/BST. So during BST
// we're supposed to request 0800-1900, and during GMT 0700-1800.

export function isDst(now = new Date()) {
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  return (
    now.getTimezoneOffset() <
    Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
  );
}

export const HOURS = generateHours(isDst());

export default class Time {
  constructor(day, hour = HOURS.indexOf("1200")) {
    this.day = day;
    this.hour = (hour + HOURS.length) % HOURS.length;
  }

  static today(now = new Date()) {
    const hour = now.getHours();
    if (hour < 8) {
      return new Time(0, 0);
    }
    if (hour <= 12) {
      return new Time(0, HOURS.indexOf("1200"));
    }
    if (hour > 19) {
      return new Time(1, HOURS.indexOf("1200"));
    }
    return new Time(0, HOURS.indexOf(hour + "00"));
  }

  decDay() {
    return new Time((this.day + 6) % DAYS);
  }

  incDay() {
    return new Time((this.day + 1) % DAYS);
  }

  decHour() {
    let hour = this.hour - 1;
    let day = this.day;
    if (hour < 0) {
      day = (this.day + 6) % DAYS;
    }
    return new Time(day, hour);
  }

  incHour() {
    let hour = this.hour + 1;
    let day = this.day;
    if (hour >= HOURS.length) {
      day = (day + 1) % DAYS;
    }
    return new Time(day, hour);
  }

  dayToString(now = new Date()) {
    now.setDate(now.getDate() + this.day);
    return now.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  hourToString() {
    return HOURS[this.hour];
  }
}
