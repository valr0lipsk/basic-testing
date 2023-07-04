// Uncomment the code below and write your tests
import axios from 'axios';
import { BASE_URL, throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const mockData = {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  };
  const relativePath = '/posts/1';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    jest.mock('axios');

    const axiosMock = jest.spyOn(axios, 'create');
    axiosMock.mockReturnValue({
      get: async () => ({ mockData }),
    } as never);

    await throttledGetDataFromApi(relativePath);
    expect(axiosMock).toHaveBeenCalledWith({
      baseURL: BASE_URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    jest.mock('axios');

    const mockedFn = jest.fn(async () => ({ mockData }));

    const axiosMock = jest.spyOn(axios, 'create');
    axiosMock.mockReturnValue({
      get: mockedFn,
    } as never);

    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();

    expect(mockedFn).toHaveBeenLastCalledWith(relativePath);
  });

  test('should return response data', async () => {
    jest.runAllTimers();
    const data = await throttledGetDataFromApi(relativePath);

    expect(JSON.stringify(data)).toBe(JSON.stringify(mockData));
  });
});
