import { Button } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	optionButton: {
		textTransform: "none",
		margin: "0.8vh",
		width: "50%",
		flexGrow: 1,
	},
}));

function GameOver({ setCurrentlyDisplayed, refetch, setLives }) {
	const classes = useStyles();

	const handlePlayAgain = async (event) => {
		await refetch;
		setCurrentlyDisplayed("question");
		setLives(3);
	};

	return (
		<div>
			<h1>GAME OVER!</h1>
			<Button
				onClick={handlePlayAgain}
				className={classes.optionButton}
				variant="outlined"
				color="primary"
			>
				Play Again
			</Button>
			<Link exact to="/">
				<Button className={classes.optionButton} variant="outlined" color="primary">
					Main Menu
				</Button>
			</Link>
		</div>
	);
}

export default GameOver;
