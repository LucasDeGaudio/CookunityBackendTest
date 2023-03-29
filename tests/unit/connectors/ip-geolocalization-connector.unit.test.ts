import axios from 'axios';
import { ipGeolocalizationConnector } from '../../../src/connectors/ip-geolocalization-connector';
import { ExternalError } from '../../../src/errors/external-error';
import { IpError } from '../../../src/errors/ip-error';
import * as axiosClientHelper from '../../../src/helpers/axios/axios-client-helper';
import {
  status500AxiosError,
  tracesAxiosGetResponseError,
  tracesAxiosGetResponseOk,
} from '../../mocks/connectors/ip-geolocalization-connector';

describe('ip-geolocalization-connector suite test', () => {
  jest.mock('axios');
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('should call get-data without errors', async () => {
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockResolvedValueOnce(tracesAxiosGetResponseOk);

    const result = await ipGeolocalizationConnector.getData('192.168.1.1');

    expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
    expect(result).not.toBeNull();
    expect(result.status).toBe('success');
  });

  test('should call get-data with invalid ip and fail', async () => {
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockResolvedValueOnce(tracesAxiosGetResponseError);

    try {
      await ipGeolocalizationConnector.getData('192.168.1.1');
    } catch (error) {
      expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(IpError);
      expect(error.name).toBe('IpGeolocalization-getData');
      expect(error.statusCode).toBe(400);
    }
  });

  test('should call get-data and axios client fails', async () => {
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockRejectedValue(status500AxiosError);

    try {
      await ipGeolocalizationConnector.getData('192.168.1.1');
    } catch (error) {
      expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(ExternalError);
      expect(error.name).toBe('IpGeolocalization-getData');
      expect(error.statusCode).toBe(500);
    }
  });
});
