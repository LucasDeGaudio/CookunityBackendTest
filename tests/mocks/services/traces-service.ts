import {
  CurrencyApiResponse,
  IpGeolocalizationApiResponse,
} from '../../../src/interfaces/resources/traces';

export const ipGeoApiResponse: IpGeolocalizationApiResponse = {
  status: 'success',
  message: 'OK',
  country: 'Argenrina',
  countryCode: 'AR',
  lat: 10,
  lon: -50,
  currency: 'ARS',
  query: '192.168.1.1',
};

export const currencyApiResponse: CurrencyApiResponse = {
  success: true,
  query: { from: 'ARS', to: 'USD', amount: 1 },
  date: '2023-03-26',
  result: 0.004872,
};
