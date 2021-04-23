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
	sequelize,
} = require("../models");
const Op = Sequelize.Op;

generate.get("/", async (req, res, next) => {
	sequelize.options.logging = false;

	let countriesPopulationDensity = [];
	let attempts = 0;

	while (countriesPopulationDensity.length !== 4) {
		attempts++;
		console.log(`attempt no. ${attempts}:`);
		const countries = await find4RandomCountries();

		console.log("4 names from Countries table: ");
		countries.map((country) => console.log(country.toJSON().name));
		const countriesFormatted = countries.map((country) => country.toJSON());

		countriesPopulationDensity = await findCorrespondingPD(countriesFormatted);
	}

	console.log("attempts: ", attempts);

	const countriesPDMini = countriesPopulationDensity.map((countryPD) => {
		return {
			country_or_dependent_territory: countryPD.country_or_dependent_territory,
			population: countryPD.population,
		};
	});
	countriesPDMini.sort((a, b) => a.population - b.population);
	for (const countryPDMini of countriesPDMini) {
		console.log(countryPDMini);
	}

	sequelize.options.logging = true;

	res.json({
		questionStr: "placeholder",
		option1: "option1",
		option2: "option2",
		option3: "option3",
		option4: "option4",
	});
});

const find4RandomCountries = async () => {
	return Country.findAll({
		order: Sequelize.literal("rand()"),
		limit: 4,
	});
};

const findCorrespondingPD = async (countries) => {
	return PopulationDensity.findAll({
		where: {
			[Op.or]: [
				{
					country_or_dependent_territory: {
						[Op.and]: [
							{ [Op.notLike]: `%(%${countries[0].name}%)%` },
							{
								[Op.like]: `%${countries[0].name}%`,
							},
						],
					},
				},
				{
					country_or_dependent_territory: {
						[Op.and]: [
							{ [Op.notLike]: `%(%${countries[1].name}%)%` },
							{
								[Op.like]: `%${countries[1].name}%`,
							},
						],
					},
				},
				{
					country_or_dependent_territory: {
						[Op.and]: [
							{ [Op.notLike]: `%(%${countries[2].name}%)%` },
							{
								[Op.like]: `%${countries[2].name}%`,
							},
						],
					},
				},
				{
					country_or_dependent_territory: {
						[Op.and]: [
							{ [Op.notLike]: `%(%${countries[3].name}%)%` },
							{
								[Op.like]: `%${countries[3].name}%`,
							},
						],
					},
				},
			],
		},
	});
};

module.exports = generate;
