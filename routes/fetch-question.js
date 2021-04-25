const { Router } = require("express");

const fetchQuestion = Router();

const generate = require("./fetch-question-routes/generate");
const getSaved = require("./fetch-question-routes/get-saved");

const { Sequelize, SavedQuestion } = require("../models");
const Op = Sequelize.Op;

fetchQuestion.get("/", async (req, res, next) => {
	const numberOfSavedQuestions = await SavedQuestion.max("id");
	console.log(numberOfSavedQuestions);

	const { questionsAskedTotal } = req.query;
	console.log(typeof questionsAskedTotal);
	console.log(questionsAskedTotal);
	console.log("req.query: ", req.query);

	res.redirect(307, "/api/fetch-question/generate");
});

fetchQuestion.use("/get-saved", getSaved);
fetchQuestion.use("/generate", generate);

module.exports = fetchQuestion;
