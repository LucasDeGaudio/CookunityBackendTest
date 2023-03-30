import { NextFunction, Request, Response } from 'express';
import StatisticsController from '../../../src/controllers/statistics-controller';
import { statisticsService } from '../../../src/services/statistics-service';
import {
  errorStatisticsService,
  statisticsResultResponse,
} from '../../mocks/controllers/statistics-controller';

describe('statistics-controller suite test', () => {
  test('Should respond with 200', async () => {
    const statisticsController = new StatisticsController();

    const req = {} as Request;
    const res = {} as Response;

    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    const getInfoSpy = jest
      .spyOn(statisticsService, 'getInfo')
      .mockResolvedValue(statisticsResultResponse);

    await statisticsController.process(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(getInfoSpy).toHaveBeenCalledTimes(1);
  });

  test('Should respond 500 when service fails', async () => {
    const statisticsController = new StatisticsController();
    const req = {} as Request;
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    const next = jest.fn() as NextFunction;

    jest
      .spyOn(statisticsService, 'getInfo')
      .mockImplementation(() => Promise.reject(errorStatisticsService));

    await statisticsController.process(req, res, next);
    expect(next).toHaveBeenCalledWith(errorStatisticsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
