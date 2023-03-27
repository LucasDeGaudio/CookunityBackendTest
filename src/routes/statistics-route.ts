import { Router } from 'express';
import StatisticsController from '../controllers/statistics-controller';
import { Route } from '../interfaces/routes/routes';
import { createValidator, ExpressJoiInstance } from 'express-joi-validation';
import { getStatisticsValidator } from '../validators/statistics';

export class StatisticsRoute implements Route {
  public basePath = '/statistics';
  public router = Router();
  public statisticsController = new StatisticsController();
  public validator: ExpressJoiInstance;

  constructor() {
    this.validator = createValidator({ passError: true });
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.basePath}`,
      [this.validator.body(getStatisticsValidator)],
      this.statisticsController.process,
    );
  }
}
