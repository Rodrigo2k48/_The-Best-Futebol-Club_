import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from './index';

class Matche extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matche.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
      field: 'home_team_id',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team_id',
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
  }
);
export default Matche;
