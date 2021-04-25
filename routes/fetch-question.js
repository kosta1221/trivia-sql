const { Router } = require("express");

const fetchQuestion = Router();

const generate = require("./fetch-question-routes/generate");
const getSaved = require("./fetch-question-routes/get-saved");

const { Sequelize, SavedQuestion } = require("../models");
const Op = Sequelize.Op;

fetchQuestion.put("/", async (req, res, next) => {
	const { questionsAskedTotal } = req.body;

	const numberOfSavedQuestions = await SavedQuestion.count();
	console.log("all saved questions:", numberOfSavedQuestions);

	const numberOfSavedQuestionsUnique = await SavedQuestion.count({
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

	let n;

	if (numberOfSavedQuestionsUnique === 0) {
		n = numberOfSavedQuestions;
	} else {
		n = numberOfSavedQuestionsUnique;
	}
	console.log("not asked yet saved questions:", n);

	if (n === 0) {
		return res.redirect(303, "/api/fetch-question/generate");
	}

	let chanceToGetSavedQuestion;
	if (n > 0 && n < 100) {
		chanceToGetSavedQuestion = 10 + 0.6 * n;
	}

	if (n > 100) {
		chanceToGetSavedQuestion = 70;
	}

	const random = Math.random() * 100;

	console.log("TRYING TO DECIDE WHERE TO FETCH QUESTION FROM");
	console.log("chance to get saved question: ", chanceToGetSavedQuestion);
	console.log("the random number generated: ", random);

	if (random <= chanceToGetSavedQuestion) {
		console.log("destiny is to GET SAVED");
		return res.redirect(307, "/api/fetch-question/get-saved");
	} else {
		console.log("destiny is to GENERATE");
		return res.redirect(303, "/api/fetch-question/generate");
	}
});

fetchQuestion.use("/get-saved", getSaved);
fetchQuestion.use("/generate", generate);

module.exports = fetchQuestion;
