export interface TracesRequest {
  ip: string;
}

export interface TracesResponse {
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
  fields: string[];
}
