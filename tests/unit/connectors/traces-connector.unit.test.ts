import { tracesConnector } from '../../../src/connectors/traces-connector';
import axios from 'axios';
import * as axiosClientHelper from '../../../src/helpers/axios/axios-client-helper';
import {
  tracesAxiosGetResponseOk,
  tracesAxiosGetResponseError,
  status500AxiosError,
} from '../../mocks/connectors/traces-connector';
import { IpError } from '../../../src/errors/ip-error';
import { ExternalError } from '../../../src/errors/external-error';

describe('traces-connector suite test', () => {
  jest.mock('axios');
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('should call get-data without errors', async () => {
    // Arrange
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockResolvedValueOnce(tracesAxiosGetResponseOk);

    // Act
    const result = await tracesConnector.getData('192.168.1.1');

    // Assert
    expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
    expect(result).not.toBeNull();
    expect(result.status).toBe('success');
  });

  test('should call get-data with invalid ip and fail', async () => {
    // Arrange
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockResolvedValueOnce(tracesAxiosGetResponseError);

    try {
      // Act
      await tracesConnector.getData('192.168.1.1');
    } catch (error) {
      // Assert
      expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(IpError);
      expect(error.name).toBe('Traces-getData');
      expect(error.statusCode).toBe(400);
    }
  });

  test('should call get-data and axios client fails', async () => {
    // Arrange
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockRejectedValue(status500AxiosError);

    try {
      // Act
      await tracesConnector.getData('192.168.1.1');
    } catch (error) {
      // Assert
      expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(ExternalError);
      expect(error.name).toBe('Traces-getData');
      expect(error.statusCode).toBe(500);
    }
  });
});
