import Matche from '../../../database/models/Matche';

export const MATCHES_IN_DB = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
] as unknown as Matche[];

export const NEW_MATCHE_INPUT = {
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
};

export const NEW_MATCHE_OUTPUT = {
  id: 2,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
} as unknown as Matche;

export const TEAM_COMPETING_WITH_ITSELF = {
  homeTeamId: 1,
  homeTeamGoals: 2,
  awayTeamId: 1,
  awayTeamGoals: 2,
};

export const POSITION_NOT_EXIST_IN_ARRAY = 1000;
export const ROWS_UPDATED = 1 