import { TracesResultResponse } from '../../../src/interfaces/resources/traces';

export const redisGetLongestDistanceCountryEmptyResponse = null;
export const redisGetLongestDistanceValueEmptyResponse = null;
export const redisGetCountryValueEmptyResponse = null;

export const redisGetLongestDistanceCountryResponse = 'Argentina';
export const redisGetLongestDistanceValueResponse = '1000';
export const redisGetCountryARValueResponse = 'country.AR';

export const traceResponse: TracesResultResponse = {
  ip: '103.50.33.255',
  name: 'Argentina',
  code: 'AR',
  lat: -36,
  lon: -59.9964,
  distanceToUsa: 8922,
};
