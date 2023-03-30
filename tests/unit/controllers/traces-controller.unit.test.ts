import { Request, Response, NextFunction } from 'express';
import TracesController from '../../../src/controllers/traces-controller';
import { tracesService } from '../../../src/services/traces-service';
import {
  tracesRequestBody,
  tracesResultResponse,
  errorTracesProcessService,
} from '../../mocks/controllers/traces-controller';

describe('traces-controller suite test', () => {
  test('Should respond with 200', async () => {
    const tracesController = new TracesController();

    const req = {} as Request;
    req.body = tracesRequestBody;
    const res = {} as Response;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    const processSpy = jest
      .spyOn(tracesService, 'process')
      .mockResolvedValue(tracesResultResponse);

    await tracesController.process(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(processSpy).toHaveBeenCalledTimes(1);
  });

  test('Should respond 500 when service fails', async () => {
    const tracesController = new TracesController();

    const req = {
      body: {},
    } as Request;
    req.body = tracesRequestBody;

    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    jest
      .spyOn(tracesService, 'process')
      .mockImplementation(() => Promise.reject(errorTracesProcessService));

    await tracesController.process(req, res, next);
    expect(next).toHaveBeenCalledWith(errorTracesProcessService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
