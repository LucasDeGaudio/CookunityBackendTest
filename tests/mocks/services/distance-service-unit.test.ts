import { distanceConstants } from '../../../src/constants/distance';
import { distanceService } from '../../../src/services/distance-service';

describe('distance-service suite test', () => {
  test('returns 0 when given USA lat and lon', () => {
    expect(
      distanceService.calculateDistanceToUSA(
        distanceConstants.USA.lat,
        distanceConstants.USA.lon,
      ),
    ).toBe(0);
  });

  test('calculates the correct distance in kilometers', () => {
    expect(distanceService.calculateDistanceToUSA(37.7749, -122.4194)).toBe(
      2351.18,
    );
    expect(distanceService.calculateDistanceToUSA(51.5074, -0.1278)).toBe(
      7219.74,
    );
    expect(distanceService.calculateDistanceToUSA(-33.8688, 151.2093)).toBe(
      14072.51,
    );
  });
});
