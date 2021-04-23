const { Router } = require("express");

const generate = Router();

generate.get("/", (req, res, next) => {
	res.json({
		questionStr: "456",
		option1: "opti45645on1",
		option2: "opti4564564on2",
		option3: "opti645645on3",
		option4: "opt6456456ion4",
	});
});

module.exports = generate;
