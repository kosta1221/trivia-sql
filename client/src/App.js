import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import Leaderboards from "./components/Leaderboards";

import { URL } from "./utils";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import useAxios from "axios-hooks";
import Login from "./components/LoginPage";
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
	const [{ data, loading, error }, refetch] = useAxios({
		method: "GET",
		url: `${URL}/get-avatars`,
		headers: { "Content-Type": "application/json" },
	});

	const [theme, setTheme] = useState(initialTheme);

	const useStyles = makeStyles(() => ({
		root: {
			minHeight: `100vh`,
			display: `flex`,
			justifyContent: `center`,
			background: theme.palette.background,
		},
	}));

	const classes = useStyles();

	const [playerName, setPlayerName] = useState("");
	const [isPlayer, setIsPlayer] = useState(false);

	return (
		<ThemeProvider theme={theme}>
			<div className={`App ${classes.root}`}>
				<BrowserRouter>
					<Switch>
						<Route exact path="/signup" render={(props) => <SignUpPage {...props} />} />
						<Route
							exact
							path="/"
							render={(props) => <LandingPage isPlayer={isPlayer} {...props} />}
						/>
						<Route
							exact
							path="/login"
							render={(props) => (
								<Login playerName={playerName} setPlayerName={setPlayerName} {...props} />
							)}
						/>
						<Route
							exact
							path="/home"
							render={(props) => (
								<HomePage
									playerName={playerName}
									setPlayerName={setPlayerName}
									avatars={data}
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
