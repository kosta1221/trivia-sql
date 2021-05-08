import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import { savePlayer, checkLeadeboards } from "../utils";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100%",
		display: `flex`,
		justifyContent: `center`,
		flexDirection: "column",
		alignItems: "center",
		width: "70vmax",
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
	playerNameParam,
}) {
	const classes = useStyles();

	const [leaderboardPlace, setLeaderboardPlace] = useState(0);
	const [shouldSavePlayer, setShouldSavePlayer] = useState(true);
	console.log(leaderboardPlace);

	useEffect(() => {
		setCorrectQuestionsAnswered(0);
		setQuestionsAskedTotal([]);

		checkLeadeboards()
			.then((players) => {
				players.every((playerOnLeaderboards, i) => {
					if (playerNameParam === playerOnLeaderboards.id && score <= playerOnLeaderboards.score) {
						setShouldSavePlayer(false);
						setLeaderboardPlace(i + 1);
						return false;
					}
					if (score > playerOnLeaderboards.score) {
						setLeaderboardPlace(i + 1);
						return false;
					}

					if (i === players.length - 1) {
						setLeaderboardPlace(i + 1);
					}
					return true;
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const handleMainMenu = async (event) => {
		if (shouldSavePlayer) {
			const playerToSave = {
				name: playerNameParam,
				score: score,
			};

			savePlayer(playerToSave);
		}
	};

	const handlePlayAgain = async (event) => {
		setLives(3);
		setScore(0);

		if (shouldSavePlayer) {
			const playerToSave = {
				name: playerNameParam,
				score: score,
			};

			savePlayer(playerToSave);
		}

		try {
			await refetch();
			setCurrentlyDisplayed("question");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={classes.root}>
			<h1 className={classes.gameOver}>GAME OVER!</h1>
			<h1 className={classes.gameOver}>{`Better luck next time, ${playerNameParam}!`}</h1>
			<h1 className={classes.gameOver}>{`Your leaderboard position: ${leaderboardPlace}`}</h1>
			<div>
				<Button
					onClick={handlePlayAgain}
					className={classes.optionButton}
					variant="outlined"
					color="primary"
				>
					Play Again
				</Button>
				<Link className={classes.linkWithButton} to="/home">
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
