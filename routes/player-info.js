const { Router } = require("express");
const authorization = require("../middlewares/authorization");

const playerInfo = Router();

const { Player } = require("../models");

playerInfo.get("/:playerName", authorization, async (req, res, next) => {
	console.log("trying to fetch player info");

	const { playerName } = req.params;
	console.log("player name param: ", playerName);
	try {
		const player = await Player.findOne({
			where: {
				id: playerName,
			},
		});
		res.json(player);
	} catch (error) {
		next(error);
	}
});

module.exports = playerInfo;
