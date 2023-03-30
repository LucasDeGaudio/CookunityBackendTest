import { currencyConnector } from '../../../src/connectors/currency-connector';
import { ipGeolocalizationConnector } from '../../../src/connectors/ip-geolocalization-connector';
import { ExternalError } from '../../../src/errors/external-error';
import { tracesService } from '../../../src/services/traces-service';
import { updateStatisticsService } from '../../../src/services/update-statistics-service';
import {
  currencyApiResponse,
  ipGeoApiResponse,
} from '../../mocks/services/traces-service';

describe('traces-service suite test', () => {
  test('should process an ip successfully', async () => {
    const ipGetDataSpy = jest
      .spyOn(ipGeolocalizationConnector, 'getData')
      .mockResolvedValueOnce(ipGeoApiResponse);

    const currencyGetDataSpy = jest
      .spyOn(currencyConnector, 'getData')
      .mockResolvedValueOnce(currencyApiResponse);

    const updateStatisticsServiceSpy = jest
      .spyOn(updateStatisticsService, 'process')
      .mockImplementation(jest.fn());

    await tracesService.process('192.168.1.1');
    expect(ipGetDataSpy).toHaveBeenCalledTimes(1);
    expect(currencyGetDataSpy).toHaveBeenCalledTimes(1);
    expect(updateStatisticsServiceSpy).toHaveBeenCalledTimes(1);
  });

  test('should fail when ip connector throw error', async () => {
    const ipGetDataSpy = jest
      .spyOn(ipGeolocalizationConnector, 'getData')
      .mockImplementation(() =>
        Promise.reject(new ExternalError('fake error')),
      );

    const currencyGetDataSpy = jest
      .spyOn(currencyConnector, 'getData')
      .mockImplementation(jest.fn());

    const updateStatisticsServiceSpy = jest
      .spyOn(updateStatisticsService, 'process')
      .mockImplementation(jest.fn());

    try {
      await tracesService.process('192.168.1.1');
    } catch (error) {
      expect(ipGetDataSpy).toHaveBeenCalledTimes(1);
      expect(currencyGetDataSpy).toHaveBeenCalledTimes(0);
      expect(updateStatisticsServiceSpy).toHaveBeenCalledTimes(0);
      expect(error).toBeInstanceOf(ExternalError);
    }
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
