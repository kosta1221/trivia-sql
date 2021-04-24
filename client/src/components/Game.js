import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { URL } from "../utils";

import useAxios from "axios-hooks";
import Question from "./Question";
import Rating from "./Rating";
import GameOver from "./GameOver";

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

	const [currentlyDisplayed, setCurrentlyDisplayed] = useState("question");
	const [lives, setLives] = useState(3);

	useEffect(() => {
		if (lives === 0) {
			setCurrentlyDisplayed("game_over");
		}
	}, [lives]);

	if (loading) {
		return <h1>LOADING...</h1>;
	}
	if (error) {
		return <h1>ERROR!</h1>;
	}

	return (
		<div className={classes.root}>
			<Paper elevation={3}>
				{currentlyDisplayed === "question" && (
					<Question
						data={data}
						setCurrentlyDisplayed={setCurrentlyDisplayed}
						lives={lives}
						setLives={setLives}
					/>
				)}
				{currentlyDisplayed === "rating" && (
					<Rating question={data} setCurrentlyDisplayed={setCurrentlyDisplayed} refetch={refetch} />
				)}
				{currentlyDisplayed === "game_over" && (
					<GameOver
						setCurrentlyDisplayed={setCurrentlyDisplayed}
						refetch={refetch}
						setLives={setLives}
					/>
				)}
			</Paper>
		</div>
	);
}

export default Game;
