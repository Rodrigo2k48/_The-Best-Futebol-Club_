import { Request, Response } from 'express';

export default class TeamsController {
  public static readAllTeams(req: Request, res: Response):Response | void {
    return res.sendStatus(200);
  }
}
