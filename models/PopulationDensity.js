'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PopulationDensity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.belongsTo(models.Country, { foreignKey: "name" });
    }
  };
  PopulationDensity.init({
    rank: DataTypes.STRING,
    country_or_dependent_territory: DataTypes.STRING,
    area_km2: DataTypes.STRING,
    area_mi2: DataTypes.STRING,
    population: DataTypes.STRING,
    density_popkm2: DataTypes.STRING,
    density_popmi2: DataTypes.STRING,
    date: DataTypes.DATE,
    population_source: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PopulationDensity',
    tableName: 'population_density',
    underscored: true,
  });
  return PopulationDensity;
};