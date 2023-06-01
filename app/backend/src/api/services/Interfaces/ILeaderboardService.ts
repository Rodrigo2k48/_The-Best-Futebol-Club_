import ILeaderboard from '../../interfaces/ILeaderboard';
import IMatch from '../../interfaces/IMach';
import ITeam from '../../interfaces/ITeam';

export default interface ILeaderboardService {
  timesPlaying(id: number, matches: IMatch[]): number;
  goalsHomeTeam(id: number, matches: IMatch[]): number;
  goalsAwayTeam(id: number, matches: IMatch[]): number;
  goalsDifference(id: number, matches: IMatch[]): number;
  timesTeamLost(id: number, matches: IMatch[]): number;
  winningTimes(id: number, matches: IMatch[]): number;
  timesItTied(id: number, matches: IMatch[]): number;
  totalPoints(id: number, matches: IMatch[]): number;
  tiebreaker(leaderboard: ILeaderboard[]): ILeaderboard[];
  getAllStatus(teams: ITeam[], matches: IMatch[], isHome: boolean): ILeaderboard[];
  getLeaderboard(teams: ITeam[], matches: IMatch[]): ILeaderboard[]
}
