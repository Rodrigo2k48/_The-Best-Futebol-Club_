import { Router, Request, Response, NextFunction } from 'express';
import LeaderboardsController from '../Controllers/leaderboardsController';
import LeaderboardsService from '../Services/leaderboardsService';
import MatchesService from '../Services/matchesService';
import TeamsService from '../Services/teamsService';

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

export default leaderboardRoute;
