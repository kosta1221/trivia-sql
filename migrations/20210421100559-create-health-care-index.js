"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("health_care_indices", {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			country: {
				primaryKey: true,
				type: Sequelize.STRING,
			},
			health_care_index: {
				type: Sequelize.FLOAT,
			},
			health_care_exp_index: {
				type: Sequelize.FLOAT,
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
		await queryInterface.dropTable("health_care_indices");
	},
};
