import { Router, Request, Response, NextFunction } from 'express';
import TeamsController from '../controllers/TeamsController';
import TeamsService from '../services/TeamsService';

const teamsRouter = Router();

const teamService = new TeamsService();
const teamController = new TeamsController(teamService);

teamsRouter.get('/', (req: Request, res: Response, next: NextFunction) => teamController.readAllTeams(req, res, next));
teamsRouter.get('/:id', (req: Request, res: Response, next: NextFunction) =>
  teamController.readTeamById(req, res, next)
);

export default teamsRouter;
