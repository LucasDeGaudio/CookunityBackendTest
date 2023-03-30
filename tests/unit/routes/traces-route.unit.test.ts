import { TracesRoute } from '../../../src/routes/traces-route';

describe('traces-route suite tests', () => {
  test('Should initialize routes', () => {
    const tracesRoute = new TracesRoute();

    expect(tracesRoute.basePath).toBe('/traces');
    expect(tracesRoute.router.stack.length).toBe(1);
  });
});
