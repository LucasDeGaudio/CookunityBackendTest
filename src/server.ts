// import express, { Express, Request, Response } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

// const app: Express = express();
// const port = process.env.PORT;

// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + TypeScript Server');
// });

// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });

import App from './app';
import { HealthRoute } from './routes/health-route';
import { TracesRoute } from './routes/traces-route';
import { StatisticsRoute } from './routes/statistics-route';

const app = new App(
  // All App Routes
  [new HealthRoute(), new TracesRoute(), new StatisticsRoute()],
);

const run = async () => {
  // Initialize application
  await app.initialize();
  // Listen for connections
  app.listen();
};

run();
