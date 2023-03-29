import { StatisticsResultResponse } from '../interfaces/resources/statistics';
import { redisRepository } from '../repository/redis-repository';

class StatisticsService {
  public getInfo = async (): Promise<StatisticsResultResponse> => {
    try {
      await this.calculateMostTracedCountry();

      const longestDistanceCountry = await redisRepository.get(
        'longestDistance.country',
      );
      const longestDistanceValue = await redisRepository.get(
        'longestDistance.value',
      );
      const mostTracedCountry = await redisRepository.get('mostTraced.country');
      const mostTracedValue = await redisRepository.get('mostTraced.value');

      return {
        longestDistance: {
          country: longestDistanceCountry,
          value: Number(longestDistanceValue),
        },
        mostTraced: {
          country: mostTracedCountry,
          value: Number(mostTracedValue),
        },
      };
    } catch (error) {
      console.error('<statistics-service> Error:', {
        error,
      });
      throw error;
    }
  };

  private calculateMostTracedCountry = async () => {
    const countries: string[] = await redisRepository.getAll('country.*');
    if (countries.length) {
      const countryMap = {};
      await Promise.all(
        countries.map(async (country) => {
          const value = await redisRepository.get(country);
          countryMap[country] = value;
        }),
      );

      const mostTracedValue = Object.values(countryMap).reduce(
        (prev, current) => {
          return Number(prev) > Number(current)
            ? Number(prev)
            : Number(current);
        },
        0,
      );

      const mostTracedCountryValue = Object.keys(countryMap).find(
        (key) => countryMap[key] === String(mostTracedValue),
      );

      // Get all requested country names
      const countryNames = await redisRepository.getHash('countries.names');
      const mostTracedCountryName = countryNames[mostTracedCountryValue];

      redisRepository.set('mostTraced.country', mostTracedCountryName);
      redisRepository.set('mostTraced.value', String(mostTracedValue));
    }
  };
}

export const statisticsService = new StatisticsService();
