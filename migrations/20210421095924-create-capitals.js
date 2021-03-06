"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("capitals", {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			country: {
				primaryKey: true,
				type: Sequelize.STRING,
			},
			capital: {
				type: Sequelize.STRING,
			},
			continent: {
				type: Sequelize.STRING,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("capitals");
	},
};
