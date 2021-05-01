const { Router } = require("express");

const updatePlayerAvatar = Router();

const { Player } = require("../models");

updatePlayerAvatar.post("/", async (req, res, next) => {
	const { name, avatar_id } = req.body;

	console.log("saving avatar for: ", name);

	try {
		await Player.update(
			{
				avatar_id: avatar_id,
			},
			{
				where: {
					id: name,
				},
			}
		);

		res.status(200).send("success");
	} catch (error) {
		next(error);
	}
});

module.exports = updatePlayerAvatar;
