import Matche from "../../../database/models/Matche";

export const MATCHES_IN_DB = [
    {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
            "teamName": "São Paulo"
        },
        "awayTeam": {
            "teamName": "Grêmio"
        }
    },
    {
        "id": 41,
        "homeTeamId": 16,
        "homeTeamGoals": 2,
        "awayTeamId": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeTeam": {
            "teamName": "São Paulo"
        },
        "awayTeam": {
            "teamName": "Internacional"
        }
    }
] as unknown as Matche[]

export const MATCHES_IN_PROGRESS_TRUE = [
    {
        id: 41,
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 9,
        awayTeamGoals: 0,
        inProgress: true,
        homeTeam: { teamName: 'São Paulo' },
        awayTeam: { teamName: 'Internacional' }
    }
]
export const MATCHES_IN_PROGRESS_FALSE = [
    {
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
            "teamName": "São Paulo"
        },
        "awayTeam": {
            "teamName": "Grêmio"
        }
    },
]