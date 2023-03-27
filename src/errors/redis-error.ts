import { ApiError } from './api-error';
import { responseConstants } from '../constants/response';

export class RedisError extends ApiError {
  static ERROR_CODE = 'REDIS_ERROR';
  constructor(name: string) {
    super(
      name,
      responseConstants.httpResponseCode.INTERNAL_ERROR,
      'Redis Fails',
      RedisError.ERROR_CODE,
      responseConstants.statusMessage.ERROR,
    );
  }
}
