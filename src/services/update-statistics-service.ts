import { TracesResultResponse } from '../interfaces/resources/traces';
import { redisRepository } from '../repository/redis-repository';

class UpdateStatisticsService {
  public process = async (trace: TracesResultResponse): Promise<void> => {
    try {
      const longestDistanceCountry = await redisRepository.get(
        'longestDistance.country',
      );
      const longestDistanceValue = await redisRepository.get(
        'longestDistance.value',
      );

      if (!longestDistanceCountry && !longestDistanceValue) {
        redisRepository.set('longestDistance.country', trace.name);
        redisRepository.set(
          'longestDistance.value',
          String(trace.distanceToUsa),
        );
      } else if (trace.distanceToUsa > Number(longestDistanceValue)) {
        redisRepository.set('longestDistance.country', trace.name);
        redisRepository.set(
          'longestDistance.value',
          String(trace.distanceToUsa),
        );
      }

      const countryValue = await redisRepository.get(`country.${trace.code}`);
      if (countryValue) {
        const newCountryValue = Number(countryValue) + 1;
        redisRepository.set(`country.${trace.code}`, String(newCountryValue));
      } else {
        redisRepository.set(`country.${trace.code}`, String(1));
        redisRepository.setHash('countries.names', [
          `country.${trace.code}`,
          `${trace.name}`,
        ]);
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
