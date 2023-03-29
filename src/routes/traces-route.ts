import { Router } from 'express';
import TracesController from '../controllers/traces-controller';
import { Route } from '../interfaces/routes/routes';
import { createValidator, ExpressJoiInstance } from 'express-joi-validation';
import { getTracesValidator } from '../validators/traces';

export class TracesRoute implements Route {
  public basePath = '/traces';
  public router = Router();
  public tracesController = new TracesController();
  public validator: ExpressJoiInstance;

  constructor() {
    this.validator = createValidator({ passError: true });
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.basePath}`,
      [this.validator.body(getTracesValidator)],
      this.tracesController.process,
    );
  }
}
