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
	QuestionTemplate,
} = require("../models");
const Op = Sequelize.Op;

generate.get("/", async (req, res, next) => {
	sequelize.options.logging = false;

	const template = await findRandomQuestionTemplate();

	console.log(template.toJSON());

	let relevantModel;
	let relevantColumn;
	const relevantStat = template.column_name;
	switch (template.table_name) {
		case "countries":
			relevantModel = Country;
			relevantColumn = "name";
			break;
		case "quality_of_life_indices":
			relevantModel = QualityOfLifeIndex;
			relevantColumn = "country";
			break;
		case "population_density":
			relevantModel = PopulationDensity;
			relevantColumn = "country_or_dependent_territory";
			break;
		case "cost_of_living_indices":
			relevantModel = CostOfLivingIndex;
			relevantColumn = "country";
			break;
		case "crime_indices":
			relevantModel = CrimeIndex;
			relevantColumn = "country";
			break;
		case "capitals":
			relevantModel = Capital;
			relevantColumn = "country";
			break;
	}

	let relevantRow = [];
	let attempts = 0;

	while (relevantRow.length !== 4) {
		attempts++;
		console.log(`attempt no. ${attempts}:`);
		const countries = await find4RandomCountries();

		console.log("4 names from Countries table: ");
		countries.map((country) => console.log(country.toJSON().name));
		const countriesFormatted = countries.map((country) => country.toJSON());

		relevantRow = await findCorrespondingRow(relevantModel, relevantColumn, countriesFormatted);
	}

	console.log("attempts: ", attempts);

	const relevantRowsMini = relevantRow.map((row) => {
		return {
			[relevantColumn]: row[relevantColumn],
			[relevantStat]: row[relevantStat],
		};
	});
	relevantRowsMini.sort((a, b) => a[relevantStat] - b[relevantStat]);
	for (const rowMini of relevantRowsMini) {
		console.log(rowMini);
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

const findRandomQuestionTemplate = async () => {
	return QuestionTemplate.findOne({
		order: Sequelize.literal("rand()"),
	});
};

const find4RandomCountries = async () => {
	return Country.findAll({
		order: Sequelize.literal("rand()"),
		limit: 4,
	});
};

const findCorrespondingRow = async (model, columnName, countries) => {
	return model.findAll({
		where: {
			[Op.or]: [
				{
					[columnName]: {
						[Op.and]: [
							{ [Op.notLike]: `%(%${countries[0].name}%)%` },
							{
								[Op.like]: `%${countries[0].name}%`,
							},
						],
					},
				},
				{
					[columnName]: {
						[Op.and]: [
							{ [Op.notLike]: `%(%${countries[1].name}%)%` },
							{
								[Op.like]: `%${countries[1].name}%`,
							},
						],
					},
				},
				{
					[columnName]: {
						[Op.and]: [
							{ [Op.notLike]: `%(%${countries[2].name}%)%` },
							{
								[Op.like]: `%${countries[2].name}%`,
							},
						],
					},
				},
				{
					[columnName]: {
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
