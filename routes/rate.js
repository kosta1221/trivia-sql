const { Router } = require("express");
const authorization = require("../middlewares/authorization");

const rate = Router();

const { Sequelize, SavedQuestion } = require("../models");
const Op = Sequelize.Op;

rate.post("/", authorization, async (req, res, next) => {
	console.log("hi");
	console.log(req.body);
	const ratedQuestion = req.body;

	const foundQuestion = await SavedQuestion.findOne({
		where: {
			[Op.and]: [
				{ question_str: ratedQuestion.question_str },
				{ option1: ratedQuestion.option1 },
				{ option2: ratedQuestion.option2 },
			],
		},
	});

	if (foundQuestion) {
		const foundQuestionFormatted = foundQuestion.toJSON();

		console.log("found question which already exists to rate it: ", foundQuestionFormatted);

		const newRating =
			(foundQuestionFormatted.number_of_ratings * foundQuestionFormatted.rating +
				ratedQuestion.rating) /
			(foundQuestionFormatted.number_of_ratings + 1);

		questionToInsert = {
			...foundQuestionFormatted,
			rating: newRating,
			number_of_ratings: foundQuestionFormatted.number_of_ratings + 1,
		};
	} else {
		console.log("found question which already exists to rate it: ", foundQuestion);

		questionToInsert = {
			...ratedQuestion,
			number_of_ratings: 1,
		};
	}

	SavedQuestion.upsert(questionToInsert, {
		where: {
			[Op.and]: [
				{ question_str: ratedQuestion.question_str },
				{ option1: ratedQuestion.option1 },
				{ option2: ratedQuestion.option2 },
			],
		},
	});

	res.send("success");
});

module.exports = rate;
