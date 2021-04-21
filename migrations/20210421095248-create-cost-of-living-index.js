'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CostOfLivingIndices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      cost_of_living_index: {
        type: Sequelize.FLOAT
      },
      rent_index: {
        type: Sequelize.FLOAT
      },
      cost_of_living_plus_rent_index: {
        type: Sequelize.FLOAT
      },
      groceries_index: {
        type: Sequelize.FLOAT
      },
      restaurant_price_index: {
        type: Sequelize.FLOAT
      },
      local_purchasing_power_index: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CostOfLivingIndices');
  }
};