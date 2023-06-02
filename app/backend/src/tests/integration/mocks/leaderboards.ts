import Team from "../../../database/models/Team"
import Matche from "../../../database/models/Matche"

export const TEAMS_LEADERBOARD = [
{
	id: 1,
	teamName: 'Palmeiras',
},
{
	id: 2,
	teamName: 'Corinthians',
},
{
	id: 3,
	teamName: 'Santos',
},
{
	id: 4,
	teamName: 'Grêmio',
},
] as unknown as Team[]

export const MATCHES_LEADERBOARD = [
	{
	  "id": 1,
	  "homeTeamId": 1,
	  "homeTeamGoals": 1,
	  "awayTeamId": 2,
	  "awayTeamGoals": 1,
	  "inProgress": false,
	  "homeTeam": {
		"teamName": "Palmeiras"
	  },
	  "awayTeam": {
		"teamName": "Corinthians"
	  }
	},
	{
		"id": 2,
		"homeTeamId": 1,
		"homeTeamGoals": 2,
		"awayTeamId": 2,
		"awayTeamGoals": 2,
		"inProgress": false,
		"homeTeam": {
		  "teamName": "Palmeiras"
		},
		"awayTeam": {
		  "teamName": "Corinthians"
		}
	  },
	{
	  "id": 41,
	  "homeTeamId": 3,
	  "homeTeamGoals": 2,
	  "awayTeamId": 4,
	  "awayTeamGoals": 0,
	  "inProgress": false,
	  "homeTeam": {
		"teamName": "Santos"
	  },
	  "awayTeam": {
		"teamName": "Grêmio"
	  },
	},
	  {
		"id": 41,
		"homeTeamId": 3,
		"homeTeamGoals": 2,
		"awayTeamId": 4,
		"awayTeamGoals": 3,
		"inProgress": false,
		"homeTeam": {
		  "teamName": "Santos"
		},
		"awayTeam": {
		  "teamName": "Grêmio"
		}
	}
] as unknown as Matche[]


export const LEADERBOARD_MOCK = [
	{
	  name: 'Santos',
	  totalPoints: 3,
	  totalGames: 2,
	  totalVictories: 1,
	  totalDraws: 0,
	  totalLosses: 1,
	  goalsFavor: 4,
	  goalsOwn: 3,
	  goalsBalance: 1,
	  efficiency: '50.00'
	},
	{
	  name: 'Grêmio',
	  totalPoints: 3,
	  totalGames: 2,
	  totalVictories: 1,
	  totalDraws: 0,
	  totalLosses: 1,
	  goalsFavor: 3,
	  goalsOwn: 4,
	  goalsBalance: -1,
	  efficiency: '50.00'
	},
	{
	  name: 'Palmeiras',
	  totalPoints: 2,
	  totalGames: 2,
	  totalVictories: 0,
	  totalDraws: 2,
	  totalLosses: 0,
	  goalsFavor: 3,
	  goalsOwn: 3,
	  goalsBalance: 0,
	  efficiency: '33.33'
	},
	{
	  name: 'Corinthians',
	  totalPoints: 2,
	  totalGames: 2,
	  totalVictories: 0,
	  totalDraws: 2,
	  totalLosses: 0,
	  goalsFavor: 3,
	  goalsOwn: 3,
	  goalsBalance: 0,
	  efficiency: '33.33'
	}
  ]

export const LEADERBOARD_HOME_MOCK = [
	{
	  name: 'Santos',
	  totalPoints: 3,
	  totalGames: 2,
	  totalVictories: 1,
	  totalDraws: 0,
	  totalLosses: 1,
	  goalsFavor: 4,
	  goalsOwn: 3,
	  goalsBalance: 1,
	  efficiency: '50.00'
	},
	{
	  name: 'Palmeiras',
	  totalPoints: 2,
	  totalGames: 2,
	  totalVictories: 0,
	  totalDraws: 2,
	  totalLosses: 0,
	  goalsFavor: 3,
	  goalsOwn: 3,
	  goalsBalance: 0,
	  efficiency: '33.33'
	},
	{
	  name: 'Corinthians',
	  totalPoints: 0,
	  totalGames: 0,
	  totalVictories: 0,
	  totalDraws: 0,
	  totalLosses: 0,
	  goalsFavor: 0,
	  goalsOwn: 0,
	  goalsBalance: 0,
	  efficiency: 'NaN'
	},
	{
	  name: 'Grêmio',
	  totalPoints: 0,
	  totalGames: 0,
	  totalVictories: 0,
	  totalDraws: 0,
	  totalLosses: 0,
	  goalsFavor: 0,
	  goalsOwn: 0,
	  goalsBalance: 0,
	  efficiency: 'NaN'
	}
  ]

export const LEADERBOARD_AWAY_MOCK = [
	{
	  name: 'Grêmio',
	  totalPoints: 3,
	  totalGames: 2,
	  totalVictories: 1,
	  totalDraws: 0,
	  totalLosses: 1,
	  goalsFavor: 3,
	  goalsOwn: 4,
	  goalsBalance: -1,
	  efficiency: '50.00'
	},
	{
	  name: 'Corinthians',
	  totalPoints: 2,
	  totalGames: 2,
	  totalVictories: 0,
	  totalDraws: 2,
	  totalLosses: 0,
	  goalsFavor: 3,
	  goalsOwn: 3,
	  goalsBalance: 0,
	  efficiency: '33.33'
	},
	{
	  name: 'Palmeiras',
	  totalPoints: 0,
	  totalGames: 0,
	  totalVictories: 0,
	  totalDraws: 0,
	  totalLosses: 0,
	  goalsFavor: 0,
	  goalsOwn: 0,
	  goalsBalance: 0,
	  efficiency: 'NaN'
	},
	{
	  name: 'Santos',
	  totalPoints: 0,
	  totalGames: 0,
	  totalVictories: 0,
	  totalDraws: 0,
	  totalLosses: 0,
	  goalsFavor: 0,
	  goalsOwn: 0,
	  goalsBalance: 0,
	  efficiency: 'NaN'
	}
  ]

