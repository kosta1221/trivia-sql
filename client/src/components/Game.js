import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { URL } from "../utils";
import HeartIcon from "@material-ui/icons/Favorite";

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
	paper: {
		position: "relative",
	},
	heartsContainer: {
		position: "absolute",
		display: "flex",
		alignItems: "center",
		top: theme.spacing(2),
		left: theme.spacing(2),
	},
	heart: {
		fill: "darkred",
	},
	livesText: {
		fontSize: "1.5rem",
		paddingBottom: "0.2rem",
		paddingRight: "0.5rem",
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

	const hearts = [true, true, true];

	return (
		<div className={classes.root}>
			<Paper className={classes.paper} elevation={3}>
				<div className={classes.heartsContainer}>
					<span className={classes.livesText}>Lives: </span>
					{hearts
						.filter((heart, i) => i < lives)
						.map((heart, i) => (
							<HeartIcon key={`heart-icon-${i}`} className={classes.heart} />
						))}
				</div>
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
