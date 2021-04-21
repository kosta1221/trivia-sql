"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Countries extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Countries.init(
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
			modelName: "Countries",
			tableName: "Countries",
			underscored: true,
		}
	);
	return Countries;
};
