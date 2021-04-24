const { Router } = require("express");

const rate = Router();

const { Sequelize, SavedQuestion } = require("../models");
const Op = Sequelize.Op;

rate.post("/", async (req, res, next) => {
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

		console.log("FOUND QUESTION!!!: ", foundQuestionFormatted);

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
		console.log("FOUND QUESTION!!!: ", foundQuestion);

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
