import { ExternalError } from '../errors/external-error';
import { ipGeolocalizationConstants } from '../constants/resources';
import BaseConnector from './base-connector';
import { IpError } from '../errors/ip-error';
import {
  IpGeolocalizationParameters,
  IpGeolocalizationApiResponse,
} from '../interfaces/resources/traces';
import { AxiosRequestConfig } from 'axios';

class IpGeolocalizationConnector extends BaseConnector {
  public getData = async (
    ip: string,
  ): Promise<IpGeolocalizationApiResponse> => {
    try {
      const endpoint = ipGeolocalizationConstants.endpoint.concat(ip);

      const params: IpGeolocalizationParameters = {
        fields: ipGeolocalizationConstants.fieldsToQuery,
      };

      const axiosConfig: AxiosRequestConfig = { params };

      const response = await this.doGet<IpGeolocalizationApiResponse>(
        endpoint,
        axiosConfig,
      );

      if (response.status !== ipGeolocalizationConstants.responseSuccess) {
        throw new IpError('IpGeolocalization-getData', response);
      }
      return response;
    } catch (error) {
      if (error.errorCode === IpError.ERROR_CODE) {
        throw error;
      }
      console.error('<ip-geolocalization-connector> Error:', {
        error,
      });
      throw new ExternalError('IpGeolocalization-getData');
    }
  };
}

export const ipGeolocalizationConnector = new IpGeolocalizationConnector();
