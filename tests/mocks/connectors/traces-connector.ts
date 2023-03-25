import { AxiosError, AxiosResponse } from 'axios';

const tracesApiResponseOk = {
  status: 'success',
  country: 'United States',
  countryCode: 'US',
  lat: 29.634,
  lon: -95.5758,
  currency: 'USD',
  query: '192.168.1.1',
};

const tracesApiResponseError = {
  status: 'fail',
  message: 'Invalid Ip',
};

export const tracesAxiosGetResponseOk: AxiosResponse = {
  data: tracesApiResponseOk,
  status: 200,
  statusText: '',
  headers: undefined,
  config: undefined,
};

export const tracesAxiosGetResponseError: AxiosResponse = {
  data: tracesApiResponseError,
  status: 200,
  statusText: '',
  headers: undefined,
  config: undefined,
};

export const status500AxiosError: AxiosError = {
  name: 'Internal server error',
  toJSON: () => jest.fn(),
  config: {},
  isAxiosError: true,
  message: 'Internal server error',
  response: {
    status: 500,
    statusText: 'Internal server error',
    headers: {},
    config: {},
    data: {},
  },
};
