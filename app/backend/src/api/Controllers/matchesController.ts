import { Request, Response, NextFunction } from 'express';
import IMatchesService from '../interfaces/IMatchesService';

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
        return res.status(200).json(matchesProgress);
      }
      const allMatches = await this.service.getAllMatches();
      return res.status(200).json(allMatches);
    } catch (error) {
      next(error);
    }
  }

  public async matcheFinisher(req: Request, res: Response, next: NextFunction):
  Promise<void | Response> {
    try {
      const { id } = req.params;
      console.log(id);
      const finishedMatch = await this.service.updateProgressMatch(id);
      return res.status(200).json({ message: finishedMatch });
    } catch (error) {
      next(error);
    }
  }
}
