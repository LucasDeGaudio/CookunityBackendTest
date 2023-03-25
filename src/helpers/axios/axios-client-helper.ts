import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { requestConstants } from '../../constants/request';
import { Configuration } from '../../interfaces/axios/request';

const createAxiosClient = (config?: Configuration): AxiosInstance => {
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      'Content-Type': requestConstants.headers.contentType.json,
      Accept: requestConstants.headers.accept.json,
    },
    timeout: config?.timeout,
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
  };
  const axiosClient: AxiosInstance = axios.create(axiosConfig);
  return axiosClient;
};

export { createAxiosClient };
