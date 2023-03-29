export type Config = {
  port: string;
  nodeEnv: string;
  redis: {
    port: string;
    host: string;
  };
};
