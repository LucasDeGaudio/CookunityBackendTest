import { ApiDocumentationRoute } from '../../../src/routes/api-documentation-route';

describe('api-documentation-route suite tests', () => {
  test('Should initialize docs route', () => {
    const escrowApiDocumentationRoute = new ApiDocumentationRoute();
    expect(escrowApiDocumentationRoute.basePath).toBe('/docs');
  });
});
