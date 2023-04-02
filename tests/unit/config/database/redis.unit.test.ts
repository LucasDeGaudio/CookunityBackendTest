import { createClient, RedisClientType } from 'redis';
import { redisCache } from '../../../../src/config/database/redis';
import { RedisError } from '../../../../src/errors/redis-error';
import config from '../../../../src/config/common/index';

jest.mock('redis', () => {
  const mockCreateClient = jest.fn();
  return {
    createClient: mockCreateClient,
  };
});

describe('redis suite test', () => {
  let mockRedisClient: jest.Mocked<RedisClientType>;
  let redisCacheInstance;

  beforeEach(() => {
    redisCacheInstance = redisCache;
    jest.clearAllMocks();

    mockRedisClient = {
      on: jest.fn(),
      connect: jest.fn(),
    } as any;
    (createClient as jest.Mock).mockReturnValueOnce(mockRedisClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should initialize the Redis client and connect to Redis successfully', async () => {
    config.redis.url = 'redis://localhost';
    config.redis.port = '6379';
    await redisCacheInstance.initializeClient();

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(createClient).toHaveBeenCalledWith({
      url: 'redis://localhost:6379',
    });

    expect(mockRedisClient.on).toHaveBeenCalledTimes(2);
    expect(mockRedisClient.on).toHaveBeenCalledWith(
      'connect',
      expect.any(Function),
    );
    expect(mockRedisClient.on).toHaveBeenCalledWith(
      'error',
      expect.any(Function),
    );

    expect(mockRedisClient.connect).toHaveBeenCalledTimes(1);
  });

  test('should return Redis client instance', () => {
    redisCacheInstance.initializeClient();
    const client = redisCacheInstance.getClient();
    expect(client).toBe(mockRedisClient);
  });

  test('should throw RedisError when Redis connection fails', async () => {
    const error = new Error('Redis connection error');
    mockRedisClient.connect.mockRejectedValueOnce(error);

    await expect(redisCacheInstance.initializeClient()).rejects.toThrow(
      RedisError,
    );

    expect(createClient).toHaveBeenCalledTimes(1);
    expect(mockRedisClient.on).toHaveBeenCalledTimes(2);
    expect(mockRedisClient.connect).toHaveBeenCalledTimes(1);
  });
});
