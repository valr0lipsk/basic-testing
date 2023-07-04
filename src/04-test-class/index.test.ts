// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  let account: BankAccount;
  jest.unmock('lodash');
  const lodash = jest.requireActual('lodash');

  beforeAll(() => {
    account = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(200)).toThrowError(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account2 = getBankAccount(0);
    expect(() => account.transfer(200, account2)).toThrowError(
      new InsufficientFundsError(100),
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(200, account)).toThrowError(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(100);
  });

  test('should transfer money', () => {
    const account2 = getBankAccount(0);
    account.transfer(100, account2);
    expect(account2.getBalance()).toBe(100);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1);

    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 1);

    const initialBalance = account.getBalance();
    await account.synchronizeBalance();
    expect(initialBalance).not.toBe(account.getBalance());
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0);

    const balance = await account.fetchBalance();
    expect(balance).toBe(null);
  });
});
