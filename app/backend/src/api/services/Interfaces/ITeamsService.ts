import Team from '../../../database/models/Team';

export default interface ITeamsService {
  getAllTeams(): Promise<Team[]>,
  getTeamById(teamId: number): Promise<Team | null>,
}
