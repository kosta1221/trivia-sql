import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
		margin: "0.8vh",
		flexGrow: 1,
	},
}));

function Game() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.question} elevation={3}>
				Question goes here
				<div className={classes.questionOptions}>
					<div className={classes.questionOptionsInner}>
						<Button className={classes.optionButton} variant="outlined" color="primary">
							Option1
						</Button>
						<Button className={classes.optionButton} variant="outlined" color="primary">
							Option2
						</Button>
					</div>

					<div className={classes.questionOptionsInner}>
						<Button className={classes.optionButton} variant="outlined" color="primary">
							Option3
						</Button>
						<Button className={classes.optionButton} variant="outlined" color="primary">
							Option4
						</Button>
					</div>
				</div>
			</Paper>
		</div>
	);
}

export default Game;
