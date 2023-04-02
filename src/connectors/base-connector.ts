import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { requestConstants } from '../constants/request';
import { createAxiosClient } from '../helpers/axios/axios-client-helper';
import { Configuration } from '../interfaces/axios/request';

abstract class BaseConnector {
  private getConfiguration = (): Configuration => {
    return {
      timeout: requestConstants.timeout,
      retries: 2,
    };
  };

  protected doGet = async <T>(
    endpoint: string,
    config: AxiosRequestConfig,
  ): Promise<T> => {
    try {
      const configuration: Configuration = this.getConfiguration();
      const axiosClient: AxiosInstance = createAxiosClient(configuration);
      // console.info('<base-connector> GET - Request:', {
      //   endpoint,
      //   config,
      // });
      const { data: externalResponse } = await axiosClient.get<T>(
        endpoint,
        config,
      );
      return externalResponse;
    } catch (error) {
      console.error('<base-connector> Error in GET:', {
        error,
        responseData: error?.response?.data,
      });
      throw error;
    }
  };
}

export default BaseConnector;
