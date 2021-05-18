const express = require("express");
const app = express();
const morgan = require("morgan");
const router = require("./routes");
const authRouter = require("./routes-auth");

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
app.use("/auth", authRouter);

const errorHandler = (error, req, res, next) => {
	console.error("error name: ", error.name);
	console.error(error.message);

	if (error.name === "SequelizeUniqueConstraintError") {
		return res.status(400).send("This name already exists!");
	}

	next(error);
};

app.use(errorHandler);

// catch 404 and redirect to home
app.use((req, res) => {
	console.log(`redirecting request to ${req.path} to /...`);
	res.redirect("/");
});

module.exports = app;
