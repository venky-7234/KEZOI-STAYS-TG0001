import assert from 'node:assert/strict';
import test from 'node:test';
import { isBlockedCalendarDate, toLocalDateKey } from '../src/utils/dates.js';

const timezones = ['Asia/Kolkata', 'America/Los_Angeles', 'Pacific/Auckland'];

for (const timezone of timezones) {
  test(`local date keys remain stable in ${timezone}`, () => {
    const previousTimezone = process.env.TZ;
    process.env.TZ = timezone;

    try {
      const novemberThird = new Date(2026, 10, 3);
      const blockedDateSet = new Set(['2026-11-03']);

      assert.equal(toLocalDateKey(novemberThird), '2026-11-03');
      assert.equal(isBlockedCalendarDate(novemberThird, blockedDateSet), true);
      assert.equal(isBlockedCalendarDate(new Date(2026, 10, 2), blockedDateSet), false);
    } finally {
      if (previousTimezone === undefined) delete process.env.TZ;
      else process.env.TZ = previousTimezone;
    }
  });
}
