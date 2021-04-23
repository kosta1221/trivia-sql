import "./styles/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Game from "./components/Game";
import HomePage from "./components/HomePage";

const useStyles = makeStyles((theme) => ({
	root: {
		height: `100vh`,
		display: `flex`,
		justifyContent: `center`,
	},
}));

function App() {
	const classes = useStyles();

	return (
		<div className={`App ${classes.root}`}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={(props) => <HomePage {...props} />} />
					<Route exact path="/game" render={(props) => <Game {...props}></Game>} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
