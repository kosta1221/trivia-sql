const { Router } = require("express");

const updatePlayerScore = Router();

const { Player } = require("../models");

updatePlayerScore.post("/", async (req, res, next) => {
	const { name, score } = req.body;

	console.log("saving score for: ", name);

	try {
		await Player.update(
			{
				score: score,
			},
			{
				where: {
					id: name,
				},
			}
		);

		res.status(200).send("success");
	} catch (error) {
		next(error);
	}
});

module.exports = updatePlayerScore;
