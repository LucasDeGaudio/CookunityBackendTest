import { redisCache } from '../config/database/redis';
import { RedisClientType } from 'redis';
import { RedisError } from '../errors/redis-error';

export class RedisRepository {
  private redisClient: RedisClientType;

  public get = async (key: string): Promise<string> => {
    try {
      this.redisClient = redisCache.getClient();
      return await this.redisClient.get(key);
    } catch (error) {
      console.error(
        '<redis-repository-repository> Error getting redis info: ',
        error,
      );
      throw new RedisError('redis-get');
    }
  };

  public getAll = async (pattern: string): Promise<string[]> => {
    try {
      this.redisClient = redisCache.getClient();
      return await this.redisClient.keys(pattern);
    } catch (error) {
      console.error(
        '<redis-repository-repository> Error getting All redis info: ',
        error,
      );
      throw new RedisError('redis-get-all');
    }
  };

  public set = (key: string, value: string) => {
    try {
      this.redisClient = redisCache.getClient();
      this.redisClient.set(key, value);
    } catch (error) {
      console.error(
        '<redis-repository-repository> Error setting redis info: ',
        error,
      );
      throw new RedisError('redis-set');
    }
  };
}
