const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./routes");

morgan.token("reqbody", (req) => {
	const newObject = {};
	for (const key in req.body) {
		if (JSON.stringify(req.body[key]).length > 100) {
			newObject[key] = "Too many to print...";
			continue;
		}
		newObject[key] = req.body[key];
	}
	return JSON.stringify(newObject);
});

app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :reqbody"));
app.use(express.static("./client/build"));
app.use("/api", router);

const {
	Country,
	CrimeIndex,
	Capital,
	CostOfLivingIndex,
	PopulationDensity,
	QualityOfLifeIndex,
} = require("./models");

const errorHandler = (error, req, res, next) => {
	console.error(error);
	console.error(error.message);

	next(error);
};

app.use(errorHandler);

module.exports = app;
