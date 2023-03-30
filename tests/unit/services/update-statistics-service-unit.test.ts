import { updateStatisticsService } from '../../../src/services/update-statistics-service';
import { redisRepository } from '../../../src/repository/redis-repository';
import {
  traceResponse,
  redisGetLongestDistanceCountryEmptyResponse,
  redisGetLongestDistanceValueEmptyResponse,
  redisGetCountryValueEmptyResponse,
  redisGetLongestDistanceCountryResponse,
  redisGetLongestDistanceValueResponse,
  redisGetCountryARValueResponse,
} from '../../mocks/services/update-statistics-service';
import { RedisError } from '../../../src/errors/redis-error';

describe('update-statistics-service suite test', () => {
  test('should process statistics without previous data successfully', async () => {
    const redisGetSpy = jest
      .spyOn(redisRepository, 'get')
      .mockResolvedValueOnce(redisGetLongestDistanceCountryEmptyResponse)
      .mockResolvedValueOnce(redisGetLongestDistanceValueEmptyResponse)
      .mockResolvedValueOnce(redisGetCountryValueEmptyResponse);

    const redisSetSpy = jest
      .spyOn(redisRepository, 'set')
      .mockImplementation(jest.fn);

    const redisSetHashSpy = jest
      .spyOn(redisRepository, 'setHash')
      .mockImplementation(jest.fn);

    await updateStatisticsService.process(traceResponse);
    expect(redisGetSpy).toHaveBeenCalledTimes(3);
    expect(redisSetSpy).toHaveBeenCalledTimes(3);
    expect(redisSetHashSpy).toHaveBeenCalledTimes(1);
  });

  test('should process statistics with previous data successfully', async () => {
    const redisGetSpy = jest
      .spyOn(redisRepository, 'get')
      .mockResolvedValueOnce(redisGetLongestDistanceCountryResponse)
      .mockResolvedValueOnce(redisGetLongestDistanceValueResponse)
      .mockResolvedValueOnce(redisGetCountryARValueResponse);

    const redisSetSpy = jest
      .spyOn(redisRepository, 'set')
      .mockImplementation(jest.fn);

    const redisSetHashSpy = jest
      .spyOn(redisRepository, 'setHash')
      .mockImplementation(jest.fn);

    await updateStatisticsService.process(traceResponse);
    expect(redisGetSpy).toHaveBeenCalledTimes(3);
    expect(redisSetSpy).toHaveBeenCalledTimes(3);
    expect(redisSetHashSpy).toHaveBeenCalledTimes(0);
  });

  test('should fail when redis repository throw error', async () => {
    const redisGetSpy = jest
      .spyOn(redisRepository, 'get')
      .mockImplementation(() => Promise.reject(new RedisError('fake error')));

    const redisSetSpy = jest
      .spyOn(redisRepository, 'set')
      .mockImplementation(jest.fn);

    const redisSetHashSpy = jest
      .spyOn(redisRepository, 'setHash')
      .mockImplementation(jest.fn);

    try {
      await updateStatisticsService.process(traceResponse);
    } catch (error) {
      expect(redisGetSpy).toHaveBeenCalledTimes(1);
      expect(redisSetSpy).toHaveBeenCalledTimes(0);
      expect(redisSetHashSpy).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(RedisError);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
