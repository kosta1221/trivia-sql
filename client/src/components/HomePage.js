import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useRouter } from "./useRouter";

import { Link } from "react-router-dom";
import AvatarGrid from "./AvatarGrid";

import { axiosInterceptorInstance } from "../interceptors/axiosInterceptors";
import { URL } from "../utils";
import { makeUseAxios } from "axios-hooks";

const useAxiosInterceptor = makeUseAxios({ axios: axiosInterceptorInstance });

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

function HomePage({
	playerName,
	accessTokenLoading,
	avatars,
	executeLogout,
	setRefreshToken,
	setIsPlayer,
	avatarId,
	setAvatarId,
}) {
	const classes = useStyles();

	const router = useRouter();
	const [
		{ data: playerInfo, error: playerInfoError },
		executePlayerInfoFetch,
	] = useAxiosInterceptor({
		method: "GET",
		url: `${URL}/player-info/${playerName}`,
		headers: { "Content-Type": "application/json" },
	});

	useEffect(() => {
		if (playerInfo && !accessTokenLoading) {
			console.log("player info:", playerInfo);
			setAvatarId(() => playerInfo.avatar_id);
		}
	}, [playerInfo]);

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
		setIsPlayer(() => false);
		router.push(`/login`);
	};

	if (playerInfoError) {
		console.log(playerInfoError.response.data);
	}

	return (
		<div className={classes.buttonsFlex}>
			<h1 className={classes.mainHeader}>Countrivia!</h1>
			<AvatarGrid
				avatarId={avatarId}
				setAvatarId={setAvatarId}
				playerName={playerName}
				avatars={avatars}
			/>

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
