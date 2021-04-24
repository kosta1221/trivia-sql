import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

function Question({ data, setCurrentlyDisplayed }) {
	const classes = useStyles();

	const handleAnswerClick = (event) => {
		const isUserAnswerCorrect = event.target.innerText === data.answer ? true : false;
		console.log(event.target.innerText);
		console.log(isUserAnswerCorrect);
		setCurrentlyDisplayed("rating");
	};

	return (
		<div className={classes.question}>
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
