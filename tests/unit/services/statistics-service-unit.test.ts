import { statisticsService } from '../../../src/services/statistics-service';
import { redisRepository } from '../../../src/repository/redis-repository';
import {
  redisGetLongestDistanceCountryEmptyResponse,
  redisGetLongestDistanceValueEmptyResponse,
  redisGetLongestDistanceCountryResponse,
  redisGetLongestDistanceValueResponse,
  redisGetAllEmptyResponse,
  redisMostTracedCountryEmptyResponse,
  redisMostTracedValueEmptyResponse,
  redisGetAllARValueResponse,
  redisGetARValueResponse,
  redisMostTracedCountryARResponse,
  redisMostTracedValueARResponse,
  redisGetAllARUSValueResponse,
  redisGetUSValueResponse,
  redisGetHashARValueResponse,
  redisGetHashARUSValueResponse,
} from '../../mocks/services/statistics-service';
import { RedisError } from '../../../src/errors/redis-error';

describe('statistics-service suite test', () => {
  test('should process statistics without previous data successfully', async () => {
    const redisGetSpy = jest
      .spyOn(redisRepository, 'get')
      .mockResolvedValueOnce(redisGetLongestDistanceCountryEmptyResponse)
      .mockResolvedValueOnce(redisGetLongestDistanceValueEmptyResponse)
      .mockResolvedValueOnce(redisMostTracedCountryEmptyResponse)
      .mockResolvedValueOnce(redisMostTracedValueEmptyResponse);

    const redisGetAllSpy = jest
      .spyOn(redisRepository, 'getAll')
      .mockResolvedValueOnce(redisGetAllEmptyResponse);

    const redisSetSpy = jest
      .spyOn(redisRepository, 'set')
      .mockImplementation(jest.fn);

    const redisGetHashSpy = jest
      .spyOn(redisRepository, 'getHash')
      .mockImplementation(jest.fn());

    await statisticsService.getInfo();
    expect(redisGetSpy).toHaveBeenCalledTimes(4);
    expect(redisGetAllSpy).toHaveBeenCalledTimes(1);
    expect(redisGetHashSpy).toHaveBeenCalledTimes(0);
  });

  test('should process statistics with previous data successfully', async () => {
    const redisGetSpy = jest
      .spyOn(redisRepository, 'get')
      .mockResolvedValueOnce(redisGetARValueResponse)
      .mockResolvedValueOnce(redisGetLongestDistanceCountryResponse)
      .mockResolvedValueOnce(redisGetLongestDistanceValueResponse)
      .mockResolvedValueOnce(redisMostTracedCountryARResponse)
      .mockResolvedValueOnce(redisMostTracedValueARResponse);

    const redisGetAllSpy = jest
      .spyOn(redisRepository, 'getAll')
      .mockResolvedValueOnce(redisGetAllARValueResponse);

    const redisGetHashSpy = jest
      .spyOn(redisRepository, 'getHash')
      .mockResolvedValueOnce(redisGetHashARValueResponse);

    const redisSetSpy = jest
      .spyOn(redisRepository, 'set')
      .mockImplementation(jest.fn);

    await statisticsService.getInfo();
    expect(redisGetSpy).toHaveBeenCalledTimes(5);
    expect(redisSetSpy).toHaveBeenCalledTimes(2);
    expect(redisGetAllSpy).toHaveBeenCalledTimes(1);
    expect(redisGetHashSpy).toHaveBeenCalledTimes(1);
  });

  test('should process statistics with data from two countries successfully', async () => {
    const redisGetSpy = jest
      .spyOn(redisRepository, 'get')
      .mockResolvedValueOnce(redisGetARValueResponse)
      .mockResolvedValueOnce(redisGetUSValueResponse)
      .mockResolvedValueOnce(redisGetLongestDistanceCountryResponse)
      .mockResolvedValueOnce(redisGetLongestDistanceValueResponse)
      .mockResolvedValueOnce(redisMostTracedCountryARResponse)
      .mockResolvedValueOnce(redisMostTracedValueARResponse);

    const redisGetAllSpy = jest
      .spyOn(redisRepository, 'getAll')
      .mockResolvedValueOnce(redisGetAllARUSValueResponse);

    const redisGetHashSpy = jest
      .spyOn(redisRepository, 'getHash')
      .mockResolvedValueOnce(redisGetHashARUSValueResponse);

    const redisSetSpy = jest
      .spyOn(redisRepository, 'set')
      .mockImplementation(jest.fn);

    await statisticsService.getInfo();
    expect(redisGetSpy).toHaveBeenCalledTimes(6);
    expect(redisSetSpy).toHaveBeenCalledTimes(2);
    expect(redisGetAllSpy).toHaveBeenCalledTimes(1);
    expect(redisGetHashSpy).toHaveBeenCalledTimes(1);
  });

  test('should fail when redis repository throw error', async () => {
    const redisGetAllSpy = jest
      .spyOn(redisRepository, 'getAll')
      .mockImplementation(() => Promise.reject(new RedisError('fake error')));

    const redisGetSpy = jest
      .spyOn(redisRepository, 'get')
      .mockImplementation(jest.fn());

    const redisSetSpy = jest
      .spyOn(redisRepository, 'set')
      .mockImplementation(jest.fn);

    const redisGetHashSpy = jest
      .spyOn(redisRepository, 'getHash')
      .mockImplementation(jest.fn());

    try {
      await statisticsService.getInfo();
    } catch (error) {
      expect(redisGetAllSpy).toHaveBeenCalledTimes(1);
      expect(redisGetSpy).toHaveBeenCalledTimes(0);
      expect(redisSetSpy).toHaveBeenCalledTimes(0);
      expect(redisGetHashSpy).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(RedisError);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
