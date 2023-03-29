import App from './app';
import { HealthRoute } from './routes/health-route';
import { TracesRoute } from './routes/traces-route';
import { StatisticsRoute } from './routes/statistics-route';
import { ApiDocumentationRoute } from './routes/api-documentation-route';

const app = new App(
  // All App Routes
  [
    new HealthRoute(),
    new TracesRoute(),
    new StatisticsRoute(),
    new ApiDocumentationRoute(),
  ],
);

const run = async () => {
  // Initialize application
  await app.initialize();
  // Listen for connections
  app.listen();
};

run();
