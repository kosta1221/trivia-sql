const { Router } = require("express");

const leaderboards = Router();

const { Sequelize, Player } = require("../models");
const Op = Sequelize.Op;

leaderboards.get("/", async (req, res, next) => {
	console.log("trying to fetch leaderboards");

	const players = await Player.findAll({
		order: Sequelize.literal("score DESC"),
	});

	res.json(players);
});

module.exports = leaderboards;
