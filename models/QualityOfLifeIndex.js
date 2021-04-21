"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class QualityOfLifeIndex extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	QualityOfLifeIndex.init(
		{
			country: DataTypes.STRING,
			quality_of_life_Index: DataTypes.INTEGER,
			purchasing_power_index: DataTypes.FLOAT,
			safety_index: DataTypes.FLOAT,
			health_care_index: DataTypes.FLOAT,
			cost_of_living_index: DataTypes.FLOAT,
			property_price_to_income_ratio: DataTypes.FLOAT,
			traffic_commute_time_index: DataTypes.FLOAT,
			pollution_index: DataTypes.FLOAT,
			climate_index: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "QualityOfLifeIndex",
			tableName: "quality_of_life_indices",
		}
	);
	return QualityOfLifeIndex;
};
