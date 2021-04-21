'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Properties_Price_Indices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      price_to_income_ratio: {
        type: Sequelize.FLOAT
      },
      gross_rental_yield_city_centre: {
        type: Sequelize.FLOAT
      },
      gross_rental_yield_outside_of_centre: {
        type: Sequelize.FLOAT
      },
      price_to_rent_ratio_city_centre: {
        type: Sequelize.FLOAT
      },
      price_to_rent_ratio_outside_of_city_centre: {
        type: Sequelize.FLOAT
      },
      mortgage_as_a_percentage_of_income: {
        type: Sequelize.FLOAT
      },
      affordability_index: {
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
    await queryInterface.dropTable('Properties_Price_Indices');
  }
};