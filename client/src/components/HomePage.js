import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { useRouter } from "./useRouter";

import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";

import ThemePickerDialog from "./ThemePickerDialog";

import { axiosInterceptorInstance } from "../interceptors/axiosInterceptors";
import { URL } from "../utils";
import { makeUseAxios } from "axios-hooks";
import AvatarPickerDialog from "./AvatarPickerDialog";

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
		alignItems: "center",
		flexDirection: "column",
		width: "50vmax",
	},
	mainButton: {
		margin: "1vh",
		width: "100%",
	},
	leaderboardsButton: {
		margin: "1vh 1vh 1vh 0",
		width: "100%",
	},
	textField: {
		margin: theme.spacing(1),
		width: "50vmax",
	},
	mainHeader: {
		fontSize: "4rem",
		marginBottom: "1vmax",
	},
	linkWithButton: {
		textDecoration: "none",
		width: "100%",
	},
	playerAvatar: {
		margin: theme.spacing(1),
		marginBottom: "2vmax",
		width: "15vmax",
		height: "15vmax",
		border: `2px ${theme.palette.primary.main} solid`,
		"&:hover": {
			cursor: "pointer",
		},
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
	theme,
	setTheme,
}) {
	const classes = useStyles();

	const router = useRouter();

	const [themePickerDialogOpen, setThemePickerDialogOpen] = useState(false);
	const [avatarPickerDialogOpen, setAvatarPickerDialogOpen] = useState(false);

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

	const handleThemeDialogOpenClick = (e) => {
		setThemePickerDialogOpen(true);
	};

	const handlePlayerAvatarClick = (e) => {
		setAvatarPickerDialogOpen(true);
	};

	const onClose = (theme) => {
		setThemePickerDialogOpen(false);
		setTheme(theme);
	};

	const onAvatarPickerClose = () => {
		setAvatarPickerDialogOpen(false);
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
		playerInfoError.response.data && console.log(playerInfoError.response.data);
	}

	return (
		<div className={classes.buttonsFlex}>
			<h1 className={classes.mainHeader}>Countrivia!</h1>
			{
				<Avatar
					value={avatarId}
					onClick={handlePlayerAvatarClick}
					className={classes.playerAvatar}
					alt="player's avatar"
					src={
						avatarId &&
						`${process.env.PUBLIC_URL}${avatars.find((avatar) => avatar.id === avatarId).img_src}`
					}
				/>
			}

			<Button
				onClick={handleStartClick}
				className={classes.mainButton}
				variant="contained"
				color="primary"
			>
				Start Game
			</Button>
			<Link className={classes.linkWithButton} to="/leaderboards">
				<Button className={classes.leaderboardsButton} variant="contained" color="primary">
					Leaderboards
				</Button>
			</Link>
			<Button
				onClick={handleThemeDialogOpenClick}
				className={classes.mainButton}
				variant="contained"
				color="primary"
			>
				Change Theme
			</Button>
			<Button
				onClick={handleLogoutClick}
				className={classes.mainButton}
				variant="contained"
				color="primary"
			>
				Log Out
			</Button>
			<ThemePickerDialog theme={theme} open={themePickerDialogOpen} onClose={onClose} />
			<AvatarPickerDialog
				avatarId={avatarId}
				setAvatarId={setAvatarId}
				playerName={playerName}
				avatars={avatars}
				open={avatarPickerDialogOpen}
				onClose={onAvatarPickerClose}
			/>
		</div>
	);
}

export default HomePage;
