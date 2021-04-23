import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		height: `100vh`,
		display: `flex`,
		justifyContent: `center`,
	},
	buttonsFlex: {
		display: `flex`,
		justifyContent: `center`,
		flexDirection: "column",
		width: "40vmax",
	},
	mainButton: {
		margin: "1vh",
		width: "100%",
	},
}));

function HomePage() {
	const classes = useStyles();

	return (
		<div className={classes.buttonsFlex}>
			<Link exact to="/game">
				<Button className={classes.mainButton} variant="contained" color="primary">
					Start Game
				</Button>
			</Link>
			<Link exact to="/leaderboards">
				<Button className={classes.mainButton} variant="contained" color="primary">
					Leaderboards
				</Button>
			</Link>
		</div>
	);
}

export default HomePage;
