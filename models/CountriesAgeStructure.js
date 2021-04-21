"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class CountriesAgeStructure extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	CountriesAgeStructure.init(
		{
			country: DataTypes.STRING,
			age_0_to_14_years: DataTypes.FLOAT,
			age_15_to_64: DataTypes.STRING,
			age_above_65_years: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "CountriesAgeStructure",
			tableName: "countries_age_structure",
		}
	);
	return CountriesAgeStructure;
};
