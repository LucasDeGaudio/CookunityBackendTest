import { NextFunction, Request, Response } from 'express';
import { responseConstants } from '../constants/response';
import { resolveResponse } from '../helpers/response/response-helper';
import {
  TracesRequest,
  TracesResultResponse,
} from '../interfaces/resources/traces';
import { ApiResponse } from '../interfaces/response/response';
import { tracesService } from '../services/traces-service';

class TracesController {
  public process = async (
    req: Request<any, any, TracesRequest, any>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.info('<GET traces> Starting...');
      const requestBody: TracesRequest = req.body;
      console.info('<GET traces> Request received:', requestBody);
      const ip = requestBody.ip;
      console.info('ip: ', ip);

      const response: TracesResultResponse = await tracesService.getInfo(ip);
      console.info(response);

      const jsonResponse: ApiResponse = response;

      resolveResponse(res, responseConstants.httpResponseCode.OK, jsonResponse);
      console.info('<GET traces> Finished');
    } catch (error) {
      console.error('<GET traces> Error:', error);
      next(error);
    }
  };
}

export default TracesController;
