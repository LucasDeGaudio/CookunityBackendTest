import { AxiosError, AxiosRequestConfig } from 'axios';
import { Configuration } from '../../../../src/interfaces/axios/request';

const axiosCreateConfig: AxiosRequestConfig = {
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  timeout: 30,
};

const axiosConfig: Configuration = {
  timeout: 30,
  retries: 0,
};

export { axiosConfig, axiosCreateConfig };
