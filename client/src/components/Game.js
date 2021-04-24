import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { URL } from "../utils";

import useAxios from "axios-hooks";
import Question from "./Question";
import Rating from "./Rating";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: `15vh`,
		height: `65vh`,
		display: `flex`,
		justifyContent: `center`,
	},
}));

function Game() {
	const classes = useStyles();

	const [{ data, loading, error }, refetch] = useAxios({
		method: "GET",
		url: `${URL}/generate`,
		headers: { "Content-Type": "application/json" },
	});

	const [currentlyDisplayed, setCurrentlyDisplayed] = useState("rating");

	if (loading) {
		return <h1>LOADING...</h1>;
	}
	if (error) {
		return <h1>ERROR!</h1>;
	}

	return (
		<div className={classes.root}>
			<Paper elevation={3}>
				{currentlyDisplayed === "question" && <Question data={data} />}
				{currentlyDisplayed === "rating" && <Rating />}
			</Paper>
		</div>
	);
}

export default Game;
