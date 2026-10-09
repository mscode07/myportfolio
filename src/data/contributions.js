// Validate the public feed before rendering or saving it in browser storage.
export function parseContributions(data) {
  const days = data?.contributions;
  if (!Array.isArray(days) || !days.length || days.length > 371) throw new Error('Invalid calendar');
  const seen = new Set();
  for (const day of days) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isFinite(Date.parse(day.date)) || seen.has(day.date) || !Number.isInteger(day.count) || day.count < 0 || !Number.isInteger(day.level) || day.level < 0 || day.level > 4) throw new Error('Invalid contribution');
    seen.add(day.date);
  }
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  for (let index = 0; index < sorted.length; index++) {
    const date = new Date(`${sorted[index].date}T00:00:00Z`);
    if (date.toISOString().slice(0, 10) !== sorted[index].date) throw new Error('Invalid date');
    if (index && date.getTime() - Date.parse(sorted[index - 1].date) !== 86400000) throw new Error('Incomplete calendar');
  }
  return sorted;
}

export function calendarWeeks(days) {
  if (!days.length) return [];
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const cells = [...Array(offset).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}
