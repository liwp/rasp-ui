// Returns a label (the cached forecast's date) to warn with, or null when the
// cached forecast is current (from today) or its date is unknown/invalid.
export function staleForecastLabel(
  cachedDate: Date | null,
  now: Date = new Date(),
): string | null {
  if (!cachedDate || Number.isNaN(cachedDate.getTime())) return null;
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (cachedDate >= todayStart) return null;
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(cachedDate);
}
