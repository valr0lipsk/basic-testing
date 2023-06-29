// Uncomment the code below and write your tests
import { generateLinkedList } from './index';
const arrFrom1 = [1, 2, 3, 6];
const arrFrom2 = [2, 3, 6, 12];
const expectedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 6,
        next: {
          value: null,
          next: null,
        },
      },
    },
  },
};
describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(arrFrom1);
    expect(list).toStrictEqual(expectedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(arrFrom2);
    expect(list).toMatchSnapshot();
  });
});
