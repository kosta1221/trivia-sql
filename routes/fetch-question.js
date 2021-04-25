const { Router } = require("express");

const fetchQuestion = Router();

const generate = require("./fetch-question-routes/generate");
const getSaved = require("./fetch-question-routes/get-saved");

const { Sequelize, SavedQuestion } = require("../models");
const Op = Sequelize.Op;

fetchQuestion.put("/", async (req, res, next) => {
	const numberOfSavedQuestions = await SavedQuestion.max("id");
	console.log(numberOfSavedQuestions);

	const { questionsAskedTotal } = req.body;

	res.redirect(307, "/api/fetch-question/get-saved");
	// res.redirect(303, "/api/fetch-question/generate");
});

fetchQuestion.use("/get-saved", getSaved);
fetchQuestion.use("/generate", generate);

module.exports = fetchQuestion;
