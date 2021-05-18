const { Router } = require("express");
const authorization = require("../../middlewares/authorization");

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
} = require("../../models");
const Op = Sequelize.Op;

generate.get("/", authorization, async (req, res, next) => {
	sequelize.options.logging = false;

	const template = await findRandomQuestionTemplate();

	// console.log(template.toJSON());

	let relevantModel;
	let relevantColumn;
	const relevantStat = template.column_name;
	let isFirst = template.is_first;

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
			questionObject = await handleType1Template(
				relevantModel,
				relevantColumn,
				isFirst,
				relevantStat,
				template
			);
			break;
		case 2:
			questionObject = await handleType2Template(
				relevantModel,
				relevantColumn,
				relevantStat,
				template
			);
			break;
		case 3:
			questionObject = await handleType3Template(
				relevantModel,
				relevantColumn,
				isFirst,
				relevantStat,
				template
			);
			break;
		case 4:
			questionObject = await handleType4Template(
				relevantModel,
				relevantColumn,
				isFirst,
				relevantStat,
				template
			);
			break;
	}

	sequelize.options.logging = true;

	res.json(questionObject);
});

const handleType4Template = async (
	relevantModel,
	relevantColumn,
	isFirst,
	relevantStat,
	template
) => {
	let relevantRows = [];
	let attempts = 0;
	let countries;
	let isDiffLessThan2 = true;
	let areSomeRelevantStatsNull = true;

	while (relevantRows.length !== 2 || isDiffLessThan2 || areSomeRelevantStatsNull) {
		attempts++;
		// console.log(`attempt no. ${attempts}:`);
		countries = await find2RandomCountries();

		// console.log("2 names from Countries table: ");
		// countries.map((country) => console.log(country.toJSON().name));
		const countriesFormatted = countries.map((country) => country.toJSON());

		relevantRows = await findCorrespondingRow(relevantModel, relevantColumn, countriesFormatted);

		isDiffLessThan2 = Math.abs(relevantRows[0][relevantStat] - relevantRows[1][relevantStat]) <= 2;

		areSomeRelevantStatsNull = relevantRows.some((row) => row[relevantStat] === null);
		// console.log("are some relevant stats null?: ", areSomeRelevantStatsNull);
	}

	const relevantRowsMini = relevantRows.map((row) => {
		return {
			[relevantColumn]: row[relevantColumn],
			[relevantStat]: row[relevantStat],
		};
	});

	relevantRowsMini.sort((a, b) => a[relevantStat] - b[relevantStat]);
	for (const rowMini of relevantRowsMini) {
		// console.log(rowMini);
	}

	const answer = isFirst ? "Yes" : "No";

	// console.log("answer: ", answer);

	const question_str = template.template
		.replace("XXXXX", relevantRowsMini[0][relevantColumn])
		.replace("ZZZZZ", Math.round(relevantRowsMini[1][relevantStat]));

	// console.log("question string type 4: ", question_str);

	// console.log("attempts: ", attempts);

	const questionObject = {
		question_str,
		type: template.type,
		option1: "Yes",
		option2: "No",
		template: template.template,
		answer,
	};

	console.log("question object: ", questionObject);

	return questionObject;
};

const handleType3Template = async (
	relevantModel,
	relevantColumn,
	isFirst,
	relevantStat,
	template
) => {
	let relevantRows = [];
	let attempts = 0;
	let countries;
	let areSomeRelevantStatsNull = true;

	while (relevantRows.length !== 2 || areSomeRelevantStatsNull) {
		attempts++;
		// console.log(`attempt no. ${attempts}:`);
		countries = await find2RandomCountries();

		// console.log("2 names from Countries table: ");
		// countries.map((country) => console.log(country.toJSON().name));
		const countriesFormatted = countries.map((country) => country.toJSON());

		relevantRows = await findCorrespondingRow(relevantModel, relevantColumn, countriesFormatted);

		areSomeRelevantStatsNull = relevantRows.some((row) => row[relevantStat] === null);
		// console.log("are some relevant stats null?: ", areSomeRelevantStatsNull);
	}

	const relevantRowsMini = relevantRows.map((row) => {
		return {
			[relevantColumn]: row[relevantColumn],
			[relevantStat]: row[relevantStat],
		};
	});

	relevantRowsMini.sort((a, b) => a[relevantStat] - b[relevantStat]);
	for (const rowMini of relevantRowsMini) {
		// console.log(rowMini);
	}

	const answer = isFirst ? "Yes" : "No";

	// console.log("answer: ", answer);

	const question_str = template.template
		.replace("XXXXX", relevantRowsMini[0][relevantColumn])
		.replace("YYYYY", relevantRowsMini[1][relevantColumn]);

	// console.log("question string type 3: ", question_str);

	// console.log("attempts: ", attempts);

	const questionObject = {
		question_str,
		type: template.type,
		option1: "Yes",
		option2: "No",
		template: template.template,
		answer,
	};

	console.log("question object: ", questionObject);

	return questionObject;
};

const handleType2Template = async (relevantModel, relevantColumn, relevantStat, template) => {
	let relevantRows = [];
	let attempts = 0;
	let countries;

	let options = [];
	let areSomeRelevantStatsNull = true;

	while (relevantRows.length !== 4 || !checkIfAllUnique(options) || areSomeRelevantStatsNull) {
		attempts++;
		// console.log(`attempt no. ${attempts}:`);
		countries = await find4RandomCountries();

		// console.log("4 names from Countries table: ");
		// countries.map((country) => console.log(country.toJSON().name));
		const countriesFormatted = countries.map((country) => country.toJSON());

		relevantRows = await findCorrespondingRow(relevantModel, relevantColumn, countriesFormatted);

		options = relevantRows.map((row) => row[relevantStat]);

		areSomeRelevantStatsNull = relevantRows.some((row) => row[relevantStat] === null);
		// console.log("are some relevant stats null?: ", areSomeRelevantStatsNull);
	}

	// console.log("options: ", options);

	const relevantRowsMini = relevantRows.map((row) => {
		return {
			[relevantColumn]: row[relevantColumn],
			[relevantStat]: row[relevantStat],
		};
	});

	for (const rowMini of relevantRowsMini) {
		// console.log(rowMini);
	}

	const question_str = template.template.replace("XXXXX", relevantRowsMini[0][relevantColumn]);

	// console.log("question string type 2: ", question_str);

	// console.log("attempts: ", attempts);

	relevantRowsMini.forEach((rowMini, i) => {
		if ( Number(rowMini[relevantStat]) !== NaN ) {
	  relevantRowsMini[i][relevantStat] = Number(rowMini[relevantStat]).toLocaleString('en-US');
	}
	return;
	})

	const answer = relevantRowsMini[0][relevantStat];
	const shuffledOptions = shuffleArray(relevantRowsMini);

	// console.log("answer: ", answer);

	const questionObject = {
		question_str,
		type: template.type,
		option1: shuffledOptions[0][relevantStat],
		option2: shuffledOptions[1][relevantStat],
		option3: shuffledOptions[2][relevantStat],
		option4: shuffledOptions[3][relevantStat],
		template: template.template,
		answer,
	};

	console.log("question object: ", questionObject);

	return questionObject;
};

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
	let areSomeRelevantStatsNull = true;

	while (relevantRows.length !== 4 || areSomeRelevantStatsNull) {
		attempts++;
		// console.log(`attempt no. ${attempts}:`);
		countries = await find4RandomCountries();

		// console.log("4 names from Countries table: ");
		// countries.map((country) => console.log(country.toJSON().name));
		const countriesFormatted = countries.map((country) => country.toJSON());

		relevantRows = await findCorrespondingRow(relevantModel, relevantColumn, countriesFormatted);

		areSomeRelevantStatsNull = relevantRows.some((row) => row[relevantStat] === null);
		// console.log("are some relevant stats null?: ", areSomeRelevantStatsNull);
	}

	// console.log("attempts: ", attempts);

	const relevantRowsMini = relevantRows.map((row) => {
		return {
			[relevantColumn]: row[relevantColumn],
			[relevantStat]: row[relevantStat],
		};
	});

	relevantRowsMini.sort((a, b) => a[relevantStat] - b[relevantStat]);
	for (const rowMini of relevantRowsMini) {
		// console.log(rowMini);
	}

	const answer = isFirst
		? relevantRowsMini[0][relevantColumn]
		: relevantRowsMini[relevantRowsMini.length - 1][relevantColumn];

	// console.log("answer: ", answer);

	const questionObject = {
		question_str,
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

const find2RandomCountries = async () => {
	return Country.findAll({
		order: Sequelize.literal("rand()"),
		limit: 2,
	});
};

const findCorrespondingRow = async (model, columnName, countries) => {
	const options = [];
	countries.forEach((_, index) => {
		options.push({
			[columnName]: {
				[Op.and]: [
					{ [Op.notLike]: `%(%${countries[index].name}%)%` },
					{
						[Op.like]: `%${countries[index].name}%`,
					},
				],
			},
		});
	});

	return model.findAll({
		where: {
			[Op.or]: options,
		},
	});
};

function shuffleArray(array) {
	const result = [...array];
	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}

const checkIfAllUnique = (array) => {
	if (array.length === 0) return false;

	let arrayNoDuplicates = array.filter((item, index) => array.indexOf(item) === index);

	return arrayNoDuplicates.length === array.length ? true : false;
};

module.exports = generate;
