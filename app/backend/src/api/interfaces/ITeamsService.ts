import Team from '../../database/models/Team';

export default interface ITeamsService {
  getAllTeams(): Promise<Team[]>,
}
