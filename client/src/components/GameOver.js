import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

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
	setScore,
}) {
	const classes = useStyles();

	useEffect(() => {
		setCorrectQuestionsAnswered(0);
		setQuestionsAskedTotal(0);
	}, []);

	const handlePlayAgain = async (event) => {
		setLives(3);
		setScore(0);
		try {
			await refetch();
		} catch (error) {
			console.log(error);
		}

		setCurrentlyDisplayed("question");
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
					<Button className={classes.optionButton} variant="outlined" color="primary">
						Main Menu
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default GameOver;
