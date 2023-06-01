import { Router, Request, Response, NextFunction } from 'express';
import LeaderboardsController from '../controllers/LeaderboardsController';
import LeaderboardsService from '../services/LeaderboardsService';
import MatchesService from '../services/MatchesService';
import TeamsService from '../services/TeamsService';

const leaderboardRoute = Router();
const teamService = new TeamsService();
const matcheService = new MatchesService();
const leaderboardService = new LeaderboardsService();
const leaderboardController = new LeaderboardsController(
  leaderboardService,
  teamService,

  matcheService,
);

leaderboardRoute.get('/home', (
  req: Request,
  res: Response,
  next: NextFunction,
) => leaderboardController.homeLeaderboard(req, res, next));

leaderboardRoute.get('/away', (req: Request, res: Response, next: NextFunction) =>
  leaderboardController.awayLeaderboard(req, res, next));
leaderboardRoute.get('/', (req: Request, res: Response, next: NextFunction) => {
  leaderboardController.leaderboard(req, res, next);
});

export default leaderboardRoute;
