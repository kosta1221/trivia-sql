const { Router } = require("express");
const authorization = require("../../middlewares/authorization");

const getSaved = Router();

const { Sequelize, SavedQuestion } = require("../../models");
const Op = Sequelize.Op;

getSaved.put("/", authorization, async (req, res, next) => {
	const { questionsAskedTotal } = req.body;

	const uniqueQuestions =
		questionsAskedTotal.length === 0
			? await SavedQuestion.findAll({})
			: await SavedQuestion.findAll({
					where: {
						[Op.not]: [
							[
								{ question_str: questionsAskedTotal.map((question) => question.question_str) },
								{ option1: questionsAskedTotal.map((question) => question.option1) },
								{ option2: questionsAskedTotal.map((question) => question.option2) },
							],
						],
					},
			  });

	// if (questionsAskedTotal.length === 0) {
	// 	uniqueQuestions = await SavedQuestion.findAll({});
	// } else {
	// 	uniqueQuestions = await SavedQuestion.findAll({
	// 		where: {
	// 			[Op.not]: [
	// 				[
	// 					{ question_str: questionsAskedTotal.map((question) => question.question_str) },
	// 					{ option1: questionsAskedTotal.map((question) => question.option1) },
	// 					{ option2: questionsAskedTotal.map((question) => question.option2) },
	// 				],
	// 			],
	// 		},
	// 	});
	// }

	const uniqueQuestionsFormatted = uniqueQuestions.map((question) => question.toJSON());

	const uniqueQuestionsRatingsSum = uniqueQuestionsFormatted
		.map((question) => question.rating)
		.reduce((prev, current) => prev + current);

	const uniqueQuestionsChances = uniqueQuestionsFormatted.map((question) => ({
		...question,
		chance: question.rating / uniqueQuestionsRatingsSum,
	}));

	// console.log("ratings sum: ", uniqueQuestionsRatingsSum);

	// uniqueQuestionsChances.map((q) => console.log("chance", q.chance * 100));
	// console.log(
	// 	"sum",
	// 	uniqueQuestionsChances.map((q) => q.chance).reduce((prev, c) => prev + c)
	// );

	const random = Math.random() * 100;
	let sum = 0;
	let i = 0;

	console.log("random num for question pick: ", random);

	for (const question of uniqueQuestionsChances) {
		console.log(i++);

		if (random >= sum && random <= sum + question.chance * 100) {
			const questionObject = {
				question_str: question.question_str,
				type: question.type,
				option1: question.option1,
				option2: question.option2,
				option3: question.option3,
				option4: question.option4,
				template: question.template,
				answer: question.answer,
			};

			console.log("chosen question", question);

			return res.json(questionObject);
		}
		sum += question.chance * 100;
	}
});

module.exports = getSaved;
