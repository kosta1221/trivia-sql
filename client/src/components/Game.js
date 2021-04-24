import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { URL } from "../utils";

import useAxios from "axios-hooks";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: `15vh`,
		height: `65vh`,
		display: `flex`,
		justifyContent: `center`,
	},
	question: {
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

function Game() {
	const classes = useStyles();

	const [{ data, loading, error }, refetch] = useAxios({
		method: "GET",
		url: `${URL}/generate`,
		headers: { "Content-Type": "application/json" },
	});

	if (loading) {
		return <h1>LOADING...</h1>;
	}
	if (error) {
		return <h1>ERROR!</h1>;
	}

	return (
		<div className={classes.root}>
			<Paper className={classes.question} elevation={3}>
				{data.question_str}
				<div className={classes.questionOptions}>
					<div className={classes.questionOptionsInner}>
						<Button className={classes.optionButton} variant="outlined" color="primary">
							{data.option1}
						</Button>
						<Button className={classes.optionButton} variant="outlined" color="primary">
							{data.option2}
						</Button>
					</div>

					<div className={classes.questionOptionsInner}>
						{data.option3 && (
							<Button className={classes.optionButton} variant="outlined" color="primary">
								{data.option3}
							</Button>
						)}
						{data.option4 && (
							<Button className={classes.optionButton} variant="outlined" color="primary">
								{data.option4}
							</Button>
						)}
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default Game;
