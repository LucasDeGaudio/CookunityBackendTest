import { formatResponse } from '../../../src/mappers/traces-data-mapper';
import {
  tracesApiARGExpectedResponse,
  ipGeoApiMockARGResponse,
  currencyApiMockARGResponse,
  tracesApiUSAExpectedResponse,
  ipGeoApiMockUSAResponse,
  currencyApiMockUSAResponse,
} from '../../mocks/mappers/traces-data-mapper';

describe('traces-data-mapper suite tests', () => {
  test('Should execute formatResponse successfully with ARG data', () => {
    const result = formatResponse(
      ipGeoApiMockARGResponse,
      currencyApiMockARGResponse,
    );
    expect(result).toEqual(tracesApiARGExpectedResponse);
  });

  test('Should execute formatResponse successfully with USA data', () => {
    const result = formatResponse(
      ipGeoApiMockUSAResponse,
      currencyApiMockUSAResponse,
    );
    expect(result).toEqual(tracesApiUSAExpectedResponse);
  });
});
