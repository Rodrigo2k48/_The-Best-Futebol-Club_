import { Request, Response, NextFunction } from 'express';
import IMatch from '../interfaces/IMach';
import LeaderboardsService from '../services/LeaderboardsService';
import MatchesService from '../services/MatchesService';
import TeamsService from '../services/TeamsService';
import HTTP_STATUS from '../shared/htttpStatusCode';

export default class LeaderboardsController {
  service: LeaderboardsService;
  protected team: TeamsService;
  protected matches: MatchesService;
  constructor(service: LeaderboardsService, team: TeamsService, matches: MatchesService) {
    this.service = service;
    this.team = team;
    this.matches = matches;
  }

  async homeLeaderboard(req: Request, res: Response, next: NextFunction):
  Promise<void | Response> {
    try {
      const teams = await this.team.getAllTeams();
      const matches = await this.matches.getAllMatches();
      const finalizedMatches = matches.filter((match) => match.inProgress === false) as
        unknown as IMatch[];
      const leaderboardStatus = this.service.getAllStatus(teams, finalizedMatches, true);
      const sortLeaderboardStatus = this.service.tiebreaker(leaderboardStatus);
      return res.status(HTTP_STATUS.SuccessOK).json(sortLeaderboardStatus);
    } catch (error) {
      next(error);
    }
  }

  async awayLeaderboard(req: Request, res:Response, next: NextFunction) {
    try {
      const teams = await this.team.getAllTeams();
      const matches = await this.matches.getAllMatches();
      const finalizedMatches = matches
        .filter((match) => match.inProgress === false) as unknown as IMatch[];
      const leaderboardStatus = this.service.getAllStatus(teams, finalizedMatches, false);
      const sortLeaderboardStatus = this.service.tiebreaker(leaderboardStatus);
      return res.status(HTTP_STATUS.SuccessOK).json(sortLeaderboardStatus);
    } catch (error) {
      next(error);
    }
  }

  async leaderboard(req: Request, res:Response, next: NextFunction) {
    try {
      const teams = await this.team.getAllTeams();
      const matches = await this.matches.getAllMatches();
      const finalizedMatches = matches
        .filter((match) => match.inProgress === false) as unknown as IMatch[];
      const leaderboardStatus = this.service.getLeaderboard(teams, finalizedMatches);
      const sortLeaderboardStatus = this.service.tiebreaker(leaderboardStatus);
      return res.status(HTTP_STATUS.SuccessOK).json(sortLeaderboardStatus);
    } catch (error) {
      next(error);
    }
  }
}
