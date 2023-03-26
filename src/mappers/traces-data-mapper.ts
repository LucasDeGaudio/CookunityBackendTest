import {
  CurrencyApiResponse,
  IpGeolocalizationApiResponse,
  TracesResultResponse,
} from '../interfaces/resources/traces';

export const formatResponse = (
  ipGeoApiResponse: IpGeolocalizationApiResponse,
  currencyApiResponse: CurrencyApiResponse,
): TracesResultResponse => {
  return {
    ip: ipGeoApiResponse.query,
    name: ipGeoApiResponse.country,
    code: ipGeoApiResponse.countryCode,
    lat: ipGeoApiResponse.lat,
    lon: ipGeoApiResponse.lon,
    currencies:
      ipGeoApiResponse.currency !== 'USD'
        ? [
            {
              iso: ipGeoApiResponse.currency,
              symbol: '$',
              conversionRate: currencyApiResponse.result,
            },
            {
              iso: 'USD',
              symbol: '$',
              conversionRate: 1,
            },
          ]
        : [
            {
              iso: ipGeoApiResponse.currency,
              symbol: '$',
              conversionRate: currencyApiResponse.result,
            },
          ],
  };
};
