import axios from 'axios';
import { currencyConnector } from '../../../src/connectors/currency-connector';
import { CurrencyError } from '../../../src/errors/currency-error';
import { ExternalError } from '../../../src/errors/external-error';
import * as axiosClientHelper from '../../../src/helpers/axios/axios-client-helper';
import {
  status500AxiosError,
  tracesAxiosGetResponseError,
  tracesAxiosGetResponseOk,
} from '../../mocks/connectors/currency-connector';

describe('currency-connector suite test', () => {
  jest.mock('axios');
  afterEach(async () => {
    jest.clearAllMocks();
  });

  test('should call get-data without errors', async () => {
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockResolvedValueOnce(tracesAxiosGetResponseOk);

    const result = await currencyConnector.getData('ARG');

    expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
    expect(result).not.toBeNull();
    expect(result.success).toBe(true);
  });

  test('should call get-data with invalid currency', async () => {
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockResolvedValueOnce(tracesAxiosGetResponseError);

    try {
      await currencyConnector.getData('BAD_CURRENCY');
    } catch (error) {
      expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(CurrencyError);
      expect(error.name).toBe('Currency-getData');
      expect(error.statusCode).toBe(400);
    }
  });

  test('should call get-data and axios client fails', async () => {
    const createAxiosClientSpy = jest
      .spyOn(axiosClientHelper, 'createAxiosClient')
      .mockImplementation(() => axios);
    axios.get = jest.fn().mockRejectedValue(status500AxiosError);

    try {
      await currencyConnector.getData('USD');
    } catch (error) {
      expect(createAxiosClientSpy).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(ExternalError);
      expect(error.name).toBe('Currency-getData');
      expect(error.statusCode).toBe(500);
    }
  });
});
