import { formatResponse } from '../../../src/mappers/traces-data-mapper';
import {
  tracesApiExpectedResponse,
  tracesApiMockResponse,
} from '../../mocks/mappers/traces-data-mapper';

describe('traces-data-mapper', () => {
  test('Should execute formatResponse successfully', () => {
    const result = formatResponse(tracesApiMockResponse);
    expect(result).toEqual(tracesApiExpectedResponse);
  });
});
