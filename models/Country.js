"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Country extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasOne(models.Capital, { foreignKey: "country" });
			this.hasOne(models.CrimeIndex, { foreignKey: "country" });
			this.hasOne(models.CostOfLivingIndex, { foreignKey: "country" });
			this.hasOne(models.QualityOfLifeIndex, { foreignKey: "country" });
			this.hasOne(models.PopulationDensity, { foreignKey: "country_or_dependent_territory" });
		}
	}
	Country.init(
		{
			name: DataTypes.STRING,
			region: DataTypes.STRING,
			coastline: DataTypes.FLOAT,
			net_migration: DataTypes.FLOAT,
			infant_mortality_per_1000: DataTypes.FLOAT,
			gdp: DataTypes.INTEGER,
			literacy: DataTypes.FLOAT,
			phones: DataTypes.FLOAT,
			arable: DataTypes.FLOAT,
			crops: DataTypes.FLOAT,
			other: DataTypes.FLOAT,
			climate: DataTypes.FLOAT,
			birthrate: DataTypes.FLOAT,
			deathrate: DataTypes.FLOAT,
			agriculture: DataTypes.FLOAT,
			industry: DataTypes.FLOAT,
			service: DataTypes.FLOAT,
		},
		{
			sequelize,
			modelName: "Country",
			tableName: "countries",
			underscored: true,
		}
	);
	return Country;
};
