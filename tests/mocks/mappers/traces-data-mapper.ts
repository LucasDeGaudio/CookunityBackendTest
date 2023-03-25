import {
  TracesApiResponse,
  TracesResultResponse,
} from '../../../src/interfaces/resources/traces';

export const tracesApiMockResponse: TracesApiResponse = {
  status: 'success',
  message: 'OK',
  country: 'Argentina',
  countryCode: 'ARG',
  lat: 29.634,
  lon: -95.5758,
  currency: 'ARS',
  query: '192.168.1.1',
};

export const tracesApiExpectedResponse: TracesResultResponse = {
  ip: '192.168.1.1',
  name: 'Argentina',
  code: 'ARG',
  lat: 29.634,
  lon: -95.5758,
};
