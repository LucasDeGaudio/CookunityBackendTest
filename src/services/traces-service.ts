import {
  CurrencyApiResponse,
  IpGeolocalizationApiResponse,
  TracesResultResponse,
} from '../interfaces/resources/traces';
import { ipGeolocalizationConnector } from '../connectors/ip-geolocalization-connector';
import { currencyConnector } from '../connectors/currency-connector';
import { formatResponse } from '../mappers/traces-data-mapper';
import { distanceService } from './distance-service';

class TracesService {
  public getInfo = async (ip: string): Promise<TracesResultResponse> => {
    try {
      const ipGeoApiResponse: IpGeolocalizationApiResponse =
        await ipGeolocalizationConnector.getData(ip);

      const currencyApiResponse: CurrencyApiResponse =
        await currencyConnector.getData(ipGeoApiResponse.currency);

      const response: TracesResultResponse = formatResponse(
        ipGeoApiResponse,
        currencyApiResponse,
      );

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
