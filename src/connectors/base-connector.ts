import { AxiosInstance } from 'axios';
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

  protected doGet = async <T>(endpoint: string, params: any): Promise<T> => {
    try {
      const configuration: Configuration = this.getConfiguration();
      const axiosClient: AxiosInstance = createAxiosClient(configuration);
      console.info('<netsuite-base-connector> GET - Request:', {
        endpoint,
        params,
      });
      const { data: externalResponse } = await axiosClient.get<T>(endpoint, {
        params,
      });
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
