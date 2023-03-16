import { NextFunction, Request, Response, Router } from 'express';
import MatchesController from '../Controllers/matchesController';
import MatchesService from '../Services/matchesService';
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

export default matchesRoute;
