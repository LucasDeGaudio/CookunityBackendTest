import { StatisticsResultResponse } from '../../../src/interfaces/resources/statistics';

export const statisticsResultResponse: StatisticsResultResponse = {
  longestDistance: {
    country: 'Argentina',
    value: 8922.08,
  },
  mostTraced: {
    country: 'Argentina',
    value: 22,
  },
};

export const errorStatisticsService: Error = new Error(
  'fake message errorStatisticsService',
);
