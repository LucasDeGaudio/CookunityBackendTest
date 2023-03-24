import { NextFunction, Request, Response } from 'express';
import { responseConstants } from '../constants/response';
import { resolveResponse } from '../helpers/response/response-helper';
import { TracesRequest, TracesResponse } from '../interfaces/resources/traces';
import { ApiResponse } from '../interfaces/response/response';
import { tracesConnector } from '../connectors/traces-connector';

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

      const response: TracesResponse = await tracesConnector.getData(ip);
      console.info('response controller');
      console.info(response);
      // const data = await dailyAmountService.getDailyAmount(requestQuery);

      const jsonResponse: ApiResponse = {
        statusCode: responseConstants.httpResponseCode.OK,
        statusMessage: responseConstants.statusMessage.OK,
        data: null,
      };
      resolveResponse(res, responseConstants.httpResponseCode.OK, jsonResponse);
      console.info('<GET traces> Finished');
    } catch (error) {
      console.error('<GET traces> Error:', error);
      next(error);
    }
  };
}

export default TracesController;
