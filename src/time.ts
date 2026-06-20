export const DAYS = 7;

export function generateHours(dst: boolean): string[] {
  const start = 7 + (dst ? 0 : -1);
  const ret: string[] = [];
  for (let i = 0; i < 13; i++) {
    ret.push(`${`0${start + i}`.slice(-2)}00`);
  }
  return ret;
}

// RASP seems to think in UTC, but the file names are in GMT/BST. So during BST
// we're supposed to request 0800-1900, and during GMT 0700-1800.

export function isDst(now: Date = new Date()): boolean {
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  return (
    now.getTimezoneOffset() <
    Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset())
  );
}

export const HOURS: string[] = generateHours(isDst());

export default class Time {
  day: number;
  hour: number;

  constructor(day: number, hour: number = HOURS.indexOf("1200")) {
    this.day = day;
    this.hour = (hour + HOURS.length) % HOURS.length;
  }

  static today(now: Date = new Date()): Time {
    const hour = now.getHours();
    if (hour < 8) return new Time(0, 0);
    if (hour <= 12) return new Time(0, HOURS.indexOf("1200"));
    if (hour > 19) return new Time(1, HOURS.indexOf("1200"));
    return new Time(0, HOURS.indexOf(`${hour}00`));
  }

  decDay(): Time {
    return new Time((this.day + 6) % DAYS);
  }

  incDay(): Time {
    return new Time((this.day + 1) % DAYS);
  }

  decHour(): Time {
    const hour = this.hour - 1;
    let day = this.day;
    if (hour < 0) day = (this.day + 6) % DAYS;
    return new Time(day, hour);
  }

  incHour(): Time {
    const hour = this.hour + 1;
    let day = this.day;
    if (hour >= HOURS.length) day = (day + 1) % DAYS;
    return new Time(day, hour);
  }

  dayToString(now: Date = new Date()): string {
    const date = new Date(now);
    date.setDate(date.getDate() + this.day);
    const parts = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).formatToParts(date);
    const part = (type: Intl.DateTimeFormatPartTypes): string =>
      parts.find((item) => item.type === type)?.value ?? "";
    return `${part("weekday")}, ${part("day")} ${part("month")}`;
  }

  hourToString(): string {
    return HOURS[this.hour];
  }
}
