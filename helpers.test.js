const { RoundUp, isInWeekRange } = require('./helpers');

describe('testing Roundup() helper', () => {
  test('Round 0 , 0 -> 0', () => {
    expect(RoundUp(0, 0)).toBe('0');
  });
  test('Round 0 , 1 -> 0.0', () => {
    expect(RoundUp(0, 1)).toBe('0.0');
  });
  test('Round 0 , 2 -> 0.00', () => {
    expect(RoundUp(0, 2)).toBe('0.00');
  });
  test('Round 0.023 , 2 -> 0.03', () => {
    expect(RoundUp(0.023, 2)).toBe('0.03');
  });
  test('Round 0.027 , 2 -> 0.03', () => {
    expect(RoundUp(0.027, 2)).toBe('0.03');
  });
  test('Round 0.123 , 3 -> 0.123', () => {
    expect(RoundUp(0.123, 3)).toBe('0.123');
  });
});

describe('testing isInWeekRange() helper', () => {
  test('isInWeek for start of the week in rage', () => {
    const mon = '2021/10/18';
    const inWeekDay = '2021/10/20';
    expect(isInWeekRange(mon, inWeekDay)).toBe(true);
  });
  test('isInWeek for start of the week not in rage (before)', () => {
    const mon = '2021/10/18';
    const inWeekDay = '2021/10/17';
    expect(isInWeekRange(mon, inWeekDay)).toBe(false);
  });
  test('isInWeek for start of the week not in rage (after)', () => {
    const mon = '2021/10/18';
    const inWeekDay = '2021/10/26';
    expect(isInWeekRange(mon, inWeekDay)).toBe(false);
  });

  test('isInWeek for end of the week in rage', () => {
    const sun = '2021/10/25';
    const inWeekDay = '2021/10/26';
    expect(isInWeekRange(sun, inWeekDay)).toBe(true);
  });
  test('isInWeek for end of the week not in rage (before)', () => {
    const sun = '2021/10/25';
    const inWeekDay = '2021/11/22';
    expect(isInWeekRange(sun, inWeekDay)).toBe(false);
  });
  test('isInWeek for end of the week not in rage (after)', () => {
    const sun = '2021/10/25';
    const inWeekDay = '2021/11/02';
    expect(isInWeekRange(sun, inWeekDay)).toBe(false);
  });
});
