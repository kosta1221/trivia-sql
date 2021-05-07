const { Router } = require("express");
const authorization = require("../middlewares/authorization");

const leaderboards = Router();

const { Sequelize, Player } = require("../models");
const Op = Sequelize.Op;

leaderboards.get("/", authorization, async (req, res, next) => {
	console.log("trying to fetch leaderboards");

	try {
		const players = await Player.findAll({
			where: {
				score: {
					[Op.not]: null,
				},
			},
			order: Sequelize.literal("score DESC"),
		});
		res.json(players);
	} catch (error) {
		next(error);
	}
});

module.exports = leaderboards;
