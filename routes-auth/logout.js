const { Router } = require("express");
const logout = Router();

const { Player, RefreshToken } = require("../models");

logout.post("/", async (req, res, next) => {
	const { refreshToken } = req.body;

	if (!refreshToken) return res.status(400).send("bad request to logout");

	try {
		const rowsDeleted = await RefreshToken.destroy({
			where: {
				refresh_token: refreshToken,
			},
		});

		if (rowsDeleted === 1) {
			console.log("refresh token deleted successfully");
			return res.status(200).send("logged out successfully");
		}
	} catch (error) {
		next(error);
	}
});

module.exports = logout;
