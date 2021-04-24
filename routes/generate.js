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
	let isFirst = template.is_first;
	let questionType;

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

	let questionObject;

	switch (template.type) {
		case 1:
			questionType = 1;

			questionObject = await handleType1Template(
				relevantModel,
				relevantColumn,
				isFirst,
				relevantStat,
				template
			);
			break;
		case 2:
			questionType = 2;
			break;
		case 3:
			questionType = 3;
			break;
	}

	sequelize.options.logging = true;

	res.json(questionObject);
});

const handleType1Template = async (
	relevantModel,
	relevantColumn,
	isFirst,
	relevantStat,
	template
) => {
	let relevantRows = [];
	let attempts = 0;
	const question_str = template.template;
	let countries;

	while (relevantRows.length !== 4) {
		attempts++;
		console.log(`attempt no. ${attempts}:`);
		countries = await find4RandomCountries();

		console.log("4 names from Countries table: ");
		countries.map((country) => console.log(country.toJSON().name));
		const countriesFormatted = countries.map((country) => country.toJSON());

		relevantRows = await findCorrespondingRow(relevantModel, relevantColumn, countriesFormatted);
	}

	console.log("attempts: ", attempts);

	const relevantRowsMini = relevantRows.map((row) => {
		return {
			[relevantColumn]: row[relevantColumn],
			[relevantStat]: row[relevantStat],
		};
	});

	relevantRowsMini.sort((a, b) => a[relevantStat] - b[relevantStat]);
	for (const rowMini of relevantRowsMini) {
		console.log(rowMini);
	}

	const answer = isFirst
		? relevantRowsMini[0][relevantColumn]
		: relevantRowsMini[relevantRowsMini.length - 1][relevantColumn];

	console.log("answer: ", answer);

	const questionObject = {
		question_str, // !!!
		type: template.type,
		option1: countries[0].toJSON().name,
		option2: countries[1].toJSON().name,
		option3: countries[2].toJSON().name,
		option4: countries[3].toJSON().name,
		template: template.template,
		answer,
	};

	console.log("question object: ", questionObject);

	return questionObject;
};

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
