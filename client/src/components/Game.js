import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: `15vh`,
		height: `65vh`,
		display: `flex`,
		justifyContent: `center`,
	},
	question: {
		display: `flex`,
		justifyContent: `center`,
		flexDirection: "column",
		width: "60vmax",
	},
	mainButton: {
		margin: "1vh",
		width: "100%",
	},
}));

function Game() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.question} elevation={3}>
				Question goes here
			</Paper>
		</div>
	);
}

export default Game;
