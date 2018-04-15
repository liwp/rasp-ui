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
  const d = new Date();
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
