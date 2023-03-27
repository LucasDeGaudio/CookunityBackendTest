import { TracesResultResponse } from '../interfaces/resources/traces';
import { RedisRepository } from '../repository/redis-repository';

class UpdateStatisticsService {
  private readonly redisRepository: RedisRepository;

  constructor() {
    this.redisRepository = new RedisRepository();
  }

  public process = async (trace: TracesResultResponse): Promise<void> => {
    try {
      const longestDistanceCountry = await this.redisRepository.get(
        'longestDistance.country',
      );
      const longestDistanceValue = await this.redisRepository.get(
        'longestDistance.value',
      );

      if (!longestDistanceCountry && !longestDistanceValue) {
        this.redisRepository.set('longestDistance.country', trace.name);
        this.redisRepository.set(
          'longestDistance.value',
          String(trace.distanceToUsa),
        );
      } else if (trace.distanceToUsa > Number(longestDistanceValue)) {
        this.redisRepository.set('longestDistance.country', trace.name);
        this.redisRepository.set(
          'longestDistance.value',
          String(trace.distanceToUsa),
        );
      }

      const countryValue = await this.redisRepository.get(
        `country.${trace.code}`,
      );
      if (countryValue) {
        const newCountryValue = Number(countryValue) + 1;
        this.redisRepository.set(
          `country.${trace.code}`,
          String(newCountryValue),
        );
      } else {
        this.redisRepository.set(`country.${trace.code}`, String(1));
      }
    } catch (error) {
      console.error('<update-statistics-service> Error:', {
        error,
      });
      throw error;
    }
  };
}

export const updateStatisticsService = new UpdateStatisticsService();
