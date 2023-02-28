'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('matches', { 
        id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        }, 
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id'
        }
      },
     homeTeamGoals: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'home_team_goals',
     }, 
     awayTeamId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'away_team_id',
      references: {
        model: 'teams',
        key: 'id'
      }
     }, 
    awayTeamsGoals: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'away_team_goals',
    }, 
  inProgress:{
    type: Sequelize.BOOLEAN,
    allowNull: false,
    field: 'in_progress'
  } });
  },

  async down (queryInterface, Sequelize) {
 await queryInterface.dropTable('matches');

  }
};
