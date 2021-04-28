require("dotenv").config();
const { Router } = require("express");
const jwt = require("jwt");

const accessTokenGenerate = Router();

const { RefreshToken } = require("../models");

accessTokenGenerate.post("/", async (req, res, next) => {
	const { refreshToken } = req.body;

	if (!refreshToken) return res.sendStatus(401);

	try {
		const foundRefreshToken = await RefreshToken.findOne({
			where: {
				refresh_token: refreshToken,
			},
		});

		if (!foundRefreshToken || Date.now() > foundRefreshToken.expires.getTime()) {
			return res.sendStatus(401);
		}

		jwt.verify(foundRefreshToken.refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, player) => {
			if (err) return res.sendStatus(403);

			const accessToken = jwt.sign(
				{ playerName: player.playerName },
				process.env.ACCESS_TOKEN_SECRET,
				{ expriresIn: "20s" }
			);
			res.json({ accessToken: accessToken });
		});

		res.status(201).send("success");
	} catch (error) {
		next(error);
	}
});

module.exports = accessTokenGenerate;
