import type { Config } from './types';

const config: Config = {
  port: process.env.PORT,
  host: process.env.HOST,
  nodeEnv: process.env.NODE_ENV,
};
export default config;
