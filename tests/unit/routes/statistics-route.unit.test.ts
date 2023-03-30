import { StatisticsRoute } from '../../../src/routes/statistics-route';

describe('statistics-route suite tests', () => {
  test('Should initialize routes', () => {
    const statisticsRoute = new StatisticsRoute();

    expect(statisticsRoute.basePath).toBe('/statistics');
    expect(statisticsRoute.router.stack.length).toBe(1);
  });
});
