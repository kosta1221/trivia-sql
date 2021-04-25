import React, { useEffect } from "react";

import useAxios from "axios-hooks";
import LeaderboardsTable from "./LeaderboardsTable";

import { URL } from "../utils";

function Leaderboards() {
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
		return <h1>ERROR!</h1>;
	}

	return (
		<div>
			<h1>Leaderboards:</h1>
			{data && <LeaderboardsTable data={data} />}
		</div>
	);
}

export default Leaderboards;
