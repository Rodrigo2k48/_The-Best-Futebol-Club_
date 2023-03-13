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
    console.log(inProgress);

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
}
