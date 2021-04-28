'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('players', {
      name: {
        primaryKey: true,
        allowNull: false,  
        type: Sequelize.STRING
      },
      score: {
        type: Sequelize.INTEGER
      },
      avatar_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('players');
  }
};