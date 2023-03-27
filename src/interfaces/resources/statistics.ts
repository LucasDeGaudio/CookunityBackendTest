interface LongestDistance {
  country: string;
  value: number;
}

interface MostTraced {
  country: string;
  value: number;
}

export interface StatisticsResultResponse {
  longestDistance: LongestDistance;
  mostTraced: MostTraced;
}
