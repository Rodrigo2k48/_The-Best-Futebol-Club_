import { Router, Request, Response, NextFunction } from 'express';
import TeamsController from '../Controllers/teamsController';
import TeamsService from '../Services/teamsService';

const teamsRouter = Router();

const teamService = new TeamsService();
const teamController = new TeamsController(teamService);

teamsRouter.get('/teams', (req: Request, res: Response, next: NextFunction) => teamController
  .readAllTeams(req, res, next));

export default teamsRouter;
