import type { Config } from './types';

const config: Config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  redis: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
};

export default config;
