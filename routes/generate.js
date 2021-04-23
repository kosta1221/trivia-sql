const { Router } = require("express");

const generate = Router();

const {
	Country,
	CrimeIndex,
	Capital,
	CostOfLivingIndex,
	PopulationDensity,
	QualityOfLifeIndex,
	Sequelize,
} = require("../models");
const Op = Sequelize.Op;

generate.get("/", (req, res, next) => {
	Country.findAll({
		order: Sequelize.literal("rand()"),
		limit: 4,
	})
		.then((countries) => {
			countries.map((country) => console.log(country.toJSON().name));

			PopulationDensity.findAll({
				where: {
					[Op.or]: [
						{
							country_or_dependent_territory: {
								[Op.and]: [
									{ [Op.notLike]: `%(%${countries[0].toJSON().name}%)%` },
									{
										[Op.like]: `%${countries[0].toJSON().name}%`,
									},
								],
							},
						},
						{
							country_or_dependent_territory: {
								[Op.and]: [
									{ [Op.notLike]: `%(%${countries[1].toJSON().name}%)%` },
									{
										[Op.like]: `%${countries[1].toJSON().name}%`,
									},
								],
							},
						},
						{
							country_or_dependent_territory: {
								[Op.and]: [
									{ [Op.notLike]: `%(%${countries[2].toJSON().name}%)%` },
									{
										[Op.like]: `%${countries[2].toJSON().name}%`,
									},
								],
							},
						},
						{
							country_or_dependent_territory: {
								[Op.and]: [
									{ [Op.notLike]: `%(%${countries[3].toJSON().name}%)%` },
									{
										[Op.like]: `%${countries[3].toJSON().name}%`,
									},
								],
							},
						},
					],
				},
			}).then((countriesPopulationDensity) => {
				const onlyRelevantProps = countriesPopulationDensity.map((countryPD) => {
					console.log(countryPD.toJSON());
					return {
						country_or_dependent_territory: countryPD.country_or_dependent_territory,
						population: countryPD.population,
					};
				});
				onlyRelevantProps.sort((a, b) => a.population - b.population);
				for (const bulbul of onlyRelevantProps) {
					console.log(bulbul);
				}
			});
		})
		.catch((err) => next(err));

	res.json({
		questionStr: "456",
		option1: "opti45645on1",
		option2: "opti4564564on2",
		option3: "opti645645on3",
		option4: "opt6456456ion4",
	});
});

module.exports = generate;
