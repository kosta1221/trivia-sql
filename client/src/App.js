import "./styles/App.css";
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Game from "./components/Game";
import HomePage from "./components/HomePage";
import Leaderboards from "./components/Leaderboards";

const useStyles = makeStyles((theme) => ({
	root: {
		height: `100vh`,
		display: `flex`,
		justifyContent: `center`,
	},
}));

function App() {
	const classes = useStyles();

	const [playerName, setPlayerName] = useState("");

	return (
		<div className={`App ${classes.root}`}>
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => (
							<HomePage playerName={playerName} setPlayerName={setPlayerName} {...props} />
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
	);
}

export default App;
