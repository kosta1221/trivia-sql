require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = Router();

const { Player, RefreshToken } = require("../models");

login.post("/", async (req, res, next) => {
	const { playerName, password } = req.body;
	console.log("trying to log player in");

	try {
		const player = await Player.findOne({
			where: {
				name: playerName,
			},
		});

		if (!player) {
			return res.status(400).send("Cannot find a player with that name");
		}

		const isAllowed = await bcrypt.compare(password, player.password);

		if (!isAllowed) {
			return res.status(401).send("not allowed!");
		}

		const accessToken = jwt.sign(player, process.env.ACCESS_TOKEN_SECRET, { expriresIn: "20s" });

		const refreshToken = {
			refresh_token: jwt.sign(player, process.env.REFRESH_TOKEN_SECRET),
			expires: new Date(Date.now() + 31540000000),
		};

		await RefreshToken.create(refreshToken);

		res.json({ accessToken, refreshToken });
	} catch (error) {
		next(error);
	}
});

module.exports = login;
