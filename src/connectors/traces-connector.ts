import { ExternalError } from '../errors/external-error';
import { tracesConstants } from '../constants/resources';
import BaseConnector from './base-connector';
import { IpError } from '../errors/ip-error';
import {
  TracesParameters,
  TracesResponse,
} from '../interfaces/resources/traces';

class TracesConnector extends BaseConnector {
  public getData = async (ip: string): Promise<TracesResponse> => {
    try {
      const endpoint = tracesConstants.endpoint.concat(ip);
      const params = {
        fields: tracesConstants.fieldsToQuery,
      };
      const response = await this.doGet<TracesResponse>(endpoint, params);
      if (response.status !== tracesConstants.responseSuccess) {
        throw new IpError('Traces-getData', response);
      }
      return response;
    } catch (error) {
      if (error.errorCode === IpError.ERROR_CODE) {
        throw error;
      }
      console.error('<traces-connector> Error:', {
        error,
      });
      throw new ExternalError('Traces-getData');
    }
  };
}

export const tracesConnector = new TracesConnector();
