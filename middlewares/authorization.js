require("dotenv").config();
const jwt = require("jsonwebtoken");

function authorization(req, res, next) {
	const authHeader = req.headers["authorization"];
	console.log("authheader", authHeader);
	const token = authHeader && authHeader.split(" ")[1];

	if (token == null) return res.status(401).send("No access!");

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, player) => {
		if (err) return res.sendStatus(403);

		req.player = player;
		next();
	});
}

module.exports = authorization;
