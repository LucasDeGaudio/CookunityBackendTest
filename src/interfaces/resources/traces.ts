export interface TracesRequest {
  ip: string;
}

export interface IpGeolocalizationApiResponse {
  status: string;
  message: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
  currency: string;
  query: string;
}

export interface IpGeolocalizationParameters {
  fields: number;
}

interface CurrencyQuery {
  amount: number;
  from: string;
  to: string;
}
export interface CurrencyApiResponse {
  date: string;
  query: CurrencyQuery;
  result: number;
  success: boolean;
}

export interface CurrencyParameters {
  to: string;
  from: string;
  amount: number;
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
  currencies?: Currencies[];
  distanceToUsa?: number;
}
