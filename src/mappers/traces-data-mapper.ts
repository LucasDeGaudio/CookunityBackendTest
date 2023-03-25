import {
  TracesApiResponse,
  TracesResultResponse,
} from '../interfaces/resources/traces';

export const formatResponse = (
  apiResponse: TracesApiResponse,
): TracesResultResponse => {
  return {
    ip: apiResponse.query,
    name: apiResponse.country,
    code: apiResponse.countryCode,
    lat: apiResponse.lat,
    lon: apiResponse.lon,
  };
};
