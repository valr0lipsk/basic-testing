// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockedTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 1000);

    expect(mockedTimeout).toHaveBeenCalledTimes(1);
    expect(mockedTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    expect(callback).not.toBeCalled();

    doStuffByTimeout(callback, 1000);

    jest.runAllTimers();
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockedInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    expect(mockedInterval).toHaveBeenCalledTimes(1);
    expect(mockedInterval).toHaveBeenLastCalledWith(expect.any(Function), 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 100);
    jest.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockedPath = jest.spyOn(path, 'join');
    readFileAsynchronously('./file.txt');

    expect(mockedPath).toHaveBeenLastCalledWith(__dirname, './file.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(path, 'join');
    const file = await readFileAsynchronously('./gfgfg.txt');

    expect(file).toBe(null);
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(path, 'join');
    const file = await readFileAsynchronously('./file.txt');

    expect(typeof file).toBe('string');
  });
});
