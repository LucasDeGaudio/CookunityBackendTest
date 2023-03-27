import { StatisticsResultResponse } from '../interfaces/resources/statistics';
import { RedisRepository } from '../repository/redis-repository';

class StatisticsService {
  private readonly redisRepository: RedisRepository;

  constructor() {
    this.redisRepository = new RedisRepository();
  }

  public getInfo = async (): Promise<StatisticsResultResponse> => {
    try {
      await this.calculateMostTracedCountry();

      const longestDistanceCountry = await this.redisRepository.get(
        'longestDistance.country',
      );
      const longestDistanceValue = await this.redisRepository.get(
        'longestDistance.value',
      );
      const mostTracedCountry = await this.redisRepository.get(
        'mostTraced.country',
      );
      const mostTracedValue = await this.redisRepository.get(
        'mostTraced.value',
      );
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
    const countries: string[] = await this.redisRepository.getAll('country.*');
    console.info('countries: ', countries);

    const countryMap = {};

    await Promise.all(
      countries.map(async (country) => {
        const value = await this.redisRepository.get(country);
        console.info(`country: ${country} value: ${value}`);
        countryMap[country] = value;
      }),
    );
    const mostTracedValue = Object.values(countryMap).reduce(
      (prev, current) => {
        return prev > current ? prev : current;
      },
      0,
    );

    const mostTracedCountryValue = Object.keys(countryMap).find(
      (key) => countryMap[key] === mostTracedValue,
    );
    console.info(mostTracedCountryValue);
  };
}

export const statisticsService = new StatisticsService();
