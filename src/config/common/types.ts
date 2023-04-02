export type Config = {
  port: string;
  nodeEnv: string;
  redis: {
    port: string;
    url: string;
  };
};
