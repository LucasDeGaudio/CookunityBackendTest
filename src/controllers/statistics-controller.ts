import { NextFunction, Request, Response } from 'express';
import { responseConstants } from '../constants/response';
import { resolveResponse } from '../helpers/response/response-helper';
import { StatisticsResultResponse } from '../interfaces/resources/statistics';
import { ApiResponse } from '../interfaces/response/response';
import { statisticsService } from '../services/statistics-service';

class StatisticsController {
  public process = async (
    req: Request<any, any, any, any>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      console.info('<GET statistics> Starting...');

      const result: StatisticsResultResponse =
        await statisticsService.getInfo();

      const jsonResponse: ApiResponse = result;

      resolveResponse(res, responseConstants.httpResponseCode.OK, jsonResponse);
      console.info('<GET statistics> Finished');
    } catch (error) {
      console.error('<GET statistics> Error:', error);
      next(error);
    }
  };
}

export default StatisticsController;
