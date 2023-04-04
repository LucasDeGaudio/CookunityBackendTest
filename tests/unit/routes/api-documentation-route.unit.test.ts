import { ApiDocumentationRoute } from '../../../src/routes/api-documentation-route';

describe('api-documentation-route suite tests', () => {
  test('Should initialize docs route', () => {
    const apiDocumentationRoute = new ApiDocumentationRoute();
    expect(apiDocumentationRoute.basePath).toBe('/docs');
  });
});
