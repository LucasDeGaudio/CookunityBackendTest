import { createAxiosClient } from '../../../../src/helpers/axios/axios-client-helper';
import axios from 'axios';
import {
  axiosConfig,
  axiosCreateConfig,
} from '../../../mocks/helpers/axios/axios-client';
jest.mock('axios');

describe('axios-client-helper suite test', () => {
  test('Should create axios clientwithout errors', () => {
    const axiosCreateSpy = jest
      .spyOn(axios, 'create')
      .mockImplementation(() => axios);

    createAxiosClient(axiosConfig);

    expect(axiosCreateSpy).toHaveBeenCalledWith(axiosCreateConfig);
  });
});
