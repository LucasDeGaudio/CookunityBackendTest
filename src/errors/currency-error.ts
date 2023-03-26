import { ApiError } from './api-error';
import { responseConstants } from '../constants/response';

export class CurrencyError extends ApiError {
  static ERROR_CODE = 'INVALID_CURRENCY';
  constructor(name: string, data: any) {
    super(
      name,
      responseConstants.httpResponseCode.BAD_REQUEST,
      'Invalid Currency',
      CurrencyError.ERROR_CODE,
      responseConstants.statusMessage.ERROR,
      data,
    );
  }
}
