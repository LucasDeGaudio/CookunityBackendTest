import { redisCache } from '../config/database/redis';
import { RedisClientType } from 'redis';
import { RedisError } from '../errors/redis-error';

class RedisRepository {
  private getClient = (): RedisClientType => {
    return redisCache.getClient();
  };

  public get = async (key: string): Promise<string> => {
    try {
      const redisClient: RedisClientType = this.getClient();
      return await redisClient.get(key);
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
      const redisClient: RedisClientType = this.getClient();
      return await redisClient.keys(pattern);
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
      const redisClient: RedisClientType = this.getClient();
      redisClient.set(key, value);
    } catch (error) {
      console.error(
        '<redis-repository-repository> Error setting redis info: ',
        error,
      );
      throw new RedisError('redis-set');
    }
  };

  public setHash = (key: string, fieldValue: string[]) => {
    try {
      const redisClient: RedisClientType = this.getClient();
      redisClient.hSet(key, fieldValue);
    } catch (error) {
      console.error(
        '<redis-repository-repository> Error setting hash redis info: ',
        error,
      );
      throw new RedisError('redis-Hset');
    }
  };

  public getHash = async (key: string): Promise<any> => {
    try {
      const redisClient: RedisClientType = this.getClient();
      return await redisClient.hGetAll(key);
    } catch (error) {
      console.error(
        '<redis-repository-repository> Error getting hash redis info: ',
        error,
      );
      throw new RedisError('redis-Hget');
    }
  };
}

export const redisRepository = new RedisRepository();
