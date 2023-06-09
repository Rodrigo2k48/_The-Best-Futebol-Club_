import TeamsService from '../services/TeamsService';

export default class ValidateMatch {
  private _homeTeamId: number;
  private _awayTeamId: number;

  constructor(hTeamId: number, aTeamId: number) {
    this._homeTeamId = hTeamId;
    this._awayTeamId = aTeamId;
  }

  public async checkIfMatchDuplicate(): Promise<boolean> {
    const homeTeam = await new TeamsService().getTeamById(this._homeTeamId);
    const awayTeam = await new TeamsService().getTeamById(this._awayTeamId);
    if (homeTeam && awayTeam && homeTeam.dataValues.teamName === awayTeam.dataValues.teamName) {
      return true;
    }
    return false;
  }

  public async checkIfTeamExistsIndB(): Promise<boolean> {
    const homeTeam = await new TeamsService().getTeamById(this._homeTeamId);
    const awayTeam = await new TeamsService().getTeamById(this._awayTeamId);
    if (homeTeam === null || awayTeam === null) {
      return false;
    }
    return true;
  }
}
