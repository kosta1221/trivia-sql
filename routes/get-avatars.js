const { Router } = require("express");

const getAvatars = Router();

const { Sequelize, Avatar } = require("../models");
const Op = Sequelize.Op;

getAvatars.get("/", async (req, res, next) => {
	console.log("trying to fetch avatars");

	const avatars = await Avatar.findAll({});

	res.json(avatars);
});

module.exports = getAvatars;
