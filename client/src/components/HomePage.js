import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useRouter } from "./useRouter";

import { Link } from "react-router-dom";
import AvatarGrid from "./AvatarGrid";

import { AUTH_URL } from "../utils";
import useAxios from "axios-hooks";

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
		width: "50vmax",
	},
	mainButton: {
		margin: "1vh",
		width: "100%",
	},
	textField: {
		margin: theme.spacing(1),
		width: "50vmax",
	},
	mainHeader: {
		fontSize: "4rem",
		marginBottom: "10vmax",
	},
}));

function HomePage({ playerName, avatars, refreshToken, setRefreshToken }) {
	const classes = useStyles();

	const router = useRouter();

	const [{ loading: logoutLoading, error: logoutError }, executeLogout] = useAxios(
		{
			method: "POST",
			url: `${AUTH_URL}/logout`,
			headers: { "Content-Type": "application/json" },
			data: { refreshToken: refreshToken && refreshToken.refresh_token },
		},
		{ manual: true }
	);

	if (logoutLoading) {
		return <h1 className={classes.middle}>LOADING...</h1>;
	}

	if (logoutError) {
		return <h1 className={classes.middle}>{`ERROR! ${logoutError.response.data}`}</h1>;
	}

	const handleStartClick = (e) => {
		if (playerName === "") {
			return;
		}
		router.push(`/game/${playerName}`);
	};

	const handleLogoutClick = async (e) => {
		try {
			await executeLogout();
		} catch (error) {
			console.error(error);
		}
		setRefreshToken(() => null);
		router.push(`/login`);
	};

	return (
		<div className={classes.buttonsFlex}>
			<h1 className={classes.mainHeader}>Countrivia!</h1>
			<AvatarGrid avatars={avatars} />

			<Button
				onClick={handleStartClick}
				className={classes.mainButton}
				variant="contained"
				color="primary"
			>
				Start Game
			</Button>
			<Link to="/leaderboards">
				<Button className={classes.mainButton} variant="contained" color="primary">
					Leaderboards
				</Button>
			</Link>
			<Button
				onClick={handleLogoutClick}
				className={classes.mainButton}
				variant="contained"
				color="primary"
			>
				Log Out
			</Button>
		</div>
	);
}

export default HomePage;
