require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");

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

		if (!foundRefreshToken) {
			return res.sendStatus(401);
		}

		if (Date.now() > foundRefreshToken.expires.getTime()) {
			return res.sendStatus(401);
		}

		jwt.verify(foundRefreshToken.refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, player) => {
			if (err) return res.sendStatus(403);

			const accessToken = jwt.sign({ name: player.name }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: "20s",
			});
			res.json({ accessToken: accessToken, playerName: player.name });
		});
	} catch (error) {
		next(error);
	}
});

module.exports = accessTokenGenerate;
