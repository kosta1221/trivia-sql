import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import Leaderboards from "./components/Leaderboards";

import { URL, AUTH_URL } from "./utils";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import useAxios from "axios-hooks";
import { axiosInterceptorInstance } from "./interceptors/axiosInterceptors";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

const initialTheme = createMuiTheme({
	palette: {
		primary: {
			main: "#562500",
		},
		secondary: {
			main: "#d32f2f",
		},
		doneGreen: {
			main: "green",
		},
		paperBackground: "#f6f5d7",
		background: "linear-gradient(90.5deg, rgba(252, 176, 69, 1) 0%, rgba(243, 244, 99, 1) 100%)",
	},
});

function App() {
	const [
		{ data: avatars, loading: avatarsLoading, error: avatarsError },
		refetchAvatars,
	] = useAxios({
		method: "GET",
		url: `${URL}/get-avatars`,
		headers: { "Content-Type": "application/json" },
	});

	const [fetchRetries, setFetchRetries] = useState(0);
	const [refreshToken, setRefreshToken] = useState(
		JSON.parse(localStorage.getItem("refreshToken"))
	);
	const [playerName, setPlayerName] = useState("");
	const [isPlayer, setIsPlayer] = useState(false);
	const [rememberPlayer, setRememberPlayer] = useState(false);
	const [theme, setTheme] = useState(initialTheme);

	const [
		{ data: accessTokenFetch, loading: accessTokenLoading, error: accessTokenError },
		executeAccessTokenFetch,
	] = useAxios(
		{
			method: "POST",
			url: `${AUTH_URL}/access-token-generate`,
			headers: { "Content-Type": "application/json" },
			data: { refreshToken: refreshToken && refreshToken.refresh_token },
		},
		{ manual: true }
	);

	const useStyles = makeStyles(() => ({
		root: {
			minHeight: `100vh`,
			display: `flex`,
			justifyContent: `center`,
			background: theme.palette.background,
		},
	}));

	const classes = useStyles();

	useEffect(() => {
		if (refreshToken && refreshToken !== "null") {
			console.log("executing access token fetch...");
			executeAccessTokenFetch();
		}
	}, []);

	useEffect(() => {
		if (accessTokenFetch) {
			setPlayerName(() => accessTokenFetch.playerName);
			console.log("setting player to true...");
			setIsPlayer(() => true);
		}
	}, [accessTokenFetch]);

	useEffect(() => {
		localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
	}, [refreshToken]);

	if (avatarsLoading || accessTokenLoading) {
		return <h1 className={classes.middle}>LOADING...</h1>;
	}
	if (accessTokenError) {
		if (fetchRetries < 2) {
			executeAccessTokenFetch();
			setFetchRetries((prev) => prev + 1);
		}
		return <h1 className={classes.middle}>{`ERROR! ${accessTokenError.response.data}`}</h1>;
	}
	if (avatarsError) {
		if (fetchRetries < 2) {
			refetchAvatars();
			setFetchRetries((prev) => prev + 1);
		}
		return <h1 className={classes.middle}>{`ERROR! ${avatarsError.response.data}`}</h1>;
	}

	if (accessTokenFetch && !accessTokenLoading) {
		axiosInterceptorInstance.defaults.headers.common[
			"Authorization"
		] = `Bearer ${accessTokenFetch.accessToken}`;
	}

	console.log("refresh token: ", refreshToken);
	console.log("player name: ", playerName);

	return (
		<ThemeProvider theme={theme}>
			<div className={`App ${classes.root}`}>
				<BrowserRouter>
					<LandingPage isPlayer={isPlayer} />
					<Switch>
						<Route exact path="/signup" render={(props) => <SignUpPage {...props} />} />
						<Route
							exact
							path="/login"
							render={(props) => (
								<LoginPage
									setRefreshToken={setRefreshToken}
									playerName={playerName}
									setPlayerName={setPlayerName}
									isPlayer={isPlayer}
									rememberPlayer={rememberPlayer}
									setRememberPlayer={setRememberPlayer}
									{...props}
								/>
							)}
						/>
						<Route
							exact
							path="/home"
							render={(props) => (
								<HomePage
									playerName={playerName}
									setPlayerName={setPlayerName}
									avatars={avatars}
									{...props}
								/>
							)}
						/>
						<Route
							exact
							path="/game/:name"
							render={(props) => <Game {...props} playerName={playerName}></Game>}
						/>
						<Route exact path="/leaderboards" render={(props) => <Leaderboards {...props} />} />
					</Switch>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
}

export default App;
