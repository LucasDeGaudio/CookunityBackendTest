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
      console.info('<POST traces> Starting...');
      const requestBody: TracesRequest = req.body;
      console.info('<POST traces> Request received:', requestBody);
      const ip = requestBody.ip;

      const response: TracesResultResponse = await tracesService.process(ip);
      const jsonResponse: ApiResponse = response;

      resolveResponse(res, responseConstants.httpResponseCode.OK, jsonResponse);
      console.info('<POST traces> Finished');
    } catch (error) {
      console.error('<POST traces> Error:', error);
      next(error);
    }
  };
}

export default TracesController;
