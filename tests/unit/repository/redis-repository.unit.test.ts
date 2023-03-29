import { redisRepository } from '../../../src/repository/redis-repository';
import { RedisError } from '../../../src/errors/redis-error';

afterEach(() => {
  jest.clearAllMocks();
});
describe('redis-repository suite test', () => {
  test('GET - should return a string value when given a key', async () => {
    const key = 'test-key';
    const expectedValue = 'test-value';

    const redisClientMock = {
      get: jest.fn().mockResolvedValue(expectedValue),
    };

    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    const value = await redisRepository.get(key);

    expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
    expect(redisClientMock.get).toHaveBeenCalledTimes(1);
    expect(redisClientMock.get).toHaveBeenCalledWith(key);
    expect(value).toEqual(expectedValue);
  });

  test('GET - should throw RedisError if an error occurs while getting the value', async () => {
    const key = 'test-key';
    const error = new Error('Redis error');
    const redisClientMock = {
      get: jest.fn().mockRejectedValue(error),
    };
    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    await expect(redisRepository.get(key)).rejects.toThrow(RedisError);
    expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
    expect(redisClientMock.get).toHaveBeenCalledTimes(1);
    expect(redisClientMock.get).toHaveBeenCalledWith(key);
  });

  test('GETALL - should return an array of string values that match the given pattern', async () => {
    const pattern = 'test-*';
    const expectedValues = ['test-key-1', 'test-key-2'];
    const redisClientMock = {
      keys: jest.fn().mockResolvedValue(expectedValues),
    };

    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    const values = await redisRepository.getAll(pattern);

    expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
    expect(redisClientMock.keys).toHaveBeenCalledTimes(1);
    expect(redisClientMock.keys).toHaveBeenCalledWith(pattern);
    expect(values).toEqual(expectedValues);
  });

  test('GETALL - should throw RedisError if an error occurs while getting all the values', async () => {
    const pattern = 'test-*';
    const error = new Error('Redis error');
    const redisClientMock = {
      keys: jest.fn().mockRejectedValue(error),
    };
    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    await expect(redisRepository.getAll(pattern)).rejects.toThrow(RedisError);
    expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
    expect(redisClientMock.keys).toHaveBeenCalledTimes(1);
    expect(redisClientMock.keys).toHaveBeenCalledWith(pattern);
  });

  test('SET - should set the value of the given key in Redis', async () => {
    const key = 'test-key';
    const value = 'test-value';
    const redisClientMock = {
      set: jest.fn(),
    };
    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    redisRepository.set(key, value);

    expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
    expect(redisClientMock.set).toHaveBeenCalledTimes(1);
    expect(redisClientMock.set).toHaveBeenCalledWith(key, value);
  });

  test('SET - should throw RedisError if an error occurs while setting the value', async () => {
    const key = 'test-key';
    const value = 'test-value';
    const error = new Error('Redis error');
    const redisClientMock = {
      set: jest.fn().mockImplementation(() => {
        throw error;
      }),
    };
    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    try {
      redisRepository.set(key, value);
    } catch (error) {
      expect(error).toBeInstanceOf(RedisError);
      expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
      expect(redisClientMock.set).toHaveBeenCalledTimes(1);
      expect(redisClientMock.set).toHaveBeenCalledWith(key, value);
    }
  });

  test('SETHASH - should set a hash in Redis', async () => {
    const key = 'test-hash';
    const fieldValue = ['field1', 'value1', 'field2', 'value2'];
    const redisClientMock = {
      hSet: jest.fn(),
    };

    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    redisRepository.setHash(key, fieldValue);

    expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
    expect(redisClientMock.hSet).toHaveBeenCalledTimes(1);
    expect(redisClientMock.hSet).toHaveBeenCalledWith(key, fieldValue);
  });

  test('SETHASH - should throw a RedisError if there is an error setting the hash in Redis', async () => {
    const key = 'test-hash';
    const fieldValue = ['field1', 'value1', 'field2', 'value2'];

    const error = new Error('Redis error');
    const redisClientMock = {
      hSet: jest.fn().mockImplementation(() => {
        throw error;
      }),
    };

    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    try {
      redisRepository.setHash(key, fieldValue);
    } catch (error) {
      expect(error).toBeInstanceOf(RedisError);
      expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
      expect(redisClientMock.hSet).toHaveBeenCalledTimes(1);
      expect(redisClientMock.hSet).toHaveBeenCalledWith(key, fieldValue);
    }
  });

  test('GETHASH - should get a hash in Redis', async () => {
    const key = 'test-hash';
    const expectedValue = ['field1', 'value1', 'field2', 'value2'];
    const redisClientMock = {
      hGetAll: jest.fn().mockResolvedValue(expectedValue),
    };

    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    const value = await redisRepository.getHash(key);

    expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
    expect(redisClientMock.hGetAll).toHaveBeenCalledTimes(1);
    expect(redisClientMock.hGetAll).toHaveBeenCalledWith(key);
    expect(value).toEqual(expectedValue);
  });

  test('GETHASH - should throw a RedisError if there is an error getting the hash in Redis', async () => {
    const key = 'test-hash';

    const error = new Error('Redis error');
    const redisClientMock = {
      hGetAll: jest.fn().mockImplementation(() => {
        throw error;
      }),
    };

    jest.spyOn(redisRepository, 'getClient').mockReturnValue(redisClientMock);

    try {
      await redisRepository.getHash(key);
    } catch (error) {
      expect(error).toBeInstanceOf(RedisError);
      expect(redisRepository['getClient']).toHaveBeenCalledTimes(1);
      expect(redisClientMock.hGetAll).toHaveBeenCalledTimes(1);
      expect(redisClientMock.hGetAll).toHaveBeenCalledWith(key);
    }
  });
});
