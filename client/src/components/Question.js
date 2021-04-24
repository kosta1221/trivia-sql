import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

const useStyles = makeStyles((theme) => ({
	question: {
		height: "100%",
		display: `flex`,
		justifyContent: `space-around`,
		flexDirection: "column",
		width: "60vmax",
	},
	questionOptions: {
		display: `flex`,
		justifyContent: `center`,
		flexDirection: "column",
	},
	questionOptionsInner: {
		display: `flex`,
		justifyContent: `center`,
	},
	optionButton: {
		textTransform: "none",
		margin: "0.8vh",
		width: "50%",
		flexGrow: 1,
	},
}));

function Question({ data, setCurrentlyDisplayed, lives, setLives, score, setScore }) {
	const classes = useStyles();

	const [questionTime, setQuestionTime] = useState(20);
	const [progress, setProgress] = useState(100);

	const timerRef = useRef(null);

	useEffect(() => {
		timerRef.current = setInterval(() => {
			setProgress((prevProgress) => (prevProgress <= 0 ? 100 : prevProgress - 0.5));
			setQuestionTime((prevQuestionTime) => prevQuestionTime - 0.1);
		}, 100);

		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	useEffect(() => {
		if (progress === 0) {
			clearInterval(timerRef.current);
			console.log("TIMES UP!!");
			setCurrentlyDisplayed("rating");
			setLives(lives - 1);
		}
	}, [progress]);

	const handleAnswerClick = (event) => {
		const isUserAnswerCorrect = event.target.innerText === data.answer ? true : false;
		console.log(event.target.innerText);
		console.log(isUserAnswerCorrect);
		setCurrentlyDisplayed("rating");
		if (!isUserAnswerCorrect) {
			setLives(lives - 1);
		} else {
			setScore(score + 100);
		}
	};

	return (
		<div className={classes.question}>
			<LinearProgressWithLabel value={progress} questionTime={questionTime} />
			{data.question_str}
			<div className={classes.questionOptions}>
				<div className={classes.questionOptionsInner}>
					<Button
						onClick={handleAnswerClick}
						className={classes.optionButton}
						variant="outlined"
						color="primary"
					>
						{data.option1}
					</Button>
					<Button
						onClick={handleAnswerClick}
						className={classes.optionButton}
						variant="outlined"
						color="primary"
					>
						{data.option2}
					</Button>
				</div>

				<div className={classes.questionOptionsInner}>
					{data.option3 && (
						<Button
							onClick={handleAnswerClick}
							className={classes.optionButton}
							variant="outlined"
							color="primary"
						>
							{data.option3}
						</Button>
					)}
					{data.option4 && (
						<Button
							onClick={handleAnswerClick}
							className={classes.optionButton}
							variant="outlined"
							color="primary"
						>
							{data.option4}
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Question;
