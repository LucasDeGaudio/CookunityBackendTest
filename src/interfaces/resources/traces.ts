export interface TracesRequest {
  ip: string;
}

export interface TracesApiResponse {
  status: string;
  message: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  currency: string;
  query: string;
}

export interface TracesParameters {
  fields: number;
}

interface Currencies {
  iso: string;
  symbol: string;
  conversionRate: number;
}

export interface TracesResultResponse {
  ip: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  currencies?: Currencies;
  distanceToUsa?: number;
}
