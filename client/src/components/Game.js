import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { URL } from "../utils";
import HeartIcon from "@material-ui/icons/Favorite";

import useAxios, { configure } from "axios-hooks";
import { axiosInterceptorInstance } from "../interceptors/axiosInterceptors";
import Question from "./Question";
import Rating from "./Rating";
import GameOver from "./GameOver";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: `15vh`,
		height: `75vh`,
		display: `flex`,
		justifyContent: `center`,
	},
	paper: {
		position: "relative",
		backgroundColor: theme.palette.paperBackground,
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
	scoreContainer: {
		position: "absolute",
		display: "flex",
		alignItems: "center",
		top: theme.spacing(2),
		right: theme.spacing(2),
	},
	scoreText: {
		fontSize: "1.5rem",
		paddingBottom: "0.2rem",
		paddingRight: "0.5rem",
	},
	middle: {
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
}));

function Game({ playerName, match }) {
	configure({ axios: axiosInterceptorInstance });
	const classes = useStyles();

	const playerNameParam = match.params.name;

	const [questionsAskedTotal, setQuestionsAskedTotal] = useState([]);

	const [{ data, loading, error }, refetch] = useAxios(
		{
			method: "PUT",
			url: `${URL}/fetch-question`,
			headers: { "Content-Type": "application/json" },
			data: { questionsAskedTotal },
		},
		{ manual: true }
	);

	useEffect(() => {
		console.log("refetch useEffect");
		let isMounted = true;
		if (isMounted) {
			refetch();
		}
		return () => {
			console.log("refetch useEffect cleanup");
			isMounted = false;
		};
	}, []);

	console.log("questions asked state: ", questionsAskedTotal);

	const [currentlyDisplayed, setCurrentlyDisplayed] = useState("question");
	const [lives, setLives] = useState(3);
	const [score, setScore] = useState(0);
	const [correctQuestionsAnswered, setCorrectQuestionsAnswered] = useState(0);

	useEffect(() => {
		if (lives === 0) {
			setCurrentlyDisplayed("game_over");
		}
	}, [lives]);

	if (loading) {
		return <h1 className={classes.middle}>LOADING...</h1>;
	}
	if (error) {
		return <h1 className={classes.middle}>{`ERROR! ${error.response.data}`}</h1>;
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
				<div className={classes.scoreContainer}>
					<span className={classes.scoreText}>{`Score: ${score}`}</span>
				</div>
				{currentlyDisplayed === "question" && (
					<Question
						data={data}
						setCurrentlyDisplayed={setCurrentlyDisplayed}
						lives={lives}
						setLives={setLives}
						score={score}
						setScore={setScore}
						correctQuestionsAnswered={correctQuestionsAnswered}
						setCorrectQuestionsAnswered={setCorrectQuestionsAnswered}
						questionsAskedTotal={questionsAskedTotal}
						setQuestionsAskedTotal={setQuestionsAskedTotal}
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
						setCorrectQuestionsAnswered={setCorrectQuestionsAnswered}
						setQuestionsAskedTotal={setQuestionsAskedTotal}
						score={score}
						setScore={setScore}
						playerNameParam={playerNameParam}
					/>
				)}
			</Paper>
		</div>
	);
}

export default Game;
