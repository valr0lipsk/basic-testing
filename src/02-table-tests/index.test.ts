import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 'fdfdf', b: 2, action: Action.Add, expected: null },
  { a: 2, b: 2, action: 'fdfdf', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should work', (e) => {
    expect(simpleCalculator({ a: e.a, b: e.b, action: e.action })).toBe(
      e.expected,
    );
  });
});
