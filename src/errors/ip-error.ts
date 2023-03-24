import { ApiError } from './api-error';
import { responseConstants } from '../constants/response';

export class IpError extends ApiError {
  static ERROR_CODE = 'INVALID_IP';
  constructor(name: string, data: any) {
    super(
      name,
      responseConstants.httpResponseCode.BAD_REQUEST,
      'Invalid Ip',
      IpError.ERROR_CODE,
      responseConstants.statusMessage.ERROR,
      data,
    );
  }
}
