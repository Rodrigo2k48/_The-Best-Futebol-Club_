import { NextFunction, Request, Response } from 'express';
import ITeamsService from '../services/Interfaces/ITeamsService';

export default class TeamsController {
  protected service: ITeamsService;

  constructor(service: ITeamsService) {
    this.service = service;
  }

  public async readAllTeams(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const teams = await this.service.getAllTeams();
      return res.status(200).json(teams);
    } catch (err) {
      next(err);
    }
  }

  public async readTeamById(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    try {
      const { id } = req.params;
      const team = await this.service.getTeamById(Number(id));
      return res.status(200).json(team);
    } catch (err) {
      next(err);
    }
  }
}
