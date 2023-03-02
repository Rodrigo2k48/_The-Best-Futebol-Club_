import { Router } from 'express';
import TeamsController from '../Controllers/teamsController';

const teamsRouter = Router();

teamsRouter.get('/', (req, res) => TeamsController.readAllTeams(req, res));

export default teamsRouter;
