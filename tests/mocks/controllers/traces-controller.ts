import {
  TracesRequest,
  TracesResultResponse,
} from '../../../src/interfaces/resources/traces';

export const tracesRequestBody: TracesRequest = {
  ip: '103.50.33.255',
};

export const tracesResultResponse: TracesResultResponse = {
  ip: '103.50.33.255',
  name: 'Argentina',
  code: 'AR',
  lat: -36,
  lon: -59.9964,
  currencies: [
    {
      iso: 'ARS',
      symbol: '$',
      conversionRate: 1,
    },
    {
      iso: 'USD',
      symbol: '$',
      conversionRate: 1,
    },
  ],
  distanceToUsa: 8000,
};

export const errorTracesProcessService: Error = new Error(
  'fake message errorTracesProcessService',
);
