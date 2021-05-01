'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
		queryInterface.addColumn("players", "password", {
			type: Sequelize.STRING,
		});
  },

  down: async (queryInterface, Sequelize) => {
		queryInterface.removeColumn("players", "password");
  }
};
