import type { Config } from './types';

const config: Config = {
  port: process.env.PORT,
  redisPort: process.env.REDIS_PORT,
  nodeEnv: process.env.NODE_ENV,
};

export default config;
