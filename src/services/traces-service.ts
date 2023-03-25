import {
  TracesApiResponse,
  TracesResultResponse,
} from '../interfaces/resources/traces';
import { tracesConnector } from '../connectors/traces-connector';
import { formatResponse } from '../mappers/traces-data-mapper';
import { distanceService } from './distance-service';

class TracesService {
  public getInfo = async (ip: string): Promise<TracesResultResponse> => {
    try {
      const apiResponse: TracesApiResponse = await tracesConnector.getData(ip);
      const response: TracesResultResponse = formatResponse(apiResponse);

      const distanceToUsa = distanceService.calculateDistanceToUSA(
        response.lat,
        response.lon,
      );
      response.distanceToUsa = distanceToUsa;
      return response;
    } catch (error) {
      console.error('<traces-service> Error:', {
        error,
      });
      throw error;
    }
  };
}

export const tracesService = new TracesService();
