"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class HealthCareIndex extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	HealthCareIndex.init(
		{
			country: DataTypes.STRING,
			health_care_index: DataTypes.FLOAT,
			health_care_exp_index: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "HealthCareIndex",
			tableName: "health_care_indices",
		}
	);
	return HealthCareIndex;
};
