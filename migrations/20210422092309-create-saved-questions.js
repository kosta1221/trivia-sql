"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("saved_questions", {
			id: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			type: {
				type: Sequelize.INTEGER,
			},
			question_str: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			option1: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			option2: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.STRING,
			},
			option3: {
				type: Sequelize.STRING,
			},
			option4: {
				type: Sequelize.STRING,
			},
			answer: {
				type: Sequelize.INTEGER,
			},
			rating: {
				allowNull: false,
				type: Sequelize.FLOAT,
			},
			number_of_ratings: {
				allowNull: false,
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("saved_questions");
	},
};
