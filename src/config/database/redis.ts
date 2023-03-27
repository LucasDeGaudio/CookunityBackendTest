import type { RedisClientType } from 'redis';
import { createClient } from 'redis';
import config from '../common/index';
import { RedisError } from '../../errors/redis-error';

export class RedisCache {
  private redisClient: RedisClientType;
  private isReady: boolean = false;

  public initializeClient = async (): Promise<void> => {
    try {
      this.redisClient = createClient({
        url: 'redis://localhost:6379',
      });

      this.redisClient.on('connect', () => {
        console.info(`Redis connection established`);
      });

      this.redisClient.on('error', (error) => {
        console.error(`Redis error, service degraded: ${error}`);
      });

      await this.redisClient.connect();
      this.isReady = true;
    } catch (error) {
      console.error('Error initializing Redis: ', error);
      throw new RedisError('redis-initializing');
    }
  };

  public getClient = (): RedisClientType => {
    return this.redisClient;
  };
}

export const redisCache = new RedisCache();
