const { Router } = require("express");
const bcrypt = require("bcrypt");

const signup = Router();

const { Player } = require("../models");

signup.post("/", async (req, res, next) => {
	const { playerName, password } = req.body;

	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(hashedPassword);

	const playerToSave = {
		id: playerName,
		password: hashedPassword,
		avatar_id: null,
		score: null,
	};
	console.log("player signing up: ", playerToSave);

	try {
		await Player.create(playerToSave);

		res.status(201).send("success");
	} catch (error) {
		next(error);
	}
});

module.exports = signup;
