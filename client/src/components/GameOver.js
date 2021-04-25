import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import { URL, savePlayer } from "../utils";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		display: `flex`,
		justifyContent: `center`,
		flexDirection: "column",
		alignItems: "center",
		width: "60vmax",
	},
	optionButton: {
		textTransform: "none",
	},
	linkWithButton: {
		margin: "0.8vh",
		width: "50%",
		textDecoration: "none",
	},
	gameOver: {
		marginBottom: "5vmax",
		marginTop: -30,
	},
}));

function GameOver({
	setCurrentlyDisplayed,
	refetch,
	setLives,
	setCorrectQuestionsAnswered,
	setQuestionsAskedTotal,
	score,
	setScore,
	playerName,
}) {
	const classes = useStyles();

	useEffect(() => {
		setCorrectQuestionsAnswered(0);
		setQuestionsAskedTotal([]);
	}, []);

	const handleMainMenu = async (event) => {
		const playerToSave = {
			name: playerName,
			score: score,
			avatar_id: 1,
		};

		savePlayer(playerToSave);
	};

	const handlePlayAgain = async (event) => {
		setLives(3);

		const playerToSave = {
			name: playerName,
			score: score,
			avatar_id: 1,
		};

		savePlayer(playerToSave);

		try {
			await refetch();
		} catch (error) {
			console.log(error);
		}

		setCurrentlyDisplayed("question");
		setScore(0);
	};

	return (
		<div className={classes.root}>
			<h1 className={classes.gameOver}>GAME OVER!</h1>
			<div>
				<Button
					onClick={handlePlayAgain}
					className={classes.optionButton}
					variant="outlined"
					color="primary"
				>
					Play Again
				</Button>
				<Link className={classes.linkWithButton} exact to="/">
					<Button
						onClick={handleMainMenu}
						className={classes.optionButton}
						variant="outlined"
						color="primary"
					>
						Main Menu
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default GameOver;
