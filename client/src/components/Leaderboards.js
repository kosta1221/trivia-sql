import React, { useEffect } from "react";
import LeaderboardsTable from "./LeaderboardsTable";
import useAxios, { configure } from "axios-hooks";
import { axiosInterceptorInstance } from "../interceptors/axiosInterceptors";
import { URL } from "../utils";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	linkWithButton: {
		textDecoration: "none",
	},
	button: {
		marginTop: "5vh",
		width: "35%",
	},
}));

function Leaderboards({ avatars, playerName }) {
	const classes = useStyles();
	configure({ axios: axiosInterceptorInstance });

	const [{ data, loading, error }, refetch] = useAxios({
		method: "GET",
		url: `${URL}/leaderboards`,
		headers: { "Content-Type": "application/json" },
	});

	useEffect(() => {
		refetch();
	}, []);

	console.log(data);

	if (loading) {
		return <h1>LOADING...</h1>;
	}
	if (error) {
		return <h1>{`ERROR! ${error.response.data}`}</h1>;
	}

	return (
		<div>
			<h1>Leaderboards:</h1>
			{data && <LeaderboardsTable data={data} avatars={avatars} playerName={playerName} />}
			<Link className={classes.linkWithButton} to="/home">
				<Button className={classes.button} variant="contained" color="primary">
					Back to Menu
				</Button>
			</Link>
		</div>
	);
}

export default Leaderboards;
