import express from 'express';
import authRoute from './api/routes/authRoute';
import teamsRoute from './api/routes/teamsRoute';
import HttpErrorMiddleware from './api/middlewares/HttpErrorMiddleware';
import matchesRoute from './api/routes/matchesRoute';
import leaderboardRoute from './api/routes/leaderboardsRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.initRoutes();
    this.errorHandler();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private initRoutes(): void {
    this.app.use('/teams', teamsRoute);
    this.app.use('/login', authRoute);
    this.app.use('/matches', matchesRoute);
    this.app.use('/leaderboard', leaderboardRoute);
  }

  private errorHandler(): void {
    this.app.use(HttpErrorMiddleware.error);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
