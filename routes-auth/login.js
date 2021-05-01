require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const login = Router();

const { Player, RefreshToken } = require("../models");

login.post("/", async (req, res, next) => {
	const { playerName, password } = req.body;
	console.log("trying to log player in", playerName);

	try {
		const player = await Player.findOne({
			where: {
				id: playerName,
			},
		});

		if (!player) {
			return res.status(401).send("Incorrect username or password");
		}

		const isAllowed = await bcrypt.compare(password, player.password);

		if (!isAllowed) {
			return res.status(401).send("Incorrect username or password");
		}

		console.log("SECRET:", process.env.ACCESS_TOKEN_SECRET);
		console.log("PLAYER:", player.toJSON());

		const payload = {
			name: player.toJSON().id,
			avatar_id: player.toJSON().avatar_id,
		};

		const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: "15m",
		});

		const refreshToken = {
			refresh_token: jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET),
			expires: new Date(Date.now() + 31540000000),
		};

		await RefreshToken.create(refreshToken);

		res.json({ accessToken, refreshToken });
	} catch (error) {
		next(error);
	}
});

module.exports = login;
