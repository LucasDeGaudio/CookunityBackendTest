import {
  CurrencyApiResponse,
  IpGeolocalizationApiResponse,
  TracesResultResponse,
} from '../../../src/interfaces/resources/traces';

export const ipGeoApiMockARGResponse: IpGeolocalizationApiResponse = {
  status: 'success',
  message: 'OK',
  country: 'Argentina',
  countryCode: 'ARG',
  lat: 29.634,
  lon: -95.5758,
  currency: 'ARS',
  query: '192.168.1.1',
};

export const currencyApiMockARGResponse: CurrencyApiResponse = {
  success: true,
  query: { from: 'ARS', to: 'USD', amount: 1 },
  date: '2023-03-26',
  result: 0.004872,
};

export const tracesApiARGExpectedResponse: TracesResultResponse = {
  ip: '192.168.1.1',
  name: 'Argentina',
  code: 'ARG',
  lat: 29.634,
  lon: -95.5758,
  currencies: [
    {
      iso: 'ARS',
      symbol: '$',
      conversionRate: 0.004872,
    },
    {
      iso: 'USD',
      symbol: '$',
      conversionRate: 1,
    },
  ],
};

export const ipGeoApiMockUSAResponse: IpGeolocalizationApiResponse = {
  status: 'success',
  message: 'OK',
  country: 'United States',
  countryCode: 'US',
  lat: 29.634,
  lon: -95.5758,
  currency: 'USD',
  query: '192.168.1.1',
};

export const currencyApiMockUSAResponse: CurrencyApiResponse = {
  success: true,
  query: { from: 'USD', to: 'USD', amount: 1 },
  date: '2023-03-26',
  result: 1,
};

export const tracesApiUSAExpectedResponse: TracesResultResponse = {
  ip: '192.168.1.1',
  name: 'United States',
  code: 'US',
  lat: 29.634,
  lon: -95.5758,
  currencies: [
    {
      iso: 'USD',
      symbol: '$',
      conversionRate: 1,
    },
  ],
};
