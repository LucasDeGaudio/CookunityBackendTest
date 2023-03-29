import { Router, Request, Response } from 'express';
import { Route } from '../interfaces/routes/routes';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export class ApiDocumentationRoute implements Route {
  public basePath = '/docs';
  public router = Router();
  private swaggerDocument = YAML.load(
    `${__dirname}/../documentation/api-specs.yaml`,
  );

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(
      `${this.basePath}`,
      swaggerUi.serve,
      (req: Request, res: Response) => {
        const html = swaggerUi.generateHTML(this.swaggerDocument);
        res.send(html);
      },
    );
  }
}
