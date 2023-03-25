import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  // silent: true, // disable console logs
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', '.d.ts', '.js'],
  verbose: true,
  testTimeout: 20000,
  globals: {
    'ts-jest': {
      isolatedModules: true,
      babelConfig: true,
    },
  },

  testRegex: 'test.ts',
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  coverageDirectory: 'coverage/apps',
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    '/tests/',
    'src/app.ts',
    'src/server.ts',
    'src/commands',
    'src/config/common',
    'src/enums',
    'src/models',
    'src/platform',
    'src/validators',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default config;
