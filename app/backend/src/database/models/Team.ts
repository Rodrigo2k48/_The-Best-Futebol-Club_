import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
import Matche from './Matche';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({

  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  tableName: 'teams',
  timestamps: false,
});

Matche.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Team.hasMany(Matche, { foreignKey: 'homeTeamId', as: 'homeMatchs' });
Team.hasMany(Matche, { foreignKey: 'awayTeamId', as: 'awayMatchs' });

export default Team;
