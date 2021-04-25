import React, { useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { useRouter } from "./useRouter";

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
	textField: {
		margin: theme.spacing(1),
		width: "40vmax",
	},
}));

function HomePage({ playerName, setPlayerName }) {
	const classes = useStyles();

	const router = useRouter();

	const handleStartClick = (e) => {
		if (playerName === "") {
			return;
		}
		router.push(`/game`);
	};

	const handleInputChange = (e) => {
		setPlayerName(e.target.value);
	};
	return (
		<div className={classes.buttonsFlex}>
			<TextField
				onChange={handleInputChange}
				className={classes.textField}
				error={playerName === "" ? true : false}
				id="standard-error"
				label="Name"
				placeholder="Enter your name..."
				defaultValue={playerName}
			/>
			<Button
				onClick={handleStartClick}
				className={classes.mainButton}
				variant="contained"
				color="primary"
			>
				Start Game
			</Button>
			<Link exact to="/leaderboards">
				<Button className={classes.mainButton} variant="contained" color="primary">
					Leaderboards
				</Button>
			</Link>
		</div>
	);
}

export default HomePage;
