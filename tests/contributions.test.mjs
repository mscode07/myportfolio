import test from 'node:test';
import assert from 'node:assert/strict';
import { parseContributions, calendarWeeks } from '../src/data/contributions.js';
test('calendar pads to UTC weekday and crosses a year boundary', () => {
  const days = parseContributions({ contributions: [
    { date:'2026-01-01', count:2, level:1 },
    { date:'2025-12-31', count:0, level:0 },
  ] });
  const [week] = calendarWeeks(days);
  assert.equal(week[3].date, '2025-12-31');
  assert.equal(week[4].date, '2026-01-01');
});
test('rejects malformed or duplicate upstream data', () => {
  for (const contributions of [[], [{date:'invalid',count:0,level:0}], [{date:'2026-01-01',count:-1,level:0}], Array(2).fill({date:'2026-01-01',count:1,level:1})]) {
    assert.throws(() => parseContributions({ contributions }));
  }
});
test('rejects missing days so weekday alignment cannot silently drift', () => {
  assert.throws(() => parseContributions({ contributions: [
    { date:'2026-01-01', count:0, level:0 },
    { date:'2026-01-03', count:1, level:1 },
  ] }));
});
