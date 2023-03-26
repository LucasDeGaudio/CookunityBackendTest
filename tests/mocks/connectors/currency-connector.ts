import { AxiosError, AxiosResponse } from 'axios';

const currencyApiResponseOk = {
  success: true,
  query: { from: 'ARS', to: 'USD', amount: 1 },
  date: '2023-03-26',
  result: 0.004872,
};

const currencyApiResponseError = {
  error: {
    code: 'invalid_from_currency',
    message: 'You have entered an invalid "from" property',
  },
};

export const tracesAxiosGetResponseOk: AxiosResponse = {
  data: currencyApiResponseOk,
  status: 200,
  statusText: '',
  headers: undefined,
  config: undefined,
};

export const tracesAxiosGetResponseError: AxiosResponse = {
  data: currencyApiResponseError,
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
