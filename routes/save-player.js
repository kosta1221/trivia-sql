const { Router } = require("express");

const savePlayer = Router();

const { Sequelize, Player } = require("../models");
const Op = Sequelize.Op;

savePlayer.post("/", async (req, res, next) => {
	console.log("hi");
	console.log(req.body);
	const playerToSave = req.body;
	console.log("trying to save player");

	Player.create(playerToSave);

	res.send("success");
});

module.exports = savePlayer;
