module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'teams',
      [
        {
          team_name: 'Bragantino',
        },
        {
          team_name: 'Bahia',
        },
        {
          team_name: 'Botafogo',
        },
        {
          team_name: 'Corinthians',
        },
        {
          team_name: 'Cruzeiro',
        },
        {
          team_name: 'Atlético-MG',
        },
        {
          team_name: 'Flamengo',
        },
        {
          team_name: 'Grêmio',
        },
        {
          team_name: 'Internacional',
        },
        {
          team_name: 'Athletico-PR',
        },
        {
          team_name: 'Vasco da Gama',
        },
        {
          team_name: 'Palmeiras',
        },
        {
          team_name: 'Fortaleza',
        },
        {
          team_name: 'Santos',
        },
        {
          team_name: 'Fluminense',
        },
        {
          team_name: 'São Paulo',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('teams', null, {});
  },
};