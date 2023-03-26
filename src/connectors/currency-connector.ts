import { AxiosRequestConfig } from 'axios';
import { currencyConstants } from '../constants/resources';
import { CurrencyError } from '../errors/currency-error';
import { ExternalError } from '../errors/external-error';
import {
  CurrencyApiResponse,
  CurrencyParameters,
} from '../interfaces/resources/traces';
import BaseConnector from './base-connector';

class CurrencyConnector extends BaseConnector {
  public getData = async (currency: string): Promise<CurrencyApiResponse> => {
    try {
      const endpoint = currencyConstants.endpoint;

      const params: CurrencyParameters = {
        from: currency,
        to: currencyConstants.UsdCurrency,
        amount: currencyConstants.amount,
      };

      const headers = {
        apikey: currencyConstants.apiKey,
      };

      const axiosConfig: AxiosRequestConfig = { params, headers };

      const response = await this.doGet<CurrencyApiResponse>(
        endpoint,
        axiosConfig,
      );

      if (!response?.success) {
        throw new CurrencyError('Currency-getData', response);
      }
      return response;
    } catch (error) {
      if (error.errorCode === CurrencyError.ERROR_CODE) {
        throw error;
      }
      console.error('<currency-connector> Error:', {
        error,
      });
      throw new ExternalError('Currency-getData');
    }
  };
}

export const currencyConnector = new CurrencyConnector();
