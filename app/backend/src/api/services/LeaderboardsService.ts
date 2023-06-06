import ILeaderboard from '../interfaces/ILeaderboard';
import ILeaderboardService from './Interfaces/ILeaderboardService';
import IMatch from '../interfaces/IMach';
import ITeam from '../interfaces/ITeam';

export default class LeaderboardsService implements ILeaderboardService {
  public timesPlaying = (id: number, matches: IMatch[]): number => {
    let times = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id || match.awayTeamId === id) {
        times += 1;
      }
    });
    return times;
  };

  public goalsHomeTeam = (id: number, matches: IMatch[]): number => {
    let goals = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id) {
        goals += match.homeTeamGoals;
      }
      if (match.awayTeamId === id) {
        goals += match.awayTeamGoals;
      }
    });
    return goals;
  };

  public goalsAwayTeam = (id: number, matches: IMatch[]): number => {
    let goals = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id) {
        goals += match.awayTeamGoals;
      }
      if (match.awayTeamId === id) {
        goals += match.homeTeamGoals;
      }
    });
    return goals;
  };

  public goalsDifference = (id: number, matches: IMatch[]): number => {
    const GP = this.goalsHomeTeam(id, matches);
    const GC = this.goalsAwayTeam(id, matches);

    const GB = GP - GC;
    return GB;
  };

  public timesTeamLost = (id: number, matches: IMatch[]): number => {
    let times = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals < match.awayTeamGoals) {
        times += 1;
      }

      if (match.awayTeamId === id && match.awayTeamGoals < match.homeTeamGoals) {
        times += 1;
      }
    });

    return times;
  };

  public winningTimes = (id: number, matches: IMatch[]): number => {
    let times = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals > match.awayTeamGoals) {
        times += 1;
      }

      if (match.awayTeamId === id && match.awayTeamGoals > match.homeTeamGoals) {
        times += 1;
      }
    });

    return times;
  };

  public timesItTied = (id: number, matches: IMatch[]): number => {
    let times = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id && match.homeTeamGoals === match.awayTeamGoals) {
        times += 1;
      }

      if (match.awayTeamId === id && match.awayTeamGoals === match.homeTeamGoals) {
        times += 1;
      }
    });

    return times;
  };

  public totalPoints = (id: number, matches: IMatch[]): number => {
    let points = 0;
    matches.forEach((match) => {
      if (match.homeTeamId === id) {
        if (match.homeTeamGoals > match.awayTeamGoals) points += 3;
        if (match.homeTeamGoals === match.awayTeamGoals) points += 1;
      }
      if (match.awayTeamId === id) {
        if (match.awayTeamGoals > match.homeTeamGoals) points += 3;
        if (match.awayTeamGoals === match.homeTeamGoals) points += 1;
      }
    });
    return points;
  };

  public tiebreaker = (leaderboard: ILeaderboard[]): ILeaderboard[] => {
    const result = leaderboard.sort(
      (a, b) =>
        b.totalPoints - a.totalPoints ||
        b.totalVictories - a.totalVictories ||
        b.goalsBalance - a.goalsBalance ||
        b.goalsFavor - a.goalsFavor ||
        a.goalsOwn - b.goalsOwn
    );
    return result;
  };

  public getAllStatus = (teams: ITeam[], matches: IMatch[], isHome: boolean): ILeaderboard[] => {
    const result = teams.map((team) => {
      const filteredMatches = isHome
        ? matches.filter(({ homeTeamId }) => homeTeamId === team.id)
        : matches.filter(({ awayTeamId }) => awayTeamId === team.id);
      const totalGames = this.timesPlaying(team.id as number, filteredMatches);
      const totalPoints = this.totalPoints(team.id as number, filteredMatches);
      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories: this.winningTimes(team.id as number, filteredMatches),
        totalDraws: this.timesItTied(team.id as number, filteredMatches),
        totalLosses: this.timesTeamLost(team.id as number, filteredMatches),
        goalsFavor: this.goalsHomeTeam(team.id as number, filteredMatches),
        goalsOwn: this.goalsAwayTeam(team.id as number, filteredMatches),
        goalsBalance: this.goalsDifference(team.id as number, filteredMatches),
        efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
      };
    });
    return result;
  };

  public getLeaderboard = (teams: ITeam[], matches: IMatch[]): ILeaderboard[] => {
    const result = teams.map((team) => {
      const totalGames = this.timesPlaying(team.id as number, matches);
      const totalPoints = this.totalPoints(team.id as number, matches);
      return {
        name: team.teamName,
        totalPoints,
        totalGames,
        totalVictories: this.winningTimes(team.id as number, matches),
        totalDraws: this.timesItTied(team.id as number, matches),
        totalLosses: this.timesTeamLost(team.id as number, matches),
        goalsFavor: this.goalsHomeTeam(team.id as number, matches),
        goalsOwn: this.goalsAwayTeam(team.id as number, matches),
        goalsBalance: this.goalsDifference(team.id as number, matches),
        efficiency: ((totalPoints / (totalGames * 3)) * 100).toFixed(2),
      };
    });
    return result;
  };
}
