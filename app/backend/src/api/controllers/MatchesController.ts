import { Request, Response, NextFunction } from 'express';
import IMatch from '../interfaces/IMach';
import IMatchesService from '../services/Interfaces/IMatchesService';
import HTTP_STATUS from '../shared/htttpStatusCode';

export default class MatchesController {
  protected service: IMatchesService;
  constructor(service: IMatchesService) {
    this.service = service;
  }

  public async readAllMatches(req: Request, res: Response, next: NextFunction):
  Promise<void | Response> {
    const { inProgress } = req.query;
    try {
      if (inProgress === 'true' || inProgress === 'false') {
        const matchesProgress = await this.service.getAllByProgress(inProgress);
        return res.status(HTTP_STATUS.SuccessOK).json(matchesProgress);
      }
      const allMatches = await this.service.getAllMatches();
      return res.status(HTTP_STATUS.SuccessOK).json(allMatches);
    } catch (error) {
      next(error);
    }
  }

  public async matcheFinisher(req: Request, res: Response, next: NextFunction):
  Promise<void | Response> {
    try {
      const { id } = req.params;
      const finishedMatch = await this.service.updateProgressMatch(id);
      return res.status(HTTP_STATUS.SuccessOK).json({ message: finishedMatch });
    } catch (error) {
      next(error);
    }
  }

  public async updateMatchGoals(req: Request, res: Response, next: NextFunction):
  Promise<void | Response> {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const newMatchGoals = await this.service
        .updateMatchGoalsById(id, homeTeamGoals, awayTeamGoals);
      return res.status(HTTP_STATUS.SuccessOK).json({ message: newMatchGoals });
    } catch (error) {
      next(error);
    }
  }

  public async createNewMatch(req: Request, res: Response, next: NextFunction):
  Promise<void | Response> {
    try {
      const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body as IMatch;
      const payload = { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals };
      const newMatch = await this.service.createMatch(payload);
      return res.status(HTTP_STATUS.SuccessCreated).json(newMatch);
    } catch (error) {
      next(error);
    }
  }
}
