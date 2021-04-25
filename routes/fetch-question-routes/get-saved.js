const { Router } = require("express");

const getSaved = Router();

const { Sequelize, SavedQuestion } = require("../../models");
const Op = Sequelize.Op;

getSaved.put("/", async (req, res, next) => {
	const { questionsAskedTotal } = req.body;

	if (questionsAskedTotal.length === 0) {
		const savedQuestionUnique = await SavedQuestion.findOne({
			order: Sequelize.literal("rand()"),
		});

		const questionObject = {
			question_str: savedQuestionUnique.question_str,
			type: savedQuestionUnique.type,
			option1: savedQuestionUnique.option1,
			option2: savedQuestionUnique.option2,
			option3: savedQuestionUnique.option3,
			option4: savedQuestionUnique.option4,
			template: savedQuestionUnique.template,
			answer: savedQuestionUnique.answer,
		};

		return res.json(questionObject);
	}

	const savedQuestionUnique = await SavedQuestion.findOne({
		where: {
			[Op.not]: [
				[
					{ question_str: questionsAskedTotal.map((question) => question.question_str) },
					{ option1: questionsAskedTotal.map((question) => question.option1) },
					{ option2: questionsAskedTotal.map((question) => question.option2) },
				],
			],
		},
		order: Sequelize.literal("rand()"),
	});

	const questionObject = {
		question_str: savedQuestionUnique.question_str,
		type: savedQuestionUnique.type,
		option1: savedQuestionUnique.option1,
		option2: savedQuestionUnique.option2,
		option3: savedQuestionUnique.option3,
		option4: savedQuestionUnique.option4,
		template: savedQuestionUnique.template,
		answer: savedQuestionUnique.answer,
	};

	res.json(questionObject);
});

module.exports = getSaved;
