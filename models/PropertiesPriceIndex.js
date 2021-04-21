"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class PropertiesPriceIndex extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	PropertiesPriceIndex.init(
		{
			country: DataTypes.STRING,
			price_to_income_ratio: DataTypes.FLOAT,
			gross_rental_yield_city_centre: DataTypes.FLOAT,
			gross_rental_yield_outside_of_centre: DataTypes.FLOAT,
			price_to_rent_ratio_city_centre: DataTypes.FLOAT,
			price_to_rent_ratio_outside_of_city_centre: DataTypes.FLOAT,
			mortgage_as_a_percentage_of_income: DataTypes.FLOAT,
			affordability_index: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "PropertiesPriceIndex",
			tableName: "properties_price_indices",
		}
	);
	return PropertiesPriceIndex;
};
