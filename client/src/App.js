import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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
	},
}));

function App() {
	const classes = useStyles();

	return (
		<div className={`App ${classes.root}`}>
			<BrowserRouter>
				<div className={classes.buttonsFlex}>
					<Button className={classes.mainButton} variant="contained" color="primary">
						Start Game
					</Button>
					<Button className={classes.mainButton} variant="contained" color="primary">
						Leaderboards
					</Button>
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
