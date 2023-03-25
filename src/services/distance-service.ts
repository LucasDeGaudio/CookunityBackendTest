import { distanceConstants } from '../constants/distance';

class DistanceService {
  public calculateDistanceToUSA = (lat: number, lon: number): number => {
    const usaLat = distanceConstants.USA.lat;
    const usaLon = distanceConstants.USA.lon;

    if (usaLat === lat && usaLon == lon) {
      return 0;
    } else {
      const radUsalat = (Math.PI * usaLat) / 180;
      const radlat2 = (Math.PI * lat) / 180;
      const theta = usaLon - lon;
      const radtheta = (Math.PI * theta) / 180;

      let dist =
        Math.sin(radUsalat) * Math.sin(radlat2) +
        Math.cos(radUsalat) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;

      //convert to kilometers
      dist = dist * 1.609344;
      return Number(dist.toFixed(2));
    }
  };
}

export const distanceService = new DistanceService();
