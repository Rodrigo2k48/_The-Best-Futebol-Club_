import { ModelStatic } from 'sequelize';
import Team from '../../database/models/Team';
import ITeamsService from './Interfaces/ITeamsService';

export default class TeamsService implements ITeamsService {
  protected model: ModelStatic<Team> = Team;

  public async getAllTeams():Promise<Team[]> {
    return this.model.findAll();
  }

  public async getTeamById(teamId: number): Promise<Team | null> {
    return this.model.findByPk(teamId);
  }
}
