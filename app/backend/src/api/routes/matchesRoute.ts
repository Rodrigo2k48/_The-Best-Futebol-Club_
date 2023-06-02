import { NextFunction, Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import verifyToken from '../middlewares/verifyToken';

const matchesRoute = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRoute.get('/', (req: Request, res: Response, next: NextFunction) => matchesController
  .readAllMatches(req, res, next));
matchesRoute.patch(
  '/:id/finish',
  verifyToken,
  (req: Request, res: Response, next: NextFunction) =>
    matchesController.matcheFinisher(req, res, next),
);
matchesRoute.patch(
  '/:id',
  verifyToken,
  (req: Request, res: Response, next:NextFunction) => matchesController
    . updateMatchGoals(req, res, next),
);
matchesRoute.post(
  '/',
  verifyToken,
  (req: Request, res: Response, next: NextFunction) => matchesController
    . createNewMatch(req, res, next),
);

export default matchesRoute;
