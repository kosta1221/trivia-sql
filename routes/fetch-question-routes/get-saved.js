const { Router } = require("express");

const getSaved = Router();

const { Sequelize, SavedQuestion } = require("../../models");
const Op = Sequelize.Op;

getSaved.put("/", async (req, res, next) => {
	const { questionsAskedTotal } = req.body;

	const options = [];
	// questionsAskedTotal.forEach((question, i) => {
	// 	options.push({

	//     });
	// });

	if (questionsAskedTotal.length === 0) {
		const savedQuestion = await SavedQuestion.findOne({
			order: Sequelize.literal("rand()"),
		});

		const questionObject = {
			question_str: savedQuestion.question_str,
			type: savedQuestion.type,
			option1: savedQuestion.option1,
			option2: savedQuestion.option2,
			option3: savedQuestion.option3,
			option4: savedQuestion.option4,
			template: savedQuestion.template,
			answer: savedQuestion.answer,
		};

		return res.json(questionObject);
	}

	const savedQuestions = await SavedQuestion.findAll({
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

	const savedQuestion = await SavedQuestion.findOne({
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

	console.log("length: ", savedQuestions.length);

	const questionObject = {
		question_str: savedQuestion.question_str,
		type: savedQuestion.type,
		option1: savedQuestion.option1,
		option2: savedQuestion.option2,
		option3: savedQuestion.option3,
		option4: savedQuestion.option4,
		template: savedQuestion.template,
		answer: savedQuestion.answer,
	};

	res.json(questionObject);
});

module.exports = getSaved;
